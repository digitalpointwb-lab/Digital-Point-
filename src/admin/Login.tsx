import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogIn, Camera, ShieldAlert } from 'lucide-react';
import { NeonButton } from '../components/ui/NeonButton';
import { GlassCard } from '../components/ui/GlassCard';
import { loginWithGoogle } from '../lib/firebase';
import { useAdmin } from '../hooks/useAdmin';
import { useEffect } from 'react';
import { initializeFirestore } from '../lib/db-utils';

export default function AdminLogin() {
  const { user, isAdmin, loading } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate('/admin');
    }
  }, [user, isAdmin, loading, navigate]);

  const handleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      if (result.user.email === 'digitalpointwb@gmail.com') {
        await initializeFirestore(result.user.uid, result.user.email);
        // Refresh to get isAdmin state
        window.location.reload();
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-black p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-neon-blue flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(0,242,255,0.4)]">
            <LogIn className="text-black" size={32} />
          </div>
          <h1 className="text-3xl font-display font-bold">Terminal <span className="text-neon-blue">Login</span></h1>
          <p className="text-slate-500 mt-2">Authorized Access Only - Digital Point Command</p>
        </div>

        <GlassCard className="border-neon-blue/20">
          {user && !isAdmin && !loading ? (
             <div className="text-center py-6">
               <ShieldAlert className="text-red-500 mx-auto mb-4" size={48} />
               <h3 className="text-xl font-bold mb-2">Access Restricted</h3>
               <p className="text-sm text-slate-400 mb-6">
                 Account <span className="text-white font-mono">{user.email}</span> is not authorized for terminal access.
               </p>
               <NeonButton variant="outline" onClick={() => window.location.href = '/'} className="w-full">
                 Back to Control
               </NeonButton>
             </div>
          ) : (
            <div className="space-y-8 py-4">
              <div className="text-center">
                <p className="text-sm text-slate-400 mb-8">
                  Sign in with your authorized Google Workspace account to manage the Digital Point catalog.
                </p>
                <NeonButton 
                  variant="primary" 
                  onClick={handleLogin}
                  className="w-full py-4 text-lg"
                  disabled={loading}
                >
                  <LogIn size={20} /> Entitle Session
                </NeonButton>
              </div>
              <div className="pt-6 border-t border-white/5 text-[10px] text-slate-600 text-center uppercase tracking-widest leading-relaxed">
                System: Digital Point Core v1.0.0<br />
                Monitoring active session protocols
              </div>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
