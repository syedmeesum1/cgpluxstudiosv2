"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import ColorBends from "./ColorBends";

interface HeroProps {
  eyebrow?: string;
  title?: string;
  titleStroke?: string;
  subtitle?: string;
  projectsDelivered?: string;
  techStack?: string;
  successRate?: string;
}

export default function Hero({
  eyebrow = "Atmospheric / Cinematic / Grid-Aligned",
  title = "Crafting digital worlds",
  titleStroke = "with precision",
  subtitle = "CGplux Studios is a dark-mode system for creative studios: monospace metadata, sharp geometry, glass depth, and heavy interactions.",
  projectsDelivered = "150+",
  techStack = "Web • Mobile • AI",
  successRate = "100%",
}: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        ".hero-eyebrow",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, delay: 0.2 }
      );

      const titleLines = gsap.utils.toArray(".hero-title-line > span");
      tl.fromTo(
        titleLines,
        { y: "150%", opacity: 0, rotateZ: 3 },
        { y: "0%", opacity: 1, rotateZ: 0, duration: 1.4, ease: "expo.out", stagger: 0.15 },
        0.3
      );

      tl.fromTo(
        ".hero-subtitle",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5 },
        0.8
      );

      tl.fromTo(
        ".hero-button",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
        1
      );



      gsap.to(textContainerRef.current, {
        yPercent: 15,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen min-h-[800px] flex items-center overflow-hidden border-b border-white/[0.05]">
      {/* Kinetic WebGL Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black opacity-90 mix-blend-screen">
        <ColorBends
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          rotation={90}
          speed={0.2}
          scale={3.2}
          frequency={3}
          warpStrength={1}
          mouseInfluence={0.85}
          noise={0.15}
          parallax={0.5}
          iterations={1}
          intensity={1.5}
          bandWidth={6}
          transparent={true}
          autoRotate={0}
        />
      </div>

      <div ref={textContainerRef} className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 pt-20 flex flex-col items-center justify-center text-center">
        {/* Dark radial glow behind text to ensure perfect readability without altering the main WebGL background */}
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-[1000px] h-[600px] bg-black/80 blur-[120px] rounded-[100%] pointer-events-none -z-10"></div>
        
        {/* Eyebrow */}
        <div className="hero-eyebrow flex items-center gap-4 mb-8 sm:mb-10">
          <span className="w-8 sm:w-16 h-[1px] bg-brand-accent/40"></span>
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-brand-accent/90">
            {eyebrow.replace(/\//g, "•")}
          </span>
          <span className="w-8 sm:w-16 h-[1px] bg-brand-accent/40"></span>
        </div>
        
        {/* Main Title */}
        <h1 className="m-0 font-heading font-medium tracking-tight text-[14vw] sm:text-[11vw] lg:text-[120px] leading-[0.85] flex flex-col items-center">
          <div className="hero-title-line overflow-hidden pb-4">
            <span className="inline-block text-white drop-shadow-lg">
              {title.split(" ")[0]}
            </span>
          </div>
          <div className="hero-title-line overflow-hidden flex items-center justify-center pb-2">
            <span className="inline-block text-outline italic pr-4 sm:pr-8">
              {titleStroke}
            </span>
          </div>
          <div className="hero-title-line overflow-hidden pb-2">
            <span className="inline-block text-white font-bold drop-shadow-lg">
              {title.split(" ").slice(1).join(" ") || "Worlds."}
            </span>
          </div>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle text-white/90 drop-shadow-lg text-sm sm:text-base leading-[1.8] font-light mt-10 mb-12 max-w-[500px] mx-auto">
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/portfolio"
            className="hero-button group relative inline-flex items-center justify-center h-[54px] px-8 sm:px-10 rounded-full font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] bg-white overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(56,199,192,0.3)] transition-shadow duration-500"
          >
            <div className="absolute inset-0 bg-brand-accent transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
            <span className="relative z-10 text-brand-dark group-hover:text-white transition-colors duration-500 font-bold">View Portfolio</span>
          </Link>
          
          <Link href="#about" className="hero-button w-[54px] h-[54px] rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-md">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100 transition-opacity"><path d="m6 9 6 6 6-6"/></svg>
          </Link>
        </div>
      </div>

      {/* Minimal Stats Bar at Bottom */}
      <div className="absolute bottom-0 left-0 w-full border-t border-white/5 bg-black/20 backdrop-blur-xl hidden md:block">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          <div className="flex items-center gap-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse-dot"></span>
            <span>Projects Delivered <span className="text-white ml-2">{projectsDelivered}</span></span>
          </div>
          <div className="flex items-center gap-12">
            <span>Tech Stack <span className="text-white ml-2">{techStack}</span></span>
            <span className="w-[1px] h-4 bg-white/10"></span>
            <span>Success Rate <span className="text-white ml-2">{successRate}</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}
