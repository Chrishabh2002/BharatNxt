// ============================================================
// The single source of content for every page.
//
// Each getter asks Sanity first and falls back to the hand-written defaults in
// lib/data.js / lib/services.js. That means three things stay true at once:
//   - the site renders correctly before anyone sets up the CMS,
//   - a Sanity outage degrades to last-known-good content instead of a 500,
//   - components keep the exact prop shapes they already had.
//
// Empty arrays from Sanity are treated as "not filled in yet" and fall back —
// a half-seeded dataset should never blank out a whole section of the site.
// ============================================================

import { sanityFetch } from "@/sanity/lib/client";
import * as Q from "@/sanity/lib/queries";
import {
  COMPANY,
  FOOTER,
  OFFICES,
  NAV_LINKS,
  HERO,
  HERO_IMAGES,
  IMAGES,
  SERVICES_INTRO,
  SERVICES,
  FUNDING_INTRO,
  FUNDING,
  CORE_VALUES,
  FOOTPRINT,
  PORTFOLIO_INTRO,
  PORTFOLIO_CATS,
  PORTFOLIO,
  STATS,
  TESTIMONIALS,
  ABOUT_TEXT,
  PARTNERS,
  FAQS,
  BLOG_POSTS,
} from "@/lib/data";
import {
  SERVICE_MENU,
  SERVICE_PAGES,
  ALL_SERVICE_SLUGS,
  relatedServices,
  slugify,
} from "@/lib/services";

const has = (v) => (Array.isArray(v) ? v.length > 0 : v !== null && v !== undefined && v !== "");

// Prefer the CMS value, but only when there is actually something there.
const pick = (cms, fallback) => (has(cms) ? cms : fallback);

export async function getSettings() {
  const d = await sanityFetch(Q.siteSettingsQuery);
  return {
    name: pick(d?.name, COMPANY.name),
    legalName: pick(d?.legalName, COMPANY.legalName),
    tagline: pick(d?.tagline, COMPANY.tagline),
    welcome: pick(d?.welcome, COMPANY.welcome),
    phone: pick(d?.phone, COMPANY.phone),
    phoneHref: pick(d?.phoneHref, COMPANY.phoneHref),
    whatsapp: pick(d?.whatsapp, COMPANY.whatsapp),
    email: pick(d?.email, COMPANY.email),
    hours: pick(d?.hours, COMPANY.hours),
    // One list, consumed by the footer, the contact block and the contact page.
    offices: pick(d?.offices, OFFICES),
    footer: {
      tagline: pick(d?.footerTagline, FOOTER.tagline),
      quickLinks: pick(d?.quickLinks, FOOTER.quickLinks),
      disclaimer: pick(d?.disclaimer, FOOTER.disclaimer),
    },
  };
}

// The contact block wants a headline office and a list of the rest. Derive it
// rather than storing it twice — that duplication is what let the contact block
// go stale while the footer was right.
export function splitOffices(offices = []) {
  const head = offices.find((o) => o.isHead) || offices[0] || null;
  return { head, branches: offices.filter((o) => o !== head) };
}

export async function getNav() {
  const d = await sanityFetch(Q.navigationQuery);
  return pick(d?.links, NAV_LINKS);
}

