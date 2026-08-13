import { defineType, defineField } from "sanity";

export const localVideo = defineType({
  name: "localVideo",
  title: "Local Video",
  type: "object",
  fields: [
    defineField({
      name: "video",
      title: "Video File",
      type: "file",
      options: {
        accept: "video/*",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption (Optional)",
      type: "string",
    }),
  ],
});
