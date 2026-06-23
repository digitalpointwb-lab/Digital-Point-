import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, ShieldAlert, Copy, ExternalLink, Check, RefreshCw, AlertTriangle, ArrowRight, HelpCircle } from 'lucide-react';
import { NeonButton } from '../components/ui/NeonButton';
import { GlassCard } from '../components/ui/GlassCard';
import { loginWithGoogle, loginWithGoogleRedirect } from '../lib/firebase';
import { useAdmin } from '../hooks/useAdmin';
import { initializeFirestore } from '../lib/db-utils';
import firebaseConfig from '../../firebase-applet-config.json';

export default function AdminLogin() {
  const { user, isAdmin, loading } = useAdmin();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<{
    code: string;
    message: string;
    domain: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate('/admin');
    }
  }, [user, isAdmin, loading, navigate]);

  const handleLogin = async () => {
    setAuthError(null);
    try {
      const result = await loginWithGoogle();
      if (result.user.email === 'digitalpointwb@gmail.com') {
        await initializeFirestore(result.user.uid, result.user.email);
        window.location.reload();
      }
    } catch (error: any) {
      console.error("Login with Popup failed:", error);
      const errorCode = error?.code || 'unknown-error';
      const errorMessage = error?.message || String(error);
      setAuthError({
        code: errorCode,
        message: errorMessage,
        domain: window.location.hostname
      });
    }
  };

  const handleRedirectLogin = async () => {
    setAuthError(null);
    setIsRedirecting(true);
    try {
      await loginWithGoogleRedirect();
    } catch (error: any) {
      console.error("Login with Redirect failed:", error);
      const errorCode = error?.code || 'unknown-error';
      const errorMessage = error?.message || String(error);
      setAuthError({
        code: errorCode,
        message: errorMessage,
        domain: window.location.hostname
      });
      setIsRedirecting(false);
    }
  };

  const copyDomain = () => {
    const domain = window.location.hostname;
    navigator.clipboard.writeText(domain)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  const firebaseConsoleUrl = `https://console.firebase.google.com/project/${firebaseConfig.projectId}/authentication/settings`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-black p-4 sm:p-6 relative overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,242,255,0.25)] group hover:scale-110 transition-transform duration-500">
            <LogIn className="text-neon-cyan" size={28} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold">Terminal <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-cyan to-white">Login</span></h1>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">Authorized Access Only - Digital Point Command</p>
        </div>

        <GlassCard className="border-neon-blue/10 bg-slate-950/80 backdrop-blur-3xl overflow-hidden p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {authError ? (
              <motion.div
                key="error-diagnostics"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6"
              >
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-red-950/20 border border-red-500/30">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
                    <AlertTriangle className="text-red-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-red-400">Google Authentication Blocked</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {authError.code === 'auth/unauthorized-domain' 
                        ? 'This website domain must be authorized in your Firebase console settings.'
                        : authError.message}
                    </p>
                  </div>
                </div>

                {/* Specific resolution steps for Vercel/Custom Domain */}
                {authError.code === 'auth/unauthorized-domain' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-3">
                      <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-neon-cyan">Your Current Domain</span>
                      <div className="flex items-center justify-between gap-3 bg-black/40 p-3 rounded-xl border border-white/5">
                        <span className="text-sm font-mono text-slate-300 truncate select-all">{authError.domain}</span>
                        <button 
                          onClick={copyDomain}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-neon-cyan/15 hover:text-neon-cyan border border-white/10 transition-all flex items-center gap-1 text-xs shrink-0 font-medium"
                        >
                          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                          {copied ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-neon-purple">Resolution Steps</span>
                      <div className="space-y-2.5 text-xs text-slate-400 font-medium pl-1">
                        <div className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center text-[10px] font-bold text-neon-cyan shrink-0">1</span>
                          <p className="mt-0.5">Copy your current deployment domain using the <strong>Copy</strong> button above.</p>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center text-[10px] font-bold text-neon-purple shrink-0">2</span>
                          <p className="mt-0.5 flex flex-wrap items-center gap-1">
                            Click the <strong>Open Firebase Settings</strong> button below to access your Authorized Domains.
                          </p>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center text-[10px] font-bold text-luxury-gold shrink-0">3</span>
                          <p className="mt-0.5">Scroll to <strong>Authorized Domains</strong>, click <strong>Add Domain</strong>, paste, and click <strong>Add</strong>.</p>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0">4</span>
                          <p className="mt-0.5">Return here and refresh the page to establish authorization.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Interactive buttons */}
                <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
                  <a 
                    href={firebaseConsoleUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <NeonButton variant="primary" className="w-full py-3.5 text-sm font-bold shadow-[0_0_20px_rgba(0,242,255,0.25)] flex items-center justify-center gap-2">
                      <ExternalLink size={16} /> Open Firebase Settings
                    </NeonButton>
                  </a>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={handleRedirectLogin}
                      disabled={isRedirecting}
                      className="py-3 px-4 rounded-xl bg-slate-900/60 border border-white/10 hover:border-neon-purple/40 hover:bg-slate-900 text-xs font-bold text-slate-300 transition-all flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw size={14} className={isRedirecting ? "animate-spin" : ""} />
                      {isRedirecting ? 'Redirecting...' : 'Try Redirect'}
                    </button>
                    <button 
                      onClick={() => setAuthError(null)}
                      className="py-3 px-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-xs font-bold text-slate-400 hover:text-white transition-all flex items-center justify-center gap-1.5"
                    >
                      <RotateCcwIcon size={14} /> Back to Sign In
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : user && !isAdmin && !loading ? (
              <motion.div 
                key="restricted-access"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-4"
              >
                <ShieldAlert className="text-red-500 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold mb-2 text-white">Access Restricted</h3>
                <p className="text-sm text-slate-400 mb-6">
                  Account <span className="text-white font-mono">{user.email}</span> is not authorized for terminal access.
                </p>
                <NeonButton variant="outline" onClick={() => window.location.href = '/'} className="w-full">
                  Back to Control
                </NeonButton>
              </motion.div>
            ) : (
              <motion.div 
                key="signin-prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 py-2"
              >
                <p className="text-sm text-slate-400 text-center leading-relaxed">
                  Sign in with your authorized Google account to manage the Digital Point visual catalog and configurations.
                </p>

                <div className="flex flex-col gap-3">
                  <NeonButton 
                    variant="primary" 
                    onClick={handleLogin}
                    className="w-full py-4 text-base font-bold shadow-[0_0_25px_rgba(0,242,255,0.2)] flex items-center justify-center gap-2 group"
                    disabled={loading || isRedirecting}
                  >
                    <LogIn size={20} className="group-hover:translate-x-0.5 transition-transform" /> Entitle Session (Popup)
                  </NeonButton>

                  <button 
                    onClick={handleRedirectLogin}
                    disabled={loading || isRedirecting}
                    className="w-full py-3 px-4 rounded-xl bg-slate-950 border border-white/5 hover:border-neon-purple/40 hover:bg-slate-900/60 text-xs font-bold text-slate-400 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    {isRedirecting ? (
                      <RefreshCw size={14} className="animate-spin text-neon-purple" />
                    ) : (
                      <HelpCircle size={14} className="text-neon-purple" />
                    )}
                    {isRedirecting ? 'Redirecting to Google Auth...' : 'Popup blocked? Try Redirect Sign-In'}
                  </button>
                </div>

                <div className="pt-6 border-t border-white/5 text-[9px] text-slate-600 text-center uppercase tracking-widest leading-relaxed font-mono">
                  System: Digital Point Core v1.1.0<br />
                  Monitoring active session protocols
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </motion.div>
    </div>
  );
}

// Inline fallback for RotateCcw if not imported or used differently
function RotateCcwIcon({ size }: { size: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}
