// ============================================================
// One-time import: copies everything in lib/data.js and lib/services.js into
// Sanity so the Studio opens already full of the live site's content.
//
//   npm run seed                 create anything that is missing (safe to re-run)
//   npm run seed -- --force      overwrite existing documents too (destructive)
//   npm run seed -- --skip-images  much faster; leaves image fields empty
//
// Needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local.
// ============================================================

import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import {
  COMPANY, FOOTER, NAV_LINKS, HERO, HERO_IMAGES, IMAGES,
  SERVICES_INTRO, SERVICES, FUNDING_INTRO, FUNDING, CORE_VALUES,
  FOOTPRINT, PORTFOLIO_INTRO, PORTFOLIO_CATS, PORTFOLIO, STATS,
  TESTIMONIALS, ABOUT_TEXT, HEAD_OFFICE, BRANCHES, PARTNERS,
  FAQS, BLOG_POSTS,
} from "../lib/data.js";
import { SERVICE_MENU, SERVICE_PAGES, slugify } from "../lib/services.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// Minimal .env.local reader — avoids pulling in dotenv for a script run by hand.
function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const path = resolve(root, file);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, "utf8").split("\n")) {
      const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (!m) continue;
      const key = m[1];
      if (process.env[key] !== undefined) continue;
      process.env[key] = (m[2] || "").replace(/^["']|["']$/g, "").trim();
    }
  }
}
loadEnv();

const FORCE = process.argv.includes("--force");
const SKIP_IMAGES = process.argv.includes("--skip-images");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(`
Missing credentials.

  NEXT_PUBLIC_SANITY_PROJECT_ID   ${projectId ? "ok" : "MISSING"}
  SANITY_API_WRITE_TOKEN          ${token ? "ok" : "MISSING"}

Create a write token at https://sanity.io/manage -> your project -> API -> Tokens
(permission: Editor), then add both to .env.local. See CMS-GUIDE.md.
`);
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-01-01",
  useCdn: false,
});

// ---------------- image upload ----------------

const assetCache = new Map();
let uploaded = 0;

async function uploadImage(ref, alt = "") {
  if (!ref || SKIP_IMAGES) return undefined;
  if (assetCache.has(ref)) return imageRef(assetCache.get(ref), alt);

  const url = ref.startsWith("http")
    ? ref
    : `https://images.unsplash.com/${ref}?auto=format&fit=crop&w=1600&q=80`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const asset = await client.assets.upload("image", buf, { filename: `${ref}.jpg` });
    assetCache.set(ref, asset._id);
    uploaded += 1;
    process.stdout.write(`  uploaded ${uploaded} image${uploaded === 1 ? "" : "s"}\r`);
    return imageRef(asset._id, alt);
  } catch (err) {
    console.warn(`\n  ! could not upload ${ref}: ${err.message} (field left empty)`);
    return undefined;
  }
}

const imageRef = (assetId, alt = "") => ({
  _type: "image",
  asset: { _type: "reference", _ref: assetId },
  ...(alt ? { alt } : {}),
});

// ---------------- helpers ----------------

const key = (i) => ({ _key: `k${i}` });
const keyed = (arr, fn) => arr.map((item, i) => ({ ...fn(item, i), ...key(i) }));

// Turns a plain paragraph string into a Portable Text block.
const block = (text, i = 0) => ({
  _type: "block",
  _key: `b${i}`,
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: `s${i}`, text, marks: [] }],
});

const docs = [];
const add = (doc) => { docs.push(doc); return doc; };

// ---------------- build documents ----------------

