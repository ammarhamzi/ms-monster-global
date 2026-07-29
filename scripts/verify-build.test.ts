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
  'ms/404.html',
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
  'downloads/ms-monster-product-brochure.pdf',
] as const;

function pdfWithText(text: string): Buffer {
  const escapedText = text.replaceAll('\\', '\\\\').replaceAll('(', '\\(').replaceAll(')', '\\)');
  const stream = `BT /F1 12 Tf 72 720 Td (${escapedText}) Tj ET`;
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`,
  ];

  let body = '%PDF-1.4\n';
  const offsets = [0];
  for (const [index, object] of objects.entries()) {
    offsets.push(Buffer.byteLength(body));
    body += `${index + 1} 0 obj\n${object}\nendobj\n`;
  }
  const xrefOffset = Buffer.byteLength(body);
  body += `xref\n0 ${objects.length + 1}\n`;
  body += '0000000000 65535 f \n';
  body += offsets
    .slice(1)
    .map((offset) => `${String(offset).padStart(10, '0')} 00000 n \n`)
    .join('');
  body += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(body);
}

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
          ? '<!doctype html><html lang="en"><head><title>Page Not Found | MS Monster Global</title><meta name="robots" content="noindex,nofollow"></head><body><h1>This page is not available</h1></body></html>'
          : file === 'ms/404.html'
            ? '<!doctype html><html lang="ms"><head><title>Halaman Tidak Ditemukan | MS Monster Global</title><meta name="robots" content="noindex,nofollow"></head><body><h1>Halaman ini tidak tersedia</h1></body></html>'
          : file.endsWith('.pdf')
            ? pdfWithText('Documented diffuser product brochure')
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

  it('rejects a prohibited claim extracted from any published PDF', async () => {
    const root = await writeFixture();
    const unsafePdf = join(root, 'downloads', 'unsupported-claim.pdf');
    await writeFile(
      unsafePdf,
      pdfWithText('Proactive monitoring with 24/7 support'),
    );

    await expect(verifyBuild(root)).rejects.toThrow(
      '/downloads/unsupported-claim.pdf: contains unsupported claim "always available"',
    );
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

  it('requires the deployed Malay 404 document to remain localized', async () => {
    const root = await writeFixture();
    await writeFile(
      join(root, 'ms', '404.html'),
      '<!doctype html><html lang="en"><head><meta name="robots" content="noindex,nofollow"></head><body><h1>Page not found</h1></body></html>',
      'utf8',
    );

    await expect(verifyBuild(root)).rejects.toThrow(
      '/ms/404.html: expected html lang "ms", found "en"',
    );
  });
});
