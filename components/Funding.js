"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icons";

function WaveWord({ word }) {
  return (
    <span className="rotate-word" key={word}>
      {word.split("").map((ch, i) => (
        <span className="ltr" key={i} style={{ animationDelay: `${i * 40}ms` }}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

export default function Funding({ funding }) {
  const rotate = funding.rotate || [];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (rotate.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % rotate.length), 2200);
    return () => clearInterval(t);
  }, [rotate.length]);

  return (
    <section className="section section--tint" id="funding">
      <div className="container">
        <div className="center">
          <h2 className="h-title">
            <span className="accent-o">{funding.title}</span>{" "}
            {rotate.length > 0 && (
              <span className="rotate-wrap">
                <WaveWord word={rotate[idx % rotate.length]} />
              </span>
            )}
          </h2>
          <p className="lead">{funding.sub}</p>
        </div>

        <div className="fund__grid" style={{ marginTop: 40 }}>
          {(funding.schemes || []).map((f, i) => (
            <div className="fund" key={f.title + i}>
              <div className="fund__icon">
                <Icon name={f.icon} size={28} />
              </div>
              <div className="fund__amt">{f.amount}</div>
              <h4>{f.title}</h4>
              <p>{f.note}</p>
              <a className="fund__btn" href="#contact">
                <Icon name="arrow" size={15} /> Apply Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
