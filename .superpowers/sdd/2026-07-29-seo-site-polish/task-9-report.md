# Task 9 report

## Impeccable preflight

`IMPECCABLE_PREFLIGHT: context=pass product=pass command_reference=pass shape=not_required image_gate=skipped:approved_existing_assets_only mutation=open`

- The context loader result is known: neither `PRODUCT.md` nor `DESIGN.md` is present.
- The direct Task 9 brief explicitly permits that state and requires preservation of the established system, so the existing tokens, shared components, and approved assets are the design-system source of truth.
- Register: brand/corporate. Quality bar: flagship.
- Command reference: `polish.md`, fully read before source mutation.
- Shape is not required for this bounded final polish pass; requirements and exact acceptance values are already confirmed in the Task 9 brief.
- Image generation is skipped because the brief restricts work to authentic existing imagery and approved generated brand assets.

## Design-system assessment

The established system is a professional corporate brand surface with:

- a 1280px content width, 20px mobile gutters, 24px small-screen gutters, and 32px desktop gutters;
- an 80px fixed header and consistent route offsets;
- slate neutral surfaces, emerald roles for aroma/corporate action, and blue roles for IT;
- solid surfaces and borders, restrained shadows, square editorial imagery, and 44px to 48px controls;
- one system sans stack, with hierarchy created through weight and scale;
- transform and opacity motion wrapped by `MotionConfig reducedMotion="user"`.

The polish pass preserved these conventions. No new font, gradient text, glass card, nested-card system, decorative badge, unsupported proof, or generated imagery was introduced.

Root-cause categories:

- **Missing token/guardrail:** there was no global fallback for focus-visible, reduced-motion duration, scroll offset, or horizontal overflow.
- **One-off implementation:** gutters, target sizes, inactive language contrast, footer current states, and image delivery metadata varied between shared components and route pages.
- **Conceptual misalignment:** the About incorporation summary reused the timeline H2, and the mobile wordmark width competed with the language and menu controls.

Functional accessibility and responsive defects were handled before cosmetic normalization.

## Implementation and files

- `app/accessibility.test.tsx`
  - Added 18 behavior tests covering one H1, logical heading progression, non-empty informative alternatives, intrinsic image dimensions, decorative SVG hiding, current states, named navigation/language controls, visible-label-compatible link names, Escape/focus return, pathname-driven closure, and static Malay aroma route output.
  - Added explicit below-fold footer-logo lazy-loading coverage.
- `app/components/layout/Navbar.tsx`
  - Standardized the shared gutter.
  - Added 44px desktop navigation targets.
  - Replaced punctuation in the wordmark accessible name while retaining the visible brand name.
  - Added a bounded fluid mobile wordmark width so EN, BM, and the menu disclosure remain inside the viewport.
  - Retained Escape handling, focus return, pathname closure, `aria-expanded`, and `aria-controls`.
- `app/components/layout/LanguageSwitcher.tsx`
  - Added an accessible group role and retained locale current-page state.
  - Raised both controls to 44px square minimum targets.
  - Corrected inactive-language contrast.
- `app/components/layout/Footer.tsx`
  - Converted route links to `NavLink` for current-page state.
  - Raised phone and email targets to 44px.
  - Corrected legal-text contrast.
  - Lazy-loaded and asynchronously decoded the below-fold wordmark.
- `app/components/layout/Breadcrumbs.tsx`
  - Raised the interactive home crumb to a 44px target while retaining current-page semantics.
- `app/content/types.ts`, `app/content/en.ts`, `app/content/ms.ts`, `app/pages/AboutPage.tsx`
  - Added distinct, localized incorporation labels so the incorporation summary and history timeline no longer share an H2.
- `app/pages/HomePage.tsx`, `app/pages/ItMaintenancePage.tsx`, `app/pages/AromaSolutionsPage.tsx`, `app/pages/AromaDiffusersPage.tsx`, `app/pages/CustomFragrancePage.tsx`
  - Added accurate intrinsic width and height to every route image.
  - Added responsive `sizes` and async decoding.
  - Kept `fetchPriority="high"` only on active image heroes.
  - Kept below-fold route imagery lazy and retained existing mobile `<source>` assets.
