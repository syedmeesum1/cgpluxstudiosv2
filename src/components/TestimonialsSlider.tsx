"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { gsap } from "@/lib/gsap";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Testimonial {
  _id: string;
  quote: string;
  author: string;
  role?: string;
  avatar?: any;
  rating?: number;
}

interface TestimonialsSliderProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
  const fallback: Testimonial[] = [
    {
      _id: "1",
      quote:
        "CGplux delivered a system that feels cinematic but behaves like engineering: consistent, fast, and sharply aligned.",
      author: "Mira H.",
      role: "CTO",
      rating: 5,
    },
    {
      _id: "2",
      quote:
        "The attention to grid systems and monospace typography gave our brand a technical edge that clients immediately noticed.",
      author: "Alex K.",
      role: "Design Director",
      rating: 5,
    },
    {
      _id: "3",
      quote:
        "From concept to deployment, the workflow was seamless. The dark mode system is now our studio standard.",
      author: "Ravi P.",
      role: "Founder",
      rating: 5,
    },
  ];

  const items: Testimonial[] = testimonials && testimonials.length > 0 ? testimonials : fallback;
  const [activeIdx, setActiveIdx] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const animateQuote = useCallback(
    (newIdx: number) => {
      if (!quoteRef.current || newIdx === activeIdx) return;

      // Quick fade out, swap, fade in
      gsap.to(quoteRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setActiveIdx(newIdx);
          gsap.fromTo(
            quoteRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
          );
        },
      });
    },
    [activeIdx]
  );

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIdx = (activeIdx + 1) % items.length;
      animateQuote(nextIdx);
    }, 6000);

    return () => clearInterval(interval);
  }, [activeIdx, animateQuote, items.length]);

  // Clean quote text if it starts/ends with quotes (we'll style them nicely instead)
  const getCleanQuote = (text: string) => {
    return text.replace(/^["“”]+|["“”]+$/g, "");
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-brand-dark relative overflow-hidden">
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center relative z-10">
        
        {/* Minimal Header */}
        <div ref={headerRef} className="flex flex-col items-center mb-16 md:mb-24 opacity-0">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand-accent flex items-center gap-4">
            <span className="w-8 h-[1px] bg-brand-accent"></span>
            Testimonials
            <span className="w-8 h-[1px] bg-brand-accent"></span>
          </div>
        </div>

        {/* Quote Container */}
        <div className="relative w-full max-w-5xl min-h-[400px] flex flex-col items-center justify-center text-center bg-black/40 border border-white/[0.08] rounded-2xl p-10 md:p-16 backdrop-blur-md overflow-hidden shadow-2xl">
          
          {/* Glassmorphic Backgrounds */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 to-black/80 pointer-events-none -z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,199,192,0.08),transparent_70%)] pointer-events-none -z-10" />
          
          {/* Huge Quote Mark Accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[20%] text-[180px] md:text-[280px] leading-none text-white/[0.03] font-serif pointer-events-none select-none z-0">
            &ldquo;
          </div>

          <div ref={quoteRef} className="relative z-10 flex flex-col items-center gap-10 md:gap-12 opacity-0 w-full">
            <h3 className="font-heading text-3xl md:text-5xl lg:text-[56px] font-medium tracking-tight leading-[1.25] text-white">
              "{getCleanQuote(items[activeIdx]?.quote)}"
            </h3>
            
            <div className="flex flex-col items-center gap-5">
              
              {/* Rating Stars */}
              <div className="flex items-center gap-1.5 mb-2">
                {[...Array(5)].map((_, i) => {
                  const rating = items[activeIdx]?.rating || 5;
                  return (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 md:w-5 md:h-5 ${i < rating ? 'text-brand-accent fill-current' : 'text-white/10 fill-current'}`} 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  );
                })}
              </div>

              {items[activeIdx]?.avatar ? (
                <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border border-white/[0.08]">
                  <Image
                    src={urlFor(items[activeIdx].avatar).width(128).height(128).url()}
                    alt={items[activeIdx].author}
                    fill
                    sizes="64px"
                    className="object-cover grayscale"
                  />
                </div>
              ) : (
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/[0.05] bg-white/[0.02] flex items-center justify-center">
                   <span className="font-mono text-lg text-white/30">{items[activeIdx]?.author.charAt(0)}</span>
                </div>
              )}

              <div className="flex items-center gap-3 text-xs md:text-sm font-mono uppercase tracking-[0.2em]">
                <span className="text-white/90 font-bold">{items[activeIdx]?.author}</span>
                <span className="text-brand-accent/50">&bull;</span>
                <span className="text-white/40">{items[activeIdx]?.role}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Minimal Nav Indicators */}
        <div className="flex items-center gap-4 mt-16 md:mt-24">
          {items.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => animateQuote(idx)} 
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`relative flex items-center justify-center w-8 h-8 group`}
            >
              <span className={`absolute transition-all duration-500 rounded-full ${
                idx === activeIdx 
                  ? 'w-2 h-2 bg-brand-accent shadow-[0_0_12px_rgba(56,199,192,0.8)]' 
                  : 'w-1.5 h-1.5 bg-white/20 group-hover:bg-white/50'
              }`} />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
