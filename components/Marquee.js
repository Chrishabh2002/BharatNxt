"use client";

import { useEffect, useRef, useState } from "react";
import { imageUrl } from "@/sanity/lib/image";

const EXTS = ["png", "svg", "webp", "jpg", "jpeg"];

// Tries an uploaded logo -> your dropped file -> official logo URL -> wordmark.
// Never blank.
function PartnerLogo({ p }) {
  const [okSrc, setOkSrc] = useState(null);
  useEffect(() => {
    const cands = [];
    // A logo uploaded in the Studio is authoritative — try it first.
    if (p.logo && typeof p.logo === "object") cands.push(imageUrl(p.logo, 260, 130));
    if (p.base) EXTS.forEach((e) => cands.push(`${p.base}.${e}`));
    if (p.logo && typeof p.logo === "string") cands.push(p.logo);
    if (!cands.length) return;
    let alive = true;
    let i = 0;
    const tryNext = () => {
      if (!alive || i >= cands.length) return;
      const url = cands[i++];
      const probe = new window.Image();
      probe.onload = () => { if (alive) setOkSrc(url); };
      probe.onerror = () => { if (alive) tryNext(); };
      probe.src = url;
    };
    tryNext();
    return () => { alive = false; };
  }, [p.base, p.logo]);

  return (
    <span className="partner__inner">
      {okSrc ? (
        <img className="partner__img" src={okSrc} alt={p.name} draggable="false" />
      ) : (
        <span className="partner__wm">
          <span className="partner__name" style={{ color: p.color }}>{p.name}</span>
          {p.sub && <span className="partner__sub">{p.sub}</span>}
        </span>
      )}
    </span>
  );
}

const R = 60; // bubble radius

export default function Marquee({ partners = [] }) {
  const ITEMS = partners; // one bubble per partner
  const fieldRef = useRef(null);
  const elRefs = useRef([]);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = field.clientWidth;
    let H = field.clientHeight;
    const n = ITEMS.length;

    const b = ITEMS.map(() => ({
      x: R + Math.random() * Math.max(1, W - 2 * R),
      y: R + Math.random() * Math.max(1, H - 2 * R),
      vx: (Math.random() * 2 - 1) * 0.7 || 0.5,
      vy: (Math.random() * 2 - 1) * 0.7 || 0.5,
    }));

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e) => {
      const r = field.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onResize = () => { W = field.clientWidth; H = field.clientHeight; };
    field.addEventListener("mousemove", onMove);
    field.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    const render = () => {
      for (let i = 0; i < n; i++) {
        const el = elRefs.current[i];
        if (el) el.style.transform = `translate(${b[i].x - R}px, ${b[i].y - R}px)`;
      }
    };

    if (reduce) {
      render();
      return () => {
        field.removeEventListener("mousemove", onMove);
        field.removeEventListener("mouseleave", onLeave);
        window.removeEventListener("resize", onResize);
      };
    }

    let raf;
    const MAXV = 2.4, MINV = 0.3;
    const step = () => {
      for (let i = 0; i < n; i++) {
        const p = b[i];
        const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
        const md = Math.hypot(mdx, mdy);
        const reach = R + 90;
        if (md < reach && md > 0.001) {
          const f = ((reach - md) / reach) * 0.9;
          p.vx += (mdx / md) * f;
          p.vy += (mdy / md) * f;
        }
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.992; p.vy *= 0.992;
        const sp = Math.hypot(p.vx, p.vy);
        if (sp > MAXV) { p.vx = p.vx / sp * MAXV; p.vy = p.vy / sp * MAXV; }
        else if (sp < MINV) {
          const a = Math.atan2(p.vy || 0.5, p.vx || 0.5);
          p.vx = Math.cos(a) * MINV; p.vy = Math.sin(a) * MINV;
        }
        if (p.x < R) { p.x = R; p.vx = Math.abs(p.vx); }
        if (p.x > W - R) { p.x = W - R; p.vx = -Math.abs(p.vx); }
        if (p.y < R) { p.y = R; p.vy = Math.abs(p.vy); }
        if (p.y > H - R) { p.y = H - R; p.vy = -Math.abs(p.vy); }
      }
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const a = b[i], c = b[j];
          const dx = c.x - a.x, dy = c.y - a.y;
          const dist = Math.hypot(dx, dy);
          const min = R * 2;
          if (dist > 0.001 && dist < min) {
            const nx = dx / dist, ny = dy / dist;
            const overlap = (min - dist) / 2;
            a.x -= nx * overlap; a.y -= ny * overlap;
            c.x += nx * overlap; c.y += ny * overlap;
            const va = a.vx * nx + a.vy * ny;
            const vc = c.vx * nx + c.vy * ny;
            const diff = vc - va;
            a.vx += diff * nx; a.vy += diff * ny;
            c.vx -= diff * nx; c.vy -= diff * ny;
          }
        }
      }
      render();
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      field.removeEventListener("mousemove", onMove);
      field.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
    // Re-seed the simulation when the number of partners changes — the bubble
    // positions array is sized once, so a stale count would drop or orphan one.
  }, [ITEMS]);

  return (
    <section className="section partners">
      <div className="container">
        <div className="center" style={{ marginBottom: 22 }}>
          <span className="eyebrow eyebrow--c">Our Partners</span>
          <h2 className="h-title">
            Trusted by <span className="accent">Leading Brands</span>
          </h2>
        </div>
        <div className="bubble-field" ref={fieldRef}>
          {ITEMS.map((p, i) => (
            <div className="bubble bubble--phys" key={p.name} ref={(el) => (elRefs.current[i] = el)}>
              <PartnerLogo p={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
