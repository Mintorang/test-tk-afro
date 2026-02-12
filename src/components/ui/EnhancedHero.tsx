'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Truck, ShieldCheck, ArrowRight } from 'lucide-react';

const heroImages = [
  {
    src: '/images/updates/Croaker-platter.jpeg',
    alt: 'Croaker Fish Platter',
    title: 'Premium Fish Platters'
  },
  {
    src: '/images/updates/Tillapia-platter.jpeg',
    alt: 'Tilapia Fish Platter',
    title: 'Fresh Tilapia Delights'
  },
  {
    src: '/images/updates/assorted-stew.jpeg',
    alt: 'Assorted Stew',
    title: 'Rich Nigerian Stews'
  },
  {
    src: '/images/updates/efor-riro.jpeg',
    alt: 'Efo Riro',
    title: 'Traditional Efo Riro'
  },
  {
    src: '/images/updates/peperred-soft-chicken.jpeg',
    alt: 'Peppered Soft Chicken',
    title: 'Tender Peppered Chicken'
  }
];

const features = [
  { icon: Star, title: 'Premium Quality', description: 'Authentic Nigerian recipes' },
  { icon: Clock, title: 'Fresh Daily', description: 'Prepared fresh every day' },
  { icon: Truck, title: 'UK-Wide Delivery', description: 'Nationwide shipping' }
];

export function EnhancedHero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#080808]">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentImageIndex].src}
              alt={heroImages[currentImageIndex].alt}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            {/* High-end Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#080808]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y: isMobile ? 0 : y, opacity }}
        className="relative z-10 container mx-auto px-6 pt-32 pb-12 text-center"
      >
        {/* Trust Badge - Improves "First Impression" Reliability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl"
        >
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80">
            5-Star Hygiene Rated Kitchen
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black mb-8 leading-[0.9] tracking-tighter italic uppercase">
            <span className="text-white">TK AFRO</span><br/>
            <span className="text-gradient">KITCHEN</span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
        >
          Experience the soul of Nigerian cuisine. Authentic spices, 
          premium ingredients, and traditional flavors delivered to your door.
        </motion.p>

        {/* Buttons using your Global Classes */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link href="/menu" className="w-full sm:w-auto">
            <button className="button-primary w-full sm:min-w-[220px] flex items-center justify-center gap-2">
              Order Now <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link href="/frozen" className="w-full sm:w-auto">
            <button className="button-glass w-full sm:min-w-[220px]">
              Frozen Range
            </button>
          </Link>
        </motion.div>

        {/* Bento-styled Features */}
        <div className="hidden md:grid grid-cols-3 gap-6 mt-24 max-w-4xl mx-auto">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + (i * 0.1) }}
              className="glass p-6 rounded-[1.5rem] border border-white/5 hover:border-primary/20 transition-colors group"
            >
              <div className="bg-primary/10 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <f.icon className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-sm font-black italic uppercase text-white mb-1">{f.title}</h3>
              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent z-20" />
    </section>
  );
}
