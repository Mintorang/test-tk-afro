'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

export function GlassCard({ children, className = '', delay = 0, onClick }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl
        bg-white/10 backdrop-blur-md border border-white/20
        shadow-xl hover:shadow-2xl
        transition-all duration-300 ease-out
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Glassmorphism effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10" />
      <div className="absolute inset-0 bg-gradient-to-tl from-orange-500/10 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  );
} 