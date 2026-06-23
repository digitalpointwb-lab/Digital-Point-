import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Camera, MessageSquare, Phone, Zap } from 'lucide-react';
import { NeonButton } from '../ui/NeonButton';
import { CurrencyToggle } from '../ui/CurrencyToggle';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${scrolled ? 'pt-4' : 'pt-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`flex items-center justify-between rounded-2xl transition-all duration-500 ${scrolled ? 'bg-slate-950/80 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] py-3 px-4 sm:px-6' : 'bg-transparent py-2'}`}>
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group relative z-50 shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-neon-blue rounded-lg sm:rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10 border border-white/20">
                <Camera className="text-black" size={18} />
              </div>
            </div>
            <span className="text-xl sm:text-2xl font-display font-bold tracking-tighter text-white">
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
                  <span className={`relative z-10 ${isActive ? 'text-neon-cyan' : 'text-slate-300 group-hover:text-white'}`}>
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-4 relative z-50">
            <CurrencyToggle />
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
          <div className="md:hidden flex items-center gap-4 relative z-50">
            <CurrencyToggle />
            <button className="relative w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white" onClick={() => setIsOpen(!isOpen)}>
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu size={20} />
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
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl md:hidden pt-28 px-6 pb-6 overflow-y-auto"
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-purple/10 blur-[100px] pointer-events-none"></div>

            <div className="flex flex-col gap-6 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block text-3xl font-display font-medium ${location.pathname === link.path ? 'text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-cyan' : 'text-slate-300'}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-4 pt-8 mt-4 border-t border-white/10"
              >
                <a href="https://wa.me/919073128151" className="w-full">
                  <NeonButton variant="primary" className="w-full !py-4 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                    <MessageSquare size={20} className="mr-2" /> direct WhatsApp
                  </NeonButton>
                </a>
                <a href="tel:9073128151" className="w-full">
                  <NeonButton variant="outline" className="w-full !py-4 bg-white/5">
                    <Phone size={20} className="mr-2" /> 907-312-8151
                  </NeonButton>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
