import PageBanner from "@/components/PageBanner";
import ContactSection from "@/components/ContactSection";
import { getContact } from "@/lib/content";
import { metadataFrom } from "@/lib/seo";

export async function generateMetadata() {
  const contact = await getContact();
  return metadataFrom(contact.seo, { title: contact.heading });
}

export default async function ContactPage() {
  const contact = await getContact();

  return (
    <main id="main">
      <PageBanner title={contact.heading} crumb="Contact" />
      <ContactSection />

      {contact.mapEmbedUrl && (
        <section className="map-embed">
          <iframe
            src={contact.mapEmbedUrl}
            title="Office location map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </section>
      )}
    </main>
  );
}
