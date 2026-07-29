import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { create as createFont, type Font } from 'fontkit';
import pngToIco from 'png-to-ico';
import sharp from 'sharp';

const projectRoot = path.resolve(import.meta.dirname, '..');
const sourceDirectory = path.join(projectRoot, 'public/assets');
const defaultOutputDirectory = path.join(projectRoot, 'public');
const defaultCardFontPath = createRequire(import.meta.url).resolve(
  '@fontsource/inter/files/inter-latin-700-normal.woff2',
);

const MANIFEST = {
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
} as const;

type SourceAssets = {
  darkLogo: string;
  lightLogo: string;
  itHero: string;
  aromaHero: string;
};

type BoundingBox = {
  left: number;
  top: number;
  width: number;
  height: number;
  area: number;
};

type SocialCard = {
  title: string;
  titleLines?: [string, string];
  subtitle?: string;
  image: 'it' | 'aroma';
};

type GenerateBrandAssetsOptions = {
  cardFontPath?: string;
};

async function discoverSourceAssets(): Promise<SourceAssets> {
  const entries = await readdir(sourceDirectory, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);

  function findUnique(fileName: string): string {
    const matches = files.filter(
      (candidate) => candidate.toLowerCase() === fileName.toLowerCase(),
    );

    if (matches.length !== 1) {
      throw new Error(
        `Expected one ${fileName} source asset in ${sourceDirectory}; found ${matches.length}.`,
      );
    }

    return path.join(sourceDirectory, matches[0]);
  }

  return {
    darkLogo: findUnique('logo-black.png'),
    lightLogo: findUnique('logo-white.png'),
    itHero: findUnique('it-infrastructure-hero.jpg'),
    aromaHero: findUnique('perfume-aroma-hero.jpg'),
  };
}

function largestGreenRegion(
  data: Buffer,
  width: number,
  height: number,
  channels: number,
): BoundingBox {
  const pixelCount = width * height;
  const mask = new Uint8Array(pixelCount);
  let greenPixelCount = 0;

  for (let pixel = 0; pixel < pixelCount; pixel += 1) {
    const offset = pixel * channels;
    const red = data[offset];
    const green = data[offset + 1];
    const blue = data[offset + 2];
    const alpha = channels === 4 ? data[offset + 3] : 255;

    if (
      alpha > 0 &&
      green > 100 &&
      green > red * 1.3 &&
      green > blue * 1.3
    ) {
      mask[pixel] = 1;
      greenPixelCount += 1;
    }
  }

  if (greenPixelCount === 0) {
    throw new Error('No dominant-green pixels were found in the approved logo.');
  }

  const queue = new Int32Array(greenPixelCount);
  let largest: BoundingBox | undefined;

  for (let start = 0; start < pixelCount; start += 1) {
    if (mask[start] === 0) continue;

    let head = 0;
    let tail = 0;
    let area = 0;
    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;

    mask[start] = 0;
    queue[tail] = start;
    tail += 1;

    while (head < tail) {
      const pixel = queue[head];
      head += 1;
      area += 1;

      const x = pixel % width;
      const y = Math.floor(pixel / width);
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);

      const neighbors = [
        x > 0 ? pixel - 1 : -1,
        x + 1 < width ? pixel + 1 : -1,
        y > 0 ? pixel - width : -1,
        y + 1 < height ? pixel + width : -1,
      ];

      for (const neighbor of neighbors) {
        if (neighbor >= 0 && mask[neighbor] === 1) {
          mask[neighbor] = 0;
          queue[tail] = neighbor;
          tail += 1;
        }
      }
    }

    if (!largest || area > largest.area) {
      largest = {
        left: minX,
        top: minY,
        width: maxX - minX + 1,
        height: maxY - minY + 1,
        area,
      };
    }
  }

  if (!largest) {
    throw new Error('The approved logo did not contain a connected green region.');
  }

  const aspectRatio = largest.width / largest.height;
  const minimumSide = Math.min(width, height) * 0.1;

  if (
    largest.width < minimumSide ||
    largest.height < minimumSide ||
    aspectRatio < 0.9 ||
    aspectRatio > 1.1
  ) {
    throw new Error(
      `The largest green region is not a reliable square mark (${largest.width}×${largest.height}).`,
    );
  }

  return largest;
}

function expandedSquareCrop(
  region: BoundingBox,
  imageWidth: number,
  imageHeight: number,
): Pick<BoundingBox, 'left' | 'top' | 'width' | 'height'> {
  const expandedSide = Math.ceil(Math.max(region.width, region.height) * 1.06);
  const side = Math.min(expandedSide, imageWidth, imageHeight);
  const centerX = region.left + region.width / 2;
  const centerY = region.top + region.height / 2;
  const left = Math.max(0, Math.min(imageWidth - side, Math.round(centerX - side / 2)));
  const top = Math.max(0, Math.min(imageHeight - side, Math.round(centerY - side / 2)));

  return { left, top, width: side, height: side };
}

