import { defineField, defineType, defineArrayMember } from "sanity";

// Every icon rendered by components/Icons.js. Kept in sync by hand — if you add
// a case there, add it here so editors can actually pick it.
export const ICON_OPTIONS = [
  { title: "Building", value: "building" },
  { title: "Rocket", value: "rocket" },
  { title: "Megaphone", value: "megaphone" },
  { title: "Chart", value: "chart" },
  { title: "Badge", value: "badge" },
  { title: "Heart", value: "heart" },
  { title: "Target", value: "target" },
  { title: "Eye", value: "eye" },
  { title: "Phone", value: "phone" },
  { title: "Mail", value: "mail" },
  { title: "Location pin", value: "pin" },
  { title: "Arrow", value: "arrow" },
  { title: "Rupee", value: "rupee" },
  { title: "Bank", value: "bank" },
  { title: "Document", value: "doc" },
  { title: "Seed", value: "seed" },
  { title: "Clock", value: "clock" },
  { title: "Search", value: "search" },
  { title: "Check", value: "check" },
];

// Shorthand so every icon field looks and behaves the same.
export const iconField = (name = "icon", title = "Icon") =>
  defineField({
    name,
    title,
    type: "string",
    options: { list: ICON_OPTIONS },
    description: "Small symbol shown above or beside this item.",
  });

// Images always carry alt text — it is a legal/SEO requirement, not a nicety.
export const imageField = (name = "image", title = "Image") =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alt text",
        type: "string",
        description: "Describe the image for screen readers and Google.",
      }),
    ],
  });

export const seo = defineType({
  name: "seo",
  title: "Search engine listing",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      description: "Shown in the browser tab and Google results. Aim for 50–60 characters.",
      validation: (r) => r.max(70).warning("Google usually cuts titles off after ~60 characters."),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "The grey summary line under the title in Google. Aim for 150–160 characters.",
      validation: (r) => r.max(200).warning("Google usually cuts descriptions off after ~160 characters."),
    }),
    imageField("ogImage", "Social share image"),
  ],
});

// The blog body. Deliberately small: headings, lists, links, images, quotes —
// enough to write a good article, not enough to break the page design.
export const richText = defineType({
  name: "richText",
  title: "Content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading", value: "h2" },
        { title: "Sub-heading", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet list", value: "bullet" },
        { title: "Numbered list", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                validation: (r) =>
                  r.uri({ scheme: ["http", "https", "mailto", "tel"], allowRelative: true }),
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
    }),
  ],
});

// A nav entry. Points at either a typed-in path or nothing (parent-only item).
export const navLink = defineType({
  name: "navLink",
  title: "Menu link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: 'A path on this site, e.g. "/about-us" or "/services".',
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
