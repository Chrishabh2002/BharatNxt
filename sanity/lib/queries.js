import { groq } from "next-sanity";

const IMAGE = `{ ..., "alt": alt }`;
const SEO = `seo { title, description, ogImage ${IMAGE} }`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  name, legalName, tagline, welcome,
  phone, phoneHref, whatsapp, email, hours,
  footerTagline,
  quickLinks[]{ label, href },
  footerOffices[]{ city, addr },
  disclaimer
}`;

export const navigationQuery = groq`*[_type == "navigation"][0]{
  links[]{ label, href, children[]{ label, href } }
}`;

export const homePageQuery = groq`*[_type == "homePage"][0]{
  heroMarquee, heroEyebrow, heroSub, heroImages[] ${IMAGE},
  servicesEyebrow, servicesTitle,
  serviceHighlights[]{ title, desc, icon },
  fundingEyebrow, fundingTitle, fundingRotate, fundingSub,
  fundingSchemes[]{ amount, title, note, icon },
  valuesEyebrow, valuesTitle, valuesImage ${IMAGE},
  valuesTabs[]{ tab, lead, points[]{ title, desc } },
  footprintEyebrow, footprintTitle,
  footprintStates[]{ name, pct },
  footprintSectors[]{ name, pct },
  portfolioEyebrow, portfolioText, portfolioCategories,
  stats[]{ value, suffix, label, sub, icon },
  ${SEO}
}`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{ heading, intro, body, ${SEO} }`;

export const contactPageQuery = groq`*[_type == "contactPage"][0]{
  heading, intro,
  headOffice{ title, label, addr },
  branches[]{ city, addr },
  mapEmbedUrl,
  ${SEO}
}`;

// Services, grouped for the mega-menu. Empty categories are filtered out in
// lib/content.js rather than here — a post-projection filter is easy to get
// subtly wrong in GROQ, and a wrong query fails silently into the fallback.
export const serviceMenuQuery = groq`*[_type == "serviceGroup"] | order(order asc, title asc){
  "group": title,
  icon,
  "items": *[_type == "service" && group._ref == ^._id] | order(order asc, title asc){
    title, "slug": slug.current
  }
}`;

export const allServicesQuery = groq`*[_type == "service"] | order(order asc, title asc){
  title, "slug": slug.current, icon, image ${IMAGE}, desc,
  "group": group->title
}`;

export const serviceSlugsQuery = groq`*[_type == "service" && defined(slug.current)].slug.current`;

export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0]{
  title, "slug": slug.current, icon, image ${IMAGE}, desc, intro, points, body,
  "group": group->title,
  "related": *[_type == "service" && group._ref == ^.group._ref && slug.current != $slug]
    | order(order asc, title asc)[0...6]{ title, "slug": slug.current, icon, desc, image ${IMAGE} },
  ${SEO}
}`;

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
  title, "slug": slug.current, excerpt, image ${IMAGE}, tag, publishedAt, author
}`;

export const postSlugsQuery = groq`*[_type == "post" && defined(slug.current)].slug.current`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  title, "slug": slug.current, excerpt, image ${IMAGE}, tag, publishedAt, author, body,
  "related": *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3]{
    title, "slug": slug.current, excerpt, image ${IMAGE}, tag, publishedAt
  },
  ${SEO}
}`;

export const faqsQuery = groq`*[_type == "faq"] | order(order asc, _createdAt asc){ q, a }`;

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc, _createdAt asc){
  name, role, quote, seed, avatar ${IMAGE}
}`;

export const portfolioQuery = groq`*[_type == "portfolioItem"] | order(order asc, _createdAt asc){
  title, cat, image ${IMAGE}, badge{ big, small, bg, fg }
}`;

export const partnersQuery = groq`*[_type == "partner"] | order(order asc, _createdAt asc){
  name, sub, color, logo, logoImage ${IMAGE}
}`;
