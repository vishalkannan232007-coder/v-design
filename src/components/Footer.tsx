import { ArrowUp } from 'lucide-react';
import vDesignLogo from '../assets/brand/V-DESIGN-LOGO.png';

const navLinks = [
  { href: '#opening', label: 'OPENING', chapter: '01' },
  { href: '#work', label: 'THE WORK', chapter: '02' },
  { href: '#services', label: 'WHAT WE DO', chapter: '03' },
  { href: '#studio', label: 'THE STUDIO', chapter: '04' },
  { href: '#contact', label: "LET'S START", chapter: '05' },
];

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-charcoal-950 text-warm-white border-t border-charcoal-800 pt-16 md:pt-20 pb-12 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-charcoal-800">
          {/* Studio Brand Column */}
          <div className="md:col-span-6 space-y-5">
            <a
              href="#opening"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="inline-block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
              aria-label="V DESIGN Home"
            >
              <img
                src={vDesignLogo}
                alt="V DESIGN"
                className="h-8 md:h-9 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </a>

            <div className="space-y-2">
              <p className="text-xl sm:text-2xl font-display font-extrabold uppercase tracking-tight text-warm-white">
                WE DESIGN IDENTITIES<span className="text-lime text-glow-lime">.</span>
              </p>
              <p className="text-warm-muted text-sm max-w-md leading-relaxed font-light">
                An independent creative studio focused on brand identities, digital experiences, and visual storytelling.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-1 font-mono text-[0.62rem] text-warm-dim">
              <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
              <span className="tracking-[0.25em] uppercase">CHENNAI &middot; GLOBAL COMMISSIONS</span>
            </div>
          </div>

          {/* Chapters Navigation */}
          <div className="md:col-span-3 space-y-4">
            <p className="font-mono text-warm-dim text-[0.62rem] tracking-[0.28em] uppercase">
              CHAPTERS
            </p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="font-space text-xs tracking-[0.16em] text-warm-muted hover:text-lime transition-colors flex items-center gap-2"
                  >
                    <span className="font-mono text-[0.55rem] text-lime/70">{link.chapter}</span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Social */}
          <div className="md:col-span-3 space-y-4">
            <p className="font-mono text-warm-dim text-[0.62rem] tracking-[0.28em] uppercase">
              DIRECT INQUIRIES
            </p>
            <div className="space-y-2 text-xs font-light">
              <a
                href="mailto:vishalkannan232007@gmail.com"
                className="block text-warm-white hover:text-lime transition-colors break-all"
              >
                vishalkannan232007@gmail.com
              </a>
              <a
                href="https://wa.me/919585057340"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-warm-muted hover:text-lime transition-colors"
              >
                +91 95850 57340 (WhatsApp)
              </a>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={scrollToTop}
                className="flex items-center gap-2 font-mono text-[0.62rem] text-warm-dim hover:text-lime transition-colors group cursor-pointer"
                aria-label="Return to Top"
              >
                <span>RETURN TO TOP</span>
                <ArrowUp size={12} className="text-lime group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[0.62rem] text-warm-dim">
          <p>&copy; {CURRENT_YEAR} V DESIGN. ALL RIGHTS RESERVED.</p>
          <p className="text-warm-dim/80">
            A CREATIVE STUDIO IN MOTION
          </p>
        </div>
      </div>
    </footer>
  );
}
