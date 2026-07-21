import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import Funding from "@/components/Funding";
import ContactSection from "@/components/ContactSection";
import Reveal from "@/components/Reveal";
import { Icon } from "@/components/Icons";
import { getServiceMenu, getHome } from "@/lib/content";

export const metadata = { title: "Services" };

export default async function ServicesPage() {
  const [serviceMenu, home] = await Promise.all([getServiceMenu(), getHome()]);

  return (
    <main id="main">
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
            {serviceMenu.map((g, gi) => (
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

      <Funding funding={home.funding} />
      <ContactSection />
    </main>
  );
}
