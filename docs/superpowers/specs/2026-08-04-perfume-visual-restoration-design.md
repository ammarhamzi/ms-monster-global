# Perfume Page Visual Restoration Design

**Date:** 2026-08-04  
**Status:** Approved for implementation planning  
**Visual reference:** Commit `fefe373`, `src/pages/Perfume.tsx`  
**Technical baseline:** Current `fix/search-console-verification` worktree

## 1. Objective

Restore the image-led, editorial composition of the pre-SEO Perfume page inside the current static, bilingual SEO architecture. The result must feel like the page at `fefe373` while retaining the current verified content, corrected diffuser records, accessibility behavior, and generated search metadata.

This is a presentation restoration, not a Git rollback. No route, SEO, schema, localization, build, or factual-data work from the current implementation may be replaced with its older equivalent.

## 2. Chosen Approach

Use a hybrid transplant:

- Recreate the old page's section order, visual pacing, imagery, interaction patterns, and responsive composition in the current component tree.
- Continue sourcing all visible English and Malay copy from `getContent(locale)`.
- Continue sourcing all diffuser specifications from `app/data/products.ts`.
- Keep the current route registry, route modules, metadata helpers, schema builders, static prerendering, redirect policy, and production verifier unchanged unless a test exposes a required compatibility adjustment.

An exact copy of the old component is rejected because it contains English-only component constants, obsolete context-driven localization, disputed product values, and SPA-era assumptions. A shallow reskin of the current page is rejected because it would not restore the old page's information hierarchy or catalogue interaction.

## 3. Experience and Page Structure

The restored page uses the old composition as its visual source of truth and the current content modules as its factual source of truth.

### 3.1 Hero

- Keep the existing responsive hero photograph, intrinsic dimensions, eager loading, and localized alt text.
- Restore the old asymmetric desktop composition and stronger `Aroma & Scent Solutions`-style visual scale while rendering the current localized H1 and introduction.
- Retain breadcrumbs, exactly one H1, the recommendation CTA, and the catalogue CTA.
- Keep motion inside `MotionConfig reducedMotion="user"`; important content remains present when animations or JavaScript are unavailable.

### 3.2 Space-first catalogue entry

- Restore the old three image cards immediately after the hero.
- English groups:
  1. Small and personal spaces, `10–200 m²`
  2. Medium commercial spaces, `200–600 m²`
  3. Large spaces and HVAC, `500–2800 m²`
- Malay receives complete equivalent labels, descriptions, link text, and accessible names.
- Activating a card opens the matching catalogue group, scrolls it into view, and moves focus to its summary. Reduced-motion users receive an immediate scroll.
- The cards use semantic buttons or links with visible keyboard focus and at least a 44-pixel target.

### 3.3 Image-led narrative

Restore the old page's alternating section rhythm rather than a sequence of similarly shaped cards:

1. Connected scent-system introduction
2. About Monster Perfume image and copy
3. Four-step aroma programme
4. Refill, tuning, and maintenance feature
5. Interactive scent directions
6. Three service pillars
7. Fragrance ingredient collage and expandable library
8. Featured diffuser formats
9. Grouped full catalogue
10. Custom-fragrance/OEM/ODM development scope
11. Full-width image CTA

The precise wording comes from the current bilingual content. Where the old design had a useful section without a current field, add paired English and Malay content fields rather than hard-coding text in components.

### 3.4 Scent directions

- Restore the old large-image direction selector and ingredient treatment.
- The active state must be exposed semantically, operable by keyboard, and understandable without color alone.
- All three direction panels remain in the prerendered document so search engines and no-JavaScript readers receive the complete content.
- Ingredient names use the corrected English and Malay collections already in `app/data/products.ts`.

### 3.5 Diffuser catalogue

- Replace mounting-format accordion groups with the approved three space-size groups from the old design.
- Keep the old explicit model membership because several coverage ranges overlap and a calculated boundary would place models unpredictably:
  - Small: `MF120A`, `MF130R`, `MC50L`, `MF50L`, `MF140A`, `MS105`, `MS600`
  - Medium: `MF300R`, `MS1300A`, `MS1400A`, `MF1200A`, `MS3800R`
  - Large/HVAC: `MF1500A`, `MF3000A`, `MS3000R`, `MS1500A`, `MS3500A`, `MS3600A`, `MS6000A`, `MS500`, `MS501F`, `MS-18`, `MS-43`
