'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, MapPin, Clock, Star, X } from 'lucide-react';
import Link from 'next/link';

export function DeliveryBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    { icon: Truck, text: "UK-Wide Delivery", color: "from-orange-500 to-yellow-500" },
    { icon: MapPin, text: "Any UK Postcode", color: "from-green-500 to-emerald-500" },
    { icon: Clock, text: "Next Business Day", color: "from-purple-500 to-pink-500" },
    { icon: Star, text: "Premium Service", color: "from-blue-500 to-cyan-500" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const CurrentIcon = features[currentFeature].icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-600 text-white shadow-2xl border-b border-orange-400/30 z-50 overflow-hidden"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-yellow-500/20 to-orange-600/20">
          <div className="absolute inset-0 opacity-30"></div>
        </div>

        {/* Floating elements - hidden on mobile for cleaner look */}
        <div className="absolute inset-0 overflow-hidden hidden sm:block">
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-4 left-10 w-3 h-3 bg-white/20 rounded-full"
          />
          <motion.div
            animate={{ 
              x: [0, -80, 0],
              y: [0, 15, 0],
              rotate: [0, -3, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute top-6 right-20 w-2 h-2 bg-white/30 rounded-full"
          />
          <motion.div
            animate={{ 
              x: [0, 60, 0],
              y: [0, -10, 0],
              rotate: [0, 2, 0]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-4 left-1/3 w-2.5 h-2.5 bg-white/25 rounded-full"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-3 py-2 sm:px-4 sm:py-3 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-4">
            {/* Main Content */}
            <div className="flex items-center space-x-3 sm:space-x-6 flex-1 min-w-0">
              {/* Delivery Icon */}
              <div className="flex-shrink-0">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="h-8 w-8 sm:h-10 sm:w-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                  <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </motion.div>
              </div>
              
              {/* Main Message */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                  <div className="mb-1 sm:mb-0">
                    <motion.h3 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="font-bold text-white text-xs sm:text-sm md:text-base leading-tight"
                    >
                      🚚 UK-Wide Delivery
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-white/90 text-xs leading-tight sm:leading-relaxed hidden sm:block"
                    >
                      Experience authentic West African cuisine delivered to your doorstep across the UK
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-white/90 text-xs leading-tight sm:hidden"
                    >
                      Authentic West African cuisine delivered UK-wide
                    </motion.p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price and Features */}
            <div className="flex items-center space-x-2 sm:space-x-6">
              {/* Price Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex-shrink-0"
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 sm:px-4 sm:py-2 border border-white/30">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <span className="text-xs font-medium text-white/80 hidden sm:inline">Delivery</span>
                    <span className="text-sm sm:text-lg font-bold text-white">From £24.99</span>
                  </div>
                </div>
              </motion.div>

              {/* Rotating Features - hidden on mobile */}
              <div className="hidden lg:flex items-center space-x-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFeature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center space-x-2"
                  >
                    <div className={`w-8 h-8 bg-gradient-to-r ${features[currentFeature].color} rounded-full flex items-center justify-center`}>
                      <CurrentIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-medium text-white/90 whitespace-nowrap">
                      {features[currentFeature].text}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex-shrink-0"
              >
                <Link
                  href="/menu"
                  className="inline-flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap rounded-md text-xs sm:text-sm font-medium transition-all h-7 sm:h-9 px-2 sm:px-4 py-1 sm:py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 hover:border-white/50"
                >
                  <span className="hidden sm:inline">Order Now</span>
                  <span className="sm:hidden">Order</span>
                </Link>
              </motion.div>

              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                onClick={() => setIsVisible(false)}
                className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors border border-white/30"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 