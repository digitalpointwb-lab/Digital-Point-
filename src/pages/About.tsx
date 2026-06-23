import { motion } from 'motion/react';
import { Award, Target, Users, Zap, Shield, Camera } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';

export default function About() {
  const brandStory = [
    {
      title: "Our Expertise",
      desc: "Digital Point is not just a store; it's a technical partner for creators. Based in Kolkata, we specialize in high-end imaging gear from around the world.",
      icon: <Camera className="text-neon-blue" size={24} />
    },
    {
      title: "Our Mission",
      desc: "To provide the cinematic community in India with the most advanced, reliable, and authentic imaging technology available.",
      icon: <Target className="text-neon-purple" size={24} />
    },
    {
      title: "Our Promise",
      desc: "We stand by every pixel. Our equipment is sourced officially, ensuring you receive genuine hardware with complete manufacturer support.",
      icon: <Shield className="text-luxury-gold" size={24} />
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-cyber-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-block px-4 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-xs font-bold uppercase tracking-widest mb-6">
              Our Legacy
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">Engineering <span className="text-neon-blue">Vision</span></h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              At Digital Point, we believe that the right equipment is the bridge between a creator's imagination and a viewer's reality. 
              Our showroom in Karl Marx Sarani, Kolkata, is a specialized space for professionals who demand nothing but the absolute best.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              From the latest mirrorless systems to cinematic drone technology, we curate a catalog that defines the future of visual storytelling.
            </p>
          </motion.div>
          <div className="relative">
             <div className="aspect-[4/3] rounded-3xl overflow-hidden glass-panel border-white/5 relative z-10">
                <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200" alt="Showroom" className="w-full h-full object-cover" />
             </div>
             <div className="absolute -bottom-10 -right-10 w-full h-full bg-neon-blue/5 blur-3xl -z-10" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
           {brandStory.map((item, i) => (
             <GlassCard key={i} delay={i * 0.1}>
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
             </GlassCard>
           ))}
        </div>

        <div className="glass-panel p-12 text-center border-neon-blue/10 bg-gradient-to-br from-neon-blue/5 to-transparent">
           <h2 className="text-3xl font-display font-bold mb-8">Technical Excellence is Our Standard</h2>
           <div className="flex flex-wrap justify-center gap-12">
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
  );
}