- `app/styles/index.css`
  - Added a global accessible focus fallback, fixed-header scroll padding, horizontal overflow containment, and complete reduced-motion duration safeguards.

## Deferred findings resolved

- About incorporation and timeline now have distinct localized H2 labels.
- `app/accessibility.test.tsx` server-renders the Malay aroma route at `/ms/penyelesaian-aroma-komersial` and proves Malay copy plus `/ms/hubungi` and `/ms/diffuser-aroma` CTA destinations are in static output.
- The mobile menu now has explicit automated coverage for Escape, focus return, route-click closure, and independent pathname-driven closure.

The schema union, diffuser model-key typing, and exhaustive sitemap XML comparison remain outside Task 9 as instructed.

## RED and GREEN evidence

Initial RED:

- `npm test -- app/accessibility.test.tsx`
- 18 tests ran, 5 failed for missing image dimensions on home, IT, and diffusers; duplicate About H2; and the unnamed language group.

Initial GREEN:

- `npm test -- app/accessibility.test.tsx`
- 18 passed.

Media lifecycle RED:

- The new footer test failed because the below-fold wordmark had no `loading="lazy"`.

Media lifecycle GREEN:

- `npm test -- app/accessibility.test.tsx`
- 18 passed after the footer delivery fix.

Lighthouse RED/GREEN:

- The first home audit scored 96 accessibility. It identified inactive BM contrast at 2.63:1 and footer legal text at 3.74:1.
- After shared contrast fixes, home scored 100 accessibility.
- Vite preview returned the SPA fallback for an extensionless prerender path, causing a React hydration replacement and artificial CLS 1.0 on IT. Serving `build/client` with a clean-path-aware static server returned the real prerendered route and removed the error.

## Accessibility, responsive, media, and bundle results

- Every generated route has exactly one `<main>` and one H1.
- All 17 generated `index.html` files have non-empty informative alternatives and valid intrinsic dimensions for every image.
- Decorative Lucide icons are hidden from the accessibility tree.
- Navigation, breadcrumb, language, footer, and CTA current/name semantics are covered.
- Lighthouse target-size, color-contrast, unsized-image, image-aspect-ratio, responsive-image, and console-error audits all score 1 on the four required routes.
- Motion remains transform/opacity based. Global reduced-motion CSS collapses all remaining transition and animation durations.
- The mobile screenshot exposed the shared navbar overflow. The final fluid wordmark keeps the full EN, BM, and menu controls visible at the 412px Lighthouse viewport.
- Mobile sources are retained for every route image where an approved mobile asset exists.
- The old `logo-black.png` and `logo-white.png` files remain in the public asset archive, but source, generated HTML, and corporate request traces contain zero references or requests to them.
- Corporate `index.html`, About, and Contact have zero diffuser/products initial references.
- Corporate Lighthouse request traces have zero diffuser catalogue chunk requests. The catalogue correctly loads only on `/aroma-diffusers`.
- No new AVIF or WebP derivatives were generated because the existing mobile JPEGs already keep individual relevant payloads small and the measured mobile routes exceed the performance target without visible-degradation risk.
- One 8.29kB gzipped critical stylesheet remains render-blocking. It is the sole styling payload needed for the first paint; inlining it into every prerender would increase document duplication and remove cross-route caching, so there is no remaining avoidable render-blocking fix in scope.

## Lighthouse

CLI used exactly `npx --yes lighthouse@13.4.1` with the default mobile form factor, 412 by 823 CSS pixels, against a clean-path-aware static server for `build/client`.

| Route | Performance | Accessibility | SEO |
|---|---:|---:|---:|
| `/` | 95 | 100 | 100 |
| `/it-maintenance` | 93 | 100 | 100 |
| `/aroma-diffusers` | 95 | 100 | 100 |
| `/contact` | 95 | 100 | 100 |

All four meet the required performance, accessibility, and SEO targets.

## Visual and interaction inspection

