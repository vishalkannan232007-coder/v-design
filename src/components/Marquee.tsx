import { motion } from 'framer-motion';

interface MarqueeProps {
  items: string[];
  speed?: number;
}

export function Marquee({ items, speed = 28 }: MarqueeProps) {
  const repeated = [...items, ...items, ...items];

  return (
    <div
      className="w-full overflow-hidden bg-charcoal-900 border-y border-charcoal-800 py-4 select-none relative"
      aria-hidden="true"
    >
      <motion.div
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
        className="flex items-center gap-10 whitespace-nowrap will-change-transform"
      >
        {repeated.map((item, index) => (
          <div key={index} className="flex items-center gap-10">
            <span className="font-space text-xs sm:text-sm tracking-[0.25em] text-warm-white/90 font-semibold uppercase">
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-lime text-glow-lime flex-shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
