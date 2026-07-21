import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import Funding from "@/components/Funding";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { Icon } from "@/components/Icons";
import { SERVICE_MENU } from "@/lib/services";

export const metadata = { title: "Services — BharatNXT Wave" };

export default function ServicesPage() {
  return (
    <main>
      <PageBanner title="Our Services" crumb="Services" />

      <section className="section">
        <div className="container">
          <Reveal className="center">
            <span className="eyebrow eyebrow--c">What We Do</span>
            <h2 className="h-title">
              Complete <span className="accent">Startup Solutions</span> Under One Roof
            </h2>
            <p className="lead">
              From registration and certifications to grants, loans and digital growth — explore
              every service. Click any item for full details.
            </p>
          </Reveal>

          <div className="svc-groups">
            {SERVICE_MENU.map((g, gi) => (
              <Reveal key={g.group} delay={gi * 60}>
                <div className="svc-group">
                  <div className="svc-group__head">
                    <span className="svc-group__ic"><Icon name={g.icon} size={22} /></span>
                    <h3>{g.group}</h3>
                  </div>
                  <ul>
                    {g.items.map((it) => (
                      <li key={it.slug}>
                        <Link href={`/services/${it.slug}`}>
                          <Icon name="arrow" size={14} /> {it.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Funding />
      <ContactForm />
    </main>
  );
}
