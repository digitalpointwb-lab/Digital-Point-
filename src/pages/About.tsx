import { motion } from 'motion/react';
import { Award, Target, Users, Zap, Shield, Camera } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';

// @ts-ignore
import showroomKolkata from '../assets/images/showroom_kolkata_1782245202138.jpg';
// @ts-ignore
import expertiseBack from '../assets/images/expertise_back_1782246141974.jpg';
// @ts-ignore
import missionBack from '../assets/images/mission_back_1782246157430.jpg';
// @ts-ignore
import promiseBack from '../assets/images/promise_back_1782246174257.jpg';
// @ts-ignore
import abstractGlassOptics from '../assets/images/abstract_glass_optics_1782246052813.jpg';

export default function About() {
  const brandStory = [
    {
      title: "Our Expertise",
      desc: "Digital Point is not just a store; it's a technical partner for creators. Based in Kolkata, we specialize in high-end imaging gear from around the world.",
      icon: <Camera className="text-neon-blue" size={24} />,
      bgImage: expertiseBack
    },
    {
      title: "Our Mission",
      desc: "To provide the cinematic community in India with the most advanced, reliable, and authentic imaging technology available.",
      icon: <Target className="text-neon-purple" size={24} />,
      bgImage: missionBack
    },
    {
      title: "Our Promise",
      desc: "We stand by every pixel. Our equipment is sourced officially, ensuring you receive genuine hardware with complete manufacturer support.",
      icon: <Shield className="text-luxury-gold" size={24} />,
      bgImage: promiseBack
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-cyber-black min-h-screen relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-xs font-bold uppercase tracking-widest mb-6">
              Our Legacy
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-cyan to-white">Vision</span></h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              At Digital Point, we believe that the right equipment is the bridge between a creator's imagination and a viewer's reality. 
              Our showroom in Karl Marx Sarani, Kolkata, is a specialized space for professionals who demand nothing but the absolute best.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              From the latest mirrorless systems to cinematic drone technology, we curate a catalog that defines the future of visual storytelling.
            </p>
          </motion.div>
          <div className="relative">
             <div className="aspect-[4/3] rounded-3xl overflow-hidden glass-panel border-white/5 relative z-10 shadow-[0_20px_50px_rgba(0,240,255,0.15)] group">
                <img 
                  src={showroomKolkata} 
                  alt="Showroom" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
             </div>
             <div className="absolute -bottom-10 -right-10 w-full h-full bg-neon-blue/5 blur-3xl -z-10" />
          </div>
        </div>

        {/* Brand Story Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
           {brandStory.map((item, i) => (
             <GlassCard key={i} delay={i * 0.1} className="relative overflow-hidden group hover:border-neon-blue/30 transition-all duration-500">
                {/* AI Generated Card Backdrop */}
                <div className="absolute inset-0 opacity-15 group-hover:opacity-35 transition-all duration-700 pointer-events-none mix-blend-screen -m-6 z-0">
                  <img 
                    src={item.bgImage} 
                    alt={item.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:border-neon-blue/30 group-hover:scale-105 transition-all duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4 text-white group-hover:text-neon-cyan transition-colors">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-base sm:text-lg">{item.desc}</p>
                </div>
             </GlassCard>
           ))}
        </div>

        {/* Technical Excellence Stats Grid with stunning backdrop */}
        <div className="glass-panel p-12 text-center border-neon-blue/10 bg-slate-950/40 relative overflow-hidden group hover:border-neon-blue/30 transition-all duration-700 shadow-2xl">
           {/* Abstract Glass Optics background overlay */}
           <div className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-1000 mix-blend-screen pointer-events-none">
             <img 
               src={abstractGlassOptics} 
               alt="Technical Excellence background" 
               referrerPolicy="no-referrer"
               className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-out filter brightness-[0.7]" 
             />
             <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-transparent to-slate-950/95" />
           </div>

           <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-cyan to-white drop-shadow-md">Technical Excellence is Our Standard</h2>
              <div className="flex flex-wrap justify-center gap-12 sm:gap-16">
                <div className="flex flex-col gap-2">
                   <span className="text-4xl font-display font-bold text-white">100%</span>
                   <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Genuine Gear</span>
                </div>
                <div className="flex flex-col gap-2">
                   <span className="text-4xl font-display font-bold text-neon-blue">50+</span>
                   <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Global Brands</span>
                </div>
                <div className="flex flex-col gap-2">
                   <span className="text-4xl font-display font-bold text-neon-purple">KOL</span>
                   <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Base of Operations</span>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
