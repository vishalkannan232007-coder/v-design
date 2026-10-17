import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Service {
  id: string;
  num: string;
  title: string;
  description: string;
  code: string;
  accent: string;
  deliverables: string[];
  clientValue: string;
}

const services: Service[] = [
  {
    id: 'logo-design',
    num: '01',
    title: 'Logo Design',
    description:
      'Distinctive visual marks designed to make a brand recognisable and memorable.',
    code: 'Visual Mark',
    accent: '#d4ff00',
    deliverables: [
      'Primary Brandmark & Secondary Lockups',
      'Construction Grid & Proportion Guides',
      'Monogram & High-Contrast Favicon System',
      'Master Vector Formats (.SVG, .AI, .EPS, .PNG)',
    ],
    clientValue: 'Establishes instant visual recognition and iconic brand equity.',
  },
  {
    id: 'brand-identity',
    num: '02',
    title: 'Brand Identity',
    description:
      "A cohesive visual language that brings a brand's personality, colour, typography, and applications together.",
    code: 'Identity System',
    accent: '#e3b23c',
    deliverables: [
      'Comprehensive Brand Guidelines (PDF & Digital)',
      'Curated Color Palette Architecture',
      'Editorial Typography Pairing Scale',
      'Stationery, Packaging & Collateral Templates',
    ],
    clientValue: 'Provides unified consistency across every physical and digital touchpoint.',
  },
  {
    id: 'video-editing',
    num: '03',
    title: 'Video Editing',
    description:
      'Carefully paced edits that transform footage into polished, engaging visual stories.',
    code: 'Post-Production',
    accent: '#79a9c9',
    deliverables: [
      'Narrative & Commercial Pacing Cut',
      'Cinematic Color Correction & Grading',
      'Audio Equalization & Sound Design Mix',
      'Multi-Format Exports (16:9, 4:5, 9:16)',
    ],
    clientValue: 'Transforms raw footage into cinematic, high-retention brand narratives.',
  },
  {
    id: 'cinematic-reels',
    num: '04',
    title: 'Cinematic Reels',
    description:
      'Short-form cinematic visuals designed around atmosphere, rhythm, composition, and storytelling.',
    code: 'Short Form',
    accent: '#d97b5a',
    deliverables: [
      'Vertical 9:16 Cinematic Story Direction',
      'Dynamic Audio Synchronization & Rhythms',
      'Minimal Editorial Text Overlays',
      'Optimized Bitrate for Instagram & Shorts',
    ],
    clientValue: 'Commands immediate thumb-stopping attention in crowded mobile feeds.',
  },
  {
    id: 'social-media-creatives',
    num: '05',
    title: 'Social Media Creatives',
    description:
      'Purposeful visual content designed to communicate clearly across social platforms.',
    code: 'Social Campaign',
    accent: '#dd8fb0',
    deliverables: [
      'Multi-Slide Editorial Carousel Sets',
      'High-Conversion Campaign Ad Creatives',
      'Story & Post Component Systems',
      'Reusable Brand Design Templates',
    ],
    clientValue: 'Maintains an elevated, cohesive visual standard across social channels.',
  },
  {
    id: 'website-design',
    num: '06',
    title: 'Website Design',
    description:
      'Distinctive, responsive websites that combine visual quality with practical usability.',
    code: 'Digital Experience',
    accent: '#3fae95',
    deliverables: [
      'Art-Directed Web Layout Architecture',
      'Fully Responsive Desktop & Mobile Systems',
      'Interactive Micro-Animations & Hover States',
      'Clean Asset Export & Developer Handoff',
    ],
    clientValue: 'Turns casual visitors into engaged clients through bespoke digital craft.',
  },
  {
    id: 'ui-ux-design',
    num: '07',
    title: 'UI/UX Design',
    description:
      'Thoughtful interfaces and user journeys designed around clarity, usability, and consistency.',
    code: 'Interface & Journey',
    accent: '#9b8cf0',
    deliverables: [
      'User Flows, Wireframes & Information Architecture',
      'Interactive Figma Prototypes & User Testing',
      'Modular Component Library & Design Tokens',
      'Accessibility & Usability Validation Specs',
    ],
    clientValue: 'Eliminates friction and creates intuitive, delightful digital products.',
  },
  {
    id: 'motion-graphics',
    num: '08',
    title: 'Motion Graphics',
    description:
      'Animated typography and graphic elements that add energy and character to visual communication.',
    code: 'Kinetic Motion',
    accent: '#e8d5a3',
    deliverables: [
      'Animated Brandmarks & Kinetic Ident Systems',
      'Editorial Kinetic Typography Sequences',
      'Micro-Interactions for Web & App UI',
      'Lottie, MP4 & ProRes Master Deliverables',
    ],
    clientValue: 'Infuses dynamic brand energy, rhythm, and premium polish into screen media.',
  },
];

