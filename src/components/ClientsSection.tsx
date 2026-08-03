"use client";

import { urlFor } from "@/lib/sanity";

interface ClientItem {
  _id: string;
  name: string;
  logo?: unknown;
  website?: string;
  isPartner?: boolean;
}

interface ClientsSectionProps {
  clients?: ClientItem[];
  partners?: ClientItem[];
}

const fallbackClients = [
  { _id: "c1", name: "Skin Deep", letter: "SD" },
  { _id: "c2", name: "Baaroq", letter: "BQ" },
  { _id: "c3", name: "NMZ Associates", letter: "NMZ" },
];

const fallbackPartners = [
  { _id: "p1", name: "Bytes Central", letter: "BC" },
  { _id: "p2", name: "Choice Bazaar", letter: "CB" },
];

export default function ClientsSection({ clients, partners }: ClientsSectionProps) {
  const displayClients = clients && clients.length > 0 ? clients : fallbackClients;
  const displayPartners = partners && partners.length > 0 ? partners : fallbackPartners;

  // Duplicate items to ensure smooth infinite scroll
  // We duplicate enough times so the marquee always fills ultra-wide screens seamlessly
  const marqueeClients = [...displayClients, ...displayClients, ...displayClients, ...displayClients, ...displayClients, ...displayClients];
  const marqueePartners = [...displayPartners, ...displayPartners, ...displayPartners, ...displayPartners, ...displayPartners, ...displayPartners];

  const renderItem = (item: any) => {
    const hasLogo = !!item.logo;
    const content = (
      <div className="flex items-center justify-center w-[200px] md:w-[280px] h-[100px] px-8 transition-all duration-500 hover:scale-110 cursor-pointer group">
        {hasLogo ? (
          <img
            src={urlFor(item.logo).url()}
            alt={item.name}
            className="w-auto h-full max-h-[80px] max-w-full object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
          />
        ) : (
          <span className="font-heading text-xl md:text-2xl font-bold tracking-[0.2em] uppercase text-white/20 group-hover:text-brand-accent transition-colors duration-700 text-center">
            {item.name}
          </span>
        )}
      </div>
    );

    return item.website ? (
      <a href={item.website} target="_blank" rel="noopener noreferrer" className="no-underline block">
        {content}
      </a>
    ) : (
      content
    );
  };

  return (
    <section className="py-24 md:py-32 bg-brand-dark border-y border-white/[0.02] overflow-hidden relative flex flex-col gap-20">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 45s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 45s linear infinite;
        }
        .marquee-pause:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Background gradients for smooth edge fading */}
      <div className="absolute top-0 bottom-0 left-0 w-24 md:w-64 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 md:w-64 bg-gradient-to-l from-brand-dark via-brand-dark/90 to-transparent z-10 pointer-events-none" />

      {/* Clients Marquee */}
      <div className="relative flex flex-col gap-6">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between z-20 pointer-events-none">
          <div className="font-mono text-xs uppercase tracking-[0.22em] text-brand-accent flex items-center gap-4">
            <span className="w-8 h-[1px] bg-brand-accent"></span>
            Trusted By Brands & Creative Partners
          </div>
        </div>
        
        <div className="flex w-max animate-marquee-left marquee-pause -ml-[20%]">
          {marqueeClients.map((client, i) => (
            <div key={`${client._id}-client-${i}`}>
              {renderItem(client)}
            </div>
          ))}
        </div>
      </div>

      {/* Partners Marquee */}
      <div className="relative flex flex-col gap-6">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-end z-20 pointer-events-none">
          <div className="font-mono text-xs uppercase tracking-[0.22em] text-white/50 flex items-center gap-4">
            Collaborators
            <span className="w-8 h-[1px] bg-white/20"></span>
          </div>
        </div>
        
        <div className="flex w-max animate-marquee-right marquee-pause">
          {marqueePartners.map((partner, i) => (
            <div key={`${partner._id}-partner-${i}`}>
              {renderItem(partner)}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
