"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";
import { gsap } from "@/lib/gsap";
import { ArrowLeft, Play, Pause, Volume2, VolumeX } from "lucide-react";

const CustomVideoPlayer = ({ src, caption }: { src: string; caption?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="w-full my-12 md:my-20 breakout-media group">
      <div 
        className="relative w-full aspect-video rounded-2xl overflow-hidden bg-brand-panel border border-white/10 shadow-2xl cursor-pointer"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={src}
          className="absolute top-0 left-0 w-full h-full object-contain"
          loop
          playsInline
          muted={isMuted}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        
        {/* Play/Pause Overlay */}
        <div className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100 group-hover:opacity-100'}`}>
          <div className="w-20 h-20 rounded-full bg-brand-accent/20 backdrop-blur-md border border-brand-accent/30 flex items-center justify-center text-brand-accent hover:bg-brand-accent/40 transition-colors duration-300 shadow-[0_0_30px_rgba(56,199,192,0.3)]">
            {isPlaying ? (
              <Pause className="w-8 h-8" fill="currentColor" />
            ) : (
              <Play className="w-8 h-8 ml-1" fill="currentColor" />
            )}
          </div>
        </div>

        {/* Mute Toggle */}
        <button 
          onClick={toggleMute}
          className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand-accent hover:text-black hover:border-transparent z-10"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>
      {caption && (
        <p className="text-center text-[15px] text-white/50 mt-6 font-light tracking-wide">
          {caption}
        </p>
      )}
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const components: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative w-full aspect-[4/3] md:aspect-video my-12 md:my-20 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl breakout-media">
          <Image
            src={urlFor(value).width(1800).url()}
            alt={value.alt || "Portfolio Content Image"}
            fill
            className="object-cover"
          />
        </div>
      );
    },
    youtube: ({ value }: any) => {
      const { url } = value;
      if (!url) return null;

      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      const videoId = match && match[2].length === 11 ? match[2] : null;

      if (!videoId) return <p className="text-red-400">Invalid YouTube URL</p>;

      return (
        <div className="relative w-full aspect-video my-12 md:my-20 rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl breakout-media">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
          ></iframe>
        </div>
      );
    },
    localVideo: ({ value }: any) => {
      const { videoUrl, caption } = value;
      if (!videoUrl) return null;
      return <CustomVideoPlayer src={videoUrl} caption={caption} />;
    },
  },
};

export default function SinglePortfolioClient({ item }: { item: any }) {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(
        ".animate-hero",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" }
      );

      if (imageRef.current) {
        tl.fromTo(
          ".hero-image",
          { scale: 1.05, filter: "blur(10px)" },
          { scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out" },
          "-=1"
        );
      }

      gsap.fromTo(
        ".animate-content",
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".content-trigger",
            start: "top 85%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <article ref={containerRef} className="bg-brand-dark min-h-screen relative overflow-hidden">
      
      {/* Floating Back Button */}
      <div className="fixed top-6 left-6 md:top-8 md:left-8 z-[100]">
        <Link
          href="/portfolio"
          className="group flex items-center justify-center w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-brand-accent hover:border-transparent hover:text-black transition-all duration-300 shadow-xl"
          aria-label="Back to Portfolio"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        </Link>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 pt-[8rem] md:pt-[10rem] pb-32">
        
        {/* Top Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-20 md:mb-32">
          
          {/* Left Column - Header Info */}
          <header className="lg:col-span-5 flex flex-col items-start text-left">
            <div className="animate-hero inline-block mb-6 md:mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-accent px-4 py-1.5 rounded-full border border-brand-accent/20 bg-brand-accent/10 backdrop-blur-sm">
                {item.category ? item.category.replace(/-/g, ' ') : "Portfolio"}
              </span>
            </div>
            
            <h1 className="animate-hero font-heading font-extrabold tracking-tighter text-[48px] md:text-[64px] lg:text-[72px] xl:text-[88px] leading-[1] text-white mb-6 drop-shadow-xl">
              {item.title}
            </h1>

            {item.excerpt && (
              <p className="animate-hero text-[18px] md:text-[22px] leading-[1.6] text-white/60 font-light border-l-2 border-brand-accent pl-6">
                {item.excerpt}
              </p>
            )}
          </header>

          {/* Right Column - Hero Image */}
          <div className="lg:col-span-7">
            <div className="animate-hero relative w-full aspect-[4/3] md:aspect-video rounded-2xl md:rounded-3xl overflow-hidden bg-brand-panel border border-white/10 shadow-[0_0_80px_rgba(56,199,192,0.05)]">
              {item.imageUrl || item.image ? (
                <div ref={imageRef} className="absolute inset-0 w-full h-full">
                  <Image
                    src={item.imageUrl || urlFor(item.image).width(2000).url()}
                    alt={item.title}
                    fill
                    priority
                    className="hero-image object-cover object-center"
                  />
                </div>
              ) : (
                <div ref={imageRef} className="absolute inset-0 bg-brand-panel flex items-center justify-center hero-image">
                  <span className="font-mono text-white/20 tracking-widest uppercase">No Image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-30 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Content Section */}
        <div className="content-trigger mx-auto max-w-[1000px]">
          <div className="animate-content prose prose-invert prose-lg md:prose-2xl prose-p:text-white/70 prose-headings:font-heading prose-headings:font-bold prose-headings:text-white prose-a:text-brand-accent prose-a:no-underline hover:prose-a:underline max-w-none">
            {item.content ? (
              <PortableText value={item.content} components={components} />
            ) : (
              <p className="text-white/40 italic text-center py-20 font-light">More details coming soon.</p>
            )}
          </div>
        </div>

      </div>
      
      {/* Global override for breakout media inside this component */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 1024px) {
          .breakout-media {
            width: 110%;
            margin-left: -5%;
            max-width: none;
          }
        }
      `}} />
    </article>
  );
}
