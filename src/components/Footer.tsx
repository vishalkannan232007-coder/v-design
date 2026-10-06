import { FadeIn } from '../components/AnimationComponents';
import vDesignLogo from '../assets/brand/V-DESIGN-LOGO.png';

const footerLinks = [
  { href: '#work', label: 'WORK' },
  { href: '#services', label: 'SERVICES' },
  { href: '#about', label: 'ABOUT' },
  { href: '#contact', label: 'CONTACT' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-ink-border px-6 md:px-12 lg:px-16 pt-20 pb-12 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        {/* Top section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 pb-16 border-b border-ink-border">
          {/* Brand info with Real Logo */}
          <FadeIn direction="up">
            <div>
              <div className="mb-5">
                <img
                  src={vDesignLogo}
                  alt="V DESIGN"
                  className="h-10 md:h-12 w-auto object-contain"
                />
              </div>
              <p className="label-xs text-cream/90 font-semibold tracking-[0.3em]">
                CREATIVE DESIGN STUDIO
              </p>
              <p className="label-xs text-ash/50 mt-1 tracking-[0.25em]">
                BRANDING / DIGITAL / MOTION
              </p>
            </div>
          </FadeIn>

          {/* Navigation */}
          <FadeIn delay={0.1} direction="up">
            <nav aria-label="Footer navigation">
              <p className="label-xs text-ash/40 mb-4 tracking-[0.25em]">NAVIGATION</p>
              <ul className="flex flex-col gap-3">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(link.href);
                      }}
                      className="nav-link text-ash hover:text-cream tracking-[0.2em]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </FadeIn>

          {/* Contact quick links */}
          <FadeIn delay={0.2} direction="up">
            <div>
              <p className="label-xs text-ash/40 mb-4 tracking-[0.25em]">GET IN TOUCH</p>
              <a
                href="mailto:vishalkannan232007@gmail.com"
                className="block text-ash text-sm hover:text-cream transition-colors duration-300 mb-2"
              >
                vishalkannan232007@gmail.com
              </a>
              <a
                href="https://wa.me/919585057340"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-ash text-sm hover:text-cream transition-colors duration-300"
              >
                +91 95850 57340
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Large statement */}
        <div className="py-14 overflow-hidden" aria-hidden="true">
          <p
            className="font-black tracking-tight text-ink-mid leading-none select-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
          >
            CRAFTING IDENTITIES.
          </p>
          <p
            className="font-black tracking-tight leading-none select-none"
            style={{
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              WebkitTextStroke: '1px #222',
              color: 'transparent',
            }}
          >
            CREATING IMPACT.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-ink-border pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="label-xs text-ash/40">
            © {currentYear} V DESIGN. All rights reserved.
          </p>
          <p className="label-xs text-ash/40">
            Designed & Built by V DESIGN
          </p>
        </div>
      </div>
    </footer>
  );
}
