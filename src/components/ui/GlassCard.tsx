'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
}

export function GlassCard({ children, className = "", onClick, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      // Fixed the brightness error by putting it inside filter
      whileTap={{ scale: 0.98, filter: "brightness(1.1)" }}
      onClick={onClick}
      className={`
        glass-card group
        relative overflow-hidden rounded-2xl 
        bg-white/5 border border-white/10 backdrop-blur-md
        hover:bg-white/10 hover:border-orange-500/30
        transition-all duration-300 shadow-xl
        ${className}
      `}
    >
      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
