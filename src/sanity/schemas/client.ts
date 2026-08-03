import { defineType, defineField } from "sanity";

export const client = defineType({
  name: "client",
  title: "Client / Partner",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      description: "Upload company logo (optional — initials will be shown if not uploaded).",
    }),
    defineField({ name: "website", title: "Website URL", type: "url" }),
    defineField({
      name: "isPartner",
      title: "Is this a Partner? (not a client)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "order", title: "Sort Order", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "isPartner", media: "logo" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? "Partner" : "Client" };
    },
  },
});
