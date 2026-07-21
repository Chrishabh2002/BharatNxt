"use client";

import { useState } from "react";

export default function Faq({ items = [] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div className={`faq__item ${isOpen ? "faq__item--open" : ""}`} key={i}>
            <button className="faq__q" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
              <span>{f.q}</span>
              <span className="faq__plus">{isOpen ? "–" : "+"}</span>
            </button>
            <div className="faq__a" style={{ maxHeight: isOpen ? 400 : 0 }}>
              <p>{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
