"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface AboutProps {
  eyebrow?: string;
  title?: string;
  paragraphs?: string[];
  coreFocusTags?: string[];
}

export default function AboutSection({ eyebrow, title, paragraphs, coreFocusTags }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const defaultParagraphs = [
    "is a Media production studio, specializing in cinematic CGI, visual effects, TV Commercials and high end digital content for modern brands.",
    "Founded by CEO Syed Ali Murtaza Jaffery, the studio is built on a passion for innovation, detail, and visual storytelling. We focus on creating impactful and visually refined experiences that help brands communicate in a more powerful and engaging way.",
    "Our team of skilled artists combines creativity with advanced technology to produce high quality animations and visual effects for commercials, advertising campaigns, and digital media content.",
    "Our vision is to grow into a globally recognized production studio, setting new standards in cinematic advertising and 3D content creation.",
  ];

  const displayParagraphs = paragraphs && paragraphs.length > 0 ? paragraphs : defaultParagraphs;
  const displayTags = coreFocusTags && coreFocusTags.length > 0 
    ? coreFocusTags 
    : ["Cinematic CGI", "Visual Effects", "TV Commercials", "3D Animation"];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Eyebrow and title reveal
      gsap.fromTo(
        ".about-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      // Paragraph lines reveal
      const pElements = gsap.utils.toArray(".about-paragraph");
      gsap.fromTo(
        pElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-32 md:py-48 relative overflow-hidden bg-brand-dark">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        
        <div ref={textRef} className="w-full">
          <div className="about-header mb-12 md:mb-16">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-brand-accent"></span>
              {eyebrow || "About Us"}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
            
            {/* Left Column: Big Headline */}
            <div className="lg:w-5/12">
              <h2 className="about-paragraph font-heading font-medium tracking-tight text-[32px] md:text-[42px] xl:text-[48px] leading-[1.2] text-white">
                <span className="text-brand-accent">{title || "CGplux Studios"}</span> {displayParagraphs[0]}
              </h2>
            </div>
            
            {/* Right Column: Smaller Details */}
            <div className="lg:w-7/12 flex flex-col gap-8 pt-2 lg:pt-4">
              {displayParagraphs.slice(1).map((para, i) => (
                <p key={i} className="about-paragraph text-white/60 text-base md:text-lg leading-[1.8] font-light max-w-[65ch] whitespace-pre-wrap">
                  {para}
                </p>
              ))}
              
              <div className="about-paragraph mt-8 pt-8 border-t border-white/10">
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 mb-2">Our Core Focus</div>
                <div className="flex flex-wrap gap-3 mt-6">
                  {displayTags.map((tag) => (
                    <span key={tag} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-mono uppercase tracking-widest text-white/70">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
