import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Box,
  Users,
  Menu,
  X,
  UploadCloud,
  Camera
} from 'lucide-react';
import { useAdmin } from '../hooks/useAdmin';
import { logout, db, auth } from '../lib/firebase';
import { collection, query, getDocs, orderBy, limit, deleteDoc, doc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { NeonButton } from '../components/ui/NeonButton';
import { GlassCard } from '../components/ui/GlassCard';
import { Inquiry, Product } from '../types';
import { DashboardLayout } from './DashboardLayout';
import { useCurrency } from '../contexts/CurrencyContext';
import { seedSampleData } from '../lib/db-utils';

export default function AdminDashboard() {
  const { formatPrice } = useCurrency();
  const { isAdmin, loading: authLoading } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'categories' | 'inquiries' | 'settings'>('overview');
  
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState({ products: 0, inquiries: 0, categories: 0 });
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const inquirySnap = await getDocs(query(collection(db, 'inquiries'), orderBy('createdAt', 'desc')));
      const productSnap = await getDocs(query(collection(db, 'products'), orderBy('createdAt', 'desc')));
      const catSnap = await getDocs(collection(db, 'categories'));

      const inqData = inquirySnap.docs.map(d => ({ id: d.id, ...d.data() } as Inquiry));
      const prodData = productSnap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
      
      setInquiries(inqData);
      setProducts(prodData);
      setStats({
        products: productSnap.size,
        inquiries: inquirySnap.size,
        categories: catSnap.size
      });
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        setEditingProduct(prev => {
           if (!prev) return prev;
           return {
             ...prev, 
             images: [...(prev.images || []), dataUrl]
           };
        });
      };
      if (event.target?.result) {
         img.src = event.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index: number) => {
    setEditingProduct(prev => {
      if (!prev || !prev.images) return prev;
      const newImages = [...prev.images];
      newImages.splice(index, 1);
      return { ...prev, images: newImages };
    });
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const productData = {
        name: editingProduct.name || '',
        slug: editingProduct.slug || '',
        brand: editingProduct.brand || '',
        categoryId: editingProduct.categoryId || '',
        description: editingProduct.description || '',
        price: editingProduct.price || '',
        specifications: editingProduct.specifications || {},
        images: editingProduct.images?.length ? editingProduct.images : ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400'],
        availability: editingProduct.availability ?? true,
        isFeatured: editingProduct.isFeatured ?? false,
      };

      if (editingProduct.id) {
        await updateDoc(doc(db, 'products', editingProduct.id), {
          ...productData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: serverTimestamp()
        });
      }
      setShowProductForm(false);
      setEditingProduct(null);
      fetchData();
    } catch (error) {
      console.error("Save failed:", error);
      const errMsg = error instanceof Error ? error.message : String(error);
      alert("Failed to save product: " + errMsg);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteDoc(doc(db, 'products', id));
      fetchData();
    }
  };

  if (authLoading || !isAdmin) return <div className="min-h-screen bg-cyber-black flex items-center justify-center font-mono text-neon-blue">LOADING_INITIAL_SYSTEM...</div>;

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-10"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Total Products', value: stats.products, icon: <Box className="text-neon-blue" />, trend: '+2 this week' },
                    { label: 'Pending Inquiries', value: inquiries.filter(i => i.status === 'new').length, icon: <MessageSquare className="text-neon-purple" />, trend: 'Critical' },
                    { label: 'System Reach', value: stats.inquiries, icon: <TrendingUp className="text-luxury-gold" />, trend: 'Live' },
                  ].map((stat, i) => (
                    <GlassCard key={i} className="border-white/5 group hover:border-neon-blue/20 transition-all duration-500">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 uppercase font-mono text-xs group-hover:bg-neon-blue/10 group-hover:border-neon-blue/30 transition-all">
                          {stat.icon}
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{stat.trend}</span>
                      </div>
                      <div className="text-4xl font-display font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">{stat.label}</div>
                    </GlassCard>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Share System Section */}
                  <GlassCard className="p-8 border-neon-blue/20 bg-neon-blue/5 relative overflow-hidden h-full">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <ExternalLink size={120} />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <UploadCloud size={20} className="text-neon-blue" /> Share Showroom
                      </h3>
                      <p className="text-slate-400 text-sm mb-6 max-w-md leading-relaxed">
                        Your catalog is active. Use the public link below to share your equipment showroom with customers or on social media.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-black/60 rounded-xl border border-white/10 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="flex-1 w-full truncate">
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-mono">Public Access Link</div>
                            <div className="text-xs text-neon-blue font-mono truncate">https://ais-pre-k3bsv7y3ufyzokzc6tvodc-956243749519.asia-east1.run.app</div>
                          </div>
                          <NeonButton 
                            variant="outline" 
                            className="text-[10px] !py-2 !px-4 whitespace-nowrap shrink-0 bg-white/5"
                            onClick={() => {
                              navigator.clipboard.writeText('https://ais-pre-k3bsv7y3ufyzokzc6tvodc-956243749519.asia-east1.run.app');
                              alert("Showroom link copied!");
                            }}
                          >
                            Copy URL
                          </NeonButton>
                        </div>
                        
                        <div className="flex gap-4">
                          <NeonButton variant="primary" className="text-xs !py-3 flex-1" onClick={() => window.open('https://ais-pre-k3bsv7y3ufyzokzc6tvodc-956243749519.asia-east1.run.app', '_blank')}>
                            View Live Site
                          </NeonButton>
                        </div>
                      </div>
                    </div>
                  </GlassCard>

                  {/* Recent Inquiries */}
                  <GlassCard className="border-white/5 h-full">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold flex items-center gap-2">
                         <MessageSquare size={18} className="text-neon-blue" /> Recent Inquiries
                      </h3>
                      <button onClick={() => setActiveTab('inquiries')} className="text-[10px] text-neon-blue hover:underline uppercase tracking-widest font-bold">
                        See All
                      </button>
                    </div>
                    <div className="space-y-4">
                      {inquiries.slice(0, 5).map((inq) => (
                        <div key={inq.id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center group hover:border-neon-blue/20 transition-all">
                           <div>
                             <div className="font-bold text-white text-sm">{inq.name}</div>
                             <div className="text-[10px] text-slate-500 font-mono">{inq.mobile}</div>
                           </div>
                           <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${inq.status === 'new' ? 'bg-neon-blue/20 text-neon-blue' : 'bg-slate-800 text-slate-500'}`}>
                             {inq.status}
                           </span>
                        </div>
                      ))}
                      {inquiries.length === 0 && (
                        <div className="py-12 text-center text-slate-500 text-xs italic opacity-50">
                          No communication logs available.
                        </div>
                      )}
                    </div>
                  </GlassCard>
                </div>

              </motion.div>
            )}

            {activeTab === 'products' && (
              <motion.div 
                key="products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/50 p-6 rounded-2xl border border-white/5">
                   <div>
                     <h3 className="text-xl font-bold mb-1">Product Inventory</h3>
                     <p className="text-xs text-slate-500 uppercase tracking-widest">Manage your complete product catalog here</p>
                   </div>
                   <NeonButton variant="primary" onClick={() => { setEditingProduct({ specifications: {} }); setShowProductForm(true); }}>
                     <Plus size={18} /> Add New Product
                   </NeonButton>
                </div>

                {showProductForm && (
                  <GlassCard className="border-neon-blue/30 bg-neon-blue/5">
                    <form onSubmit={handleSaveProduct} className="space-y-6">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="space-y-2">
                           <label className="text-[10px] uppercase font-bold text-slate-500">Name</label>
                           <input 
                             required
                             className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-neon-blue" 
                             value={editingProduct?.name || ''} 
                             onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                           />
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] uppercase font-bold text-slate-500">Brand</label>
                           <input 
                             required
                             className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-neon-blue" 
                             value={editingProduct?.brand || ''} 
                             onChange={(e) => setEditingProduct({...editingProduct, brand: e.target.value})}
                           />
                         </div>
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="space-y-2">
                           <label className="text-[10px] uppercase font-bold text-slate-500">Category</label>
                           <select 
                             required
                             className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-neon-blue" 
                             value={editingProduct?.categoryId || ''} 
                             onChange={(e) => setEditingProduct({...editingProduct, categoryId: e.target.value})}
                           >
                             <option value="">Select Category</option>
                             <option value="camera">Camera</option>
                             <option value="lens">Lens</option>
                             <option value="drone">Drone</option>
                             <option value="switcher">Switcher</option>
                             <option value="accessories">Accessories</option>
                           </select>
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] uppercase font-bold text-slate-500">Price (Showroom Label)</label>
                           <input 
                             className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-neon-blue" 
                             value={editingProduct?.price || ''} 
                             onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                             placeholder="e.g. ₹2,49,000"
                           />
                         </div>
                       </div>
                       <div className="space-y-4">
                         <div className="flex items-center justify-between">
                           <label className="text-[10px] uppercase font-bold text-slate-500">Product Images</label>
                           <label className="cursor-pointer text-xs flex items-center gap-2 text-neon-blue font-bold px-3 py-1.5 rounded-lg bg-neon-blue/10 hover:bg-neon-blue/20 transition-colors">
                             <UploadCloud size={14} /> Upload Gallery Image
                             <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                           </label>
                         </div>
                         {(editingProduct?.images?.length || 0) > 0 ? (
                           <div className="flex flex-wrap gap-4">
                             {editingProduct?.images?.map((img, idx) => (
                               <div key={idx} className="relative group w-24 h-24 rounded-xl border border-white/10 overflow-hidden bg-black/50">
                                 <img src={img} alt={`Product ${idx}`} className="w-full h-full object-cover" />
                                 <button
                                   type="button"
                                   onClick={() => removeImage(idx)}
                                   className="absolute top-1 right-1 p-1 bg-red-500/80 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                 >
                                   <X size={14} />
                                 </button>
                               </div>
                             ))}
                           </div>
                         ) : (
                           <div className="w-full h-32 border border-dashed border-white/20 rounded-xl flex flex-col gap-2 items-center justify-center text-slate-500 text-xs bg-black/20">
                             <Camera size={24} className="opacity-50" />
                             <span>No images uploaded</span>
                           </div>
                         )}
                       </div>
                       <div className="space-y-2">
                         <label className="text-[10px] uppercase font-bold text-slate-500">Description</label>
                         <textarea 
                           className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-neon-blue h-24" 
                           value={editingProduct?.description || ''} 
                           onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                         />
                       </div>
                       <div className="space-y-4">
                         <div className="font-bold text-sm text-white">Specifications</div>
                         
                         {(Object.entries(editingProduct?.specifications || {})).length === 0 && (
                           <div className="text-xs text-slate-500 italic">No specifications added yet.</div>
                         )}

                         {Object.entries(editingProduct?.specifications || {}).map(([key, value], idx) => (
                           <div key={idx} className="flex gap-2">
                             <input 
                               className="flex-1 bg-black/40 border border-white/10 rounded-lg p-2 text-white focus:border-neon-blue text-sm" 
                               value={key}
                               placeholder="e.g. Sensor"
                               onChange={(e) => {
                                 const newSpecs = { ...editingProduct.specifications };
                                 const val = newSpecs[key];
                                 delete newSpecs[key];
                                 newSpecs[e.target.value] = val;
                                 setEditingProduct({...editingProduct, specifications: newSpecs});
                               }}
                             />
                             <input 
                               className="flex-1 bg-black/40 border border-white/10 rounded-lg p-2 text-white focus:border-neon-blue text-sm" 
                               value={value}
                               placeholder="Value"
                               onChange={(e) => {
                                 const newSpecs = { ...editingProduct.specifications };
                                 newSpecs[key] = e.target.value;
                                 setEditingProduct({...editingProduct, specifications: newSpecs});
                               }}
                             />
                             <button
                               type="button"
                               onClick={() => {
                                 const newSpecs = { ...editingProduct.specifications };
                                 delete newSpecs[key];
                                 setEditingProduct({...editingProduct, specifications: newSpecs});
                               }}
                               className="p-2 bg-red-500/10 text-red-400 rounded-lg outline-none hover:bg-red-500/20"
                             >
                               <Trash2 size={16} />
                             </button>
                           </div>
                         ))}
                         <button 
                           type="button"
                           onClick={() => setEditingProduct({
                             ...editingProduct, 
                             specifications: { ...(editingProduct?.specifications || {}), 'New Spec': '' }
                           })}
                           className="text-xs text-neon-blue font-bold flex items-center gap-1"
                         >
                           <Plus size={14} /> Add Specification
                         </button>
                       </div>

                       <div className="flex items-center gap-2">
                         <input 
                           type="checkbox" 
                           id="isFeatured"
                           checked={editingProduct?.isFeatured || false}
                           onChange={(e) => setEditingProduct({...editingProduct, isFeatured: e.target.checked})}
                           className="w-4 h-4 bg-black/40 border-white/10 rounded accent-neon-blue"
                         />
                         <label htmlFor="isFeatured" className="text-sm font-bold text-slate-300">Feature on Homepage</label>
                       </div>

                       <div className="flex gap-4">
                         <NeonButton type="submit" variant="primary" className="flex-1">
                           Save Product
                         </NeonButton>
                         <NeonButton variant="outline" onClick={() => { setShowProductForm(false); setEditingProduct(null); }}>
                           Cancel
                         </NeonButton>
                       </div>
                    </form>
                  </GlassCard>
                )}

                <div className="bg-slate-900/50 rounded-2xl border border-white/5 overflow-x-auto">
                  <table className="w-full text-left min-w-[600px]">
                    <thead className="bg-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      <tr>
                        <th className="px-6 py-4">Product Name</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {products.map((prod) => (
                        <tr key={prod.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-bold text-white">{prod.name}</div>
                            <div className="text-[10px] text-slate-500 uppercase">{prod.brand}</div>
                          </td>
                          <td className="px-6 py-4">
                             <div className="text-xs text-neon-blue font-mono">{prod.categoryId}</div>
                          </td>
                          <td className="px-6 py-4">
                             <div className="text-xs text-white">{prod.price ? formatPrice(prod.price) : 'Inquiry Only'}</div>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <div className="flex justify-end gap-2">
                               <button 
                                 onClick={() => { setEditingProduct(prod); setShowProductForm(true); }}
                                 className="p-2 rounded bg-white/5 text-slate-400 hover:text-neon-blue transition-all"
                               >
                                 <Edit size={16} />
                               </button>
                               <button 
                                 onClick={() => handleDeleteProduct(prod.id)}
                                 className="p-2 rounded bg-white/5 text-slate-400 hover:text-red-400 transition-all"
                               >
                                 <Trash2 size={16} />
                               </button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'inquiries' && (
              <motion.div 
                key="inquiries"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="bg-slate-900/50 rounded-2xl border border-white/5 overflow-x-auto">
                  <table className="w-full text-left min-w-[800px]">
                    <thead className="bg-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      <tr>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Product</th>
                        <th className="px-6 py-4">Message</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {inquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-white/5 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="font-bold text-white">{inq.name}</div>
                            <div className="text-xs text-slate-500">{inq.mobile}</div>
                          </td>
                          <td className="px-6 py-4">
                             <div className="text-sm">
                               {inq.type === 'expert_consultation' ? (
                                 <span className="text-neon-purple font-bold text-xs uppercase tracking-widest">
                                   Expert Consultation<br/>
                                   <span className="text-[10px] text-slate-400 font-normal">{inq.date} | {inq.timeSlot} ({inq.consultationType})</span>
                                 </span>
                               ) : (
                                 inq.product || 'General Inquiry'
                               )}
                             </div>
                          </td>
                          <td className="px-6 py-4 max-w-xs">
                             <div className="text-xs text-slate-400 line-clamp-1">{inq.message}</div>
                          </td>
                          <td className="px-6 py-4">
                             <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded inline-block ${inq.status === 'new' ? 'bg-neon-blue/20 text-neon-blue' : 'bg-slate-800 text-slate-500'}`}>
                               {inq.status}
                             </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <button className="text-slate-500 hover:text-neon-blue p-2">
                               <ChevronRight size={20} />
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8 max-w-2xl"
              >
                <div className="bg-slate-900/50 p-8 rounded-2xl border border-white/5 space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Settings size={20} className="text-neon-blue" /> System Maintenance
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Perform administrative tasks and database operations. These actions are permanent.
                  </p>
                  
                  <div className="pt-6 border-t border-white/10 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                      <div>
                        <div className="font-bold text-white">Seed Sample Data</div>
                        <p className="text-xs text-slate-500">Populate the database with professional gear presets if it's currently empty.</p>
                      </div>
                      <NeonButton 
                        variant="outline" 
                        className="shrink-0"
                        onClick={async () => {
                          if (window.confirm("Seed sample product and category data?")) {
                            setLoading(true);
                            await seedSampleData();
                            fetchData();
                          }
                        }}
                      >
                        Run Seed Script
                      </NeonButton>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/5 opacity-50 pointer-events-none">
                      <div>
                        <div className="font-bold text-white">Clear Cache</div>
                        <p className="text-xs text-slate-500">Reset system buffers and temporary data storage.</p>
                      </div>
                      <NeonButton variant="outline" className="shrink-0">
                        Execute Wipe
                      </NeonButton>
                    </div>
                  </div>
                </div>

                <div className="bg-neon-blue/5 p-8 rounded-2xl border border-neon-blue/20">
                  <h3 className="text-lg font-bold text-neon-blue mb-2">Terminal Access</h3>
                  <p className="text-slate-400 text-xs font-mono">AUTHORIZED_SESSION: {auth.currentUser?.email}</p>
                  <p className="text-slate-400 text-xs font-mono mt-1">STATUS: ENCRYPTED_CHANNEL_ACTIVE</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'categories' && (
              <motion.div 
                 key="other" 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="py-20 text-center"
              >
                 <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                   <Settings className="text-slate-600 animate-spin" />
                 </div>
                 <h3 className="text-xl font-bold mb-2">Module Under Calibration</h3>
                 <p className="text-slate-500 max-w-sm mx-auto">This terminal section is being synced with core database protocols. Check back shortly.</p>
                 <div className="mt-8">
                   <NeonButton variant="primary" onClick={() => setActiveTab('overview')}>
                     Return to Overview
                   </NeonButton>
                 </div>
              </motion.div>
            )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
