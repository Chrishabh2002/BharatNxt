"use client";

import { useEffect, useRef, useState } from "react";

// Logo resolution order:
//   1. /logo.png  (drop YOUR real logo here to override)
//   2. /logo.svg  (clean branded wordmark shipped with the project)
//   3. text wordmark fallback
// On dark backgrounds (footer) we render the text wordmark in light mode,
// since the colored logo art would not read well on dark.
export default function Logo({ height = 44, light = false }) {
  const ref = useRef(null);
  const [src, setSrc] = useState("/logo.png");
  const [failed, setFailed] = useState(false);

  // Catch the case where the image already errored before hydration (SSR).
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) handleError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  function handleError() {
    if (src === "/logo.png") setSrc("/logo.png");
    else setFailed(true);
  }

  if (light || failed) {
    return (
      <span
        className="wordmark"
        style={{ fontSize: height * 0.6, color: light ? "#fff" : undefined }}
      >
        <span className="wordmark__bharat">Bharat</span>
        <span className="wordmark__nxt" style={light ? { color: "#fff" } : undefined}>
          NXT
        </span>
        <span className="wordmark__wave">Wave</span>
      </span>
    );
  }

  return (
    <img
      ref={ref}
      src={src}
      alt="BharatNXT Wave"
      style={{ height, width: "auto", display: "block" }}
      onError={handleError}
    />
  );
}
