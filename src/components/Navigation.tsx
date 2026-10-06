import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import vDesignLogo from '../assets/brand/V-DESIGN-LOGO.png';

const navLinks = [
  { href: '#work', label: 'WORK' },
  { href: '#services', label: 'SERVICES' },
  { href: '#about', label: 'ABOUT' },
  { href: '#contact', label: 'CONTACT' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 350);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 lg:px-16 transition-all duration-500 ${
          scrolled
            ? 'py-3.5 bg-ink/95 backdrop-blur-md border-b border-ink-border'
            : 'py-5 md:py-6 bg-transparent'
        }`}
      >
        {/* Real V DESIGN Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="V DESIGN - Home"
        >
          <img
            src={vDesignLogo}
            alt="V DESIGN Creative Design Studio"
            className="h-8 md:h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-90"
          />
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="nav-link"
              data-cursor="open"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            className="btn-outline text-[0.65rem] py-2.5 px-6 tracking-widest uppercase"
            data-cursor="open"
          >
            <span>Start a Project</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[6px] p-2 z-[200] focus:outline-none"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block w-6 h-[1.5px] bg-cream origin-center"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-[1.5px] bg-cream"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block w-6 h-[1.5px] bg-cream origin-center"
          />
        </button>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#0a0a0a] z-[150] flex flex-col justify-between px-8 py-16"
          >
            {/* Mobile Header Logo */}
            <div className="flex items-center">
              <img
                src={vDesignLogo}
                alt="V DESIGN"
                className="h-9 w-auto object-contain"
              />
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-2 my-auto">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -30, opacity: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="block text-cream font-bold uppercase tracking-tight leading-none py-3.5 border-b border-ink-border text-3xl sm:text-4xl hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Bottom CTA & Info */}
            <div className="space-y-6">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                className="btn-primary w-full justify-center text-center py-4"
              >
                <span>Start a Project</span>
              </a>
              <div className="flex items-center justify-between text-ash/50 text-[0.65rem] tracking-[0.25em] uppercase border-t border-ink-border pt-4">
                <span>V DESIGN</span>
                <span>CREATIVE DESIGN STUDIO</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
