import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Plus, Minus, MessageSquare, Phone } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { NeonButton } from '../components/ui/NeonButton';

export default function FAQ() {
  const faqs = [
    {
      question: "How do I inquire about a specific product?",
      answer: "Every product page has a dedicated 'WhatsApp Inquiry' and 'Call Now' button. You can also fill out the contact form with the product name, and our technical specialists will reach out with pricing and availability details."
    },
    {
      question: "Do you provide product recommendations?",
      answer: "Yes. We offer professional consultation based on your production requirements. Whether you are building a wedding kit, a cinematic documentary rig, or a studio setup, we can help you choose the right gear."
    },
    {
      question: "Is online purchase available via the website?",
      answer: "No. Digital Point operates as a premium showroom catalog and inquiry platform. We believe high-end imaging gear requires personalized attention and verification. All transactions and deliveries are handled directly via our showroom or verified offline channels."
    },
    {
      question: "What brands do you officially deal with?",
      answer: "We carry a curated selection of industry leaders including Sony Alpha, Canon, RED Digital Cinema, DJI Pro, Blackmagic Design, Sigma, and various premium accessory brands."
    },
    {
      question: "How can I check if an item is currently in stock?",
      answer: "Availability statuses are updated frequently on our website. However, for real-time stock verification, we recommend a quick WhatsApp message or direct call to +91 90731 28151."
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-cyber-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Support <span className="text-neon-blue">& FAQ</span></h1>
          <p className="text-slate-400 text-lg">Clear answers for professional creators. Learn how we operate.</p>
        </div>

        <div className="space-y-4 mb-20">
          {faqs.map((faq, i) => (
            <div key={i}>
              <FaqItem faq={faq} />
            </div>
          ))}
        </div>

        <div className="glass-panel p-10 border-white/5 bg-gradient-to-r from-neon-purple/10 to-transparent flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="text-center md:text-left">
             <h3 className="text-2xl font-bold mb-2">Still Have Questions?</h3>
             <p className="text-slate-400">Our technical support is available from 10 AM to 8:30 PM.</p>
           </div>
           <div className="flex gap-4">
              <a href="https://wa.me/919073128151" target="_top" rel="noopener noreferrer">
                <NeonButton variant="primary">
                  <MessageSquare size={18} /> WhatsApp Support
                </NeonButton>
              </a>
              <a href="tel:9073128151">
                <NeonButton variant="outline">
                  <Phone size={18} /> Call us
                </NeonButton>
              </a>
           </div>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ faq }: { faq: { question: string, answer: string } }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <GlassCard className={`border-white/5 cursor-pointer transition-colors ${isOpen ? 'border-neon-blue/20' : 'hover:border-white/10'}`}>
      <div className="flex justify-between items-center" onClick={() => setIsOpen(!isOpen)}>
        <h3 className={`text-lg font-bold transition-colors ${isOpen ? 'text-neon-blue' : 'text-white'}`}>{faq.question}</h3>
        <div className={`p-1 rounded-full bg-white/5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
           {isOpen ? <Minus size={20} className="text-neon-blue" /> : <Plus size={20} />}
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-6 text-slate-400 leading-relaxed border-t border-white/5 mt-6">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
