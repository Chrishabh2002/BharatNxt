import PageBanner from "@/components/PageBanner";
import ContactForm from "@/components/ContactForm";

export const metadata = { title: "Contact Us — BharatNXT Wave" };

export default function ContactPage() {
  return (
    <main>
      <PageBanner title="Contact Us" crumb="Contact" />
      <ContactForm />
    </main>
  );
}
