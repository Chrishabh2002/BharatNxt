import { getServiceSlugs, getPostSlugs } from "@/lib/content";

// Set NEXT_PUBLIC_SITE_URL in Netlify so the sitemap emits absolute URLs.
const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://bharatnxtwave.com").replace(/\/$/, "");

export default async function sitemap() {
  const [serviceSlugs, postSlugs] = await Promise.all([getServiceSlugs(), getPostSlugs()]);

  const staticPages = ["", "/about-us", "/services", "/blog", "/faqs", "/contact"].map((p) => ({
    url: `${base}${p}`,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.8,
  }));

  return [
    ...staticPages,
    ...serviceSlugs.map((slug) => ({
      url: `${base}/services/${slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    ...postSlugs.map((slug) => ({
      url: `${base}/blog/${slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  ];
}
