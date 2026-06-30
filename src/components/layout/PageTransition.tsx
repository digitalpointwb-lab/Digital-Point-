import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export function PageTransition({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = (window as any).gsap;
    if (containerRef.current && gsap) {
      // Find key visible visual components to stagger: headings, main elements, grid cells, and cards
      const rawTargets = Array.from(
        containerRef.current.querySelectorAll(
          '.gsap-reveal, h1, h2, p.lead, .grid > div, .glass-panel, .tilt-card, section > div'
        )
      );

      // Filter out elements that have an ancestor already in rawTargets to prevent parent/child animation conflicts
      const targets = rawTargets.filter((el: any) => {
        let parent = el.parentElement;
        while (parent && parent !== containerRef.current) {
          if (rawTargets.includes(parent)) {
            return false;
          }
          parent = parent.parentElement;
        }
        return true;
      });

      if (targets.length > 0) {
        // Kill existing animations on these elements to prevent overlapping triggers
        gsap.killTweensOf(targets);

        // Pre-set initial states to avoid flicker and prepare for cinematic slide-up
        gsap.set(targets, { opacity: 0, y: 30 });

        // Smoothly animate with a staggered slide up
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.08, // Stagger elements sequentially to create a gorgeous cinematic flow
          ease: 'power4.out',
          clearProps: 'transform,opacity', // Essential to clear inline styles so hover tilt/animations work perfectly afterward
          delay: 0.15, // slight delay to let page transition start first
        });
      }
    }
  }, [children]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className={`flex flex-col flex-grow w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}

