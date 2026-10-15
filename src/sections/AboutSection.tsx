import { motion } from 'framer-motion';
import vDesignLogo from '../assets/brand/V-DESIGN-LOGO.png';

const EASE_EDITORIAL: [number, number, number, number] = [0.16, 1, 0.3, 1];

const focusAreas = [
  { label: 'Brand Identities', desc: 'Marks and visual systems built to endure.' },
  { label: 'Digital Experiences', desc: 'Websites and interfaces designed with purpose.' },
  { label: 'Motion & Video', desc: 'Cinematic storytelling for modern brands.' },
  { label: 'Social Creatives', desc: 'Consistent, on-brand content across every platform.' },
];

export function AboutSection() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="studio"
      className="py-24 sm:py-32 md:py-40 px-6 md:px-12 lg:px-16 bg-charcoal-900 border-b border-charcoal-800 relative overflow-hidden"
    >
      {/* Background Architectural Watermark */}
      <div
        className="absolute right-0 bottom-0 pointer-events-none select-none opacity-[0.025] translate-x-12 translate-y-12"
        aria-hidden="true"
      >
        <span className="font-display font-black text-[22vw] leading-none tracking-tighter text-warm-white">
          VDS
        </span>
      </div>

      {/* Warm amber corner glow */}
      <div
        className="absolute top-0 left-0 w-[40vw] h-[40vh] pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 0% 0%, rgba(200,85,20,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between pb-10 border-b border-charcoal-800 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-lime shadow-[0_0_8px_rgba(212,255,0,0.8)]" />
              <p className="font-mono text-lime font-bold text-xs tracking-[0.25em] uppercase">
                CHAPTER 04 &mdash; THE STUDIO
              </p>
            </div>
            <h2 className="display-title text-warm-white">
              THE STUDIO<span className="text-lime">.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-mono text-warm-dim text-[0.65rem] tracking-[0.25em] uppercase">
              CREATIVE DIRECTION &middot; CHENNAI &middot; GLOBAL
            </p>
          </div>
        </div>

        {/* Studio Composition Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-10">
            <div className="space-y-6">
              <motion.h3
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: EASE_EDITORIAL }}
                className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-warm-white tracking-tight leading-tight uppercase"
              >
                DESIGNED WITH<br />
                INTENTION<span className="text-lime" style={{ textShadow: '0 0 20px rgba(212,255,0,0.4)' }}>.</span>
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE_EDITORIAL }}
                className="text-lg sm:text-xl font-space font-light text-warm-muted leading-relaxed max-w-2xl"
              >
                V DESIGN is an independent creative studio focused on building distinctive visual identities, thoughtful digital experiences, and creative storytelling that resonates.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.18, ease: EASE_EDITORIAL }}
                className="text-base font-light text-warm-muted leading-relaxed max-w-2xl"
              >
                We approach every project with curiosity and precision — asking the right questions before reaching for a pen. The result is design that reflects your brand's true character, not a template adapted to fit it.
              </motion.p>
            </div>

            {/* Focus areas grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE_EDITORIAL }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-charcoal-800 border border-charcoal-800 rounded-2xl overflow-hidden"
            >
              {focusAreas.map((area) => (
                <div
                  key={area.label}
                  className="bg-charcoal-900 p-5 sm:p-6 group hover:bg-charcoal-800/60 transition-colors duration-300"
                >
                  <p className="font-space font-semibold text-warm-white text-sm tracking-wide mb-1 group-hover:text-lime transition-colors">
                    {area.label}
                  </p>
                  <p className="text-warm-muted text-xs font-light leading-relaxed">{area.desc}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.3, ease: EASE_EDITORIAL }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                type="button"
                onClick={scrollToContact}
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-lime hover:bg-lime-hover text-charcoal-950 font-space text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,255,0,0.3)] cursor-pointer"
              >
                START A PROJECT
              </button>
              <div className="flex items-center gap-3 font-mono text-xs text-warm-dim">
                <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                <span className="tracking-[0.2em] uppercase">Accepting Commissions</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Logo mark composition */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: EASE_EDITORIAL }}
              className="relative w-full max-w-sm rounded-3xl border border-charcoal-700/80 bg-charcoal-950 p-8 sm:p-10 shadow-2xl flex flex-col items-center justify-center text-center space-y-6 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-lime/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Rotating accent ring */}
              <div className="absolute inset-4 rounded-2xl border border-dashed border-charcoal-700/60 animate-[spin_40s_linear_infinite]" />

              <div className="relative w-32 h-32 rounded-2xl bg-charcoal-900 border border-charcoal-700 flex items-center justify-center p-5 shadow-inner">
                <img
                  src={vDesignLogo}
                  alt="V DESIGN"
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="space-y-1.5 relative z-10">
                <p className="font-space font-bold text-sm text-warm-white tracking-widest uppercase">
                  V DESIGN STUDIO
                </p>
                <p className="font-mono text-[0.62rem] text-lime tracking-widest uppercase">
                  INDEPENDENT · CREATIVE · INTENTIONAL
                </p>
                <p className="text-warm-muted text-xs font-light pt-1 leading-relaxed">
                  Chennai, India — Open to global commissions.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Disciplines bar */}
        <div className="flex items-center gap-6 pt-4 border-t border-charcoal-800/80 font-mono text-xs text-warm-dim">
          <span className="text-lime font-bold">DISCIPLINES</span>
          <span>/</span>
          <span>IDENTITY &middot; WEB &middot; VIDEO &middot; MOTION &middot; SOCIAL</span>
        </div>
      </div>
    </section>
  );
}
