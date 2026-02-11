'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} border-2 border-orange-500/20 border-t-orange-500 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 1, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
    </div>
  );
}

export function SkeletonLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-700/50 rounded-lg h-48 mb-4" />
      <div className="space-y-3">
        <div className="bg-gray-700/50 rounded h-4 w-3/4" />
        <div className="bg-gray-700/50 rounded h-3 w-full" />
        <div className="bg-gray-700/50 rounded h-3 w-2/3" />
      </div>
    </div>
  );
} 