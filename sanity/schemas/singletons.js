import { defineField, defineType, defineArrayMember } from "sanity";
import { iconField, imageField } from "./objects";

// ------------------------------------------------------------------
// Singletons — one document each. Editors open them from the sidebar
// and edit in place; they can never create a second copy.
// ------------------------------------------------------------------

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "company", title: "Company", default: true },
    { name: "contact", title: "Contact details" },
    { name: "offices", title: "Offices" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({ name: "name", title: "Company name", type: "string", group: "company", validation: (r) => r.required() }),
    defineField({ name: "legalName", title: "Legal name", type: "string", group: "company" }),
    defineField({ name: "tagline", title: "Tagline", type: "string", group: "company" }),
    defineField({
      name: "welcome",
      title: "Welcome line",
      type: "string",
      group: "company",
      description: "The greeting shown in the thin bar at the very top of the site.",
    }),

    defineField({
      name: "phone",
      title: "Phone number (as displayed)",
      type: "string",
      group: "contact",
      description: 'How the number appears on screen, e.g. "+91-8595555756".',
    }),
    defineField({
      name: "phoneHref",
      title: "Phone number (for dialling)",
      type: "string",
      group: "contact",
      description: 'Digits only with country code, no spaces or dashes, e.g. "+918595555756".',
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp number",
      type: "string",
      group: "contact",
      description: 'Country code + number, no plus sign, e.g. "918595555756".',
    }),
    defineField({ name: "email", title: "Email address", type: "string", group: "contact" }),
    defineField({
      name: "hours",
      title: "Opening hours",
      type: "string",
      group: "contact",
      description: 'e.g. "Mon - Fri: 09:30 - 18:30".',
    }),

    defineField({
      name: "footerTagline",
      title: "Footer intro paragraph",
      type: "text",
      rows: 4,
      group: "footer",
    }),
    defineField({
      name: "quickLinks",
      title: "Footer quick links",
      type: "array",
      group: "footer",
      of: [defineArrayMember({ type: "navLink" })],
    }),
    defineField({
      name: "offices",
      title: "Office addresses",
      type: "array",
      group: "offices",
      description:
        "Edited once, shown everywhere: the footer, the Contact page and the enquiry block at the bottom of every page.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "city",
              title: "Name",
              type: "string",
              description: 'e.g. "Head Office" or "Jaipur".',
              validation: (r) => r.required(),
            }),
            defineField({
              name: "addr",
              title: "Address",
              type: "text",
              rows: 3,
              validation: (r) => r.required(),
            }),
            defineField({
              name: "isHead",
              title: "This is the head office",
              type: "boolean",
              initialValue: false,
              description: "Tick one. It gets the prominent spot on the contact block.",
            }),
            defineField({
              name: "label",
              title: "Small label",
              type: "string",
              description: 'Optional, e.g. "Visit Us Daily".',
            }),
            defineField({
              name: "mapEmbedUrl",
              title: "Google Maps embed link",
              type: "url",
              description: "Optional. In Google Maps: Share → Embed a map → copy the src=\"…\" URL.",
            }),
          ],
          preview: {
            select: { title: "city", subtitle: "addr", isHead: "isHead" },
            prepare: ({ title, subtitle, isHead }) => ({
              title: isHead ? `${title} (head office)` : title,
              subtitle,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: "disclaimer",
      title: "Legal disclaimer",
      type: "array",
      group: "footer",
      of: [defineArrayMember({ type: "text", rows: 5 })],
      description: "Each entry becomes one paragraph at the very bottom of every page.",
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

export const navigation = defineType({
  name: "navigation",
  title: "Main menu",
  type: "document",
  fields: [
    defineField({
      name: "links",
      title: "Menu items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "href", title: "Link", type: "string" }),
            defineField({
              name: "children",
              title: "Dropdown items",
              type: "array",
              of: [defineArrayMember({ type: "navLink" })],
              description: "Leave empty for a plain link with no dropdown.",
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href", children: "children" },
            prepare: ({ title, subtitle, children }) => ({
              title,
              subtitle: children?.length ? `${subtitle || ""} · ${children.length} dropdown items` : subtitle,
            }),
          },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Main menu" }) },
});

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "services", title: "Services strip" },
    { name: "funding", title: "Funding" },
    { name: "values", title: "Core values" },
    { name: "footprint", title: "Footprint" },
    { name: "portfolio", title: "Portfolio" },
    { name: "stats", title: "Stats" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "heroMarquee",
      title: "Scrolling headline",
      type: "array",
      group: "hero",
      of: [defineArrayMember({ type: "string" })],
      description: "Lines that scroll sideways across the top of the hero.",
    }),
    defineField({ name: "heroEyebrow", title: "Small label above the headline", type: "string", group: "hero" }),
    defineField({ name: "heroSub", title: "Hero paragraph", type: "text", rows: 3, group: "hero" }),
    defineField({
      name: "heroImages",
      title: "Hero background slideshow",
      type: "array",
      group: "hero",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
      description: "These fade from one to the next behind the headline. 3–6 images works best.",
    }),

    defineField({ name: "servicesEyebrow", title: "Small label", type: "string", group: "services" }),
    defineField({ name: "servicesTitle", title: "Section heading", type: "string", group: "services" }),
    defineField({
      name: "serviceHighlights",
      title: "Highlighted service cards",
      type: "array",
      group: "services",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "desc", title: "Description", type: "text", rows: 3 }),
            iconField(),
          ],
          preview: { select: { title: "title", subtitle: "desc" } },
        }),
      ],
      validation: (r) => r.max(4).warning("The row is designed for up to 4 cards."),
    }),

    defineField({ name: "fundingEyebrow", title: "Small label", type: "string", group: "funding" }),
    defineField({ name: "fundingTitle", title: "Section heading", type: "string", group: "funding" }),
    defineField({
      name: "fundingRotate",
      title: "Rotating words",
      type: "array",
      group: "funding",
      of: [defineArrayMember({ type: "string" })],
      description: "These cycle one after another at the end of the heading.",
    }),
    defineField({ name: "fundingSub", title: "Sub-line", type: "string", group: "funding" }),
    defineField({
      name: "fundingSchemes",
      title: "Funding schemes",
      type: "array",
      group: "funding",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "amount", title: "Amount", type: "string", description: 'e.g. "₹2 cr".' }),
            defineField({ name: "title", title: "Scheme name", type: "string" }),
            defineField({ name: "note", title: "Note", type: "string", description: 'e.g. "(Funding)".' }),
            iconField(),
          ],
          preview: { select: { title: "title", subtitle: "amount" } },
        }),
      ],
    }),

    defineField({ name: "valuesEyebrow", title: "Small label", type: "string", group: "values" }),
    defineField({ name: "valuesTitle", title: "Section heading", type: "string", group: "values" }),
    imageField("valuesImage", "Section image"),
    defineField({
      name: "valuesTabs",
      title: "Tabs",
      type: "array",
      group: "values",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "tab", title: "Tab label", type: "string" }),
            defineField({ name: "lead", title: "Opening sentence", type: "text", rows: 3 }),
            defineField({
              name: "points",
              title: "Points",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({ name: "title", title: "Title", type: "string" }),
                    defineField({ name: "desc", title: "Description", type: "text", rows: 2 }),
                  ],
                  preview: { select: { title: "title", subtitle: "desc" } },
                }),
              ],
            }),
          ],
          preview: { select: { title: "tab", subtitle: "lead" } },
        }),
      ],
    }),

    defineField({ name: "footprintEyebrow", title: "Small label", type: "string", group: "footprint" }),
    defineField({ name: "footprintTitle", title: "Section heading", type: "string", group: "footprint" }),
    defineField({
      name: "footprintStates",
      title: "States",
      type: "array",
      group: "footprint",
      of: [defineArrayMember({ type: "percentBar" })],
    }),
    defineField({
      name: "footprintSectors",
      title: "Sectors",
      type: "array",
      group: "footprint",
      of: [defineArrayMember({ type: "percentBar" })],
    }),

    defineField({ name: "portfolioEyebrow", title: "Small label", type: "string", group: "portfolio" }),
    defineField({ name: "portfolioText", title: "Intro paragraph", type: "text", rows: 3, group: "portfolio" }),
    defineField({
      name: "portfolioCategories",
      title: "Filter buttons",
      type: "array",
      group: "portfolio",
      of: [defineArrayMember({ type: "string" })],
      description: 'The order shown above the grid. Keep "All" first.',
    }),

    defineField({
      name: "stats",
      title: "Numbers",
      type: "array",
      group: "stats",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Number",
              type: "number",
              description: "Just the number — it counts up when the visitor scrolls to it.",
            }),
            defineField({ name: "suffix", title: "Suffix", type: "string", description: 'e.g. "k", "+" or "%".' }),
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "sub", title: "Sub-label", type: "string" }),
            iconField(),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),

    defineField({ name: "seo", title: "Search engine listing", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Page heading", type: "string" }),
    defineField({ name: "intro", title: "Intro paragraph", type: "text", rows: 4 }),
    defineField({ name: "body", title: "Main content", type: "richText" }),
    defineField({ name: "seo", title: "Search engine listing", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Page heading", type: "string" }),
    defineField({ name: "intro", title: "Intro paragraph", type: "text", rows: 3 }),
    defineField({
      name: "note",
      title: "Where are the addresses?",
      type: "string",
      readOnly: true,
      initialValue: "Office addresses are edited once, under Site settings → Offices.",
      description:
        "They appear on this page, in the footer and in the enquiry block automatically.",
    }),
    defineField({ name: "seo", title: "Search engine listing", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Contact page" }) },
});

// Shared by the two footprint lists.
export const percentBar = defineType({
  name: "percentBar",
  title: "Progress bar",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Label", type: "string" }),
    defineField({
      name: "pct",
      title: "Percentage",
      type: "number",
      validation: (r) => r.min(0).max(100),
      description: "0–100. Controls how far the bar fills.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "pct" },
    prepare: ({ title, subtitle }) => ({ title, subtitle: `${subtitle ?? 0}%` }),
  },
});
