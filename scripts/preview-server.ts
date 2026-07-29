import { readFile } from 'node:fs/promises';
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { extname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const CONTENT_TYPES: Record<string, string> = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
};

const COMPRESSIBLE_TYPES = /^(?:application\/(?:json|manifest\+json|xml)|text\/|image\/svg\+xml)/;

function safeFilePath(root: string, pathname: string): string | undefined {
  const path = resolve(root, `.${pathname}`);
  const relativePath = relative(root, path);
  if (relativePath === '..' || relativePath.startsWith(`..${sep}`)) return undefined;
  return path;
}

function requestedFilePath(root: string, pathname: string): string | undefined {
  const routePath =
    pathname === '/'
      ? '/index.html'
      : pathname.endsWith('/')
        ? `${pathname}index.html`
        : extname(pathname)
          ? pathname
          : `${pathname}/index.html`;
  return safeFilePath(root, routePath);
}

async function respond(
  root: string,
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  let pathname: string;
  try {
    pathname = decodeURIComponent(
      new URL(request.url ?? '/', 'http://preview.local').pathname,
    );
  } catch {
    response.writeHead(400).end('Bad request');
    return;
  }

  let status = 200;
  let filePath = requestedFilePath(root, pathname);
  let body: Buffer;
  try {
    if (!filePath) throw new Error('unsafe path');
    body = await readFile(filePath);
  } catch {
    status = 404;
    filePath = resolve(
      root,
      pathname === '/ms' || pathname.startsWith('/ms/')
        ? 'ms/404.html'
        : '404.html',
    );
    try {
      body = await readFile(filePath);
    } catch {
      response.writeHead(404).end('Not found');
      return;
    }
  }

  const contentType =
    CONTENT_TYPES[extname(filePath).toLowerCase()] ?? 'application/octet-stream';
  const acceptsGzip = /\bgzip\b/i.test(request.headers['accept-encoding'] ?? '');
  if (acceptsGzip && COMPRESSIBLE_TYPES.test(contentType)) {
    body = gzipSync(body);
    response.setHeader('content-encoding', 'gzip');
    response.setHeader('vary', 'accept-encoding');
  }

  response.statusCode = status;
  response.setHeader('content-type', contentType);
  response.setHeader('content-length', body.byteLength);
  if (request.method === 'HEAD') {
    response.end();
  } else {
    response.end(body);
  }
}

export function createPreviewServer(root: string) {
  const resolvedRoot = resolve(root);
  return createServer((request, response) => {
    void respond(resolvedRoot, request, response).catch(() => {
      if (!response.headersSent) response.writeHead(500);
      response.end('Internal server error');
    });
  });
}

function optionValue(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const executedFile = process.argv[1] ? resolve(process.argv[1]) : '';

if (executedFile === fileURLToPath(import.meta.url)) {
  const root = resolve(optionValue('--root') ?? 'build/client');
  const port = Number(optionValue('--port') ?? process.env.PORT ?? 4173);
  const server = createPreviewServer(root);
  server.listen(port, '127.0.0.1', () => {
    console.log(`Production preview: http://127.0.0.1:${port}`);
  });
}
