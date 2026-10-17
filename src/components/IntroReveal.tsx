import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { BrandMark } from './BrandMark';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Timings (ms) — kept short and purposeful. */
const HOLD = 1400; // refined, prompt hold time before curtain opens
const HOLD_REDUCED = 800;
const EXIT = 750;
const EXIT_REDUCED = 400;
const SAFETY = 5000; // never allow the intro to block the site

interface IntroRevealProps {
  /** Fired the instant the curtain starts opening — lets the hero animate in underneath. */
  onReveal: () => void;
  /** Fired once the reveal has fully finished and the overlay can unmount. */
  onDone: () => void;
}

export function IntroReveal({ onReveal, onDone }: IntroRevealProps) {
  const reduce = usePrefersReducedMotion();
  const [exiting, setExiting] = useState(false);
  const exitingRef = useRef(false);
  const revealedRef = useRef(false);
  const doneRef = useRef(false);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const startExit = useCallback(() => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    setExiting(true);
    if (!revealedRef.current) {
      revealedRef.current = true;
      onReveal();
    }
  }, [onReveal]);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    clearTimers();
    onDone();
  }, [onDone, clearTimers]);

  // Lock scroll while the intro is on screen.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Timeline + absolute safety net.
  useEffect(() => {
    const holdId = window.setTimeout(startExit, reduce ? HOLD_REDUCED : HOLD);
    const safetyId = window.setTimeout(() => {
      startExit();
      finish();
    }, SAFETY);
    timers.current.push(holdId, safetyId);
    return clearTimers;
  }, [reduce, startExit, finish, clearTimers]);

  // Complete after the curtain has finished opening.
  useEffect(() => {
    if (!exiting) return;
    const id = window.setTimeout(finish, reduce ? EXIT_REDUCED : EXIT);
    timers.current.push(id);
    return () => window.clearTimeout(id);
  }, [exiting, reduce, finish]);

  // Keyboard skips.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault();
        startExit();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [startExit]);

  const handleSkip = (event: React.MouseEvent) => {
    event.stopPropagation();
    startExit();
  };

  // If the logo asset fails, don't block the site.
  const handleLogoError = useCallback(() => {
    if (!revealedRef.current) {
      revealedRef.current = true;
      onReveal();
    }
    finish();
  }, [onReveal, finish]);

  const curtainDuration = reduce ? EXIT_REDUCED / 1000 : EXIT / 1000;

  return (
    <motion.div
      className="fixed inset-0 z-[9990] overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="V DESIGN introduction — press Escape to skip"
      onClick={startExit}
    >
      {/* Opening curtain: two panels part vertically to hand off to the hero */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-[#090B09]"
        initial={false}
        animate={exiting ? (reduce ? { opacity: 0 } : { y: '-101%' }) : { y: 0, opacity: 1 }}
        transition={{ duration: curtainDuration, ease: EASE }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#090B09]"
        initial={false}
        animate={exiting ? (reduce ? { opacity: 0 } : { y: '101%' }) : { y: 0, opacity: 1 }}
        transition={{ duration: curtainDuration, ease: EASE }}
      />

      {/* Restrained warm solar & lime ambient light behind the mark */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(200,245,47,0.12) 0%, rgba(217,119,87,0.06) 42%, transparent 72%)',
        }}
      />

      {/* Logo reveal — clean transparent mark without box */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <motion.div
          className="relative flex items-center justify-center"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
          animate={exiting ? { opacity: 0, scale: reduce ? 1 : 0.98 } : { opacity: 1, scale: 1 }}
          transition={reduce ? { duration: 0.45 } : { duration: exiting ? 0.6 : 0.95, ease: EASE }}
        >
          <BrandMark className="w-[min(58vw,320px)]" onError={handleLogoError} />

          {/* Single subtle warm solar light sweep across the mark */}
          {!reduce && (
            <motion.span
              className="pointer-events-none absolute -inset-y-6 left-0 w-1/3"
              style={{
                background:
                  'linear-gradient(102deg, transparent 0%, rgba(255,160,50,0.18) 50%, transparent 100%)',
              }}
              initial={{ x: '-160%', opacity: 0 }}
              animate={{ x: '260%', opacity: [0, 0.8, 0] }}
              transition={{ duration: 1.1, delay: 0.4, ease: 'easeInOut' }}
              aria-hidden="true"
            />
          )}
        </motion.div>
      </div>

      {/* Caption */}
      <motion.p
        className="absolute inset-x-0 bottom-[22vh] px-6 text-center font-mono text-[0.6rem] uppercase tracking-[0.5em] text-white/45"
        initial={{ opacity: 0, y: reduce ? 0 : 10 }}
        animate={exiting ? { opacity: 0 } : { opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0.5 } : { duration: 0.9, delay: 1.0, ease: EASE }}
      >
        Creative Design Studio
      </motion.p>

      {/* Accessible skip */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute right-5 top-5 z-10 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-white/60 backdrop-blur-sm transition-colors hover:border-lime/60 hover:text-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950 sm:right-8 sm:top-8"
      >
        Skip intro
      </button>

      {/* Progress line */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10">
        <motion.div
          className="h-full bg-lime"
          style={{ transformOrigin: 'left' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: (reduce ? HOLD_REDUCED : HOLD) / 1000, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}
