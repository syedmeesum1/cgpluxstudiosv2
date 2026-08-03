import { defineType, defineField } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({ name: "heroEyebrow", title: "Hero Eyebrow", type: "string" }),
    defineField({ name: "heroTitle", title: "Hero Title", type: "string" }),
    defineField({ name: "heroTitleStroke", title: "Hero Title (Stroke Part)", type: "string" }),
    defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "text", rows: 3 }),
    defineField({ name: "projectsDelivered", title: "Projects Delivered (e.g. 150+)", type: "string" }),
    defineField({ name: "techStack", title: "Tech Stack (e.g. Web • Mobile • AI)", type: "string" }),
    defineField({ name: "successRate", title: "Success Rate (e.g. 100%)", type: "string" }),
    
    // About Section
    defineField({ name: "aboutEyebrow", title: "About Eyebrow", type: "string" }),
    defineField({ name: "aboutTitle", title: "About Title", type: "string" }),
    defineField({
      name: "aboutParagraphs",
      title: "About Paragraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "coreFocusTags",
      title: "Core Focus Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Tags displayed under the About section (e.g. Cinematic CGI, Visual Effects).",
    }),

    // Contact CTA
    defineField({ name: "ctaTitle", title: "CTA Title", type: "string" }),
    defineField({ name: "ctaSubtitle", title: "CTA Subtitle", type: "text", rows: 2 }),
    defineField({ name: "ctaEmail", title: "CTA Email", type: "string" }),
  ],
  preview: {
    prepare() {
      return { title: "Home Page" };
    },
  },
});
