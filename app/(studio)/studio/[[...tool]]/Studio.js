"use client";

// The Studio is a browser application. Keeping this "use client" boundary here
// means sanity.config.js — and the whole `sanity` package behind it — never
// enters the server component graph, where its `swr` dependency resolves to a
// react-server build that has no default export and fails the build.

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export default function Studio() {
  return <NextStudio config={config} />;
}
