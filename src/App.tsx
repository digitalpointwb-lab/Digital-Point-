import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartSidebar } from './components/layout/CartSidebar';
import { WishlistSidebar } from './components/layout/WishlistSidebar';
import { AnimatePresence, useScroll, useTransform, motion } from 'motion/react';
import { PageTransition } from './components/layout/PageTransition';
import Home from './pages/Home';
import Products from './pages/Products';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import ProductDetail from './pages/ProductDetail';
import AdminLogin from './admin/Login';
import AdminDashboard from './admin/Dashboard';

// @ts-expect-error image module
import futuristicCameraBg from './assets/images/futuristic_camera_bg_1782570405196.jpg';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      {/* @ts-expect-error React 19 / RR issue with key */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
        <Route path="/products/:slug" element={<PageTransition><ProductDetail /></PageTransition>} />
        <Route path="/categories" element={<PageTransition><Categories /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function Layout() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');
  const { scrollY } = useScroll();

  // Dynamically blur background image on scroll
  const bgBlur = useTransform(scrollY, [0, 500], ["blur(0px)", "blur(4px)"]);
  // Dynamically darken overlay on scroll to improve text readability
  const bgDarken = useTransform(scrollY, [0, 400], [0, 0.7]);

  return (
    <div className="min-h-screen flex flex-col bg-transparent selection:bg-neon-blue selection:text-black relative">
      <div className="fixed inset-0 z-[-2] w-full h-full bg-cyber-black overflow-hidden">
        <motion.img 
          src={futuristicCameraBg} 
          alt="Futuristic Camera and Drone Background" 
          className="w-full h-full object-cover opacity-95"
          referrerPolicy="no-referrer"
          style={{ filter: bgBlur }}
        />
        {/* Dynamic Dark Backdrop Overlay */}
        <motion.div 
          className="absolute inset-0 bg-cyber-black pointer-events-none" 
          style={{ opacity: bgDarken }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-black/40 via-cyber-black/10 to-cyber-black/50"></div>
        
        {/* Deep Cinematic Ambient Radial Glows */}
        <div className="absolute top-[15%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-neon-cyan/15 blur-[140px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-[25%] right-[5%] w-[50vw] h-[50vw] rounded-full bg-neon-purple/15 blur-[160px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }}></div>
        <div className="absolute top-[55%] left-[30%] w-[35vw] h-[35vw] rounded-full bg-neon-blue/10 blur-[120px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }}></div>
      </div>
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <CartSidebar />}
      {!isAdminRoute && <WishlistSidebar />}
      <main className="flex-grow flex flex-col">
        <AnimatedRoutes />
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <CurrencyProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <ScrollToTop />
            <Layout />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </CurrencyProvider>
  );
}
