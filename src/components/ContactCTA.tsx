"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

interface ContactCTAProps {
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaEmail?: string;
}

export default function ContactCTA({ ctaTitle, ctaSubtitle, ctaEmail }: ContactCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        const children = contentRef.current.children;
        gsap.fromTo(
          children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const email = ctaEmail || "info@cgpluxstudios.com";

  return (
    <section ref={sectionRef} className="py-6 md:py-10 bg-brand-dark relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(56,199,192,0.08),transparent_70%)] pointer-events-none z-0" />
      
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div
          ref={contentRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12 py-6 md:py-8 border-t border-b border-white/[0.05]"
        >
          {/* Left Text Content */}
          <div className="opacity-0 flex-1">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 mb-3 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-brand-accent"></span>
              Contact
            </div>
            <h3 className="font-heading font-medium text-[36px] md:text-[56px] leading-[1.1] tracking-tight text-white mb-4">
              {ctaTitle || "Start a project."}
            </h3>
            <p className="m-0 text-white/50 text-md md:text-md leading-[1.6] max-w-[700px] whitespace-pre-wrap">
              {ctaSubtitle || "We'll respond with a deck and a plan—built on your grid, not generic templates."}
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="opacity-0 flex flex-col sm:flex-row gap-4 shrink-0 lg:pb-2">
            <Link
              href={`mailto:${email}`}
              className="group relative inline-flex items-center justify-center gap-3 h-14 md:h-16 px-8 md:px-10 bg-white font-mono text-xs md:text-sm uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 font-bold text-brand-dark group-hover:text-white transition-colors duration-500">Email Us</span>
              <div className="absolute inset-0 bg-brand-accent transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
            </Link>
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-3 h-14 md:h-16 px-8 md:px-10 border border-white/20 text-white font-mono text-xs md:text-sm uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden hover:border-brand-accent"
            >
              <span className="relative z-10 group-hover:text-brand-dark transition-colors duration-500">Get in Touch</span>
              <div className="absolute inset-0 bg-brand-accent transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
