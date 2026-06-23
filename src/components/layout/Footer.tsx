import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, Mail, MapPin, Phone, Globe, Share2, Video } from 'lucide-react';

export function Footer() {
  const navigate = useNavigate();
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [adminPass, setAdminPass] = useState('');

  const handleAdminAuth = (val: string) => {
    setAdminPass(val);
    if (val === 'bappa@1998') {
      try {
        localStorage.setItem('special_access', 'true');
      } catch (e) {
        console.warn("localStorage is not available");
      }
      navigate('/admin');
      setShowAdminInput(false);
      setAdminPass('');
    }
  };

  return (
    <footer className="pt-20 pb-10 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-neon-blue flex items-center justify-center">
                <Camera className="text-black" size={18} />
              </div>
              <span className="text-xl font-display font-bold">DIGITAL <span className="text-neon-blue">POINT</span></span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Professional imaging technology for creators who demand excellence. Premium equipment catalog and inquiry platform.
            </p>
            <div className="flex gap-4">
              {[Globe, Share2, Video].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-blue hover:text-black transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Customer FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6">Equipment</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/products?category=camera" className="hover:text-white transition-colors">Cameras</Link></li>
              <li><Link to="/products?category=lens" className="hover:text-white transition-colors">Lenses</Link></li>
              <li><Link to="/products?category=drone" className="hover:text-white transition-colors">Drones</Link></li>
              <li><Link to="/products?category=switcher" className="hover:text-white transition-colors">Video Switchers</Link></li>
              <li><Link to="/products?category=accessories" className="hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="relative">
              {showAdminInput ? (
                <input
                  type="password"
                  autoFocus
                  placeholder="CODE..."
                  value={adminPass}
                  onChange={(e) => handleAdminAuth(e.target.value)}
                  onBlur={() => !adminPass && setShowAdminInput(false)}
                  className="bg-white/5 border border-neon-blue/50 rounded p-1 text-xs text-neon-blue w-full outline-none font-mono"
                />
              ) : (
                <h4 
                  className="font-display font-bold text-lg cursor-pointer select-none active:text-neon-blue transition-colors"
                  onClick={() => setShowAdminInput(true)}
                >
                  Locate Us
                </h4>
              )}
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="text-neon-blue mt-0.5 shrink-0" size={18} />
                <span>Kolkata, Khidirpur,<br />Karl Marx Sarani</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Phone className="text-neon-blue shrink-0" size={18} />
                <span>+91 90731 28151</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Mail className="text-neon-blue shrink-0" size={18} />
                <span>info@digitalpoint.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 uppercase tracking-widest">
          <p>© 2026 DIGITAL POINT. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
