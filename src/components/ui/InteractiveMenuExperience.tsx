'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ScrollAnimation } from './ScrollAnimation';
import { AnimatedButton } from './AnimatedButton';
import { GlassCard } from './GlassCard';

export function InteractiveMenuExperience() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All', icon: '🍽️' },
    { id: 'main', name: 'Mains', icon: '🍖' },
    { id: 'sides', name: 'Sides', icon: '🥬' },
    { id: 'drinks', name: 'Drinks', icon: '🥤' },
    { id: 'desserts', name: 'Snacks', icon: '🍰' }
  ];

  const interactiveDishes = [
    {
      id: 1,
      name: "Jollof Rice",
      description: "Aromatic rice cooked in rich tomato sauce with traditional spices",
      price: "35.00",
      category: "main",
      image: "/images/dishes/Jollof.jpeg",
      origin: "West Africa",
      spiceLevel: "Medium",
      ingredients: ["Rice", "Tomatoes", "Bell Peppers", "Traditional Spices"],
      culturalContext: "Jollof Rice is a celebration dish, often served at weddings across West Africa.",
      preparation: "Slow-cooked for hours to develop deep, complex flavors"
    },
    {
      id: 2,
      name: "Efo Riro",
      description: "Rich and nutritious Nigerian spinach stew",
      price: "60.00",
      category: "main",
      image: "/images/dishes/eforiro-with-assortedmeat.jpg",
      origin: "Nigeria",
      spiceLevel: "Mild",
      ingredients: ["Spinach", "Palm Oil", "Locust Beans", "Assorted Meat"],
      culturalContext: "A staple dish in Nigerian households, representing comfort and home.",
      preparation: "Spinach stew simmered with traditional spices"
    },
    // ... rest of your dishes
  ];

  const filteredDishes = selectedCategory === 'all' 
    ? interactiveDishes 
    : interactiveDishes.filter(dish => dish.category === selectedCategory);

  return (
    <section className="py-12 sm:py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <ScrollAnimation>
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Interactive Menu
              </span>
            </h2>
            <p className="text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto px-4">
              Explore the culture behind our flavors. Each dish is a journey through West African heritage.
            </p>
          </div>
        </ScrollAnimation>

        {/* Category Filter - Mobile Friendly */}
        <ScrollAnimation delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 border ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-transparent'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:border-orange-500/50'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </ScrollAnimation>

        {/* Interactive Dish Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredDishes.map((dish, index) => (
              <motion.div
                layout
                key={dish.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <GlassCard className="h-full flex flex-col overflow-hidden group">
                  {/* Visual Header */}
                  <div className="relative h-48 sm:h-52 w-full">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    {/* Image placeholder or actual img */}
                    <div className="absolute inset-0 bg-gray-800 animate-pulse" /> 
                    
                    <div className="absolute top-4 right-4 z-20 bg-orange-500 text-white px-3 py-1 rounded-lg font-bold text-sm shadow-lg">
                      £{dish.price}
                    </div>
                    <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                       <span className="bg-black/50 backdrop-blur-md px-2 py-1 rounded text-xs text-white border border-white/10">
                        🌶️ {dish.spiceLevel}
                       </span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-5 sm:p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {dish.description}
                    </p>

                    {/* Culture Note */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-orange-400 text-xs">🏛️ {dish.origin}</span>
                      </div>
                      <p className="text-[11px] text-gray-400 italic leading-tight">
                        {dish.culturalContext}
                      </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-auto pt-4 flex gap-3">
                      <AnimatedButton 
                        size="sm" 
                        className="flex-1 bg-white/10 border border-white/10 text-white hover:bg-white/20"
                        onClick={() => window.location.href = `/menu/${dish.id}`}
                      >
                        Details
                      </AnimatedButton>
                      <AnimatedButton 
                        size="sm" 
                        className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
                        onClick={() => console.log('Added to cart')}
                      >
                        Add
                      </AnimatedButton>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
