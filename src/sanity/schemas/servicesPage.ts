import { defineType, defineField } from "sanity";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Header Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Header Title", type: "string" }),
    defineField({ name: "subtitle", title: "Header Subtitle", type: "text", rows: 3 }),
  ],
  preview: {
    prepare() { return { title: "Services Page" }; }
  }
});
