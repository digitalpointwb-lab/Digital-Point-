import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight, QrCode, CheckCircle, ChevronLeft } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import { NeonButton } from '../ui/NeonButton';

export function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'payment'>('cart');

  const parsePrice = (price?: string | number): number => {
    if (!price) return 0;
    if (typeof price === 'number') return price;
    return Number(price.replace(/[^0-9.-]+/g, "")) || 0;
  };

  const getWhatsAppUrl = () => {
    const message = `*New Order from Digital Point (Paid via QR)*\n\n` + 
      items.map(item => `• ${item.name} (x${item.quantity}) - ${formatPrice(parsePrice(item.price) * item.quantity)}`).join('\n') + 
      `\n\n*Total Paid: ${formatPrice(cartTotal)}*\n\nI have attached the payment screenshot. Please confirm my order.`;
      
    return `https://wa.me/919073128151?text=${encodeURIComponent(message)}`;
  };

  const handleWhatsAppCheckout = () => {
    clearCart();
    setIsCartOpen(false);
    setTimeout(() => setCheckoutStep('cart'), 300);
  };

  const closeSidebar = () => {
    setIsCartOpen(false);
    setTimeout(() => setCheckoutStep('cart'), 300);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
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
                {checkoutStep === 'payment' ? (
                  <button 
                    onClick={() => setCheckoutStep('cart')}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white hover:bg-white/10 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center border border-neon-cyan/30">
                    <ShoppingCart size={20} className="text-neon-cyan" />
                  </div>
                )}
                <h2 className="text-xl font-display font-bold">
                  {checkoutStep === 'payment' ? 'Complete Payment' : 'Your Cart'}
                </h2>
              </div>
              <button 
                onClick={closeSidebar}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            {checkoutStep === 'cart' ? (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                      <ShoppingCart size={48} className="text-slate-500 mb-2" />
                      <p className="text-lg font-medium text-slate-300">Your cart is empty</p>
                      <p className="text-sm text-slate-500 max-w-[200px]">Browse our cinematic gear to add items to your cart.</p>
                    </div>
                  ) : (
                    items.map((item) => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={item.id} 
                        className="flex gap-4 bg-slate-900/50 border border-white/5 p-3 rounded-2xl relative group"
                      >
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-black shrink-0 relative">
                          <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover opacity-80" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-neon-cyan font-mono mb-1">{item.brand}</p>
                              <h3 className="font-bold text-sm leading-tight pr-4 text-slate-200 line-clamp-2">{item.name}</h3>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-slate-500 hover:text-red-400 transition-colors shrink-0"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-mono font-bold text-sm text-white">
                              {formatPrice(item.price)}
                            </span>
                            
                            <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-lg p-1">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 rounded-md hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 rounded-md hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                  <div className="p-6 border-t border-white/10 bg-slate-900/80 backdrop-blur-md">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-slate-400 font-medium">Estimated Total</span>
                      <span className="text-2xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-cyan">
                        {formatPrice(cartTotal)}
                      </span>
                    </div>
                    
                    <p className="text-xs text-slate-500 mb-4 text-center">
                      Secure checkout process. Next step: Payment.
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      <NeonButton variant="outline" onClick={closeSidebar} className="w-full">
                        Continue Shopping
                      </NeonButton>
                      <NeonButton variant="primary" onClick={() => setCheckoutStep('payment')} className="w-full flex items-center justify-center gap-2 group">
                        Checkout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </NeonButton>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
                <div className="w-full text-center mb-4 sm:mb-5">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-1.5">Scan & Pay</h3>
                  <p className="text-slate-400 text-xs sm:text-sm">Scan with PhonePe, GPay, or any UPI app to complete your purchase securely.</p>
                </div>

                <div className="p-2.5 sm:p-4 rounded-3xl bg-white border border-neon-purple shadow-[0_0_20px_rgba(188,19,254,0.15)] relative group mb-4 sm:mb-6 flex flex-col items-center justify-center w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 mx-auto overflow-hidden">
                  <img 
                    src="/qr.png"
                    alt="Scan to Pay" 
                    className="w-full h-full object-contain relative z-10" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4 bg-slate-900/90 rounded-3xl">
                    <QrCode className="w-12 h-12 text-neon-purple mb-2" />
                    <span className="text-sm font-bold text-white mb-1">QR Code Missing</span>
                    <span className="text-xs text-slate-300">Upload your <span className="font-mono text-neon-cyan">qr.png</span> to the <span className="font-mono text-neon-cyan">public</span> folder</span>
                  </div>
                  {/* Decorative glowing border effect behind the QR */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue/20 to-neon-purple/20 opacity-50 pointer-events-none" />
                </div>

                <div className="w-full bg-slate-900/50 rounded-2xl p-4 border border-white/5 mb-4 sm:mb-5 shadow-inner">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-xs sm:text-sm">Amount to Pay</span>
                    <span className="text-lg sm:text-xl font-mono font-bold text-neon-cyan">{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                <div className="w-full space-y-3 mb-5 sm:mb-6 bg-slate-900/30 p-4 sm:p-5 rounded-2xl border border-white/5">
                  <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-neon-blue/20 flex items-center justify-center shrink-0 border border-neon-blue/30 text-neon-blue font-bold text-[10px]">1</div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-tight">Scan the QR code and pay exactly <strong className="text-white">{formatPrice(cartTotal)}</strong>.</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-neon-purple/20 flex items-center justify-center shrink-0 border border-neon-purple/30 text-neon-purple font-bold text-[10px]">2</div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-tight">Take a screenshot of the successful transaction.</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30 text-emerald-400 font-bold text-[10px]">3</div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-tight">Click below to send the screenshot and order details via WhatsApp for instant confirmation.</p>
                  </div>
                </div>
                
                <div className="mt-auto w-full">
                  <a 
                    href={getWhatsAppUrl()}
                    target="_top"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppCheckout} 
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-full font-display font-bold text-sm sm:text-base transition-all duration-300 bg-neon-blue text-black shadow-[0_0_15px_rgba(0,242,255,0.5)] hover:shadow-[0_0_25px_rgba(0,242,255,0.8)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <CheckCircle size={18} /> I have Paid, Send Details
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
