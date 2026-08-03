"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const points = [
    "End-to-End Creative Production",
    "Cinematic Visual Storytelling",
    "Photoreal CGI & VFX",
    "Professional Film Production",
    "Premium Color Grading",
    "Fast Turnaround",
    "Tailored Creative Solutions",
    "Global Creative Standards",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".wcu-list-item",
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-[#0a0a0a] relative overflow-hidden border-t border-white/[0.06]">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[600px] bg-brand-accent/5 blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-12 md:mb-16">
          <div className="font-mono text-[11px] md:text-xs uppercase tracking-[0.25em] text-white/50 mb-4 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-brand-accent md:hidden"></span>
            WHY CHOOSE US
          </div>
          <h2 className="font-heading font-bold tracking-tight text-[36px] md:text-[48px] leading-[1.1] text-white max-w-3xl">
            Why Brands Work With <span className="text-brand-accent italic pr-2">CGplux Studios</span>
          </h2>
        </div>

        {/* Minimalist List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-0 max-w-4xl mx-auto">
          {points.map((point, idx) => (
            <div 
              key={idx} 
              className="wcu-list-item group flex items-center gap-5 py-4 border-b border-white/[0.08] hover:border-brand-accent/50 transition-colors duration-500 cursor-default"
            >
              <span className="font-mono text-xs md:text-sm text-white/20 group-hover:text-brand-accent transition-colors duration-500">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <h3 className="text-white/70 group-hover:text-white font-medium text-lg md:text-xl tracking-tight transition-all duration-500 group-hover:translate-x-1.5">
                {point}
              </h3>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
