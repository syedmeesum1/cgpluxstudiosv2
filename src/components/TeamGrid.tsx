"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { urlFor } from "@/lib/sanity";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  photo?: unknown;
  instagram?: string;
}

interface TeamGridProps {
  members: TeamMember[];
}

export default function TeamGrid({ members }: TeamGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".team-card");
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
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

  const fallback = [
    { name: "Syed Ali Murtaza Jaffery", role: "CEO / Founder", instagram: "#", photo: undefined },
    { name: "Haseeb Haider", role: "Creative Director", instagram: "#", photo: undefined },
    { name: "Syed Yawer Abbas Jaffery", role: "Finance Manager", instagram: "#", photo: undefined },
    { name: "Ozaib", role: "Sales Manager", instagram: "#", photo: undefined },
    { name: "Syeda Aemal", role: "Social Media Manager", instagram: "#", photo: undefined },
    { name: "Eiman Zehra", role: "Assistant Manager", instagram: "#", photo: undefined },
  ];

  const items = members.length > 0
    ? members
    : fallback.map((f, i) => ({ _id: String(i), ...f }));

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((member) => (
        <div
          key={member._id}
          className="team-card opacity-0 project-card magnetic relative aspect-[3/4] rounded-xl border border-white/[0.08] bg-black overflow-hidden group cursor-pointer"
        >
          <div className="absolute inset-0 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05]">
            <img
              src={
                member.photo 
                  ? urlFor(member.photo).width(600).height(800).url()
                  : member.name?.toLowerCase().includes("syeda") || member.name?.toLowerCase().includes("eiman")
                    ? "/Girl-2.avif"
                    : "/Client-1.avif"
              }
              alt={member.name}
              className="w-full h-full object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] filter grayscale-[0.8] brightness-[0.8] group-hover:grayscale-0 group-hover:brightness-100"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Social Icon on Hover (Top Right) */}
          {member.instagram && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 backdrop-blur-md border border-white/20 text-white z-20 hover:bg-brand-accent hover:text-brand-dark hover:border-brand-accent"
              aria-label={`${member.name}'s Instagram`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          )}

          <div className="absolute left-0 right-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-[1s] ease-[cubic-bezier(0.25,1,0.5,1)] z-10 pointer-events-none">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-accent mb-3">
              {member.role}
            </div>
            <h3 className="font-heading font-extrabold tracking-tighter text-2xl text-white mb-2 group-hover:text-brand-accent transition-colors duration-500">
              {member.name}
            </h3>
          </div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none shadow-[inset_0_0_80px_rgba(56,199,192,0.06)]" />
        </div>
      ))}
    </div>
  );
}
