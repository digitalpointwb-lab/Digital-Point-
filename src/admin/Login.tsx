import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, ShieldAlert, Copy, ExternalLink, Check, RefreshCw, AlertTriangle, ArrowRight, HelpCircle, KeyRound, ShieldCheck } from 'lucide-react';
import { NeonButton } from '../components/ui/NeonButton';
import { GlassCard } from '../components/ui/GlassCard';
import { loginWithGoogle, loginWithGoogleRedirect } from '../lib/firebase';
import { useAdmin } from '../hooks/useAdmin';
import { initializeFirestore } from '../lib/db-utils';
import firebaseConfig from '../../firebase-applet-config.json';

export default function AdminLogin() {
  const { user, isAdmin, loading } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'google' | 'bypass'>('bypass');
  
  // Google Auth States
  const [authError, setAuthError] = useState<{
    code: string;
    message: string;
    domain: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Bypass Key States
  const [accessCode, setAccessCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [codeSuccess, setCodeSuccess] = useState(false);

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

  const handleBypassSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setCodeError('');
    setCodeSuccess(false);

    const inputCode = accessCode.trim();
    if (!inputCode) {
      setCodeError('Please enter an access code');
      return;
    }

    // Supported access codes:
    // 1. VITE_ADMIN_ACCESS_CODE from environment (defaults to digitalpoint9073)
    // 2. Mobile numbers used by owner (9073128151, 919073128151)
    const envCode = ((import.meta as any).env.VITE_ADMIN_ACCESS_CODE || 'digitalpoint9073').toLowerCase();
    const cleanInput = inputCode.toLowerCase();

    if (
      cleanInput === envCode || 
      cleanInput === '9073128151' || 
      cleanInput === '919073128151' ||
      cleanInput === 'digitalpoint9073'
    ) {
      setCodeSuccess(true);
      try {
        localStorage.setItem("special_access", "true");
        // Add artificial nice terminal effect
        setTimeout(() => {
          window.location.href = '/admin';
        }, 800);
      } catch (e) {
        console.error(e);
        setCodeError('Failed to establish local session. Please enable cookies.');
      }
    } else {
      setCodeError('ACCESS_DENIED: Invalid master security code.');
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
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8s]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[6s] delay-1000" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg relative z-10 animate-fade-in"
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(0,242,255,0.25)] group hover:scale-110 transition-transform duration-500">
            <LogIn className="text-neon-cyan" size={28} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold">Terminal <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-cyan to-white">Login</span></h1>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">Authorized Access Only - Digital Point Command</p>
        </div>

        {/* Dynamic Mode Tabs selector */}
        <div className="grid grid-cols-2 gap-2 bg-slate-950/60 p-1 rounded-xl border border-white/5 mb-4">
          <button
            onClick={() => { setActiveTab('google'); setAuthError(null); }}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === 'google' 
                ? 'bg-gradient-to-r from-neon-blue/20 to-neon-cyan/10 border border-neon-blue/30 text-white' 
                : 'text-slate-400 hover:text-white border border-transparent'
            }`}
          >
            <LogIn size={14} className="text-neon-blue" /> Google Account
          </button>
          <button
            onClick={() => { setActiveTab('bypass'); setCodeError(''); }}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === 'bypass' 
                ? 'bg-gradient-to-r from-neon-purple/20 to-neon-purple/5 border border-neon-purple/30 text-white' 
                : 'text-slate-400 hover:text-white border border-transparent'
            }`}
          >
            <KeyRound size={14} className="text-neon-purple" /> System Bypass Key
          </button>
        </div>

        <GlassCard className="border-neon-blue/10 bg-slate-950/80 backdrop-blur-3xl overflow-hidden p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'google' ? (
              authError ? (
                <motion.div
                  key="error-diagnostics"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
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
                          ? 'This Vercel domain must be authorized in your Firebase console.'
                          : authError.message}
                      </p>
                    </div>
                  </div>

                  {/* Specific resolution steps for Vercel/Custom Domain */}
                  {authError.code === 'auth/unauthorized-domain' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-3">
                        <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-neon-cyan">Your Vercel Domain</span>
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

                      {/* Prompt to use Bypass Tab */}
                      <div className="p-4 rounded-2xl bg-neon-purple/5 border border-neon-purple/20 space-y-2">
                        <div className="flex items-center gap-2">
                          <KeyRound size={16} className="text-neon-purple" />
                          <h4 className="text-sm font-bold text-white">Permanent Easy Solution</h4>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Instead of configuring Firebase, click the <strong>System Bypass Key</strong> tab at the top of this card and type your secure access code to log in immediately!
                        </p>
                        <button 
                          onClick={() => { setActiveTab('bypass'); setCodeError(''); }}
                          className="text-xs font-bold text-neon-purple hover:text-white transition-colors flex items-center gap-1 pt-1"
                        >
                          Switch to System Bypass Tab <ArrowRight size={12} />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-slate-500">How to authorize this domain (Identity Platform):</span>
                        <div className="space-y-2.5 text-xs text-slate-400 font-medium pl-1">
                          <div className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center text-[10px] font-bold text-neon-cyan shrink-0">1</span>
                            <p className="mt-0.5">Click <strong>Open Firebase Settings</strong> below.</p>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center text-[10px] font-bold text-neon-purple shrink-0">2</span>
                            <p className="mt-0.5">In Firebase, go to the <strong>Settings</strong> tab under Authentication (next to Users / Sign-in method).</p>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center text-[10px] font-bold text-luxury-gold shrink-0">3</span>
                            <p className="mt-0.5">Click <strong>Authorized domains</strong>, then <strong>Add domain</strong>, and paste your Vercel domain.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Interactive buttons */}
                  <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
                    {authError.code === 'auth/unauthorized-domain' && (
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
                    )}
                    
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
                        <RefreshCw size={14} /> Try Again
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
                  className="text-center py-4 space-y-6"
                >
                  <ShieldAlert className="text-red-500 mx-auto" size={48} />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">Access Restricted</h3>
                    <p className="text-sm text-slate-400">
                      Account <span className="text-white font-mono">{user.email}</span> is not on the Authorized Admin list.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-neon-purple/5 border border-neon-purple/20 text-left space-y-2">
                    <div className="flex items-center gap-2">
                      <KeyRound size={16} className="text-neon-purple" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Authorize Now</h4>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      If you are the owner, switch to the <strong>System Bypass Key</strong> tab at the top and enter your master access code to sign in instantly.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button 
                      onClick={() => { setActiveTab('bypass'); setCodeError(''); }}
                      className="py-3 px-4 rounded-xl bg-neon-purple/10 border border-neon-purple/20 hover:border-neon-purple/50 text-xs font-bold text-neon-purple hover:text-white transition-all flex items-center justify-center gap-1.5"
                    >
                      <KeyRound size={14} /> Enter Pass Code
                    </button>
                    <NeonButton variant="outline" onClick={() => window.location.href = '/'} className="w-full !py-3">
                      Back to Home
                    </NeonButton>
                  </div>
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
                      <LogIn size={20} className="group-hover:translate-x-0.5 transition-transform" /> Sign In with Google (Popup)
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
                      {isRedirecting ? 'Redirecting to Google...' : 'Popup blocked on Mobile? Try Redirect Login'}
                    </button>
                  </div>

                  <div className="pt-6 border-t border-white/5 text-[9px] text-slate-600 text-center uppercase tracking-widest leading-relaxed font-mono">
                    System: Digital Point Core v1.1.0<br />
                    Monitoring active session protocols
                  </div>
                </motion.div>
              )
            ) : (
              <motion.div
                key="bypass-login-form"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6 py-2"
              >
                <div className="text-center">
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Enter the master access key code to authorize this device instantly. Perfect for Vercel or when Google popups are blocked.
                  </p>
                </div>

                <form onSubmit={handleBypassSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-500 font-mono font-bold uppercase tracking-widest block">Security Key Code</label>
                    <div className="relative">
                      <input 
                        type="password"
                        placeholder="••••••••••••"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        className={`w-full bg-slate-950/90 border rounded-xl px-4 py-3.5 pl-11 text-white placeholder-slate-700 focus:outline-none focus:ring-1 transition-all text-sm font-mono tracking-widest ${
                          codeError 
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                            : codeSuccess 
                              ? 'border-green-500/50 focus:border-green-500 focus:ring-green-500/20' 
                              : 'border-white/10 focus:border-neon-purple focus:ring-neon-purple/20'
                        }`}
                        disabled={codeSuccess}
                      />
                      <KeyRound className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                        codeError ? 'text-red-400' : codeSuccess ? 'text-green-400' : 'text-slate-600'
                      }`} size={16} />
                    </div>
                    {codeError && (
                      <p className="text-xs text-red-400 font-mono font-bold mt-1.5 flex items-center gap-1.5 animate-pulse">
                        <AlertTriangle size={12} /> {codeError}
                      </p>
                    )}
                    {codeSuccess && (
                      <p className="text-xs text-green-400 font-mono font-bold mt-1.5 flex items-center gap-1.5">
                        <ShieldCheck size={12} /> SUCCESS: ACCESS_GRANTED. Authorizing terminal...
                      </p>
                    )}
                  </div>

                  <NeonButton 
                    variant="primary" 
                    type="submit"
                    className="w-full py-4 text-base font-bold shadow-[0_0_25px_rgba(188,19,254,0.25)] flex items-center justify-center gap-2 group bg-neon-purple border-neon-purple/40 hover:shadow-[0_0_35px_rgba(188,19,254,0.45)]"
                    disabled={codeSuccess}
                  >
                    {codeSuccess ? (
                      <RefreshCw size={20} className="animate-spin text-white" />
                    ) : (
                      <>
                        <ShieldCheck size={20} className="group-hover:scale-110 transition-transform text-white" /> Authorize Device Key
                      </>
                    )}
                  </NeonButton>
                </form>

                <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle size={14} className="text-neon-purple" /> Need help?
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    The access code is custom configured. By default, you can use your official system codes or the digitalpoint master sequence. Contact developer for key retrieval.
                  </p>
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
