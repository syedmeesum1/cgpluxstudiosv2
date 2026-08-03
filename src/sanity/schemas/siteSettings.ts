import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    // ─── General ──────────────────────────────────────────────
    defineField({ name: "title", title: "Site Title", type: "string" }),
    defineField({ name: "logo", title: "Website Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "favicon", title: "Favicon", type: "image", options: { hotspot: true } }),
    
    // ─── Global Dashboard/Stats ───────────────────────────────
    defineField({ name: "activeClients", title: "Active Clients (Global KPI)", type: "string" }),
    defineField({ name: "pipeline", title: "Pipeline (Global KPI)", type: "string" }),
    defineField({ name: "nextUpdate", title: "Next Update Date", type: "string" }),

    // ─── Global Contact Info ──────────────────────────────────
    defineField({ name: "contactPhone", title: "Global Contact Phone", type: "string" }),
    defineField({ name: "contactEmail", title: "Global Contact Email", type: "string" }),
    defineField({ name: "contactAddress", title: "Global Contact Address", type: "text", rows: 3 }),

    // ─── Social Links ─────────────────────────────────────────
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "facebookUrl", title: "Facebook URL", type: "url" }),
    defineField({ name: "behanceUrl", title: "Behance URL", type: "url" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url" }),
  ],
  preview: {
    select: { title: "title" },
  },
});
