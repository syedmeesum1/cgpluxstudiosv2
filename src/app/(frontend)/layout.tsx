import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LenisScroller from "@/components/LenisScroller";
import { getSiteSettings, urlFor } from "@/lib/sanity";
import "../globals.css";

export const dynamic = 'force-dynamic';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  preload: false,
});


export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings().catch(() => null);
  const faviconUrl = settings?.favicon ? urlFor(settings.favicon).width(32).height(32).url() : undefined;
  
  return {
    title: settings?.title || "CGplux Studios",
    description: "Atmospheric, cinematic, and grid-aligned dark mode system for creative studios.",
    icons: faviconUrl ? { icon: faviconUrl } : undefined,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const settings = await getSiteSettings();
  
  const logoUrl = settings?.logo ? urlFor(settings.logo).url() : undefined;


  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#000000]" suppressHydrationWarning>
        <div className="noise-overlay" aria-hidden="true" />
        <LenisScroller />
        <div className="mx-auto w-full min-h-screen flex flex-col relative bg-brand-dark">
          <div className="bg-grid absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />
          <Header logoUrl={logoUrl} />
          <main id="top" className="relative z-10 flex-1">
            {children}
          </main>
          <Footer
            instagramUrl={settings?.instagramUrl}
            facebookUrl={settings?.facebookUrl}
            behanceUrl={settings?.behanceUrl}
            linkedinUrl={settings?.linkedinUrl}
            contactPhone={settings?.contactPhone}
            contactEmail={settings?.contactEmail}
            contactAddress={settings?.contactAddress}
          />
        </div>
      </body>
    </html>
  );
}