async function extractApprovedMark(sourcePath: string): Promise<Buffer> {
  const { data, info } = await sharp(sourcePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const region = largestGreenRegion(data, info.width, info.height, info.channels);
  const crop = expandedSquareCrop(region, info.width, info.height);
  const centerX = region.left + region.width / 2 - crop.left;
  const centerY = region.top + region.height / 2 - crop.top;
  const radius = Math.max(region.width, region.height) * 0.51;
  const markMask = Buffer.from(
    `<svg width="${crop.width}" height="${crop.height}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="#ffffff"/>
    </svg>`,
  );

  return sharp(sourcePath)
    .extract(crop)
    .composite([{ input: markMask, blend: 'dest-in' }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function optimizedWordmark(sourcePath: string): Promise<Buffer> {
  return sharp(sourcePath)
    .trim({
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      threshold: 8,
    })
    .resize({ width: 640, withoutEnlargement: true })
    .webp({ lossless: true, effort: 6 })
    .toBuffer();
}

async function iconBuffer(mark: Buffer, size: number): Promise<Buffer> {
  return sharp(mark)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: sharp.kernel.lanczos3,
    })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

function formatSvgNumber(value: number): string {
  return Number(value.toFixed(6)).toString();
}

function embeddedTextPath(
  font: Font,
  text: string,
  x: number,
  baseline: number,
  fontSize: number,
  letterSpacing = 0,
): string {
  const run = font.layout(text);
  const scale = fontSize / font.unitsPerEm;
  let cursor = x;

  const paths = run.glyphs.map((glyph, index) => {
    const position = run.positions[index];
    const markup = `<path d="${glyph.path.toSVG()}" transform="translate(${formatSvgNumber(cursor)} ${formatSvgNumber(baseline)}) scale(${formatSvgNumber(scale)} ${formatSvgNumber(-scale)}) translate(${formatSvgNumber(position.xOffset)} ${formatSvgNumber(position.yOffset)})"/>`;

    cursor += position.xAdvance * scale;
    if (index + 1 < run.glyphs.length) cursor += letterSpacing;

    return markup;
  });

  return paths.join('');
}

function cardTextSvg(card: SocialCard, font: Font): Buffer {
  const titleMarkup = card.titleLines
    ? `<g fill="#ffffff">${embeddedTextPath(font, card.titleLines[0], 72, 296, 68, -1)}</g>
      <g fill="#ffffff">${embeddedTextPath(font, card.titleLines[1], 72, 376, 68, -1)}</g>`
    : `<g fill="#ffffff">${embeddedTextPath(font, card.title, 72, 334, 68, -1)}</g>`;
  const subtitleMarkup = card.subtitle
    ? `<g fill="#ffffff">${embeddedTextPath(font, card.subtitle, 72, 402, 32)}</g>`
    : '';

  return Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#020617" fill-opacity="0.64"/>
    ${titleMarkup}
    ${subtitleMarkup}
    <rect x="72" y="542" width="56" height="5" rx="2.5" fill="#39b500"/>
    <g fill="#ffffff">${embeddedTextPath(font, 'msmonsterglobal.com', 144, 558, 27, 0.5)}</g>
  </svg>`);
}

async function coverPhoto(
  sourcePath: string,
  width: number,
  height: number,
  position: 'attention' | 'right' = 'attention',
): Promise<Buffer> {
  return sharp(sourcePath)
    .resize(width, height, {
      fit: 'cover',
      position:
        position === 'attention' ? sharp.strategy.attention : sharp.gravity.east,
      kernel: sharp.kernel.lanczos3,
    })
    .jpeg({ quality: 88, chromaSubsampling: '4:4:4' })
    .toBuffer();
}

async function socialCard(
  card: SocialCard,
  sources: SourceAssets,
  cardMark: Buffer,
  cardFont: Font,
): Promise<Buffer> {
  const photoSource = card.image === 'it' ? sources.itHero : sources.aromaHero;
  const photo = await coverPhoto(photoSource, 1200, 630);

  return sharp(photo)
    .composite([
      { input: cardTextSvg(card, cardFont), left: 0, top: 0 },
      { input: cardMark, left: 72, top: 58 },
    ])
    .jpeg({
      quality: 84,
      chromaSubsampling: '4:2:0',
      progressive: false,
      mozjpeg: false,
    })
    .toBuffer();
}

async function corporateCard(
  sources: SourceAssets,
  cardMark: Buffer,
  cardFont: Font,
): Promise<Buffer> {
  const [itPhoto, aromaPhoto] = await Promise.all([
    coverPhoto(sources.itHero, 600, 630),
    coverPhoto(sources.aromaHero, 600, 630, 'right'),
  ]);
  const base = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: '#020617',
    },
  })
    .composite([
      { input: itPhoto, left: 0, top: 0 },
      { input: aromaPhoto, left: 600, top: 0 },
    ])
    .jpeg({ quality: 88, chromaSubsampling: '4:4:4' })
    .toBuffer();

  const text = cardTextSvg(
    {
      title: 'MS Monster Global',
      subtitle: 'IT Maintenance • Perfume & Aroma',
      image: 'it',
    },
    cardFont,
  );
  const divider = Buffer.from(
    '<svg width="4" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="4" height="630" fill="#ffffff" fill-opacity="0.28"/></svg>',
  );

  return sharp(base)
    .composite([
      { input: text, left: 0, top: 0 },
      { input: divider, left: 598, top: 0 },
      { input: cardMark, left: 72, top: 58 },
    ])
    .jpeg({
      quality: 84,
      chromaSubsampling: '4:2:0',
      progressive: false,
      mozjpeg: false,
    })
    .toBuffer();
}

function parseOutputDirectory(argv: string[]): string {
  const outputIndex = argv.indexOf('--output');
  const inlineOutputArgument = argv.find((argument) =>
    argument.startsWith('--output='),
  );
  const requested =
    outputIndex >= 0
      ? argv[outputIndex + 1]
      : inlineOutputArgument?.slice('--output='.length);

  if ((outputIndex >= 0 || inlineOutputArgument !== undefined) && !requested) {
    throw new Error('--output requires a directory path.');
  }

  return requested ? path.resolve(requested) : defaultOutputDirectory;
}

export async function generateBrandAssets(
  outputDirectory: string,
  options: GenerateBrandAssetsOptions = {},
): Promise<void> {
  sharp.concurrency(1);

  const sources = await discoverSourceAssets();
  const cardFont = createFont(
    await readFile(options.cardFontPath ?? defaultCardFontPath),
  ) as Font;
  const brandDirectory = path.join(outputDirectory, 'assets/brand');
  const socialDirectory = path.join(outputDirectory, 'assets/social');
  await Promise.all([
    mkdir(outputDirectory, { recursive: true }),
    mkdir(brandDirectory, { recursive: true }),
    mkdir(socialDirectory, { recursive: true }),
  ]);

  const [mark, darkWordmark, lightWordmark] = await Promise.all([
    extractApprovedMark(sources.darkLogo),
    optimizedWordmark(sources.darkLogo),
    optimizedWordmark(sources.lightLogo),
  ]);
  const [mark16, mark32, touchIcon, icon192, icon512, cardMark] =
    await Promise.all([
      iconBuffer(mark, 16),
      iconBuffer(mark, 32),
      iconBuffer(mark, 180),
      iconBuffer(mark, 192),
      iconBuffer(mark, 512),
      iconBuffer(mark, 112),
    ]);
  const faviconIco = await pngToIco([mark16, mark32]);
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <image width="512" height="512" href="data:image/png;base64,${icon512.toString('base64')}"/>
</svg>
`;

  const [corporate, itMaintenance, aromaSolutions] = await Promise.all([
    corporateCard(sources, cardMark, cardFont),
    socialCard(
      {
        title: 'IT & AI Maintenance Services',
        titleLines: ['IT & AI Maintenance', 'Services'],
        image: 'it',
      },
      sources,
      cardMark,
      cardFont,
    ),
    socialCard(
      {
        title: 'Perfume & Aroma',
        image: 'aroma',
      },
      sources,
      cardMark,
      cardFont,
    ),
  ]);

  await Promise.all([
    writeFile(path.join(outputDirectory, 'favicon.ico'), faviconIco),
    writeFile(path.join(outputDirectory, 'favicon.svg'), faviconSvg, 'utf8'),
    writeFile(
      path.join(outputDirectory, 'site.webmanifest'),
      `${JSON.stringify(MANIFEST, null, 2)}\n`,
      'utf8',
    ),
    writeFile(path.join(brandDirectory, 'logo-dark.webp'), darkWordmark),
    writeFile(path.join(brandDirectory, 'logo-light.webp'), lightWordmark),
    writeFile(path.join(brandDirectory, 'logo-mark-16.png'), mark16),
    writeFile(path.join(brandDirectory, 'logo-mark-32.png'), mark32),
    writeFile(path.join(brandDirectory, 'apple-touch-icon.png'), touchIcon),
    writeFile(path.join(brandDirectory, 'icon-192.png'), icon192),
    writeFile(path.join(brandDirectory, 'icon-512.png'), icon512),
    writeFile(path.join(socialDirectory, 'corporate.jpg'), corporate),
    writeFile(path.join(socialDirectory, 'it-maintenance.jpg'), itMaintenance),
    writeFile(path.join(socialDirectory, 'aroma-solutions.jpg'), aromaSolutions),
  ]);
}

const executedFile = process.argv[1] ? path.resolve(process.argv[1]) : '';

if (executedFile === fileURLToPath(import.meta.url)) {
  const outputDirectory = parseOutputDirectory(process.argv.slice(2));
  await generateBrandAssets(outputDirectory);
}
