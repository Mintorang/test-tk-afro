'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedButton } from './AnimatedButton';

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y }}
      >
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/dishes/jollof-rice.jpg')",
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        />
        
        {/* Background overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-yellow-500/10 to-red-500/20"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(249, 115, 22, 0.2), rgba(234, 179, 8, 0.1), rgba(239, 68, 68, 0.2))",
            "linear-gradient(45deg, rgba(239, 68, 68, 0.2), rgba(249, 115, 22, 0.2), rgba(234, 179, 8, 0.1))",
            "linear-gradient(45deg, rgba(234, 179, 8, 0.1), rgba(239, 68, 68, 0.2), rgba(249, 115, 22, 0.2))",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main content */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 text-center"
        style={{ opacity }}
      >
        {/* Cultural tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="inline-block px-4 py-2 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-300 text-sm font-medium">
            🍃 Authentic African Heritage
          </span>
        </motion.div>

        {/* Main title with cultural emphasis */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
            TK Afro Kitchen
          </span>
        </motion.h1>

        {/* Cultural subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-4 max-w-4xl mx-auto leading-relaxed font-light"
        >
          Where Tradition Meets Innovation
        </motion.p>

        {/* Cultural description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Experience the rich flavors of Nigeria and West Africa, crafted with authentic recipes passed down through generations
        </motion.p>

        {/* Call to action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <AnimatedButton size="lg" onClick={() => window.location.href = '/menu'}>
            🍽️ Explore Our Menu
          </AnimatedButton>
          <AnimatedButton variant="outline" size="lg" onClick={() => window.location.href = '/catering'}>
            🎉 Catering Services
          </AnimatedButton>
        </motion.div>

        {/* Cultural highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🌶️</span>
            </div>
            <p className="text-sm text-gray-300">Authentic Spices</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">👨‍🍳</span>
            </div>
            <p className="text-sm text-gray-300">Expert Chefs</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">❤️</span>
            </div>
            <p className="text-sm text-gray-300">Made with Love</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-orange-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
} 