import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import vDesignLogo from '../assets/brand/V-DESIGN-LOGO.png';

const EASE_CINEMATIC: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function HeroSection() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    // Cinematic opening sequence timing: logo -> studio -> line -> light -> hero reveal
    const timer = setTimeout(() => {
      setIntroDone(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const handleSkipIntro = () => {
    setIntroDone(true);
  };

  const scrollToWork = () => {
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-[#0a0a0a]"
    >
      {/* ══════════════════════════════════════════════════════
          CINEMATIC INTRO OVERLAY (Plays on initial view)
          Sequence: Black Screen -> Logo -> "CREATIVE DESIGN STUDIO" -> Line -> Light
         ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {!introDone && (
          <motion.div
            key="cinematic-curtain"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.9, ease: EASE_CINEMATIC } }}
            onClick={handleSkipIntro}
            className="fixed inset-0 z-[300] bg-[#070707] flex flex-col items-center justify-center p-6 cursor-pointer select-none"
            title="Click to enter immediately"
          >
            {/* Subtle background light glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.4, 0.15], scale: [0.8, 1.2, 1] }}
              transition={{ duration: 2.4, ease: 'easeOut' }}
              className="absolute w-[340px] md:w-[600px] h-[340px] md:h-[600px] rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(201, 169, 110, 0.18) 0%, rgba(201, 169, 110, 0.04) 45%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />

            <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
              {/* Step 1: Real V DESIGN Logo appears */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.25, ease: EASE_CINEMATIC }}
                className="mb-6"
              >
                <img
                  src={vDesignLogo}
                  alt="V DESIGN"
                  className="h-14 sm:h-16 md:h-20 w-auto object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
                />
              </motion.div>

              {/* Step 2: "CREATIVE DESIGN STUDIO" appears */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.85, ease: EASE_CINEMATIC }}
                className="mb-6"
              >
                <p className="text-cream/90 text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase">
                  CREATIVE DESIGN STUDIO
                </p>
              </motion.div>

              {/* Step 3: Thin line draws */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.0, delay: 1.25, ease: EASE_CINEMATIC }}
                className="w-48 sm:w-64 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent origin-center mb-6"
              />

              {/* Step 4: Subtle light movement shimmer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0.3] }}
                transition={{ duration: 1.2, delay: 1.6, ease: 'easeInOut' }}
                className="text-[0.6rem] text-ash/60 tracking-[0.3em] uppercase"
              >
                IDENTITIES · DIGITAL · MOTION
              </motion.div>
            </div>

            {/* Subtle skip prompt */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="absolute bottom-8 text-[0.6rem] text-ash tracking-[0.25em] uppercase"
            >
              CLICK TO ENTER
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════
          BACKGROUND LIGHT & SUBTLE ARCHITECTURAL GRID
         ══════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Cinematic soft radial light bloom */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-40"
          style={{
            background:
              'radial-gradient(circle, rgba(201, 169, 110, 0.08) 0%, rgba(201, 169, 110, 0.02) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Subtle architectural vertical grid line */}
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 lg:px-16 grid grid-cols-12 opacity-15">
          <div className="col-span-1 border-r border-ink-border h-full hidden lg:block" />
          <div className="col-span-10 h-full" />
          <div className="col-span-1 border-l border-ink-border h-full hidden lg:block" />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          TOP BAR ALIGNMENT (Below fixed navigation)
         ══════════════════════════════════════════════════════ */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-28 md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE_CINEMATIC }}
          className="flex items-center justify-between border-b border-ink-border/60 pb-4"
        >
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <p className="label-xs text-cream/80 tracking-[0.28em]">
              V DESIGN — CREATIVE DESIGN STUDIO
            </p>
          </div>
          <p className="label-xs text-ash/60 tracking-[0.25em] hidden sm:block">
            INDEPENDENT STUDIO / 2024
          </p>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════
          MAIN HERO TYPOGRAPHY & GRID
          Hierarchy:
          - CREATIVE DESIGN STUDIO
          - WE DESIGN (Monumental responsive typography)
          - IDENTITIES.
          - SUPPORTING TEXT + CTAs
         ══════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col justify-center w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-10 md:py-14">
        {/* Studio badge */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: EASE_CINEMATIC }}
          className="mb-6 md:mb-8 flex items-center gap-4"
        >
          <span className="h-[1px] w-8 md:w-12 bg-gold/60" />
          <span className="label-xs text-gold tracking-[0.35em] font-semibold">
            CREATIVE DESIGN STUDIO
          </span>
          <span className="label-xs text-ash/40 tracking-[0.2em] hidden sm:inline">
            / BRANDING · DIGITAL · MOTION
          </span>
        </motion.div>

        {/* Monumental Headline with Mask Reveal */}
        <div className="overflow-hidden mb-8 md:mb-10">
          {/* Line 1: WE DESIGN */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '105%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.6, ease: EASE_CINEMATIC }}
              className="text-cream font-black tracking-[-0.04em] uppercase leading-[0.88] select-none"
              style={{ fontSize: 'clamp(3.8rem, 11vw, 11.5rem)' }}
            >
              WE DESIGN
            </motion.h1>
          </div>

          {/* Line 2: IDENTITIES. */}
          <div className="overflow-hidden mt-1 md:mt-2">
            <motion.div
              initial={{ y: '105%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.75, ease: EASE_CINEMATIC }}
              className="font-black tracking-[-0.04em] uppercase leading-[0.88] select-none"
              style={{
                fontSize: 'clamp(3.8rem, 11vw, 11.5rem)',
                color: '#f0ebe3',
              }}
            >
              <span>IDENTITIES.</span>
            </motion.div>
          </div>
        </div>

        {/* Thin cinematic drawn line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.9, ease: EASE_CINEMATIC }}
          className="w-full h-[1px] bg-gradient-to-r from-ink-border via-ink-border to-ink-border origin-left mb-8 md:mb-10"
        />

        {/* Supporting Row: Copy + CTAs aligned to professional grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Supporting Text */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 1.05, ease: EASE_CINEMATIC }}
            className="lg:col-span-7"
          >
            <p className="text-ash text-sm md:text-base lg:text-lg leading-relaxed max-w-xl font-normal">
              Brand identities, digital experiences and motion
              <br className="hidden sm:block" /> crafted with intention.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 1.2, ease: EASE_CINEMATIC }}
            className="lg:col-span-5 flex flex-wrap gap-4 lg:justify-end"
          >
            <button
              onClick={scrollToContact}
              className="btn-primary"
              data-cursor="open"
            >
              <span>START A PROJECT</span>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M2 12L12 2M12 2H5M12 2V9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={scrollToWork}
              className="btn-outline"
              data-cursor="view"
            >
              <span>VIEW WORK</span>
              <span aria-hidden="true" className="text-gold text-xs">↓</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          HERO FOOTER / SCROLL INDICATOR
         ══════════════════════════════════════════════════════ */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-8 md:pb-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.4 }}
          className="flex items-center justify-between border-t border-ink-border/40 pt-4"
        >
          <div className="flex items-center gap-6">
            <span className="label-xs text-ash/40">01 / OVERVIEW</span>
            <span className="label-xs text-ash/40 hidden sm:inline">SELECTED PROJECTS AHEAD</span>
          </div>

          <button
            onClick={scrollToWork}
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Scroll to work"
          >
            <span className="label-xs text-ash/50 group-hover:text-cream transition-colors">
              SCROLL
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-gold"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
