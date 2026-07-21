import PageBanner from "@/components/PageBanner";
import Faq from "@/components/Faq";
import ContactForm from "@/components/ContactForm";

export const metadata = { title: "FAQs — BharatNXT Wave" };

export default function FaqPage() {
  return (
    <main>
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
            <Faq />
          </div>
        </div>
      </section>
      <ContactForm />
    </main>
  );
}
