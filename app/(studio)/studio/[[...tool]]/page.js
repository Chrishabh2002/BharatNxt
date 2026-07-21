import { isSanityConfigured } from "@/sanity/env";
import Studio from "./Studio";

export const dynamic = "force-static";

export default function StudioPage() {
  if (!isSanityConfigured) return <StudioNotConfigured />;
  return <Studio />;
}

// Shown instead of a stack trace when the environment variables are missing —
// which is exactly the moment someone needs the setup steps.
function StudioNotConfigured() {
  return (
    <main style={s.wrap}>
      <div style={s.card}>
        <h1 style={s.h1}>Content Studio isn&apos;t connected yet</h1>
        <p style={s.p}>
          The site is running on its built-in content, so nothing is broken. To switch editing on,
          create a Sanity project and add its ID to your environment variables.
        </p>
        <ol style={s.ol}>
          <li>
            Run <code style={s.code}>npx sanity login</code>, then{" "}
            <code style={s.code}>npx sanity init --env</code> in the project folder.
          </li>
          <li>
            That writes <code style={s.code}>NEXT_PUBLIC_SANITY_PROJECT_ID</code> into{" "}
            <code style={s.code}>.env.local</code>.
          </li>
          <li>
            Run <code style={s.code}>npm run seed</code> to copy the current site content into the
            CMS.
          </li>
          <li>Add the same variables in Netlify → Site configuration → Environment variables.</li>
        </ol>
        <p style={s.foot}>
          Step-by-step walkthrough: <code style={s.code}>CMS-GUIDE.md</code>
        </p>
      </div>
    </main>
  );
}

const s = {
  wrap: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: 24,
    background: "#0c1733",
    fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
  },
  card: {
    maxWidth: 580,
    background: "#fff",
    borderRadius: 16,
    padding: "36px 34px",
    boxShadow: "0 30px 80px rgba(0,0,0,.35)",
  },
  h1: { margin: "0 0 12px", fontSize: 24, color: "#1b2440" },
  p: { margin: "0 0 18px", color: "#6b7488", lineHeight: 1.65 },
  ol: { margin: 0, paddingLeft: 20, color: "#1b2440", lineHeight: 2 },
  foot: { marginTop: 22, marginBottom: 0, color: "#6b7488", fontSize: 14 },
  code: {
    background: "#f5f8ff",
    border: "1px solid #e7ecf5",
    borderRadius: 5,
    padding: "2px 6px",
    fontSize: 13,
  },
};
