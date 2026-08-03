import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

export const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  title: "CGplux Studios",
  apiVersion: "2024-01-01",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content Management")
          .items([
            // Global Settings
            S.listItem()
              .title("Global Settings")
              .child(
                S.list()
                  .title("Global Settings")
                  .items([
                    S.listItem()
                      .title("Site Settings")
                      .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
                    S.listItem()
                      .title("Founder Profile")
                      .child(S.document().schemaType("founderProfile").documentId("founderProfile")),
                  ])
              ),

            S.divider(),

            // Pages (Singletons)
            S.listItem()
              .title("Pages")
              .child(
                S.list()
                  .title("Pages")
                  .items([
                    S.listItem()
                      .title("Home Page")
                      .child(S.document().schemaType("homePage").documentId("homePage")),
                    S.listItem()
                      .title("About Page")
                      .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
                    S.listItem()
                      .title("Services Page")
                      .child(S.document().schemaType("servicesPage").documentId("servicesPage")),
                    S.listItem()
                      .title("Portfolio Page")
                      .child(S.document().schemaType("portfolioPage").documentId("portfolioPage")),
                    S.listItem()
                      .title("Our Team Page")
                      .child(S.document().schemaType("teamPage").documentId("teamPage")),
                    S.listItem()
                      .title("Blog Page")
                      .child(S.document().schemaType("blogPage").documentId("blogPage")),
                    S.listItem()
                      .title("Contact Page")
                      .child(S.document().schemaType("contactPage").documentId("contactPage")),
                    S.listItem()
                      .title("Terms & Conditions")
                      .child(S.document().schemaType("termsPage").documentId("termsPage")),
                    S.listItem()
                      .title("Privacy Policy")
                      .child(S.document().schemaType("privacyPolicyPage").documentId("privacyPolicyPage")),
                  ])
              ),

            S.divider(),

            // Collections
            S.documentTypeListItem("portfolioItem").title("Portfolio Items"),
            S.documentTypeListItem("teamMember").title("Team Members"),
            S.documentTypeListItem("blogPost").title("Blog Posts"),
            S.documentTypeListItem("client").title("Clients"),
            S.documentTypeListItem("testimonial").title("Testimonials"),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
