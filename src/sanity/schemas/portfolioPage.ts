import { defineType, defineField } from "sanity";

export const portfolioPage = defineType({
  name: "portfolioPage",
  title: "Portfolio Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Header Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Header Title", type: "string" }),
    defineField({ name: "subtitle", title: "Header Subtitle", type: "text", rows: 3 }),
  ],
  preview: {
    prepare() { return { title: "Portfolio Page" }; }
  }
});
