import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { WhiteMagneticFieldBackground } from '../components/WhiteMagneticFieldBackground';
import { LiquidGlassOverlay } from '../components/LiquidGlassOverlay';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface HeroSectionProps {
  /** When true, the hero entrance choreography plays (set after the intro reveals). */
  started: boolean;
}

export function HeroSection({ started }: HeroSectionProps) {
  const reduce = usePrefersReducedMotion();

  const scrollToWork = () => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  const hiddenLine = reduce ? { opacity: 0 } : { y: '115%', opacity: 0 };
  const showLine = (delay: number) =>
    reduce
      ? { opacity: 1, transition: { duration: 0.4 } }
      : { y: 0, opacity: 1, transition: { duration: 0.95, delay, ease: EASE } };
  const fade = (delay: number) =>
    reduce
      ? { opacity: 1, y: 0, transition: { duration: 0.4 } }
      : { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: EASE } };
  const fadeHidden = (from = 18) => ({ opacity: 0, y: reduce ? 0 : from });

  return (
    <section
      id="opening"
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#090B09]"
    >
      {/* LAYER 1 & 2: Base Dark Background + White Magnetic-Field Particle Simulation */}
      <WhiteMagneticFieldBackground started={started} />

      {/* LAYER 3: Translucent Green Liquid-Glass Shader Effect */}
      <LiquidGlassOverlay className="z-[1]" intensity="medium" />

      {/* LAYER 4: Subtle Readability Overlay (preserves clean contrast for left-aligned typography) */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(90deg, rgba(9,11,9,0.92) 0%, rgba(9,11,9,0.68) 36%, rgba(9,11,9,0.15) 70%, transparent 92%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-48"
        aria-hidden="true"
        style={{ background: 'linear-gradient(to top, rgba(9,11,9,0.96) 0%, transparent 100%)' }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-1 flex-col px-6 pb-10 pt-28 sm:pt-32 md:px-12 lg:px-16">
        {/* Top meta row */}
        <motion.div
          initial={fadeHidden(12)}
          animate={started ? fade(0.05) : fadeHidden(12)}
          className="flex items-center justify-between border-b border-white/[0.08] pb-4"
        >
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_10px_rgba(200,245,47,0.8)]" />
            <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.34em] text-lime">
              V&nbsp;DESIGN
            </span>
          </div>
          <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.3em] text-warm-white/40 sm:block">
            Creative Studio — Portfolio 2026
          </span>
        </motion.div>

        {/* Main typographic statement + Proof cards */}
        <div className="flex flex-1 flex-col justify-center py-8 sm:py-12">
          {/* Status pill badge inspired by Reference 1 */}
          <motion.div
            initial={fadeHidden(14)}
            animate={started ? fade(0.08) : fadeHidden(14)}
            className="mb-5 inline-flex items-center gap-2.5 self-start rounded-full border border-lime/25 bg-charcoal-900/85 px-4 py-1.5 backdrop-blur-md shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_8px_#C8F52F] animate-pulse" />
            <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-lime">
              Available for Commissions · 2026
            </span>
          </motion.div>

          {/* Headline on the visually quieter side */}
          <h1 className="display-cinematic max-w-[15ch] text-warm-white">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={hiddenLine}
                animate={started ? showLine(0.12) : hiddenLine}
              >
                Creative
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={hiddenLine}
                animate={started ? showLine(0.24) : hiddenLine}
              >
                Direction For
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={hiddenLine}
                animate={started ? showLine(0.36) : hiddenLine}
              >
                Bold Brands<span className="text-lime">.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={fadeHidden(18)}
            animate={started ? fade(0.55) : fadeHidden(18)}
            className="mt-6 max-w-xl font-space text-base font-light leading-relaxed tracking-tight text-warm-white/70 sm:text-lg md:text-xl"
          >
            V&nbsp;DESIGN is an independent studio shaping brand identities, visual storytelling and
            website experiences — crafted with intention.
          </motion.p>

          {/* CTAs: Clear START A PROJECT + EXPLORE WORK */}
          <motion.div
            initial={fadeHidden(20)}
            animate={started ? fade(0.7) : fadeHidden(20)}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={scrollToContact}
              className="pill-btn-lime group cursor-pointer text-xs font-bold sm:text-sm !py-3.5 !px-8"
              aria-label="Start a project with V DESIGN"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={scrollToWork}
              className="pill-btn-dark group cursor-pointer text-xs font-semibold sm:text-sm !py-3.5 !px-7"
              aria-label="Explore the portfolio work of V DESIGN"
            >
              <span>EXPLORE WORK</span>
              <ArrowDown size={15} className="transition-transform duration-200 group-hover:translate-y-0.5" />
            </button>
          </motion.div>

          {/* Wayfare Reference-1 inspired floating proof cards (Desktop) */}
          <motion.div
            initial={fadeHidden(24)}
            animate={started ? fade(0.85) : fadeHidden(24)}
            className="mt-12 hidden grid-cols-1 gap-4 sm:grid-cols-2 lg:grid lg:max-w-2xl"
          >
            <div className="rounded-2xl border border-white/[0.08] bg-[#141712]/75 p-4 backdrop-blur-md transition-all duration-300 hover:border-lime/30">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.6rem] uppercase tracking-widest text-lime">
                  SELECTED WORK
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-lime/80" />
              </div>
              <p className="mt-1 font-display text-xl font-bold text-warm-white">
                04 Curated Brands
              </p>
              <p className="mt-0.5 font-sans text-xs text-warm-muted">
                A² · Wellfit · SBG · Krishika Shree
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#141712]/75 p-4 backdrop-blur-md transition-all duration-300 hover:border-lime/30">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.6rem] uppercase tracking-widest text-lime">
                  STUDIO ETHOS
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-lime/80" />
              </div>
              <p className="mt-1 font-display text-xl font-bold text-warm-white">
                100% Bespoke Craft
              </p>
              <p className="mt-0.5 font-sans text-xs text-warm-muted">
                Zero templates · Built with intention
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom row — scroll indicator + studio meta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={
            started
              ? { opacity: 1, transition: reduce ? { duration: 0.4 } : { duration: 0.8, delay: 0.9, ease: EASE } }
              : { opacity: 0 }
          }
          className="flex items-end justify-between border-t border-white/[0.08] pt-5"
        >
          <button
            type="button"
            onClick={scrollToWork}
            className="group flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-warm-white/50 transition-colors hover:text-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
          >
            <span className="relative block h-8 w-px overflow-hidden bg-white/15">
              <span className="scroll-line absolute inset-0 block bg-lime" />
            </span>
            <span>Scroll to explore</span>
          </button>
          <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.28em] text-warm-white/35 md:block">
            Independent by design — Est. 2026
          </span>
        </motion.div>
      </div>
    </section>
  );
}
