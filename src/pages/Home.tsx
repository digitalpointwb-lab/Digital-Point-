import React from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ChevronRight, MessageSquare, Phone, Zap, Shield, Award, Star, Quote } from 'lucide-react';
import { NeonButton } from '../components/ui/NeonButton';
import { GlassCard } from '../components/ui/GlassCard';
import { Link } from 'react-router-dom';

// @ts-ignore
import catCamera from '../assets/images/cat_camera_1782244861172.jpg';
// @ts-ignore
import catLens from '../assets/images/cat_lens_1782244873556.jpg';
// @ts-ignore
import catDrone from '../assets/images/cat_drone_1782244886075.jpg';
// @ts-ignore
import catSwitcher from '../assets/images/cat_switcher_1782244899686.jpg';
// @ts-ignore
import heroCinemaCamera from '../assets/images/hero_cinema_camera_1782245177348.jpg';
// @ts-ignore
import heroBackgroundGlow from '../assets/images/hero_background_glow_1782246023779.jpg';
// @ts-ignore
import warrantyMacroSensor from '../assets/images/warranty_macro_sensor_1782246038393.jpg';
// @ts-ignore
import abstractGlassOptics from '../assets/images/abstract_glass_optics_1782246052813.jpg';

// @ts-ignore
import premiumSelectionBg from '../assets/images/premium_selection_bg_1782567720100.jpg';
// @ts-ignore
import expertConsultationBg from '../assets/images/expert_consultation_bg_1782567737108.jpg';
// @ts-ignore
import directSupportBg from '../assets/images/direct_support_bg_1782567756096.jpg';

