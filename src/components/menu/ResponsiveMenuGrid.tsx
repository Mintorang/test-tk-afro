'use client';

import { motion } from 'framer-motion';
import { FoodCard } from '@/components/food/food-card';
import { MenuItem } from '@/data/sample-menu';

interface ResponsiveMenuGridProps {
  items: MenuItem[];
  selectedCategory: string;
}

export function ResponsiveMenuGrid({ items, selectedCategory }: ResponsiveMenuGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 sm:py-20 px-4">
        <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🍽️</div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">No items found</h3>
        <p className="text-sm sm:text-base text-gray-400">Try adjusting your search or category filter</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <FoodCard
            id={item.id}
            name={item.name}
            description={item.description}
            imageUrl={item.imageUrl}
            category={item.category}
            sizeOptions={item.sizeOptions}
            defaultSizeIndex={item.defaultSizeIndex}
            showSpiceLevel={item.category === "Protein Dishes" || item.category === "Soups & Stews"}
          />
        </motion.div>
      ))}
    </div>
  );
} 