- Every one of the 23 current models appears exactly once in the prerendered HTML.
- Each model continues to display current coverage, known capacity, mounting format, localized features, and localized suitability text.
- `MF130R` retains a null capacity and must not publish either disputed historical capacity.
- Group range labels are browsing aids, not blanket product claims. Individual model specifications remain authoritative.
- Native `details` and `summary` provide baseline keyboard and no-JavaScript behavior. Client interaction may coordinate open state, scrolling, and focus without removing content from the document.

### 3.6 Fragrance development and CTA

- Retain the corrected sampling language and documented OEM/ODM boundaries.
- Do not restore unsupported manufacturing, licensing, universal waterless-operation, or broad-coverage claims.
- Restore the old full-width hospitality-image closing treatment while keeping the current localized contact destination and CTA content.

## 4. Component Boundaries

Keep the page focused by dividing the restored composition into bounded units:

- `PerfumePage.tsx`: page order, hero, high-level composition, and locale handoff
- `SpaceSelector.tsx`: three space cards and catalogue-focus interaction
- `ScentExperience.tsx`: image-led service story, aroma process, and programme feature
- `FragranceSections.tsx`: interactive scent directions, ingredient library, and custom-fragrance scope
- `DiffuserCatalogue.tsx`: space-size group summaries and all model cards
- `perfumeCatalog.ts`: typed group membership and lookup helpers derived from the corrected diffuser dataset

Components receive `locale` or localized content through explicit props. They do not access route paths, metadata, or global browser state except for the narrowly scoped focus-and-scroll interaction.

## 5. SEO and Architecture Invariants

The restoration must not change these contracts:

- Canonical routes remain `/perfume` and `/ms/perfume`.
- Both routes remain explicit prerender targets and direct-load `200` documents.
- Former split perfume URLs continue redirecting permanently to the unified route.
- Route titles, descriptions, canonical links, reciprocal hreflang links, Open Graph data, Twitter data, Corporation/WebSite/Service/Breadcrumb JSON-LD, sitemap entries, and robots output continue to come from the current SEO modules.
- The English and Malay documents declare the correct language and link to each other.
- All meaningful page copy and all 23 model names remain in generated HTML.
- The single-H1 and heading-order contracts remain intact.

## 6. Accessibility and Responsive Behavior

- Preserve the skip link, landmark structure, breadcrumbs, heading hierarchy, descriptive alt text, and visible focus styles.
- Interactive controls must have unique localized accessible names and keyboard operation.
- Do not rely on hover, color, or animation to expose information.
- Honor `prefers-reduced-motion` for entrance animation and catalogue scrolling.
- Mobile keeps the old stacked image-led pacing without fixed-height text clipping or horizontal overflow.
- Desktop restores the old asymmetric image/text rhythm and staggered three-card space selector.
- Images keep intrinsic dimensions, responsive sources, appropriate `sizes`, lazy loading below the fold, and the current hero priority behavior.

## 7. Testing Strategy

Implementation follows red-green-refactor cycles.

Automated tests will prove:

- English and Malay render the restored section structure with exactly one H1.
- The three localized space groups exist and contain the expected 7, 5, and 11 models.
- Every corrected diffuser appears exactly once.
- `MF130R` omits both disputed capacities.
- No contradictory broad coverage or unsupported manufacturing claim is rendered.
- Activating a space selector opens and focuses the corresponding catalogue group.
- Scent-direction and ingredient controls expose accessible state and retain all content in the document.
- Existing route, metadata, schema, localization, accessibility, build-generation, and build-verification suites remain green.

Final verification includes the full test suite, typecheck, production build, generated HTML inspection for both perfume routes, and browser review at representative desktop and mobile widths with console-error inspection.

## 8. Out of Scope

- Changing public routes or navigation labels
- Reworking other pages
- Reintroducing old product specifications or English-only copy
- New photography, fonts, or brand identity
- New SEO claims, keywords, schema types, or business facts
- Changes to Search Console verification

## 9. Acceptance Criteria

The work is complete when the current English and Malay perfume routes visually reproduce the old page's image-led hierarchy and space-first catalogue experience, all corrected content and 23 model records remain intact, all SEO and accessibility contracts pass, the production build verifies successfully, and responsive browser review finds no blocking visual or console defects.
