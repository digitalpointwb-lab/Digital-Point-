import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Camera, MessageSquare, Phone, Zap, ArrowRight, ShoppingCart, Heart, ChevronUp, ChevronDown } from 'lucide-react';
import { NeonButton } from '../ui/NeonButton';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';

// @ts-ignore
import mobileMenuBg from '../../assets/images/mobile_menu_bg_1782246902401.jpg';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
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

  const [activeWheelIndex, setActiveWheelIndex] = useState(0);

  // Sync active index with active wheel index when route changes or menu opens
  useEffect(() => {
    if (isOpen) {
      const currentIdx = navLinks.findIndex(link => link.path === location.pathname);
      setActiveWheelIndex(currentIdx >= 0 ? currentIdx : 0);
    }
  }, [isOpen, location.pathname]);

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
        {isOpen && (() => {
          let dragStartY = 0;
          let isDragging = false;
          let lastWheelTime = 0;

          const handleStart = (clientY: number) => {
            dragStartY = clientY;
            isDragging = true;
          };

          const handleEnd = (clientY: number) => {
            if (!isDragging) return;
            isDragging = false;
            const deltaY = clientY - dragStartY;
            if (Math.abs(deltaY) > 30) {
              if (deltaY < 0) {
                // Swipe/drag up -> Next option
                setActiveWheelIndex(prev => (prev + 1) % navLinks.length);
              } else {
                // Swipe/drag down -> Prev option
                setActiveWheelIndex(prev => (prev - 1 + navLinks.length) % navLinks.length);
              }
            }
          };

          const handleWheel = (e: React.WheelEvent) => {
            const now = Date.now();
            if (now - lastWheelTime < 200) return;
            lastWheelTime = now;
            if (e.deltaY > 0) {
              setActiveWheelIndex(prev => (prev + 1) % navLinks.length);
            } else if (e.deltaY < 0) {
              setActiveWheelIndex(prev => (prev - 1 + navLinks.length) % navLinks.length);
            }
          };

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onWheel={handleWheel}
              className="fixed inset-0 z-40 bg-slate-950/98 backdrop-blur-3xl md:hidden pt-24 px-5 pb-5 overflow-hidden flex flex-col justify-between"
            >
              {/* Absolute Background Image Layer */}
              <div className="absolute inset-0 z-0 opacity-15 pointer-events-none mix-blend-screen overflow-hidden">
                <motion.img 
                  src={mobileMenuBg} 
                  alt="Mobile Menu Background" 
                  referrerPolicy="no-referrer"
                  initial={{ scale: 1.15, opacity: 0 }}
                  animate={{ scale: 1.0, opacity: 0.2 }}
                  exit={{ scale: 1.15, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full h-full object-cover filter saturate-150 brightness-[0.4] contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950" />
              </div>

              {/* Glowing Accent Orbs */}
              <div className="absolute top-1/4 right-[-50px] w-80 h-80 bg-neon-cyan/8 blur-[120px] pointer-events-none animate-pulse"></div>
              <div className="absolute bottom-1/4 left-[-50px] w-80 h-80 bg-neon-purple/8 blur-[120px] pointer-events-none animate-pulse delay-1000"></div>

              {/* Main Content Area */}
              <div className="flex flex-col h-full justify-between relative z-10 w-full pt-4">
                {/* Menu Header with indicator */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-[9px] uppercase tracking-widest text-slate-500 font-mono font-bold">Rotary Navigation</span>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse"></span>
                    <span className="text-[8px] font-mono font-bold text-neon-cyan uppercase tracking-widest">Rotary Active</span>
                  </div>
                </div>

                {/* Split Interactive Screen */}
                <div className="flex-1 flex flex-col justify-center relative overflow-hidden my-4">
                  
                  {/* Left Column: Holographic Console HUD (Displays Active option details) */}
                  <div className="w-full pr-[190px] xs:pr-[225px] sm:pr-[240px] z-20 flex flex-col justify-between min-h-[300px] py-1.5 relative pointer-events-none">
                    {/* Top part: Option details */}
                    <div className="space-y-1.5">
                      {/* Holographic system grid pattern */}
                      <span className="text-[10px] uppercase tracking-widest text-neon-purple font-mono font-bold block animate-pulse">
                        [ SYSTEM LOG {navLinks[activeWheelIndex].tag.split(' / ')[0]} ]
                      </span>
                      
                      <div className="overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.h2 
                            key={activeWheelIndex}
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ type: "spring", stiffness: 150, damping: 15 }}
                            className="text-3xl xs:text-4xl font-display font-extrabold text-white tracking-tight leading-none uppercase"
                          >
                            {navLinks[activeWheelIndex].name}
                          </motion.h2>
                        </AnimatePresence>
                      </div>

                      <div className="overflow-hidden pt-1">
                        <AnimatePresence mode="wait">
                          <motion.p 
                            key={activeWheelIndex + '-label'}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.35, delay: 0.05 }}
                            className="text-xs xs:text-sm text-slate-300 font-medium tracking-wide leading-relaxed max-w-[140px] xs:max-w-[175px] sm:max-w-[200px]"
                          >
                            {navLinks[activeWheelIndex].label}
                          </motion.p>
                        </AnimatePresence>
                      </div>

                      {/* Laser Link Connector Beam (Points towards the active dial button) */}
                      <div className="relative h-1 w-20 flex items-center pt-2">
                        <div className="w-full h-[1px] bg-gradient-to-r from-neon-cyan via-neon-cyan/50 to-transparent"></div>
                        <div className="absolute right-0 w-1.5 h-1.5 rounded-full bg-neon-cyan animate-ping"></div>
                      </div>
                    </div>

                    {/* Bottom part: Rotation controls and user tip aligned cleanly to bottom-left */}
                    <div className="space-y-4 mt-auto">
                      {/* Tactical Rotation Buttons */}
                      <div className="flex items-center gap-2.5">
                        <div className="flex items-center gap-1 bg-slate-900/95 border border-white/10 rounded-xl p-1 shadow-[0_0_15px_rgba(0,0,0,0.5)] pointer-events-auto">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActiveWheelIndex(prev => (prev - 1 + navLinks.length) % navLinks.length);
                            }}
                            className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:border-neon-cyan/40 text-slate-400 hover:text-neon-cyan flex items-center justify-center transition-all active:scale-90"
                            title="Previous option"
                          >
                            <ChevronUp size={20} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActiveWheelIndex(prev => (prev + 1) % navLinks.length);
                            }}
                            className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:border-neon-cyan/40 text-slate-400 hover:text-neon-cyan flex items-center justify-center transition-all active:scale-90"
                            title="Next option"
                          >
                            <ChevronDown size={20} />
                          </button>
                        </div>

                        <div className="flex flex-col text-[9px] font-mono leading-none">
                          <span className="text-slate-500 uppercase tracking-widest block font-bold">ROTARY</span>
                          <span className="text-neon-cyan/90 font-bold block mt-0.5">DIAL</span>
                        </div>
                      </div>

                      {/* Interactive Assist Tip */}
                      <div className="space-y-1 mt-1">
                        <span className="text-[9px] font-mono font-medium text-slate-500 uppercase tracking-widest block animate-pulse">
                          💡 Scroll, drag wheel, or tap arrows to spin
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: High-Tech Premium Camera Lens (Chaka) */}
                  <div 
                    className="absolute right-[-110px] xs:right-[-80px] sm:right-[-50px] top-[50%] -translate-y-1/2 w-[340px] h-[340px] xs:w-[380px] xs:h-[380px] rounded-full z-10 flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
                    onTouchStart={(e) => handleStart(e.touches[0].clientY)}
                    onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientY)}
                    onMouseDown={(e) => handleStart(e.clientY)}
                    onMouseUp={(e) => handleEnd(e.clientY)}
                    onMouseLeave={() => { isDragging = false; }}
                  >
                    {/* 1. Camera Lens Outer Barrel (Slow-spinning zoom/focus ribbed grip) */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
                    >
                      <svg viewBox="0 0 200 200" className="w-full h-full text-neon-cyan" fill="none" stroke="currentColor">
                        {/* Outermost lens grip ridged border */}
                        <circle cx="100" cy="100" r="98" strokeWidth="0.5" strokeDasharray="1, 3" />
                        <circle cx="100" cy="100" r="95" strokeWidth="1.5" strokeDasharray="4, 1.5" />
                        <circle cx="100" cy="100" r="91" strokeWidth="0.5" />
                        
                        {/* Lens markings & Calibration indices */}
                        <circle cx="100" cy="100" r="88" strokeWidth="1" strokeDasharray="30, 15, 5, 15" />
                      </svg>
                    </motion.div>

                    {/* 2. Middle Rotating Optical Inner Barrel (Helical Focus Ring with distance scales) */}
                    <motion.div
                      animate={{ rotate: -activeWheelIndex * 38 }}
                      transition={{ type: "spring", stiffness: 80, damping: 14 }}
                      className="absolute inset-4 opacity-50 pointer-events-none"
                    >
                      <svg viewBox="0 0 200 200" className="w-full h-full text-neon-purple" fill="none" stroke="currentColor">
                        {/* Focus Distance Markings / Precision ticks */}
                        <circle cx="100" cy="100" r="78" strokeWidth="1" strokeDasharray="4, 4" />
                        <circle cx="100" cy="100" r="74" strokeWidth="1.5" />
                        <circle cx="100" cy="100" r="68" strokeWidth="0.75" strokeDasharray="15, 5" />
                        
                        {/* Highly detailed calibration line markings (aperture & focus marks) */}
                        {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((angle) => (
                          <line
                            key={angle}
                            x1="100"
                            y1="12"
                            x2="100"
                            y2="20"
                            className="origin-center"
                            style={{ transform: `rotate(${angle}deg)` }}
                            strokeWidth={angle % 45 === 0 ? "1.5" : "0.75"}
                            stroke={angle % 90 === 0 ? "#00f2ff" : "currentColor"}
                          />
                        ))}
                        
                        {/* Optical Spec Typography engraved along the rotating barrel */}
                        <path id="lensTextPath" d="M 50,100 A 50,50 0 0,1 150,100" className="hidden" />
                        <circle cx="100" cy="100" r="50" strokeWidth="0.5" strokeDasharray="5, 10" />
                      </svg>
                      
                      {/* Stylized camera lens text overlaying the core barrel */}
                      <div className="absolute inset-0 flex items-center justify-center text-[6px] font-mono font-bold tracking-widest text-neon-cyan/40 select-none">
                        <div className="absolute top-[16%] left-1/2 -translate-x-1/2">F/1.2</div>
                        <div className="absolute bottom-[16%] left-1/2 -translate-x-1/2">50mm</div>
                        <div className="absolute left-[16%] top-1/2 -translate-y-1/2 rotate-90 origin-center">NANO COAT</div>
                        <div className="absolute right-[14%] top-1/2 -translate-y-1/2 -rotate-90 origin-center">DIGITAL PT</div>
                      </div>
                    </motion.div>

                    {/* 3. Deep Optical Glass Reflection & Iris Chamber */}
                    <div className="absolute inset-[15%] rounded-full bg-gradient-to-br from-slate-950/90 to-slate-900/90 border border-white/10 shadow-[inner_0_0_25px_rgba(0,0,0,0.9)] pointer-events-none" />

                    {/* 4. Multi-Layered Lens Flares & Reflex Sheen */}
                    <div className="absolute inset-[15%] rounded-full overflow-hidden pointer-events-none">
                      {/* Anamorphic cyan streak flare */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/8 to-transparent opacity-60 transform -rotate-12 translate-y-[-10%] animate-pulse" />
                      {/* Soft purple secondary flare */}
                      <div className="absolute -inset-1/2 bg-radial-gradient from-neon-purple/15 to-transparent blur-md opacity-50 transform translate-x-[20%] translate-y-[-20%]" />
                      {/* Reflection glass highlight */}
                      <div className="absolute top-[4%] left-[10%] w-[50%] h-[25%] bg-white/[0.08] rounded-full filter blur-[2px] transform -rotate-[30deg]" />
                    </div>

                    {/* 5. Camera Lens Center "Enter Zone" Action Button */}
                    <div className="absolute inset-[30%] z-30 flex items-center justify-center pointer-events-auto">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate(navLinks[activeWheelIndex].path);
                          setIsOpen(false);
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                        onMouseUp={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                        onTouchEnd={(e) => e.stopPropagation()}
                        className="w-full h-full rounded-full p-2 bg-slate-950/95 border border-neon-cyan/40 hover:border-neon-cyan shadow-[0_0_20px_rgba(0,242,255,0.25)] hover:shadow-[0_0_35px_rgba(0,242,255,0.5)] transition-all duration-300 flex flex-col items-center justify-center relative group overflow-hidden cursor-pointer"
                      >
                        {/* Stylized camera aperture blades in center */}
                        <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none">
                          <svg viewBox="0 0 100 100" className="w-full h-full text-neon-cyan/25 group-hover:rotate-45 transition-transform duration-700 ease-out" fill="none" stroke="currentColor" strokeWidth="0.75">
                            {/* Aperture blades (shutter blades) */}
                            <path d="M 50,0 L 80,40 L 50,80 L 20,40 Z" />
                            <path d="M 10,30 L 90,30" strokeDasharray="2, 2" />
                            <path d="M 10,70 L 90,70" strokeDasharray="2, 2" />
                            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" />
                          </svg>
                        </div>
                        
                        {/* Glowing focus point ring */}
                        <div className="absolute inset-3 border border-neon-cyan/20 group-hover:border-neon-cyan/40 rounded-full animate-pulse transition-colors" />

                        {/* Interactive shimmer flare */}
                        <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/10 to-transparent group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-1000 ease-out pointer-events-none" />

                        {/* Glass glossy highlight */}
                        <div className="absolute top-1.5 left-2 right-2 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-full pointer-events-none opacity-40 group-hover:opacity-60" />

                        {/* Text labels inside lens */}
                        <span className="font-display font-black text-[10px] xs:text-[11px] text-neon-cyan uppercase tracking-widest text-center leading-none drop-shadow-[0_0_4px_rgba(0,242,255,0.6)]">
                          ENTER
                        </span>
                        <span className="font-mono text-[8px] text-slate-400 group-hover:text-white transition-colors uppercase tracking-widest mt-1">
                          ZONE
                        </span>

                        {/* Pulsing red focus dot */}
                        <div className="absolute bottom-3 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping absolute opacity-70" />
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 relative" />
                        </div>
                      </button>
                    </div>

                    {/* Perimeter Navigation Options (Arranged in Semicircle Arc) */}
                    {navLinks.map((link, i) => {
                      const relativeOffset = i - activeWheelIndex;
                      // Center is on the right side, so 180 degrees points directly left
                      const angleDegrees = 180 + relativeOffset * 38;
                      const angleRadians = (angleDegrees * Math.PI) / 180;
                      
                      const radius = 135; // Beautiful arc radius
                      const x = Math.cos(angleRadians) * radius;
                      const y = Math.sin(angleRadians) * radius;
                      
                      const isActive = i === activeWheelIndex;
                      const distance = Math.abs(relativeOffset);
                      
                      // Calculate opacity based on proximity to active selection
                      const opacity = distance === 0 ? 1 : distance === 1 ? 0.75 : distance === 2 ? 0.35 : 0.08;
                      const scale = isActive ? 1.18 : 0.88;

                      return (
                        <motion.div
                          key={link.path}
                          className="absolute cursor-pointer group"
                          style={{ x, y }}
                          animate={{
                            scale,
                            opacity,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 130,
                            damping: 15,
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (isActive) {
                              navigate(link.path);
                              setIsOpen(false);
                            } else {
                              setActiveWheelIndex(i);
                            }
                          }}
                        >
                          <div className="relative flex items-center">
                            
                            {/* Hover/Selected Text Label (ONLY show when active to prevent layout overlap/clumping!) */}
                            <AnimatePresence mode="wait">
                              {isActive && (
                                <motion.span 
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -5 }}
                                  transition={{ duration: 0.2 }}
                                  className="hidden sm:block absolute right-[125%] font-display font-black text-lg text-neon-cyan drop-shadow-[0_0_8px_rgba(0,242,255,0.4)] tracking-tighter text-right select-none whitespace-nowrap z-30"
                                >
                                  {link.name}
                                </motion.span>
                              )}
                            </AnimatePresence>

                            {/* Circular Selector Ring */}
                            <div className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                              isActive 
                                ? 'w-12 h-12 bg-gradient-to-br from-neon-cyan to-neon-blue border border-white shadow-[0_0_15px_rgba(0,242,255,0.5)] text-black font-extrabold' 
                                : 'w-9 h-9 bg-slate-900/90 border border-white/10 hover:border-neon-cyan/40 text-slate-400 hover:text-white'
                            }`}>
                              <span className="font-mono text-[9px]">
                                0{i + 1}
                              </span>
                              
                              {/* Glowing Active Ring Ringlets */}
                              {isActive && (
                                <div className="absolute inset-[-4px] border border-neon-cyan rounded-full animate-ping opacity-35 pointer-events-none" />
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Action Buttons Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="relative z-10 flex flex-col gap-3 pt-3 border-t border-white/5 w-full mt-auto"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] uppercase tracking-widest text-slate-500 font-mono font-bold">Instant Support Hub</span>
                    <span className="text-[8px] uppercase tracking-widest text-neon-cyan/80 font-mono font-bold">Direct Hotline</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <a href="https://wa.me/919073128151" target="_top" rel="noopener noreferrer" className="w-full">
                      <NeonButton variant="primary" className="w-full !py-2.5 pb-2.5 shadow-[0_0_15px_rgba(0,240,255,0.15)] flex items-center justify-center gap-1.5 group text-xs font-bold">
                        <MessageSquare size={14} className="group-hover:scale-110 transition-transform" /> WhatsApp
                      </NeonButton>
                    </a>
                    <a href="tel:9073128151" className="w-full">
                      <NeonButton variant="outline" className="w-full !py-2.5 pb-2.5 bg-slate-900/60 border border-white/5 flex items-center justify-center gap-1.5 group text-xs font-bold text-slate-300 hover:text-white">
                        <Phone size={14} className="group-hover:scale-110 transition-transform text-neon-purple" /> 907-312-8151
                      </NeonButton>
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </nav>
  );
}
