# Task 8 Report: Brand assets and social previews

## Status

Complete. The deterministic generator, browser/device assets, optimized
wordmarks, social cards, root descriptors, and shell integration are implemented
and verified.

## Implementation and discovered sources

The generator discovers its repository root from `import.meta.dirname`, then
requires one case-insensitive match for each approved source under
`public/assets`. It does not depend on the caller's working directory.

- `logo-black.png` — 7016×4961 RGBA approved dark wordmark
- `logo-white.png` — 7016×4961 RGBA approved light wordmark
- `it-infrastructure-hero.jpg` — 1727×911 authentic server-room photo
- `perfume-aroma-hero.jpg` — 1695×928 authentic diffuser/fragrance photo

`sharp@0.35.3` and `png-to-ico@3.0.2` were installed as development
dependencies. `npm run generate:assets` runs the TypeScript generator, whose
CLI accepts `--output <directory>` or `--output=<directory>` and defaults to
`public`.

## Crop and generation method

- The approved black logo is decoded to raw RGBA pixels.
- A four-connected-component scan finds the largest region satisfying the
  required threshold: `g > 100`, `g > r * 1.3`, and `g > b * 1.3`.
- Extraction stops with an error unless that region is substantial and square
  within a 0.9–1.1 aspect-ratio guard. No fallback or replacement mark exists.
- The region's bounding box is expanded by 3% on every side (1.06× square),
  centered, and clamped to the source canvas.
- A source-derived circular alpha mask retains pixels through 1% beyond the
  detected green radius. This preserves the mark's antialiasing while removing
  unrelated nearby slogan pixels captured by the required 3% crop. The mark is
  never redrawn or recolored.
- Icons use Lanczos contain resizing on a transparent square. The ICO contains
  the generated 16px and 32px PNGs. The SVG embeds the generated 512px approved
  mark as a base64 PNG.
- Both wordmarks are transparency-trimmed, resized without enlargement to a
  maximum width of 640px, and encoded as lossless WebP.
- Social photos use Sharp `cover` crops, so their aspect ratios are preserved.
  The corporate card uses a 50/50 server-room/diffuser split and a subtle solid
  divider. Its aroma half is right-aligned so the diffuser and fragrance bottles
  remain visible. All cards use a solid dark overlay, the approved mark, solid
  white/green typography, exact brief copy, and `msmonsterglobal.com`.
- Sharp concurrency is fixed at one. The test generates into two independent
  temporary directories and proves every output is byte-for-byte identical.

## Generated output

| Path | Dimensions/format | Size |
| --- | --- | ---: |
| `public/favicon.ico` | 16×16 + 32×32 ICO | 5,430 B |
| `public/favicon.svg` | 512 viewBox SVG | 60,604 B |
| `public/site.webmanifest` | JSON | 405 B |
| `public/assets/brand/logo-dark.webp` | 640×111 WebP | 16,068 B |
| `public/assets/brand/logo-light.webp` | 640×111 WebP | 16,138 B |
| `public/assets/brand/logo-mark-16.png` | 16×16 PNG | 752 B |
| `public/assets/brand/logo-mark-32.png` | 32×32 PNG | 1,889 B |
| `public/assets/brand/apple-touch-icon.png` | 180×180 PNG | 13,301 B |
| `public/assets/brand/icon-192.png` | 192×192 PNG | 14,573 B |
| `public/assets/brand/icon-512.png` | 512×512 PNG | 45,349 B |
| `public/assets/social/corporate.jpg` | 1200×630 JPEG | 80,582 B |
| `public/assets/social/it-maintenance.jpg` | 1200×630 JPEG | 74,881 B |
| `public/assets/social/aroma-solutions.jpg` | 1200×630 JPEG | 78,952 B |

Both wordmarks are below 100 KB. Every card is below 500 KB. The manifest has
the exact required name, short name, start URL, display mode, colors, and
192/512 icon descriptors.

## Root and shell integration

`app/root.tsx` exports one React Router `LinksFunction` with SVG/ICO favicon,
Apple touch icon, and manifest descriptors. The root layout emits one
`theme-color` meta tag with `#14532d`; route metadata remains untouched, so
there are no conflicting title, canonical, or social descriptors.

Navbar and footer now load `logo-dark.webp` and `logo-light.webp` respectively,
both with explicit intrinsic `width={640}` and `height={111}`.

The production build contains byte-identical copies of all 13 generated
outputs. The prerendered home head contains each favicon, touch-icon, manifest,
and theme-color reference exactly once.

## RED → GREEN evidence

1. Initial asset contract RED: `npm test -- scripts/generate-brand-assets.test.ts`
   failed because `scripts/generate-brand-assets.ts` did not exist
   (`ERR_MODULE_NOT_FOUND`); all 12 contract cases were skipped behind the
   failed real CLI setup.
2. Generator GREEN: the focused suite passed 12/12, including dimensions,
   formats, budgets, exact manifest contents, temporary output behavior, and
   two-run SHA-256 determinism.
3. Root/shell RED: the focused tests failed because `links` was absent and the
   navbar still referenced `/assets/logo-black.png`.
4. Root/shell GREEN: the three focused files passed 18/18 after descriptors and
   optimized wordmark integration.
5. Visual regression RED: pixel inspection found 709 pink slogan pixels in the
   512px mark. A new real-output test expected zero and failed with
   `expected 709 to be 0`.
6. Visual regression GREEN: the source-derived mark mask removed only the
   out-of-mark contamination; the final asset contract passes 13/13.

## Final verification

- `npm test` — PASS, 16 files and 84 tests
- `npm run typecheck` — PASS
- `npm run generate:assets` — PASS
- `npm run build` — PASS, all configured routes prerendered
- Public/build SHA-256 comparisons — PASS for all 13 outputs
- Dimension, format, size, ICO membership, and exact-path checks — PASS
- Prerendered head reference counts — PASS, one each
- `git diff --check` — PASS

## Visual inspection

- **512px mark:** inspected at original size after regeneration. The supplied
  green ring and both leaves are intact, centered, and surrounded by transparent
  breathing room. No edge is clipped. The initially visible pink slogan
  fragment is absent.
- **Dark wordmark:** inspected on white at 640×111. `MS MONSTER`, the integrated
  green mark, and the supplied pink slogan are sharp and fully present. The crop
  is tight but no letter stroke is lost.
- **Light wordmark:** inspected on slate at 640×111. White letterforms, green
  mark, and pink slogan remain sharp and complete, with no canvas waste or
  clipping.
- **Corporate card:** inspected at 1200×630 and 600×315. Server infrastructure
  remains visible on the left; the diffuser, vapor, and fragrance bottles are
  visible on the right. The split is not stretched, both divisions are
  immediately legible, exact copy fits, and the domain remains readable.
- **IT card:** inspected at 1200×630 and 600×315. Server racks retain natural
  proportions and useful detail. The two-line service title, mark, and domain
  have clear contrast and remain readable reduced.
- **Aroma card:** inspected at 1200×630 and 600×315. Diffuser vapor, bottles,
  botanicals, and setting remain visible without distortion. The single-line
  title fits with generous margins and remains readable reduced.

## Self-review and concerns

The implementation uses only supplied brand pixels and repository photography.
It adds no ImageGen content, gradients in text, badges, customer counts,
replacement identity, or unsupported claims. Tests assert real CLI output
rather than source text or mocks, and expected values are literal.

No Task 8 blocker remains. `npm audit` reports four high-severity findings in
the existing React Router/PostCSS dependency graph; available React Router fixes
require a major upgrade and are outside this asset task. The successful build
also emits React Router v8 future-flag notices.
