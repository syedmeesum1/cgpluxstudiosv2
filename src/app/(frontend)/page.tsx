import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ClientsSection from "@/components/ClientsSection";
import PortfolioGrid from "@/components/PortfolioGrid";
import StaticServices from "@/components/StaticServices";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import FounderSection from "@/components/FounderSection";
import BlogPreview from "@/components/BlogPreview";
import ContactCTA from "@/components/ContactCTA";
import {
  getPortfolioItems,
  getTestimonials,
  getFounderProfile,
  getClients,
  getBlogPosts,
  getHomePage,
} from "@/lib/sanity";
export const dynamic = 'force-dynamic';
export default async function Home() {
  const [portfolioItems, testimonials, founder, allClients, blogPosts, homePage] =
    await Promise.all([
      getPortfolioItems(),
      getTestimonials(),
      getFounderProfile(),
      getClients(),
      getBlogPosts(),
      getHomePage(),
    ]);

  const clients = allClients.filter((c: { isPartner?: boolean }) => !c.isPartner);
  const partners = allClients.filter((c: { isPartner?: boolean }) => c.isPartner);

  return (
    <>
      <Hero
        eyebrow={homePage?.heroEyebrow}
        title={homePage?.heroTitle}
        titleStroke={homePage?.heroTitleStroke}
        subtitle={homePage?.heroSubtitle}
        projectsDelivered={homePage?.projectsDelivered || "150+"}
        techStack={homePage?.techStack || "Web • Mobile • AI"}
        successRate={homePage?.successRate || "100%"}
      />
      <AboutSection
        eyebrow={homePage?.aboutEyebrow}
        title={homePage?.aboutTitle}
        paragraphs={homePage?.aboutParagraphs}
        coreFocusTags={homePage?.coreFocusTags}
      />
      <ClientsSection clients={clients} partners={partners} />
      <section className="py-24 md:py-32 w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <PortfolioGrid items={portfolioItems} />
      </section>
      <StaticServices />
      <WhyChooseUs />
      <TestimonialsSlider testimonials={testimonials} />
      <FounderSection
        sectionEyebrow={founder?.sectionEyebrow}
        sectionTitle={founder?.sectionTitle}
        imageEyebrow={founder?.imageEyebrow}
        imageTitle={founder?.imageTitle}
        name={founder?.name}
        role={founder?.role}
        designation={founder?.designation}
        bio={founder?.bio}
        photo={founder?.photo}
        instagramUrl={founder?.instagramUrl}
        linkedinUrl={founder?.linkedinUrl}
      />
      <BlogPreview posts={blogPosts} />
      <ContactCTA
        ctaTitle={homePage?.ctaTitle}
        ctaSubtitle={homePage?.ctaSubtitle}
        ctaEmail={homePage?.ctaEmail}
      />
    </>
  );
}
