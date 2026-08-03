import { defineType, defineField } from "sanity";

export const founderProfile = defineType({
  name: "founderProfile",
  title: "Founder Profile",
  type: "document",
  fields: [
    // Section Headers
    defineField({ name: "sectionEyebrow", title: "Section Eyebrow", type: "string" }),
    defineField({ name: "sectionTitle", title: "Section Title", type: "string" }),
    defineField({ name: "imageEyebrow", title: "Image Label Eyebrow", type: "string" }),
    defineField({ name: "imageTitle", title: "Image Label Title", type: "string" }),

    defineField({ name: "name", title: "CEO Full Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "CEO Role / Title", type: "string" }),
    defineField({ name: "designation", title: "CEO Secondary Designation", type: "string" }),
    defineField({
      name: "bio",
      title: "CEO Bio Paragraphs",
      type: "array",
      of: [{ type: "text" }],
      description: "Each item is a separate paragraph in the CEO's bio.",
    }),

    defineField({
      name: "photo",
      title: "Founders Photo (Single Image)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url" }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
