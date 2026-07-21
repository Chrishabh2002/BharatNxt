"use client";

import { useState } from "react";
import { imageUrl } from "@/sanity/lib/image";
import { Icon } from "./Icons";

export default function CoreValues({ values }) {
  const tabs = values.tabs || [];
  const [active, setActive] = useState(0);
  const panel = tabs[active];

  if (!panel) return null;

  return (
    <section id="values">
      {/* dark header band with tabs */}
      <div className="cv__head">
        <div className="container center">
          <span className="eyebrow eyebrow--c">{values.eyebrow}</span>
          <h2 className="h-title" style={{ color: "#fff" }}>
            {values.title}
          </h2>
          <div className="cv__tabs">
            {tabs.map((t, i) => (
              <button
                key={t.key || t.tab}
                className={`cv__tab ${i === active ? "cv__tab--active" : ""}`}
                onClick={() => setActive(i)}
              >
                {t.tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* white panel: image + content */}
      <div className="cv__body">
        <div className="container cv__grid">
          <div className="cv__img">
            <img src={imageUrl(values.image, 620, 560)} alt={values.title} />
          </div>
          <div>
            <h3 className="cv__h">{panel.tab}</h3>
            <p className="cv__lead">{panel.lead}</p>
            {(panel.points || []).map((p) => (
              <div className="cv__point" key={p.title}>
                <span className="cv__check"><Icon name="check" size={18} /></span>
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
            <a className="btn btn--primary" href="#contact" style={{ marginTop: 18 }}>
              Consult Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
