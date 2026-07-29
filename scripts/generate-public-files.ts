import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROUTES, absoluteUrl } from '../app/config/routes';
import { SITE } from '../app/config/site';

const ROBOTS = `User-agent: *
Allow: /

Sitemap: ${SITE.origin}/sitemap.xml
`;

function buildSitemap(): string {
  const urls = ROUTES.map(
    (route) => `  <url>
    <loc>${absoluteUrl(route.path)}</loc>
  </url>`,
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export async function generatePublicFiles(clientDirectory: string): Promise<void> {
  await mkdir(clientDirectory, { recursive: true });
  await Promise.all([
    writeFile(resolve(clientDirectory, 'robots.txt'), ROBOTS, 'utf8'),
    writeFile(resolve(clientDirectory, 'sitemap.xml'), buildSitemap(), 'utf8'),
    copyFile(
      resolve(clientDirectory, '404', 'index.html'),
      resolve(clientDirectory, '404.html'),
    ),
  ]);
}

const executedFile = process.argv[1] ? resolve(process.argv[1]) : '';

if (executedFile === fileURLToPath(import.meta.url)) {
  await generatePublicFiles(resolve('build/client'));
}
