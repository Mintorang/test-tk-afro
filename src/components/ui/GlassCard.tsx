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
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      // Desktop Hover
      whileHover={{ y: -5 }} 
      // Mobile Tap Feedback (Massive improvement for UX)
      whileTap={{ scale: 0.98, brightness: 1.1 }}
      onClick={onClick}
      className={`
        glass-card group
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Optimized Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-orange-500/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 p-5 md:p-6">
        {children}
      </div>
    </motion.div>
  );
}
