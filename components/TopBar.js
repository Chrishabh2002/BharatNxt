import Link from "next/link";
import Logo from "./Logo";
import { Icon } from "./Icons";

export default function TopBar({ settings }) {
  return (
    <div className="topbar">
      <span className="topbar__sheen" aria-hidden="true" />
      <div className="container topbar__inner">
        <Link href="/" className="topbar__logo" aria-label={`${settings.name} home`}>
          <Logo height={46} />
        </Link>

        <div className="topbar__info">
          <a className="topbar__item" href={`tel:${settings.phoneHref}`}>
            <span className="topbar__ic">
              <Icon name="phone" size={19} />
            </span>
            <span className="topbar__txt">
              <small>Phone</small>
              <b>{settings.phone}</b>
            </span>
          </a>

          <span className="topbar__divider" aria-hidden="true" />

          <div className="topbar__item">
            <span className="topbar__ic">
              <Icon name="clock" size={19} />
            </span>
            <span className="topbar__txt">
              <small>Our Working Hours</small>
              <b>{settings.hours}</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
