import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X, Trash2, ArrowRight, ShoppingCart } from 'lucide-react';
import { useWishlist } from '../../contexts/WishlistContext';
import { useCart } from '../../contexts/CartContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import { NeonButton } from '../ui/NeonButton';

export function WishlistSidebar() {
  const { items, isWishlistOpen, setIsWishlistOpen, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-slate-950 border-l border-white/10 z-[101] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/30">
                  <Heart size={20} className="text-pink-500 fill-pink-500" />
                </div>
                <h2 className="text-xl font-display font-bold">Your Wishlist</h2>
              </div>
              <button 
                onClick={() => setIsWishlistOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Wishlist Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <Heart size={48} className="text-slate-500 mb-2" />
                  <p className="text-lg font-medium text-slate-300">Your wishlist is empty</p>
                  <p className="text-sm text-slate-500 max-w-[200px]">Save your favorite photography gear here to buy later.</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id} 
                    className="flex flex-col gap-4 bg-slate-900/50 border border-white/5 p-4 rounded-2xl relative group"
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-black shrink-0 relative">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-pink-400 font-mono mb-1">{item.brand}</p>
                            <h3 className="font-bold text-sm leading-tight pr-4 text-slate-200 line-clamp-2">{item.name}</h3>
                          </div>
                          <button 
                            onClick={() => removeFromWishlist(item.id)}
                            className="text-slate-500 hover:text-red-400 transition-colors shrink-0"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <div className="mt-2">
                          <span className="font-mono font-bold text-sm text-white">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => {
                        addToCart(item);
                        removeFromWishlist(item.id);
                        setIsWishlistOpen(false);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-sm"
                    >
                      <ShoppingCart size={16} /> Move to Cart
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-slate-900/80 backdrop-blur-md">
                <NeonButton variant="outline" onClick={() => setIsWishlistOpen(false)} className="w-full">
                  Continue Shopping
                </NeonButton>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