export async function getHome() {
  const d = await sanityFetch(Q.homePageQuery);
  return {
    hero: {
      marquee: pick(d?.heroMarquee, HERO.marquee),
      eyebrow: pick(d?.heroEyebrow, HERO.eyebrow),
      sub: pick(d?.heroSub, HERO.sub),
      images: pick(d?.heroImages, HERO_IMAGES),
    },
    servicesIntro: {
      eyebrow: pick(d?.servicesEyebrow, SERVICES_INTRO.eyebrow),
      title: pick(d?.servicesTitle, SERVICES_INTRO.title),
    },
    serviceHighlights: pick(d?.serviceHighlights, SERVICES),
    funding: {
      eyebrow: pick(d?.fundingEyebrow, FUNDING_INTRO.eyebrow),
      title: pick(d?.fundingTitle, FUNDING_INTRO.title),
      rotate: pick(d?.fundingRotate, FUNDING_INTRO.rotate),
      sub: pick(d?.fundingSub, FUNDING_INTRO.sub),
      schemes: pick(d?.fundingSchemes, FUNDING),
    },
    values: {
      eyebrow: pick(d?.valuesEyebrow, CORE_VALUES.eyebrow),
      title: pick(d?.valuesTitle, CORE_VALUES.title),
      image: pick(d?.valuesImage, IMAGES.coreValues),
      tabs: pick(d?.valuesTabs, CORE_VALUES.tabs),
    },
    footprint: {
      eyebrow: pick(d?.footprintEyebrow, FOOTPRINT.eyebrow),
      title: pick(d?.footprintTitle, FOOTPRINT.title),
      states: pick(d?.footprintStates, FOOTPRINT.states),
      sectors: pick(d?.footprintSectors, FOOTPRINT.sectors),
    },
    portfolioIntro: {
      eyebrow: pick(d?.portfolioEyebrow, PORTFOLIO_INTRO.eyebrow),
      text: pick(d?.portfolioText, PORTFOLIO_INTRO.text),
    },
    portfolioCategories: pick(d?.portfolioCategories, PORTFOLIO_CATS),
    stats: pick(d?.stats, STATS),
    seo: d?.seo || null,
  };
}

export async function getAbout() {
  const d = await sanityFetch(Q.aboutPageQuery);
  return {
    heading: pick(d?.heading, "About Us"),
    intro: pick(d?.intro, ABOUT_TEXT),
    body: d?.body || null,
    seo: d?.seo || null,
  };
}

export async function getContact() {
  const d = await sanityFetch(Q.contactPageQuery);
  return {
    heading: pick(d?.heading, "Contact Us"),
    intro: pick(d?.intro, ""),
    seo: d?.seo || null,
  };
}

// ---------------- services ----------------

export async function getServiceMenu() {
  const d = await sanityFetch(Q.serviceMenuQuery);
  // A category with nothing in it would render an empty dropdown column.
  const groups = Array.isArray(d) ? d.filter((g) => g.items?.length > 0) : null;
  return pick(groups, SERVICE_MENU);
}

export async function getAllServices() {
  const d = await sanityFetch(Q.allServicesQuery);
  if (has(d)) return d;
  return ALL_SERVICE_SLUGS.map((slug) => ({ slug, ...SERVICE_PAGES[slug] }));
}

export async function getServiceSlugs() {
  const d = await sanityFetch(Q.serviceSlugsQuery);
  return pick(d, ALL_SERVICE_SLUGS);
}

export async function getService(slug) {
  const d = await sanityFetch(Q.serviceBySlugQuery, { slug });
  if (d) return d;
  const page = SERVICE_PAGES[slug];
  if (!page) return null;
  return { slug, ...page, body: null, related: relatedServices(slug), seo: null };
}

// ---------------- blog ----------------

// The built-in posts predate the CMS and have no slugs of their own, so derive
// one from the title. Same rule the seed script uses, so links stay stable
// after the content is imported.
const fallbackPosts = () => BLOG_POSTS.map((p) => ({ ...p, slug: slugify(p.title), body: null }));

export async function getPosts() {
  const d = await sanityFetch(Q.postsQuery);
  return pick(d, fallbackPosts());
}

export async function getPostSlugs() {
  const d = await sanityFetch(Q.postSlugsQuery);
  return pick(d, fallbackPosts().map((p) => p.slug));
}

export async function getPost(slug) {
  const d = await sanityFetch(Q.postBySlugQuery, { slug });
  if (d) return d;
  const posts = fallbackPosts();
  const found = posts.find((p) => p.slug === slug);
  if (!found) return null;
  return { ...found, related: posts.filter((p) => p.slug !== slug).slice(0, 3), seo: null };
}

// ---------------- small collections ----------------

export async function getFaqs() {
  return pick(await sanityFetch(Q.faqsQuery), FAQS);
}

export async function getTestimonials() {
  return pick(await sanityFetch(Q.testimonialsQuery), TESTIMONIALS);
}

export async function getPortfolio() {
  return pick(await sanityFetch(Q.portfolioQuery), PORTFOLIO);
}

export async function getPartners() {
  const d = await sanityFetch(Q.partnersQuery);
  if (!has(d)) return PARTNERS;
  // An uploaded logo wins over a pasted URL; components only read `logo`.
  return d.map((p) => ({ ...p, logo: p.logoImage || p.logo }));
}
