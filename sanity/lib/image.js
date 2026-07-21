import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId, isSanityConfigured } from "../env";

const builder = isSanityConfigured ? imageUrlBuilder({ projectId, dataset }) : null;

// Images arrive in two shapes and both must keep working:
//   - a Sanity image object (once an editor uploads one in the Studio)
//   - an Unsplash photo id string (the original hand-picked defaults)
// Callers should never have to care which one they got.
export function imageUrl(source, w = 600, h = 400) {
  if (!source) return "";

  if (typeof source === "string") {
    // Already a full URL (a partner logo, say) — pass through untouched.
    if (source.startsWith("http") || source.startsWith("/")) return source;
    return `https://images.unsplash.com/${source}?auto=format&fit=crop&w=${w}&h=${h}&q=75`;
  }

  if (!builder) return "";
  return builder.image(source).width(w).height(h).fit("crop").auto("format").quality(75).url();
}

export function imageAlt(source, fallback = "") {
  if (source && typeof source === "object" && source.alt) return source.alt;
  return fallback;
}
