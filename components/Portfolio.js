"use client";

import { useState } from "react";
import { PORTFOLIO, PORTFOLIO_CATS, PORTFOLIO_INTRO, PORTFOLIO_INITIAL, IMG } from "@/lib/data";
import { Icon } from "./Icons";

export default function Portfolio() {
  const [cat, setCat] = useState("All");
  const [limit, setLimit] = useState(PORTFOLIO_INITIAL);
  const [lightbox, setLightbox] = useState(null); // {src, title}

  const filtered = cat === "All" ? PORTFOLIO : PORTFOLIO.filter((p) => p.cat === cat);
  const items = filtered.slice(0, limit);
  const hasMore = filtered.length > limit;

  function onFilter(c) {
    setCat(c);
    setLimit(PORTFOLIO_INITIAL);
  }

  return (
    <section className="section section--tint" id="portfolio">
      <div className="container">
        <div className="center">
          <span className="eyebrow eyebrow--c">{PORTFOLIO_INTRO.eyebrow}</span>
          <h2 className="h-title">
            Projects We're <span className="accent">Proud Of</span>
          </h2>
          <p className="lead">{PORTFOLIO_INTRO.text}</p>
        </div>

        <div className="pf__filter">
          {PORTFOLIO_CATS.map((c) => (
            <button key={c} className={`pf__btn ${cat === c ? "pf__btn--active" : ""}`} onClick={() => onFilter(c)}>
              {c}
            </button>
          ))}
        </div>

        <div className="pf__grid">
          {items.map((p) =>
            p.badge ? (
              <div className="pf__item pf__badge" key={p.title} style={{ background: p.badge.bg, color: p.badge.fg }}>
                <span className="pf__badge-big">{p.badge.big}</span>
                <span className="pf__badge-small">{p.badge.small}</span>
                <span className="pf__badge-title">{p.title}</span>
              </div>
            ) : (
              <div className="pf__item" key={p.title}>
                <img src={IMG(p.img, 520, 400)} alt={p.title} loading="lazy" />
                <div className="pf__overlay">
                  <button
                    className="pf__plus"
                    aria-label={`View ${p.title}`}
                    onClick={() => setLightbox({ src: IMG(p.img, 1100, 800), title: p.title })}
                  >
                    +
                  </button>
                  <h4>{p.title}</h4>
                  <span>{p.cat}</span>
                </div>
              </div>
            )
          )}
        </div>

        {hasMore && (
          <div className="center" style={{ marginTop: 36 }}>
            <button className="btn btn--primary" onClick={() => setLimit((l) => l + 6)}>
              Load More <Icon name="arrow" size={16} />
            </button>
          </div>
        )}
      </div>

      {/* lightbox */}
      {lightbox && (
        <div className="lb" onClick={() => setLightbox(null)}>
          <button className="lb__close" aria-label="Close" onClick={() => setLightbox(null)}>
            ×
          </button>
          <figure className="lb__fig" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.title} />
            <figcaption>{lightbox.title}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
