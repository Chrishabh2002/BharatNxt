// Sanity connection settings.
//
// The site is designed to run WITHOUT Sanity configured — every content getter
// in lib/content.js falls back to the hand-written defaults in lib/data.js.
// Fill these in (see .env.example) and the CMS quietly takes over.

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-01";

// A project id is the one thing we cannot invent a default for.
export const isSanityConfigured = Boolean(projectId);
