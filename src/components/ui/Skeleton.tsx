import React from 'react';
import { motion } from 'motion/react';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`relative overflow-hidden bg-slate-900 border border-white/5 rounded-xl ${className}`}>
      {/* Base pulse */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
      />
      {/* Cyberpunk grid overlay */}
      <div className="absolute inset-0 bg-white/5 opacity-10 mix-blend-overlay"></div>
      
      {/* Scanning line */}
      <motion.div
        className="absolute top-0 bottom-0 left-0 w-1 bg-neon-blue/50 shadow-[0_0_10px_rgba(0,240,255,0.8)]"
        animate={{
          x: ['0%', '1000%'], // Assuming container width isn't much larger, but we can animate by parent size or just use css keys
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="group relative bg-slate-900/40 border border-white/5 rounded-3xl p-4 overflow-hidden">
      <Skeleton className="w-full h-[300px] rounded-2xl mb-6" />
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-3/4 rounded-md" />
        </div>
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-2/3 rounded-md mb-4" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-12 rounded-xl shrink-0" />
        </div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-cyber-black">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        {/* Left: Images Skeleton */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <Skeleton className="w-full aspect-[4/5] md:aspect-square rounded-3xl" />
          <div className="grid grid-cols-4 gap-4">
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
          </div>
        </div>

        {/* Right: Info Skeleton */}
        <div className="w-full lg:w-1/2 space-y-8">
          <div>
            <Skeleton className="h-6 w-32 rounded-md mb-4" />
            <Skeleton className="h-12 w-3/4 rounded-md mb-4" />
            <Skeleton className="h-8 w-1/4 rounded-md" />
          </div>
          
          <div className="space-y-3">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-6 w-40 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-2/3 rounded-md" />
              <Skeleton className="h-4 w-1/2 rounded-md" />
              <Skeleton className="h-4 w-3/4 rounded-md" />
              <Skeleton className="h-4 w-2/5 rounded-md" />
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-4 border-t border-white/5">
            <Skeleton className="h-14 w-full sm:w-2/3 rounded-xl" />
            <Skeleton className="h-14 w-full sm:w-1/3 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
