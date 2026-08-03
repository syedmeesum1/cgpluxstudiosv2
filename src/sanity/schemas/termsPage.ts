import { defineField, defineType } from "sanity";

export const termsPage = defineType({
  name: "termsPage",
  title: "Terms & Conditions Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Terms & Conditions",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
