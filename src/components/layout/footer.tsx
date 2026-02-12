'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ScrollAnimation } from '@/components/ui/ScrollAnimation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter,
  ArrowUp, Code, Palette, Star, Shield, Users
} from 'lucide-react';
import { useState, useEffect } from 'react';

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const footerSections = [
    {
      title: "Explore",
      links: [
        { name: "Our Menu", href: "/menu" },
        { name: "Catering", href: "/catering" },
        { name: "Frozen Range", href: "/frozen" },
        { name: "The Story", href: "/about" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Delivery Info", href: "/menu" },
        { name: "Contact Us", href: "/contact" },
        { name: "Bulk Orders", href: "/contact" },
        { name: "Privacy Policy", href: "/privacy" }
      ]
    }
  ];

  return (
    <footer className="relative bg-[#050505] pt-24 pb-32 md:pb-12 border-t border-white/5 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Pillar */}
          <div className="lg:col-span-5">
            <ScrollAnimation direction="right">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative w-14 h-14 grayscale hover:grayscale-0 transition-all duration-500">
                  <Image src="/images/brand/tklogo.jpg" alt="TK" fill className="object-cover rounded-full border border-white/10" />
                </div>
                <div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">
                    TKAfro <span className="text-primary">Kitchen</span>
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Authentic Excellence</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md mb-8 italic">
                Elevating West African flavors for the modern palate. Traditional recipes meets boutique service, delivered across the UK.
              </p>
              
              <div className="space-y-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                <div className="flex items-center gap-3 hover:text-white transition-colors cursor-default">
                  <MapPin size={14} className="text-primary" /> Milton Keynes, UK
                </div>
                <div className="flex items-center gap-3 hover:text-white transition-colors">
                  <Mail size={14} className="text-primary" /> chef@tkafrokitchen.com
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, idx) => (
            <div key={section.title} className="lg:col-span-2">
              <ScrollAnimation delay={idx * 0.1}>
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white mb-8 italic">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-gray-500 hover:text-primary text-xs font-bold uppercase tracking-widest transition-all">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </ScrollAnimation>
            </div>
          ))}

          {/* Social Presence */}
          <div className="lg:col-span-3">
            <ScrollAnimation delay={0.3}>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white mb-8 italic">Social</h4>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ y: -5, color: '#f97316' }}
                    className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-gray-500 hover:border-primary/50 transition-colors"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </ScrollAnimation>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:row justify-between items-center gap-8">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">
            © 2026 TKAfro Kitchen. Crafted for the Culture.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="https://cbis.dev" target="_blank" className="flex items-center gap-2 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Built by CBIS</span>
              <Code size={14} className="text-primary" />
            </a>
          </div>
        </div>
      </div>

      {/* Boutique Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-32 right-6 md:bottom-10 md:right-10 z-50 w-12 h-12 glass rounded-full flex items-center justify-center text-white border border-white/10 hover:border-primary/50 transition-colors"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
