import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import sharp from 'sharp';
import { generateBrandAssets } from './generate-brand-assets';

const execFileAsync = promisify(execFile);
const projectRoot = path.resolve(import.meta.dirname, '..');
const generatorPath = path.join(projectRoot, 'scripts/generate-brand-assets.ts');
const tsxPath = path.join(projectRoot, 'node_modules/.bin/tsx');

const expectedFiles = [
  'favicon.ico',
  'favicon.svg',
  'site.webmanifest',
  'assets/brand/logo-dark.webp',
  'assets/brand/logo-light.webp',
  'assets/brand/logo-mark-16.png',
  'assets/brand/logo-mark-32.png',
  'assets/brand/apple-touch-icon.png',
  'assets/brand/icon-192.png',
  'assets/brand/icon-512.png',
  'assets/social/corporate.jpg',
  'assets/social/it-maintenance.jpg',
  'assets/social/aroma-solutions.jpg',
] as const;

let firstOutput: string;
let secondOutput: string;

async function runGeneratorWithArguments(
  arguments_: string[],
  environment: NodeJS.ProcessEnv = {},
) {
  await execFileAsync(tsxPath, [generatorPath, ...arguments_], {
    cwd: projectRoot,
    env: { ...process.env, ...environment },
  });
}

async function runGenerator(outputDirectory: string) {
  await runGeneratorWithArguments(['--output', outputDirectory]);
}

async function expectImage(
  relativePath: string,
  expected: {
    width: number;
    height: number;
    format: 'jpeg' | 'png' | 'webp';
  },
) {
  const metadata = await sharp(path.join(firstOutput, relativePath)).metadata();

  expect(metadata).toMatchObject(expected);
}

beforeAll(async () => {
  firstOutput = await mkdtemp(path.join(tmpdir(), 'msmonster-brand-assets-a-'));
  secondOutput = await mkdtemp(path.join(tmpdir(), 'msmonster-brand-assets-b-'));

  await runGenerator(firstOutput);
  await runGenerator(secondOutput);
}, 30_000);

afterAll(async () => {
  await Promise.all([
    firstOutput ? rm(firstOutput, { recursive: true, force: true }) : undefined,
    secondOutput ? rm(secondOutput, { recursive: true, force: true }) : undefined,
  ]);
});

test.each([
  ['assets/brand/logo-mark-16.png', 16],
  ['assets/brand/logo-mark-32.png', 32],
  ['assets/brand/apple-touch-icon.png', 180],
  ['assets/brand/icon-192.png', 192],
  ['assets/brand/icon-512.png', 512],
] as const)('%s is a square PNG at the required size', async (file, size) => {
  await expectImage(file, { width: size, height: size, format: 'png' });
});

test('the extracted mark excludes pink pixels from the nearby slogan', async () => {
  const { data, info } = await sharp(
    path.join(firstOutput, 'assets/brand/icon-512.png'),
  )
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let pinkPixelCount = 0;

  for (let pixel = 0; pixel < info.width * info.height; pixel += 1) {
    const offset = pixel * info.channels;
    const red = data[offset];
    const green = data[offset + 1];
    const blue = data[offset + 2];
    const alpha = data[offset + 3];

    if (red > 200 && green < 150 && blue < 180 && alpha > 32) {
      pinkPixelCount += 1;
    }
  }

  expect(pinkPixelCount).toBe(0);
});

test.each([
  'assets/social/corporate.jpg',
  'assets/social/it-maintenance.jpg',
  'assets/social/aroma-solutions.jpg',
] as const)('%s is an optimized 1200×630 JPEG', async (file) => {
  await expectImage(file, { width: 1200, height: 630, format: 'jpeg' });
  expect((await stat(path.join(firstOutput, file))).size).toBeLessThan(500_000);
});

test.each([
  'assets/brand/logo-dark.webp',
  'assets/brand/logo-light.webp',
] as const)('%s is an optimized wordmark', async (file) => {
  const metadata = await sharp(path.join(firstOutput, file)).metadata();

  expect(metadata.format).toBe('webp');
  expect(metadata.width).toBeLessThanOrEqual(640);
  expect((await stat(path.join(firstOutput, file))).size).toBeLessThan(100_000);
});

