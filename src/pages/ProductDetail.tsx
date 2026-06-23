import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { ChevronLeft, MessageSquare, Phone, Truck, Shield, RefreshCcw, Camera } from 'lucide-react';
import { NeonButton } from '../components/ui/NeonButton';
import { GlassCard } from '../components/ui/GlassCard';
import { TiltCard } from '../components/ui/TiltCard';
import { ProductDetailSkeleton } from '../components/ui/Skeleton';
import { useCurrency } from '../contexts/CurrencyContext';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { Product } from '../types';

export default function ProductDetail() {
  const { formatPrice } = useCurrency();
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'products'), where('slug', '==', slug), limit(1));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const pData = { id: snap.docs[0].id, ...snap.docs[0].data() } as Product;
          setProduct(pData);

          // Fetch related
          const rq = query(collection(db, 'products'), where('categoryId', '==', pData.categoryId), limit(4));
          const rSnap = await getDocs(rq);
          const rData = rSnap.docs
            .map(d => ({ id: d.id, ...d.data() } as Product))
            .filter(d => d.id !== pData.id)
            .slice(0, 3);
          setRelatedProducts(rData);
        }
      } catch (error) {
        console.error("Fetch product failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) return <ProductDetailSkeleton />;

  if (!product) {
    return (
      <div className="pt-40 pb-24 px-6 text-center">
        <h1 className="text-4xl font-display font-bold mb-8">Product Not Found</h1>
        <Link to="/products">
          <NeonButton variant="primary">Back to Catalog</NeonButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 bg-cyber-black">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <Link to="/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm mb-12">
          <ChevronLeft size={16} /> Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col gap-6"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden glass-panel border-white/5 relative group">
              <img 
                src={product.images[activeImage] || product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, i) => (
                  <div 
                    key={i} 
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square rounded-xl overflow-hidden border transition-all cursor-pointer ${
                      activeImage === i ? 'border-neon-blue opacity-100 shadow-[0_0_15px_rgba(0,240,255,0.3)]' : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'
                    }`}
                  >
                    <img src={img} alt={`Gallery image ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="text-neon-blue text-sm font-bold uppercase tracking-[.25em] mb-3">{product.brand}</div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{product.name}</h1>
              <div className="text-3xl font-mono text-neon-cyan font-bold mb-6">{formatPrice(product.price)}</div>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400 capitalize">{product.categoryId}</span>
                <span className={`flex items-center gap-2 text-xs font-bold ${product.availability ? 'text-emerald-400' : 'text-red-400'}`}>
                  <div className={`w-2 h-2 rounded-full ${product.availability ? 'bg-emerald-400' : 'bg-red-400'} animate-pulse`} />
                  {product.availability ? 'Available for Inquiry' : 'Temporarily Out of Stock'}
                </span>
              </div>
            </div>

            <GlassCard className="mb-10 border-white/5">
               <h3 className="text-lg font-bold mb-4 border-b border-white/5 pb-2">Technical Overview</h3>
               <p className="text-slate-400 leading-relaxed mb-6">
                 {product.description}
               </p>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {Object.entries(product.specifications).map(([key, value]) => (
                   <div key={key} className="flex flex-col p-3 rounded-lg bg-white/5 border border-white/5">
                     <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">{key}</span>
                     <span className="text-sm font-mono text-white">{value}</span>
                   </div>
                 ))}
               </div>
            </GlassCard>

            <div className="flex flex-col gap-4">
              <a href={`https://wa.me/919073128151?text=Hi, I am interested in the ${product.brand} ${product.name}. Is it available?`} className="w-full">
                <NeonButton variant="primary" className="w-full py-4 text-lg">
                  <MessageSquare size={24} /> WhatsApp Inquiry
                </NeonButton>
              </a>
              <div className="grid grid-cols-2 gap-4">
                <a href="tel:9073128151">
                  <NeonButton variant="outline" className="w-full">
                    <Phone size={20} /> Call Now
                  </NeonButton>
                </a>
                <Link to="/contact">
                  <NeonButton variant="outline" className="w-full">
                    Contact Us
                  </NeonButton>
                </Link>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4">
               {[
                 { icon: <Shield size={18} />, label: 'Genuine Warranty' },
                 { icon: <Camera size={18} />, label: 'Expert Setup' },
                 { icon: <RefreshCcw size={18} />, label: 'Official Support' }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-slate-900/40 border border-white/5">
                   <div className="text-neon-blue">{item.icon}</div>
                   <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter leading-none">{item.label}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-24">
            <h2 className="text-3xl font-display font-bold mb-10">Similar Tech</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/products/${p.slug}`} className="block h-full">
                  <TiltCard className="group border-white/5 hover:border-neon-blue/30 h-full p-0 flex flex-col cursor-pointer">
                    <div className="aspect-video rounded-t-xl overflow-hidden bg-slate-900 border-b border-white/5">
                       <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-neon-blue text-[10px] font-bold uppercase tracking-widest mb-1">{p.brand}</div>
                      <h3 className="text-lg font-bold mb-2 transition-colors group-hover:text-neon-blue">{p.name}</h3>
                      <div className="text-sm font-mono text-neon-cyan font-bold mb-4 mt-auto">{formatPrice(p.price)}</div>
                      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
                        View Model →
                      </div>
                    </div>
                  </TiltCard>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Bar */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-0 left-0 w-full z-40 bg-slate-950/90 backdrop-blur-xl border-t border-white/10 p-4 shadow-[0_-10px_40px_rgba(0,240,255,0.1)]"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden lg:flex items-center gap-4 text-white">
            <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 overflow-hidden">
               <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-[10px] text-neon-blue font-bold uppercase tracking-widest">{product.brand}</div>
              <div className="font-bold">{product.name}</div>
              <div className="text-xs font-mono text-neon-cyan">{formatPrice(product.price)}</div>
            </div>
          </div>
          <div className="flex gap-3 flex-1 lg:flex-none">
            <a href={`https://wa.me/919073128151?text=Hi, I am interested in the ${product.brand} ${product.name}. Is it available?`} className="flex-1 lg:flex-none">
              <NeonButton variant="primary" className="w-full lg:w-auto !px-6 !py-3 flex justify-center items-center h-full">
                <MessageSquare size={18} className="mr-2" /> WhatsApp Chat
              </NeonButton>
            </a>
            <Link to="/contact" className="flex-1 lg:flex-none">
              <NeonButton variant="outline" className="w-full lg:w-auto !px-6 !py-3 flex justify-center items-center h-full bg-black/50">
                Quick Inquiry
              </NeonButton>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
