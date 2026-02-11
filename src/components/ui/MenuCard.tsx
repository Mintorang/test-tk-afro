'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

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
  // optional: either a single price or a set of sizeOptions
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
    try {
      return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(val);
    } catch (e) {
      return `£${val}`;
    }
  };

  const displayPriceNum = (() => {
    if (sizeOptions && sizeOptions.length > 0) {
      // use the minimum price for "From" display
      return Math.min(...sizeOptions.map(s => (typeof s.price === 'number' ? s.price : Infinity)));
    }
    if (typeof price === 'number') return price;
    return 0;
  })();

  const priceLabel = (() => {
    if (sizeOptions && sizeOptions.length > 1) return `From ${formatPrice(displayPriceNum)}`;
    if (sizeOptions && sizeOptions.length === 1) {
      const opt = sizeOptions[0];
      const sizeName = opt.size && opt.size !== 'default' ? `${opt.size} ` : '';
      return `${sizeName}${formatPrice(opt.price)}`;
    }
    return formatPrice(displayPriceNum);
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -12, transition: { duration: 0.3 } }}
      onClick={onClick}
      className={`
        group relative overflow-hidden rounded-2xl
        bg-white/5 backdrop-blur-sm border border-white/10
        shadow-lg hover:shadow-2xl
        transition-all duration-500 ease-out
        ${onClick ? 'cursor-pointer' : ''}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10" />
      <div className="absolute inset-0 bg-gradient-to-tl from-orange-500/5 to-transparent" />

      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className={`object-cover transition-all duration-700 ${imageLoaded ? 'scale-100' : 'scale-110'} group-hover:scale-110`}
          onLoad={() => setImageLoaded(true)}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/40" />
        
        {/* Category badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.2 }}
          className="absolute top-3 left-3 px-3 py-1 bg-orange-500/90 text-white text-xs font-semibold rounded-full"
        >
          {category}
        </motion.div>
        
        {/* Price badge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.3 }}
          className="absolute top-3 right-3 px-3 py-1 bg-white/90 text-gray-900 text-sm font-bold rounded-full"
        >
          {priceLabel}
        </motion.div>
      </div>

      <div className="relative z-10 p-6">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.4 }}
          className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors"
        >
          {name}
        </motion.h3>
        
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.5 }}
            className="text-sm text-slate-300 line-clamp-3"
          >
            {description}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
