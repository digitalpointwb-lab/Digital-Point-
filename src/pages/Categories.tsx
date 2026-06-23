import { motion } from 'motion/react';
import { GlassCard } from '../components/ui/GlassCard';
import { Camera, Search, Droplets, Monitor, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { id: '1', name: 'Digital Cameras', slug: 'camera', icon: <Camera size={40} />, count: 15, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400', desc: 'Mirrorless, DSLR, and Cinema cameras from Sony, Canon, and RED.' },
  { id: '2', name: 'Premium Lenses', slug: 'lens', icon: <Search size={40} />, count: 28, image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&q=80&w=400', desc: 'Prime, zoom, and anamorphic lenses for every mounting system.' },
  { id: '3', name: 'Pro Drones', slug: 'drone', icon: <Droplets size={40} />, count: 9, image: 'https://images.unsplash.com/photo-1473968512447-ac4307b045d6?auto=format&fit=crop&q=80&w=400', desc: 'DJI Enterprise and consumer drones for aerial cinematography.' },
  { id: '4', name: 'Video Switchers', slug: 'switcher', icon: <Monitor size={40} />, count: 6, image: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=400', desc: 'Blackmagic Design ATEM and multicam switching solutions.' },
  { id: '5', name: 'Photography Accessories', slug: 'accessories', icon: <Settings size={40} />, count: 42, image: 'https://images.unsplash.com/photo-1495121553079-4c61bbbc19ef?auto=format&fit=crop&q=80&w=400', desc: 'Gimbals, tripods, lighting, and essential studio gear.' },
];

export default function Categories() {
  return (
    <div className="pt-32 pb-24 px-6 bg-cyber-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-xs font-bold uppercase tracking-widest mb-4"
          >
            Digital Point Collection
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Equipment <span className="text-neon-blue">Categories</span></h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Browse our specialized collections of high-end imaging gear. Each category is curated for professional performance and technological reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <Link key={cat.id} to={`/products?category=${cat.slug}`}>
              <GlassCard className="group h-full border-white/5 hover:border-neon-blue/30 transition-all duration-500 flex flex-col p-0">
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                  <div className="absolute bottom-4 left-6 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-neon-blue/20 backdrop-blur-md text-neon-blue border border-neon-blue/30">
                      {cat.icon}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-display font-bold">{cat.name}</h2>
                    <span className="text-neon-blue font-mono text-sm">{cat.count} Items</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-6 line-clamp-2">{cat.desc}</p>
                  <div className="flex items-center text-xs font-bold uppercase tracking-widest text-white group-hover:text-neon-blue transition-colors">
                    Explore Inventory <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="ml-2">→</motion.span>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
