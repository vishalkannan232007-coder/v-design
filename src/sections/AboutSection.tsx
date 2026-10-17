import { motion } from 'framer-motion';
import { ArrowUpRight, Compass, Layers, Film } from 'lucide-react';
import { BrandMark } from '../components/BrandMark';
import { FluidShaderBackground } from '../components/FluidShaderBackground';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Discipline {
  id: string;
  num: string;
  title: string;
  tagline: string;
  description: string;
  icon: typeof Compass;
  connectedServices: string[];
}

const disciplines: Discipline[] = [
  {
    id: 'brand-identity',
    num: '01',
    title: 'Brand Identity',
    tagline: 'Visual Marks & Design Systems',
    description:
      'We craft distinctive marks, typographic hierarchies, and cohesive visual languages that give brands enduring character and immediate recognition across physical and digital spaces.',
    icon: Compass,
    connectedServices: ['Logo Design', 'Brand Identity Systems'],
  },
  {
    id: 'digital-experiences',
    num: '02',
    title: 'Digital Experiences',
    tagline: 'Websites & Interface Architecture',
    description:
      'Bespoke digital flagships and intuitive interfaces where editorial art direction meets structural clarity, fluid interaction, and modern responsive performance.',
    icon: Layers,
    connectedServices: ['Website Design', 'UI/UX Design'],
  },
  {
    id: 'cinematic-content',
    num: '03',
    title: 'Cinematic Content',
    tagline: 'Motion, Reels & Editorial Film',
    description:
      'Paced video edits, atmospheric short-form reels, and kinetic graphic systems designed to command attention, convey mood, and tell compelling stories in motion.',
    icon: Film,
    connectedServices: [
      'Video Editing',
      'Cinematic Reels',
      'Social Media Creatives',
      'Motion Graphics',
    ],
  },
];

