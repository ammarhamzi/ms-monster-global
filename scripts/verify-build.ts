import { access, readFile } from 'node:fs/promises';
import { dirname, extname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import {
  ROUTES,
  absoluteUrl,
  getCounterpart,
  type RouteRecord,
} from '../app/config/routes';
import { SITE } from '../app/config/site';
import { diffusers } from '../app/data/products';

const LEGACY_PATHS = new Set([
  '/it',
  '/profile',
  '/products',
  '/commercial-aroma-solutions',
  '/aroma-diffusers',
  '/custom-fragrance-development',
  '/ms/penyelesaian-aroma-komersial',
  '/ms/diffuser-aroma',
  '/ms/pembangunan-wangian-tersuai',
]);

const REQUIRED_STATIC_FILES = [
  '404.html',
  'robots.txt',
  'sitemap.xml',
  'site.webmanifest',
  'favicon.ico',
  'favicon.svg',
  'assets/brand/apple-touch-icon.png',
  'assets/brand/icon-192.png',
  'assets/brand/icon-512.png',
  'assets/brand/logo-dark.webp',
  'assets/brand/logo-light.webp',
  'assets/brand/logo-mark-16.png',
  'assets/brand/logo-mark-32.png',
  'assets/social/aroma-solutions.jpg',
  'assets/social/corporate.jpg',
  'assets/social/it-maintenance.jpg',
  'downloads/ms-monster-it-maintenance-profile.pdf',
  'downloads/ms-monster-perfume-profile.pdf',
  'downloads/ms-monster-product-brochure.pdf',
] as const;

const PROHIBITED_SCHEMA_TERMS = [
  'LocalBusiness',
  '"@type":"Product"',
  'aggregateRating',
  'ratingValue',
  '"review"',
  'openingHours',
  '"geo"',
  'latitude',
  'longitude',
  '"price"',
  'priceCurrency',
  'areaServed',
  'national coverage',
  'nationwide',
  'AMECO',
  'licence',
  'license',
  '24/7',
  'guarantee',
  'clientCount',
  'client count',
  'clients served',
  'accreditation',
  'testimonial',
] as const;

export interface BuildVerificationResult {
  routes: number;
  staticAssets: number;
}

interface RouteDocument {
  description: string;
  document: Document;
  route: RouteRecord;
  title: string;
}

function routeHtmlPath(root: string, routePath: string): string | undefined {
  const routeDirectory = safeBuildPath(root, routePath);
  if (!routeDirectory) return undefined;

  return resolve(routeDirectory, 'index.html');
}

async function exists(pathname: string): Promise<boolean> {
  try {
    await access(pathname);
    return true;
  } catch {
    return false;
  }
}

function normalizedDocumentText(document: Document): string {
  const body = document.body.cloneNode(true) as HTMLBodyElement;
  body.querySelectorAll('script, style, noscript, template').forEach((node) => node.remove());
  return body.textContent?.replace(/\s+/g, ' ').trim() ?? '';
}

function localPathFromUrl(value: string): string | undefined {
  const trimmed = value.trim();
  if (
    !trimmed ||
    trimmed.startsWith('#') ||
    /^(?:data|blob|mailto|tel|sms|javascript):/i.test(trimmed)
  ) {
    return undefined;
  }

  try {
    const url = new URL(trimmed, SITE.origin);
    if (url.origin !== SITE.origin) return undefined;
    return decodeURIComponent(url.pathname);
  } catch {
    return undefined;
  }
}

function safeBuildPath(root: string, urlPath: string): string | undefined {
  const candidate = resolve(root, `.${urlPath}`);
  const relativePath = relative(root, candidate);
  if (relativePath === '..' || relativePath.startsWith(`..${sep}`)) return undefined;
  return candidate;
}

function referencedValues(document: Document): string[] {
  const values = new Set<string>();

  for (const selector of ['a[href]', 'link[href]', 'script[src]', 'img[src]', 'source[src]']) {
    document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
      const attribute = selector.includes('href') ? 'href' : 'src';
      const value = element.getAttribute(attribute);
      if (value) values.add(value);
    });
  }

  document.querySelectorAll<HTMLElement>('[srcset]').forEach((element) => {
    for (const candidate of element.getAttribute('srcset')?.split(',') ?? []) {
      const value = candidate.trim().split(/\s+/, 1)[0];
      if (value) values.add(value);
    }
  });

  document
    .querySelectorAll<HTMLMetaElement>(
      'meta[property="og:image"], meta[name="twitter:image"]',
    )
    .forEach((element) => {
      if (element.content) values.add(element.content);
    });

  return [...values];
}

