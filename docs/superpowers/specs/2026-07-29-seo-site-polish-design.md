# MS Monster Global SEO and Whole-Site Polish Design

**Date:** 2026-07-29
**Status:** Approved for implementation planning
**Production origin:** `https://msmonsterglobal.com`

## 1. Objective

Make the MS Monster Global website reliably crawlable, understandable, shareable, and polished while preserving its current professional corporate identity.

The first release will prioritize:

1. Exact-name visibility for “MS Monster Global” and “MS Monster Global Sdn Bhd”.
2. Relevant Malaysian commercial searches for IT maintenance, commercial aroma solutions, aroma diffusers, and custom fragrance development.
3. Clear business identity and enquiry paths for prospective customers.

No implementation can guarantee a first-place ranking. The release will establish the technical, content, and entity foundation needed to compete for branded and qualified commercial searches.

## 2. Current-State Problems

The live site currently has several material search and quality issues:

- Valid client-side routes such as `/about`, `/it`, `/perfume`, `/profile`, and `/contact` return HTTP 404 when requested directly on Netlify.
- The initial HTML is an empty Vite application shell with one generic title and no route content.
- There are no route-specific descriptions, canonical URLs, social-preview tags, structured data, sitemap, or valid `robots.txt`.
- Unknown routes are redirected to the homepage in the client instead of producing a genuine 404 page.
- Bahasa Melayu is an in-memory toggle rather than a crawlable language version. Much of the content remains English after switching languages.
- Most diffuser models and ingredients are only mounted after user interaction and are therefore absent from the initial document.
- The company-profile page promises documents but does not render the existing PDF links.
- Large logo files, missing intrinsic image dimensions, duplicated perfume-page elements, and one large shared JavaScript bundle create avoidable performance costs.
- Several public claims and product groupings are inconsistent or not sufficiently supported by the supplied company materials.

## 3. Chosen Architecture

### 3.1 Static pre-rendering

Migrate the existing React Router 7 application from declarative SPA-only routing to React Router framework mode with static pre-rendering:

- `ssr: false`
- Explicit pre-rendering of every public English and Bahasa Melayu route
- Static HTML and hydration for existing interactive controls
- Netlify-compatible static output and redirects

This approach keeps React, Tailwind CSS, the current components, and static hosting. It avoids the crawler limitations of an empty SPA shell without introducing a runtime server.

### 3.2 Route structure

English canonical routes:

| Route | Purpose and primary search intent |
|---|---|
| `/` | MS Monster Global brand and division overview |
| `/about` | Legal entity, business background, values, and verified history |
| `/it-maintenance` | IT and AI infrastructure maintenance services |
| `/commercial-aroma-solutions` | Commercial scent marketing and aroma-system services |
| `/aroma-diffusers` | Crawlable commercial diffuser catalogue |
| `/custom-fragrance-development` | Custom fragrance, OEM/ODM, and scent-development services |
| `/downloads` | Company profiles, credentials, and product brochure |
| `/contact` | Nilai contact information and enquiry paths |

Bahasa Melayu routes:

| Route | English counterpart |
|---|---|
| `/ms` | `/` |
| `/ms/tentang` | `/about` |
| `/ms/penyelenggaraan-it` | `/it-maintenance` |
| `/ms/penyelesaian-aroma-komersial` | `/commercial-aroma-solutions` |
| `/ms/diffuser-aroma` | `/aroma-diffusers` |
| `/ms/pembangunan-wangian-tersuai` | `/custom-fragrance-development` |
| `/ms/muat-turun` | `/downloads` |
| `/ms/hubungi` | `/contact` |

Every language switch will navigate to the translated counterpart URL. Each generated document will declare the correct `lang` value and reciprocal `hreflang` links.

### 3.3 Redirects and errors

Permanent redirects will preserve existing links:

- `/it` → `/it-maintenance`
- `/perfume` → `/commercial-aroma-solutions`
- `/profile` → `/downloads`
- `/products` → `/commercial-aroma-solutions`

The `www` host will continue redirecting to the HTTPS apex origin. Netlify configuration will serve generated static routes directly, return permanent redirects for legacy routes, and return a branded `404.html` with HTTP 404 for unknown paths. There will be no broad homepage fallback that converts invalid URLs into soft 404s.

## 4. Search Metadata and Crawl Controls

### 4.1 Per-route metadata

Every route will define:

- A unique, descriptive title
- A unique meta description based on visible page content
- A self-referencing canonical URL
- `robots` directives
- Open Graph title, description, type, URL, image, image dimensions, and image alt text
- A large-image Twitter card
- English and Bahasa Melayu alternates

