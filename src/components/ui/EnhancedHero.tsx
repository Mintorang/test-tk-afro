'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Truck, ChevronRight } from 'lucide-react';

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
  { icon: Truck, title: 'UK-Wide Delivery', description: 'Fast delivery across UK' }
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
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#0a0a0a]" />
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div 
        style={{ y: isMobile ? 0 : y, opacity }}
        className="relative z-10 container mx-auto px-6 pt-20 pb-12 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-md"
        >
          <span className="text-orange-400 text-sm font-bold tracking-widest uppercase">
            {heroImages[currentImageIndex].title}
          </span>
        </motion.div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 leading-[1.1] tracking-tighter">
          <span className="text-white">TK AFRO</span><br/>
          <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">KITCHEN</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Experience authentic Nigerian cuisine with premium ingredients, 
          traditional recipes, and exceptional taste.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/menu" className="w-full sm:w-auto">
            <button className="w-full sm:px-12 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)]">
              Order Now
            </button>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto">
            <button className="w-full px-12 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white font-medium">
              View Menu
            </button>
          </Link>
        </div>

        <div className="hidden md:grid grid-cols-3 gap-8 mt-20">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="bg-orange-500/20 p-3 rounded-full mb-3">
                <f.icon className="text-orange-500 w-6 h-6" />
              </div>
              <span className="text-white font-bold">{f.title}</span>
              <span className="text-gray-500 text-xs">{f.description}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
