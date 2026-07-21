"use client";

import { useState } from "react";
import { CORE_VALUES, IMG, IMAGES } from "@/lib/data";
import { Icon } from "./Icons";

export default function CoreValues() {
  const [active, setActive] = useState(0);
  const panel = CORE_VALUES.tabs[active];

  return (
    <section id="values">
      {/* dark header band with tabs */}
      <div className="cv__head">
        <div className="container center">
          <span className="eyebrow eyebrow--c">{CORE_VALUES.eyebrow}</span>
          <h2 className="h-title" style={{ color: "#fff" }}>
            Our Core Values
          </h2>
          <div className="cv__tabs">
            {CORE_VALUES.tabs.map((t, i) => (
              <button
                key={t.key}
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
            <img src={IMG(IMAGES.coreValues, 620, 560)} alt="BharatNXT Wave team" />
          </div>
          <div>
            <h3 className="cv__h">{panel.tab}</h3>
            <p className="cv__lead">{panel.lead}</p>
            {panel.points.map((p) => (
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
