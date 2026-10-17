import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, X, ArrowUpRight, Eye } from 'lucide-react';
import { projects, type Project } from '../data/projects';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const AUTOPLAY_MS = 5000;
const DISCIPLINE = 'Brand Identity / Logo Design';

export function WorkSection() {
  const reduce = usePrefersReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [lightbox, setLightbox] = useState<Project | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const count = projects.length;
  const isInteracting = hovering || focused;

  const announce = useCallback(
    (index: number) => {
      const project = projects[index];
      setAnnouncement(`Project ${index + 1} of ${count}: ${project.title} — ${project.category}`);
    },
    [count],
  );

  const goTo = useCallback(
    (index: number) => {
      const nextIndex = (index + count) % count;
      setActiveIndex(nextIndex);
      announce(nextIndex);
    },
    [count, announce],
  );

  const nextProject = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex]);
  const prevProject = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex]);

  // Autoplay handler
  useEffect(() => {
    if (reduce || userPaused || isInteracting || !inView || lightbox !== null) return;
    const timer = window.setInterval(nextProject, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [reduce, userPaused, isInteracting, inView, lightbox, nextProject]);

  // Intersection observer to pause offscreen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.15,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Keyboard navigation on slider region
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (lightbox !== null) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextProject();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      prevProject();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goTo(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goTo(count - 1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(projects[activeIndex]);
    }
  };

  const openLightbox = (project: Project) => {
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    setLightbox(project);
  };

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    window.setTimeout(() => returnFocusRef.current?.focus(), 50);
  }, []);

  // Lock body scroll while lightbox is active
  useEffect(() => {
    if (!lightbox) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightbox]);

  // Escape key for lightbox
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, closeLightbox]);

  const scrollToContact = (category?: string) => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    if (!category) return;
    window.setTimeout(() => {
      const select = document.getElementById('service') as HTMLSelectElement | null;
      if (!select) return;
      const target = category.toLowerCase();
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value.toLowerCase().includes(target)) {
          select.selectedIndex = i;
          select.dispatchEvent(new Event('change', { bubbles: true }));
          break;
        }
      }
    }, 400);
  };

  const activeProject = projects[activeIndex];

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative overflow-hidden border-b border-charcoal-800 bg-charcoal-950 px-4 py-20 sm:py-28 md:py-36 sm:px-8 md:px-12 lg:px-16"
    >
      {/* Ambient background radial aura */}
      <div
        className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 w-full max-w-6xl h-96 opacity-35 blur-[120px]"
        style={{
          background:
            'radial-gradient(ellipse 65% 50% at 50% 30%, rgba(200,245,47,0.22) 0%, rgba(133,139,66,0.12) 45%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* Main Showcase Panel Container */}
      <div className="relative mx-auto max-w-7xl showcase-panel p-6 sm:p-10 md:p-12 lg:p-14">
        {/* Subtle interior glow */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-25"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(200,245,47,0.22) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* ── Section Header ─────────────────────────────────────── */}
        <div className="flex flex-col gap-8 border-b border-charcoal-800/80 pb-10 md:flex-row md:items-end md:justify-between relative z-10">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_8px_rgba(200,245,47,0.8)]" />
              <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-lime">
                Chapter 02 — The Work
              </p>
            </div>

            <h2 className="display-title overflow-hidden pb-[0.06em] text-warm-white">
              The Work<span className="text-lime">.</span>
            </h2>

            <p className="mt-4 max-w-lg font-space text-base font-light leading-relaxed text-warm-muted sm:text-lg">
              Selected identities. Distinctive ideas. Built to be remembered.
            </p>
          </div>

          <div className="shrink-0 border-l border-charcoal-800 pl-5 font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.24em] text-warm-muted md:border-l-0 md:pl-0 md:text-right">
            <span className="block text-warm-white font-semibold">Selected Client Archive</span>
            <span className="block text-lime">04 Curated Projects / 2024</span>
          </div>
        </div>

        {/* ── 3D Coverflow Reel Slider Stage ─────────────────────── */}
        <div
          className="relative mt-12 sm:mt-16 md:mt-20 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime rounded-3xl"
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="V DESIGN selected client project reel"
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          {/* Coverflow Viewport with 3D Perspective */}
          <div
            className="relative h-[440px] sm:h-[520px] md:h-[580px] w-full flex items-center justify-center overflow-hidden sm:overflow-visible select-none"
            style={{ perspective: reduce ? 'none' : '1200px' }}
          >
            {projects.map((project, index) => {
              const offset = index - activeIndex;
              const isActive = offset === 0;

              // Responsive calculations for 3D transforms
              let xPercent = 0;
              let rotateY = 0;
              let scale = 1;
              let zIndex = 30;
              let opacity = 1;
              let filter = 'blur(0px)';

              if (reduce) {
                // Reduced motion: 2D side-by-side transition
                xPercent = offset * 75;
                scale = isActive ? 1 : 0.88;
                opacity = isActive ? 1 : 0.45;
                zIndex = 30 - Math.abs(offset) * 5;
              } else {
                if (isActive) {
                  xPercent = 0;
                  rotateY = 0;
                  scale = 1;
                  zIndex = 30;
                  opacity = 1;
                  filter = 'blur(0px)';
                } else if (offset === -1) {
                  xPercent = -68;
                  rotateY = 25;
                  scale = 0.84;
                  zIndex = 20;
                  opacity = 0.6;
                  filter = 'blur(1px)';
                } else if (offset === 1) {
                  xPercent = 68;
                  rotateY = -25;
                  scale = 0.84;
                  zIndex = 20;
                  opacity = 0.6;
                  filter = 'blur(1px)';
                } else if (offset < -1) {
                  xPercent = -120;
                  rotateY = 38;
                  scale = 0.72;
                  zIndex = 10;
                  opacity = 0.25;
                  filter = 'blur(3px)';
                } else {
                  xPercent = 120;
                  rotateY = -38;
                  scale = 0.72;
                  zIndex = 10;
                  opacity = 0.25;
                  filter = 'blur(3px)';
                }
              }

              return (
                <motion.div
                  key={project.id}
                  className="absolute top-1/2 left-1/2 cursor-pointer will-change-transform"
                  style={{
                    width: 'min(82vw, 360px)',
                    height: 'min(125vw, 530px)',
                    zIndex,
                  }}
                  animate={{
                    x: `calc(-50% + ${xPercent}%)`,
                    y: '-50%',
                    rotateY: reduce ? 0 : rotateY,
                    scale,
                    opacity,
                    filter: reduce ? 'none' : filter,
                  }}
                  transition={{
                    duration: 0.65,
                    ease: EASE,
                  }}
                  onClick={() => {
                    if (isActive) {
                      openLightbox(project);
                    } else {
                      goTo(index);
                    }
                  }}
                  // Swipe/Drag gesture support on active or neighbor cards
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_e, { offset: dragOffset, velocity }) => {
                    if (dragOffset.x < -40 || velocity.x < -300) {
                      nextProject();
                    } else if (dragOffset.x > 40 || velocity.x > 300) {
                      prevProject();
                    }
                  }}
                >
                  {/* Portrait Card Surface */}
                  <div
                    className={`relative w-full h-full rounded-[24px] sm:rounded-[28px] border transition-all duration-500 overflow-hidden flex flex-col justify-between ${
                      isActive
                        ? 'border-lime/60 bg-[#161A13] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_35px_-5px_rgba(200,245,47,0.22)]'
                        : 'border-white/10 bg-[#141712] hover:border-white/20'
                    }`}
                  >
                    {/* Top ambient color reflection matching project */}
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-44 opacity-25"
                      style={{
                        background: `radial-gradient(ellipse at 50% 0%, ${project.themeColor} 0%, transparent 70%)`,
                      }}
                      aria-hidden="true"
                    />

                    {/* Card Header Row */}
                    <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] px-5 sm:px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: project.themeColor }}
                        />
                        <span className="font-mono text-xs font-bold tracking-[0.25em] text-lime">
                          {project.number}
                        </span>
                      </div>
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-warm-muted">
                        {project.year}
                      </span>
                    </div>

                    {/* Artwork Center Stage — Real project image displayed pristine without clipping */}
                    <div className="relative z-10 flex-1 flex items-center justify-center p-6 sm:p-8 overflow-hidden group/art">
                      {/* Subdued project number watermark in background */}
                      <span
                        className="pointer-events-none absolute select-none font-display font-black text-[clamp(6rem,16vw,10rem)] leading-none opacity-[0.06] text-warm-white"
                        aria-hidden="true"
                      >
                        {project.number}
                      </span>

                      <img
                        src={project.image}
                        alt={`Original brand asset for ${project.title}`}
                        className="max-h-full max-w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] transition-transform duration-700 ease-out group-hover/art:scale-105"
                      />
                    </div>

                    {/* Card Footer Identity Block */}
                    <div className="relative z-10 border-t border-white/[0.08] bg-[#141712]/80 backdrop-blur-md px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-warm-white truncate">
                          {project.title}
                        </h3>
                        <p className="mt-0.5 font-space text-xs font-light text-warm-muted truncate">
                          {project.category}
                        </p>
                      </div>

                      {/* Pill Preview Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(project);
                        }}
                        className={`pill-btn-lime shrink-0 !py-2 !px-4 text-[0.68rem] font-bold shadow-md ${
                          !isActive ? 'opacity-70 group-hover:opacity-100' : ''
                        }`}
                        aria-label={`Inspect ${project.title} artwork`}
                      >
                        <span>Preview</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Active Project Detail Banner & Transport Controls ──── */}
          <div className="mt-8 sm:mt-12 pt-8 border-t border-charcoal-800/80 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
            {/* Left: Active Project Focus Specs */}
            <div className="space-y-1.5 max-w-md">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-lime tracking-widest">
                  {activeProject.number} / {String(count).padStart(2, '0')}
                </span>
                <span className="h-px w-4 bg-charcoal-700" />
                <span className="font-mono text-[0.62rem] uppercase tracking-widest text-warm-dim">
                  {DISCIPLINE}
                </span>
              </div>
              <p className="font-display text-xl sm:text-2xl font-bold uppercase text-warm-white tracking-tight">
                {activeProject.title} — {activeProject.category}
              </p>
              <p className="font-space text-xs sm:text-sm font-light text-warm-muted leading-relaxed line-clamp-2">
                {activeProject.summary}
              </p>
            </div>

            {/* Right: Progress Indicator + Previous / Next Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 shrink-0">
              {/* Segmented Progress Pills */}
              <div className="flex items-center gap-2">
                {projects.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => goTo(idx)}
                    aria-label={`Jump to project ${idx + 1}: ${p.title}`}
                    aria-current={idx === activeIndex ? 'true' : undefined}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeIndex ? 'w-10 bg-lime shadow-[0_0_8px_#C8F52F]' : 'w-4 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next & Autoplay Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={prevProject}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal-700 bg-charcoal-900/80 text-warm-white transition-all duration-200 hover:border-lime hover:text-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime cursor-pointer"
                  aria-label="Previous project in reel"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={nextProject}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal-700 bg-charcoal-900/80 text-warm-white transition-all duration-200 hover:border-lime hover:text-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime cursor-pointer"
                  aria-label="Next project in reel"
                >
                  <ChevronRight size={18} />
                </button>

                {!reduce && (
                  <button
                    type="button"
                    onClick={() => setUserPaused((p) => !p)}
                    className="flex h-11 items-center justify-center gap-2 rounded-full border border-charcoal-700 bg-charcoal-900/80 px-4 font-mono text-[0.62rem] uppercase tracking-widest text-warm-white transition-all duration-200 hover:border-lime hover:text-lime cursor-pointer"
                    aria-label={userPaused ? 'Play reel autoplay' : 'Pause reel autoplay'}
                  >
                    {userPaused ? <Play size={13} className="text-lime" /> : <Pause size={13} />}
                    <span className="hidden sm:inline">{userPaused ? 'PLAY' : 'PAUSE'}</span>
                  </button>
                )}

                {/* Inspect artwork CTA */}
                <button
                  type="button"
                  onClick={() => openLightbox(activeProject)}
                  className="pill-btn-dark !py-2.5 !px-5 text-[0.7rem] font-bold cursor-pointer hidden lg:inline-flex"
                >
                  <Eye size={13} className="text-lime" />
                  <span>VIEW FULL CASE</span>
                </button>
              </div>
            </div>
          </div>

          {/* Accessible Screen Reader Announcer */}
          <p className="sr-only" role="status" aria-live="polite">
            {announcement}
          </p>
        </div>
      </div>

      {/* ── Artwork Lightbox Inspection Modal ────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${lightbox.title} project details`}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] flex select-none flex-col justify-between bg-charcoal-950/95 p-6 backdrop-blur-2xl sm:p-10"
          >
            {/* Lightbox Header */}
            <div
              className="mx-auto flex w-full max-w-6xl items-center justify-between border-b border-charcoal-800 pb-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold text-lime">{lightbox.number}</span>
                <span className="h-px w-3 bg-charcoal-700" />
                <span className="font-space text-sm font-bold uppercase tracking-widest text-warm-white">
                  {lightbox.title} — {lightbox.category}
                </span>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeLightbox}
                aria-label="Close preview"
                className="cursor-pointer rounded-full border border-charcoal-700 bg-charcoal-900 p-2.5 text-warm-muted transition-colors hover:border-lime hover:text-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
              >
                <X size={18} />
              </button>
            </div>

            {/* Lightbox Center Artwork */}
            <div
              className="mx-auto my-auto flex w-full max-w-4xl items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.image}
                alt={`Original brand asset for ${lightbox.title} — ${lightbox.category}`}
                className="max-h-[66vh] w-auto max-w-full rounded-2xl border border-charcoal-800 object-contain shadow-2xl"
              />
            </div>

            {/* Lightbox Footer */}
            <div
              className="mx-auto flex w-full max-w-6xl flex-col gap-4 border-t border-charcoal-800 pt-4 sm:flex-row sm:items-center sm:justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-xl">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-lime">
                  {DISCIPLINE}
                </p>
                <p className="mt-1.5 font-space text-sm font-light leading-relaxed text-warm-muted">
                  {lightbox.summary}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const cat = lightbox.category;
                  closeLightbox();
                  scrollToContact(cat);
                }}
                className="pill-btn-lime cursor-pointer shrink-0 !py-3 !px-6 text-xs font-bold"
              >
                <span>START A SIMILAR PROJECT</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
