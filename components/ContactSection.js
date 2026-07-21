import ContactForm from "./ContactForm";
import { getSettings, getContact, getServiceMenu } from "@/lib/content";

// The contact block appears on five different pages. Wrapping the fetch here
// keeps every one of them a one-liner, and keeps the form itself a pure
// client component that only knows about props.
export default async function ContactSection() {
  const [settings, contact, serviceMenu] = await Promise.all([
    getSettings(),
    getContact(),
    getServiceMenu(),
  ]);

  return <ContactForm settings={settings} contact={contact} serviceMenu={serviceMenu} />;
}
