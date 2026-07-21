import ContactForm from "./ContactForm";
import { getSettings, getServiceMenu, splitOffices } from "@/lib/content";

// The contact block appears on five different pages. Wrapping the fetch here
// keeps every one of them a one-liner, and keeps the form itself a pure
// client component that only knows about props.
export default async function ContactSection() {
  const [settings, serviceMenu] = await Promise.all([getSettings(), getServiceMenu()]);
  const { head, branches } = splitOffices(settings.offices);

  return (
    <ContactForm
      settings={settings}
      headOffice={head}
      branches={branches}
      serviceMenu={serviceMenu}
    />
  );
}
