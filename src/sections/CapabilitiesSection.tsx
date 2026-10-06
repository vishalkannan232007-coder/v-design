import { motion } from 'framer-motion';
import { FadeIn } from '../components/AnimationComponents';
import { useInView } from '../hooks/useInView';

const capabilities = [
  'LOGO DESIGN',
  'BRAND IDENTITY',
  'ART DIRECTION',
  'WEB DESIGN',
  'UI/UX DESIGN',
  'VIDEO EDITING',
  'MOTION DESIGN',
  'SOCIAL MEDIA DESIGN',
  'VISUAL DESIGN',
];

function CapabilityItem({ text, index }: { text: string; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.5, once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group flex items-center justify-between border-b border-ink-border py-5 cursor-default"
      data-cursor="explore"
    >
      <motion.span
        whileHover={{ x: 12, color: '#c9a96e' }}
        transition={{ duration: 0.3 }}
        className="text-cream font-black tracking-tight"
        style={{ fontSize: 'clamp(1.4rem, 3.5vw, 3rem)' }}
      >
        {text}
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="label-xs text-gold"
      >
        ↗
      </motion.span>
    </motion.div>
  );
}

export function CapabilitiesSection() {
  return (
    <section className="py-24 md:py-40 px-6 md:px-10 lg:px-14 border-t border-ink-border bg-ink-soft">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Label */}
          <div className="lg:col-span-3">
            <FadeIn>
              <p className="label-xs mb-4">06 — Capabilities</p>
              <p className="text-ash text-sm leading-relaxed max-w-xs">
                A full-range of creative skills — all under one studio.
              </p>
            </FadeIn>
          </div>

          {/* List */}
          <div className="lg:col-span-9">
            {capabilities.map((cap, i) => (
              <CapabilityItem key={cap} text={cap} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
