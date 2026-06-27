import React, { useEffect, useRef } from 'react';

export function PageTransition({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = (window as any).gsap;
    if (containerRef.current && gsap) {
      // Find key visible visual components to stagger: sections, headings, grid items, and cards
      const targets = containerRef.current.querySelectorAll(
        '.gsap-reveal, h1, h2, p.lead, .grid > div, .glass-panel, section > div'
      );

      if (targets.length > 0) {
        // Kill existing animations on these elements
        gsap.killTweensOf(targets);

        // Pre-set initial states to avoid flicker and prepare for cinematic slide-up
        gsap.set(targets, { opacity: 0, y: 40 });

        // Smoothly animate with a staggered slide up
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.08, // Stagger elements sequentially to create a gorgeous cinematic flow
          ease: 'power4.out',
          clearProps: 'transform,opacity', // Essential to clear inline styles so hover tilt/animations work perfectly afterward
        });
      }
    }
  }, [children]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col flex-grow w-full ${className}`}
    >
      {children}
    </div>
  );
}

