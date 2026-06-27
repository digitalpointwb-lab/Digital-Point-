import React from 'react';
import { motion } from 'motion/react';

interface LensFlareProps {
  className?: string;
}

export function LensFlare({ className = '' }: LensFlareProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden z-20 ${className}`}>
      {/* Dynamic flares that pulse and shimmer */}
      
      {/* 1. Main Hotspot / Glare center */}
      <motion.div 
        className="absolute w-24 h-24 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9)_0%,rgba(0,242,255,0.4)_25%,rgba(188,19,254,0.1)_50%,transparent_70%)] blur-[1px]"
        style={{ top: '25%', left: '25%', transform: 'translate(-50%, -50%)' }}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [0.95, 1.15, 0.95],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 2. Horizontal anamorphic streak (classic sci-fi camera lens element look) */}
      <motion.div 
        className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-80"
        style={{ top: '25%' }}
        animate={{
          opacity: [0.4, 0.9, 0.4],
          scaleY: [1, 2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 3. Secondary offset soft warm/magenta ring */}
      <motion.div 
        className="absolute w-16 h-16 rounded-full bg-[radial-gradient(circle,rgba(188,19,254,0.3)_0%,rgba(0,242,255,0.1)_40%,transparent_75%)]"
        style={{ top: '40%', left: '45%', transform: 'translate(-50%, -50%)' }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [0.8, 1.1, 0.8],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* 4. Tertiary small colorful green/cyan ring */}
      <motion.div 
        className="absolute w-8 h-8 rounded-full bg-[radial-gradient(circle,rgba(0,242,255,0.5)_0%,transparent_70%)]"
        style={{ top: '55%', left: '60%', transform: 'translate(-50%, -50%)' }}
        animate={{
          opacity: [0.2, 0.6, 0.2],
          scale: [0.9, 1.2, 0.9],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* 5. Edge chromatic aberration ring */}
      <motion.div 
        className="absolute w-36 h-36 rounded-full border border-neon-cyan/20 bg-transparent"
        style={{ top: '20%', left: '20%', transform: 'translate(-50%, -50%)' }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
