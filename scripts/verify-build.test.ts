import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { ROUTES, absoluteUrl, getCounterpart } from '../app/config/routes';
import { diffusers } from '../app/data/products';
import { verifyBuild } from './verify-build';

const temporaryDirectories: string[] = [];

const requiredStaticFiles = [
  '404.html',
  'robots.txt',
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

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { force: true, recursive: true }),
    ),
  );
});

function routeHtml(
  route: (typeof ROUTES)[number],
  overrides: {
    description?: string | null;
    ogImage?: string;
    title?: string;
    twitterImage?: string;
  } = {},
): string {
  const counterpart = getCounterpart(route);
  const englishRoute = route.locale === 'en' ? route : counterpart;
  const malayRoute = route.locale === 'ms' ? route : counterpart;
  const title = overrides.title ?? route.title;
  const description =
    overrides.description === undefined ? route.description : overrides.description;
  const socialImage = absoluteUrl(`/assets/social/${route.socialCard === 'it' ? 'it-maintenance' : route.socialCard === 'aroma' ? 'aroma-solutions' : 'corporate'}.jpg`);
  const ogImage = overrides.ogImage ?? socialImage;
  const twitterImage = overrides.twitterImage ?? socialImage;

  const perfumeCatalogue =
    route.key === 'perfume'
      ? diffusers
          .map((diffuser) => `<article><h3>${diffuser.model}</h3></article>`)
          .join('')
      : '';

  return `<!doctype html>
<html lang="${route.locale}">
  <head>
    <title>${title}</title>
    ${description === null ? '' : `<meta name="description" content="${description}">`}
    <link rel="canonical" href="${absoluteUrl(route.path)}">
    <link rel="alternate" hreflang="en" href="${absoluteUrl(englishRoute.path)}">
    <link rel="alternate" hreflang="ms" href="${absoluteUrl(malayRoute.path)}">
    <link rel="alternate" hreflang="x-default" href="${absoluteUrl(englishRoute.path)}">
    <meta property="og:image" content="${ogImage}">
    <meta name="twitter:image" content="${twitterImage}">
    <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebSite","name":"${title}"}]}</script>
  </head>
  <body>
    <main><h1>${title}</h1><p>Visible page content for ${route.path}.</p>${perfumeCatalogue}</main>
  </body>
</html>`;
}

async function writeFixture(
  overrides: Partial<
    Record<
      string,
      {
        description?: string | null;
        ogImage?: string;
        title?: string;
        twitterImage?: string;
      }
    >
  > = {},
): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), 'ms-monster-verify-build-'));
  temporaryDirectories.push(root);

  await Promise.all(
    ROUTES.map(async (route) => {
      const output = join(root, route.path === '/' ? 'index.html' : `${route.path.slice(1)}/index.html`);
      await mkdir(dirname(output), { recursive: true });
      await writeFile(output, routeHtml(route, overrides[route.path]), 'utf8');
    }),
  );

  await Promise.all(
    requiredStaticFiles.map(async (file) => {
      const output = join(root, file);
      await mkdir(dirname(output), { recursive: true });
      const contents =
        file === '404.html'
          ? '<!doctype html><html lang="en"><head><meta name="robots" content="noindex,nofollow"></head><body><h1>Page not found</h1></body></html>'
          : `fixture for ${file}`;
      await writeFile(output, contents);
    }),
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((route) => `  <url><loc>${absoluteUrl(route.path)}</loc></url>`).join('\n')}
</urlset>`;
  await writeFile(join(root, 'sitemap.xml'), sitemap, 'utf8');

  return root;
}

describe('generated build verification', () => {
  it('reports a missing description and duplicate title with their routes', async () => {
    const root = await writeFixture({
      '/about': { description: null },
      '/it-maintenance': { title: ROUTES.find((route) => route.path === '/about')?.title },
    });

    await expect(verifyBuild(root)).rejects.toThrow(/\/about: missing meta description/);
    await expect(verifyBuild(root)).rejects.toThrow(
      /\/it-maintenance: duplicate title .*\/about/,
    );
  });

  it('accepts a complete fixture with canonical metadata, schema, and visible content', async () => {
    const root = await writeFixture();

    await expect(verifyBuild(root)).resolves.toMatchObject({
      routes: 12,
    });
  });

  it('rejects a unified perfume page that omits a documented model from HTML', async () => {
    const root = await writeFixture();
    const perfumePath = join(root, 'perfume', 'index.html');
    const perfumeHtml = await readFile(perfumePath, 'utf8');
    await writeFile(
      perfumePath,
      perfumeHtml.replace('<article><h3>MF120A</h3></article>', ''),
      'utf8',
    );

    await expect(verifyBuild(root)).rejects.toThrow(
      '/perfume: diffuser catalogue is missing model "MF120A"',
    );
  });

  it('rejects a route-like internal link that resolves only to an empty directory', async () => {
    const root = await writeFixture();
    const homePath = join(root, 'index.html');
    const home = await readFile(homePath, 'utf8');
    await mkdir(join(root, 'empty-route'));
    await writeFile(
      homePath,
      home.replace(
        '</main>',
        '<a href="/empty-route">Empty route</a></main>',
      ),
      'utf8',
    );

    await expect(verifyBuild(root)).rejects.toThrow(
      '/: internal route "/empty-route" is missing generated HTML',
    );
  });

  it('rejects encoded separator traversal even when an out-of-root index exists', async () => {
    const root = await writeFixture();
    const outsideRoute = `outside-${basename(root)}`;
    const outsideDirectory = join(dirname(root), outsideRoute);
    const homePath = join(root, 'index.html');
    const home = await readFile(homePath, 'utf8');
    temporaryDirectories.push(outsideDirectory);
    await mkdir(outsideDirectory);
    await writeFile(
      join(outsideDirectory, 'index.html'),
      '<!doctype html><title>Outside build root</title>',
      'utf8',
    );
    await writeFile(
      homePath,
      home.replace(
        '</main>',
        `<a href="/..%2F${outsideRoute}">Outside route</a></main>`,
      ),
      'utf8',
    );

    await expect(verifyBuild(root)).rejects.toThrow(
      new RegExp(`internal route "/../${outsideRoute}" is missing generated HTML`),
    );
  });

  it('rejects whitespace-only Open Graph and Twitter image values', async () => {
    const root = await writeFixture({
      '/about': { ogImage: '   ' },
      '/it-maintenance': { twitterImage: ' \t ' },
    });

    await expect(verifyBuild(root)).rejects.toThrow(
      '/about: missing Open Graph image',
    );
    await expect(verifyBuild(root)).rejects.toThrow(
      '/it-maintenance: missing Twitter image',
    );
  });

  it('requires noindex as an exact robots directive on the 404 page', async () => {
    const root = await writeFixture();
    await writeFile(
      join(root, '404.html'),
      '<!doctype html><html lang="en"><head><meta name="robots" content="xnoindexx,nofollow"></head><body><h1>Page not found</h1></body></html>',
      'utf8',
    );

    await expect(verifyBuild(root)).rejects.toThrow(
      '/404.html: 404 page is indexable (missing noindex)',
    );
  });
});
