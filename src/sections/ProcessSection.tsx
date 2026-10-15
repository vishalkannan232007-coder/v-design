import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const EASE_EDITORIAL: [number, number, number, number] = [0.16, 1, 0.3, 1];

const steps = [
  {
    num: '01',
    title: 'DISCOVER',
    verb: 'Understand',
    description:
      'We begin by listening — exploring your goals, audience, and competitive landscape. Every strong identity starts with asking the right questions before drawing a single line.',
  },
  {
    num: '02',
    title: 'DESIGN',
    verb: 'Develop',
    description:
      'Creative direction takes shape: visual language, typography systems, colour logic, and structure — translated from ideas into deliberate, purposeful design.',
  },
  {
    num: '03',
    title: 'REFINE',
    verb: 'Improve',
    description:
      'We collaborate through feedback rounds, sharpening every detail until the work is exactly right. Precision and craft are applied at each iteration.',
  },
  {
    num: '04',
    title: 'DELIVER',
    verb: 'Launch',
    description:
      'Polished, production-ready assets organised for immediate use — brand guidelines, packaged files, and everything needed to launch with full confidence.',
  },
];

export function ProcessSection() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="process"
      className="py-24 sm:py-32 md:py-40 px-6 md:px-12 lg:px-16 bg-charcoal-950 border-b border-charcoal-800 relative overflow-hidden"
    >
      {/* Subtle background watermark */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.025]"
        aria-hidden="true"
      >
        <span className="font-display font-black text-[28vw] leading-none tracking-tighter text-warm-white">
          PROC
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between pb-10 border-b border-charcoal-800 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-lime shadow-[0_0_8px_rgba(212,255,0,0.8)]" />
              <p className="font-mono text-lime font-bold text-xs tracking-[0.25em] uppercase">
                THE PROCESS &mdash; HOW WE WORK
              </p>
            </div>
            <h2 className="display-title text-warm-white">
              FOUR STAGES<span className="text-lime">.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-warm-muted text-base leading-relaxed font-light">
              A clear, collaborative process — from first conversation to final deliverable.
            </p>
          </div>
        </div>

        {/* Process Steps */}
        <div className="space-y-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, delay: index * 0.1, ease: EASE_EDITORIAL }}
              className="group relative grid grid-cols-12 gap-4 md:gap-8 py-10 md:py-14 border-b border-charcoal-800 hover:border-charcoal-700 transition-colors duration-300"
            >
              {/* Active left glow on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-0.5 bg-lime transition-all duration-300 shadow-[0_0_12px_rgba(212,255,0,0.6)]" />

              {/* Step Number */}
              <div className="col-span-2 md:col-span-1 flex items-start pt-1">
                <span className="font-mono text-lime font-bold text-xs tracking-[0.25em]">
                  {step.num}
                </span>
              </div>

              {/* Stage Title */}
              <div className="col-span-10 md:col-span-3 flex items-start">
                <div className="space-y-1">
                  <span className="font-mono text-warm-dim text-[0.6rem] tracking-widest uppercase block">
                    {step.verb}
                  </span>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-warm-white group-hover:text-lime transition-colors duration-300 uppercase tracking-tight">
                    {step.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <div className="col-span-12 md:col-span-7 md:col-start-5 pl-[calc(16.67%+1rem)] md:pl-0 flex items-center">
                <p className="text-warm-muted text-base leading-relaxed font-light max-w-xl">
                  {step.description}
                </p>
              </div>

              {/* Arrow indicator */}
              <div className="hidden md:flex col-span-1 items-center justify-end">
                <span className="w-8 h-8 rounded-full border border-charcoal-700 flex items-center justify-center text-warm-dim group-hover:border-lime group-hover:text-lime transition-all duration-300">
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: EASE_EDITORIAL }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-4"
        >
          <p className="text-warm-muted text-sm font-light max-w-md">
            Ready to start? Every project begins with a brief conversation about your vision.
          </p>
          <button
            type="button"
            onClick={scrollToContact}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-lime hover:bg-lime-hover text-charcoal-950 font-space text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(212,255,0,0.3)] hover:shadow-[0_0_40px_rgba(212,255,0,0.5)] cursor-pointer whitespace-nowrap"
          >
            <span>BEGIN YOUR PROJECT</span>
            <ArrowUpRight size={14} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