async function verifyLocalReferences(
  root: string,
  route: RouteRecord,
  document: Document,
  diagnostics: string[],
): Promise<void> {
  const routePaths = new Set(ROUTES.map((candidate) => candidate.path));

  for (const value of referencedValues(document)) {
    const urlPath = localPathFromUrl(value);
    if (!urlPath) continue;

    const normalizedPath = urlPath === '/' ? '/' : urlPath.replace(/\/+$/, '');
    if (routePaths.has(normalizedPath) || extname(normalizedPath) === '') {
      const htmlPath = routeHtmlPath(root, normalizedPath);
      if (!htmlPath || !(await exists(htmlPath))) {
        diagnostics.push(
          `${route.path}: internal route "${normalizedPath}" is missing generated HTML`,
        );
      }
      continue;
    }

    const pathname = safeBuildPath(root, urlPath);
    if (!pathname || !(await exists(pathname))) {
      diagnostics.push(`${route.path}: local reference "${urlPath}" is missing`);
    }
  }
}

function verifyAlternates(
  route: RouteRecord,
  document: Document,
  diagnostics: string[],
): void {
  const alternateLinks = [
    ...document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]'),
  ];
  const counterpart = getCounterpart(route);
  const english = route.locale === 'en' ? route : counterpart;
  const malay = route.locale === 'ms' ? route : counterpart;
  const expected = new Map([
    ['en', absoluteUrl(english.path)],
    ['ms', absoluteUrl(malay.path)],
    ['x-default', absoluteUrl(english.path)],
  ]);

  if (alternateLinks.length !== 3) {
    diagnostics.push(
      `${route.path}: expected 3 locale alternate links, found ${alternateLinks.length}`,
    );
  }

  for (const [language, href] of expected) {
    const matches = alternateLinks.filter(
      (link) => link.hreflang.toLowerCase() === language && link.href === href,
    );
    if (matches.length !== 1) {
      diagnostics.push(`${route.path}: missing correct ${language} alternate "${href}"`);
    }
  }
}

function verifySchema(
  route: RouteRecord,
  document: Document,
  diagnostics: string[],
): void {
  const scripts = [
    ...document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
  ];

  if (scripts.length === 0) {
    diagnostics.push(`${route.path}: missing JSON-LD`);
    return;
  }

  for (const [index, script] of scripts.entries()) {
    try {
      const graph = JSON.parse(script.textContent ?? '') as unknown;
      const serialized = JSON.stringify(graph).toLowerCase();
      for (const term of PROHIBITED_SCHEMA_TERMS) {
        if (serialized.includes(term.toLowerCase())) {
          diagnostics.push(
            `${route.path}: JSON-LD ${index + 1} contains prohibited term "${term}"`,
          );
        }
      }
    } catch {
      diagnostics.push(`${route.path}: JSON-LD ${index + 1} is not valid JSON`);
    }
  }
}

async function inspectRoute(
  root: string,
  route: RouteRecord,
  diagnostics: string[],
): Promise<RouteDocument | undefined> {
  const htmlPath = routeHtmlPath(root, route.path);
  if (!htmlPath) {
    diagnostics.push(`${route.path}: canonical route HTML is outside the build root`);
    return undefined;
  }

  let html: string;

  try {
    html = await readFile(htmlPath, 'utf8');
  } catch {
    diagnostics.push(`${route.path}: canonical route HTML is missing`);
    return undefined;
  }

  const document = new JSDOM(html, { url: absoluteUrl(route.path) }).window.document;
  const title = document.querySelector('title')?.textContent?.trim() ?? '';
  const description =
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content.trim() ?? '';

  if (!title) diagnostics.push(`${route.path}: missing title`);
  if (!description) diagnostics.push(`${route.path}: missing meta description`);
  if (document.documentElement.lang !== route.locale) {
    diagnostics.push(
      `${route.path}: expected html lang "${route.locale}", found "${document.documentElement.lang}"`,
    );
  }

  const canonicalLinks = [
    ...document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'),
  ];
  const expectedCanonical = absoluteUrl(route.path);
  if (
    canonicalLinks.length !== 1 ||
    canonicalLinks[0]?.href !== expectedCanonical
  ) {
    diagnostics.push(`${route.path}: missing correct canonical "${expectedCanonical}"`);
  }
  for (const link of canonicalLinks) {
    const canonicalPath = localPathFromUrl(link.href);
    if (canonicalPath && LEGACY_PATHS.has(canonicalPath)) {
      diagnostics.push(`${route.path}: legacy route "${canonicalPath}" appears as canonical`);
    }
  }

  verifyAlternates(route, document, diagnostics);

  if (
    !document
      .querySelector<HTMLMetaElement>('meta[property="og:image"]')
      ?.content.trim()
  ) {
    diagnostics.push(`${route.path}: missing Open Graph image`);
  }
  if (
    !document
      .querySelector<HTMLMetaElement>('meta[name="twitter:image"]')
      ?.content.trim()
  ) {
    diagnostics.push(`${route.path}: missing Twitter image`);
  }

  verifySchema(route, document, diagnostics);

  const h1Count = document.querySelectorAll('h1').length;
  if (h1Count !== 1) {
    diagnostics.push(`${route.path}: expected exactly one H1, found ${h1Count}`);
  }
  if (!normalizedDocumentText(document)) {
    diagnostics.push(`${route.path}: body has no visible text`);
  }

  if (route.key === 'perfume') {
    const headingCounts = new Map<string, number>();
    document.querySelectorAll('h3').forEach((heading) => {
      const text = heading.textContent?.trim() ?? '';
      headingCounts.set(text, (headingCounts.get(text) ?? 0) + 1);
    });

    for (const diffuser of diffusers) {
      const count = headingCounts.get(diffuser.model) ?? 0;
      if (count === 0) {
        diagnostics.push(
          `${route.path}: diffuser catalogue is missing model "${diffuser.model}"`,
        );
      } else if (count !== 1) {
        diagnostics.push(
          `${route.path}: diffuser catalogue includes model "${diffuser.model}" ${count} times`,
        );
      }
    }
  }

  await verifyLocalReferences(root, route, document, diagnostics);

  return { description, document, route, title };
}

