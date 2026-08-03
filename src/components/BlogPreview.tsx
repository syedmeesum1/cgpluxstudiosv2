"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

interface BlogPost {
  _id: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slug?: { current: string };
  excerpt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  category?: string;
  publishedAt?: string;
}

interface BlogPreviewProps {
  posts?: BlogPost[];
}



function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { 
            trigger: ref.current, 
            start: "top 80%",
            toggleActions: "play none none none" 
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  if (!posts || posts.length === 0) {
    return null;
  }

  const displayPosts = posts.slice(0, 3);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-brand-dark">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-brand-accent"></span>
              From the Blog
            </div>
            <h2 className="font-heading font-medium tracking-tight text-[48px] md:text-[64px] leading-[1.1] text-white">
              Latest Insights.
            </h2>
          </div>
          <Link
            href="/blog"
            className="group flex items-center gap-3 text-sm font-mono uppercase tracking-[0.2em] text-white/80 hover:text-brand-accent transition-colors duration-300 md:mb-4"
          >
            View All <span className="text-brand-accent text-lg leading-none transform transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>

        {/* Glassmorphic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post) => (
            <Link
              key={post._id}
              href={post.slug ? `/blog/${post.slug.current}` : "#"}
              className="blog-card opacity-0 project-card magnetic relative aspect-[4/3] rounded-xl border border-white/[0.08] bg-black overflow-hidden group"
            >
              <div className="absolute inset-0 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05]">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] filter grayscale-[0.8] brightness-[0.8] group-hover:grayscale-0 group-hover:brightness-100"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-black" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,199,192,0.15),transparent_50%)] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                  </>
                )}
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Minimal Arrow Icon on Hover */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 backdrop-blur-md border border-white/20 text-white z-10">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>

              <div className="absolute left-0 right-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-[1s] ease-[cubic-bezier(0.25,1,0.5,1)] z-10">
                {post.category && (
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-accent mb-3">
                    {post.category}
                  </div>
                )}
                <h3 className="font-heading font-extrabold tracking-tighter text-2xl text-white mb-2 group-hover:text-brand-accent transition-colors duration-500">
                  {post.title}
                </h3>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-[1s] delay-100">
                  {formatDate(post.publishedAt)}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </section>
  );
}
