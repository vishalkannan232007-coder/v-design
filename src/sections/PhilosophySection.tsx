import { motion } from 'framer-motion';

const EASE_EDITORIAL: [number, number, number, number] = [0.16, 1, 0.3, 1];

const pillars = [
  {
    num: '—',
    label: 'INTENTIONAL',
    body: 'Every decision has a reason. We design with purpose, not convention.',
  },
  {
    num: '—',
    label: 'DISTINCTIVE',
    body: 'We build identities that stand out, not blend in. Originality is the brief.',
  },
  {
    num: '—',
    label: 'ENDURING',
    body: 'Trend-resistant visual systems built to remain relevant for years, not seasons.',
  },
];

export function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="relative py-28 sm:py-36 md:py-52 px-6 md:px-12 lg:px-16 bg-charcoal-950 border-b border-charcoal-800 overflow-hidden"
    >
      {/* Cinematic amber background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(194,100,28,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Large typographic watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display font-black text-[18vw] leading-none tracking-tighter uppercase whitespace-nowrap"
          style={{ color: 'rgba(255,255,255,0.018)' }}
        >
          DESIGN
        </span>
      </div>

      {/* Subtle horizontal scan line */}
      <div
        className="absolute left-0 right-0 top-1/2 h-px pointer-events-none"
        aria-hidden="true"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(194,100,28,0.12), transparent)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-10 sm:space-y-14">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
            className="flex items-center justify-center gap-3"
          >
            <span className="w-8 h-px bg-lime/50" />
            <span className="font-mono text-lime text-[0.65rem] tracking-[0.3em] uppercase font-bold">
              CREATIVE PHILOSOPHY
            </span>
            <span className="w-8 h-px bg-lime/50" />
          </motion.div>

          {/* Main statement */}
          <div className="space-y-2 sm:space-y-3 overflow-hidden">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '105%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.95, ease: EASE_EDITORIAL }}
                className="font-display font-black uppercase leading-[0.87] tracking-[-0.04em] text-warm-white"
                style={{ fontSize: 'clamp(2.4rem, 7.5vw, 8rem)' }}
              >
                GOOD DESIGN IS
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '105%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.95, delay: 0.12, ease: EASE_EDITORIAL }}
                className="font-display font-black uppercase leading-[0.87] tracking-[-0.04em] flex flex-wrap items-baseline justify-center gap-x-4"
                style={{ fontSize: 'clamp(2.4rem, 7.5vw, 8rem)' }}
              >
                <span className="text-warm-white">RECOGNISED.</span>
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '105%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.95, delay: 0.22, ease: EASE_EDITORIAL }}
                className="font-display font-black uppercase leading-[0.87] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(2.4rem, 7.5vw, 8rem)' }}
              >
                <span className="text-warm-muted">GREAT DESIGN</span>
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '105%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.95, delay: 0.32, ease: EASE_EDITORIAL }}
                className="font-display font-black uppercase leading-[0.87] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(2.4rem, 7.5vw, 8rem)' }}
              >
                <span className="text-warm-white">IS </span>
                <span
                  className="text-transparent"
                  style={{
                    WebkitTextStroke: '2px #fbfbfa',
                    filter: 'drop-shadow(0 0 24px rgba(251,251,250,0.2))',
                  }}
                >
                  REMEMBERED
                </span>
                <span className="text-lime" style={{ textShadow: '0 0 30px rgba(212,255,0,0.5)' }}>.</span>
              </motion.div>
            </div>
          </div>

          {/* Pillar cards */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.4, ease: EASE_EDITORIAL }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-charcoal-800 rounded-2xl overflow-hidden mt-12 sm:mt-16 border border-charcoal-800"
          >
            {pillars.map((p) => (
              <div
                key={p.label}
                className="bg-charcoal-950 p-6 sm:p-8 text-left space-y-3 group hover:bg-charcoal-900/60 transition-colors duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-lime text-xs">{p.num}</span>
                  <span className="font-mono text-[0.65rem] tracking-[0.25em] text-lime uppercase font-bold">
                    {p.label}
                  </span>
                </div>
                <p className="text-warm-muted text-sm leading-relaxed font-light">{p.body}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
