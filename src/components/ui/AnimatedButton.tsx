'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
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
  const baseClasses = `
    relative overflow-hidden rounded-lg font-semibold
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-orange-500/50
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-orange-500 to-yellow-500
      text-white shadow-lg
      hover:from-orange-600 hover:to-yellow-600
      hover:shadow-orange-500/25
    `,
    secondary: `
      bg-gradient-to-r from-gray-700 to-gray-800
      text-white shadow-lg
      hover:from-gray-600 hover:to-gray-700
      hover:shadow-gray-500/25
    `,
    outline: `
      bg-transparent border-2 border-orange-500
      text-orange-500
      hover:bg-orange-500 hover:text-white
      hover:shadow-orange-500/25
    `
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
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
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-400/20 to-yellow-400/20"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
} 