"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icons";

const SOCIALS = [
  { name: "facebook", cls: "fb", href: "#" },
  { name: "whatsapp", cls: "wa", href: "#" },
  { name: "linkedin", cls: "in", href: "#" },
  { name: "instagram", cls: "ig", href: "#" },
];

export default function Nav({ links = [], serviceMenu = [], whatsapp }) {
  // The mega-menu blurb quotes a service count, so derive it rather than
  // letting a hardcoded number drift as editors add services.
  const serviceCount = serviceMenu.reduce((n, g) => n + (g.items?.length || 0), 0);

  const [open, setOpen] = useState(false); // mobile menu
  const [svcOpen, setSvcOpen] = useState(false); // mobile services accordion
  const [megaOpen, setMegaOpen] = useState(false); // desktop mega (click)
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const megaRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close everything on route change
  useEffect(() => {
    setOpen(false);
    setSvcOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  // close the mega when clicking outside it, or pressing Escape
  useEffect(() => {
    if (!megaOpen) return;
    const onDown = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) setMegaOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setMegaOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [megaOpen]);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <nav className="nav__links">
          {links.map((l) =>
            l.children?.length ? (
              <div
                key={l.label}
                className={`nav__has-mega ${megaOpen ? "is-open" : ""}`}
                ref={megaRef}
              >
                <a
                  href={l.href}
                  aria-haspopup="true"
                  aria-expanded={megaOpen}
                  onClick={(e) => {
                    e.preventDefault();
                    setMegaOpen((v) => !v);
                  }}
                >
                  {l.label} <Icon name="arrow" size={14} />
                </a>
                <span className="mega-backdrop" aria-hidden="true" onClick={() => setMegaOpen(false)} />
                <div className="mega" role="menu">
                  <div className="mega__inner">
                    {serviceMenu.map((g) => (
                      <div className="mega__col" key={g.group}>
                        <div className="mega__head">
                          <span className="mega__ic"><Icon name={g.icon} size={16} /></span>
                          {g.group}
                        </div>
                        <ul>
                          {g.items.map((it) => (
                            <li key={it.slug}>
                              <Link href={`/services/${it.slug}`} onClick={() => setMegaOpen(false)}>
                                {it.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mega__cta">
                    <div className="mega__cta-inner">
                      <span>
                        <b>{serviceCount}+ services</b> to launch &amp; grow your startup — all
                        under one roof.
                      </span>
                      <Link className="btn btn--primary" href="/services" onClick={() => setMegaOpen(false)}>
                        View All Services <Icon name="arrow" size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link key={l.label} href={l.href}>
                {l.label}
              </Link>
            )
          )}
        </nav>

        <div className="nav__right">
          <div className="nav__social">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                className={`soc soc--${s.cls}`}
                href={s.name === "whatsapp" ? `https://wa.me/${whatsapp}` : s.href}
                aria-label={s.name}
              >
                <Icon name={s.name} size={15} />
              </a>
            ))}
          </div>
          <button className="nav__search" aria-label="Search">
            <Icon name="search" size={18} />
          </button>
          <button className="nav__burger" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* mobile */}
      <div className={`nav__mobile ${open ? "nav__mobile--open" : ""}`}>
        {links.map((l) =>
          l.children?.length ? (
            <div key={l.label}>
              <button className="nav__mobile-acc" onClick={() => setSvcOpen((v) => !v)}>
                {l.label} <span>{svcOpen ? "–" : "+"}</span>
              </button>
              {svcOpen && (
                <div className="nav__mobile-sub">
                  {serviceMenu.map((g) => (
                    <div key={g.group}>
                      <b>{g.group}</b>
                      {g.items.map((it) => (
                        <Link key={it.slug} href={`/services/${it.slug}`}>
                          {it.title}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          )
        )}
        <Link className="btn btn--primary btn--block" href="/contact">
          Consult Now
        </Link>
      </div>
    </header>
  );
}
