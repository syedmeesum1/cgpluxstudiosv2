import { defineField, defineType } from "sanity";

export const privacyPolicyPage = defineType({
  name: "privacyPolicyPage",
  title: "Privacy Policy Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Privacy Policy",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
