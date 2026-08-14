# Bildungs Guard — Landing Page

Marketing site for Bildungs Guard. Next.js (App Router) + TypeScript + Tailwind CSS.
This repo is the marketing site only — the LMS application is a separate codebase.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (fails on type errors — keep it that way) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier + Tailwind class sorting |

Run `npm run lint && npm run typecheck && npm run build` before every push.

## Where things live

```
src/app/          Routing, layout, metadata, sitemap, robots. Composition only.
src/components/ui/        Reusable primitives. No page copy, no business logic.
src/components/layout/    Navbar, Footer, LanguageSwitch.
src/components/sections/  One component per landing-page section.
src/data/content/         All page copy, typed by src/types/content.ts (de.ts / en.ts).
src/lib/                  cn(), constants, zod schemas, API client.
src/hooks/                Shared client-side behaviour.
public/fonts/             Self-hosted webfonts (DSGVO — never use the Google CDN).
```

## Two rules that keep the design intact

1. **No raw values in components.** Colours, radii and fonts come from the tokens in
   `src/app/globals.css`. If a value is missing, add a token — don't inline a hex.
2. **No copy in JSX.** Text lives in `src/data/content/*.ts`. Both locales are typed
   against `SiteContent`, so a missing translation fails the build.

## Adding a section

1. Add its content shape to `src/types/content.ts`.
2. Add the copy to `de.ts` **and** `en.ts`.
3. Build `src/components/sections/<Name>.tsx`, taking content as props.
4. Render it in `src/app/page.tsx`.
5. Add its anchor id to `SECTION_IDS` in `src/lib/constants.ts`.

## Backend

Not implemented. `src/lib/validation/demo-request.ts` holds the zod schema and
`src/lib/api/client.ts` a fetch wrapper — the demo form will POST to a route handler
in `src/app/api/` when the backend exists.

## Legal pages

`/impressum`, `/datenschutz`, `/agb` and their English counterparts `/en/imprint`,
`/en/privacy`, `/en/terms`. Content lives in `src/data/legal/de.ts` and `en.ts`,
typed by `src/types/legal.ts`, rendered by `src/components/legal/LegalPage.tsx`.

**These are drafts.** Every company-specific value is written as a `[placeholder]`.
A yellow draft banner renders automatically while any placeholder remains and
disappears once the last one is filled. The text still needs a legal review before
launch — it is a scaffold, not legal advice.

Legal pages deliberately use their own slim header and footer instead of the
marketing `Navbar`/`Footer`: those link to `#section` anchors that only exist on the
landing page.

## Security

`next.config.ts` sets the response headers: CSP, HSTS, `nosniff`,
`X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, COOP/CORP, and
`poweredByHeader: false`.

Two things to know before changing anything here:

- **`script-src` allows `'unsafe-inline'`** because the pages are statically
  prerendered and Next's hydration payload is an inline script. A nonce-based policy
  needs middleware, which makes every route render per-request.
- **`headers()` only applies on a Node/serverless target.** On static-CDN hosting the
  same headers must be configured at the edge instead.
- **Never load fonts, scripts or images from a third-party origin.** The CSP blocks
  it, and the DSGVO position of this site depends on it.

JSON-LD is injected through `jsonLdHtml()` in `src/lib/seo.ts`, which escapes `<`.
Use it rather than `JSON.stringify` directly.

## CI

`.github/workflows/ci.yml` runs `npm ci`, lint, typecheck, build and
`npm audit --audit-level=high` on every pull request and every push to `main`.

## Deployment

Vercel or AWS Amplify. Keep SSR/SSG — do **not** set `output: "export"`, it disables
`next/image` optimisation. Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`).

## Locales

German is served at `/`, English at `/en`. Each locale has its own root layout
(`src/app/(de)`, `src/app/(en)`) so the `lang` attribute and metadata are correct,
and both render the same `LandingPage` component with a different dictionary.

Both dictionaries implement `SiteContent` — adding a key to one without the other
fails the build.
