"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact", cta: true },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-[80px] left-0 right-0 z-40 bg-brand-dark/95 backdrop-blur-xl border-b border-slate-800 px-6 py-4 flex flex-col gap-2 md:hidden">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`
              font-mono text-xs uppercase tracking-[0.16em] no-underline px-3 py-2 rounded-sm
              transition-all duration-300 ease-out border border-transparent
              ${link.cta ? "text-brand-accent" : "text-white/72"}
              ${link.cta ? "hover:bg-brand-accent/8" : "hover:text-white/92 hover:border-brand-accent/22"}
              ${isActive ? "text-white border-brand-accent/35" : ""}
            `}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
