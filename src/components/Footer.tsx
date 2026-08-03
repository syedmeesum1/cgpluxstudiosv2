"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

interface FooterProps {
  instagramUrl?: string;
  facebookUrl?: string;
  behanceUrl?: string;
  linkedinUrl?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactAddress?: string;
}

export default function Footer({ 
  instagramUrl, 
  facebookUrl,
  behanceUrl, 
  linkedinUrl,
  contactPhone, 
  contactEmail,
  contactAddress
}: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (footerRef.current) {
        gsap.fromTo(
          footerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="pt-24 pb-8 bg-black border-t border-white/[0.08] relative overflow-hidden">
      
      {/* Subtle Grid Background & Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,199,192,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Top Links Section */}
        <div className="flex flex-col md:flex-row justify-between gap-16 mb-20 md:mb-32">
          
          {/* Brand Info */}
          <div className="md:w-5/12 flex flex-col items-start">
            <Link href="/" className="mb-8 inline-block">
              <img
                src="/LOGO.avif"
                alt="CGplux Logo"
                className="w-28 h-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-[35ch] mb-10 font-medium">
              Atmospheric, cinematic, and grid-aligned dark mode system for creative studios.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-brand-accent hover:text-brand-dark hover:border-brand-accent transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              )}
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-brand-accent hover:text-brand-dark hover:border-brand-accent transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-brand-accent hover:text-brand-dark hover:border-brand-accent transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              )}
              {behanceUrl && (
                <a
                  href={behanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-brand-accent hover:text-brand-dark hover:border-brand-accent transition-all duration-300"
                  aria-label="Behance"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.546-1.636-2.521-2.417-2.521-.804 0-2.224.81-2.548 2.521zM9.432 9.068C11.517 9.068 12 10.457 12 11.771c0 1.341-.531 2.39-1.396 2.871C11.758 15.025 12 16.488 12 17.5c0 1.688-1.558 2.5-3.045 2.5H0V4h8.337c1.378 0 2.756.242 2.756 2.336 0 1.15-.363 2.181-1.661 2.732zm-6.074.846h4.372c.866 0 1.365-.453 1.365-1.258 0-.805-.499-1.257-1.365-1.257H3.358v2.515zm0 7.218h4.743c.953 0 1.488-.52 1.488-1.366 0-.847-.535-1.366-1.488-1.366H3.358v2.732z"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Nav Columns */}
          <div className="md:w-7/12 flex gap-12 md:gap-20 md:justify-end flex-wrap">
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-accent mb-6 md:mb-8">Company</h4>
              <div className="flex flex-col gap-4">
                <Link href="/about" className="text-white/60 hover:text-white transition-colors text-sm font-medium">About Us</Link>
                <Link href="/our-team" className="text-white/60 hover:text-white transition-colors text-sm font-medium">Our Team</Link>
                <Link href="/#clients" className="text-white/60 hover:text-white transition-colors text-sm font-medium">Clients</Link>
                <Link href="/contact" className="text-white/60 hover:text-white transition-colors text-sm font-medium">Contact</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-accent mb-6 md:mb-8">Resources</h4>
              <div className="flex flex-col gap-4">
                <Link href="/services" className="text-white/60 hover:text-white transition-colors text-sm font-medium">Services</Link>
                <Link href="/portfolio" className="text-white/60 hover:text-white transition-colors text-sm font-medium">Portfolio</Link>
                <Link href="/blog" className="text-white/60 hover:text-white transition-colors text-sm font-medium">Blog</Link>
              </div>
            </div>

            <div className="min-w-[140px]">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-accent mb-6 md:mb-8">Contact Info</h4>
              <div className="flex flex-col gap-4">
                {contactPhone && <a href={`tel:${contactPhone}`} className="text-white/60 hover:text-white transition-colors text-sm font-medium">{contactPhone}</a>}
                {contactEmail && <a href={`mailto:${contactEmail}`} className="text-white/60 hover:text-white transition-colors text-sm font-medium">{contactEmail}</a>}
                {contactAddress && <p className="text-white/60 text-sm font-medium whitespace-pre-wrap leading-relaxed">{contactAddress}</p>}
              </div>
            </div>
          </div>
          
        </div>

        {/* Massive Typography Footer Base */}
        <div className="w-full border-t border-white/[0.05] pt-10 flex flex-col relative">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16 md:mb-20 z-10">
            <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/40">
              &copy; {new Date().getFullYear()} CGplux Studios. All rights reserved.
            </div>
            <div className="flex gap-8">
              <Link href="/terms" className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-brand-accent transition-colors">Terms</Link>
              <Link href="/privacy-policy" className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-brand-accent transition-colors">Privacy</Link>
            </div>
          </div>
          
          {/* Huge Text Mark */}
          <div className="w-full flex justify-center overflow-hidden">
            <h1 
              className="font-heading font-black tracking-tighter text-transparent select-none leading-[0.75] pb-4"
              style={{
                fontSize: "clamp(80px, 16vw, 300px)",
                WebkitTextStroke: "1px rgba(255,255,255,0.05)",
              }}
            >
              CGPLUX
            </h1>
          </div>
          
        </div>

      </div>
    </footer>
  );
}
