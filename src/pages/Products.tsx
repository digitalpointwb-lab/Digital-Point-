import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, SlidersHorizontal, MessageSquare, Phone, Eye, ArrowUpDown, Camera } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { TiltCard } from '../components/ui/TiltCard';
import { NeonButton } from '../components/ui/NeonButton';
import { ProductCardSkeleton } from '../components/ui/Skeleton';
import { useCurrency } from '../contexts/CurrencyContext';
import { auth, db } from '../lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Product } from '../types';
import { seedSampleData } from '../lib/db-utils';
import { onAuthStateChanged } from 'firebase/auth';

export default function Products() {
  const { formatPrice } = useCurrency();
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || 'all');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(user?.email === 'digitalpointwb@gmail.com');
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { label: 'All Gear', value: 'all' },
    { label: 'Cameras', value: 'camera' },
    { label: 'Lenses', value: 'lens' },
    { label: 'Drones', value: 'drone' },
    { label: 'Switchers', value: 'switcher' },
    { label: 'Accessories', value: 'accessories' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                             p.brand.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || p.categoryId === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          const tA = a.createdAt?.seconds 
            ? a.createdAt.seconds * 1000 
            : (a.createdAt && typeof a.createdAt.toDate === 'function' 
                ? a.createdAt.toDate().getTime() 
                : new Date(a.createdAt).getTime() || 0);
          const tB = b.createdAt?.seconds 
            ? b.createdAt.seconds * 1000 
            : (b.createdAt && typeof b.createdAt.toDate === 'function' 
                ? b.createdAt.toDate().getTime() 
                : new Date(b.createdAt).getTime() || 0);
          return (tB || 0) - (tA || 0);
        }
        if (sortBy === 'featured') return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [search, selectedCategory, sortBy, products]);

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-cyber-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Equipment <span className="text-neon-blue">Catalog</span></h1>
          <p className="text-slate-400">Discover professional technology for your next production.</p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="text" 
              placeholder="Search by model, brand, or technology..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-neon-blue/50 transition-colors"
            />
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-slate-900/50 border border-white/10 rounded-xl px-6 py-4 text-slate-300 hover:text-white hover:border-white/20 transition-all font-medium"
            >
              <Filter size={20} /> <span className="hidden sm:inline">Filters</span>
            </button>
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-slate-900/50 border border-white/10 rounded-xl px-12 py-4 text-slate-300 hover:text-white hover:border-white/20 transition-all font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest Arrivals</option>
                <option value="name">Model A-Z</option>
              </select>
              <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
            </div>
          </div>
        </div>

        {/* Filter Drawer */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12"
            >
              <GlassCard className="border-neon-blue/20 bg-neon-blue/5">
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase transition-all ${
                        selectedCategory === cat.value 
                        ? 'bg-neon-blue text-black' 
                        : 'bg-white/5 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <ProductCardSkeleton key={n} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, i) => (
              <TiltCard key={product.id} delay={i * 0.05} className="flex flex-col p-0 group border-white/5 hover:border-neon-blue/30 h-full">
                <div className="aspect-[4/5] relative overflow-hidden bg-slate-900 border-b border-white/5">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {product.isFeatured && (
                    <div className="absolute top-4 left-4 bg-luxury-gold text-black text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded">
                      Featured
                    </div>
                  )}
                  {product.availability ? (
                    <div className="absolute top-4 right-4 bg-emerald-500/20 backdrop-blur-md text-emerald-400 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-emerald-500/30 w-fit ml-auto">
                      In Stock
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4 bg-red-500/20 backdrop-blur-md text-red-400 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-red-500/30 w-fit ml-auto">
                      Out of Stock
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-neon-blue text-[10px] font-bold uppercase tracking-widest mb-1">{product.brand}</div>
                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-neon-blue transition-colors leading-tight">{product.name}</h3>
                  <div className="text-lg font-mono text-neon-cyan font-bold mb-4">{formatPrice(product.price)}</div>
                  <p className="text-slate-400 text-sm mb-6 line-clamp-2">{product.description}</p>
                  
                  <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-3">
                    <Link to={`/products/${product.slug}`} className="w-full">
                      <NeonButton variant="outline" className="w-full py-2 text-xs">
                        <Eye size={14} /> View Details
                      </NeonButton>
                    </Link>
                    <div className="flex gap-2">
                       <a href={`https://wa.me/919073128151?text=Hi, I am interested in ${product.name}`} className="flex-1">
                         <NeonButton variant="primary" className="w-full py-2 text-xs">
                           <MessageSquare size={14} /> WhatsApp
                         </NeonButton>
                       </a>
                       <a href="tel:9073128151" className="p-2 aspect-square rounded-full bg-white/5 text-slate-400 hover:text-neon-blue hover:bg-neon-blue/10 transition-all border border-white/10">
                         <Phone size={14} />
                       </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="mb-8">
              <Camera size={64} className="mx-auto text-slate-700 mb-6" />
              <h3 className="text-2xl font-display font-bold mb-4">No Equipment Found</h3>
              <p className="text-slate-400 max-w-md mx-auto">
                {search || selectedCategory !== 'all' 
                  ? "Try adjusting your filters or search keywords to find what you're looking for."
                  : "The showroom is currently empty. Please check back later or contact us for inquiries."
                }
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              {(search || selectedCategory !== 'all') && (
                <button onClick={() => { setSearch(''); setSelectedCategory('all'); }} className="text-neon-blue font-bold underline">
                  Reset Filters
                </button>
              )}

              {isAdmin && !search && selectedCategory === 'all' && (
                <div className="mt-8 pt-8 border-t border-white/5 w-full max-w-xs">
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-4 font-mono">Owner Utilities</p>
                  <NeonButton 
                    variant="outline" 
                    className="w-full"
                    onClick={async () => {
                      if (window.confirm("This will seed sample products and categories. Continue?")) {
                        setLoading(true);
                        await seedSampleData();
                        window.location.reload();
                      }
                    }}
                  >
                    Seed Showroom Data
                  </NeonButton>
                  <p className="mt-2 text-[10px] text-slate-600">Only you can see this utility button.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
