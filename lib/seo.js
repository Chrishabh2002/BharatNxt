import { imageUrl } from "@/sanity/lib/image";

// Turns the Studio's "Search engine listing" object into Next metadata.
// Anything an editor left blank simply falls back to the layout defaults.
export function metadataFrom(seo, fallback = {}) {
  const title = seo?.title || fallback.title;
  const description = seo?.description || fallback.description;
  const image = seo?.ogImage || fallback.image;

  const meta = {};
  if (title) meta.title = title;
  if (description) meta.description = description;

  const ogImages = image ? [{ url: imageUrl(image, 1200, 630) }] : undefined;
  meta.openGraph = {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(ogImages ? { images: ogImages } : {}),
    type: fallback.type || "website",
  };

  return meta;
}
