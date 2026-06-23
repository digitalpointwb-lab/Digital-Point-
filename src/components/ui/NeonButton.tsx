import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface NeonButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'gold' | 'outline';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export function NeonButton({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }: NeonButtonProps) {
  const variants = {
    primary: 'bg-neon-blue text-black shadow-[0_0_15px_rgba(0,242,255,0.5)] hover:shadow-[0_0_25px_rgba(0,242,255,0.8)]',
    secondary: 'bg-neon-purple text-white shadow-[0_0_15px_rgba(188,19,254,0.5)] hover:shadow-[0_0_25px_rgba(188,19,254,0.8)]',
    gold: 'bg-luxury-gold text-black shadow-[0_0_15px_rgba(197,160,89,0.5)] hover:shadow-[0_0_25px_rgba(197,160,89,0.8)]',
    outline: 'bg-transparent text-white border border-white/20 hover:bg-white/10 hover:border-white/40',
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-full font-display font-bold transition-all duration-300 flex items-center justify-center gap-2 ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : ''} ${className}`}
    >
      {children}
    </motion.button>
  );
}
