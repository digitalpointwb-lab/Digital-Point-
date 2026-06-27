import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle, Calendar, Clock, Video } from 'lucide-react';
import { NeonButton } from '../components/ui/NeonButton';
import { GlassCard } from '../components/ui/GlassCard';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Contact() {
  const [formType, setFormType] = useState<'inquiry' | 'consultation'>('inquiry');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
    product: '',
    date: '',
    timeSlot: '',
    consultationType: 'showroom',
  });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formType === 'inquiry') {
        await addDoc(collection(db, 'inquiries'), {
          type: 'general',
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          product: formData.product,
          message: formData.message,
          status: 'new',
          createdAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, 'inquiries'), {
          type: 'expert_consultation',
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          date: formData.date,
          timeSlot: formData.timeSlot,
          consultationType: formData.consultationType,
          message: formData.message,
          status: 'new',
          createdAt: serverTimestamp(),
        });
      }
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const timeSlots = [
    '10:30 AM - 11:30 AM',
    '12:00 PM - 01:00 PM',
    '02:30 PM - 03:30 PM',
    '04:00 PM - 05:00 PM',
    '06:00 PM - 07:00 PM'
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-cyber-black min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-neon-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Connect with <span className="text-neon-blue animate-pulse">Experts</span></h1>
          <p className="text-slate-400 text-lg max-w-2xl">Connect with our specialists for stock checks, pricing, and dedicated equipment consultation.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Methods & Details */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <GlassCard className="border-white/5 hover:border-neon-blue/30 transition-colors group relative overflow-hidden">
                <div className="absolute inset-0 bg-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Phone className="text-neon-blue mb-4 group-hover:animate-bounce" size={28} />
                <h3 className="font-bold text-white mb-1 text-lg">Direct Call</h3>
                <p className="text-slate-400 text-sm mb-4">+91 90731 28151</p>
                <a href="tel:9073128151" className="text-neon-blue text-xs font-bold uppercase tracking-widest flex items-center group/link">
                  Speak to Expert <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
                </a>
              </GlassCard>
              <GlassCard className="border-white/5 hover:border-neon-purple/30 transition-colors group relative overflow-hidden">
                <div className="absolute inset-0 bg-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <MessageSquare className="text-neon-purple mb-4 group-hover:animate-pulse" size={28} />
                <h3 className="font-bold text-white mb-1 text-lg">WhatsApp</h3>
                <p className="text-slate-400 text-sm mb-4">Instant Chat Support</p>
                <a href="https://wa.me/919073128151" target="_top" rel="noopener noreferrer" className="text-neon-purple text-xs font-bold uppercase tracking-widest flex items-center group/link">
                  Start Conversation <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
                </a>
              </GlassCard>
            </div>

            <GlassCard className="border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex gap-6 items-start relative z-10">
                   <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                     <MapPin className="text-neon-cyan" size={28} />
                   </div>
                   <div>
                     <h3 className="font-bold text-white mb-2 text-xl">Main Showroom</h3>
                     <p className="text-slate-400 leading-relaxed mb-6">
                       Karl Marx Sarani, Khidirpur,<br />
                       Kolkata, West Bengal 700023
                     </p>
                     <div className="aspect-video w-full rounded-2xl bg-slate-900 overflow-hidden flex items-center justify-center border border-white/5 relative group/map mt-4 p-4 text-center">
                        <p className="text-slate-500">Map integration not available in preview mode.</p>
                     </div>
                   </div>
                </div>
            </GlassCard>

            <div className="flex flex-col gap-4 text-sm font-mono text-slate-400 bg-slate-900/50 p-6 border border-white/5 rounded-3xl">
               <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="flex items-center gap-2"><Clock size={16} className="text-white" /> Business Hours</span>
                  <span className="text-white font-bold">Mon - Sat: 10:00 AM - 08:30 PM</span>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="flex items-center gap-2"><Mail size={16} className="text-white" /> Email Inquiries</span>
                  <span className="text-white font-bold">sales@digitalpoint.com</span>
               </div>
            </div>
          </div>

          {/* Dynamic Form Area */}
          <GlassCard className="border-white/5 bg-slate-950/90 backdrop-blur-3xl shadow-2xl relative p-6 sm:p-8 rounded-3xl">
            <div className="flex flex-col sm:flex-row gap-2 mb-8 w-full">
              <button 
                onClick={() => { setFormType('inquiry'); setSubmitted(false); }}
                className={`flex-1 px-2 py-3.5 sm:px-4 sm:py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest transition-all ${formType === 'inquiry' ? 'bg-[#00f0ff] text-black shadow-[0_0_20px_rgba(0,240,255,0.3)]' : 'text-slate-500 hover:text-white'}`}
              >
                Quick Inquiry
              </button>
              <button 
                onClick={() => { setFormType('consultation'); setSubmitted(false); }}
                className={`flex-1 px-2 py-3.5 sm:px-4 sm:py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest transition-all ${formType === 'consultation' ? 'bg-[#00f0ff] text-black shadow-[0_0_20px_rgba(0,240,255,0.3)]' : 'text-slate-500 hover:text-white'}`}
              >
                Book Consultation
              </button>
            </div>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                  <CheckCircle className="text-emerald-500" size={48} />
                </div>
                <h2 className="text-3xl font-display font-bold mb-4 text-white">
                  {formType === 'inquiry' ? 'Submission Received' : 'Consultation Booked'}
                </h2>
                <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                  {formType === 'inquiry' 
                    ? 'Our imaging specialists will contact you on your registered mobile number shortly.'
                    : `We've received your request for a ${formData.consultationType} consultation on ${formData.date}. Our team will confirm the appointment shortly.`}
                </p>
                <NeonButton variant="outline" onClick={() => {
                  setSubmitted(false);
                  setFormData({ ...formData, message: '', product: '', date: '', timeSlot: '' });
                }}>
                  {formType === 'inquiry' ? 'Send Another Inquiry' : 'Book Another Session'}
                </NeonButton>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.form 
                  key={formType}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit} 
                  className="space-y-5"
                >
                  <div className="flex flex-col gap-5">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">Your Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your name" 
                        className="w-full bg-[#05070a] border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-neon-blue transition-colors placeholder:text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">Mobile Number</label>
                      <input 
                        required
                        type="tel" 
                        value={formData.mobile}
                        onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                        placeholder="+91" 
                        className="w-full bg-[#05070a] border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-neon-blue transition-colors placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  {formType === 'inquiry' ? (
                    <>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">Email Address (Optional)</label>
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="Your email address" 
                          className="w-full bg-[#05070a] border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-neon-blue transition-colors placeholder:text-slate-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">Equipment of Interest</label>
                        <input 
                          type="text" 
                          value={formData.product}
                          onChange={(e) => setFormData({...formData, product: e.target.value})}
                          placeholder="e.g. Sony a7S III or DJI Mavic 3" 
                          className="w-full bg-[#05070a] border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-neon-blue transition-colors placeholder:text-slate-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">Requirement Details</label>
                        <textarea 
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="Tell us about your production needs or specific questions..." 
                          className="w-full bg-[#05070a] border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-neon-blue transition-colors resize-none placeholder:text-slate-600"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">Preferred Date</label>
                          <div className="relative">
                            <input 
                              required
                              type="date" 
                              value={formData.date}
                              onChange={(e) => setFormData({...formData, date: e.target.value})}
                              min={new Date().toISOString().split('T')[0]}
                              className="w-full bg-[#05070a] border border-white/5 rounded-2xl px-5 py-4 pl-12 text-white focus:outline-none focus:border-[#00f0ff] transition-colors appearance-none placeholder:text-slate-600"
                            />
                            <Calendar size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                          </div>
                        </div>
                        <div>
                           <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">Preferred Time Slot</label>
                           <div className="relative">
                             <select 
                               required
                               value={formData.timeSlot}
                               onChange={(e) => setFormData({...formData, timeSlot: e.target.value})}
                               className="w-full bg-[#05070a] border border-white/5 rounded-2xl px-5 py-4 pl-12 text-white focus:outline-none focus:border-[#00f0ff] transition-colors appearance-none placeholder:text-slate-600"
                             >
                                <option value="" disabled className="bg-slate-900">Select Time Slot</option>
                                {timeSlots.map(slot => (
                                  <option key={slot} value={slot} className="bg-slate-900">{slot}</option>
                                ))}
                             </select>
                             <Clock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                           </div>
                        </div>
                      </div>

                      <div>
                         <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">Consultation Mode</label>
                         <div className="flex gap-3">
                           <label className={`flex-1 flex gap-2 items-center justify-center px-4 py-4 border rounded-2xl cursor-pointer transition-all ${formData.consultationType === 'showroom' ? 'bg-[#00f0ff]/10 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.1)]' : 'bg-[#05070a] border-white/5 text-slate-500 hover:bg-white/5'}`}>
                             <MapPin size={18} />
                             <input type="radio" name="consultationType" value="showroom" className="hidden" checked={formData.consultationType === 'showroom'} onChange={(e) => setFormData({...formData, consultationType: e.target.value})} />
                             <span className="font-bold text-xs uppercase tracking-widest">In-Store</span>
                           </label>
                           <label className={`flex-1 flex gap-2 items-center justify-center px-4 py-4 border rounded-2xl cursor-pointer transition-all ${formData.consultationType === 'video' ? 'bg-[#00f0ff]/10 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.1)]' : 'bg-[#05070a] border-white/5 text-slate-500 hover:bg-white/5'}`}>
                             <Video size={18} />
                             <input type="radio" name="consultationType" value="video" className="hidden" checked={formData.consultationType === 'video'} onChange={(e) => setFormData({...formData, consultationType: e.target.value})} />
                             <span className="font-bold text-xs uppercase tracking-widest">Video Call</span>
                           </label>
                         </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">Topics to Discuss</label>
                        <textarea 
                          required
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="What equipment or workflow do you need help with?" 
                          className="w-full bg-[#05070a] border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#00f0ff] transition-colors resize-none placeholder:text-slate-600"
                        />
                      </div>
                    </>
                  )}

                  <NeonButton 
                    type="submit" 
                    variant="primary" 
                    className={`w-full !py-4 mt-4 ${formType === 'inquiry' ? 'bg-[#00f0ff] hover:bg-[#00c0cc] text-black shadow-[0_0_20px_rgba(0,240,255,0.3)]' : 'bg-neon-purple text-white hover:bg-fuchsia-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]'}`} 
                    disabled={loading}
                  >
                    {loading ? (
                      formType === 'inquiry' ? 'Transmitting...' : 'Booking...'
                    ) : (
                      <span className="flex items-center gap-2 text-lg">
                        {formType === 'inquiry' ? <><Send size={20} /> Submit Inquiry</> : <><Calendar size={20} /> Schedule Consultation</>}
                      </span>
                    )}
                  </NeonButton>
                  <p className="text-[10px] text-slate-600 text-center uppercase tracking-widest pt-2">
                    {formType === 'inquiry' ? 'Secure encrypted inquiry channel' : 'Expert scheduling guaranteed'}
                  </p>
                </motion.form>
              </AnimatePresence>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
