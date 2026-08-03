"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/our-team", label: "Our Team" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact", cta: true },
];

export default function Header({ logoUrl }: { logoUrl?: string }) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Initial entry animation
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 }
    );
    gsap.fromTo(
      ".nav-link-item",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && isVisible) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY && !isVisible) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isVisible]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 flex h-[90px] w-full items-center justify-between px-8 md:px-12 transition-transform duration-500 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xl border-b border-white/[0.08] pointer-events-none" />

        <Link
          href="/"
          className="relative z-10 flex items-center gap-3 no-underline magnetic"
        >
          <span className="block w-[140px] h-auto transition-transform duration-300 hover:scale-105">
            <img src={logoUrl || "/LOGO.avif"} alt="CGplux Studios" className="w-full h-auto object-contain" />
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="relative z-10 hidden md:flex items-center gap-8" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  nav-link-item magnetic relative font-mono text-[11px] uppercase tracking-[0.2em] no-underline py-2
                  transition-colors duration-300 ease-out group
                  ${link.cta ? "text-brand-accent font-bold" : "text-white/60"}
                  ${link.cta ? "hover:text-white" : "hover:text-white"}
                  ${isActive ? "text-white" : ""}
                `}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-brand-accent transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="relative z-10 md:hidden flex flex-col gap-[6px] bg-transparent border-none cursor-pointer p-2 magnetic"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[1px] bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-6 h-[1px] bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-[1px] bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 transition-all duration-500 md:hidden ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`
                font-mono text-lg uppercase tracking-[0.25em] no-underline magnetic
                transition-all duration-300 ease-out
                ${link.cta ? "text-brand-accent" : "text-white/70"}
                ${isActive ? "text-white font-bold" : "hover:text-white"}
              `}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </>
  );
}
