import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, isSanityConfigured } from "../env";

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;

// How long a page may serve cached CMS content before Next revalidates it.
// One minute keeps "Publish" feeling instant without hammering the API.
export const REVALIDATE = 60;

// The single entry point every content getter uses. Never throws: a missing
// project id, a network blip or a bad query all resolve to `fallback`, so the
// site keeps rendering the last-known-good content instead of 500ing.
export async function sanityFetch(query, params = {}, fallback = null) {
  if (!client) return fallback;
  try {
    const data = await client.fetch(query, params, {
      next: { revalidate: REVALIDATE },
    });
    return data ?? fallback;
  } catch (err) {
    console.error("[sanity] fetch failed, using fallback content:", err.message);
    return fallback;
  }
}
