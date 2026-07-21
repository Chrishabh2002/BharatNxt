import "../globals.css";
import TopBar from "@/components/TopBar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollProgress from "@/components/ScrollProgress";
import { getSettings, getNav, getServiceMenu, splitOffices } from "@/lib/content";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://bharatnxtwave.com").replace(/\/$/, "");

// Organization markup, built from the same office list the footer renders.
// The address is kept as one free-text street line on purpose — splitting a
// typed address into city/state/postcode by guesswork is how wrong data gets
// published to Google.
function organizationSchema(settings) {
  const { head, branches } = splitOffices(settings.offices);
  const postal = (o) => ({
    "@type": "PostalAddress",
    streetAddress: o.addr,
    addressCountry: "IN",
  });

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.name,
    legalName: settings.legalName,
    url: SITE_URL,
    email: settings.email,
    telephone: settings.phoneHref,
    ...(head ? { address: postal(head) } : {}),
    ...(branches.length ? { location: branches.map((o) => ({ "@type": "Place", name: o.city, address: postal(o) })) } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: settings.phoneHref,
      email: settings.email,
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  };
}

export async function generateMetadata() {
  const s = await getSettings();
  return {
    title: {
      default: `${s.name} — India's Leading Startup Partner`,
      template: `%s — ${s.name}`,
    },
    description:
      "End-to-end business growth solutions: company registration, fund raising, compliance, certifications & digital marketing. Get a free consultation.",
  };
}

export default async function SiteLayout({ children }) {
  // Fetched once here rather than in each component, so the header, footer and
  // mega-menu can never disagree about the current content.
  const [settings, navLinks, serviceMenu] = await Promise.all([
    getSettings(),
    getNav(),
    getServiceMenu(),
  ]);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Prata&family=Roboto:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <ScrollProgress />
        <TopBar settings={settings} />
        <Nav links={navLinks} serviceMenu={serviceMenu} whatsapp={settings.whatsapp} />
        {children}
        <Footer settings={settings} />
        <WhatsAppFloat whatsapp={settings.whatsapp} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema(settings)) }}
        />
      </body>
    </html>
  );
}
