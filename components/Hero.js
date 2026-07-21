"use client";

import { useEffect, useState } from "react";
import { imageUrl } from "@/sanity/lib/image";
import { Icon } from "./Icons";

export default function Hero({ hero }) {
  const images = hero.images || [];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const t = setInterval(() => setActive((a) => (a + 1) % images.length), 5000);
    return () => clearInterval(t);
  }, [images.length]);

  // one wide set (phrases repeated) + a duplicate for a seamless loop
  const oneSet = [...hero.marquee, ...hero.marquee, ...hero.marquee];
  const banner = [...oneSet, ...oneSet];

  return (
    <section className="hero" id="home">
      {/* advanced animated marquee banner */}
      <div className="hero__banner">
        <div className="hero__banner-track">
          {banner.map((t, i) => (
            <span className="hero__banner-item" key={i}>
              <Icon name="rocket" size={14} />
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="hero__stage">
        <div className="hero__bg">
          {images.map((img, i) => (
            <div
              key={i}
              className={`hero__slide ${i === active ? "hero__slide--active" : ""}`}
              aria-hidden={i !== active}
            >
              <img src={imageUrl(img, 1600, 900)} alt="" loading={i === 0 ? "eager" : "lazy"} />
            </div>
          ))}
          <span className="hero__shade" />
        </div>

        <div className="container hero__overlay">
          <span className="hero__eyebrow">{hero.eyebrow}</span>
          <h1 className="hero__headline">
            <span className="o">Legal</span> से <span className="o">Finance</span> तक,
            <br />
            सबका <span className="o">Solution</span> एक साथ!
          </h1>
          <p className="hero__sub">{hero.sub}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#contact">
              Download Brochure <Icon name="arrow" size={16} />
            </a>
            <a className="btn btn--white" href="#contact">
              Consult Now
            </a>
          </div>
        </div>

        {images.length > 1 && (
          <div className="hero__dots" role="tablist" aria-label="Hero slides">
            {images.map((_, i) => (
              <button
                key={i}
                className={`hero__dot ${i === active ? "hero__dot--active" : ""}`}
                onClick={() => setActive(i)}
                aria-label={`Slide ${i + 1}`}
                aria-selected={i === active}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