export function ServicesSection() {
  const reduce = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeService = services[activeIndex];

  const scrollToContactWithService = (serviceName: string) => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    window.setTimeout(() => {
      const select = document.getElementById('service') as HTMLSelectElement | null;
      if (!select) return;
      const targetCat = serviceName.toLowerCase();
      for (let i = 0; i < select.options.length; i++) {
        const optVal = select.options[i].value.toLowerCase();
        if (optVal.includes(targetCat) || targetCat.includes(optVal)) {
          select.selectedIndex = i;
          select.dispatchEvent(new Event('change', { bubbles: true }));
          break;
        }
      }
    }, 400);
  };

  /* Motion animations */
  const headingMask = reduce ? { opacity: 0 } : { y: '112%', opacity: 0 };
  const headingShow = reduce
    ? { opacity: 1, transition: { duration: 0.4 } }
    : { y: 0, opacity: 1, transition: { duration: 0.95, ease: EASE } };
  const lineHidden = reduce ? { opacity: 0 } : { opacity: 0, y: 16 };
  const lineShow = reduce
    ? { opacity: 1, y: 0, transition: { duration: 0.4 } }
    : { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: EASE } };

  return (
    <section
      id="services"
      aria-label="Services Section"
      className="relative overflow-hidden border-b border-charcoal-800 bg-charcoal-950 px-4 py-20 sm:py-28 md:py-36 sm:px-8 md:px-12 lg:px-16"
    >
      {/* Ambient background glow for the showcase panel */}
      <div
        className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 w-full max-w-6xl h-96 opacity-35 blur-[110px]"
        style={{
          background:
            'radial-gradient(ellipse 65% 50% at 50% 30%, rgba(200,245,47,0.2) 0%, rgba(133,139,66,0.12) 45%, transparent 75%)',
        }}
        aria-hidden="true"
      />

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

        {/* ── Section introduction ───────────────────────────────── */}
        <div className="flex flex-col gap-8 border-b border-charcoal-800/80 pb-10 md:flex-row md:items-end md:justify-between relative z-10">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_8px_rgba(200,245,47,0.8)]" />
              <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-lime">
                Chapter 03 — Services
              </p>
            </div>

            <h2 className="display-title overflow-hidden pb-[0.06em] text-warm-white">
              <motion.span
                initial={headingMask}
                whileInView={headingShow}
                viewport={{ once: true, margin: '-80px' }}
                className="block"
              >
                Services<span className="text-lime">.</span>
              </motion.span>
            </h2>

            <motion.p
              initial={lineHidden}
              whileInView={lineShow}
              viewport={{ once: true, margin: '-80px' }}
              className="mt-4 max-w-2xl font-space text-base font-light leading-relaxed text-warm-muted sm:text-lg"
            >
              We partner with forward-thinking brands across eight core disciplines—from initial
              mark conception to immersive digital products and cinematic screen motion.
            </motion.p>
          </div>

          <motion.div
            initial={lineHidden}
            whileInView={lineShow}
            viewport={{ once: true, margin: '-80px' }}
            className="shrink-0 border-l border-charcoal-800 pl-5 font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.24em] text-warm-muted md:border-l-0 md:pl-0 md:text-right"
          >
            <span className="block text-warm-white font-semibold">Eight Studio Disciplines</span>
            <span className="block text-lime">Custom Composed · No Templates</span>
          </motion.div>
        </div>

        {/* ── Capabilities Meta Bar ───────────────────────────────── */}
        <motion.div
          initial={lineHidden}
          whileInView={lineShow}
          viewport={{ once: true, margin: '-60px' }}
          className="mt-8 mb-6 flex flex-wrap items-center justify-between gap-4 font-mono text-[0.65rem] tracking-[0.24em] uppercase text-warm-dim"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-charcoal-700" />
            <span>DISCIPLINES · 01 — 08</span>
          </div>
          <span className="hidden sm:inline text-warm-muted">SELECT A SERVICE TO INSPECT DELIVERABLES</span>
        </motion.div>

        {/* ── Main Editorial Interactive Composition ───────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Editorial 8-Service List */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-3">
            {services.map((service, index) => {
              const isSelected = activeIndex === index;
              return (
                <motion.div
                  key={service.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  whileInView={
                    reduce
                      ? { opacity: 1, transition: { duration: 0.3 } }
                      : {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.7,
                            delay: Math.min(index * 0.05, 0.35),
                            ease: EASE,
                          },
                        }
                  }
                  viewport={{ once: true, margin: '-40px' }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    aria-selected={isSelected}
                    className={`group w-full text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime ${
                      isSelected
                        ? 'bg-charcoal-900/90 border-charcoal-700 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md'
                        : 'bg-charcoal-900/30 border-charcoal-800/80 hover:bg-charcoal-900/60 hover:border-charcoal-700/80 backdrop-blur-sm'
                    }`}
                  >
                    {/* Active Accent Hairline Indicator */}
                    <div
                      className={`absolute top-0 bottom-0 left-0 w-1 transition-all duration-300 ${
                        isSelected ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ backgroundColor: service.accent }}
                    />

                    {/* Background Translucent Sheen on Active */}
                    {isSelected && (
                      <div
                        className="pointer-events-none absolute inset-0 opacity-10 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(90deg, ${service.accent} 0%, transparent 60%)`,
                        }}
                      />
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                      <div className="flex items-baseline gap-4 sm:gap-6">
                        {/* Numeral */}
                        <span
                          className={`font-mono text-xs sm:text-sm font-bold tabular-nums transition-colors duration-200 ${
                            isSelected ? 'text-lime' : 'text-warm-dim'
                          }`}
                        >
                          {service.num}
                        </span>

                        {/* Title */}
                        <h3
                          className={`font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight transition-colors duration-200 ${
                            isSelected ? 'text-warm-white' : 'text-warm-muted group-hover:text-warm-white'
                          }`}
                        >
                          {service.title}
                        </h3>
                      </div>

                      {/* Discipline Code */}
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-warm-dim shrink-0 group-hover:text-warm-muted transition-colors">
                        {service.code}
                      </span>
                    </div>

                    {/* Concise, Clear Description — always visible for high readability */}
                    <p className="mt-2.5 sm:pl-10 text-xs sm:text-sm font-light leading-relaxed text-warm-muted max-w-2xl">
                      {service.description}
                    </p>

                    {/* Mobile Deliverables Peek (shows under description on mobile when selected) */}
                    <div className="mt-3 sm:pl-10 lg:hidden flex flex-wrap gap-2 pt-2 border-t border-charcoal-800/60">
                      {service.deliverables.slice(0, 2).map((item) => (
                        <span
                          key={item}
                          className="font-mono text-[0.58rem] px-2.5 py-1 rounded-full bg-charcoal-800 text-warm-muted border border-charcoal-700/60"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Sticky Refined Glassmorphic Inspector Dossier (Desktop) */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4 sticky top-28">
            <motion.div
              key={activeService.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="rounded-2xl border border-charcoal-700/80 bg-charcoal-900/80 p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden"
              style={{
                boxShadow: `0 20px 50px -10px rgba(0,0,0,0.8), 0 0 30px -15px ${activeService.accent}20`,
              }}
            >
              {/* Restrained subtle corner glow matching active accent */}
              <div
                className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full opacity-20 blur-3xl"
                style={{ backgroundColor: activeService.accent }}
                aria-hidden="true"
              />

              {/* Header meta */}
              <div className="flex items-center justify-between border-b border-charcoal-800 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: activeService.accent }}
                  />
                  <span className="font-mono text-[0.62rem] font-bold tracking-[0.25em] uppercase text-warm-muted">
                    DISCIPLINE {activeService.num}
                  </span>
                </div>
                <span className="font-mono text-[0.58rem] tracking-[0.2em] uppercase text-lime">
                  {activeService.code}
                </span>
              </div>

              {/* Service Title */}
              <h4 className="font-display text-2xl font-black uppercase text-warm-white tracking-tight leading-snug">
                {activeService.title}
              </h4>

              {/* Value Proposition */}
              <p className="mt-3 font-space text-xs font-light text-warm-muted leading-relaxed">
                {activeService.clientValue}
              </p>

              {/* Concrete Client Deliverables */}
              <div className="mt-6 pt-5 border-t border-charcoal-800 space-y-3">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-warm-white flex items-center gap-2">
                  <Sparkles size={11} className="text-lime" />
                  <span>KEY DELIVERABLES</span>
                </p>

                <ul className="space-y-2.5">
                  {activeService.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-xs text-warm-muted">
                      <Check
                        size={13}
                        className="text-lime mt-0.5 shrink-0"
                        style={{ color: activeService.accent }}
                      />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Inquiry CTA for this exact service */}
              <div className="mt-8 pt-6 border-t border-charcoal-800">
                <button
                  type="button"
                  onClick={() => scrollToContactWithService(activeService.title)}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-lime text-charcoal-950 font-space text-xs font-bold tracking-[0.18em] uppercase transition-all duration-300 hover:bg-lime-hover shadow-[0_0_20px_rgba(212,255,0,0.25)] hover:shadow-[0_0_35px_rgba(212,255,0,0.45)] group cursor-pointer"
                >
                  <span>INQUIRE THIS DISCIPLINE</span>
                  <ArrowUpRight
                    size={14}
                    className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Section Footer Hand-off into The Studio ───────────── */}
        <div className="mt-16 pt-8 border-t border-charcoal-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-mono text-[0.62rem] text-warm-dim">
          <span>ALL EIGHT DISCIPLINES CRAFTED WITH BESPOKE INTENTION</span>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-lime hover:underline tracking-widest uppercase inline-flex items-center gap-1.5"
          >
            <span>LOOKING FOR A COMBINED BRAND PACKAGE? LET&apos;S TALK</span>
            <ArrowUpRight size={11} />
          </a>
        </div>
      </div>
    </section>
  );
}
