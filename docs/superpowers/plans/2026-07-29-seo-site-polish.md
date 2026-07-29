# MS Monster Global SEO and Site Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a pre-rendered, bilingual MS Monster Global website with reliable indexing, factual service content, branded browser/share assets, and a verified whole-site quality pass.

**Architecture:** Adopt React Router 7 framework mode with `ssr: false` and build-time pre-rendering to `build/client`. Six route modules are reused across explicit English and Bahasa Melayu URLs, while route metadata, entity facts, locale mapping, schema, sitemap generation, and language switching all consume one typed registry. Existing React/Tailwind page work is retained across corporate, IT, downloads, contact, and one unified Perfume & Aroma surface.

**Tech Stack:** React 19, React Router 7.18.1 framework mode, Vite 6, Tailwind CSS 4, TypeScript 5.8, Vitest 4, Testing Library, Sharp, Netlify static hosting, Lighthouse.

## Global Constraints

- Canonical production origin is exactly `https://msmonsterglobal.com`; `www` redirects to the apex origin.
- Stay on React Router `7.18.1`; do not upgrade this project to React Router 8.
- Use `ssr: false` and pre-render every approved English and Bahasa Melayu route.
- Build output is `build/client`; no runtime application server is introduced.
- Public English routes are `/`, `/about`, `/it-maintenance`, `/perfume`, `/downloads`, and `/contact`.
- Public Malay routes are `/ms`, `/ms/tentang`, `/ms/penyelenggaraan-it`, `/ms/perfume`, `/ms/muat-turun`, and `/ms/hubungi`.
- Preserve the current professional corporate identity, blue/green division system, authentic supplied imagery, visible focus states, reduced-motion support, and 44px minimum touch targets.
- Use `Corporation`, `WebSite`, `Service`, and `BreadcrumbList` schema only. Do not add `LocalBusiness`, Product rich-result schema, ratings, prices, opening hours, geocoordinates, or national coverage.
- Do not publish AMECO ownership, a cosmetics licence, 24/7 support, guaranteed response times, client counts, accreditations, testimonials, or other unsupported claims.
- Corporate founding date is `2022-11-16`; earlier activity is predecessor/business-roots history.
- All Malay routes must be fully Malay except proper names, technical standards, and model identifiers.
- All catalogue content must exist in pre-rendered HTML without requiring a click.
- Use the approved existing logo mark and existing photography for icons and social cards; do not invent a replacement logo.
- Do not add analytics, tracking pixels, cookie UI, live chat, a contact-form backend, or bulk-directory/backlink automation.
- Every implementation task follows red-green-refactor discipline, ends with its stated verification, and receives a review before the next task.

## Scope Decision

Routing, metadata, bilingual content, brand assets, and build verification share the same route registry and must ship together to avoid publishing duplicate or non-indexable intermediate URLs. They remain one implementation plan, with separate task/reviewer gates for framework, corporate content, IT, aroma, routing, assets, polish, and release verification.

---

## File Structure

### Framework and configuration

- `react-router.config.ts`: static rendering mode and approved pre-render paths.
- `vite.config.ts`: React Router and Tailwind plugins.
- `app/root.tsx`: HTML document, route metadata outlet, global layout, scripts, and error boundary.
- `app/routes.ts`: explicit route-module mapping with stable IDs.
- `app/config/site.ts`: one canonical business/entity record.
- `app/config/routes.ts`: locale, route keys, metadata, counterparts, social-card selection, and helper functions.

### SEO

- `app/seo/meta.ts`: canonical, alternate, Open Graph, Twitter, robots, and JSON-LD descriptors.
- `app/seo/schema.ts`: Corporation, WebSite, Service, and BreadcrumbList graph builders.
- `scripts/generate-public-files.ts`: sitemap, robots, and Netlify-ready `404.html`.
- `scripts/verify-build.ts`: generated HTML and static-asset contract checks.

### Content and UI

- `app/content/types.ts`: bilingual content contracts.
- `app/content/en.ts`: complete English copy.
- `app/content/ms.ts`: complete Bahasa Melayu copy.
- `app/content/index.ts`: locale lookup.
- `app/data/products.ts`: corrected, typed diffuser and fragrance data.
- `app/components/layout/*`: site shell, navigation, footer, breadcrumbs, and language switcher.
- `app/components/content/*`: reusable section heading, CTA, and service-list primitives.
- `app/components/downloads/DownloadCard.tsx`: accessible PDF link card.
- `app/pages/*Page.tsx`: six focused page components accepting a `locale`.
- `app/routes/*.tsx`: six thin route modules plus not-found.
- `app/components/perfume/*`: the crawlable diffuser catalogue and custom-fragrance sections composed by `PerfumePage`.

### Brand assets

- `scripts/generate-brand-assets.ts`: deterministic logo trimming, mark extraction, icons, and social cards.
- `public/assets/brand/*`: optimized wordmarks, mark icons, touch/app icons, and favicon inputs.
- `public/assets/social/*`: corporate, IT, and aroma 1200×630 share cards.
- `public/favicon.svg`, `public/favicon.ico`, `public/site.webmanifest`: browser/device identity.

### Tests and delivery

- `test/setup.ts`, `vitest.config.ts`: test environment.
- Co-located `*.test.ts` and `*.test.tsx`: registry, metadata, schema, content, catalogue, navigation, and page tests.
- `netlify.toml`: build/publish settings and permanent redirects.
- `docs/seo-launch-checklist.md`: account-owned launch tasks.
- `README.md`: current build, test, preview, and deployment instructions.

---

> **Historical baseline:** Tasks 1–10 below document the implementation that
> preceded the 2026-07-30 product-direction update. Their split aroma,
> diffuser, and fragrance route examples and 16-route counts are superseded
> by Task 11 and by the Global Constraints above. Task 11 is the current
> source of truth for public routing and the Perfume & Aroma information
> architecture.

### Task 1: Add the test harness and canonical route registry

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `tsconfig.json`
- Modify: `.gitignore`
- Create: `vitest.config.ts`
- Create: `test/setup.ts`
- Create: `app/config/site.ts`
- Create: `app/config/routes.ts`
- Test: `app/config/routes.test.ts`

**Interfaces:**
- Produces: `Locale`, `PageKey`, `SocialCard`, `RouteRecord`, `SITE`, `ROUTES`, `INDEXABLE_PATHS`, `PRERENDER_PATHS`, `getRouteByPath(pathname)`, `getRoute(locale, key)`, `getCounterpart(route)`, and `absoluteUrl(path)`.
- Consumes: no application interfaces.

- [ ] **Step 1: Install the test-only dependencies**

Run:

```bash
npm install -D vitest@4.1.10 jsdom@30.0.1 @testing-library/react@16.3.2 @testing-library/dom@10.4.1 @testing-library/jest-dom@7.0.0 @testing-library/user-event@14.6.1
```

Expected: `package.json` and `package-lock.json` change; npm exits 0.

- [ ] **Step 2: Add test scripts and environment configuration**

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
  },
});
```

Create `test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

Add `".react-router/"` and `"build/"` to `.gitignore`. Add `"types": ["node", "vite/client", "vitest/globals"]` and include `app`, `scripts`, `test`, and `.react-router/types` in `tsconfig.json`.

- [ ] **Step 3: Write the failing route-registry tests**