export function AboutSection() {
  const reduce = usePrefersReducedMotion();

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  /* Motion choreography */
  const headingMask = reduce ? { opacity: 0 } : { y: '110%', opacity: 0 };
  const headingShow = reduce
    ? { opacity: 1, transition: { duration: 0.4 } }
    : { y: 0, opacity: 1, transition: { duration: 0.9, ease: EASE } };
  const fadeUp = (delay: number) =>
    reduce
      ? { opacity: 1, y: 0, transition: { duration: 0.35 } }
      : { opacity: 1, y: 0, transition: { duration: 0.75, delay, ease: EASE } };
  const fadeInitial = { opacity: 0, y: reduce ? 0 : 20 };

  return (
    <section
      id="studio"
      aria-label="The Studio"
      className="relative overflow-hidden border-b border-charcoal-800 bg-charcoal-950 px-4 py-20 sm:py-28 md:py-36 sm:px-8 md:px-12 lg:px-16"
    >
      {/* Ambient background glow for the showcase panel */}
      <div
        className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 w-full max-w-6xl h-96 opacity-35 blur-[110px]"
        style={{
          background:
            'radial-gradient(ellipse 65% 50% at 50% 30%, rgba(200,245,47,0.18) 0%, rgba(133,139,66,0.12) 45%, transparent 75%)',
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

        {/* ── Section Header ───────────────────────────────────────── */}
        <div className="flex flex-col gap-6 border-b border-charcoal-800/80 pb-10 md:flex-row md:items-end md:justify-between relative z-10">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_8px_rgba(200,245,47,0.8)]" />
              <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-lime">
                Chapter 04 — The Studio
              </p>
            </div>

            <h2 className="display-title overflow-hidden pb-[0.06em] text-warm-white">
              <motion.span
                initial={headingMask}
                whileInView={headingShow}
                viewport={{ once: true, margin: '-80px' }}
                className="block"
              >
                The Studio<span className="text-lime">.</span>
              </motion.span>
            </h2>
          </div>

          <motion.div
            initial={fadeInitial}
            whileInView={fadeUp(0.15)}
            viewport={{ once: true, margin: '-80px' }}
            className="shrink-0 border-l border-charcoal-800 pl-5 font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.24em] text-warm-muted md:border-l-0 md:pl-0 md:text-right"
          >
            <span className="block text-warm-white font-semibold">Independent Practice</span>
            <span className="block text-lime">Direct Studio Engagement</span>
          </motion.div>
        </div>

        {/* ── Editorial Studio Manifesto ───────────────────────────── */}
        <div className="py-12 sm:py-16 md:py-20 border-b border-charcoal-800/80 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <motion.div
              initial={fadeInitial}
              whileInView={fadeUp(0.1)}
              viewport={{ once: true, margin: '-60px' }}
              className="lg:col-span-7 space-y-6"
            >
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase leading-[1.08] tracking-tight text-warm-white">
                Shaping Brands With Intention, Clarity, And Cinematic Rhythm<span className="text-lime">.</span>
              </h3>

              <p className="font-space text-base sm:text-lg font-light leading-relaxed text-warm-muted">
                V DESIGN is an independent branding and digital creative studio. We work at the
                nexus of visual identity, digital experiences, and cinematic content—building
                cohesive visual worlds that stand apart from templated convention.
              </p>

              <p className="font-space text-sm sm:text-base font-light leading-relaxed text-warm-muted">
                Every project begins by interrogating what makes a brand singular. Rather than
                imposing trends, we distill your narrative into an unmistakable visual signature:
                grounded in sound design principles, executed with modern craft, and tuned to evoke
                lasting resonance.
              </p>
            </motion.div>

            {/* Right: Studio Architectural Identity Plate with FluidShaderBackground (Reference 3) */}
            <motion.div
              initial={fadeInitial}
              whileInView={fadeUp(0.25)}
              viewport={{ once: true, margin: '-60px' }}
              className="lg:col-span-5"
            >
              <FluidShaderBackground intensity="vibrant" className="rounded-3xl border border-white/15 p-1 shadow-2xl">
                <div className="relative rounded-[22px] bg-[#141712]/90 p-7 sm:p-8 backdrop-blur-xl overflow-hidden group">
                  {/* Architectural registration marks */}
                  <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-lime/60" />
                  <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-lime/60" />
                  <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-lime/60" />
                  <div className="absolute bottom-3 right-3 h-2 w-2 border-b border-r border-lime/60" />

                  {/* Studio Brand Mark Showcase with real logo */}
                  <div className="relative flex flex-col items-center justify-center pb-6 border-b border-charcoal-800">
                    <div className="w-24 sm:w-28 py-2">
                      <BrandMark className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <p className="mt-3 font-space text-xs font-bold uppercase tracking-[0.22em] text-warm-white">
                      V DESIGN STUDIO
                    </p>
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-lime mt-1 font-semibold">
                      Independent Creative Direction
                    </p>
                  </div>

                  {/* Studio Credentials Grid — strictly clean of any city or global commissions */}
                  <dl className="mt-6 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <dt className="text-warm-dim text-[0.62rem] uppercase tracking-widest">Disciplines</dt>
                      <dd className="text-warm-white text-[0.68rem] font-medium">Identity · Web · Motion</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-warm-dim text-[0.62rem] uppercase tracking-widest">Approach</dt>
                      <dd className="text-warm-white text-[0.68rem] font-medium">Bespoke Direction</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-warm-dim text-[0.62rem] uppercase tracking-widest">Craft</dt>
                      <dd className="text-warm-white text-[0.68rem] font-medium">Zero Templates</dd>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-charcoal-800/80">
                      <dt className="text-warm-dim text-[0.62rem] uppercase tracking-widest">Status</dt>
                      <dd className="text-lime text-[0.68rem] font-bold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                        <span>Available for Commissions</span>
                      </dd>
                    </div>
                  </dl>

                  {/* Action in plate */}
                  <div className="mt-6 pt-4 border-t border-charcoal-800">
                    <button
                      type="button"
                      onClick={scrollToContact}
                      className="pill-btn-lime w-full cursor-pointer text-[0.7rem] !py-3 font-bold"
                    >
                      <span>START A PROJECT</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </FluidShaderBackground>
            </motion.div>
          </div>
        </div>

        {/* ── Creative Capabilities: Three Core Disciplines ────────── */}
        <div className="pt-14 sm:pt-20">
          <motion.div
            initial={fadeInitial}
            whileInView={fadeUp(0.1)}
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
          >
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-lime mb-2">
                Core Capabilities
              </p>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-warm-white">
                Three Integrated Disciplines<span className="text-lime">.</span>
              </h3>
            </div>
            <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-warm-dim max-w-xs sm:text-right">
              From foundational marks to interactive products and cinematic film
            </p>
          </motion.div>

          {/* Asymmetric Editorial Discipline Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {disciplines.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.id}
                  initial={fadeInitial}
                  whileInView={fadeUp(0.15 + index * 0.1)}
                  viewport={{ once: true, margin: '-50px' }}
                  className="group relative rounded-2xl border border-charcoal-800 bg-charcoal-950/80 p-8 sm:p-9 transition-all duration-300 hover:border-charcoal-700 hover:bg-charcoal-900/90 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle top indicator on hover */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-lime opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Discipline numeral & icon */}
                    <div className="flex items-center justify-between pb-6 border-b border-charcoal-800/80">
                      <span className="font-mono text-xs font-bold text-lime tracking-widest">
                        {item.num}
                      </span>
                      <span className="p-2 rounded-lg bg-charcoal-900 border border-charcoal-800 text-warm-muted group-hover:text-lime group-hover:border-lime/30 transition-colors">
                        <Icon size={16} />
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div className="mt-6 space-y-1.5">
                      <h4 className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-warm-white group-hover:text-lime transition-colors">
                        {item.title}
                      </h4>
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-warm-dim">
                        {item.tagline}
                      </p>
                    </div>

                    {/* Narrative Description */}
                    <p className="mt-4 font-space text-xs sm:text-sm font-light leading-relaxed text-warm-muted">
                      {item.description}
                    </p>
                  </div>

                  {/* Connected Services (Natural link to Services section) */}
                  <div className="mt-8 pt-6 border-t border-charcoal-800/80">
                    <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-warm-dim mb-3">
                      Connected Services
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.connectedServices.map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={scrollToServices}
                          className="font-mono text-[0.62rem] px-3 py-1 rounded-full bg-charcoal-900/90 text-warm-muted border border-charcoal-800 hover:border-lime/40 hover:text-warm-white transition-all duration-200 cursor-pointer"
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* ── Studio Commitment & Navigation Bar ───────────────────── */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-charcoal-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 font-mono text-[0.62rem] text-warm-dim">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-lime font-bold">V DESIGN PRINCIPLES</span>
            <span>·</span>
            <span>INTENTION OVER CONVENTION</span>
            <span>·</span>
            <span>ZERO TEMPLATES</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToServices}
              className="text-warm-muted hover:text-lime transition-colors uppercase tracking-widest inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Explore All 8 Services</span>
              <ArrowUpRight size={11} />
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={scrollToContact}
              className="text-lime hover:underline uppercase tracking-widest inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Initiate Inquiries</span>
              <ArrowUpRight size={11} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