The home title will lead with the company name. Service-page titles will lead with the relevant service and Malaysia qualifier where the visible copy supports it. Metadata will avoid keyword repetition and unsupported promises.

### 4.2 Sitemap and robots

The build will emit:

- `/robots.txt`, allowing public routes and referencing the sitemap
- `/sitemap.xml`, containing only canonical, indexable HTML routes
- Reciprocal English/Bahasa Melayu alternates in each document head

PDFs will be discoverable through the downloads page but will not be added to the first HTML sitemap.

### 4.3 Structured data

A shared JSON-LD graph will describe:

- `Corporation`
- `WebSite`
- Verified contact information and postal address
- SSM registration identifier
- Corporate founding date of `2022-11-16`
- Canonical logo and official Facebook URL
- Two factual offer catalogues: IT maintenance services and aroma/scent solutions

Relevant routes will add `Service` and `BreadcrumbList` nodes.

The release will not claim `LocalBusiness`, opening hours, geocoordinates, national service coverage, ratings, accreditations, prices, or awards without verification. Product rich-result markup will be deferred until model specifications, manufacturer relationships, commercial availability, and individual product pages are verified.

## 5. Brand Icons and Link-Share Images

### 5.1 Browser and device icons

Create a coherent icon set derived from the existing MS Monster Global logo rather than inventing a new identity:

- SVG favicon derived from the approved logo treatment
- `favicon.ico`
- 16×16 and 32×32 browser icons
- 180×180 Apple touch icon
- 192×192 and 512×512 web-app icons
- Web app manifest with brand name, icon references, and restrained theme colors

If the supplied wordmark has no suitable standalone mark, use a clean square crop or monogram treatment based on the existing approved lettering.

### 5.2 Social previews

Create optimized 1200×630 share cards using the existing logo and authentic site photography:

1. Corporate default: MS Monster Global with both business divisions
2. IT maintenance: server/infrastructure imagery and service label
3. Aroma solutions: diffuser/fragrance imagery and service label

Each file will have an absolute production URL, explicit dimensions, descriptive alt text, and a compressed file size suitable for WhatsApp, Facebook, LinkedIn, and other unfurling clients. The default corporate card will be used on company, download, contact, and error pages. Route-specific cards will be used on the corresponding service pages.

## 6. Content and Information Architecture

### 6.1 Company identity

Use one consistent entity record throughout the site:

- `MS Monster Global Sdn Bhd`
- Registration number `202201042816 (1488513-W)`
- Nilai, Negeri Sembilan address
- `+60 12-666 5658`
- `solehin@msmonsterglobal.com`
- `https://msmonsterglobal.com`

The company was incorporated in 2022. Earlier activity will be described as the business’s roots or predecessor history, not as the Sdn Bhd’s incorporation date.

### 6.2 Claim safety

The public copy will not add unsupported claims such as:

- Nationwide on-site coverage
- 24/7 support
- Guaranteed response times
- Named certifications or compliance standards
- Customer counts, performance guarantees, or fabricated testimonials
- Verified ownership of AMECO

The AMECO ownership claim and the cosmetics-licence timeline statement will be removed or withheld until documentary support is provided. The separate MS Monster Enterprise registration will not be represented as the current Sdn Bhd entity.

### 6.3 Service content

The existing service material will be reorganized into focused pages:

- IT maintenance: supported environments, preventive/predictive maintenance, hardware and software support, network monitoring, troubleshooting, backup and recovery, cloud support, and remote/on-site options without inventing coverage areas.
- Commercial aroma solutions: consultation, space assessment, scent direction, diffuser matching, refill, tuning, and maintenance.
- Aroma diffusers: all catalogue content rendered in the HTML. Collapsible presentation may remain, but the content cannot depend on client interaction to exist.
- Custom fragrance development: documented fragrance development, ingredients, sampling, and OEM/ODM boundaries.

Individual diffuser pages, thin city pages, and extra IT sub-service pages are outside the first release. They require verified specifications, unique evidence, and enough useful content to avoid doorway or duplicate pages.

### 6.4 Product corrections

Before publishing catalogue copy:

- Remove blanket “waterless” language because not every documented model uses the same technology.
- Avoid broad size-band recommendations that conflict with individual model coverage figures.
- Resolve or omit the contradictory MF130R capacity value.
- Correct obvious source-language issues such as “Tee Tree Oil”, “beauty saloon”, and inconsistent unit formatting.
- Present specifications as product guidance and direct customers to confirm final suitability with the team.

No unsupported values will be guessed.

### 6.5 Downloads and contact

The downloads page will visibly render all three existing PDFs with descriptive titles, document type, and clear download/open actions.

