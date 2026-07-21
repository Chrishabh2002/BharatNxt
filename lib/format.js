// Blog dates arrive either as an ISO timestamp (from the CMS) or as an
// already-formatted string like "Jun 18, 2026" (the built-in defaults).
// Anything unparseable is passed through rather than rendered as "Invalid Date".
export function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
