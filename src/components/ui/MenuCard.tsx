'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Plus, Info } from 'lucide-react';

interface SizeOption {
  size: string;
  price: number;
  portionInfo?: string;
}

interface MenuCardProps {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  price?: number;
  sizeOptions?: SizeOption[];
  category: string;
  onClick?: () => void;
  delay?: number;
}

export function MenuCard({ 
  id,
  name,
  description,
  imageUrl,
  price,
  sizeOptions,
  category,
  onClick,
  delay = 0
}: MenuCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-GB', { 
      style: 'currency', 
      currency: 'GBP', 
      minimumFractionDigits: 0 
    }).format(val);
  };

  const displayPriceNum = (() => {
    if (sizeOptions && sizeOptions.length > 0) {
      return Math.min(...sizeOptions.map(s => (typeof s.price === 'number' ? s.price : Infinity)));
    }
    return price ?? 0;
  })();

  const isVariable = sizeOptions && sizeOptions.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
      className="group relative flex flex-col h-full rounded-[2rem] bg-zinc-900/40 border border-white/5 overflow-hidden hover:border-primary/50 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className={`
            object-cover transition-transform duration-1000 ease-out
            ${imageLoaded ? 'scale-100' : 'scale-110'}
            group-hover:scale-110
          `}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-primary">
            {category}
          </span>
          {isVariable && (
            <div className="bg-primary p-1.5 rounded-full shadow-xl">
              <Info className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        {/* Floating Price Tag */}
        <div className="absolute bottom-4 right-4">
          <div className="px-4 py-2 rounded-2xl bg-white text-black font-black text-lg shadow-2xl">
            {isVariable && <span className="text-[10px] block leading-none opacity-50 uppercase">From</span>}
            {formatPrice(displayPriceNum)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-black italic uppercase tracking-tighter text-white group-hover:text-primary transition-colors duration-300">
          {name}
        </h3>
        
        {description && (
          <p className="mt-2 text-gray-400 text-sm font-medium leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        <div className="mt-auto pt-6 flex items-center justify-between">
          <div className="flex gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
             <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
            View <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
