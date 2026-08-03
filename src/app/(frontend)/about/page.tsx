import { Metadata } from "next";
import AboutSection from "@/components/AboutSection";
import FounderSection from "@/components/FounderSection";
import ClientsSection from "@/components/ClientsSection";
import ContactCTA from "@/components/ContactCTA";
import { getFounderProfile, getClients, getHomePage, getAboutPage } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "About Us | CGplux Studios",
  description: "Learn more about CGplux Studios, our founders, and the clients we serve.",
};

export default async function AboutPage() {
  const [founder, allClients, homePage, aboutPage] = await Promise.all([
    getFounderProfile().catch(() => null),
    getClients().catch(() => []),
    getHomePage().catch(() => null),
    getAboutPage().catch(() => null),
  ]);

  const clients = allClients.filter((c: { isPartner?: boolean }) => !c.isPartner);
  const partners = allClients.filter((c: { isPartner?: boolean }) => c.isPartner);

  return (
    <>
      <section className="pt-32 md:pt-48 pb-16 md:pb-24 relative overflow-hidden border-b border-white/[0.04]">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          {/* Subtle Background Glow */}
          <div className="absolute top-1/2 left-0 w-[40%] h-[150%] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 -z-10" />
          
          <div className="flex flex-col max-w-4xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md w-fit mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse-dot" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
                {aboutPage?.eyebrow || "Who We Are"}
              </span>
            </div>
            
            <h1 className="m-0 font-heading font-bold tracking-tighter text-[56px] md:text-[80px] lg:text-[100px] leading-[0.95] text-white mb-8">
              {aboutPage?.title || "About CGplux Studios"}
            </h1>
            
            <div className="w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent mb-8" />
            
            <p className="m-0 text-white/60 text-lg md:text-xl max-w-2xl leading-[1.6] font-light">
              We are a collective of visionaries and technologists, united by a singular mission to redefine the digital frontier and build experiences that endure.
            </p>
          </div>
        </div>
      </section>

      <AboutSection
        eyebrow={homePage?.aboutEyebrow}
        title={homePage?.aboutTitle}
        paragraphs={homePage?.aboutParagraphs}
        coreFocusTags={homePage?.coreFocusTags}
      />
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
      <ClientsSection clients={clients} partners={partners} />
      <ContactCTA
        ctaTitle={homePage?.ctaTitle}
        ctaSubtitle={homePage?.ctaSubtitle}
        ctaEmail={homePage?.ctaEmail}
      />
    </>
  );
}
