import { defineType, defineField } from "sanity";
import { Play } from "lucide-react";

export const youtube = defineType({
  name: "youtube",
  type: "object",
  title: "YouTube Embed",
  icon: Play,
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "YouTube video URL",
      description: "Paste the URL to the YouTube video you want to embed.",
      validation: (rule) =>
        rule.custom((url) => {
          if (!url) {
            return "URL is required";
          }
          if (typeof url !== "string" || (!url.includes("youtube.com") && !url.includes("youtu.be"))) {
            return "Must be a valid YouTube URL";
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      url: "url",
    },
    prepare({ url }) {
      return {
        title: "YouTube Video",
        subtitle: url || "No URL specified",
        media: Play,
      };
    },
  },
});
