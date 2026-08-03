import { createClient, type SanityClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

/* eslint-disable @typescript-eslint/no-explicit-any */
type SanityImageSource = any;

let _client: SanityClient | null = null;
let _builder: ReturnType<typeof createImageUrlBuilder> | null = null;

function getClient(): SanityClient {
  if (!_client) {
    _client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      useCdn: false, // Set to false to bypass CDN cache and get instant updates
      fetch: { cache: 'no-store' }
    });
  }
  return _client;
}

function getBuilder() {
  if (!_builder) {
    _builder = createImageUrlBuilder(getClient());
  }
  return _builder;
}

export function urlFor(source: SanityImageSource) {
  return getBuilder().image(source);
}

export async function getTestimonials() {
  return getClient().fetch(`*[_type == "testimonial"] | order(order asc) {
    _id,
    quote,
    author,
    role,
    avatar
  }`);
}

export async function getSiteSettings() {
  return getClient().fetch(`*[_type == "siteSettings"][0] {
    title,
    logo,
    favicon,
    activeClients,
    pipeline,
    nextUpdate,
    contactPhone,
    contactEmail,
    contactAddress,
    instagramUrl,
    facebookUrl,
    behanceUrl,
    linkedinUrl
  }`);
}

export async function getHomePage() {
  return getClient().fetch(`*[_type == "homePage"][0]`);
}

export async function getAboutPage() {
  return getClient().fetch(`*[_type == "aboutPage"][0]`);
}

export async function getServicesPage() {
  return getClient().fetch(`*[_type == "servicesPage"][0]`);
}

export async function getTeamPage() {
  return getClient().fetch(`*[_type == "teamPage"][0]`);
}

export async function getContactPage() {
  return getClient().fetch(`*[_type == "contactPage"][0]`);
}

export async function getPortfolioPage() {
  return getClient().fetch(`*[_type == "portfolioPage"][0]`);
}

export async function getBlogPage() {
  return getClient().fetch(`*[_type == "blogPage"][0]`);
}

export async function getTeamMembers() {
  return getClient().fetch(`*[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    photo,
    instagram
  }`);
}

export async function getBlogPosts() {
  return getClient().fetch(`*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    image,
    category,
    publishedAt
  }`);
}

export async function getBlogPost(slug: string) {
  return getClient().fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    image,
    category,
    publishedAt
  }`,
    { slug }
  );
}

export async function getPortfolioItems(category?: string) {
  const filter = category ? `&& category == "${category}"` : "";
  return getClient().fetch(
    `*[_type == "portfolioItem" ${filter}] | order(order asc) {
    _id,
    title,
    slug,
    image,
    "imageUrl": image.asset->url,
    category,
    excerpt
  }`
  );
}

export async function getFounderProfile() {
  return getClient().fetch(`*[_type == "founderProfile"][0] {
    _id,
    sectionEyebrow,
    sectionTitle,
    imageEyebrow,
    imageTitle,
    name,
    role,
    designation,
    bio,
    photo,
    instagramUrl,
    linkedinUrl
  }`);
}

export async function getClients() {
  return getClient().fetch(`*[_type == "client"] | order(order asc) {
    _id,
    name,
    logo,
    website,
    isPartner
  }`);
}

export async function getTermsPage() {
  return getClient().fetch(`*[_type == "termsPage"][0] {
    title,
    content
  }`);
}

export async function getPrivacyPolicyPage() {
  return getClient().fetch(`*[_type == "privacyPolicyPage"][0] {
    title,
    content
  }`);
}
