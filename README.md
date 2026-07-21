# BharatNXT Wave — Startup Consulting Website (Next.js)

A complete, professional, single-page marketing website modelled on
`leostartsservices.com` — rebuilt with BharatNXT Wave branding (terracotta + green),
custom animations, and a lead form whose data flows straight into a **Google Sheet**.

```
Form (React) -> /api/submit (Next.js, server-side) -> Google Apps Script -> Google Sheet
```
No database, no paid backend. The Google Sheet **is** the backend.

---

## Sections
Hero (rotating wave headline) · Partners marquee · Services · Funding schemes ·
About / Philosophy-Mission-Vision · Animated stat counters · Filterable portfolio ·
Testimonials slider · Contact form + offices · Footer · Floating WhatsApp button.

## Animations
- Rotating "wave" headline word (Hero)
- Scroll-reveal fade/slide on every section (IntersectionObserver)
- Count-up stat numbers
- Floating hero badges + WhatsApp button
- Auto-scrolling partner marquee
- Portfolio category filter, testimonials auto-slider, card hover lifts

## Tech
Next.js 15 (App Router) · React 19 · plain CSS design system · zero heavy deps.

---

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
```

## Connect the Google Sheet (one time)
1. Create a Google Sheet. Row 1 headers (exact order):
   `Timestamp | Name | Phone | Email | Service | Message`
2. **Extensions → Apps Script**, paste [`google-apps-script/Code.gs`](google-apps-script/Code.gs), Save.
3. **Deploy → New deployment → Web app** → Execute as **Me**, access **Anyone** → copy the URL.
4. `cp .env.local.example .env.local` and paste the URL into `GOOGLE_SCRIPT_URL`.
5. Restart `npm run dev`, submit the form → a row appears in your Sheet.

## Replace the logo
Drop your real logo at **`public/logo.png`** — it automatically overrides the shipped
`public/logo.svg` wordmark. (Footer uses a light text version on the dark background.)

## Swap the images
Photos currently use `picsum.photos` placeholders (hero, about, portfolio) and
`pravatar.cc` avatars (testimonials). Replace the URLs in:
- [`components/Hero.js`](components/Hero.js), [`components/About.js`](components/About.js)
- [`components/Portfolio.js`](components/Portfolio.js) → uses `seed` from [`lib/data.js`](lib/data.js)
- [`components/Testimonials.js`](components/Testimonials.js)

## Edit content / brand
- All text, services, funding, testimonials, offices → [`lib/data.js`](lib/data.js)
- Brand colors (`--rust`, `--green`, fonts) → top of [`app/globals.css`](app/globals.css)

## Deploy (free)
Push to GitHub → import into **Vercel** → add the `GOOGLE_SCRIPT_URL` env var. Done.

---

## Reuse for another company
1. Change colors in `globals.css` (`--rust`, `--green`).
2. Change text/services in `lib/data.js`.
3. Drop a new `public/logo.png`.
4. Create a fresh Google Sheet + Apps Script URL, update `.env.local`.
