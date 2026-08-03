import { Metadata } from "next";
import { getSiteSettings, getContactPage } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Contact | CGplux Studios",
  description: "Get in touch with CGplux Studios.",
};

export default async function ContactPage() {
  const [settings, contactPage] = await Promise.all([
    getSiteSettings().catch(() => null),
    getContactPage().catch(() => null),
  ]);

  return (
    <section className="pt-32 md:pt-48 pb-16 md:pb-32 overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 mb-16 md:mb-24 relative">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-0 w-[40%] h-[150%] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 -z-10" />
        
        <div className="flex flex-col max-w-4xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md w-fit mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse-dot" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
              {contactPage?.eyebrow || "Contact"}
            </span>
          </div>
          
          <h1 className="m-0 font-heading font-bold tracking-tighter text-[56px] md:text-[80px] lg:text-[100px] leading-[0.95] text-white mb-8">
            {contactPage?.title || "Get in Touch"}
          </h1>
          
          <div className="w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent mb-8" />
          
          <p className="m-0 text-white/60 text-lg md:text-xl max-w-2xl leading-[1.6] font-light">
            {contactPage?.subtitle || "We're happy to talk to you. Let's schedule a call."}
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative">

        <div className="grid grid-cols-1 md:grid-cols-5 gap-16 lg:gap-24 relative mt-16">
          
          {/* Contact info - Minimal Typography */}
          <div className="md:col-span-2 flex flex-col gap-12 lg:pt-8">
            <div className="group">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3 flex items-center gap-4">
                <span className="w-4 h-[1px] bg-brand-accent transition-all duration-500 group-hover:w-8"></span>
                Call Us
              </div>
              <a href={`tel:${contactPage?.contactPhone || settings?.contactPhone || "+923191086099"}`} className="text-2xl md:text-3xl font-heading font-medium tracking-tight text-white/90 hover:text-brand-accent transition-colors duration-500">
                {contactPage?.contactPhone || settings?.contactPhone || "+92 319 1086099"}
              </a>
            </div>

            <div className="group">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3 flex items-center gap-4">
                <span className="w-4 h-[1px] bg-brand-accent transition-all duration-500 group-hover:w-8"></span>
                Email Us
              </div>
              <a href={`mailto:${contactPage?.contactEmail || settings?.contactEmail || "info@CGpluxdigital.com"}`} className="text-2xl md:text-[28px] font-heading font-medium tracking-tight text-white/90 hover:text-brand-accent transition-colors duration-500">
                {contactPage?.contactEmail || settings?.contactEmail || "info@CGpluxdigital.com"}
              </a>
            </div>

            <div className="group">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3 flex items-center gap-4">
                <span className="w-4 h-[1px] bg-brand-accent transition-all duration-500 group-hover:w-8"></span>
                Headquarters
              </div>
              <p className="text-lg md:text-xl font-light text-white/60 leading-relaxed whitespace-pre-wrap">
                {contactPage?.contactAddress || settings?.contactAddress || "Creative Studio, Digital Hub\nPakistan"}
              </p>
            </div>

            {/* Social */}
            <div className="flex gap-4 mt-4">
              <a href={settings?.instagramUrl || "#"} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-brand-accent hover:text-brand-dark hover:bg-brand-accent transition-all duration-500" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href={settings?.behanceUrl || "#"} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-brand-accent hover:text-brand-dark hover:bg-brand-accent transition-all duration-500" aria-label="Behance">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.546-1.636-2.521-2.417-2.521-.804 0-2.224.81-2.548 2.521zM9.432 9.068C11.517 9.068 12 10.457 12 11.771c0 1.341-.531 2.39-1.396 2.871C11.758 15.025 12 16.488 12 17.5c0 1.688-1.558 2.5-3.045 2.5H0V4h8.337c1.378 0 2.756.242 2.756 2.336 0 1.15-.363 2.181-1.661 2.732zm-6.074.846h4.372c.866 0 1.365-.453 1.365-1.258 0-.805-.499-1.257-1.365-1.257H3.358v2.515zm0 7.218h4.743c.953 0 1.488-.52 1.488-1.366 0-.847-.535-1.366-1.488-1.366H3.358v2.732z"/></svg>
              </a>
            </div>
          </div>

          {/* Contact form - Glassmorphic */}
          <div className="md:col-span-3 relative rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-xl p-8 md:p-12 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 to-black/80 pointer-events-none -z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,199,192,0.1),transparent_50%)] pointer-events-none -z-10" />
            
            <h3 className="font-heading font-medium tracking-tight text-[32px] md:text-[40px] text-white mb-8">Send a Message.</h3>
            
            <form className="flex flex-col gap-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white font-body text-base md:text-lg focus:outline-none focus:border-brand-accent transition-colors duration-500 placeholder-transparent"
                    placeholder="Your name"
                  />
                  <label htmlFor="name" className="absolute left-0 -top-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-accent transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-brand-accent">
                    Your Name
                  </label>
                </div>
                
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white font-body text-base md:text-lg focus:outline-none focus:border-brand-accent transition-colors duration-500 placeholder-transparent"
                    placeholder="Email Address"
                  />
                  <label htmlFor="email" className="absolute left-0 -top-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-accent transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-brand-accent">
                    Email Address
                  </label>
                </div>
              </div>

              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white font-body text-base md:text-lg focus:outline-none focus:border-brand-accent transition-colors duration-500 placeholder-transparent"
                  placeholder="Phone Number"
                />
                <label htmlFor="phone" className="absolute left-0 -top-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-accent transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-brand-accent">
                  Phone Number
                </label>
              </div>

              <div className="relative mt-4">
                <textarea
                  id="details"
                  rows={4}
                  className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white font-body text-base md:text-lg focus:outline-none focus:border-brand-accent transition-colors duration-500 resize-none placeholder-transparent"
                  placeholder="Tell us about your project..."
                />
                <label htmlFor="details" className="absolute left-0 -top-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-accent transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-brand-accent">
                  Project Details
                </label>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="group relative inline-flex items-center justify-center gap-3 h-14 md:h-16 w-full md:w-auto px-10 bg-white font-mono text-xs md:text-sm uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden cursor-pointer"
                >
                  <span className="relative z-10 font-bold text-brand-dark group-hover:text-white transition-colors duration-500">Send Message</span>
                  <div className="absolute inset-0 bg-brand-accent transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
