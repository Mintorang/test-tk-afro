'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass'; // Added 'glass'
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export function AnimatedButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '',
  disabled = false 
}: AnimatedButtonProps) {
  
  // Updated to rounded-full for that boutique 2026 look
  const baseClasses = `
    relative overflow-hidden rounded-full font-black uppercase tracking-[0.15em] italic
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-orange-500/50
    disabled:opacity-40 disabled:cursor-not-allowed
    flex items-center justify-center
  `;

  const variantClasses = {
    primary: `
      bg-primary text-white
      shadow-[0_0_0px_rgba(249,115,22,0)]
      hover:shadow-[0_0_25px_rgba(249,115,22,0.5)]
    `,
    secondary: `
      bg-zinc-800 text-white
      hover:bg-zinc-700
      hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]
    `,
    outline: `
      bg-transparent border border-primary/40
      text-primary
      hover:bg-primary hover:text-white
      hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]
    `,
    glass: `
      bg-white/5 backdrop-blur-md border border-white/10
      text-white hover:bg-white/10
      hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]
    `
  };

  const sizeClasses = {
    sm: 'px-6 py-2.5 text-[10px]',
    md: 'px-8 py-3.5 text-xs',
    lg: 'px-10 py-4 text-sm'
  };

  return (
    <motion.button
      whileHover={{ 
        scale: 1.02, // Subtle scale is more "luxury" than 1.05
        y: -2,
        transition: { duration: 0.1, ease: "easeOut" }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.05 }
      }}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {/* Shine Sweep Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-150%' }}
        whileHover={{ x: '150%' }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      
      {/* Label Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Inner Underglow Pool */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-white/50 blur-[4px]"
        initial={{ opacity: 0, width: "0%" }}
        whileHover={{ opacity: 1, width: "60%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