function verifyUniqueMetadata(
  documents: RouteDocument[],
  diagnostics: string[],
): void {
  for (const field of ['title', 'description'] as const) {
    const firstRouteByValue = new Map<string, string>();
    for (const routeDocument of documents) {
      const value = routeDocument[field];
      if (!value) continue;
      const firstRoute = firstRouteByValue.get(value);
      if (firstRoute) {
        diagnostics.push(
          `${routeDocument.route.path}: duplicate ${field} "${value}" also used by ${firstRoute}`,
        );
      } else {
        firstRouteByValue.set(value, routeDocument.route.path);
      }
    }
  }
}

async function verifyRequiredStaticFiles(
  root: string,
  diagnostics: string[],
): Promise<void> {
  await Promise.all(
    REQUIRED_STATIC_FILES.map(async (file) => {
      if (!(await exists(resolve(root, file)))) {
        diagnostics.push(`/${file}: required static asset is missing`);
      }
    }),
  );
}

async function verifySitemap(root: string, diagnostics: string[]): Promise<void> {
  let sitemap: string;
  try {
    sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
  } catch {
    return;
  }

  const sitemapDocument = new JSDOM(sitemap, {
    contentType: 'text/xml',
  }).window.document;
  if (sitemapDocument.querySelector('parsererror')) {
    diagnostics.push('/sitemap.xml: sitemap is not valid XML');
    return;
  }

  const actualUrls = [...sitemapDocument.querySelectorAll('loc')].map(
    (element) => element.textContent?.trim() ?? '',
  );
  const expectedUrls = ROUTES.map((route) => absoluteUrl(route.path));
  const actualSorted = [...actualUrls].sort();
  const expectedSorted = [...expectedUrls].sort();

  if (JSON.stringify(actualSorted) !== JSON.stringify(expectedSorted)) {
    diagnostics.push(
      `/sitemap.xml: expected exactly ${expectedUrls.length} canonical URLs, found ${actualUrls.length}`,
    );
  }
}

async function verifyNotFound(root: string, diagnostics: string[]): Promise<void> {
  let html: string;
  try {
    html = await readFile(resolve(root, '404.html'), 'utf8');
  } catch {
    return;
  }

  const document = new JSDOM(html, { url: absoluteUrl('/404') }).window.document;
  const robots = document
    .querySelector<HTMLMetaElement>('meta[name="robots"]')
    ?.content.toLowerCase();
  const directives = new Set(robots?.split(/[,\s]+/).filter(Boolean) ?? []);
  if (!directives.has('noindex')) {
    diagnostics.push('/404.html: 404 page is indexable (missing noindex)');
  }
}

export async function verifyBuild(root = 'build/client'): Promise<BuildVerificationResult> {
  const resolvedRoot = resolve(root);
  const diagnostics: string[] = [];
  const documents = (
    await Promise.all(
      ROUTES.map((route) => inspectRoute(resolvedRoot, route, diagnostics)),
    )
  ).filter((document): document is RouteDocument => document !== undefined);

  verifyUniqueMetadata(documents, diagnostics);
  await verifyRequiredStaticFiles(resolvedRoot, diagnostics);
  await verifySitemap(resolvedRoot, diagnostics);
  await verifyNotFound(resolvedRoot, diagnostics);

  if (diagnostics.length > 0) {
    throw new Error(
      `Build verification failed with ${diagnostics.length} issue${diagnostics.length === 1 ? '' : 's'}:\n${diagnostics.map((diagnostic) => `- ${diagnostic}`).join('\n')}`,
    );
  }

  return {
    routes: ROUTES.length,
    staticAssets: REQUIRED_STATIC_FILES.length,
  };
}

const executedFile = process.argv[1] ? resolve(process.argv[1]) : '';

if (executedFile === fileURLToPath(import.meta.url)) {
  try {
    const result = await verifyBuild(resolve('build/client'));
    console.log(
      `Build verification passed: ${result.routes} canonical routes and ${result.staticAssets} required static assets are valid.`,
    );
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
