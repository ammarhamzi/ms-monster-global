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

---

## Fix Round 1

### Findings addressed

1. Social-card text no longer depends on Arial, Helvetica, `sans-serif`, or any
   other host-installed font.
2. An empty inline `--output=` value now fails before any directory or asset is
   written instead of silently selecting production `public`.

### Bundled font, source, and licence

- `@fontsource/inter@5.3.0` is pinned exactly in `devDependencies` and
  `package-lock.json`.
- The generator resolves the package-exported
  `files/inter-latin-700-normal.woff2` asset with Node package resolution and
  requires it before creating output directories.
- Inter is Copyright 2016 The Inter Project Authors. Upstream source:
  <https://github.com/rsms/inter>. The pinned Fontsource package points to
  <https://github.com/fontsource/font-files/tree/main/fonts/google/inter>.
- The font is distributed under SIL Open Font License 1.1. The complete licence
  is shipped as `@fontsource/inter/LICENSE`; OFL 1.1 expressly permits bundling,
  embedding, and redistribution with software.
- `fontkit@2.0.4` and `@types/fontkit@2.0.9` are also pinned exactly.
  Fontkit is MIT-licensed.

The generator loads Inter with Fontkit, shapes each exact copy string, and
embeds the selected glyph outlines directly as SVG `<path>` geometry before
Sharp composites the layer. The card SVGs contain no `<text>` elements and do
not ask Pango, Fontconfig, CoreText, or another host resolver for a typeface.
Fixed six-decimal transform formatting makes the generated SVG geometry stable.

`generateBrandAssets(output, { cardFontPath })` accepts an explicit font path
for behavior verification. Production calls omit the option and therefore
require the pinned Inter 700 package asset.

### CLI parsing fix

`parseOutputDirectory` now distinguishes “no output option” from “an output
option whose value is empty.” Both `--output` without a following value and
`--output=` throw `--output requires a directory path.` Valid
`--output=/temporary/path` continues to resolve and write only there.

### RED → GREEN evidence

The first new RED run was:

```text
npm test -- scripts/generate-brand-assets.test.ts
Test Files  1 failed (1)
Tests       1 failed | 15 passed (16)
empty inline output: promise resolved "undefined" instead of rejecting
```

That run also demonstrated that Fontconfig-only isolation was not sufficient
proof on the macOS renderer: the pre-fix host-font generator still produced the
same hashes. A second behavior test was therefore added to make the font input
observable through real generator output. The second RED run was:

```text
npm test -- scripts/generate-brand-assets.test.ts
Test Files  1 failed (1)
Tests       2 failed | 15 passed (17)
empty inline output: promise resolved instead of rejecting
corporate alternate font: expected alternate hash not to equal default hash
```

This fails if the generator ignores the configured font or falls back to a host
font. After the implementation, the explicit Inter 700 output is byte-identical
to the default output, Inter 400 produces different pixels for all three cards,
and an empty-font Fontconfig environment remains byte-identical to normal:

```text
npm test -- scripts/generate-brand-assets.test.ts
Test Files  1 passed (1)
Tests       17 passed (17)
```

The first GREEN attempt exposed a Vitest limitation for
`import.meta.resolve` before test collection. Replacing that resolver with
`createRequire(import.meta.url).resolve(...)` preserved package-export
resolution in both the CLI and Vitest; no rendering logic was changed for that
compatibility fix.

### Covering tests

- Valid inline form generates a real manifest inside the requested temporary
  directory.
- Empty inline form rejects through the real CLI with the required error.
- Two normal temporary runs remain byte-for-byte deterministic.
- A subprocess with an empty Fontconfig directory produces the same three card
  hashes.
- Explicit Inter 700 produces the same hashes as the production default.
- Explicit Inter 400 produces different hashes for every card, proving font
  bytes drive the rendered output rather than a host fallback.

### Regenerated cards

Only the three social-card binaries changed:

| Path | Dimensions | Size | SHA-256 |
| --- | ---: | ---: | --- |
| `public/assets/social/corporate.jpg` | 1200×630 | 81,840 B | `0197cfbb721a8dbf265a20ce025fa7461f35ff89ad7db9691c292f66b7fd567a` |
| `public/assets/social/it-maintenance.jpg` | 1200×630 | 75,412 B | `3e716015028e21a4f43b04622429d9cb2d38f0c9d5643dca6e20fbc2e8342d0d` |
| `public/assets/social/aroma-solutions.jpg` | 1200×630 | 78,999 B | `6a5158668bc02ac5414024d49fd564f502d98be6ec8ce56e1f88274405652840` |

All remain far below 500 KB. The other ten generated assets retained their
previous hashes. The production build contains byte-identical copies of every
public asset.

### Visual QA after font change

- **Corporate:** inspected at 1200×630 and 600×315. Inter glyphs are sharp;
  title, bullet, subtitle, and domain are intact with no clipping. The split
  server/diffuser image remains clear and unstretched.
- **IT:** inspected at 1200×630 and 600×315. The ampersand and two-line title
  render correctly; “Maintenance” retains right-side breathing room. Server
  racks remain proportionate.
- **Aroma:** inspected at 1200×630 and 600×315. The one-line title stays within
  the safe area and the domain is readable. Diffuser vapor, bottles, and
  botanicals retain their framing and proportions.

### Exact final verification

```text
npm test -- scripts/generate-brand-assets.test.ts app/root.test.tsx app/components/layout/localized-shell.test.tsx
Test Files  3 passed (3)
Tests       23 passed (23)

npm run typecheck
PASS

npm test
Test Files  16 passed (16)
Tests       88 passed (88)

npm run generate:assets
PASS

npm run build
PASS; all configured English/Malay routes and 404 prerendered
```

The final verification script also checked all 13 required paths, dimensions,
sizes, SHA-256 public/build equality, and one rendered occurrence of each root
favicon/touch-icon/manifest/theme-color descriptor. `git diff --check` passed.

### Fix-round self-review and concerns

The font package and rendering engine are exact-version dependencies; card
glyphs are embedded paths and cannot silently resolve to a host font. Tests
exercise CLI errors, real temporary outputs, isolated environment output, and
observable alternate-font pixel changes without grepping source. The fix does
not change brand imagery, claims, paths, manifest values, root integration, or
wordmark/icon generation.

No Fix Round 1 blocker remains. The existing four high-severity
React Router/PostCSS audit findings and React Router v8 future-flag build
notices remain outside this scoped generator fix.
