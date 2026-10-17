import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import vDesignLogo from '../assets/brand/V-DESIGN-LOGO-transparent.png';

const navItems = [
  { href: '#opening', label: 'OPENING', chapter: '01' },
  { href: '#work', label: 'THE WORK', chapter: '02' },
  { href: '#services', label: 'SERVICES', chapter: '03' },
  { href: '#studio', label: 'THE STUDIO', chapter: '04' },
  { href: '#contact', label: "LET'S START", chapter: '05' },
];

export function Navigation({ revealed = true }: { revealed?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('opening');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      const sections = ['contact', 'studio', 'services', 'work', 'opening'];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
  };

  return (
    <>
      <header
        aria-hidden={revealed ? undefined : true}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          revealed ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'
        } ${
          scrolled
            ? 'glass-nav py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
            : 'bg-transparent py-5 md:py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* V DESIGN Brandmark */}
          <a
            href="#opening"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
            aria-label="V DESIGN — Creative Studio Home"
          >
            <img
              src={vDesignLogo}
              alt="V DESIGN"
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop 5-Chapter Navigation Links */}
          <nav
            aria-label="Chapter Navigation"
            className="hidden md:flex items-center gap-6 lg:gap-8 px-5 py-2 rounded-full glass-pill shadow-lg"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.href);
                  }}
                  className={`relative text-[0.68rem] font-space tracking-[0.2em] font-semibold transition-colors duration-200 py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-lime flex items-center gap-1.5 ${
                    isActive ? 'text-lime font-bold' : 'text-warm-muted hover:text-warm-white'
                  }`}
                >
                  <span className="font-mono text-[0.55rem] opacity-60">{item.chapter}</span>
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="navActiveChapterDot"
                      className="w-1 h-1 rounded-full bg-lime text-glow-lime ml-0.5"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Prominent CTA: START A PROJECT */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#contact');
              }}
              className="pill-btn-lime group cursor-pointer !py-2.5 !px-5 text-[0.7rem]"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full border border-charcoal-700 bg-charcoal-900/90 text-warm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime z-50"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`block w-4 h-0.5 bg-warm-white transition-transform duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-1 bg-lime' : '-translate-y-0.5'
              }`}
            />
            <span
              className={`block w-4 h-0.5 bg-warm-white transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100 my-0.5'
              }`}
            />
            <span
              className={`block w-4 h-0.5 bg-warm-white transition-transform duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-1 bg-lime' : 'translate-y-0.5'
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-charcoal-950/95 backdrop-blur-2xl flex flex-col justify-between pt-28 pb-12 px-6 sm:px-10 md:hidden"
          >
            <div className="space-y-4">
              <p className="font-mono text-warm-dim text-xs tracking-[0.3em] uppercase mb-2">
                CUSTOMER JOURNEY
              </p>
              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.href);
                    }}
                    className="flex items-center justify-between py-4 border-b border-charcoal-800 text-2xl font-display font-extrabold uppercase tracking-tight text-warm-white hover:text-lime transition-colors"
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-lime text-xs">CH. {item.chapter} ↗</span>
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-4 pt-6">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#contact');
                }}
                className="w-full inline-flex items-center justify-center gap-3 py-4 rounded-full bg-lime text-charcoal-950 font-space text-xs font-bold tracking-[0.2em] uppercase shadow-[0_0_25px_rgba(212,255,0,0.3)]"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight size={16} />
              </a>

              <div className="flex items-center justify-between font-mono text-warm-dim text-[0.62rem] pt-2">
                <span>V DESIGN</span>
                <span className="text-lime">AVAILABLE FOR COMMISSIONS</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
