'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="relative bg-gradient-to-r from-orange-600 via-primary to-yellow-500 z-[60]"
        >
          <div className="container mx-auto px-4 py-2.5 flex items-center justify-center gap-4">
            <Sparkles className="text-white animate-pulse" size={16} />
            
            <p className="text-[11px] md:text-xs font-black uppercase italic tracking-[0.15em] text-white">
              Limited Time: <span className="underline decoration-2 underline-offset-4">Small Treats Package</span> deal is now live!
            </p>

            <Link 
              href="/menu" 
              className="bg-white text-black text-[9px] font-black uppercase px-3 py-1 rounded-full hover:bg-black hover:text-white transition-all shadow-xl"
            >
              Claim Deal
            </Link>

            <button 
              onClick={() => setIsVisible(false)}
              className="absolute right-4 text-white/80 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
