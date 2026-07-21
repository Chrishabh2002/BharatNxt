import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Funding from "@/components/Funding";
import CoreValues from "@/components/CoreValues";
import Footprint from "@/components/Footprint";
import Portfolio from "@/components/Portfolio";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import { getHome, getPartners, getPortfolio, getTestimonials } from "@/lib/content";
import { metadataFrom } from "@/lib/seo";

export async function generateMetadata() {
  const home = await getHome();
  return metadataFrom(home.seo);
}

export default async function Home() {
  const [home, partners, portfolio, testimonials] = await Promise.all([
    getHome(),
    getPartners(),
    getPortfolio(),
    getTestimonials(),
  ]);

  return (
    <main id="main">
      <Hero hero={home.hero} />
      <Marquee partners={partners} />
      <Services intro={home.servicesIntro} items={home.serviceHighlights} />
      <Funding funding={home.funding} />
      <CoreValues values={home.values} />
      <Footprint footprint={home.footprint} />
      <Portfolio
        intro={home.portfolioIntro}
        categories={home.portfolioCategories}
        items={portfolio}
      />
      <Stats stats={home.stats} />
      <Testimonials items={testimonials} />
      <ContactSection />
    </main>
  );
}
