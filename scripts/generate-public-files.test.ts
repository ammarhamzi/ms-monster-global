import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { generatePublicFiles } from './generate-public-files';

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { recursive: true, force: true }),
    ),
  );
});

describe('public crawl-file generation', () => {
  it('writes canonical robots and a 16-URL sitemap without the 404 route', async () => {
    const clientDirectory = await mkdtemp(join(tmpdir(), 'ms-monster-public-files-'));
    const source404 = '<!doctype html><html><body>branded 404</body></html>';
    temporaryDirectories.push(clientDirectory);
    await mkdir(join(clientDirectory, '404'), { recursive: true });
    await writeFile(
      join(clientDirectory, '404', 'index.html'),
      source404,
      'utf8',
    );

    await generatePublicFiles(clientDirectory);

    const robots = await readFile(join(clientDirectory, 'robots.txt'), 'utf8');
    const sitemap = await readFile(join(clientDirectory, 'sitemap.xml'), 'utf8');
    const deployed404 = await readFile(join(clientDirectory, '404.html'), 'utf8');

    expect(robots).toBe(
      'User-agent: *\nAllow: /\n\nSitemap: https://msmonsterglobal.com/sitemap.xml\n',
    );
    expect(sitemap.match(/<url>/g)).toHaveLength(16);
    expect(sitemap).toContain(
      '<loc>https://msmonsterglobal.com/it-maintenance</loc>',
    );
    expect(sitemap).not.toContain('/404');
    expect(deployed404).toBe(source404);
  });
});
