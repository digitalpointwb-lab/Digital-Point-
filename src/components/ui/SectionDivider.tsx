import React from 'react';
import { motion } from 'motion/react';

export function SectionDivider() {
  return (
    <div className="w-full flex justify-center py-8 relative z-10 bg-transparent">
      <div className="w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent relative overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-full w-1/4 bg-gradient-to-r from-transparent via-neon-cyan to-transparent blur-[2px]"
          animate={{
            x: ['-100%', '400%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute top-0 left-0 h-full w-1/4 bg-gradient-to-r from-transparent via-white to-transparent"
          animate={{
            x: ['-100%', '400%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "linear"
          }}
        />
      </div>
    </div>
  );
}
