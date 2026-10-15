import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Play, Sparkles } from 'lucide-react';
import { projects } from '../data/projects';

const EASE_EDITORIAL: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HeroSection() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-advance showreel every 4.5 seconds
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveProjectIndex((prev) => (prev + 1) % projects.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeProject = projects[activeProjectIndex];

  const scrollToWork = () => {
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="opening"
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 sm:pt-32 md:pt-36 pb-10 px-6 md:px-12 lg:px-16 bg-charcoal-950 overflow-hidden transition-colors duration-1000"
      style={{
        backgroundImage: [
          `radial-gradient(ellipse 80% 65% at 72% 40%, ${activeProject.glowColor} 0%, transparent 65%)`,
          `radial-gradient(ellipse 55% 50% at 20% 80%, rgba(180, 70, 10, 0.10) 0%, transparent 70%)`,
          `radial-gradient(ellipse 40% 35% at 85% 85%, rgba(194, 100, 28, 0.06) 0%, transparent 60%)`,
        ].join(', '),
      }}
    >
      {/* Persistent warm amber base — cinematic atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none opacity-100"
        style={{
          background: [
            'radial-gradient(ellipse 50% 40% at 15% 15%, rgba(210,90,20,0.09) 0%, transparent 65%)',
            'radial-gradient(ellipse 35% 30% at 90% 10%, rgba(220,110,30,0.06) 0%, transparent 60%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      {/* Dynamic Showreel Ambient Background Color Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(ellipse 65% 55% at 80% 40%, ${activeProject.glowColor}, transparent)`,
        }}
        aria-hidden="true"
      />

      {/* Cinematic ambient breathe overlay */}
      <div className="absolute inset-0 hero-cinematic-bg pointer-events-none" aria-hidden="true" />

      {/* Restrained CSS ember particles */}
      <div className="ember-container" aria-hidden="true">
        <div className="ember ember-1" />
        <div className="ember ember-2" />
        <div className="ember ember-3" />
        <div className="ember ember-4" />
        <div className="ember ember-5" />
      </div>

      {/* Subtle Architectural Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 max-w-7xl mx-auto px-6 md:px-12"
        aria-hidden="true"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-r border-warm-white h-full" />
        ))}
      </div>

      {/* Chapter 01 Meta Tag */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-2 flex items-center justify-between border-b border-charcoal-800/80 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-lime shadow-[0_0_10px_rgba(212,255,0,0.8)] animate-pulse" />
          <span className="font-mono text-[0.65rem] tracking-[0.25em] text-lime font-bold uppercase">
            CHAPTER 01 &mdash; THE OPENING
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 font-mono text-[0.62rem] text-warm-dim tracking-widest">
          <span>PORTFOLIO SHOWREEL</span>
          <span className="text-charcoal-700">/</span>
          <span className="text-warm-muted">0{activeProjectIndex + 1} OF 0{projects.length}</span>
        </div>
      </div>

      {/* Main Hero Grid: Typographic Statement + Interactive Portfolio Showreel */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Monumental Headline, Supporting Copy, and Dual CTAs */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          <div className="space-y-1 sm:space-y-2">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.85, ease: EASE_EDITORIAL }}
                className="display-hero text-warm-white"
              >
                WE DESIGN
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.15, ease: EASE_EDITORIAL }}
                className="display-hero text-warm-white flex items-baseline flex-wrap"
              >
                <span>IDENTITIES</span>
                <span className="text-lime text-glow-lime ml-1">.</span>
              </motion.div>
            </div>
          </div>

          {/* Supporting copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE_EDITORIAL }}
            className="text-base sm:text-lg md:text-xl font-space font-light text-warm-muted tracking-tight leading-relaxed max-w-lg"
          >
            We build distinctive brands, digital experiences, and cinematic visuals that help businesses stand apart.
          </motion.p>

          {/* Primary CTA and Secondary Navigation CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE_EDITORIAL }}
            className="flex flex-wrap items-center gap-4 sm:gap-5 pt-2"
          >
            {/* Primary CTA: EXPLORE OUR WORK */}
            <button
              type="button"
              onClick={scrollToWork}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-lime hover:bg-lime-hover text-charcoal-950 font-space text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_30px_rgba(212,255,0,0.35)] hover:shadow-[0_0_45px_rgba(212,255,0,0.55)] cursor-pointer"
              aria-label="Explore the work of V DESIGN"
            >
              <span>EXPLORE OUR WORK</span>
              <ArrowDown
                size={16}
                className="text-charcoal-950 transform group-hover:translate-y-1 transition-transform"
              />
            </button>

            {/* Secondary CTA: START A PROJECT */}
            <button
              type="button"
              onClick={scrollToContact}
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full border border-charcoal-700 hover:border-lime bg-charcoal-900/60 hover:bg-charcoal-900 text-warm-white hover:text-lime font-space text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer"
              aria-label="Start a project with V DESIGN"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight
                size={16}
                className="text-lime transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </button>
          </motion.div>
        </div>

        {/* Right Column: Dynamic Cinematic Showreel Visual Stage */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl border border-charcoal-700/80 bg-charcoal-900/80 p-4 sm:p-5 backdrop-blur-xl shadow-2xl overflow-hidden group">
            {/* Showreel Top Bar */}
            <div className="flex items-center justify-between border-b border-charcoal-800 pb-3 mb-3 text-[0.65rem] font-mono">
              <div className="flex items-center gap-2 text-warm-white">
                <Play size={12} className="text-lime fill-lime" />
                <span className="font-bold tracking-widest">SHOWREEL STAGE</span>
              </div>
              <div className="flex items-center gap-2 text-warm-dim">
                <span className="w-1.5 h-1.5 rounded-full bg-lime animate-ping" />
                <span className="tracking-wider text-lime">LIVE PREVIEW</span>
              </div>
            </div>

            {/* Main Stage Artwork Container */}
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-charcoal-950 flex items-center justify-center border border-charcoal-800/80">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.65, ease: EASE_EDITORIAL }}
                  className="relative w-full h-full flex items-center justify-center p-6"
                >
                  <img
                    src={activeProject.image}
                    alt={`${activeProject.title} — ${activeProject.category}`}
                    className="max-h-full max-w-full object-contain filter contrast-[1.03] drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Artwork Tag Badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-lg bg-charcoal-950/85 backdrop-blur-md border border-charcoal-800/90 text-left">
                    <div>
                      <span className="font-mono text-[0.6rem] text-lime font-bold block">
                        {activeProject.number} &mdash; {activeProject.category}
                      </span>
                      <h4 className="font-display font-bold text-sm sm:text-base text-warm-white uppercase tracking-tight">
                        {activeProject.title}
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={scrollToWork}
                      className="p-2 rounded-md bg-charcoal-800 hover:bg-lime text-warm-white hover:text-charcoal-950 transition-colors"
                      title="View Project"
                    >
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Interactive Thumbnail Carousel Ticker (Allows user to click through the 4 projects) */}
            <div className="grid grid-cols-4 gap-2 pt-3">
              {projects.map((proj, idx) => {
                const isCurrent = idx === activeProjectIndex;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => {
                      setActiveProjectIndex(idx);
                      setIsPlaying(false);
                    }}
                    className={`relative rounded-lg overflow-hidden border p-1 text-left transition-all ${
                      isCurrent
                        ? 'border-lime bg-lime/10 shadow-[0_0_12px_rgba(212,255,0,0.3)]'
                        : 'border-charcoal-800 bg-charcoal-950 hover:border-charcoal-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="aspect-square w-full rounded overflow-hidden bg-charcoal-900 flex items-center justify-center mb-1">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-mono text-[0.55rem] font-bold block truncate text-warm-white">
                      {proj.number}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 flex items-center justify-between text-warm-dim font-mono text-[0.62rem]">
        <div className="flex items-center gap-2 text-lime font-semibold">
          <Sparkles size={12} />
          <span>V DESIGN &mdash; INDEPENDENT CREATIVE STUDIO</span>
        </div>
        <button
          type="button"
          onClick={scrollToWork}
          className="flex items-center gap-2 text-warm-muted hover:text-lime transition-colors group cursor-pointer"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={12} className="group-hover:translate-y-0.5 transition-transform text-lime" />
        </button>
      </div>
    </section>
  );
}
