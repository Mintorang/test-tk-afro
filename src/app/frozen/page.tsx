'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollAnimation } from '@/components/ui/ScrollAnimation';
import { frozenCategories, frozenItems, FrozenMenuItem } from '@/data/frozen-menu';
import { MobileCategoryFilter } from '@/components/menu/MobileCategoryFilter';
import { SEOHead } from '@/components/ui/SEOHead';
import { useCart } from '@/contexts/CartContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { ShoppingCart, Snowflake, Info } from 'lucide-react';

export default function FrozenPage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const menuItemsRef = useRef<HTMLElement>(null);

  const filteredItems = frozenItems.filter((item: FrozenMenuItem) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (window.innerWidth < 768 && menuItemsRef.current) {
      setTimeout(() => {
        menuItemsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50); // Snappier scroll delay
    }
  };

  const handleAddToCart = (item: FrozenMenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity: 1,
      selectedSize: { size: 'Standard', price: item.price, portionInfo: item.servings }
    });
  };

  const categoriesForFilter = frozenCategories.map(cat => ({
    id: cat.id,
    name: cat.name,
    description: cat.description || '',
    imageUrl: '/images/frozen/default-frozen.jpg'
  }));

  return (
    <>
      <SEOHead 
        title="Frozen African Meals | TK Afro Kitchen"
        description="Authentic Nigerian and Ghanaian dishes, ready-to-eat, UK delivery."
        canonical="https://tkafrokitchen.com/frozen"
      />
      
      <div className="min-h-screen bg-[#080808] pt-24">
        {/* Header Section - Snappy & High-End */}
        <section className="relative py-12 px-4 border-b border-white/5">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-4">
                <span className="text-white">The Frozen</span><br/>
                <span className="text-gradient">Range</span>
              </h1>
              <p className="text-gray-500 text-sm md:text-lg max-w-2xl mx-auto font-medium uppercase tracking-widest">
                Stock up on authentic flavors. Ready when you are.
              </p>
            </motion.div>

            {/* Desktop Category Filter */}
            <div className="hidden md:flex flex-wrap justify-center gap-3 mt-12">
              <button
                onClick={() => handleCategorySelect('all')}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  selectedCategory === 'all' ? 'bg-primary text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                🧊 All Frozen
              </button>
              {frozenCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.name)}
                  className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    selectedCategory === category.name ? 'bg-primary text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile Filter */}
        <div className="md:hidden">
          <MobileCategoryFilter
            categories={categoriesForFilter}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>

        {/* Items Grid */}
        <section ref={menuItemsRef} className="py-12 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode='popLayout'>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                >
                  <GlassCard className="h-full flex flex-col group border-white/5 hover:border-blue-500/20">
                    <div className="relative h-64 overflow-hidden">
                      <div className="absolute top-4 left-4 z-20 bg-blue-500/20 backdrop-blur-md border border-blue-500/30 text-blue-400 px-3 py-1 rounded-full flex items-center gap-2">
                        <Snowflake className="w-3 h-3" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Frozen</span>
                      </div>
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
                    </div>

                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-black italic uppercase text-white group-hover:text-primary transition-colors leading-tight">
                          {item.name}
                        </h3>
                        <span className="text-lg font-black text-primary">£{item.price}</span>
                      </div>

                      <p className="text-gray-500 text-xs font-bold uppercase tracking-wide leading-relaxed mb-6 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 mb-8">
                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                          <p className="text-[8px] text-gray-500 uppercase font-black tracking-widest mb-1">Portion</p>
                          <p className="text-[10px] text-white font-bold">{item.servings}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                          <p className="text-[8px] text-gray-500 uppercase font-black tracking-widest mb-1">Storage</p>
                          <p className="text-[10px] text-white font-bold">{item.storageInfo}</p>
                        </div>
                      </div>

                      <div className="mt-auto flex gap-3">
                        <button className="flex-1 button-glass !py-3 !px-0 flex items-center justify-center gap-2">
                          <Info className="w-3 h-3" /> Info
                        </button>
                        <button 
                          onClick={() => handleAddToCart(item)}
                          className="flex-1 button-primary !py-3 !px-0 flex items-center justify-center gap-2"
                        >
                          <ShoppingCart className="w-3 h-3" /> Add
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Minimalist CTA */}
        <section className="py-20 container mx-auto px-4">
          <div className="glass rounded-[2rem] p-12 text-center border-white/5">
             <h2 className="text-3xl font-black italic uppercase text-white mb-4">Need Fresh Food Instead?</h2>
             <button onClick={() => window.location.href='/menu'} className="button-primary">
               View Fresh Menu
             </button>
          </div>
        </section>
      </div>
    </>
  );
}
