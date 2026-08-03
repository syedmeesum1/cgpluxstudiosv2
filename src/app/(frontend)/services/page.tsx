import { Metadata } from "next";
import StaticServices from "@/components/StaticServices";
import { getServicesPage } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Services | CGplux Studios",
  description: "What we build at CGplux Studios.",
};

export default async function ServicesPage() {
  const servicesPage = await getServicesPage().catch(() => null);

  return (
    <section className="pt-32 md:pt-48 pb-16 md:pb-32 bg-brand-dark overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 mb-20 md:mb-32 relative">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-0 w-[40%] h-[150%] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 -z-10" />
        
        <div className="flex flex-col max-w-4xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md w-fit mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse-dot" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
              {servicesPage?.eyebrow || "Our Expertise"}
            </span>
          </div>
          
          <h1 className="m-0 font-heading font-bold tracking-tighter text-[56px] md:text-[80px] lg:text-[100px] leading-[0.95] text-white mb-8">
            {servicesPage?.title || "We engineer digital perfection."}
          </h1>
          
          <div className="w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent mb-8" />
          
          <p className="m-0 text-white/60 text-lg md:text-xl max-w-2xl leading-[1.6] font-light">
            {servicesPage?.subtitle || "A relentless pursuit of visual excellence. We blend cutting-edge technology with cinematic storytelling to create unparalleled digital experiences."}
          </p>
        </div>
      </div>
      
      <div className="w-full relative">
        <StaticServices hideHeader />
      </div>
    </section>
  );
}