The contact page will retain direct phone, email, WhatsApp, map, and Facebook paths. The site will not publish business hours, service areas, or a customer-facing storefront claim until those facts are confirmed.

## 7. Whole-Site Polish

The visual direction remains professional, reliable, and practical. This is a refinement, not a redesign.

The implementation will:

- Keep the current blue/green division system and image-led service direction.
- Make navigation labels, active states, language switching, page headers, breadcrumbs, and calls to action consistent.
- Complete all Bahasa Melayu translations so no translated route becomes mixed-language, except for proper names and model identifiers.
- Correct heading order and landmark semantics.
- Fix known contrast and accessible-name issues.
- Preserve keyboard operation, visible focus states, reduced-motion support, and minimum touch targets.
- Remove duplicated images and overlays on the aroma page.
- Right-size the oversized logo assets and add intrinsic dimensions to images.
- Add modern image sources where they reduce payload without visible quality loss.
- Split route code through the framework build and avoid loading the entire catalogue UI on every page.
- Keep meaningful alt text and improve any text that describes decorative rather than informative imagery.

No analytics, tracking pixels, cookie banner, live chat, or contact-form backend will be added in this release.

## 8. Component Boundaries

Implementation should keep page behavior understandable and independently testable:

- `site-config`: canonical origin, entity facts, social profiles, locale definitions, and route mapping
- `seo`: route metadata, canonical/hreflang helpers, JSON-LD nodes, and social-image selection
- `layout`: document shell, navigation, footer, breadcrumbs, language switcher, and error page
- `content`: locale-complete route copy and verified catalogue data
- `downloads`: document list and accessible download cards
- `media`: responsive image and share-image asset mapping

Business identity values must come from one shared configuration instead of being repeated across components.

## 9. Failure and Edge-Case Handling

- Unknown paths return the branded 404 page with a genuine 404 response.
- Legacy paths use server-level permanent redirects, not JavaScript redirects.
- English/Bahasa Melayu counterparts are explicitly mapped; the switcher never constructs unverified paths.
- Missing optional social images fall back to the corporate default.
- Metadata helpers use validated route records and fail the build if a public route lacks required SEO fields.
- Catalogue content remains understandable when JavaScript is unavailable.
- External links open safely and preserve accessible labels.

## 10. Verification

Before completion, run fresh verification against the production build:

1. TypeScript/lint command exits successfully.
2. Production build exits successfully and emits every approved route.
3. Generated HTML for every route contains meaningful body content, one H1, the correct language, unique title and description, canonical, alternates, social tags, and valid JSON-LD.
4. Every canonical route returns 200 from a production-equivalent static server.
5. Every legacy route returns a permanent redirect to its approved destination.
6. An unknown route returns 404 and does not redirect to the homepage.
7. `robots.txt`, `sitemap.xml`, icons, manifest, share images, and PDFs return the expected status and content type.
8. Internal links and language counterparts resolve without broken paths.
9. Structured data parses and contains only visible, verified claims.
10. Lighthouse is rerun on representative pages, targeting SEO 100, accessibility at least 95, and mobile performance at least 90 while treating measurement variance honestly.
11. Share metadata is inspected for the corporate, IT, and aroma routes. Final WhatsApp/Facebook cache behavior is checked after deployment because those services fetch the public URL.

## 11. Launch and Off-Site Follow-Up

Code delivery will include a concise launch checklist for tasks that require account ownership:

- Deploy the generated Netlify output and verify live response codes.
- Verify the domain in Google Search Console and Bing Webmaster Tools.
- Submit the sitemap and request indexing of the primary canonical routes.
- Claim or verify an eligible Google Business Profile with consistent legal name, address, phone, category, and website.
- Create or reconcile Bing Places, Apple Business Connect, LinkedIn, and other legitimate entity profiles.
- Verify the AMECO relationship before cross-linking the brands as related companies.
- Pursue genuine client, supplier, industry, and association citations instead of bulk directory links.

Search Console, business-profile ownership, third-party listing creation, outreach, backlinks, and production deployment require the relevant user accounts or separate authorization. They are not silently performed by the code change.

## 12. Acceptance Criteria

The implementation is ready for release when:

- Public routes are pre-rendered and directly accessible without 404 responses.
- English and Bahasa Melayu pages are complete, reciprocal, and independently indexable.
- Branded and service metadata is unique, factual, and visible in generated HTML.
- The favicon and social previews use the MS Monster Global identity and load from public-ready paths.
- Sitemap, robots, canonical, redirect, structured-data, and 404 behavior pass verification.
- Company and product copy contains no known unsupported or contradictory claims.
- The existing design is visibly more consistent and polished without becoming a different brand.
- The build, type checks, link checks, route checks, and representative quality audits pass with fresh evidence.
