const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://bharatnxtwave.com").replace(/\/$/, "");

export default function robots() {
  return {
    rules: [
      // /studio is the editing interface — useful to staff, worthless in search.
      { userAgent: "*", allow: "/", disallow: ["/studio", "/api/"] },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
