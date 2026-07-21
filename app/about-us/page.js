import PageBanner from "@/components/PageBanner";
import CoreValues from "@/components/CoreValues";
import Stats from "@/components/Stats";
import Footprint from "@/components/Footprint";
import Testimonials from "@/components/Testimonials";
import Reveal from "@/components/Reveal";
import { Icon } from "@/components/Icons";
import { COMPANY, ABOUT_TEXT, IMG, IMAGES } from "@/lib/data";

export const metadata = { title: "About Us — BharatNXT Wave" };

const WHY = [
  "End-to-end startup support under one roof",
  "Hand-holding partnership at every stage",
  "Pan-India presence across 12+ states",
  "500+ startups served with 85% satisfaction",
];

export default function AboutPage() {
  return (
    <main>
      <PageBanner title="About Us" />

      <section className="section">
        <div className="container about2">
          <Reveal className="about2__img">
            <img src={IMG(IMAGES.coreValues, 640, 540)} alt="BharatNXT Wave team" />
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow">Who We Are</span>
            <h2 className="h-title">
              Your Trusted <span className="accent">Startup Partner</span> in India
            </h2>
            <p className="lead" style={{ marginBottom: 18 }}>{ABOUT_TEXT}</p>
            <p style={{ color: "var(--muted)", marginBottom: 22 }}>
              {COMPANY.name} helps startups and MSMEs with company registration, funding support,
              compliance, certifications, website development and digital marketing — all delivered
              with a personalized, hand-holding approach.
            </p>
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

      <CoreValues />
      <Footprint />
      <Stats />
      <Testimonials />
    </main>
  );
}
