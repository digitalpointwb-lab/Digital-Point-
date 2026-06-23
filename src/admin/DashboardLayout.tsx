import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu,
  X,
  ExternalLink
} from 'lucide-react';
import { logout } from '../lib/firebase';
import { NeonButton } from '../components/ui/NeonButton';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

export function DashboardLayout({ children, activeTab, setActiveTab }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const menuItems = [
    { id: 'overview', icon: <LayoutDashboard size={18} />, label: 'Overview' },
    { id: 'products', icon: <Package size={18} />, label: 'Products' },
    { id: 'categories', icon: <Layers size={18} />, label: 'Categories' },
    { id: 'inquiries', icon: <MessageSquare size={18} />, label: 'Inquiries' },
    { id: 'settings', icon: <Settings size={18} />, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-200 selection:bg-neon-blue selection:text-black font-sans">
      {/* Sidebar Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900/95 backdrop-blur-xl border-r border-white/10 flex flex-col pt-8 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white lg:hidden bg-white/5 rounded-lg border border-white/10"
        >
          <X size={20} />
        </button>

        <div className="px-8 mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center border border-neon-blue/30 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
              <LayoutDashboard size={14} className="text-neon-blue" />
            </div>
            <div className="text-xl font-display font-bold text-white tracking-widest">DIGITAL<span className="text-neon-blue">POINT</span></div>
          </div>
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest pl-11">Admin Interface v1.0</div>
        </div>

        <nav className="flex-grow px-6 space-y-3">
          <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-4 pl-4">Main Menu</div>
          {menuItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id 
                ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/30 shadow-[rgba(0,240,255,0.15)_0px_0px_20px_0px]'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className={activeTab === tab.id ? 'animate-pulse' : ''}>{tab.icon}</div>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10 mt-auto bg-black/20">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-all shadow-[0_0_15px_rgba(248,113,113,0)] hover:shadow-[0_0_15px_rgba(248,113,113,0.1)]"
          >
            <LogOut size={16} /> Secure Exit
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-cyber-black">
        {/* Subtle Background Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-neon-blue/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />
        
        {/* Top Navigation Bar */}
        <header className="h-20 sm:h-24 border-b border-white/5 bg-slate-900/40 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 lg:px-12 shrink-0 relative z-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3 sm:gap-5">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 bg-black border border-white/10 rounded-xl lg:hidden hover:bg-white/5 hover:border-neon-blue/50 transition-all shadow-lg"
            >
              <Menu size={18} className="text-neon-blue" />
            </button>
            <div>
              <h2 className="text-lg sm:text-2xl font-display font-bold tracking-widest text-white uppercase">{activeTab.replace('-', ' ')}</h2>
              <div className="hidden sm:flex items-center gap-2 mt-1.5 opacity-80">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">System Operational</span>
              </div>
            </div>
          </div>
          <NeonButton variant="outline" className="text-[10px] sm:text-xs !py-2 !px-3 sm:!py-2.5 sm:!px-5 shrink-0 bg-black/50 border-white/10 hover:border-neon-blue/50 group" onClick={() => window.open('/', '_blank')}>
            <span className="mr-2 group-hover:text-white transition-colors">Public Site</span> <ExternalLink size={14} className="text-neon-blue group-hover:animate-pulse" />
          </NeonButton>
        </header>

        {/* Scrollable Canvas for Content */}
        <div className="flex-1 overflow-y-auto w-full relative z-10 p-6 lg:p-12 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
