"use client";

import { useEffect, useState } from "react";
import { imageUrl } from "@/sanity/lib/image";

// No photo uploaded? Draw a consistent generated avatar from the seed instead
// of leaving a broken image where a client's face should be.
const avatarFor = (t) =>
  t.avatar ? imageUrl(t.avatar, 120, 120) : `https://i.pravatar.cc/120?u=${t.seed || t.name}`;

export default function Testimonials({ items = [] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [items.length]);

  const t = items[i % items.length];
  if (!t) return null;

  return (
    <section className="section">
      <div className="container">
        <div className="center" style={{ marginBottom: 36 }}>
          <span className="eyebrow">Testimonials</span>
          <h2 className="h-title">
            What People <span className="accent">Say About Us</span>
          </h2>
        </div>

        <div className="tst">
          <div className="tst__card">
            <div className="tst__mark">&ldquo;</div>
            <p className="tst__quote">{t.quote}</p>
            <div className="tst__person">
              <img src={avatarFor(t)} alt={t.name} />
              <div style={{ textAlign: "left" }}>
                <b>{t.name}</b>
                <small>{t.role}</small>
              </div>
            </div>
          </div>
          {items.length > 1 && (
            <div className="tst__dots">
              {items.map((_, d) => (
                <button
                  key={d}
                  aria-label={`Testimonial ${d + 1}`}
                  className={`tst__dot ${d === i ? "tst__dot--active" : ""}`}
                  onClick={() => setI(d)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
