import { defineType, defineField } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Header Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Header Title", type: "string" }),
    defineField({ name: "subtitle", title: "Header Subtitle", type: "text", rows: 3 }),
    defineField({ name: "contactPhone", title: "Contact Phone Override", type: "string", description: "Overrides global settings if set." }),
    defineField({ name: "contactEmail", title: "Contact Email Override", type: "string", description: "Overrides global settings if set." }),
    defineField({ name: "contactAddress", title: "Contact Address Override", type: "text", rows: 3 }),
  ],
  preview: {
    prepare() { return { title: "Contact Page" }; }
  }
});
