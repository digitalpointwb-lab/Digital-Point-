import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Camera, MessageSquare, Phone, Zap, ArrowRight, ShoppingCart, Heart } from 'lucide-react';
import { NeonButton } from '../ui/NeonButton';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';

// @ts-ignore
import mobileMenuBg from '../../assets/images/mobile_menu_bg_1782246902401.jpg';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', label: 'Welcome & Highlights', tag: '01 / START' },
    { name: 'Products', path: '/products', label: 'Discover Cinema Gear', tag: '02 / SHOP' },
    { name: 'Categories', path: '/categories', label: 'Curated Collections', tag: '03 / BROWSE' },
    { name: 'About', path: '/about', label: 'Our Heritage & Team', tag: '04 / STORY' },
    { name: 'Contact', path: '/contact', label: 'Inquire & Connect', tag: '05 / SUPPORT' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${scrolled ? 'pt-4' : 'pt-6'}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6">
        <div className={`flex items-center justify-between rounded-2xl transition-all duration-500 ${scrolled ? 'bg-slate-950/80 backdrop-blur-3xl border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] py-3 px-3 sm:px-6' : 'bg-transparent py-2 px-1 sm:px-0'}`}>
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group relative z-50 shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-neon-blue rounded-lg sm:rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10 border border-white/20">
                <Camera className="text-black" size={16} />
              </div>
            </div>
            <span className="text-lg sm:text-2xl font-display font-bold tracking-tighter text-white">
              DIGITAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple animate-gradient-bg inline-block sm:inline-block">POINT</span>
            </span>
          </Link>

          {/* Desktop Nav - Pill shape */}
          <div className="hidden lg:flex items-center bg-black/40 backdrop-blur-md rounded-full border border-white/5 p-1.5 shadow-inner">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-5 py-2 rounded-full text-sm font-medium transition-colors group overflow-hidden"
                >
                  {isActive && (
                     <motion.div
                       layoutId="nav-indicator"
                       className="absolute inset-0 bg-white/10 rounded-full z-0 border border-white/10"
                       transition={{ type: "spring", stiffness: 300, damping: 30 }}
                     />
                  )}
                  <div className="absolute inset-0 bg-neon-blue/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0 rounded-full"></div>
                  <span className={`relative z-10 glitch-anim ${isActive ? 'text-neon-cyan' : 'text-slate-300 group-hover:text-white'}`}>
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-4 relative z-50">
            <button 
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 rounded-full hover:bg-white/10 transition-colors text-white"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-white/10 transition-colors text-white"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-neon-purple text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <div className="hidden lg:flex items-center gap-2 mr-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></span>
               <span className="text-[10px] uppercase tracking-widest text-slate-300 font-bold">Online</span>
            </div>
            <Link to="/contact">
              <NeonButton variant="primary" className="!py-2 pb-2 !px-5 text-sm group">
                <span className="flex items-center gap-2">
                  <Zap size={16} className="group-hover:animate-bounce" /> Fast Inquiry
                </span>
              </NeonButton>
            </Link>
          </div>

          {/* Mobile Toggle & Currency */}
          <div className="md:hidden flex items-center gap-2 relative z-50">
            <button 
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-1.5 rounded-full hover:bg-white/10 transition-colors text-white"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-pink-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 rounded-full hover:bg-white/10 transition-colors text-white"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-neon-purple text-white text-[9px] font-bold flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="relative w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white" onClick={() => setIsOpen(!isOpen)}>
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X size={18} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-3xl md:hidden pt-28 px-6 pb-6 overflow-y-auto flex flex-col justify-between"
          >
            {/* Absolute Background Image Layer */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen overflow-hidden">
              <motion.img 
                src={mobileMenuBg} 
                alt="Mobile Menu Background" 
                referrerPolicy="no-referrer"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1.0, opacity: 0.25 }}
                exit={{ scale: 1.1, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full h-full object-cover filter saturate-150 brightness-[0.5] contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950" />
            </div>

            {/* Glowing Accent Orbs */}
            <div className="absolute top-1/4 right-0 w-72 h-72 bg-neon-cyan/10 blur-[120px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-neon-purple/10 blur-[120px] pointer-events-none animate-pulse delay-1000"></div>

            <div className="flex flex-col gap-8 relative z-10 w-full">
              {/* Menu Header with indicator */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono font-bold">Curated Navigation</span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse"></span>
                  <span className="text-[9px] font-mono font-bold text-neon-cyan uppercase tracking-widest">Active System</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ type: "spring", stiffness: 200, damping: 22, delay: i * 0.08 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`group block p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                          isActive 
                            ? 'bg-gradient-to-r from-neon-blue/15 to-neon-purple/5 border-neon-cyan/30 shadow-[0_4px_20px_rgba(0,240,255,0.08)]' 
                            : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10'
                        }`}
                      >
                        {/* Dynamic backdrop accent */}
                        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex flex-col gap-1">
                            <span className={`text-[10px] font-mono font-bold tracking-widest uppercase ${isActive ? 'text-neon-cyan' : 'text-slate-500'}`}>
                              {link.tag}
                            </span>
                            <span className={`text-2xl sm:text-3xl font-display font-bold tracking-tight transition-colors duration-300 ${
                              isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                            }`}>
                              {link.name}
                            </span>
                            <span className="text-xs text-slate-400 font-medium tracking-wide">
                              {link.label}
                            </span>
                          </div>

                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                            isActive 
                              ? 'bg-neon-cyan border-neon-cyan text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]' 
                              : 'bg-white/5 border-white/10 text-slate-400 group-hover:border-neon-cyan/30 group-hover:text-neon-cyan group-hover:scale-105'
                          }`}>
                            <ArrowRight size={18} className={`transition-transform duration-300 ${isActive ? 'translate-x-0' : 'group-hover:translate-x-1'}`} />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Quick Action Buttons Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
              className="relative z-10 flex flex-col gap-4 pt-6 mt-6 border-t border-white/10 w-full"
            >
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono font-bold">Instant Support Hub</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="https://wa.me/919073128151" target="_top" rel="noopener noreferrer" className="w-full">
                  <NeonButton variant="primary" className="w-full !py-4 shadow-[0_0_25px_rgba(0,240,255,0.25)] flex items-center justify-center gap-2 group text-base font-bold">
                    <MessageSquare size={20} className="group-hover:scale-110 transition-transform" /> direct WhatsApp
                  </NeonButton>
                </a>
                <a href="tel:9073128151" className="w-full">
                  <NeonButton variant="outline" className="w-full !py-4 bg-slate-900/60 border border-white/10 flex items-center justify-center gap-2 group text-base font-bold text-slate-300 hover:text-white hover:border-neon-purple/50">
                    <Phone size={20} className="group-hover:scale-110 transition-transform text-neon-purple" /> 907-312-8151
                  </NeonButton>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
