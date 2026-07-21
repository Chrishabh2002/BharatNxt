import PageBanner from "@/components/PageBanner";
import ContactSection from "@/components/ContactSection";
import { getContact, getSettings, splitOffices } from "@/lib/content";
import { metadataFrom } from "@/lib/seo";

export async function generateMetadata() {
  const contact = await getContact();
  return metadataFrom(contact.seo, { title: contact.heading });
}

// Google Maps renders a plain address query without an API key, so an office
// gets a map whether or not anyone pasted an embed link in the Studio.
const mapFor = (office) =>
  office.mapEmbedUrl || `https://www.google.com/maps?q=${encodeURIComponent(office.addr)}&output=embed`;

export default async function ContactPage() {
  const [contact, settings] = await Promise.all([getContact(), getSettings()]);
  const { head } = splitOffices(settings.offices);

  return (
    <main id="main">
      <PageBanner title={contact.heading} crumb="Contact" />
      <ContactSection />

      {head?.addr && (
        <section className="map-embed">
          <iframe
            src={mapFor(head)}
            title={`Map showing ${head.city}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </section>
      )}
    </main>
  );
}
