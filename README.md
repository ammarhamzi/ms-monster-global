# MS Monster Global Corporate Portal

Corporate website for MS Monster Global Sdn Bhd, covering AMECO consumer products, perfume and aroma solutions, IT and AI maintenance services, company profile downloads, and contact information.

## Run Locally

Prerequisite: Node.js 22.22.2 or newer.

```bash
npm install
npm run dev
```

The local development server runs at:

```text
http://localhost:3000/
```

## Scripts

```bash
npm install
npm run dev
npm test
npm run typecheck
npm run build
npm run preview
```

- `npm run dev` starts the local development server.
- `npm test` runs the Vitest suite.
- `npm run typecheck` generates route types and checks TypeScript.
- `npm run build` generates brand assets, pre-renders the site, creates crawl files, and verifies the production output.
- `npm run verify:build` verifies an existing `build/client` output.
- `npm run preview` previews the production build.

Netlify publishes the generated static site from `build/client`.
