import PageBanner from "@/components/PageBanner";
import CoreValues from "@/components/CoreValues";
import Stats from "@/components/Stats";
import Footprint from "@/components/Footprint";
import Testimonials from "@/components/Testimonials";
import RichText from "@/components/RichText";
import Reveal from "@/components/Reveal";
import { Icon } from "@/components/Icons";
import { imageUrl } from "@/sanity/lib/image";
import { getAbout, getHome, getSettings, getTestimonials } from "@/lib/content";
import { metadataFrom } from "@/lib/seo";

export async function generateMetadata() {
  const about = await getAbout();
  return metadataFrom(about.seo, { title: about.heading });
}

const WHY = [
  "End-to-end startup support under one roof",
  "Hand-holding partnership at every stage",
  "Pan-India presence across 12+ states",
  "500+ startups served with 85% satisfaction",
];

export default async function AboutPage() {
  const [about, home, settings, testimonials] = await Promise.all([
    getAbout(),
    getHome(),
    getSettings(),
    getTestimonials(),
  ]);

  return (
    <main id="main">
      <PageBanner title={about.heading} />

      <section className="section">
        <div className="container about2">
          <Reveal className="about2__img">
            <img src={imageUrl(home.values.image, 640, 540)} alt={`${settings.name} team`} />
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow">Who We Are</span>
            <h2 className="h-title">
              Your Trusted <span className="accent">Startup Partner</span> in India
            </h2>
            <p className="lead" style={{ marginBottom: 18 }}>{about.intro}</p>
            {about.body?.length > 0 ? (
              <RichText value={about.body} />
            ) : (
              <p style={{ color: "var(--muted)", marginBottom: 22 }}>
                {settings.name} helps startups and MSMEs with company registration, funding support,
                compliance, certifications, website development and digital marketing — all
                delivered with a personalized, hand-holding approach.
              </p>
            )}
            <div className="about2__list">
              {WHY.map((w) => (
                <div className="about2__li" key={w}>
                  <span className="about2__check"><Icon name="check" size={16} /></span> {w}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CoreValues values={home.values} />
      <Footprint footprint={home.footprint} />
      <Stats stats={home.stats} />
      <Testimonials items={testimonials} />
    </main>
  );
}
