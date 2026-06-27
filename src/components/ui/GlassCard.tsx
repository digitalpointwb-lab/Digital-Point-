import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  showAnimatedBorder?: boolean;
  [key: string]: any;
}

export function GlassCard({ children, className = '', delay = 0, showAnimatedBorder = false, ...props }: GlassCardProps) {
  const isDelayed = delay > 0.1;
  const floatClass = isDelayed ? "holographic-float-delayed" : "holographic-float";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`glass-panel ${floatClass} gsap-reveal p-6 overflow-hidden relative group ${className}`}
      {...props}
    >
      {/* Animated laser borders on hover */}
      {showAnimatedBorder && (
        <>
          {/* Top Border */}
          <div className="absolute top-0 left-0 w-full h-[2px] overflow-hidden pointer-events-none z-20">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-border-slide-top" />
          </div>
          {/* Right Border */}
          <div className="absolute top-0 right-0 w-[2px] h-full overflow-hidden pointer-events-none z-20">
            <div className="w-full h-full bg-gradient-to-b from-transparent via-neon-purple to-transparent animate-border-slide-right [animation-delay:0.75s]" />
          </div>
          {/* Bottom Border */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] overflow-hidden pointer-events-none z-20">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-border-slide-bottom [animation-delay:1.5s]" />
          </div>
          {/* Left Border */}
          <div className="absolute top-0 left-0 w-[2px] h-full overflow-hidden pointer-events-none z-20">
            <div className="w-full h-full bg-gradient-to-b from-transparent via-neon-purple to-transparent animate-border-slide-left [animation-delay:2.25s]" />
          </div>
        </>
      )}

      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
