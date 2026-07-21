import Link from "next/link";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import ContactSection from "@/components/ContactSection";
import RichText from "@/components/RichText";
import Reveal from "@/components/Reveal";
import { Icon } from "@/components/Icons";
import { imageUrl } from "@/sanity/lib/image";
import { getService, getServiceSlugs } from "@/lib/content";
import { metadataFrom } from "@/lib/seo";

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = await getService(slug);
  if (!s) return { title: "Service" };
  return metadataFrom(s.seo, { title: s.title, description: s.desc, image: s.image });
}

const STEPS = [
  { t: "Consultation", d: "We understand your business and requirement." },
  { t: "Documentation", d: "We prepare and verify every document." },
  { t: "Filing & Follow-up", d: "We submit and coordinate with authorities." },
  { t: "Delivery", d: "You get the result — fast and compliant." },
];

export default async function ServiceDetail({ params }) {
  const { slug } = await params;
  const s = await getService(slug);
  if (!s) notFound();

  const related = s.related || [];
  const image = s.image || s.img;

  return (
    <main id="main">
      <PageBanner title={s.title} crumb={s.title} />

      {/* intro: image + content */}
      <section className="section">
        <div className="container svcd">
          <Reveal className="svcd__img">
            <img src={imageUrl(image, 660, 540)} alt={s.title} />
            <span className="svcd__badge"><Icon name={s.icon} size={22} /> {s.group}</span>
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow">{s.group}</span>
            <h2 className="h-title">{s.title}</h2>
            <p className="lead" style={{ marginBottom: 22 }}>{s.intro}</p>
            <div className="about2__list">
              {(s.points || []).map((p) => (
                <div className="about2__li" key={p}>
                  <span className="about2__check"><Icon name="check" size={16} /></span> {p}
                </div>
              ))}
            </div>
            <Link className="btn btn--primary" href="/contact" style={{ marginTop: 24 }}>
              Get Started <Icon name="arrow" size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* optional long-form content, only rendered when an editor writes some */}
      {s.body?.length > 0 && (
        <section className="section section--tint">
          <div className="container container--prose">
            <RichText value={s.body} />
          </div>
        </section>
      )}

      {/* process steps */}
      <section className={`section ${s.body?.length ? "" : "section--tint"}`}>
        <div className="container">
          <Reveal className="center">
            <span className="eyebrow eyebrow--c">How It Works</span>
            <h2 className="h-title">Simple <span className="accent">4-Step Process</span></h2>
          </Reveal>
          <div className="steps">
            {STEPS.map((st, i) => (
              <Reveal key={st.t} delay={i * 90}>
                <div className="step">
                  <span className="step__num">{i + 1}</span>
                  <h4>{st.t}</h4>
                  <p>{st.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* related */}
      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <Reveal className="center">
              <span className="eyebrow eyebrow--c">Related Services</span>
              <h2 className="h-title">More in <span className="accent">{s.group}</span></h2>
            </Reveal>
            <div className="related">
              {related.map((r) => (
                <Link className="related__card" href={`/services/${r.slug}`} key={r.slug}>
                  <span className="related__ic"><Icon name={r.icon} size={20} /></span>
                  <span>{r.title}</span>
                  <Icon name="arrow" size={16} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactSection />
    </main>
  );
}
