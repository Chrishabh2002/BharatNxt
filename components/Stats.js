"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/data";
import { Icon } from "./Icons";

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          obs.disconnect();
          const dur = 1400;
          const start = performance.now();
          const tick = (t) => {
            const p = Math.min((t - start) / dur, 1);
            setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);
  return (
    <span className="stat__num" ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="section stats-wrap">
      <div className="container">
        <div className="stats-box">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat__ic">
                <Icon name={s.icon} size={30} />
              </div>
              <Counter value={s.value} suffix={s.suffix} />
              <div className="stat__lbl">
                {s.label}
                {s.sub ? <span>{s.sub}</span> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
