import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ArrowUpRight } from 'lucide-react';
import { projects, type Project } from '../data/projects';

const EASE_EDITORIAL: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function WorkSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const scrollToContact = (serviceCategory?: string) => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    if (serviceCategory) {
      setTimeout(() => {
        const select = document.getElementById('service') as HTMLSelectElement | null;
        if (select) {
          for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value.toLowerCase().includes('brand identity')) {
              select.selectedIndex = i;
              select.dispatchEvent(new Event('change', { bubbles: true }));
              break;
            }
          }
        }
      }, 400);
    }
  };

  const p1 = projects[0]; // A²
  const p2 = projects[1]; // WELLFIT
  const p3 = projects[2]; // SBG
  const p4 = projects[3]; // KRISHIKA SHREE TRAVELS

  return (
    <section id="work" className="py-24 sm:py-32 md:py-40 px-6 md:px-12 lg:px-16 bg-charcoal-950 border-b border-charcoal-800 relative">
      <div className="max-w-7xl mx-auto space-y-24 md:space-y-36">
        {/* Chapter 02 Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between pb-10 border-b border-charcoal-800 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-lime shadow-[0_0_8px_rgba(212,255,0,0.8)]" />
              <p className="font-mono text-lime font-bold text-xs tracking-[0.25em] uppercase">
                CHAPTER 02 &mdash; THE WORK
              </p>
            </div>
            <h2 className="display-title text-warm-white">
              SELECTED WORK<span className="text-lime">.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-warm-muted text-base leading-relaxed font-light">
              Four authentic client brand identities engineered with intentional typography,
              symbolic weight, and bespoke visual systems.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            PROJECT 01: A² — RETURN GIFT SHOP (GOLD / CHAMPAGNE SCENE)
           ══════════════════════════════════════════════════════════ */}
        <motion.article
          id={p1.id}
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: EASE_EDITORIAL }}
          className="relative rounded-3xl border border-charcoal-800/90 overflow-hidden shadow-2xl transition-all duration-700 hover:border-[#c9a96e]/40"
          style={{
            background: `linear-gradient(135deg, ${p1.accentBg} 0%, rgba(10, 10, 14, 0.95) 100%)`,
          }}
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none rounded-full blur-[140px] opacity-25"
            style={{ backgroundColor: p1.themeColor }}
            aria-hidden="true"
          />

          {/* Exhibition Top Bar */}
          <div className="flex flex-wrap items-center justify-between px-6 sm:px-10 py-5 border-b border-charcoal-800/80 bg-charcoal-950/60 backdrop-blur-md gap-4">
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-lime font-bold">{p1.number}</span>
              <span className="w-3 h-px bg-charcoal-700" />
              <span className="text-warm-white font-space font-semibold tracking-widest uppercase">
                {p1.title} &mdash; {p1.category}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[0.65rem] text-warm-dim">
              <span>AUTHENTIC CLIENT WORK</span>
              <span className="text-charcoal-700">/</span>
              <span>{p1.year}</span>
            </div>
          </div>

          {/* Exhibition Content Grid */}
          <div className="p-6 sm:p-10 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
            {/* Artwork Display Stage */}
            <div className="lg:col-span-7 relative group flex items-center justify-center">
              <div
                className="relative w-full max-w-xl aspect-square rounded-2xl overflow-hidden p-6 sm:p-10 flex items-center justify-center border border-charcoal-800 bg-charcoal-950/80 shadow-2xl transition-all duration-700 group-hover:border-[#c9a96e]/50"
                style={{
                  boxShadow: `0 20px 60px -20px ${p1.glowColor}`,
                }}
              >
                <img
                  src={p1.image}
                  alt={`${p1.title} — ${p1.category}`}
                  className="max-h-full max-w-full object-contain filter contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Inspect Button */}
                <button
                  type="button"
                  onClick={() => setSelectedProject(p1)}
                  className="absolute top-4 right-4 p-3 rounded-full bg-charcoal-900/90 border border-charcoal-700 text-warm-muted hover:text-lime hover:border-lime transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-lg"
                  title="Expand Artwork"
                  aria-label={`View full artwork for ${p1.title}`}
                >
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>

            {/* Typography & Editorial Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold tracking-widest text-lime uppercase block">
                  {p1.number} &mdash; {p1.category}
                </span>
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-warm-white tracking-tight uppercase">
                  {p1.title}
                </h3>
                <p className="font-space text-lg text-warm-muted font-light pt-1">
                  {p1.category}
                </p>
              </div>

              <p className="text-warm-muted text-base leading-relaxed font-light">
                {p1.summary}
              </p>

              {/* Color Swatch Bar Drawn from Artwork */}
              <div className="space-y-2 pt-2">
                <span className="font-mono text-[0.62rem] text-warm-dim tracking-widest block">
                  PALETTE HARMONY
                </span>
                <div className="flex items-center gap-2">
                  {p1.palette.map((hex) => (
                    <div
                      key={hex}
                      className="w-7 h-7 rounded-md border border-charcoal-700 shadow-sm"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-charcoal-800">
                <button
                  type="button"
                  onClick={() => scrollToContact(p1.category)}
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-charcoal-900 hover:bg-lime text-warm-white hover:text-charcoal-950 font-space text-xs font-bold tracking-[0.18em] uppercase transition-all duration-300 border border-charcoal-700 hover:border-lime cursor-pointer group"
                >
                  <span>INQUIRE THIS STYLE</span>
                  <ArrowUpRight size={14} className="text-lime group-hover:text-charcoal-950 transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </motion.article>

        {/* ══════════════════════════════════════════════════════════
            PROJECT 02: WELLFIT — MUA ARTIST (ROSE METALLIC EDITORIAL)
           ══════════════════════════════════════════════════════════ */}
        <motion.article
          id={p2.id}
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: EASE_EDITORIAL }}
          className="relative rounded-3xl border border-charcoal-800/90 overflow-hidden shadow-2xl transition-all duration-700 hover:border-[#d8a48f]/40"
          style={{
            background: `linear-gradient(135deg, ${p2.accentBg} 0%, rgba(10, 10, 14, 0.95) 100%)`,
          }}
        >
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none rounded-full blur-[140px] opacity-25"
            style={{ backgroundColor: p2.themeColor }}
            aria-hidden="true"
          />

          <div className="flex flex-wrap items-center justify-between px-6 sm:px-10 py-5 border-b border-charcoal-800/80 bg-charcoal-950/60 backdrop-blur-md gap-4">
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-lime font-bold">{p2.number}</span>
              <span className="w-3 h-px bg-charcoal-700" />
              <span className="text-warm-white font-space font-semibold tracking-widest uppercase">
                {p2.title} &mdash; {p2.category}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[0.65rem] text-warm-dim">
              <span>AUTHENTIC CLIENT WORK</span>
              <span className="text-charcoal-700">/</span>
              <span>{p2.year}</span>
            </div>
          </div>

          <div className="p-6 sm:p-10 md:p-14 space-y-10">
            {/* Wide Landscape Artwork Display */}
            <div className="relative group flex items-center justify-center">
              <div
                className="relative w-full max-w-4xl aspect-[16/9] sm:aspect-[2/1] rounded-2xl overflow-hidden p-6 sm:p-10 flex items-center justify-center border border-charcoal-800 bg-charcoal-950/80 shadow-2xl transition-all duration-700 group-hover:border-[#d8a48f]/50"
                style={{
                  boxShadow: `0 20px 60px -20px ${p2.glowColor}`,
                }}
              >
                <img
                  src={p2.image}
                  alt={`${p2.title} — ${p2.category}`}
                  className="max-h-full max-w-full object-contain filter contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                <button
                  type="button"
                  onClick={() => setSelectedProject(p2)}
                  className="absolute top-4 right-4 p-3 rounded-full bg-charcoal-900/90 border border-charcoal-700 text-warm-muted hover:text-lime hover:border-lime transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-lg"
                  aria-label={`View full artwork for ${p2.title}`}
                >
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>

            {/* Typography Stack */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
              <div className="lg:col-span-7 space-y-2">
                <span className="font-mono text-xs font-bold tracking-widest text-lime uppercase block">
                  {p2.number} &mdash; {p2.category}
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-warm-white tracking-tight uppercase">
                  {p2.title}
                </h3>
                <p className="text-warm-muted text-base leading-relaxed font-light pt-2 max-w-2xl">
                  {p2.summary}
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col lg:items-end justify-between gap-6">
                <div className="space-y-2">
                  <span className="font-mono text-[0.62rem] text-warm-dim tracking-widest block">
                    ROSE-METALLIC PALETTE
                  </span>
                  <div className="flex items-center gap-2">
                    {p2.palette.map((hex) => (
                      <div
                        key={hex}
                        className="w-7 h-7 rounded-md border border-charcoal-700 shadow-sm"
                        style={{ backgroundColor: hex }}
                        title={hex}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => scrollToContact(p2.category)}
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-charcoal-900 hover:bg-lime text-warm-white hover:text-charcoal-950 font-space text-xs font-bold tracking-[0.18em] uppercase transition-all duration-300 border border-charcoal-700 hover:border-lime cursor-pointer group"
                >
                  <span>INQUIRE BEAUTY IDENTITY</span>
                  <ArrowUpRight size={14} className="text-lime group-hover:text-charcoal-950 transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </motion.article>

        {/* ══════════════════════════════════════════════════════════
            PROJECT 03 & 04: SBG & KRISHIKA SHREE TRAVELS (PARALLEL EXHIBITION)
           ══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
          {/* PROJECT 03: SBG — HOMEMADE BROWNIES */}
          <motion.article
            id={p3.id}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: EASE_EDITORIAL }}
            className="relative rounded-3xl border border-charcoal-800/90 overflow-hidden shadow-2xl transition-all duration-700 hover:border-[#c27d42]/40 flex flex-col justify-between"
            style={{
              background: `linear-gradient(135deg, ${p3.accentBg} 0%, rgba(10, 10, 14, 0.95) 100%)`,
            }}
          >
            <div
              className="absolute top-0 right-0 w-[350px] h-[350px] pointer-events-none rounded-full blur-[120px] opacity-25"
              style={{ backgroundColor: p3.themeColor }}
              aria-hidden="true"
            />

            <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-800/80 bg-charcoal-950/60 backdrop-blur-md">
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-lime font-bold">{p3.number}</span>
                <span className="w-3 h-px bg-charcoal-700" />
                <span className="text-warm-white font-space font-semibold tracking-widest uppercase">
                  {p3.title} &mdash; {p3.category}
                </span>
              </div>
              <span className="font-mono text-[0.65rem] text-warm-dim">{p3.year}</span>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="relative group flex items-center justify-center">
                <div
                  className="relative w-full aspect-square max-w-sm rounded-2xl overflow-hidden p-6 flex items-center justify-center border border-charcoal-800 bg-charcoal-950/80 shadow-2xl transition-all duration-700 group-hover:border-[#c27d42]/50"
                  style={{
                    boxShadow: `0 20px 50px -20px ${p3.glowColor}`,
                  }}
                >
                  <img
                    src={p3.image}
                    alt={`${p3.title} — ${p3.category}`}
                    className="max-h-full max-w-full object-contain filter contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  <button
                    type="button"
                    onClick={() => setSelectedProject(p3)}
                    className="absolute top-4 right-4 p-3 rounded-full bg-charcoal-900/90 border border-charcoal-700 text-warm-muted hover:text-lime hover:border-lime transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-lg"
                    aria-label={`View full artwork for ${p3.title}`}
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs font-bold tracking-widest text-lime uppercase block">
                  {p3.number} &mdash; {p3.category}
                </span>
                <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-warm-white tracking-tight uppercase">
                  {p3.title}
                </h3>
                <p className="text-warm-muted text-sm sm:text-base leading-relaxed font-light pt-1">
                  {p3.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-charcoal-800">
                <div className="flex items-center gap-1.5">
                  {p3.palette.map((hex) => (
                    <div
                      key={hex}
                      className="w-5 h-5 rounded-md border border-charcoal-700"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => scrollToContact(p3.category)}
                  className="inline-flex items-center gap-2 text-xs font-space font-bold uppercase tracking-[0.18em] text-warm-white hover:text-lime transition-colors cursor-pointer group"
                >
                  <span>INQUIRE ARTISAN BRAND</span>
                  <ArrowUpRight size={14} className="text-lime group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </motion.article>

          {/* PROJECT 04: KRISHIKA SHREE TRAVELS */}
          <motion.article
            id={p4.id}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: 0.1, ease: EASE_EDITORIAL }}
            className="relative rounded-3xl border border-charcoal-800/90 overflow-hidden shadow-2xl transition-all duration-700 hover:border-[#0ea5e9]/40 flex flex-col justify-between"
            style={{
              background: `linear-gradient(135deg, ${p4.accentBg} 0%, rgba(10, 10, 14, 0.95) 100%)`,
            }}
          >
            <div
              className="absolute top-0 right-0 w-[350px] h-[350px] pointer-events-none rounded-full blur-[120px] opacity-25"
              style={{ backgroundColor: p4.themeColor }}
              aria-hidden="true"
            />

            <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-800/80 bg-charcoal-950/60 backdrop-blur-md">
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-lime font-bold">{p4.number}</span>
                <span className="w-3 h-px bg-charcoal-700" />
                <span className="text-warm-white font-space font-semibold tracking-widest uppercase">
                  {p4.title} &mdash; {p4.category}
                </span>
              </div>
              <span className="font-mono text-[0.65rem] text-warm-dim">{p4.year}</span>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="relative group flex items-center justify-center">
                <div
                  className="relative w-full aspect-square max-w-sm rounded-2xl overflow-hidden p-6 flex items-center justify-center border border-charcoal-800 bg-charcoal-950/80 shadow-2xl transition-all duration-700 group-hover:border-[#0ea5e9]/50"
                  style={{
                    boxShadow: `0 20px 50px -20px ${p4.glowColor}`,
                  }}
                >
                  <img
                    src={p4.image}
                    alt={`${p4.title} — ${p4.category}`}
                    className="max-h-full max-w-full object-contain filter contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  <button
                    type="button"
                    onClick={() => setSelectedProject(p4)}
                    className="absolute top-4 right-4 p-3 rounded-full bg-charcoal-900/90 border border-charcoal-700 text-warm-muted hover:text-lime hover:border-lime transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-lg"
                    aria-label={`View full artwork for ${p4.title}`}
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs font-bold tracking-widest text-lime uppercase block">
                  {p4.number} &mdash; {p4.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-warm-white tracking-tight uppercase">
                  {p4.title}
                </h3>
                <p className="text-warm-muted text-sm sm:text-base leading-relaxed font-light pt-1">
                  {p4.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-charcoal-800">
                <div className="flex items-center gap-1.5">
                  {p4.palette.map((hex) => (
                    <div
                      key={hex}
                      className="w-5 h-5 rounded-md border border-charcoal-700"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => scrollToContact(p4.category)}
                  className="inline-flex items-center gap-2 text-xs font-space font-bold uppercase tracking-[0.18em] text-warm-white hover:text-lime transition-colors cursor-pointer group"
                >
                  <span>INQUIRE TRAVEL BRAND</span>
                  <ArrowUpRight size={14} className="text-lime group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </motion.article>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          ACCESSIBLE LIGHTBOX INSPECTOR FOR ORIGINAL ARTWORK
         ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal-950/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 select-none"
            onClick={() => setSelectedProject(null)}
          >
            {/* Lightbox Header */}
            <div
              className="flex items-center justify-between border-b border-charcoal-800 pb-4 max-w-6xl mx-auto w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-lime font-bold text-sm">
                  {selectedProject.number}
                </span>
                <span className="w-3 h-px bg-charcoal-700" />
                <span className="font-space text-sm font-bold text-warm-white tracking-widest uppercase">
                  {selectedProject.title} &mdash; {selectedProject.category}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="p-2.5 rounded-full border border-charcoal-700 bg-charcoal-900 text-warm-muted hover:text-lime hover:border-lime transition-colors cursor-pointer"
                aria-label="Close Preview"
              >
                <X size={18} />
              </button>
            </div>

            {/* Lightbox Image Stage */}
            <div
              className="my-auto flex items-center justify-center p-4 max-w-4xl mx-auto w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedProject.image}
                alt={`${selectedProject.title} — ${selectedProject.category}`}
                className="max-h-[75vh] w-auto max-w-full object-contain shadow-2xl rounded-2xl border border-charcoal-800"
              />
            </div>

            {/* Lightbox Footer */}
            <div
              className="flex items-center justify-between border-t border-charcoal-800 pt-4 max-w-6xl mx-auto w-full font-mono text-warm-dim text-[0.65rem]"
              onClick={(e) => e.stopPropagation()}
            >
              <span>{selectedProject.category}</span>
              <span className="text-lime">AUTHENTIC V DESIGN CLIENT ARCHIVE</span>
              <span>CLICK ANYWHERE OR ESC TO CLOSE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
