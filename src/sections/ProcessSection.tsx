import { FadeIn, RevealText } from '../components/AnimationComponents';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const steps = [
  {
    num: '01',
    title: 'DISCOVER',
    description:
      'Understand the idea, the audience and the objective. Every great visual identity starts with asking the right questions.',
  },
  {
    num: '02',
    title: 'DEFINE',
    description:
      'Build the visual direction, structure and creative strategy — translating ideas into a clear, actionable creative brief.',
  },
  {
    num: '03',
    title: 'CREATE',
    description:
      'Design, refine and develop the final experience. Iterating with precision until every detail is exactly right.',
  },
  {
    num: '04',
    title: 'DELIVER',
    description:
      'Prepare polished, production-ready work. Organised files, brand guidelines and everything needed to launch with confidence.',
  },
];

function ProcessStep({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const { ref, isInView } = useInView({ threshold: 0.2, once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-12 gap-4 md:gap-8 border-b border-ink-border py-10 md:py-14 group"
    >
      {/* Number */}
      <div className="col-span-2 md:col-span-1">
        <span className="label-xs text-ash/40">{step.num}</span>
      </div>

      {/* Title */}
      <div className="col-span-10 md:col-span-3">
        <motion.h3
          className="display-sm text-cream font-black"
          animate={isInView ? { opacity: 1 } : { opacity: 0.3 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {step.title}
        </motion.h3>
      </div>

      {/* Description */}
      <div className="col-span-12 md:col-span-8 md:col-start-5 pl-[calc(16.67%+1rem)] md:pl-0">
        <p className="text-ash text-sm leading-relaxed max-w-lg">{step.description}</p>
      </div>
    </motion.div>
  );
}

export function ProcessSection() {
  return (
    <section className="py-24 md:py-40 px-6 md:px-10 lg:px-14 border-t border-ink-border">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <FadeIn>
              <p className="label-xs mb-4">05 — How We Work</p>
            </FadeIn>
            <RevealText tag="h2" className="display-lg text-cream">
              THE PROCESS
            </RevealText>
          </div>
          <FadeIn delay={0.2} direction="left" className="max-w-xs">
            <p className="text-ash text-sm leading-relaxed">
              A clear, collaborative process from the first conversation to the final deliverable.
            </p>
          </FadeIn>
        </div>

        {/* Steps */}
        <div>
          {steps.map((step, i) => (
            <ProcessStep key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
