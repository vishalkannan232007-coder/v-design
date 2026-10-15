import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const EASE_EDITORIAL: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface ServiceCategory {
  id: string;
  num: string;
  title: string;
  oneLiner: string;
  deliverables: string[];
  themeColor: string;
  glowColor: string;
}

const services: ServiceCategory[] = [
  {
    id: 'logo-design',
    num: '01',
    title: 'LOGO DESIGN',
    oneLiner: "Marks that carry meaning — distinctive, timeless symbols built around your brand's core idea.",
    deliverables: ['Custom Wordmarks', 'Emblems & Monograms', 'Symbol Marks', 'Logomark Variations'],
    themeColor: '#e5b869',
    glowColor: 'rgba(229, 184, 105, 0.25)',
  },
  {
    id: 'brand-identity',
    num: '02',
    title: 'BRAND IDENTITY',
    oneLiner: 'Strategic visual systems, bespoke typography, and enduring brand languages that hold across every touchpoint.',
    deliverables: ['Brand Strategy', 'Typography Guidelines', 'Colour Systems', 'Packaging Architecture'],
    themeColor: '#e5a040',
    glowColor: 'rgba(229, 160, 64, 0.25)',
  },
  {
    id: 'website-design',
    num: '03',
    title: 'WEBSITE DESIGN + DEV',
    oneLiner: 'High-conversion digital flagships engineered with fluid motion, responsive precision, and performance.',
    deliverables: ['Creative + Portfolio Sites', 'Landing Pages', 'Design Systems + UI Kits', 'Fluid Micro-Interactions'],
    themeColor: '#d4ff00',
    glowColor: 'rgba(212, 255, 0, 0.25)',
  },
  {
    id: 'ui-ux-design',
    num: '04',
    title: 'UI/UX DESIGN',
    oneLiner: 'Thoughtful user interfaces built on clear flows, visual hierarchy, and seamless interaction patterns.',
    deliverables: ['User Journey Mapping', 'Wireframes + Prototypes', 'Component Libraries', 'Usability Reviews'],
    themeColor: '#a78bfa',
    glowColor: 'rgba(167, 139, 250, 0.25)',
  },
  {
    id: 'cinematic-video',
    num: '05',
    title: 'VIDEO EDITING + REELS',
    oneLiner: 'Narrative cutting, high-impact pacing, cinematic colour grading, and sonic rhythm for brand films.',
    deliverables: ['Commercial + Launch Reels', 'Brand Campaign Cuts', 'Colour Grading', 'Dynamic Soundscapes'],
    themeColor: '#0ea5e9',
    glowColor: 'rgba(14, 165, 233, 0.25)',
  },
  {
    id: 'motion-graphics',
    num: '06',
    title: 'MOTION GRAPHICS',
    oneLiner: "Kinetic typography, animated ident systems, and dynamic visual collateral that brings your brand to life.",
    deliverables: ['Kinetic Typography', 'Animated Logo Idents', '2D Vector Motion', 'Social Campaign Templates'],
    themeColor: '#d8a48f',
    glowColor: 'rgba(216, 164, 143, 0.25)',
  },
  {
    id: 'social-media',
    num: '07',
    title: 'SOCIAL MEDIA CREATIVES',
    oneLiner: "On-brand, scroll-stopping visual content systems — templates, posts, stories, and campaign graphics.",
    deliverables: ['Post + Story Templates', 'Campaign Graphics', 'Branded Highlight Covers', 'Content Calendars'],
    themeColor: '#f472b6',
    glowColor: 'rgba(244, 114, 182, 0.25)',
  },
];

