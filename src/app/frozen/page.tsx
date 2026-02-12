'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { frozenCategories, frozenItems, FrozenMenuItem } from '@/data/frozen-menu';
import { MobileCategoryFilter } from '@/components/menu/MobileCategoryFilter';
import { SEOHead } from '@/components/ui/SEOHead';
import { useCart } from '@/contexts/CartContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { ShoppingCart, Snowflake, Info, ChevronRight } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

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
      }, 50);
    }
  };

  // FIX: Satisfies the CartItem type requirements for Vercel
  const handleAddToCart = (item: FrozenMenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity: 1,
      description: item.description,
      category: 'Frozen',
      portionInfo: item.servings,
      selectedSize: { 
        size: 'Standard', 
        price: item.price, 
        portionInfo: item.servings 
      }
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
      
      <div className="min-h-screen bg-[#050505] pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative px-4 mb-16">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-6xl md:text-[10rem] font-black italic uppercase tracking-[ -0.05em] leading-[0.85] text-white mb-6">
                The Frozen <br/>
                <span className="text-primary drop-shadow-[0_0_30px_rgba(249,115,22,0.3)]">Range</span>
              </h1>
              <p className="text-gray-500 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] max-w-xl mx-auto">
                Authentic flavors preserved for your convenience.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <div className="sticky top-24 z-30 bg-[#050505]/80 backdrop-blur-md border-y border-white/5 py-4 mb-12">
          <div className="container mx-auto px-4">
            <div className="hidden md:flex justify-center gap-4">
              <button
                onClick={() => handleCategorySelect('all')}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  selectedCategory === 'all' ? 'bg-primary text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'text-gray-500 hover:text-white'
                }`}
              >
                All Items
              </button>
              {frozenCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.name)}
                  className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    selectedCategory === category.name ? 'bg-primary text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            <div className="md:hidden">
              <MobileCategoryFilter
                categories={categoriesForFilter}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
          </div>
        </div>

        {/* Grid */}
        <section ref={menuItemsRef} className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode='popLayout'>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <GlassCard className="h-full border-white/5 hover:border-primary/20 overflow-hidden flex flex-col group">
                    {/* Image Header */}
                    <div className="relative h-72 overflow-hidden">
                      <Image 
                        src={item.imageUrl} 
                        alt={item.name} 
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/20" />
                      
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-2">
                        <Snowflake size={12} className="text-blue-400" />
                        <span className="text-[9px] font-black uppercase text-white tracking-tighter">Frozen</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-black italic uppercase text-white leading-none tracking-tighter">
                          {item.name}
                        </h3>
                        <span className="text-xl font-black text-primary italic leading-none">£{item.price}</span>
                      </div>
                      
                      <p className="text-gray-500 text-[11px] font-bold uppercase tracking-tight mb-8 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Specs */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="border-l-2 border-primary/20 pl-3">
                          <p className="text-[8px] font-black uppercase text-gray-600 tracking-widest">Serves</p>
                          <p className="text-xs font-bold text-white uppercase italic">{item.servings}</p>
                        </div>
                        <div className="border-l-2 border-primary/20 pl-3">
                          <p className="text-[8px] font-black uppercase text-gray-600 tracking-widest">Storage</p>
                          <p className="text-xs font-bold text-white uppercase italic">{item.storageInfo}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-auto flex gap-3">
                        <AnimatedButton 
                          variant="glass" 
                          className="flex-1 !px-0"
                        >
                          <Info size={14} className="mr-2" /> Details
                        </AnimatedButton>
                        <AnimatedButton 
                          onClick={() => handleAddToCart(item)}
                          className="flex-[1.5] !px-0"
                        >
                          <ShoppingCart size={14} className="mr-2" /> Add to Box
                        </AnimatedButton>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Boutique CTA */}
        <section className="container mx-auto px-4 mt-32">
          <div className="relative py-20 px-8 rounded-[3rem] border border-white/5 overflow-hidden text-center">
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full translate-y-1/2" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black italic uppercase text-white mb-8 tracking-tighter">
                Want it <span className="text-primary underline decoration-white/20">Fresh?</span>
              </h2>
              <AnimatedButton 
                variant="outline" 
                size="lg"
                onClick={() => window.location.href = '/menu'}
              >
                Switch to Daily Menu <ChevronRight size={18} />
              </AnimatedButton>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