- Inspected required Lighthouse mobile final-render artifacts at 412 by 823 for Home, IT, Diffusers, and Contact.
- Inspected the Malay aroma route at the Lighthouse desktop preset, 1350 by 940; accessibility scored 100 and the hero, localized shell, CTAs, and section transition remained aligned.
- Reviewed source reflow rules across the 640px, 768px, and 1024px tablet/desktop breakpoints and checked all 17 prerendered route DOMs.
- Verified mobile menu disclosure, route click, independent pathname change, Escape, and focus-return behavior with Testing Library and real router state.
- Fixed the concrete mobile header overflow discovered in the Home mobile render.

The required Browser skill was initialized and its troubleshooting flow was followed, but browser discovery returned zero available browser backends. As a result, no in-app Browser interaction or tablet viewport session could be run. Lighthouse render artifacts, static DOM checks, and automated interaction tests were used for all available verification, without substituting a different browser-control surface.

## Final verification

- `npm test`: 17 files, 106 tests passed.
- `npm run typecheck`: exit 0.
- `npm run build`: exit 0, 17 prerendered pages plus SPA fallback generated.
- Static route/media audit: 17 routes, 0 semantic or intrinsic-image failures.
- Corporate initial diffuser references: 0.
- Corporate legacy 7016 by 4961 logo references and requests: 0.
- `git diff --check`: exit 0.
- Local production server stopped after QA.

## Self-review

- Scope remains limited to shared layout, styling, content labels, page image metadata, and Task 9 tests.
- Changes reuse established route/content registries and shared components.
- No unrelated Task 10 typing or sitemap work was pulled forward.
- All behavior changes are covered by tests that were observed failing before implementation.

## Concerns

- The in-app Browser backend was unavailable, so the mandated real Browser viewport and manual keyboard session could not be completed. This is the only remaining QA limitation.

## Fix Round 1

### Findings addressed

- `Breadcrumbs`, desktop primary navigation links, and footer navigation links now enforce both 44px dimensions with `min-h-11` and `min-w-11`.
- Each affected short-link surface also has horizontal padding. Breadcrumb and footer links use a matching negative inline margin so the visible text remains optically aligned while the interactive area expands.
- `app/accessibility.test.tsx` now opens the rendered mobile menu, clicks the Contact route inside `#mobile-navigation`, proves the MemoryRouter pathname changes from `/` to `/contact`, and proves `aria-expanded` returns to `false`.
- The earlier report statement that route-link closure had Testing Library coverage was premature. It is now backed by the explicit rendered-link interaction test added in this round.

### RED and GREEN evidence

RED:

- Command: `npm test -- app/accessibility.test.tsx`
- Result: 20 tests ran; 19 passed and 1 failed.
- Expected failure: the new rendered-shell test found `min-h-11` but no `min-w-11` on the primary Home link.
- The mobile route-link test passed against the existing behavior and closes the prior coverage gap without requiring a production interaction change.

GREEN:

- Command: `npm test -- app/accessibility.test.tsx app/components/layout/localized-shell.test.tsx`
- Result: 2 files and 24 tests passed.
- The rendered width guard verifies primary-nav Home, breadcrumb Home, and footer Home each expose both target guardrails.
- The menu-link interaction verifies actual navigation and closure through real MemoryRouter state and `userEvent`.

### Verification

- `npm test`: 17 files, 108 tests passed.
- `npm run typecheck`: exit 0.
- `npm run build`: exit 0; all 17 prerendered routes regenerated.
- Generated About-shell inspection: 3 short-link surfaces checked, 0 two-dimensional guard failures.
- `npx --yes lighthouse@13.4.1 http://127.0.0.1:4173/about`: performance 95, accessibility 100, SEO 100; target-size 1, color-contrast 1, console-errors 1.
- `git diff --check`: exit 0.
- Focused static server stopped after Lighthouse.

### Self-review

- Production changes are limited to the three reviewed shared link classes.
- The test verifies rendered class contracts and real router interaction; it does not grep source text or mock navigation.
- Horizontal padding preserves readable link labels, while the minimum width protects short English and Malay labels.
- No route content, media, schema, sitemap, or unrelated styling changed.

### Concerns

- No new implementation concern. The original in-app Browser availability limitation remains unchanged.
