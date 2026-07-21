"use client";

import { useEffect, useRef, useState } from "react";

// Wrap any section to fade + slide it in when it scrolls into view.
// `from` picks the direction ("up" | "left" | "right" | "scale"); `delay`
// staggers siblings so a row of cards arrives as one gesture.
export default function Reveal({
  children,
  delay = 0,
  from = "up",
  as: Tag = "div",
  className = "",
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Anything already on screen at mount should not animate in — that reads
    // as a glitch on a fast connection rather than as an entrance.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      setShown(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const dir = from === "up" ? "" : `reveal--${from}`;

  return (
    <Tag
      ref={ref}
      className={`reveal ${dir} ${shown ? "reveal--in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