test('manifest exposes the required app identity and icons', async () => {
  const manifest = JSON.parse(
    await readFile(path.join(firstOutput, 'site.webmanifest'), 'utf8'),
  );

  expect(manifest).toEqual({
    name: 'MS Monster Global',
    short_name: 'MS Monster',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#14532d',
    icons: [
      {
        src: '/assets/brand/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/brand/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  });
});

test('an inline output path generates only inside the requested directory', async () => {
  const inlineOutput = await mkdtemp(
    path.join(tmpdir(), 'msmonster-brand-assets-inline-'),
  );

  try {
    await runGeneratorWithArguments([`--output=${inlineOutput}`]);

    const manifest = JSON.parse(
      await readFile(path.join(inlineOutput, 'site.webmanifest'), 'utf8'),
    );
    expect(manifest.name).toBe('MS Monster Global');
  } finally {
    await rm(inlineOutput, { recursive: true, force: true });
  }
}, 30_000);

test('an empty inline output value is rejected instead of using public', async () => {
  await expect(runGeneratorWithArguments(['--output='])).rejects.toThrow(
    '--output requires a directory path.',
  );
}, 30_000);

test('bundled typography produces identical cards without host fonts', async () => {
  const isolationRoot = await mkdtemp(
    path.join(tmpdir(), 'msmonster-font-isolation-'),
  );
  const emptyFonts = path.join(isolationRoot, 'empty-fonts');
  const cacheDirectory = path.join(isolationRoot, 'font-cache');
  const isolatedOutput = path.join(isolationRoot, 'output');
  const fontConfig = path.join(isolationRoot, 'fonts.conf');

  try {
    await Promise.all([
      mkdir(emptyFonts),
      mkdir(cacheDirectory),
      writeFile(
        fontConfig,
        `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "urn:fontconfig:fonts.dtd">
<fontconfig>
  <dir>${emptyFonts}</dir>
  <cachedir>${cacheDirectory}</cachedir>
</fontconfig>
`,
        'utf8',
      ),
    ]);
    await runGeneratorWithArguments(['--output', isolatedOutput], {
      FONTCONFIG_FILE: fontConfig,
      FONTCONFIG_PATH: isolationRoot,
    });

    for (const file of [
      'assets/social/corporate.jpg',
      'assets/social/it-maintenance.jpg',
      'assets/social/aroma-solutions.jpg',
    ]) {
      const [normal, isolated] = await Promise.all([
        readFile(path.join(firstOutput, file)),
        readFile(path.join(isolatedOutput, file)),
      ]);

      expect(
        createHash('sha256').update(isolated).digest('hex'),
        file,
      ).toBe(createHash('sha256').update(normal).digest('hex'));
    }
  } finally {
    await rm(isolationRoot, { recursive: true, force: true });
  }
}, 30_000);

test('card pixels are derived from the configured bundled font', async () => {
  const fontTestRoot = await mkdtemp(
    path.join(tmpdir(), 'msmonster-font-behavior-'),
  );
  const explicitDefaultOutput = path.join(fontTestRoot, 'explicit-default');
  const alternateOutput = path.join(fontTestRoot, 'alternate');
  const fontDirectory = path.join(
    projectRoot,
    'node_modules/@fontsource/inter/files',
  );

  try {
    await generateBrandAssets(explicitDefaultOutput, {
      cardFontPath: path.join(fontDirectory, 'inter-latin-700-normal.woff2'),
    });
    await generateBrandAssets(alternateOutput, {
      cardFontPath: path.join(fontDirectory, 'inter-latin-400-normal.woff2'),
    });

    for (const file of [
      'assets/social/corporate.jpg',
      'assets/social/it-maintenance.jpg',
      'assets/social/aroma-solutions.jpg',
    ]) {
      const [defaultCard, explicitDefaultCard, alternateCard] = await Promise.all([
        readFile(path.join(firstOutput, file)),
        readFile(path.join(explicitDefaultOutput, file)),
        readFile(path.join(alternateOutput, file)),
      ]);
      const defaultHash = createHash('sha256').update(defaultCard).digest('hex');

      expect(
        createHash('sha256').update(explicitDefaultCard).digest('hex'),
        `${file} explicit default`,
      ).toBe(defaultHash);
      expect(
        createHash('sha256').update(alternateCard).digest('hex'),
        `${file} alternate font`,
      ).not.toBe(defaultHash);
    }
  } finally {
    await rm(fontTestRoot, { recursive: true, force: true });
  }
}, 30_000);

test('the complete generated asset set is byte-for-byte deterministic', async () => {
  for (const file of expectedFiles) {
    const [first, second] = await Promise.all([
      readFile(path.join(firstOutput, file)),
      readFile(path.join(secondOutput, file)),
    ]);
    const firstHash = createHash('sha256').update(first).digest('hex');
    const secondHash = createHash('sha256').update(second).digest('hex');

    expect(secondHash, file).toBe(firstHash);
  }
});
