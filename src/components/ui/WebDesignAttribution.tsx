'use client';

import { motion } from 'framer-motion';
import { Code, Palette, Zap, Globe, Star, Award } from 'lucide-react';

interface WebDesignAttributionProps {
  variant?: 'minimal' | 'detailed' | 'floating';
  className?: string;
}

export function WebDesignAttribution({ 
  variant = 'detailed', 
  className = '' 
}: WebDesignAttributionProps) {
  const variants = {
    minimal: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`flex items-center justify-center space-x-2 text-gray-400 text-sm ${className}`}
      >
        <span>Website by</span>
        <motion.a
          href="https://cbis.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-orange-400 hover:text-orange-300 transition-colors duration-300 group"
          whileHover={{ scale: 1.05 }}
        >
          <Code className="w-4 h-4" />
          <span className="font-semibold">CBIS</span>
          <Palette className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
        </motion.a>
      </motion.div>
    ),
    
    detailed: (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 ${className}`}
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Code className="w-8 h-8 text-white" />
          </motion.div>
          
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl font-bold text-white mb-2"
          >
            Professional Web Design
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-gray-400 text-sm mb-4"
          >
            This website was expertly crafted by CBIS
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-center space-x-4 mb-4"
          >
            <div className="flex items-center space-x-1 text-yellow-400">
              <Star className="w-4 h-4" />
              <span className="text-xs">Premium</span>
            </div>
            <div className="flex items-center space-x-1 text-blue-400">
              <Zap className="w-4 h-4" />
              <span className="text-xs">Fast</span>
            </div>
            <div className="flex items-center space-x-1 text-green-400">
              <Globe className="w-4 h-4" />
              <span className="text-xs">Responsive</span>
            </div>
          </motion.div>
          
          <motion.a
            href="https://cbis.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Code className="w-4 h-4" />
            <span>Visit CBIS</span>
            <Palette className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
          </motion.a>
        </div>
      </motion.div>
    ),
    
    floating: (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed bottom-4 left-4 z-40 bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50 shadow-lg ${className}`}
      >
        <motion.a
          href="https://cbis.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-300 hover:text-orange-400 transition-colors duration-300 group"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
            <Code className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Website by</div>
            <div className="text-sm font-bold text-orange-400">CBIS</div>
          </div>
          <Award className="w-4 h-4 text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
        </motion.a>
      </motion.div>
    )
  };

  return variants[variant];
} 