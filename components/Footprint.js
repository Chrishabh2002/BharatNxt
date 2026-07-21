"use client";

import { useEffect, useRef, useState } from "react";
import { FOOTPRINT } from "@/lib/data";

// scattered glowing dots + links — evokes the original's India network map
const DOTS = [
  [120, 60], [180, 90], [150, 130], [210, 140], [110, 160], [170, 190],
  [230, 200], [140, 220], [200, 250], [120, 270], [180, 290], [240, 270],
  [160, 320], [210, 340], [130, 350], [190, 380],
];
const LINKS = [
  [0, 1], [1, 3], [0, 2], [2, 4], [2, 5], [3, 6], [5, 7], [5, 8],
  [7, 9], [8, 10], [8, 11], [10, 12], [12, 13], [12, 14], [13, 15],
];

function Ring({ pct, label }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) { setShown(true); o.disconnect(); }
    }, { threshold: 0.5 });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  const R = 42, C = 2 * Math.PI * R;
  return (
    <div className="ring" ref={ref}>
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={R} fill="#fff" stroke="#e7ecf5" strokeWidth="9" />
        <circle
          cx="55" cy="55" r={R} fill="none" stroke="#ff4c0d" strokeWidth="9" strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={shown ? C - (C * pct) / 100 : C}
          transform="rotate(-90 55 55)" style={{ transition: "stroke-dashoffset 1.3s ease" }}
        />
        <text x="55" y="61" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1b2440">
          {pct}%
        </text>
      </svg>
      <div className="ring__lbl">{label}</div>
    </div>
  );
}

export default function Footprint() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) { setShown(true); o.disconnect(); }
    }, { threshold: 0.3 });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <section className="section section--navy fp">
      <div className="container">
        <div className="fp__top">
          <div ref={ref}>
            <span className="eyebrow eyebrow--c">{FOOTPRINT.eyebrow}</span>
            <h2 className="h-title" style={{ color: "#fff" }}>{FOOTPRINT.title}</h2>
            <div className="fp__bars">
              {FOOTPRINT.states.map((s, i) => (
                <div className="fp__bar" key={s.name}>
                  <div className="fp__bar-head">
                    <span className="fp__bar-name">{s.name}</span>
                    <b
                      className="fp__bar-pct"
                      style={{ left: shown ? `${s.pct}%` : "0%", transitionDelay: `${i * 120}ms` }}
                    >
                      {s.pct}%
                    </b>
                  </div>
                  <div className="fp__bar-track">
                    <span
                      className="fp__bar-fill"
                      style={{ width: shown ? `${s.pct}%` : 0, transitionDelay: `${i * 120}ms` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="fp__map">
            {/* Drop your map at /public/india-network.png — it auto-overrides.
                Falls back to the built-in SVG until then. */}
            <img
              src="/india-network.png"
              alt="BharatNXT Wave pan-India network"
              loading="lazy"
              onError={(e) => {
                if (e.currentTarget.dataset.fb) return;
                e.currentTarget.dataset.fb = "1";
                e.currentTarget.src = "/india-map.svg";
              }}
            />
          </div>
        </div>

        <div className="fp__rings">
          {FOOTPRINT.sectors.map((s) => (
            <Ring key={s.name} pct={s.pct} label={s.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
