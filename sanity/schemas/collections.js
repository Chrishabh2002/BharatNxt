import { defineField, defineType, defineArrayMember } from "sanity";
import { iconField, imageField } from "./objects";

// ------------------------------------------------------------------
// Collections — editors add, reorder and delete these freely.
// ------------------------------------------------------------------

export const serviceGroup = defineType({
  name: "serviceGroup",
  title: "Service category",
  type: "document",
  description: "The groupings in the Services dropdown, e.g. \"Government Grant\".",
  fields: [
    defineField({ name: "title", title: "Category name", type: "string", validation: (r) => r.required() }),
    iconField(),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first in the menu.",
    }),
  ],
  orderings: [{ title: "Menu order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "order" } },
});

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  groups: [
    { name: "main", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Service name",
      type: "string",
      group: "main",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      group: "main",
      options: { source: "title", maxLength: 96 },
      description: "Click Generate. This becomes /services/your-slug — avoid changing it once the page is live.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "group",
      title: "Category",
      type: "reference",
      to: [{ type: "serviceGroup" }],
      group: "main",
      validation: (r) => r.required(),
    }),
    iconField(),
    imageField(),
    defineField({
      name: "desc",
      title: "Short description",
      type: "text",
      rows: 2,
      group: "main",
      description: "One line, shown on the card in listings.",
    }),
    defineField({
      name: "intro",
      title: "Intro paragraph",
      type: "text",
      rows: 4,
      group: "main",
      description: "The opening paragraph at the top of the service page.",
    }),
    defineField({
      name: "points",
      title: "What's included",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      group: "main",
      description: "The ticked bullet list. 4–6 points reads best.",
    }),
    defineField({
      name: "body",
      title: "Full page content",
      type: "richText",
      group: "main",
      description: "Optional. Leave empty and the page shows just the intro and bullets.",
    }),
    defineField({
      name: "order",
      title: "Order within category",
      type: "number",
      group: "main",
      description: "Lower numbers appear first.",
    }),
    defineField({ name: "seo", title: "Search engine listing", type: "seo", group: "seo" }),
  ],
  orderings: [
    { title: "Category, then order", name: "grouped", by: [{ field: "group.title", direction: "asc" }, { field: "order", direction: "asc" }] },
    { title: "Name A–Z", name: "title", by: [{ field: "title", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "group.title", media: "image" },
  },
});

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  groups: [
    { name: "main", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "main", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      group: "main",
      options: { source: "title", maxLength: 96 },
      description: "Click Generate. This becomes /blog/your-slug.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "main",
      description: "Shown on the blog listing card and in Google if no SEO description is set.",
      validation: (r) => r.max(300),
    }),
    imageField("image", "Cover image"),
    defineField({
      name: "tag",
      title: "Category",
      type: "string",
      group: "main",
      options: {
        list: [
          "Fund Raising",
          "Funding",
          "Company Profiling",
          "Certifications",
          "Digital Marketing",
          "Legal",
          "Compliance",
        ],
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Publish date",
      type: "datetime",
      group: "main",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({ name: "author", title: "Author", type: "string", group: "main" }),
    defineField({ name: "body", title: "Article", type: "richText", group: "main" }),
    defineField({ name: "seo", title: "Search engine listing", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Newest first", name: "newest", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "tag", media: "image", date: "publishedAt" },
    prepare: ({ title, subtitle, media, date }) => ({
      title,
      subtitle: [subtitle, date ? new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : null]
        .filter(Boolean)
        .join(" · "),
      media,
    }),
  },
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "q", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "a", title: "Answer", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "order", title: "Order", type: "number", description: "Lower numbers appear first." }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "q", subtitle: "a" } },
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Client name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role / company", type: "string" }),
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4, validation: (r) => r.required() }),
    imageField("avatar", "Photo"),
    defineField({
      name: "seed",
      title: "Fallback avatar seed",
      type: "string",
      description: "Used to draw a generated avatar when no photo is uploaded. Any short word works.",
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "quote", media: "avatar" } },
});

export const portfolioItem = defineType({
  name: "portfolioItem",
  title: "Portfolio item",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "cat",
      title: "Filter category",
      type: "string",
      description: "Must exactly match one of the filter buttons set on the Home page.",
      validation: (r) => r.required(),
    }),
    imageField(),
    defineField({
      name: "badge",
      title: "Badge (instead of an image)",
      type: "object",
      description: "For certifications. Fill this in and a coloured badge is drawn instead of a photo.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "big", title: "Large text", type: "string", description: 'e.g. "ISO".' }),
        defineField({ name: "small", title: "Small text", type: "string", description: 'e.g. "CERTIFICATION".' }),
        defineField({ name: "bg", title: "Background colour", type: "string", description: 'Hex code, e.g. "#ff4c0d".' }),
        defineField({ name: "fg", title: "Text colour", type: "string", description: 'Hex code, e.g. "#ffffff".' }),
      ],
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "cat", media: "image" } },
});

export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "sub", title: "Sub-line", type: "string" }),
    imageField("logoImage", "Logo"),
    defineField({
      name: "logo",
      title: "Logo URL",
      type: "url",
      description: "Only used when no logo file is uploaded above.",
    }),
    defineField({
      name: "color",
      title: "Brand colour",
      type: "string",
      description: 'Hex code, e.g. "#004c8f". Used for the text fallback when no logo loads.',
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "sub", media: "logoImage" } },
});
