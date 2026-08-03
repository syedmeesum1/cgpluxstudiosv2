"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";
import { gsap } from "@/lib/gsap";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function SingleBlogClient({ post }: { post: any }) {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { scale: 1.05, opacity: 0, filter: "blur(10px)" },
          { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out" }
        );
      }

      tl.fromTo(
        ".animate-element",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
        "-=1"
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <article ref={containerRef} className="pt-[10rem] md:pt-[12rem] pb-24 md:pb-32 bg-brand-dark min-h-screen">
      <div className="w-full max-w-[1000px] mx-auto px-6 lg:px-12">
        
        {/* Header Section */}
        <header className="mb-12 md:mb-16 flex flex-col items-center text-center">
          <div className="animate-element font-mono text-[10px] uppercase tracking-[0.2em] text-brand-accent mb-6 px-4 py-1.5 rounded-full border border-brand-accent/20 bg-brand-accent/5">
            {post.category || "Insight"}
          </div>
          
          <h1 className="animate-element font-heading font-bold tracking-tighter text-[40px] md:text-[64px] lg:text-[72px] leading-[1.05] text-white mb-8 max-w-[15ch]">
            {post.title}
          </h1>
          
          <div className="animate-element flex items-center gap-6 text-white/40 font-mono text-xs uppercase tracking-widest">
            <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Recently Published"}</span>
            <span className="w-1 h-1 rounded-full bg-brand-accent"></span>
            <span>CGplux Studios</span>
          </div>
        </header>

        {/* Hero Image */}
        <div className="animate-element w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden relative bg-white/5 border border-white/10 mb-16 md:mb-24 shadow-2xl">
          {post.image ? (
            <div ref={imageRef} className="absolute inset-0 w-full h-full">
              <Image
                src={typeof post.image === "string" ? post.image : urlFor(post.image).width(1600).height(900).url()}
                alt={post.title}
                fill
                priority
                className="object-cover opacity-90"
              />
            </div>
          ) : (
            <div ref={imageRef} className="absolute inset-0 flex items-center justify-center bg-brand-dark">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,199,192,0.1),transparent_50%)]" />
              <span className="font-mono text-white/40 tracking-widest uppercase">No Image</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div ref={textRef} className="mx-auto max-w-[700px]">
          {post.excerpt && (
            <p className="animate-element text-[20px] md:text-[24px] leading-[1.6] text-white/90 font-light mb-12 border-l-2 border-brand-accent pl-6">
              {post.excerpt}
            </p>
          )}

          <div className="animate-element prose prose-invert prose-lg md:prose-xl prose-p:text-white/60 prose-headings:font-heading prose-headings:font-medium prose-headings:text-white prose-a:text-brand-accent prose-a:no-underline hover:prose-a:underline max-w-none mb-20">
            {post.content ? (
              <PortableText value={post.content} />
            ) : (
              <p>The full content for this insight has not been added yet. Stay tuned for updates.</p>
            )}
          </div>
          
          <div className="animate-element pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
             <Link
                href="/blog"
                className="group inline-flex items-center gap-4 text-xs font-mono uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300"
              >
                <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/30 group-hover:-translate-x-2">
                  &larr;
                </span>
                Back to Blog
              </Link>
          </div>
        </div>
        
      </div>
    </article>
  );
}
