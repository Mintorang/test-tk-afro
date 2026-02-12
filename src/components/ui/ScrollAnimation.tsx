'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export function ScrollAnimation({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = "" 
}: ScrollAnimationProps) {
  const ref = useRef(null);
  
  /**
   * amount: 0.01 triggers as soon as 1% of the element is visible (instant).
   * margin: "-5px" prevents it from flickering at the very edge.
   */
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.01 
  });

  const directions = {
    up: { y: 12 },    // Minimal movement = perceived faster speed
    down: { y: -12 },
    left: { x: 12 },
    right: { x: -12 },
  };

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ 
          opacity: 0, 
          ...directions[direction] 
        }}
        animate={isInView ? { 
          opacity: 1, 
          x: 0, 
          y: 0 
        } : {}}
        transition={{
          // 0.3s is the sweet spot for boutique responsiveness
          duration: 0.3,
          delay: delay,
          // Custom Bezier for that "Luxury Pop" feel
          ease: [0.16, 1, 0.3, 1], 
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
