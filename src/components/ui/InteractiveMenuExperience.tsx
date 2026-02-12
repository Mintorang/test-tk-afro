'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { ScrollAnimation } from './ScrollAnimation';
import { AnimatedButton } from './AnimatedButton';
import { GlassCard } from './GlassCard';
import { ShoppingCart, Info, Sparkles } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export function InteractiveMenuExperience() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addItem } = useCart();

  const categories = [
    { id: 'all', name: 'All', icon: '🍽️' },
    { id: 'deals', name: 'Deals', icon: '🎁' }, // Added for the Small Treats Deal
    { id: 'main', name: 'Mains', icon: '🍖' },
    { id: 'sides', name: 'Sides', icon: '🥬' },
    { id: 'desserts', name: 'Snacks', icon: '🍰' }
  ];

  const interactiveDishes = [
    {
      id: 'small-treats-pkg',
      name: "Small Treats Package",
      description: "A curated selection of our best-selling finger foods and snacks. Perfect for sampling or light sharing.",
      price: "25.00",
      category: "deals",
      image: "/images/updates/peperred-soft-chicken.jpeg", // Using a high-quality existing asset
      origin: "TK Afro Special",
      spiceLevel: "Variable",
      culturalContext: "Designed for the 'Small-Small' cravings. Our most popular snack assembly.",
      isDeal: true
    },
    {
      id: 1,
      name: "Jollof Rice",
      description: "Aromatic rice cooked in rich tomato sauce with traditional spices",
      price: "35.00",
      category: "main",
      image: "/images/dishes/Jollof.jpeg",
      origin: "West Africa",
      spiceLevel: "Medium",
      culturalContext: "Jollof Rice is a celebration dish, often served at weddings across West Africa.",
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
      culturalContext: "A staple dish in Nigerian households, representing comfort and home.",
    }
  ];

  const filteredDishes = selectedCategory === 'all' 
    ? interactiveDishes 
    : interactiveDishes.filter(dish => dish.category === selectedCategory);

  return (
    <section className="py-12 sm:py-20 px-4 bg-[#080808]">
      <div className="container mx-auto">
        {/* Section Header */}
        <ScrollAnimation delay={0.1}>
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-4xl sm:text-6xl font-black italic uppercase tracking-tighter mb-4">
              <span className="text-white">The Interactive</span><br/>
              <span className="text-gradient">Menu</span>
            </h2>
            <p className="text-sm sm:text-lg text-gray-500 max-w-2xl mx-auto px-4 font-medium">
              Explore the culture behind our flavors. Each dish is a journey through West African heritage.
            </p>
          </div>
        </ScrollAnimation>

        {/* Category Filter - Faster Transitions */}
        <ScrollAnimation delay={0.15}>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white border-transparent shadow-lg shadow-orange-500/20'
                    : 'bg-white/5 text-gray-500 border-white/5 hover:border-orange-500/30'
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.03 }} // Significantly reduced delay
              >
                <GlassCard className={`h-full flex flex-col overflow-hidden group border-white/5 hover:border-primary/30 transition-all ${dish.isDeal ? 'ring-1 ring-primary/20' : ''}`}>
                  {/* Visual Header */}
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                    {dish.isDeal && (
                      <div className="absolute top-4 left-4 z-30 bg-primary text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-xl">
                        <Sparkles className="w-3 h-3 fill-white" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Special Deal</span>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
                    
                    <Image 
                      src={dish.image} 
                      alt={dish.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    <div className="absolute top-4 right-4 z-20 bg-zinc-950/80 backdrop-blur-md text-white px-4 py-2 rounded-2xl font-black text-sm border border-white/10">
                      £{dish.price}
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 flex-grow flex flex-col bg-zinc-950/40">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-black italic uppercase text-white group-hover:text-primary transition-colors">
                        {dish.name}
                      </h3>
                      <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-400 font-bold uppercase tracking-widest border border-white/5">
                        🌶️ {dish.spiceLevel}
                      </span>
                    </div>
                    
                    <p className="text-gray-500 text-xs font-medium mb-6 line-clamp-2 uppercase tracking-wide leading-relaxed">
                      {dish.description}
                    </p>

                    {/* Culture Note - Reordered for High-End Look */}
                    <div className="mt-auto">
                      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-1 h-3 bg-primary rounded-full" />
                          <span className="text-white text-[10px] font-black uppercase tracking-widest">{dish.origin}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 font-medium italic leading-relaxed">
                          "{dish.culturalContext}"
                        </p>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex gap-3">
                        <button 
                          className="flex-1 h-12 rounded-full border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                          onClick={() => window.location.href = `/menu/${dish.id}`}
                        >
                          <Info className="w-3 h-3" /> Details
                        </button>
                        <button 
                          className="flex-1 h-12 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
                          onClick={() => {
                            addItem({
                                id: typeof dish.id === 'string' ? dish.id : dish.id.toString(),
                                name: dish.name,
                                price: parseFloat(dish.price),
                                image: dish.image,
                                quantity: 1
                            });
                          }}
                        >
                          <ShoppingCart className="w-3 h-3" /> Add
                        </button>
                      </div>
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
