# BharatNXT Wave — Startup Consulting Website

Marketing site for BharatNXT Wave: ~45 service pages, a blog, and a lead form
that writes straight into a Google Sheet.

Content is edited through a **Sanity Content Studio** mounted at `/studio`.
Non-technical editors should read **[CMS-GUIDE.md](CMS-GUIDE.md)** — this file
is for developers.

```
Form (React) -> /api/submit (server-side) -> Google Apps Script -> Google Sheet
Pages         -> lib/content.js -> Sanity  (falls back to lib/data.js)
```

No database and no paid backend: the Google Sheet is the lead store, Sanity's
free tier is the CMS.

---

## Tech

Next.js 16 (App Router, Turbopack) · React 19 · Sanity v6 · plain CSS design
system · no UI framework.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
                     # Studio at http://localhost:3000/studio
```

The site runs fine with no environment variables at all — see *Content* below.

---

## Content

Every page reads through **[lib/content.js](lib/content.js)**, which asks Sanity
first and falls back to the hand-written defaults in
[lib/data.js](lib/data.js) / [lib/services.js](lib/services.js).

That fallback is load-bearing, not a nicety:

- the site renders correctly before anyone has set up a CMS project,
- a Sanity outage degrades to last-known-good content instead of a 500,
- a half-seeded dataset can't blank out a section (empty arrays fall back too).

So **never** make a page import `lib/data.js` directly — always go through
`lib/content.js`.

Setting the CMS up for the first time — creating the project, importing the
existing content with `npm run seed`, and the Netlify variables — is Part 1 of
[CMS-GUIDE.md](CMS-GUIDE.md).

### Layout

```
app/(site)/       the public website  — its own root layout, globals.css
app/(studio)/     the Sanity Studio   — its own root layout, no site chrome
sanity/schemas/   what editors can edit
sanity/lib/       client, GROQ queries, image URL builder
scripts/seed.mjs  one-time import of lib/data.js into Sanity
```

The two route groups exist so the Studio doesn't inherit the site's header and
footer. Both are root layouts; neither nests inside the other.

`app/(studio)/studio/[[...tool]]/Studio.js` is marked `"use client"` on
purpose — it keeps `sanity.config.js` out of the server component graph, where
its `swr` dependency resolves to a react-server build with no default export
and fails the build.

---

## Environment variables

| Key | Needed by | Notes |
| --- | --- | --- |
| `GOOGLE_SCRIPT_URL` | the lead form | without it, submissions fail |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | the CMS | without it, built-in content is served |
| `NEXT_PUBLIC_SANITY_DATASET` | the CMS | defaults to `production` |
| `NEXT_PUBLIC_SITE_URL` | sitemap, robots | absolute URLs |
| `SANITY_API_WRITE_TOKEN` | `npm run seed` only | **local only — never set in Netlify** |

Copy [.env.example](.env.example) to `.env.local` to get started.

## Connect the Google Sheet (one time)

1. Create a Google Sheet. Row 1 headers, in this exact order:
   `Timestamp | Name | Phone | Email | Service | Message`
2. **Extensions → Apps Script**, paste
   [google-apps-script/Code.gs](google-apps-script/Code.gs), Save.
3. **Deploy → New deployment → Web app** → execute as **Me**, access
   **Anyone** → copy the URL.
4. Put it in `.env.local` as `GOOGLE_SCRIPT_URL`, and in Netlify.

## Branding

- Colours and fonts: the `:root` block at the top of
  [app/globals.css](app/globals.css) (`--blue`, `--orange`, `--serif`).
- Logo: drop a file at `public/logo.png` — it overrides the shipped
  `public/logo.svg` wordmark.
- Icons: inline SVGs in [components/Icons.js](components/Icons.js). Adding a
  case there means also adding it to `ICON_OPTIONS` in
  [sanity/schemas/objects.js](sanity/schemas/objects.js), or editors won't be
  able to pick it.

## Deploy

Netlify, building from `main`. `npm run build`, publish directory `.next`, with
the `@netlify/plugin-nextjs` plugin. Push to `main` and it deploys.

Netlify blocks deploys of Next.js versions with known critical CVEs, so keep
Next patched — that is what CVE-2025-55182 was about.