function ServiceDemoPane({ activeId, activeService }: { activeId: string; activeService: ServiceCategory }) {
  return (
    <div
      className="relative rounded-2xl border border-charcoal-800 bg-charcoal-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl overflow-hidden min-h-[440px] flex flex-col justify-between transition-all duration-700"
      style={{ boxShadow: `0 20px 60px -20px ${activeService.glowColor}` }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-charcoal-800 pb-4 mb-6 font-mono text-[0.62rem]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
          <span className="text-warm-white font-bold">{activeService.num} // VISUAL STAGE</span>
        </div>
        <span className="uppercase font-semibold" style={{ color: activeService.themeColor }}>
          {activeService.title}
        </span>
      </div>

      {/* Dynamic demo graphic */}
      <div className="my-auto py-4 flex items-center justify-center min-h-[200px]">
        <AnimatePresence mode="wait">

          {/* LOGO DESIGN */}
          {activeId === 'logo-design' && (
            <motion.div
              key="logo-demo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
              className="w-full flex flex-col items-center justify-center relative py-6"
            >
              <div className="relative w-52 h-52 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[#e5b869]/30 border-dashed animate-[spin_50s_linear_infinite]" />
                <div className="absolute inset-5 rounded-full border border-[#e5b869]/20" />
                <div
                  className="relative z-10 w-28 h-28 rounded-3xl bg-charcoal-950 border-2 flex items-center justify-center"
                  style={{ borderColor: '#e5b869', boxShadow: '0 0 40px rgba(229,184,105,0.25)' }}
                >
                  <div className="flex flex-col items-center leading-none">
                    <span className="font-display font-black text-5xl text-warm-white">V</span>
                    <span className="font-mono text-[0.5rem] tracking-[0.3em] text-warm-dim mt-0.5">DESIGN</span>
                  </div>
                </div>
              </div>
              <span className="font-mono text-[0.62rem] text-warm-muted mt-4">LOGOMARK // GEOMETRIC GRID RATIO</span>
            </motion.div>
          )}

          {/* BRAND IDENTITY */}
          {activeId === 'brand-identity' && (
            <motion.div
              key="brand-demo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
              className="w-full flex flex-col items-center gap-4 py-4"
            >
              <div className="w-full max-w-xs space-y-3 text-left">
                <div className="space-y-1">
                  <span className="font-mono text-[0.55rem] text-warm-dim tracking-widest block">PRIMARY TYPEFACE</span>
                  <span className="font-display font-black text-3xl text-warm-white tracking-tight">SYNE BOLD 800</span>
                </div>
                <div className="flex gap-2 items-center pt-1">
                  {['#e5a040', '#fbfbfa', '#e5b869', '#060608'].map((c) => (
                    <div key={c} className="w-8 h-8 rounded-lg border border-charcoal-700 shadow-sm" style={{ background: c }} title={c} />
                  ))}
                </div>
                <div className="h-px bg-charcoal-700 w-full" />
                <p className="text-warm-dim text-xs font-light">Brand system, guidelines, and collateral architecture.</p>
              </div>
              <span className="font-mono text-[0.62rem] text-warm-muted">IDENTITY SYSTEM // VISUAL LANGUAGE</span>
            </motion.div>
          )}

          {/* WEBSITE DESIGN */}
          {activeId === 'website-design' && (
            <motion.div
              key="web-demo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
              className="w-full max-w-sm space-y-3 py-4"
            >
              <div className="border border-charcoal-700 bg-charcoal-950 rounded-xl p-4 shadow-xl space-y-3">
                <div className="flex items-center justify-between border-b border-charcoal-800 pb-2">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-charcoal-700" />
                    <span className="w-2 h-2 rounded-full bg-charcoal-700" />
                    <span className="w-2 h-2 rounded-full bg-lime" />
                  </div>
                  <span className="font-mono text-[0.55rem] text-warm-dim">VIEWPORT // 1440 x 900</span>
                </div>
                <div className="space-y-2">
                  <div className="h-6 w-3/4 bg-lime/20 rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-charcoal-800 rounded" />
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {[0, 1].map((i) => (
                    <div key={i} className="h-16 rounded bg-charcoal-900 border border-charcoal-800 p-2 flex flex-col justify-between">
                      <span className="w-4 h-4 rounded-full bg-lime/40" />
                      <div className="h-2 w-3/4 bg-charcoal-800 rounded" />
                    </div>
                  ))}
                </div>
              </div>
              <span className="font-mono text-[0.62rem] text-lime block text-center">INTERACTIVE DESIGN SYSTEM // FLUID MOTION</span>
            </motion.div>
          )}

          {/* UI/UX DESIGN */}
          {activeId === 'ui-ux-design' && (
            <motion.div
              key="uiux-demo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
              className="w-full max-w-sm space-y-3 py-4"
            >
              <div className="border border-charcoal-700 bg-charcoal-950 rounded-xl p-4 space-y-3">
                <div className="flex gap-2">
                  <div className="h-8 flex-1 rounded bg-[#a78bfa]/10 border border-[#a78bfa]/30 flex items-center px-3">
                    <span className="font-mono text-[0.55rem] text-[#a78bfa]">NAV FLOW</span>
                  </div>
                  <div className="h-8 w-8 rounded bg-[#a78bfa]/20 border border-[#a78bfa]/40 flex items-center justify-center">
                    <span className="text-[#a78bfa] text-xs">menu</span>
                  </div>
                </div>
                <div className="h-px bg-charcoal-800" />
                <div className="space-y-2">
                  <div className="h-5 w-2/3 bg-charcoal-800 rounded" />
                  <div className="h-3 w-full bg-charcoal-900 rounded" />
                  <div className="h-3 w-4/5 bg-charcoal-900 rounded" />
                </div>
                <div className="flex gap-2">
                  <div className="h-7 px-4 rounded-full bg-[#a78bfa] flex items-center">
                    <span className="font-mono text-[0.5rem] text-charcoal-950 font-bold">CTA</span>
                  </div>
                  <div className="h-7 px-4 rounded-full border border-charcoal-700 flex items-center">
                    <span className="font-mono text-[0.5rem] text-warm-muted">SECONDARY</span>
                  </div>
                </div>
              </div>
              <span className="font-mono text-[0.62rem] text-[#a78bfa] block text-center">USER FLOW // INTERACTION HIERARCHY</span>
            </motion.div>
          )}

          {/* VIDEO EDITING */}
          {activeId === 'cinematic-video' && (
            <motion.div
              key="video-demo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
              className="w-full max-w-sm space-y-3 py-4"
            >
              <div className="border border-charcoal-700 bg-charcoal-950 rounded-xl p-4 shadow-xl space-y-3">
                <div className="flex items-center justify-between font-mono text-[0.55rem]">
                  <span className="text-[#0ea5e9] font-bold">REC 24 FPS 4K</span>
                  <span className="text-warm-dim">00:01:24:16</span>
                </div>
                <div className="h-12 flex items-center justify-between gap-1 px-2 border-y border-charcoal-800">
                  {[30, 65, 45, 95, 75, 40, 85, 100, 60, 35, 70, 85, 50, 65, 90, 42, 68, 55].map((h, i) => (
                    <div key={i} className="w-1 rounded-full" style={{ height: `${h}%`, backgroundColor: '#0ea5e9', opacity: 0.7 }} />
                  ))}
                </div>
                <div className="relative h-6 bg-charcoal-900 rounded overflow-hidden flex items-center px-1">
                  <div className="w-1/3 h-4 bg-charcoal-700 rounded mr-1" />
                  <div className="w-1/2 h-4 bg-[#0ea5e9]/20 border border-[#0ea5e9]/40 rounded mr-1" />
                  <div className="w-1/4 h-4 bg-charcoal-700 rounded" />
                  <div className="absolute top-0 bottom-0 left-[38%] w-0.5 bg-[#0ea5e9] shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
                </div>
              </div>
              <span className="font-mono text-[0.62rem] text-[#0ea5e9] block text-center">RHYTHMIC PACING // 2.39:1 CINEMATIC CUT</span>
            </motion.div>
          )}

          {/* MOTION GRAPHICS */}
          {activeId === 'motion-graphics' && (
            <motion.div
              key="motion-demo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
              className="w-full flex flex-col items-center justify-center relative py-6"
            >
              <div className="relative w-full h-40 flex flex-col items-center justify-center space-y-1">
                <motion.span
                  animate={{ x: [-8, 8, -8] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="font-display font-black text-3xl sm:text-4xl text-warm-white tracking-widest"
                >
                  KINETIC
                </motion.span>
                <motion.span
                  animate={{ x: [8, -8, 8] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="font-display font-black text-3xl sm:text-4xl text-lime tracking-widest"
                  style={{ textShadow: '0 0 20px rgba(212,255,0,0.45)' }}
                >
                  MOTION
                </motion.span>
                <motion.span
                  animate={{ x: [-5, 5, -5] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                  className="font-display font-black text-3xl sm:text-4xl text-warm-dim tracking-widest"
                >
                  SYSTEMS
                </motion.span>
              </div>
              <span className="font-mono text-[0.62rem] text-lime mt-2">EASING CURVES // 60FPS VECTOR ANIMATION</span>
            </motion.div>
          )}

          {/* SOCIAL MEDIA */}
          {activeId === 'social-media' && (
            <motion.div
              key="social-demo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
              className="w-full max-w-xs space-y-3 py-4 mx-auto"
            >
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  '#f472b6', '#e5b869', '#f472b6',
                  '#a78bfa', '#f472b6', '#0ea5e9',
                  '#e5b869', '#f472b6', '#a78bfa',
                ].map((color, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg border border-charcoal-800 flex items-center justify-center"
                    style={{ background: `${color}22` }}
                  >
                    <span className="font-display font-black text-sm text-warm-white/60">V</span>
                  </div>
                ))}
              </div>
              <span className="font-mono text-[0.62rem] text-[#f472b6] block text-center">ON-BRAND CONTENT // SOCIAL GRID</span>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Bottom deliverables + CTA */}
      <div className="pt-4 border-t border-charcoal-800 space-y-4">
        <div className="flex flex-wrap gap-2">
          {activeService.deliverables.map((d) => (
            <span
              key={d}
              className="font-mono text-[0.6rem] px-2.5 py-1 rounded-full border border-charcoal-700 bg-charcoal-950 text-warm-white"
            >
              {d}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 rounded-full bg-lime hover:bg-lime-hover text-charcoal-950 font-space text-xs font-bold tracking-[0.18em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,255,0,0.25)] cursor-pointer"
        >
          <span>COMMISSION {activeService.title}</span>
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const [activeId, setActiveId] = useState<string>(services[0].id);
  const activeService = services.find((s) => s.id === activeId) || services[0];

  return (
    <section id="services" className="py-24 sm:py-32 md:py-40 px-6 md:px-12 lg:px-16 bg-charcoal-950 border-b border-charcoal-800 relative">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between pb-10 border-b border-charcoal-800 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-lime shadow-[0_0_8px_rgba(212,255,0,0.8)]" />
              <p className="font-mono text-lime font-bold text-xs tracking-[0.25em] uppercase">
                CHAPTER 03 &mdash; WHAT WE CREATE
              </p>
            </div>
            <h2 className="display-title text-warm-white">
              WHAT WE CREATE<span className="text-lime">.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-warm-muted text-base leading-relaxed font-light">
              Seven creative disciplines to define, elevate, and mobilize modern brands — from mark to motion.
            </p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Service List */}
          <div className="lg:col-span-7 space-y-2">
            {services.map((item) => {
              const isActive = activeId === item.id;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
                  onClick={() => setActiveId(item.id)}
                  onMouseEnter={() => setActiveId(item.id)}
                  className={`group relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer text-left overflow-hidden ${
                    isActive
                      ? 'border-charcoal-600 bg-charcoal-900/90 shadow-2xl'
                      : 'border-charcoal-800/80 bg-charcoal-900/30 hover:border-charcoal-700 hover:bg-charcoal-900/60'
                  }`}
                >
                  {/* Active left accent */}
                  {isActive && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1.5 rounded-r-full"
                      style={{ backgroundColor: item.themeColor }}
                    />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-mono text-xs font-bold transition-colors ${
                            isActive ? 'text-lime' : 'text-warm-dim group-hover:text-warm-muted'
                          }`}
                        >
                          {item.num}
                        </span>
                        <span className="w-4 h-px bg-charcoal-700" />
                        <span className="font-mono text-[0.6rem] text-warm-dim tracking-widest uppercase">
                          STUDIO DISCIPLINE
                        </span>
                      </div>

                      <h3
                        className={`text-xl sm:text-2xl md:text-3xl font-display font-extrabold uppercase tracking-tight transition-colors ${
                          isActive ? 'text-warm-white' : 'text-warm-muted group-hover:text-warm-white'
                        }`}
                      >
                        {item.title}
                      </h3>

                      <p className="text-warm-muted text-sm font-light leading-relaxed max-w-xl pt-0.5">
                        {item.oneLiner}
                      </p>
                    </div>

                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 mt-1 ${
                        isActive
                          ? 'bg-lime text-charcoal-950 shadow-[0_0_15px_rgba(212,255,0,0.4)]'
                          : 'border border-charcoal-700 text-warm-dim group-hover:border-lime group-hover:text-lime'
                      }`}
                    >
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Dynamic demo panel — sticky on desktop */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <ServiceDemoPane activeId={activeId} activeService={activeService} />
          </div>
        </div>
      </div>
    </section>
  );
}
