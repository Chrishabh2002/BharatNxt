import { SERVICES, SERVICES_INTRO } from "@/lib/data";
import { Icon } from "./Icons";
import Reveal from "./Reveal";

const VARIANTS = ["svc--dark", "svc--orange", "svc--gray", "svc--cream"];

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <Reveal className="center">
          <span className="eyebrow eyebrow--c">{SERVICES_INTRO.eyebrow}</span>
          <h2 className="h-title">
            We Offer Great <br /> Number of Legal Services
          </h2>
        </Reveal>

        <div className="grid-4 svc-grid" style={{ marginTop: 44 }}>
          {SERVICES.map((s, i) => (
            <Reveal key={s.key} delay={i * 80}>
              <div className={`svc-card ${VARIANTS[i % 4]}`}>
                <div className="svc-card__icon">
                  <Icon name={s.icon} size={26} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <a className="svc-card__link" href="#contact">
                  <Icon name="arrow" size={15} /> Explore More
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
