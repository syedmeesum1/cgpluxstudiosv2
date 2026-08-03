"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/lib/sanity";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface PortfolioItem {
  _id: string;
  title: string;
  slug: { current: string };
  image?: any;
  imageUrl?: string;
  category?: string;
  excerpt?: string;
}

interface PortfolioGridProps {
  items: PortfolioItem[];
  layout?: "grid" | "carousel";
}

const formatCategoryLabel = (val: string) => {
  return val
    .split("-")
    .map((word) => {
      if (word.toLowerCase() === "3d") return "3D";
      if (word.toLowerCase() === "cgi") return "CGI";
      if (word.toLowerCase() === "ui") return "UI";
      if (word.toLowerCase() === "ux") return "UX";
      if (word.toLowerCase() === "tv") return "TV";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export default function PortfolioGrid({ items, layout = "carousel" }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState("");
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth > 1024 ? window.innerWidth * 0.35 : window.innerWidth * 0.8;
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth > 1024 ? window.innerWidth * 0.35 : window.innerWidth * 0.8;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const fallback = [
    { title: "Dream Glaze CGI Animation", category: "3d-animation" },
    { title: "Valentino Uomo Perfume 3D", category: "3d-animation" },
    { title: "3D Visualization For Baaroq", category: "3d-visualization" },
    { title: "Ultra Realistic 3D Product Rendering", category: "3d-visualization" },
    { title: "Rolex Submarine Watch 3D", category: "3d-animation" },
    { title: "3D Animation Of Shoes", category: "3d-animation" },
  ];

  const actualItems: PortfolioItem[] = items.length > 0 ? items : fallback.map((f, i) => ({ 
    _id: String(i), 
    title: f.title, 
    slug: { current: f.title.toLowerCase().replace(/\s+/g, "-") }, 
    category: f.category,
    image: null
  }));

  const uniqueCategoryValues = Array.from(new Set(actualItems.map((item) => item.category).filter(Boolean))) as string[];
  const dynamicCategories = [
    { label: "All", value: "" },
    ...uniqueCategoryValues.map(val => ({
      label: formatCategoryLabel(val),
      value: val
    }))
  ];

  const displayItems = activeFilter
    ? actualItems.filter((item) => item.category === activeFilter)
    : actualItems;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".portfolio-card");
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0, rotateX: 15, transformPerspective: 800 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0, 
          duration: 1.2, 
          stagger: 0.1, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          }
        }
      );
    }
  }, [activeFilter]);


  return (
    <>
      <div ref={headerRef}>
        <div className="opacity-0">
          <div className="font-mono text-xs uppercase tracking-[0.22em] text-brand-accent/90 mb-3">
            Portfolio
          </div>
          <h1 className="font-extrabold tracking-tight text-[48px] max-md:text-[36px] mb-6">
            Featured Work
          </h1>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10 opacity-0">
          {dynamicCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`
                font-mono text-[11px] uppercase tracking-[0.16em] px-4 py-2 rounded-sm border cursor-pointer
                transition-all duration-300 ease-out
                ${
                  activeFilter === cat.value
                    ? "border-brand-accent/55 bg-brand-accent/[0.08] text-brand-accent"
                    : "border-white/[0.18] bg-transparent text-white/62 hover:border-brand-accent/30 hover:text-white/90"
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {layout === "carousel" ? (
        <div className="relative" ref={gridRef}>
          {/* Navigation Buttons (Desktop only) */}
          {displayItems.length > 3 && (
            <>
              <button 
                onClick={scrollLeft}
                className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 -ml-4 lg:-ml-8 z-20 w-14 h-14 items-center justify-center rounded-full bg-black/60 border border-white/10 text-white hover:bg-brand-accent hover:text-black transition-all duration-300 backdrop-blur-md"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={scrollRight}
                className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-0 -mr-4 lg:-mr-8 z-20 w-14 h-14 items-center justify-center rounded-full bg-black/60 border border-white/10 text-white hover:bg-brand-accent hover:text-black transition-all duration-300 backdrop-blur-md"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Carousel Container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 lg:gap-8 pb-10 -mx-6 px-6 lg:-mx-12 lg:px-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {displayItems.map((item, index) => (
              <div
                key={item._id}
                className="flex-none w-[85vw] md:w-[45vw] lg:w-[32vw] snap-center portfolio-card opacity-0 project-card magnetic relative aspect-[3/4] md:aspect-[4/5] rounded-2xl border border-white/[0.08] bg-black overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05]">
                  {(item.imageUrl || item.image) ? (
                    <img
                      src={item.imageUrl || (item.image ? urlFor(item.image).url() : '')}
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] filter grayscale-[0.8] brightness-[0.8] group-hover:grayscale-0 group-hover:brightness-100"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-black" />
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,199,192,0.15),transparent_50%)] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                    </>
                  )}
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="absolute left-0 right-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-[1s] ease-[cubic-bezier(0.25,1,0.5,1)] z-10 pointer-events-none">
                  {item.category && (
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-accent">
                      {dynamicCategories.find((c) => c.value === item.category)?.label || item.category}
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none shadow-[inset_0_0_80px_rgba(56,199,192,0.06)]" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayItems.map((item, index) => (
            <div
              key={item._id}
              className="portfolio-card opacity-0 project-card magnetic relative aspect-[3/4] rounded-xl border border-white/[0.08] bg-black overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05]">
                {(item.imageUrl || item.image) ? (
                  <img
                    src={item.imageUrl || (item.image ? urlFor(item.image).url() : '')}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] filter grayscale-[0.8] brightness-[0.8] group-hover:grayscale-0 group-hover:brightness-100"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-black" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,199,192,0.15),transparent_50%)] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                  </>
                )}
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="absolute left-0 right-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-[1s] ease-[cubic-bezier(0.25,1,0.5,1)] z-10 pointer-events-none">
                {item.category && (
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-accent">
                    {dynamicCategories.find((c) => c.value === item.category)?.label || item.category}
                  </div>
                )}
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none shadow-[inset_0_0_80px_rgba(56,199,192,0.06)]" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
