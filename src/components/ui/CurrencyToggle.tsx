import React from 'react';
import { motion } from 'motion/react';
import { useCurrency } from '../../contexts/CurrencyContext';

export function CurrencyToggle() {
  const { currency, toggleCurrency } = useCurrency();

  return (
    <button
      onClick={toggleCurrency}
      className="relative flex items-center p-1 bg-black/40 border border-white/10 rounded-full cursor-pointer hover:border-white/20 transition-all duration-300 w-[60px] h-[30px]"
      title={`Switch to ${currency === 'INR' ? 'USD' : 'INR'}`}
    >
      <div className="absolute inset-0 bg-neon-blue/5 rounded-full overflow-hidden">
        {/* Glow effect */}
        <motion.div
           className="absolute inset-0 w-1/2 bg-neon-blue/20 rounded-full blur-md"
           animate={{ x: currency === 'INR' ? 0 : '100%' }}
           transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        />
      </div>
      
      <motion.div
        className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center text-[10px] font-bold text-white z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)] border border-white/10"
        animate={{ x: currency === 'INR' ? 0 : 26 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {currency === 'INR' ? '₹' : '$'}
      </motion.div>
      
      <div className="absolute inset-0 flex justify-between w-full px-2 items-center text-[9px] font-bold text-slate-500 pointer-events-none">
        <span className={currency === 'INR' ? 'opacity-0' : 'opacity-100 transition-opacity'}>₹</span>
        <span className={currency === 'USD' ? 'opacity-0' : 'opacity-100 transition-opacity'}>$</span>
      </div>
    </button>
  );
}
