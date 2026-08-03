"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  image?: unknown;
  category?: string;
  publishedAt?: string;
}

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".blog-item");
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center text-white/50 py-24 font-mono text-sm uppercase tracking-widest">
        No blog posts yet.
      </div>
    );
  }

  const items = posts;

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((post) => (
        <Link
          key={post._id}
          href={`/blog/${post.slug.current}`}
          className="blog-item opacity-0 project-card magnetic relative aspect-[4/3] rounded-xl border border-white/[0.08] bg-black overflow-hidden group no-underline"
        >
          <div className="absolute inset-0 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05]">
            {post.image ? (
              <img
                src={post.image as string}
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
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          {/* Minimal Arrow Icon on Hover */}
          <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 backdrop-blur-md border border-white/20 text-white z-10 pointer-events-none">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </div>

          <div className="absolute left-0 right-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-[1s] ease-[cubic-bezier(0.25,1,0.5,1)] z-10 pointer-events-none">
            {post.category && (
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-accent mb-3">
                {post.category}
              </div>
            )}
            <h3 className="font-heading font-extrabold tracking-tighter text-2xl text-white mb-2 group-hover:text-brand-accent transition-colors duration-500">
              {post.title}
            </h3>
            {post.publishedAt && (
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-[1s] delay-100">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
