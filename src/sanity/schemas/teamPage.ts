import { defineType, defineField } from "sanity";

export const teamPage = defineType({
  name: "teamPage",
  title: "Team Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Header Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Header Title", type: "string" }),
    defineField({ name: "subtitle", title: "Header Subtitle", type: "text", rows: 3 }),
  ],
  preview: {
    prepare() { return { title: "Team Page" }; }
  }
});