Create `app/config/routes.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import {
  INDEXABLE_PATHS,
  PRERENDER_PATHS,
  ROUTES,
  absoluteUrl,
  getCounterpart,
  getRoute,
  getRouteByPath,
} from './routes';

describe('localized route registry', () => {
  it('defines eight reciprocal routes per locale', () => {
    expect(ROUTES).toHaveLength(16);
    expect(ROUTES.filter((route) => route.locale === 'en')).toHaveLength(8);
    expect(ROUTES.filter((route) => route.locale === 'ms')).toHaveLength(8);

    for (const route of ROUTES) {
      const counterpart = getCounterpart(route);
      expect(counterpart.locale).not.toBe(route.locale);
      expect(counterpart.key).toBe(route.key);
      expect(getCounterpart(counterpart).path).toBe(route.path);
    }
  });

  it('keeps paths, IDs, titles, and descriptions unique and complete', () => {
    expect(new Set(ROUTES.map((route) => route.path)).size).toBe(16);
    expect(new Set(ROUTES.map((route) => route.id)).size).toBe(16);

    for (const route of ROUTES) {
      expect(route.path).toMatch(/^\/(?:$|[a-z0-9/-]+$)/);
      expect(route.title.length).toBeGreaterThanOrEqual(25);
      expect(route.title.length).toBeLessThanOrEqual(65);
      expect(route.description.length).toBeGreaterThanOrEqual(110);
      expect(route.description.length).toBeLessThanOrEqual(165);
    }
  });

  it('exposes every indexable path to prerendering', () => {
    expect(INDEXABLE_PATHS).toEqual(ROUTES.map((route) => route.path));
    expect(PRERENDER_PATHS).toEqual([...INDEXABLE_PATHS, '/404']);
  });

  it('resolves normalized paths and absolute URLs', () => {
    expect(getRouteByPath('/ms/hubungi/')).toEqual(getRoute('ms', 'contact'));
    expect(absoluteUrl('/contact')).toBe('https://msmonsterglobal.com/contact');
  });
});
```

- [ ] **Step 4: Run the registry test to verify it fails**

Run:

```bash
npm test -- app/config/routes.test.ts
```

Expected: FAIL because `app/config/routes.ts` does not exist.

- [ ] **Step 5: Implement the shared site record**

Create `app/config/site.ts` with this exact public identity:

```ts
export const SITE = {
  origin: 'https://msmonsterglobal.com',
  name: 'MS Monster Global',
  legalName: 'MS Monster Global Sdn Bhd',
  registrationNumber: '202201042816 (1488513-W)',
  foundingDate: '2022-11-16',
  telephone: '+60126665658',
  displayTelephone: '+60 12-666 5658',
  email: 'solehin@msmonsterglobal.com',
  facebook: 'https://www.facebook.com/HqMonsterPerfume/',
  address: {
    streetAddress: 'No 31-G, No 31-1, No 31-2, Jalan BBN 6/3B, Desa Cempaka, Putra Nilai',
    addressLocality: 'Nilai',
    addressRegion: 'Negeri Sembilan',
    postalCode: '71800',
    addressCountry: 'MY',
  },
} as const;
```

- [ ] **Step 6: Implement the route registry**

Create `app/config/routes.ts` with these types:

```ts
import { SITE } from './site';

export type Locale = 'en' | 'ms';
export type PageKey =
  | 'home'
  | 'about'
  | 'it'
  | 'aroma'
  | 'diffusers'
  | 'fragrance'
  | 'downloads'
  | 'contact';
export type SocialCard = 'corporate' | 'it' | 'aroma';

export interface RouteRecord {
  id: `${PageKey}-${Locale}`;
  key: PageKey;
  locale: Locale;
  path: string;
  title: string;
  description: string;
  socialCard: SocialCard;
}
```

Populate exactly these route pairs and metadata:

| Key | English path and title | Malay path and title | Card |
|---|---|---|---|
| home | `/` · `MS Monster Global \| IT Maintenance & Aroma Solutions` | `/ms` · `MS Monster Global \| Penyelenggaraan IT & Penyelesaian Aroma` | corporate |
| about | `/about` · `About MS Monster Global Sdn Bhd \| Nilai, Malaysia` | `/ms/tentang` · `Tentang MS Monster Global Sdn Bhd \| Nilai, Malaysia` | corporate |
| it | `/it-maintenance` · `IT Maintenance Services Malaysia \| MS Monster Global` | `/ms/penyelenggaraan-it` · `Servis Penyelenggaraan IT Malaysia \| MS Monster Global` | it |
| aroma | `/commercial-aroma-solutions` · `Commercial Aroma Solutions Malaysia \| MS Monster Global` | `/ms/penyelesaian-aroma-komersial` · `Penyelesaian Aroma Komersial Malaysia \| MS Monster Global` | aroma |
| diffusers | `/aroma-diffusers` · `Commercial Aroma Diffusers Malaysia \| MS Monster Global` | `/ms/diffuser-aroma` · `Diffuser Aroma Komersial Malaysia \| MS Monster Global` | aroma |
| fragrance | `/custom-fragrance-development` · `Custom Fragrance Development Malaysia \| MS Monster Global` | `/ms/pembangunan-wangian-tersuai` · `Pembangunan Wangian Tersuai Malaysia \| MS Monster Global` | aroma |
| downloads | `/downloads` · `Company Profiles & Brochures \| MS Monster Global` | `/ms/muat-turun` · `Profil Syarikat & Brosur \| MS Monster Global` | corporate |
| contact | `/contact` · `Contact MS Monster Global \| Nilai, Negeri Sembilan` | `/ms/hubungi` · `Hubungi MS Monster Global \| Nilai, Negeri Sembilan` | corporate |

Use factual 110–165 character descriptions matching each route’s visible service scope. Implement helpers with exact signatures:

```ts
export function getRoute(locale: Locale, key: PageKey): RouteRecord;
export function getRouteByPath(pathname: string): RouteRecord;
export function getCounterpart(route: RouteRecord): RouteRecord;
export function absoluteUrl(pathname: string): string;
```

Normalize a trailing slash except for `/`. Throw descriptive errors for an unknown locale/key or pathname so missing registry entries fail during build.

- [ ] **Step 7: Run tests and type checking**

Run:

```bash
npm test -- app/config/routes.test.ts
npx tsc --noEmit
```

Expected: PASS with 4 tests; TypeScript exits 0.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json tsconfig.json .gitignore vitest.config.ts test app/config
git commit -m "feat(config): add localized route registry"
```

---

### Task 2: Migrate the SPA to React Router framework pre-rendering

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `vite.config.ts`
- Modify: `tsconfig.json`
- Create: `.nvmrc`
- Create: `react-router.config.ts`
- Create: `app/root.tsx`
- Create: `app/routes.ts`
- Create: `app/hooks/useCurrentRoute.ts`
- Create: `app/routes/home.tsx`
- Create: `app/routes/about.tsx`
- Create: `app/routes/it.tsx`
- Create: `app/routes/aroma.tsx`
- Create: `app/routes/diffusers.tsx`
- Create: `app/routes/fragrance.tsx`
- Create: `app/routes/downloads.tsx`
- Create: `app/routes/contact.tsx`
- Create: `app/routes/not-found.tsx`
- Move: `src/index.css` → `app/styles/index.css`
- Move: existing components/pages/context/data into matching temporary `app/` locations
- Delete: `index.html`
- Delete: `src/main.tsx`
- Delete: `src/App.tsx`
- Test: `app/routes.test.ts`

**Interfaces:**
- Consumes: `ROUTES`, `PRERENDER_PATHS`, `Locale`, `getRouteByPath`.
- Produces: React Router framework document, route tree, automatically split route modules, `useCurrentRoute()`, and pre-rendered HTML under `build/client`.

- [ ] **Step 1: Install matching framework-mode dependencies**

Run:

```bash
npm install react-router@7.18.1
npm install -D @react-router/dev@7.18.1
```

Remove `react-router-dom`, `@vitejs/plugin-react`, `dotenv`, `express`, and `recharts` after imports have moved to `react-router` and a repository search confirms they are unused.

- [ ] **Step 2: Write the failing route-tree contract test**

Create `app/routes.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import routeConfig from './routes';
import { ROUTES } from './config/routes';