async function build() {
  console.log(`\nBuilding documents for ${projectId}/${dataset}...\n`);

  add({
    _id: "siteSettings",
    _type: "siteSettings",
    ...COMPANY,
    footerTagline: FOOTER.tagline,
    quickLinks: keyed(FOOTER.quickLinks, (l) => ({ _type: "navLink", label: l.label, href: l.href })),
    footerOffices: keyed(FOOTER.offices, (o) => ({ city: o.city, addr: o.addr })),
    disclaimer: FOOTER.disclaimer,
  });

  add({
    _id: "navigation",
    _type: "navigation",
    links: keyed(NAV_LINKS, (l) => ({
      label: l.label,
      href: l.href,
      ...(l.children
        ? { children: keyed(l.children, (c) => ({ _type: "navLink", label: c.label, href: c.href })) }
        : {}),
    })),
  });

  if (!SKIP_IMAGES) console.log("Uploading images (this is the slow part)...");

  const heroImages = [];
  for (let i = 0; i < HERO_IMAGES.length; i++) {
    const img = await uploadImage(HERO_IMAGES[i], "BharatNXT Wave");
    if (img) heroImages.push({ ...img, ...key(i) });
  }

  add({
    _id: "homePage",
    _type: "homePage",
    heroMarquee: HERO.marquee,
    heroEyebrow: HERO.eyebrow,
    heroSub: HERO.sub,
    heroImages,
    servicesEyebrow: SERVICES_INTRO.eyebrow,
    servicesTitle: SERVICES_INTRO.title,
    serviceHighlights: keyed(SERVICES, (s) => ({ title: s.title, desc: s.desc, icon: s.icon })),
    fundingEyebrow: FUNDING_INTRO.eyebrow,
    fundingTitle: FUNDING_INTRO.title,
    fundingRotate: FUNDING_INTRO.rotate,
    fundingSub: FUNDING_INTRO.sub,
    fundingSchemes: keyed(FUNDING, (f) => ({ amount: f.amount, title: f.title, note: f.note, icon: f.icon })),
    valuesEyebrow: CORE_VALUES.eyebrow,
    valuesTitle: CORE_VALUES.title,
    valuesImage: await uploadImage(IMAGES.coreValues, "Our core values"),
    valuesTabs: keyed(CORE_VALUES.tabs, (t) => ({
      tab: t.tab,
      lead: t.lead,
      points: keyed(t.points, (p) => ({ title: p.title, desc: p.desc })),
    })),
    footprintEyebrow: FOOTPRINT.eyebrow,
    footprintTitle: FOOTPRINT.title,
    footprintStates: keyed(FOOTPRINT.states, (s) => ({ _type: "percentBar", name: s.name, pct: s.pct })),
    footprintSectors: keyed(FOOTPRINT.sectors, (s) => ({ _type: "percentBar", name: s.name, pct: s.pct })),
    portfolioEyebrow: PORTFOLIO_INTRO.eyebrow,
    portfolioText: PORTFOLIO_INTRO.text,
    portfolioCategories: PORTFOLIO_CATS,
    stats: keyed(STATS, (s) => ({ value: s.value, suffix: s.suffix, label: s.label, sub: s.sub, icon: s.icon })),
  });

  add({
    _id: "aboutPage",
    _type: "aboutPage",
    heading: "About Us",
    intro: ABOUT_TEXT,
    body: [block(ABOUT_TEXT)],
  });

  add({
    _id: "contactPage",
    _type: "contactPage",
    heading: "Contact Us",
    intro: "Tell us what you need and our team will map the right path within 24 hours.",
    headOffice: HEAD_OFFICE,
    branches: keyed(BRANCHES, (b) => ({ city: b.city, addr: b.addr })),
  });

  // service categories + services
  for (let gi = 0; gi < SERVICE_MENU.length; gi++) {
    const g = SERVICE_MENU[gi];
    add({
      _id: `serviceGroup-${slugify(g.group)}`,
      _type: "serviceGroup",
      title: g.group,
      icon: g.icon,
      order: gi * 10,
    });
  }

  const slugs = Object.keys(SERVICE_PAGES);
  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const p = SERVICE_PAGES[slug];
    add({
      _id: `service-${slug}`,
      _type: "service",
      title: p.title,
      slug: { _type: "slug", current: slug },
      group: { _type: "reference", _ref: `serviceGroup-${slugify(p.group)}` },
      icon: p.icon,
      image: await uploadImage(p.img, p.title),
      desc: p.desc,
      intro: p.intro,
      points: p.points,
      order: i,
      seo: { _type: "seo", title: `${p.title} — BharatNXT Wave`, description: p.desc },
    });
  }

  for (let i = 0; i < BLOG_POSTS.length; i++) {
    const b = BLOG_POSTS[i];
    add({
      _id: `post-${slugify(b.title)}`,
      _type: "post",
      title: b.title,
      slug: { _type: "slug", current: slugify(b.title) },
      excerpt: b.excerpt,
      image: await uploadImage(b.img, b.title),
      tag: b.tag,
      publishedAt: new Date(b.date).toISOString(),
      author: COMPANY.name,
      body: [block(b.excerpt)],
    });
  }

  FAQS.forEach((f, i) =>
    add({ _id: `faq-${i}`, _type: "faq", q: f.q, a: f.a, order: i })
  );

  TESTIMONIALS.forEach((t, i) =>
    add({ _id: `testimonial-${t.seed || i}`, _type: "testimonial", name: t.name, role: t.role, quote: t.quote, seed: t.seed, order: i })
  );

  for (let i = 0; i < PORTFOLIO.length; i++) {
    const p = PORTFOLIO[i];
    add({
      _id: `portfolio-${slugify(p.title)}`,
      _type: "portfolioItem",
      title: p.title,
      cat: p.cat,
      image: p.img ? await uploadImage(p.img, p.title) : undefined,
      badge: p.badge,
      order: i,
    });
  }

  for (let i = 0; i < PARTNERS.length; i++) {
    const p = PARTNERS[i];
    add({
      _id: `partner-${slugify(p.name)}`,
      _type: "partner",
      name: p.name,
      sub: p.sub,
      color: p.color,
      logo: p.logo,
      order: i,
    });
  }
}

// ---------------- write ----------------

async function write() {
  const tx = client.transaction();
  for (const doc of docs) {
    // Strip undefined so Sanity doesn't reject the payload.
    const clean = JSON.parse(JSON.stringify(doc));
    if (FORCE) tx.createOrReplace(clean);
    else tx.createIfNotExists(clean);
  }
  await tx.commit();
}

try {
  await build();
  console.log(`\n\nWriting ${docs.length} documents (${FORCE ? "overwrite" : "create-if-missing"})...`);
  await write();
  console.log(`
Done. ${docs.length} documents written${uploaded ? `, ${uploaded} images uploaded` : ""}.

Open the Studio at http://localhost:3000/studio to start editing.
`);
} catch (err) {
  console.error("\nSeed failed:", err.message);
  if (err.message?.includes("Insufficient permissions")) {
    console.error("The token needs Editor permissions, not Viewer.");
  }
  process.exit(1);
}