function TiltCard({ children, className, depth = 50 }: { children: React.ReactNode, className?: string, depth?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative perspective-1000 ${className || ''}`}
    >
      <div style={{ transform: `translateZ(${depth}px)`, transformStyle: "preserve-3d" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}

import { SectionDivider } from '../components/ui/SectionDivider';
import { LensFlare } from '../components/ui/LensFlare';

export default function Home() {
  const featuredCategories = [
    { name: 'Cameras', image: catCamera, count: 12, slug: 'camera' },
    { name: 'Lenses', image: catLens, count: 24, slug: 'lens' },
    { name: 'Drones', image: catDrone, count: 8, slug: 'drone' },
    { name: 'Switchers', image: catSwitcher, count: 5, slug: 'switcher' },
  ];

  return (
    <div className="flex flex-col perspective-1000">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden perspective-1000">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-transparent" />
        <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
           <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-blue/20 rounded-full blur-[150px] animate-pulse" />
           <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-[150px] animate-[pulse_5s_ease-in-out_infinite] delay-700" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 transform-style-3d">
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: 30 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-900/50 backdrop-blur-3xl border border-white/10 text-white text-xs font-bold tracking-widest uppercase mb-8 overflow-hidden group shadow-[0_0_30px_rgba(0,242,255,0.15)] hover:shadow-[0_0_30px_rgba(0,242,255,0.3)] transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-neon-blue/20 animate-gradient-bg opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-[1px] bg-gradient-to-r from-neon-blue to-neon-purple opacity-30 blur-sm group-hover:opacity-60 transition-opacity duration-500 rounded-full"></div>
              <div className="absolute inset-[1px] bg-cyber-black/40 backdrop-blur-3xl rounded-full"></div>
              
              <span className="relative z-10 flex items-center gap-2 font-black tracking-[0.2em]">
                <Zap size={14} className="text-neon-cyan animate-pulse" /> 
                <span className="glitch-anim inline-block text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">Future of Imaging</span>
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
              className="gsap-reveal text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6 drop-shadow-2xl"
            >
              <span className="glitch-anim inline-block">Professional Imaging</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple animate-gradient-bg inline-block hover:scale-105 transition-transform cursor-default glitch-anim">
                Technology
              </span> <span className="glitch-anim inline-block">for Creators</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
              className="gsap-reveal text-lg text-slate-400 mb-10 max-w-lg leading-relaxed"
            >
              Premium cameras, lenses, drones, video switchers, and photography accessories from Digital Point. Elevate your production to cinema standards.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/products">
                <NeonButton variant="primary" className="hover:scale-105 transition-transform">
                  Explore Catalog <ChevronRight size={20} />
                </NeonButton>
              </Link>
              <a href="https://wa.me/919073128151" target="_top" rel="noopener noreferrer">
                <NeonButton variant="outline" className="hover:scale-105 transition-transform group">
                  <MessageSquare size={20} className="group-hover:animate-bounce" /> WhatsApp Inquiry
                </NeonButton>
              </a>
            </motion.div>
            
            <div className="mt-12 flex items-center gap-8 pt-8 border-t border-white/5">
              {[
                { label: 'Products', value: '500+' },
                { label: 'Top Brands', value: '15+' },
                { label: 'Support', value: '24/7' }
              ].map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + (idx * 0.1) }}
                >
                  <div className="text-2xl font-bold text-white drop-shadow-md">{stat.value}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: 20, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative hidden lg:block perspective-1000"
          >
            <TiltCard depth={80} className="relative z-10 w-full aspect-square rounded-[3rem] overflow-hidden glass-panel border-white/10 p-2 group shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
              <div 
                className="w-full h-full rounded-[2.5rem] overflow-hidden relative"
                onMouseMove={(e) => {
                  const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - left) / width) * 100;
                  const y = ((e.clientY - top) / height) * 100;
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transformOrigin = `${x}% ${y}%`;
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transformOrigin = `center center`;
                }}
              >
                <img 
                  src={heroCinemaCamera} 
                  alt="Cinema Camera"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-[2.5rem] group-hover:scale-125 transition-transform duration-500 ease-out will-change-transform" 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none rounded-[3rem]" />
              <div className="absolute bottom-10 left-10 right-10 pointer-events-none" style={{ transform: 'translateZ(100px)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,1)]"></span>
                  <div className="text-neon-blue text-sm font-bold uppercase tracking-widest">Featured Gear</div>
                </div>
                <div className="text-3xl font-display font-bold text-white drop-shadow-lg">RED V-RAPTOR 8K VV</div>
              </div>
            </TiltCard>
            {/* Holographic Accents */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border border-neon-blue/30 rounded-full animate-[spin_10s_linear_infinite] shadow-[0_0_30px_rgba(0,240,255,0.2)]" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 border-2 border-dashed border-neon-purple/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Featured Categories */}
      <section className="py-24 bg-transparent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
          >
            <div>
              <h2 className="gsap-reveal text-4xl md:text-5xl font-display font-bold mb-4 drop-shadow-md">
                <span className="glitch-anim">Master Every Angle</span>
              </h2>
              <p className="gsap-reveal text-slate-400 text-lg">Premium equipment curated for every specialized creative workflow.</p>
            </div>
            <Link to="/categories" className="text-neon-blue font-bold flex items-center gap-2 hover:gap-3 transition-all shrink-0">
              View All Categories <ChevronRight size={20} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCategories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="perspective-1000"
              >
                <TiltCard depth={40}>
                  <GlassCard showAnimatedBorder={true} className="h-full hover:border-neon-blue/50 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] group overflow-hidden">
                    <div 
                      className="relative w-full h-44 mb-6 rounded-2xl overflow-hidden border border-white/10 group-hover:border-neon-blue/40 transition-colors duration-300 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] bg-slate-950 flex items-center justify-center" 
                      style={{ transform: "translateZ(30px)" }}
                      onMouseMove={(e) => {
                        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                        const x = ((e.clientX - left) / width) * 100;
                        const y = ((e.clientY - top) / height) * 100;
                        const img = e.currentTarget.querySelector('img');
                        if (img) img.style.transformOrigin = `${x}% ${y}%`;
                      }}
                      onMouseLeave={(e) => {
                        const img = e.currentTarget.querySelector('img');
                        if (img) img.style.transformOrigin = `center center`;
                      }}
                    >
                      <img 
                        src={cat.image} 
                        alt={cat.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500 ease-out brightness-90 group-hover:brightness-100 will-change-transform"
                      />
                      <LensFlare className="opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 tracking-tight" style={{ transform: "translateZ(20px)" }}>{cat.name}</h3>
                    <p className="text-slate-500 text-sm mb-6" style={{ transform: "translateZ(10px)" }}>{cat.count} Premium Models</p>
                    <Link to={`/products?category=${cat.slug}`} className="text-neon-cyan text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-neon-blue transition-colors w-max" style={{ transform: "translateZ(15px)" }}>
                      Explore <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </GlassCard>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Brand Showcase - Why Digital Point */}
      <section className="py-24 relative overflow-hidden bg-transparent">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50, rotateY: -20 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="order-2 lg:order-1 relative w-full mx-auto"
          >
            {/* Premium Card Layout */}
            <TiltCard depth={60}>
              <div className="relative group perspective-1000">
                <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue/40 via-neon-purple/40 to-neon-cyan/40 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative h-full bg-slate-950/40 backdrop-blur-3xl border border-white/20 hover:border-neon-blue/50 transition-all duration-500 rounded-[2rem] p-10 sm:p-14 overflow-hidden shadow-2xl">
                  
                  {/* Glowing Laser Scan Line */}
                  <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent blur-[1.5px] animate-scan-sweep pointer-events-none z-20" />
                  <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-neon-cyan/5 to-transparent opacity-30 animate-scan-sweep pointer-events-none z-15" />
                  
                  {/* Subtle Grid Background */}
                  <div className="absolute inset-0 bg-white/5 opacity-10 brightness-100 mix-blend-overlay"></div>
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                  
                  {/* AI Generated Warranty Background Image */}
                  <div className="absolute inset-0 opacity-25 group-hover:opacity-40 transition-opacity duration-1000 mix-blend-screen pointer-events-none">
                    <img 
                      src={warrantyMacroSensor} 
                      alt="Warranty Tech Detail" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out filter saturate-100 brightness-[0.6]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  </div>

                  <div className="relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left h-full transform-style-3d">
                    <div style={{ transform: "translateZ(40px)" }} className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-neon-blue/10 via-neon-purple/5 to-neon-cyan/10 border border-white/10 flex items-center justify-center mb-8 sm:mb-12 shadow-[0_0_40px_rgba(0,240,255,0.15)] group-hover:shadow-[0_0_50px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-all duration-700 ease-out relative">
                      {/* Rotating HUD Concentric Rings */}
                      <div className="absolute -inset-2 rounded-full border border-dashed border-neon-blue/40 animate-spin-slow pointer-events-none"></div>
                      <div className="absolute -inset-4 rounded-full border border-dotted border-neon-purple/30 animate-spin-reverse-slow pointer-events-none"></div>
                      <div className="absolute inset-1 rounded-full border border-neon-cyan/10 pointer-events-none animate-pulse"></div>
                      <Shield className="text-neon-cyan relative z-10 drop-shadow-[0_0_15px_rgba(0,255,242,0.6)] animate-pulse" size={44} strokeWidth={1.2} />
                    </div>
                    
                    <div className="space-y-6" style={{ transform: "translateZ(30px)" }}>
                      <h4 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-white leading-tight drop-shadow-md">
                        Authentic <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-cyan to-white">Warranty</span>
                      </h4>
                      <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-sm">
                        Complete peace of mind. Every piece of gear comes with official manufacturer backing and our priority service commitment.
                      </p>
                    </div>

                    {/* Trust badges/indicators */}
                    <div style={{ transform: "translateZ(20px)" }} className="mt-12 sm:mt-16 flex items-center justify-center sm:justify-start gap-6 sm:gap-10 border-t border-white/10 pt-8 sm:pt-10 w-full">
                      <div className="flex flex-col items-center sm:items-start group/badge relative">
                        <div className="text-3xl font-bold text-white group-hover/badge:text-neon-blue transition-colors drop-shadow-[0_0_8px_rgba(0,242,255,0.3)] duration-300">100%</div>
                        <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1 group-hover/badge:text-neon-blue/80 transition-colors">Genuine</div>
                      </div>
                      <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                      <div className="flex flex-col items-center sm:items-start group/badge relative">
                        <div className="text-3xl font-bold text-white group-hover/badge:text-neon-purple transition-colors drop-shadow-[0_0_8px_rgba(188,19,254,0.3)] duration-300">24/7</div>
                        <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1 group-hover/badge:text-neon-purple/80 transition-colors">Support</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative glow inside card */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-neon-blue/30 transition-colors duration-1000"></div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="order-1 lg:order-2"
          >
            <h2 className="gsap-reveal text-4xl md:text-5xl font-display font-bold mb-10 leading-tight">
              <span className="glitch-anim">Why Creators Choose</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple animate-gradient-bg glitch-anim inline-block">Digital Point</span>
            </h2>
            <div className="space-y-10">
                {[
                  { icon: <Award className="text-luxury-gold" size={28} />, title: "Premium Selection", desc: "Hand-picked inventory from the world's leading imaging brands like Sony, DJI, and RED.", bgImage: premiumSelectionBg },
                  { icon: <Zap className="text-neon-purple" size={28} />, title: "Expert Consultation", desc: "Technical advice from professionals who understand cinema and photography workflows.", bgImage: expertConsultationBg },
                  { icon: <Phone className="text-neon-cyan" size={28} />, title: "Direct Support", desc: "No bots. Real human conversation for inquiries, stock checks, and custom orders.", bgImage: directSupportBg }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2, duration: 0.6 }}
                    className="relative flex flex-col sm:flex-row gap-6 p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-3xl overflow-hidden group hover:border-neon-cyan/40 hover:shadow-[0_0_30px_rgba(0,242,255,0.15)] transition-all duration-500"
                  >
                    {/* Background abstract image overlay */}
                    <div className="absolute inset-0 opacity-100 pointer-events-none">
                      <img 
                        src={item.bgImage} 
                        alt={item.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ease-out filter contrast-125 saturate-150 brightness-[0.85] group-hover:brightness-100" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-cyber-black/90 via-cyber-black/50 to-cyber-black/20 group-hover:via-cyber-black/30 transition-all duration-700"></div>
                    </div>
                    
                    <div className="w-16 h-16 rounded-2xl bg-slate-900/80 backdrop-blur-3xl shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center shrink-0 border border-white/10 group-hover:border-neon-cyan/50 group-hover:shadow-[0_0_20px_rgba(0,242,255,0.3)] group-hover:scale-110 transition-all duration-500 relative overflow-hidden z-10">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      {item.icon}
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-2xl font-bold mb-2 text-white group-hover:text-neon-cyan transition-colors drop-shadow-md">{item.title}</h4>
                      <p className="text-slate-300 text-base sm:text-lg leading-relaxed drop-shadow-md">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
            </div>
            <div className="mt-14">
              <Link to="/about">
                <NeonButton variant="outline" className="text-lg px-8 py-4">Learn Our Story</NeonButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Reviews Section */}
      <section className="py-24 bg-transparent relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 drop-shadow-md">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Reviews</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-6">
              Don't just take our word for it. Hear what professional creators have to say about their experience with Digital Point.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900/50 border border-white/10 backdrop-blur-3xl">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-gradient-to-br from-neon-blue/40 to-neon-purple/40 flex items-center justify-center text-xs font-bold text-white z-10 relative overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-start ml-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} className="text-luxury-gold fill-luxury-gold" />)}
                </div>
                <span className="text-sm font-bold text-white mt-1">Trusted by 2340+ happy customers</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rahul M.",
                role: "Cinematographer",
                text: "The delivery was incredibly fast and the packaging was absolutely secure. The gear is top-notch. Highly recommended for any serious filmmaker looking for reliable equipment.",
                rating: 5,
              },
              {
                name: "Priyanka S.",
                role: "Wedding Photographer",
                text: "Digital Point is my go-to for all lenses and bodies. Their authentic warranty gives me complete peace of mind during crucial shoots. The support is fantastic.",
                rating: 5,
              },
              {
                name: "Vikram D.",
                role: "Content Creator",
                text: "Expert consultation really helped me decide on my first cinema camera rig. No upselling, just genuine advice and the best prices I could find online.",
                rating: 5,
              },
              {
                name: "Anjali K.",
                role: "Portrait Photographer",
                text: "I was looking for a specific high-end lens and couldn't find it anywhere. Digital Point not only had it in stock but also delivered it before my weekend shoot. Amazing service!",
                rating: 5,
              },
              {
                name: "Rohit T.",
                role: "Vlogger & Youtuber",
                text: "The buying process was incredibly smooth. They even helped me choose the right microphone for my setup. The pricing is unbeatable for the quality you're getting.",
                rating: 5,
              },
              {
                name: "Sneha R.",
                role: "Fashion Photographer",
                text: "Outstanding customer service! I faced a minor issue with my lighting kit, and their team resolved it within hours. It's rare to see such dedication locally.",
                rating: 5,
              }
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, rotateY: 30 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
                className="perspective-1000"
              >
                <TiltCard depth={40}>
                  <div className="relative h-full bg-slate-900/50 backdrop-blur-3xl border border-white/10 hover:border-neon-blue/30 transition-all duration-500 rounded-3xl p-8 group">
                    <div className="absolute top-6 right-8 text-white/5 group-hover:text-neon-blue/10 transition-colors duration-500 transform group-hover:scale-110" style={{ transform: "translateZ(10px)" }}>
                      <Quote size={80} />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex gap-1 mb-6" style={{ transform: "translateZ(30px)" }}>
                        {[...Array(review.rating)].map((_, j) => (
                          <Star key={j} className="text-luxury-gold fill-luxury-gold" size={16} />
                        ))}
                      </div>
                      
                      <p className="text-slate-300 text-lg leading-relaxed mb-8 italic" style={{ transform: "translateZ(20px)" }}>
                        "{review.text}"
                      </p>
                      
                      <div className="flex items-center gap-4 border-t border-white/10 pt-6" style={{ transform: "translateZ(40px)" }}>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center border border-white/10 text-white font-bold text-lg shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-white font-bold tracking-wide">{review.name}</h4>
                          <span className="text-neon-cyan text-xs uppercase tracking-widest">{review.role}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Inquiry CTA */}
      <section className="py-32 px-6 relative overflow-hidden bg-transparent">
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff0a_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-neon-blue/30 via-cyber-navy to-neon-purple/30 p-[1px] relative z-10 shadow-[0_0_80px_rgba(0,240,255,0.15)]"
        >
          <TiltCard depth={30}>
            <div className="bg-cyber-black/40 rounded-[3rem] p-12 md:p-20 text-center backdrop-blur-3xl overflow-hidden relative">
              {/* Internal glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg max-h-lg bg-neon-blue/10 blur-[100px] rounded-full pointer-events-none"></div>

              <div className="relative z-10" style={{ transform: "translateZ(50px)" }}>
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 drop-shadow-lg leading-tight">Ready to Build Your <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue">Cinematic Rig?</span></h2>
                <p className="text-slate-300 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                  Our specialists are ready to help you find the perfect lens, body, or drone for your next project. Get a personalized quote today.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <a href="https://wa.me/919073128151" target="_top" rel="noopener noreferrer">
                    <NeonButton variant="primary" className="px-10 py-5 text-lg w-full sm:w-auto shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:shadow-[0_0_50px_rgba(0,240,255,0.5)] transition-all">
                      <MessageSquare size={24} className="mr-2" /> WhatsApp Us Now
                    </NeonButton>
                  </a>
                  <Link to="/contact">
                    <NeonButton variant="outline" className="px-10 py-5 text-lg w-full sm:w-auto bg-black/40 backdrop-blur-3xl hover:bg-white/10 transition-all border border-white/10">
                      Submit Inquiry Form
                    </NeonButton>
                  </Link>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </section>
    </div>
  );
}

