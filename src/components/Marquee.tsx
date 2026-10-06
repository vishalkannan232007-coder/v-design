import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
}

export function Marquee({ items, speed = 40, className = '' }: MarqueeProps) {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    if (!contentRef.current) return;
    const width = contentRef.current.scrollWidth / 2;
    x.set((x.get() - (speed * delta) / 1000) % -width);
  });

  const doubled = [...items, ...items];

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
      aria-hidden="true"
    >
      <motion.div
        ref={contentRef}
        style={{ x }}
        className="inline-flex gap-0"
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 pr-6 text-ash/40 font-black uppercase tracking-widest"
            style={{ fontSize: 'clamp(0.7rem, 2vw, 1.1rem)' }}
          >
            {item}
            <span className="text-gold" style={{ fontSize: '0.5em' }}>●</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
