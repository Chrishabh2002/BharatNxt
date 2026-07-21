import PageBanner from "@/components/PageBanner";
import Faq from "@/components/Faq";
import ContactSection from "@/components/ContactSection";
import { getFaqs } from "@/lib/content";

export const metadata = { title: "FAQs" };

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <main id="main">
      <PageBanner title="FAQs" crumb="FAQs" />
      <section className="section">
        <div className="container">
          <div className="center" style={{ marginBottom: 36 }}>
            <span className="eyebrow eyebrow--c">Got Questions?</span>
            <h2 className="h-title">
              Frequently Asked <span className="accent">Questions</span>
            </h2>
          </div>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <Faq items={faqs} />
          </div>
        </div>
      </section>
      <ContactSection />

      {/* Rich result markup — lets these questions appear directly in Google. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </main>
  );
}
