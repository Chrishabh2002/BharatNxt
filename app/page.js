import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Funding from "@/components/Funding";
import CoreValues from "@/components/CoreValues";
import Footprint from "@/components/Footprint";
import Portfolio from "@/components/Portfolio";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Services />
      <Funding />
      <CoreValues />
      <Footprint />
      <Portfolio />
      <Stats />
      <Testimonials />
      <ContactForm />
    </main>
  );
}
