import { motion, type Variants } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export function RevealText({
  children,
  className = '',
  delay = 0,
  tag: Tag = 'div',
}: RevealTextProps) {
  const { ref, isInView } = useInView({ threshold: 0.2, once: true });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: '110%', opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{
          duration: 0.9,
          delay,
          ease: EASE_OUT,
        }}
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  );
}

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerReveal({
  children,
  className = '',
  staggerDelay = 0.08,
}: StaggerRevealProps) {
  const { ref, isInView } = useInView({ threshold: 0.2, once: true });

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const item: Variants = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.9, ease: EASE_OUT },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div key={i} className="overflow-hidden">
              <motion.div variants={item}>{child}</motion.div>
            </div>
          ))
        : (
          <div className="overflow-hidden">
            <motion.div variants={item}>{children}</motion.div>
          </div>
        )}
    </motion.div>
  );
}

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function FadeIn({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: FadeInProps) {
  const { ref, isInView } = useInView({ threshold: 0.1, once: true });

  const directionMap: Record<string, object> = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: EASE_OUT,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