describe('framework route tree', () => {
  it('maps every localized record to a stable route ID', () => {
    const publicEntries = routeConfig.filter((entry) => entry.id?.includes('-'));
    for (const record of ROUTES) {
      expect(publicEntries).toContainEqual(
        expect.objectContaining({ id: record.id, path: record.path }),
      );
    }
  });

  it('includes explicit and catch-all not-found routes', () => {
    expect(routeConfig).toContainEqual(
      expect.objectContaining({ id: 'not-found', path: '/404' }),
    );
    expect(routeConfig).toContainEqual(
      expect.objectContaining({ id: 'catch-all', path: '*' }),
    );
  });
});
```

- [ ] **Step 3: Run the route-tree test to verify it fails**

Run:

```bash
npm test -- app/routes.test.ts
```

Expected: FAIL because `app/routes.ts` does not exist.

- [ ] **Step 4: Configure framework mode**

Replace the React Vite plugin with React Router:

```ts
import tailwindcss from '@tailwindcss/vite';
import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRouter(), tailwindcss()],
});
```

Create `react-router.config.ts`:

```ts
import type { Config } from '@react-router/dev/config';
import { PRERENDER_PATHS } from './app/config/routes';

export default {
  ssr: false,
  prerender: PRERENDER_PATHS,
} satisfies Config;
```

Change scripts:

```json
{
  "dev": "react-router dev --port=3000 --host=0.0.0.0",
  "build": "react-router build",
  "typecheck": "react-router typegen && tsc --noEmit",
  "lint": "npm run typecheck",
  "preview": "vite preview --outDir build/client"
}
```

Set `rootDirs` to `[".", "./.react-router/types"]` in `tsconfig.json`. Add:

```json
"engines": {
  "node": ">=22.22.2"
}
```

Create `.nvmrc` containing:

```text
22.22.2
```

- [ ] **Step 5: Implement the explicit route tree**

Create `app/routes.ts`. Map route keys to modules:

```ts
const moduleByKey = {
  home: './routes/home.tsx',
  about: './routes/about.tsx',
  it: './routes/it.tsx',
  aroma: './routes/aroma.tsx',
  diffusers: './routes/diffusers.tsx',
  fragrance: './routes/fragrance.tsx',
  downloads: './routes/downloads.tsx',
  contact: './routes/contact.tsx',
} as const;
```

Create one `route(record.path, moduleByKey[record.key], { id: record.id })` entry per registry record. Add `/404` and `*` entries using `app/routes/not-found.tsx` with IDs `not-found` and `catch-all`.

- [ ] **Step 6: Implement the framework document**

Create `app/root.tsx` using `Links`, `Meta`, `Outlet`, `Scripts`, `ScrollRestoration`, and `useLocation` from `react-router`. Its `Layout` must:

- Set `<html lang>` from `getRouteByPath(pathname).locale`, falling back to English only for the not-found route.
- Render `<Meta />` and `<Links />` in `<head>`.
- Render the existing navigation, `<main id="main-content">`, and footer around children.
- Include a skip link.
- Render `<ScrollRestoration />` and `<Scripts />`.

Move the existing CSS and UI into `app/`, swap all `react-router-dom` imports to `react-router`, and preserve the current page behavior.

- [ ] **Step 7: Add URL-derived locale state for reused route modules**

Create `app/hooks/useCurrentRoute.ts`:

```ts
import { useLocation } from 'react-router';
import { getRouteByPath } from '../config/routes';

export function useCurrentRoute() {
  const { pathname } = useLocation();
  return getRouteByPath(pathname);
}
```

Modify the moved `LanguageProvider` to accept an `initialLanguage: Locale` prop. In `app/root.tsx`, resolve the current route once and wrap the navigation, outlet, and footer with `<LanguageProvider initialLanguage={route.locale}>`. This makes the pre-rendered Malay shell start in Malay without browser state. Rename the moved page components exactly:

| Existing file | Framework page |
|---|---|
| `Home.tsx` | `app/pages/HomePage.tsx` |
| `About.tsx` | `app/pages/AboutPage.tsx` |
| `ITServices.tsx` | `app/pages/ItMaintenancePage.tsx` |
| `InvestorRelations.tsx` | `app/pages/DownloadsPage.tsx` |
| `Contact.tsx` | `app/pages/ContactPage.tsx` |

Tasks 4–6 replace page-level context reads with explicit `locale` props and update each thin route module to pass `useCurrentRoute().locale`. Task 7 deletes `LanguageContext` after the navigation and footer are migrated.

- [ ] **Step 8: Split the current aroma page into real route components**

Extract existing sections without duplicating their source data:

- `AromaSolutionsPage`: hero, setting/space assessment, scent-system process, service programme, and enquiry CTA.
- `AromaDiffusersPage`: featured systems and the complete diffuser catalogue.
- `CustomFragrancePage`: scent directions, development process, laboratory copy, ingredients, and OEM/ODM scope.

Keep every catalogue model in the rendered DOM. A native `<details>`/`<summary>` presentation may collapse groups visually, but do not conditionally mount model cards.

- [ ] **Step 9: Run the route and framework build checks**

Run:

```bash
npm test -- app/routes.test.ts
npm run typecheck
npm run build
```

Expected: tests PASS; type generation and TypeScript exit 0; React Router reports pre-rendered output for all 16 routes and `/404`.

- [ ] **Step 10: Commit**

```bash
git add package.json package-lock.json vite.config.ts tsconfig.json .nvmrc react-router.config.ts app index.html src
git commit -m "feat(app): prerender localized routes"
```

---

### Task 3: Add route metadata and factual structured data

**Files:**
- Create: `app/seo/schema.ts`
- Create: `app/seo/meta.ts`
- Test: `app/seo/schema.test.ts`
- Test: `app/seo/meta.test.ts`
- Modify: `app/routes/home.tsx`
- Modify: `app/routes/about.tsx`
- Modify: `app/routes/it.tsx`
- Modify: `app/routes/aroma.tsx`
- Modify: `app/routes/diffusers.tsx`
- Modify: `app/routes/fragrance.tsx`
- Modify: `app/routes/downloads.tsx`
- Modify: `app/routes/contact.tsx`
- Modify: `app/routes/not-found.tsx`

**Interfaces:**
- Consumes: `SITE`, `RouteRecord`, `getRouteByPath`, `getCounterpart`, `absoluteUrl`.
- Produces: `buildSchema(route): LdGraph`, `buildMeta(route): MetaDescriptor[]`, and `routeMeta({ location }): MetaDescriptor[]`.

- [ ] **Step 1: Write failing schema-policy tests**

Create `app/seo/schema.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { getRoute } from '../config/routes';
import { buildSchema } from './schema';

