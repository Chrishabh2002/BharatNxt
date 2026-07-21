"use client";

import { useEffect, useState } from "react";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[i];

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
              <img src={`https://i.pravatar.cc/120?u=${t.seed}`} alt={t.name} />
              <div style={{ textAlign: "left" }}>
                <b>{t.name}</b>
                <small>{t.role}</small>
              </div>
            </div>
          </div>
          <div className="tst__dots">
            {TESTIMONIALS.map((_, d) => (
              <button
                key={d}
                aria-label={`Testimonial ${d + 1}`}
                className={`tst__dot ${d === i ? "tst__dot--active" : ""}`}
                onClick={() => setI(d)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
