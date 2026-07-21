import Link from "next/link";
import Logo from "./Logo";
import { Icon } from "./Icons";

function Social({ cls, label, d, href = "#" }) {
  return (
    <a className={`fsoc fsoc--${cls}`} href={href} aria-label={label}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d={d} />
      </svg>
    </a>
  );
}

export default function Footer({ settings }) {
  const { footer } = settings;

  return (
    <footer className="footer">
      {/* purple top bar: logo + tagline */}
      <div className="footer__top">
        <div className="container footer__top-in">
          <Link href="/" className="footer__logo" aria-label={`${settings.name} home`}>
            <Logo height={52} />
          </Link>
          <p className="footer__tagline">{footer.tagline}</p>
        </div>
      </div>

      {/* black main area */}
      <div className="footer__main">
        <svg className="footer__waves" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => (
            <path
              key={i}
              d={`M0 ${120 + i * 14} C 320 ${60 + i * 14}, 760 ${260 + i * 10}, 1440 ${110 + i * 14}`}
              fill="none"
              stroke="#ffffff"
              strokeOpacity={0.05}
              strokeWidth="1"
            />
          ))}
        </svg>

        <div className="container footer__inner">
          <div className="footer__cols">
            {/* Quick Links */}
            <div className="footer__col">
              <h5>Quick Links</h5>
              <ul className="footer__links">
                {footer.quickLinks.map((l) => (
                  <li key={l.href || l.label}>
                    <Link href={l.href || "/"}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Consultation */}
            <div className="footer__col footer__col--bordered">
              <h5>For Consultation</h5>
              <a className="footer__contact" href={`tel:${settings.phoneHref}`}>
                <Icon name="phone" size={18} /> {settings.phone}
              </a>
              <a className="footer__contact" href={`mailto:${settings.email}`}>
                <Icon name="mail" size={18} /> {settings.email}
              </a>
              <div className="footer__socials">
                <Social cls="fb" label="Facebook" d="M13 22v-8h3l1-4h-4V8c0-1 .3-2 2-2h2V2.1C18 2 17 2 16 2c-3 0-5 1.8-5 5v3H8v4h3v8h2Z" />
                <Social cls="ig" label="Instagram" d="M12 8a4 4 0 100 8 4 4 0 000-8Zm0 6.5A2.5 2.5 0 1112 9.5a2.5 2.5 0 010 5ZM17.5 7.5h.01M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4Z" />
                <Social cls="in" label="LinkedIn" d="M6.94 7A1.94 1.94 0 105 5.06 1.94 1.94 0 006.94 7ZM5.4 8.5h3v10h-3v-10Zm5 0h2.9v1.37h.04c.4-.76 1.4-1.57 2.86-1.57 3.06 0 3.63 2 3.63 4.65v5.55h-3v-4.92c0-1.18-.02-2.69-1.64-2.69s-1.89 1.28-1.89 2.6v5.01h-3v-10Z" />
              </div>
            </div>

            {/* Locations */}
            <div className="footer__col footer__col--bordered">
              <h5>Locations</h5>
              {settings.offices.map((o, i) => (
                <p className="footer__addr" key={`${o.city}-${i}`}>
                  <b>{o.city}:-</b> {o.addr}
                </p>
              ))}
            </div>
          </div>

          <div className="footer__disclaimer">
            {footer.disclaimer.map((d, i) => (
              <p key={i}>{d}</p>
            ))}
          </div>
        </div>
      </div>

      {/* purple bottom bar */}
      <div className="footer__bar">
        <div className="container footer__bar-in">
          <span>© {new Date().getFullYear()} {settings.name}. All Rights Reserved</span>
          <span className="footer__legal">
            <Link href="#">Privacy Policy</Link>
            <i>|</i>
            <Link href="#">Terms &amp; Conditions</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
