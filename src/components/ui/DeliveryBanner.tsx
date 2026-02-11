'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, MapPin, Clock, Star, X, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function DeliveryBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    { icon: Truck, text: "UK-Wide Shipping", sub: "Authentic flavors anywhere" },
    { icon: Clock, text: "Next Day Delivery", sub: "Freshly prepared & packed" },
    { icon: MapPin, text: "Any UK Postcode", sub: "From London to Scotland" },
    { icon: Star, text: "Premium Packaging", sub: "Temperature controlled" }
  ];

useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]); // Added features.length here

  if (!isVisible) return null;

  const FeatureIcon = features[currentFeature].icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="relative z-[100] w-full bg-[#f97316] overflow-hidden"
      >
        {/* Animated Gloss Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse-slow" />
        
        <div className="max-w-7xl mx-auto px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-4">
            
            {/* Left: Dynamic Feature Ticker */}
            <div className="flex items-center flex-1 min-w-0">
              <div className="bg-white/20 p-1.5 rounded-lg hidden xs:block mr-3">
                <FeatureIcon className="w-4 h-4 text-white" />
              </div>
              
              <div className="overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFeature}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="flex flex-col"
                  >
                    <span className="text-[10px] sm:text-xs font-bold text-white/80 uppercase tracking-widest">
                      {features[currentFeature].text}
                    </span>
                    <span className="text-white text-xs sm:text-sm font-medium truncate">
                      {features[currentFeature].sub}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right: Price & CTA */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden md:flex flex-col items-end border-l border-white/20 pl-4">
                <span className="text-[10px] text-white/70 uppercase">Starting From</span>
                <span className="text-white font-black">£24.99</span>
              </div>

              <Link href="/menu">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#f97316] text-[10px] sm:text-xs font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg flex items-center gap-1"
                >
                  ORDER NOW <ChevronRight className="w-3 h-3" />
                </motion.button>
              </Link>

              <button 
                onClick={() => setIsVisible(false)}
                className="text-white/60 hover:text-white p-1 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Progress Bar (Visual Timer) */}
        <motion.div 
          key={`bar-${currentFeature}`}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "linear" }}
          className="absolute bottom-0 left-0 h-[2px] bg-white/30"
        />
      </motion.div>
    </AnimatePresence>
  );
}
