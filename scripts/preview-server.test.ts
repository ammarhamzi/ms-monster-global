import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import type { AddressInfo } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { createPreviewServer } from './preview-server';

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { force: true, recursive: true }),
    ),
  );
});

describe('production preview server', () => {
  it('serves the matching prerendered document for a clean route', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ms-monster-preview-'));
    temporaryDirectories.push(root);
    await mkdir(join(root, 'perfume'), { recursive: true });
    await writeFile(
      join(root, 'index.html'),
      '<!doctype html><title>Home</title><h1>Home page</h1>',
      'utf8',
    );
    await writeFile(
      join(root, 'perfume', 'index.html'),
      '<!doctype html><title>Perfume</title><h1>Perfume &amp; Aroma catalogue</h1>',
      'utf8',
    );

    const server = createPreviewServer(root);
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));

    try {
      const { port } = server.address() as AddressInfo;
      const response = await fetch(`http://127.0.0.1:${port}/perfume`, {
        headers: { 'accept-encoding': 'gzip' },
      });
      const html = await response.text();

      expect(response.status).toBe(200);
      expect(response.headers.get('content-encoding')).toBe('gzip');
      expect(html).toContain('Perfume &amp; Aroma catalogue');
      expect(html).not.toContain('Home page');
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    }
  });
});
