import "../globals.css";
import TopBar from "@/components/TopBar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollProgress from "@/components/ScrollProgress";
import { getSettings, getNav, getServiceMenu } from "@/lib/content";

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
      </body>
    </html>
  );
}
