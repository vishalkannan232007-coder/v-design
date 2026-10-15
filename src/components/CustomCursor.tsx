import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfigFast = { damping: 30, stiffness: 450, mass: 0.15 };
  const springConfigTrail = { damping: 25, stiffness: 220, mass: 0.4 };

  const cursorXSpring = useSpring(cursorX, springConfigFast);
  const cursorYSpring = useSpring(cursorY, springConfigFast);

  const trailXSpring = useSpring(cursorX, springConfigTrail);
  const trailYSpring = useSpring(cursorY, springConfigTrail);

  useEffect(() => {
    // Only activate for fine pointer devices (desktop mouse)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Spring Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden lg:block"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        aria-hidden="true"
      >
        <div className="w-8 h-8 rounded-full border border-lime/40" />
      </motion.div>

      {/* Center Precise Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        aria-hidden="true"
      >
        <div className="w-2 h-2 rounded-full bg-lime shadow-[0_0_10px_rgba(212,255,0,0.8)]" />
      </motion.div>
    </>
  );
}