describe('structured data policy', () => {
  it('publishes the verified corporation identity', () => {
    const graph = buildSchema(getRoute('en', 'home'))['@graph'];
    const corporation = graph.find((node) => node['@type'] === 'Corporation');

    expect(corporation).toMatchObject({
      '@id': 'https://msmonsterglobal.com/#organization',
      legalName: 'MS Monster Global Sdn Bhd',
      foundingDate: '2022-11-16',
      telephone: '+60126665658',
    });
  });

  it('never emits unverified rich-result fields', () => {
    const serialized = JSON.stringify(buildSchema(getRoute('en', 'it')));
    for (const field of [
      'LocalBusiness',
      'aggregateRating',
      'openingHours',
      'geo',
      'price',
      'areaServed',
    ]) {
      expect(serialized).not.toContain(field);
    }
  });
});
```

- [ ] **Step 2: Write failing metadata tests**

Create `app/seo/meta.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { getRoute } from '../config/routes';
import { buildMeta } from './meta';

describe('route metadata', () => {
  it('emits canonical, reciprocal alternates, and large social cards', () => {
    const route = getRoute('en', 'it');
    const meta = buildMeta(route);

    expect(meta).toContainEqual({ title: route.title });
    expect(meta).toContainEqual({
      tagName: 'link',
      rel: 'canonical',
      href: 'https://msmonsterglobal.com/it-maintenance',
    });
    expect(meta).toContainEqual(
      expect.objectContaining({
        tagName: 'link',
        rel: 'alternate',
        hrefLang: 'ms',
        href: 'https://msmonsterglobal.com/ms/penyelenggaraan-it',
      }),
    );
    expect(meta).toContainEqual({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    expect(meta).toContainEqual({
      property: 'og:image',
      content: 'https://msmonsterglobal.com/assets/social/it-maintenance.jpg',
    });
  });
});
```

- [ ] **Step 3: Run both tests to verify they fail**

Run:

```bash
npm test -- app/seo/schema.test.ts app/seo/meta.test.ts
```

Expected: FAIL because the SEO modules do not exist.

- [ ] **Step 4: Implement the schema graph**

`buildSchema(route)` must return:

```ts
{
  '@context': 'https://schema.org',
  '@graph': [
    corporationNode,
    websiteNode,
    ...(serviceNodeFor(route) ? [serviceNodeFor(route)] : []),
    ...(route.key === 'home' ? [] : [breadcrumbNodeFor(route)]),
  ],
}
```

The Corporation node includes legal name, SSM `PropertyValue`, `2022-11-16`, canonical URL, canonical logo mark, phone, email, split postal address, official Facebook `sameAs`, English/Malay contact languages, and two factual offer catalogues. Service nodes appear only for `it`, `aroma`, `diffusers`, and `fragrance`, use the visible route description, and reference the Corporation as provider.

- [ ] **Step 5: Implement metadata composition**

`buildMeta(route)` must emit:

- title and description
- `robots: index,follow,max-image-preview:large`
- canonical
- reciprocal `en`, `ms`, and `x-default` alternate links
- Open Graph `website` fields
- route-selected absolute social image, 1200×630 dimensions, and localized alt
- Twitter large-image fields
- `{"script:ld+json": buildSchema(route)}`

`routeMeta({ location })` resolves the route by pathname. The not-found module exports a separate noindex metadata list and does not emit a canonical.

- [ ] **Step 6: Export the metadata function from each route module**

Every public route module must contain:

```ts
export { routeMeta as meta } from '../seo/meta';
```

The not-found route exports `notFoundMeta`.

- [ ] **Step 7: Run metadata tests and build**

Run:

```bash
npm test -- app/seo
npm run typecheck
npm run build
```

Expected: all SEO tests PASS; generated route HTML contains unique titles and JSON-LD.

- [ ] **Step 8: Commit**

```bash
git add app/seo app/routes
git commit -m "feat(seo): add route metadata and schema"
```

---

### Task 4: Rebuild the corporate pages with complete bilingual content

**Files:**
- Create: `app/content/types.ts`
- Create: `app/content/en.ts`
- Create: `app/content/ms.ts`
- Create: `app/content/index.ts`
- Create: `app/components/content/SectionHeading.tsx`
- Create: `app/components/content/ContactCta.tsx`
- Create: `app/components/downloads/DownloadCard.tsx`
- Modify: `app/pages/HomePage.tsx`
- Modify: `app/pages/AboutPage.tsx`
- Modify: `app/pages/DownloadsPage.tsx`
- Modify: `app/pages/ContactPage.tsx`
- Modify: `app/routes/home.tsx`
- Modify: `app/routes/about.tsx`
- Modify: `app/routes/downloads.tsx`
- Modify: `app/routes/contact.tsx`
- Test: `app/pages/corporate-pages.test.tsx`
- Test: `app/content/content-policy.test.ts`

**Interfaces:**
- Produces: `SiteContent`, `getContent(locale)`, `HomePage({ locale })`, `AboutPage({ locale })`, `DownloadsPage({ locale })`, `ContactPage({ locale })`.
- Consumes: `Locale`, `SITE`, existing PDF paths and authentic images.

- [ ] **Step 1: Write failing corporate-page tests**

Create `app/pages/corporate-pages.test.tsx` with a table that renders the four pages in both locales:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import DownloadsPage from './DownloadsPage';
import HomePage from './HomePage';

describe.each([
  ['en', HomePage, /Scent solutions and technology maintenance/i],
  ['ms', HomePage, /Penyelesaian aroma dan penyelenggaraan teknologi/i],
  ['en', AboutPage, /About MS Monster Global/i],
  ['ms', AboutPage, /Tentang MS Monster Global/i],
  ['en', DownloadsPage, /Company profiles and brochures/i],
  ['ms', DownloadsPage, /Profil syarikat dan brosur/i],
  ['en', ContactPage, /Contact MS Monster Global/i],
  ['ms', ContactPage, /Hubungi MS Monster Global/i],
] as const)('%s corporate page', (locale, Page, heading) => {
  it(`renders ${heading} as the single H1`, () => {
    render(<Page locale={locale} />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(heading);
  });
});
```

Add assertions that Downloads renders all three existing PDF URLs and Contact renders phone, email, WhatsApp, map, and Facebook links.

- [ ] **Step 2: Write failing claim-safety tests**

Create `app/content/content-policy.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { content } from './index';

describe('public copy policy', () => {
  it('excludes unsupported claims in both languages', () => {
    const serialized = JSON.stringify(content).toLowerCase();
    for (const phrase of [
      '24/7',
      'nationwide',
      'guaranteed response',
      'owns ameco',
      'cosmetics manufacturing licence',
      'testimoni pelanggan',
    ]) {
      expect(serialized).not.toContain(phrase);
    }
  });

  it('states incorporation separately from business roots', () => {
    expect(content.en.about.incorporation).toContain('16 November 2022');
    expect(content.en.about.history[0].text).toContain('business roots');
    expect(content.ms.about.incorporation).toContain('16 November 2022');
    expect(content.ms.about.history[0].text).toContain('akar perniagaan');
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run:

```bash
npm test -- app/pages/corporate-pages.test.tsx app/content/content-policy.test.ts
```

Expected: FAIL because the typed bilingual content and revised pages do not exist.

- [ ] **Step 4: Define the typed bilingual content contract**

Create page-specific interfaces in `app/content/types.ts` for navigation, shared CTAs, Home, About, IT, Aroma, Diffusers, Fragrance, Downloads, Contact, Footer, and NotFound. Export:

```ts
export interface SiteContent {
  nav: NavContent;
  home: HomeContent;
  about: AboutContent;
  it: ItContent;
  aroma: AromaContent;
  diffusers: DiffusersContent;
  fragrance: FragranceContent;
  downloads: DownloadsContent;
  contact: ContactContent;
  footer: FooterContent;
  notFound: NotFoundContent;
}
```

Both locale files must `satisfies SiteContent`; `getContent(locale)` returns one without fallback mixing.

- [ ] **Step 5: Implement factual English and Malay corporate content**

Port approved existing copy, then apply these exact corrections:

- Say the Sdn Bhd was incorporated on 16 November 2022.
- Describe 2016 activity as “business roots” / “akar perniagaan”.
- Remove the AMECO ownership and cosmetics-licence statements.
- Keep the verified SSM number, Nilai address, phone, email, and official Facebook consistent via `SITE`.
- Describe the two divisions without claiming national on-site coverage.
- Translate every navigation, CTA, footer, download, and contact label into Malay.

- [ ] **Step 6: Implement the four corporate pages**

Use one H1 per page, logical H2/H3 hierarchy, visible division links, concise breadcrumbs, and consistent contact CTAs. Downloads must render:

```ts
[
  '/downloads/ms-monster-it-maintenance-profile.pdf',
  '/downloads/ms-monster-perfume-profile.pdf',
  '/downloads/ms-monster-product-brochure.pdf',
]
```

Each download card exposes both “Open PDF” and `download` behavior without hiding the document behind JavaScript.

Update the four route modules to pass the URL-derived locale:

```tsx
export default function HomeRoute() {
  const { locale } = useCurrentRoute();
  return <HomePage locale={locale} />;
}
```

Apply the same explicit pattern to About, Downloads, and Contact with their corresponding page components.

- [ ] **Step 7: Run tests, type checking, and build**

Run:

```bash
npm test -- app/content app/pages/corporate-pages.test.tsx
npm run typecheck
npm run build
```

Expected: tests PASS in both locales; build exits 0.

- [ ] **Step 8: Commit**

```bash
git add app/content app/components/content app/components/downloads app/pages
git commit -m "feat(content): add bilingual corporate pages"
```

---

### Task 5: Rebuild the bilingual IT maintenance page

**Files:**
- Modify: `app/content/en.ts`
- Modify: `app/content/ms.ts`
- Modify: `app/pages/ItMaintenancePage.tsx`
- Modify: `app/routes/it.tsx`
- Test: `app/pages/it-maintenance.test.tsx`

**Interfaces:**
- Consumes: `Locale`, `getContent(locale)`, shared SectionHeading and ContactCta.
- Produces: one factual, route-split IT page for both `/it-maintenance` and `/ms/penyelenggaraan-it`.

- [ ] **Step 1: Write the failing bilingual IT-page test**

Create `app/pages/it-maintenance.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ItMaintenancePage from './ItMaintenancePage';

describe.each([
  ['en', 'IT & AI Maintenance Services', 'Predictive maintenance'],
  ['ms', 'Servis Penyelenggaraan IT & AI', 'Penyelenggaraan ramalan'],
] as const)('IT page in %s', (locale, heading, service) => {
  it('renders the service scope without unsupported promises', () => {
    render(<ItMaintenancePage locale={locale} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(heading);
    expect(screen.getByText(service)).toBeVisible();
    expect(screen.getByText(/LAN/i)).toBeVisible();
    expect(screen.getByText(/backup|sandaran/i)).toBeVisible();
    expect(screen.queryByText(/24\/7|guaranteed|nationwide/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- app/pages/it-maintenance.test.tsx
```

Expected: FAIL until the new page and Malay service copy are complete.

- [ ] **Step 3: Implement the page**

Preserve the existing server-room hero and render these verified service groups in both languages:

1. Predictive/preventive maintenance
2. Hardware and software support
3. LAN, Wi-Fi, and 5G network monitoring
4. System troubleshooting and repair
5. Data backup and recovery readiness
6. Cloud infrastructure support
7. On-site and remote support options

Use “Malaysia-based” for entity context, not “nationwide”. End with an enquiry CTA asking for environment, locations, and operating priorities without promising a response time.

Update `app/routes/it.tsx` to render `<ItMaintenancePage locale={useCurrentRoute().locale} />`.

- [ ] **Step 4: Run focused and full checks**

Run:

```bash
npm test -- app/pages/it-maintenance.test.tsx app/content/content-policy.test.ts
npm run typecheck
npm run build
```

Expected: all commands exit 0.

- [ ] **Step 5: Commit**

```bash
git add app/content app/pages/ItMaintenancePage.tsx app/routes/it.tsx
git commit -m "feat(it): publish bilingual maintenance page"
```

---

### Task 6: Publish factual aroma, diffuser, and fragrance pages

**Files:**
- Modify: `app/data/products.ts`
- Modify: `app/content/en.ts`
- Modify: `app/content/ms.ts`
- Modify: `app/pages/AromaSolutionsPage.tsx`
- Modify: `app/pages/AromaDiffusersPage.tsx`
- Modify: `app/pages/CustomFragrancePage.tsx`
- Modify: `app/routes/aroma.tsx`
- Modify: `app/routes/diffusers.tsx`
- Modify: `app/routes/fragrance.tsx`
- Test: `app/data/products.test.ts`
- Test: `app/pages/aroma-pages.test.tsx`

**Interfaces:**
- Produces: `Diffuser`, `CatalogGroup`, corrected `diffusers`, `essentialOils`, `extracts`, and three fully bilingual page components.
- Consumes: shared content/layout components and locale contract.

- [ ] **Step 1: Write failing catalogue-integrity tests**

Create `app/data/products.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { catalogGroups, diffusers, essentialOils } from './products';

describe('catalogue integrity', () => {
  it('keeps all 23 documented models exactly once', () => {
    expect(diffusers).toHaveLength(23);
    expect(new Set(diffusers.map((item) => item.model)).size).toBe(23);
    expect(catalogGroups.flatMap((group) => group.modelIds).sort()).toEqual(
      diffusers.map((item) => item.model).sort(),
    );
  });

  it('omits the unresolved MF130R capacity', () => {
    expect(diffusers.find((item) => item.model === 'MF130R')?.capacity).toBeNull();
  });

  it('removes known copy errors and blanket technology claims', () => {
    const serialized = JSON.stringify({ diffusers, essentialOils }).toLowerCase();
    expect(serialized).not.toContain('tee tree oil');
    expect(serialized).not.toContain('beauty saloon');
    expect(serialized).not.toContain('all systems are waterless');
  });
});
```

- [ ] **Step 2: Write failing pre-render content tests**

Create `app/pages/aroma-pages.test.tsx`. Render each page in both locales and assert:

- one H1
- aroma process steps exist in both languages
- custom fragrance page includes sampling and OEM/ODM boundaries
- diffuser page exposes all 23 model headings immediately
- no click is required before a model exists in the DOM
- no broad “500–2800m²” group promise appears

Use:

```tsx
const modelHeadings = screen.getAllByRole('heading', { level: 3 });
expect(modelHeadings.map((heading) => heading.textContent)).toEqual(
  expect.arrayContaining(diffusers.map((item) => item.model)),
);
```

- [ ] **Step 3: Run tests to verify they fail**

Run:

```bash
npm test -- app/data/products.test.ts app/pages/aroma-pages.test.tsx
```

Expected: FAIL on the unresolved capacity, copy errors, conditional mounting, and incomplete Malay content.

- [ ] **Step 4: Correct and type catalogue data**

Define:

```ts
export interface Diffuser {
  model: string;
  capacity: string | null;
  coverage: string;
  mounting: 'desktop' | 'wall' | 'freestanding' | 'hanging' | 'hvac' | 'portable';
  features: string[];
  suitableFor: string;
}
```

Set MF130R capacity to `null` with no guessed replacement. Replace “Tee Tree Oil” with “Tea Tree Oil”, “beauty saloon” with “beauty salon”, and “automobile 4S shop” with plain automotive-showroom language. Group models by documented mounting/use format rather than contradictory broad coverage bands.

- [ ] **Step 5: Implement the three focused pages**

- Aroma Solutions: consultation, space assessment, scent direction, diffuser matching, refill, tuning, and maintenance.
- Aroma Diffusers: all models rendered in `<details>` groups with coverage, known capacity, mounting, features, suitability, and “Confirm suitability” CTA. Omit the capacity row when null.
- Custom Fragrance: scent directions, ingredient exploration, sampling, custom development, and documented OEM/ODM support without claiming every diffuser is waterless.

Translate all headings, explanations, controls, suitability labels, and CTAs into Malay.

Update the aroma, diffuser, and fragrance route modules to pass `useCurrentRoute().locale` to their corresponding page components.

- [ ] **Step 6: Run checks**

Run:

```bash
npm test -- app/data/products.test.ts app/pages/aroma-pages.test.tsx app/content/content-policy.test.ts
npm run typecheck
npm run build
```

Expected: PASS; generated diffuser HTML contains all 23 model names.

- [ ] **Step 7: Commit**

```bash
git add app/data app/content app/pages app/routes
git commit -m "feat(aroma): split bilingual service pages"
```

---

### Task 7: Finish localized navigation, crawl files, redirects, and 404 behavior

**Files:**
- Modify: `app/components/layout/Navbar.tsx`
- Modify: `app/components/layout/Footer.tsx`
- Create: `app/components/layout/LanguageSwitcher.tsx`
- Create: `app/components/layout/Breadcrumbs.tsx`
- Modify: `app/routes/not-found.tsx`
- Create: `scripts/generate-public-files.ts`
- Create: `scripts/generate-public-files.test.ts`
- Create: `netlify.toml`
- Modify: `package.json`
- Test: `app/components/layout/LanguageSwitcher.test.tsx`

**Interfaces:**
- Consumes: route registry, counterparts, content, `build/client/404/index.html`.
- Produces: URL-based language switching, localized navigation, `robots.txt`, `sitemap.xml`, `404.html`, and Netlify redirect policy.

- [ ] **Step 1: Write failing language-switch tests**

Render `LanguageSwitcher` in a memory router at `/it-maintenance` and `/ms/diffuser-aroma`. Assert the links point exactly to `/ms/penyelenggaraan-it` and `/aroma-diffusers`, expose `hreflang`, and never mutate an in-memory language state.

- [ ] **Step 2: Write failing static-file generation tests**

In `scripts/generate-public-files.test.ts`, generate files in a temporary directory and assert:

```ts
expect(robots).toBe(
  'User-agent: *\nAllow: /\n\nSitemap: https://msmonsterglobal.com/sitemap.xml\n',
);
expect(sitemap.match(/<url>/g)).toHaveLength(16);
expect(sitemap).toContain('<loc>https://msmonsterglobal.com/it-maintenance</loc>');
expect(sitemap).not.toContain('/404');
```

- [ ] **Step 3: Run tests to verify they fail**

Run:

```bash
npm test -- app/components/layout/LanguageSwitcher.test.tsx scripts/generate-public-files.test.ts
```

Expected: FAIL because URL switching and generators do not exist.

- [ ] **Step 4: Implement localized shell behavior**

Replace language buttons with counterpart `<Link>` elements. Localize every navigation/footer label. Add `aria-current` through `NavLink`, visible focus, a close-on-navigation mobile menu, and breadcrumbs on all non-home pages. Remove the old `LanguageContext` and in-memory toggle after no imports remain.

- [ ] **Step 5: Implement the branded 404**

`NotFoundPage` uses localized content when the path starts with `/ms`, sets one H1, explains the missing page, and links to the correct locale home and contact routes. The `/404` pre-render is copied to `build/client/404.html`; the catch-all route supports client navigation and remains `noindex`.

- [ ] **Step 6: Implement build-time crawl files**

`generate-public-files.ts` writes UTF-8 `robots.txt` and a 16-URL XML sitemap from `ROUTES`. Language alternates remain in each document head as the single maintained `hreflang` method. The script copies `build/client/404/index.html` to `build/client/404.html`.

Change the build script to:

```json
"build": "react-router build && tsx scripts/generate-public-files.ts"
```

- [ ] **Step 7: Add Netlify configuration**

Create `netlify.toml`:

```toml
[build]
command = "npm run build"
publish = "build/client"

[[redirects]]
from = "/it"
to = "/it-maintenance"
status = 301

[[redirects]]
from = "/perfume"
to = "/commercial-aroma-solutions"
status = 301

[[redirects]]
from = "/profile"
to = "/downloads"
status = 301

[[redirects]]
from = "/products"
to = "/commercial-aroma-solutions"
status = 301

[[redirects]]
from = "/*"
to = "/404.html"
status = 404
```

Do not add an SPA `200` fallback.

- [ ] **Step 8: Run checks**

Run:

```bash
npm test -- app/components/layout scripts/generate-public-files.test.ts
npm run typecheck
npm run build
```

Expected: PASS; build output contains `robots.txt`, `sitemap.xml`, and `404.html`.

- [ ] **Step 9: Commit**

```bash
git add app/components/layout app/routes/not-found.tsx scripts package.json netlify.toml
git commit -m "feat(routing): add locale links and real 404"
```

---

### Task 8: Generate optimized favicons, wordmarks, manifest, and social cards

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `scripts/generate-brand-assets.ts`
- Create: `scripts/generate-brand-assets.test.ts`
- Create: `public/favicon.svg`
- Create: `public/site.webmanifest`
- Generate: `public/favicon.ico`
- Generate: `public/assets/brand/logo-dark.webp`
- Generate: `public/assets/brand/logo-light.webp`
- Generate: `public/assets/brand/logo-mark-16.png`
- Generate: `public/assets/brand/logo-mark-32.png`
- Generate: `public/assets/brand/apple-touch-icon.png`
- Generate: `public/assets/brand/icon-192.png`
- Generate: `public/assets/brand/icon-512.png`
- Generate: `public/assets/social/corporate.jpg`
- Generate: `public/assets/social/it-maintenance.jpg`
- Generate: `public/assets/social/aroma-solutions.jpg`
- Modify: `app/root.tsx`
- Modify: `app/components/layout/Navbar.tsx`
- Modify: `app/components/layout/Footer.tsx`

**Interfaces:**
- Consumes: supplied 7016×4961 logo files and existing IT/aroma hero photos.
- Produces: deterministic public brand assets at the exact paths already referenced by metadata/schema.

- [ ] **Step 1: Install deterministic image tooling**

Run:

```bash
npm install -D sharp@0.35.3 png-to-ico@3.0.2
```

Add:

```json
"generate:assets": "tsx scripts/generate-brand-assets.ts"
```

- [ ] **Step 2: Write the failing asset contract test**

Test a temporary output directory. Assert:

- favicon PNGs are 16×16 and 32×32
- touch/app icons are 180×180, 192×192, and 512×512
- all three share cards are 1200×630 JPEGs
- each share card is below 500 KB
- optimized wordmarks are below 100 KB
- manifest name is `MS Monster Global`

Use `sharp(path).metadata()` for dimensions and `stat(path).size` for budgets.

- [ ] **Step 3: Run the test to verify it fails**

Run:

```bash
npm test -- scripts/generate-brand-assets.test.ts
```

Expected: FAIL because the generator and outputs do not exist.

- [ ] **Step 4: Implement logo-mark extraction and optimized wordmarks**

Read the approved black/white source logos with Sharp. Locate the square green brand mark by scanning raw pixels for the largest connected region where green is dominant (`g > 100`, `g > r * 1.3`, `g > b * 1.3`), expand its bounding box by 3%, and crop a square centered on that region. Preserve the supplied mark exactly; do not redraw it.

Trim the excess white/transparent canvas from both wordmarks, resize to a maximum width of 640px, and output lossless WebP.

- [ ] **Step 5: Generate browser/device assets**

Resize the extracted mark with contain padding for 16, 32, 180, 192, and 512 pixel outputs. Build `favicon.ico` from the 16 and 32 pixel PNGs. Create a simple `favicon.svg` that embeds the approved mark asset and a `site.webmanifest` with:

```json
{
  "name": "MS Monster Global",
  "short_name": "MS Monster",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f8fafc",
  "theme_color": "#14532d",
  "icons": [
    { "src": "/assets/brand/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/assets/brand/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

- [ ] **Step 6: Generate three 1200×630 social cards**

Use the existing hero photos, a dark readable overlay, the approved mark, and plain solid white/green typography:

- corporate: split IT and aroma imagery, “MS Monster Global”, “IT Maintenance • Commercial Aroma Solutions”
- IT: server-room image, “IT & AI Maintenance Services”
- aroma: diffuser/fragrance image, “Commercial Aroma Solutions”

Include `msmonsterglobal.com` on each card. Do not use gradient text, fake badges, customer counts, or unsupported claims.

- [ ] **Step 7: Link assets in the root and shell**

Add favicon, Apple touch icon, manifest, and theme-color links in `app/root.tsx`. Replace the 300 KB source logos in navigation/footer with optimized wordmarks and explicit intrinsic dimensions.

- [ ] **Step 8: Run tests and regenerate**

Run:

```bash
npm test -- scripts/generate-brand-assets.test.ts
npm run generate:assets
npm run build
```

Expected: asset test PASS; build copies every icon and social card.

- [ ] **Step 9: Visually inspect generated assets**

Open the 512px icon and all three 1200×630 cards. Confirm the mark is not clipped, text is readable at reduced size, photos are not stretched, and the corporate card communicates both divisions.

- [ ] **Step 10: Commit**

```bash
git add package.json package-lock.json scripts/generate-brand-assets.ts scripts/generate-brand-assets.test.ts public app/root.tsx app/components/layout
git commit -m "feat(brand): add icons and social previews"
```

---

### Task 9: Complete accessibility, responsive, and performance polish

**Files:**
- Modify: `app/styles/index.css`
- Modify: `app/components/layout/Navbar.tsx`
- Modify: `app/components/layout/Footer.tsx`
- Modify: `app/components/content/*`
- Modify: `app/pages/*Page.tsx`
- Modify: responsive media under `public/assets/`
- Test: `app/accessibility.test.tsx`

**Interfaces:**
- Consumes: complete page and asset set.
- Produces: consistent landmarks/headings, accessible names, responsive media, stable dimensions, and reduced route payloads.

- [ ] **Step 1: Write failing semantic/accessibility tests**

Use Testing Library to render representative home, contact, IT, and diffuser pages. Assert:

- exactly one H1 per page
- contact section headings do not skip from H1 to H3
- navigation, language switcher, mobile-menu button, social links, and download links have visible-name-compatible accessible names
- all informative images have non-empty alt text
- decorative icons are `aria-hidden`
- mobile menu exposes `aria-expanded` and closes after a route click

- [ ] **Step 2: Run accessibility tests to verify failures**

Run:

```bash
npm test -- app/accessibility.test.tsx
```

Expected: FAIL on the known heading and accessible-name gaps until fixed.

- [ ] **Step 3: Fix semantics and interaction**

Add one `<main>`, logical H2/H3 structure, labelled navigation, matching visible/accessibility names, current-page state, focus-visible styles, 44px targets, and correct tab semantics. Retain `MotionConfig reducedMotion="user"` and remove animation from layout properties.

- [ ] **Step 4: Fix visual consistency**

Standardize page-width gutters, header offsets, section rhythm, CTA hierarchy, breadcrumbs, image corners, and blue/green division roles. Remove duplicated perfume imagery/overlays and avoid introducing nested cards, gradient text, glass effects, or a new typography system.

- [ ] **Step 5: Fix image delivery**

For each visible image:

- add intrinsic `width` and `height`
- retain high-priority loading only for the active route hero
- retain lazy loading below the fold
- add mobile sources where an existing mobile asset exists
- generate WebP/AVIF variants only when they reduce payload without visible degradation

Confirm no route loads the old 7016×4961 logo files. Confirm React Router route chunks keep the diffuser catalogue out of corporate-page initial bundles.

- [ ] **Step 6: Run tests and build**

Run:

```bash
npm test
npm run typecheck
npm run build
```

Expected: all tests PASS; typecheck/build exit 0.

- [ ] **Step 7: Run a local production Lighthouse pass**

Serve `build/client` and audit `/`, `/it-maintenance`, `/aroma-diffusers`, and `/contact` with `npx --yes lighthouse@13.4.1`. Record actual scores. Fix any remaining Lighthouse accessibility failure, SEO failure, missing image dimensions, or avoidable render-blocking issue before committing.

Targets:

- SEO: 100
- Accessibility: at least 95
- Mobile performance: at least 90, allowing honest reporting of measurement variance

- [ ] **Step 8: Commit**

```bash
git add app public/assets
git commit -m "perf(site): polish accessibility and media"
```

---

### Task 10: Add build verification, documentation, and release evidence

**Files:**
- Create: `scripts/verify-build.ts`
- Create: `scripts/verify-build.test.ts`
- Modify: `package.json`
- Modify: `README.md`
- Create: `docs/seo-launch-checklist.md`

**Interfaces:**
- Consumes: `ROUTES`, built HTML, schema, static files, PDFs, generated assets.
- Produces: `npm run verify:build` and an account-owner launch checklist.

- [ ] **Step 1: Write the failing verifier test**

Create a temporary fixture build with one missing description and one duplicate title. Assert `verifyBuild(root)` rejects with both route-specific diagnostics. Add a passing fixture containing:

- one H1
- correct `<html lang>`
- unique title/description
- canonical and three alternate links
- Open Graph/Twitter image tags
- parseable JSON-LD
- visible body text

- [ ] **Step 2: Run the verifier test to confirm failure**

Run:

```bash
npm test -- scripts/verify-build.test.ts
```

Expected: FAIL because `verifyBuild` does not exist.

- [ ] **Step 3: Implement generated-build verification**

`verifyBuild('build/client')` must fail with a non-zero exit code if:

- any canonical route HTML is missing
- title or description is missing/duplicated
- canonical, locale alternates, social image, JSON-LD, one H1, or correct `lang` is missing
- a schema graph contains a banned unsupported field
- any internal route, PDF, manifest, icon, social card, robots, sitemap, or 404 asset is missing
- sitemap contains anything other than the 16 canonical routes
- 404 HTML is indexable
- a legacy source route appears as canonical

- [ ] **Step 4: Wire verification into scripts**

Add:

```json
{
  "verify:build": "tsx scripts/verify-build.ts",
  "build": "npm run generate:assets && react-router build && tsx scripts/generate-public-files.ts && npm run verify:build"
}
```

- [ ] **Step 5: Update project documentation**

README must document:

```bash
npm install
npm run dev
npm test
npm run typecheck
npm run build
npm run preview
```

It must state that Netlify publishes `build/client`.

Create `docs/seo-launch-checklist.md` with checkboxes for:

- deploy and curl all canonical/legacy/unknown URLs
- verify apex/www redirects
- verify Search Console and Bing Webmaster Tools ownership
- submit `/sitemap.xml`
- request indexing for home, IT, aroma, diffuser, and fragrance routes
- claim/verify an eligible Google Business Profile
- reconcile Bing Places, Apple Business Connect, LinkedIn, and legitimate citations
- verify AMECO relationship before any cross-brand claim
- test live WhatsApp, Facebook, LinkedIn, and X cards; refresh platform caches if stale
- record branded and qualified-query baselines without promising ranking positions

- [ ] **Step 6: Run the complete verification suite**

Run:

```bash
npm test
npm run typecheck
npm run build
git diff --check
```

Expected: all commands exit 0; `verify:build` reports all 16 routes and required static assets valid.

- [ ] **Step 7: Run production-equivalent route checks**

Run:

```bash
npx --yes netlify-cli@27.0.1 dev --offline --port 8888
```

In a second terminal, verify:

```text
/                                      200
/about                                 200
/it-maintenance                        200
/commercial-aroma-solutions            200
/aroma-diffusers                       200
/custom-fragrance-development          200
/downloads                             200
/contact                               200
/ms and all seven Malay child routes   200
/it                                    301 → /it-maintenance
/perfume                               301 → /commercial-aroma-solutions
/profile                               301 → /downloads
/products                              301 → /commercial-aroma-solutions
/definitely-not-found                  404
/robots.txt                            200 text/plain
/sitemap.xml                           200 application/xml
```

- [ ] **Step 8: Run final visual and metadata checks**

At mobile, tablet, and desktop widths, inspect all eight page types and both locale shells. Confirm no overflow, clipped navigation, mixed-language content, missing images, or broken CTA. Inspect built source for route content and metadata without relying on client JavaScript.

- [ ] **Step 9: Commit**

```bash
git add scripts package.json README.md docs/seo-launch-checklist.md
git commit -m "test(seo): verify generated site output"
```

- [ ] **Step 10: Request final code review**

Invoke `superpowers:requesting-code-review`, address every valid P0/P1 finding, rerun the complete verification suite, then use `superpowers:finishing-a-development-branch` to present integration options.

---

### Task 11: Restore the unified Perfume & Aroma experience

**Product direction:** This task supersedes the earlier split-route decision.
The user wants the perfume page and catalogue together, as on the previous
site, and wants the public term “Perfume & Aroma” instead of “Commercial
Aroma Solutions”.

**Files:**
- Modify: `app/config/routes.ts`
- Modify: `app/routes.ts`
- Create or rename: `app/pages/PerfumePage.tsx`
- Modify or remove: split aroma/diffuser/fragrance route and page modules
- Modify: `app/content/en.ts`
- Modify: `app/content/ms.ts`
- Modify: `app/content/types.ts`
- Modify: `app/components/layout/*`
- Modify: `app/pages/HomePage.tsx`
- Modify: `app/pages/DownloadsPage.tsx`
- Modify: `app/pages/ContactPage.tsx`
- Modify: `app/seo/*`
- Modify: `netlify.toml`
- Modify: `scripts/generate-public-files.ts`
- Modify: `scripts/verify-build.ts`
- Modify: `scripts/verify-build.test.ts`
- Modify: affected tests and documentation

**Interfaces:**
- Produces: one bilingual perfume destination containing the full service,
  diffuser-catalogue, and custom-fragrance experience.
- Preserves: prerendering, localized alternates, structured data, crawl
  controls, accessibility, performance, and deterministic social cards.

- [ ] **Step 1: Write failing route and integration tests**

Assert:

- English `perfume` route is `/perfume`
- Malay counterpart is `/ms/perfume`
- the two perfume URLs are canonical, prerendered, indexable, and reciprocal
  language alternates
- no split aroma, diffuser, or fragrance route remains canonical/indexable
- the unified page has exactly one H1
- the unified page renders the service process, all 23 documented diffuser
  models, sampling boundaries, and OEM/ODM information in both languages
- public navigation exposes one “Perfume & Aroma” destination and no separate
  catalogue destination
- all internal perfume CTAs use the unified route or an in-page anchor

- [ ] **Step 2: Verify RED**

Run focused tests and record the expected failures against the split routes
and separate pages.

- [ ] **Step 3: Implement the unified page**

Build one polished `/perfume` page that retains the previous site’s hierarchy:

1. Perfume & Aroma hero
2. scent/service recommendation and space guidance
3. aroma process and scent directions
4. complete crawlable diffuser catalogue (all 23 models in initial HTML)
5. custom fragrance sampling and documented OEM/ODM boundaries
6. one contact/recommendation CTA

Use one H1 and logical H2/H3 structure. Keep both English and Malay complete.
Reuse the approved imagery and existing factual catalogue data. Do not restore
the previous conditional catalogue mounting or unsupported broad coverage
claims.

- [ ] **Step 4: Consolidate routes, metadata, schema, and crawl files**

Canonical/indexable page count becomes 12: home, about, IT, perfume, downloads,
and contact in English and Malay.

Use:

- `/perfume`
- `/ms/perfume`
- title: `Perfume & Aroma Solutions Malaysia | MS Monster Global`
- Malay title: `Perfume & Aroma Malaysia | MS Monster Global`

Redirect permanently:

- `/commercial-aroma-solutions` → `/perfume`
- `/aroma-diffusers` → `/perfume`
- `/custom-fragrance-development` → `/perfume`
- `/products` → `/perfume`
- `/ms/penyelesaian-aroma-komersial` → `/ms/perfume`
- `/ms/diffuser-aroma` → `/ms/perfume`
- `/ms/pembangunan-wangian-tersuai` → `/ms/perfume`

Update sitemap, alternates, breadcrumbs, schema, verifier expectations, social
metadata, and all internal links. `/perfume` must be a direct-load `200`, not a
redirect.

- [ ] **Step 5: Verify behavior and production-equivalent routing**

Run:

```bash
npm test
npm run typecheck
npm run build
git diff --check
```

With Netlify CLI `27.0.1`, prove:

- `/perfume` and `/ms/perfume` return `200` on direct requests
- all 12 canonical URLs return `200`
- all seven former split/product URLs return `301` to the correct unified page
- `/definitely-not-found` returns the branded `404`
- sitemap contains exactly the 12 canonical URLs

Run mobile, tablet, and desktop visual checks on the unified page in both
languages. Confirm no overflow, duplicate H1, mixed-language content, missing
images, or catalogue content hidden from generated HTML.

- [ ] **Step 6: Commit**

```bash
git add app netlify.toml scripts docs package.json README.md
git commit -m "feat(perfume): restore unified catalogue page"
```
