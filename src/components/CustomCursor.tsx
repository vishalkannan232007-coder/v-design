import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const labelRef = useRef<HTMLSpanElement>(null);

  const springConfig = { damping: 22, stiffness: 280, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      if (!labelRef.current) return;

      if (target.closest('[data-cursor="view"]')) {
        labelRef.current.textContent = 'VIEW';
      } else if (target.closest('[data-cursor="open"]')) {
        labelRef.current.textContent = 'OPEN';
      } else if (target.closest('[data-cursor="explore"]')) {
        labelRef.current.textContent = 'EXPLORE';
      } else {
        labelRef.current.textContent = '';
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      {/* Outer ring */}
      <div
        className="absolute rounded-full border border-cream/40"
        style={{ width: 32, height: 32 }}
      />
      {/* Dot */}
      <div
        className="rounded-full bg-cream"
        style={{ width: 4, height: 4 }}
      />
      {/* Label */}
      <span
        ref={labelRef}
        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-[9px] font-bold tracking-widest text-cream whitespace-nowrap"
      />
    </motion.div>
  );
}
