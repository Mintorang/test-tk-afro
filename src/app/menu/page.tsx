'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollAnimation } from '@/components/ui/ScrollAnimation';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { categories, allMenuItems } from '@/data/sample-menu';
import { MobileCategoryFilter } from '@/components/menu/MobileCategoryFilter';
import { ResponsiveMenuGrid } from '@/components/menu/ResponsiveMenuGrid';
import { SEOHead } from '@/components/ui/SEOHead';
import { Search, UtensilsCrossed, Filter, ArrowDown } from 'lucide-react';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const menuItemsRef = useRef<HTMLElement>(null);

  const filteredItems = allMenuItems.filter(item => {
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
      }, 100);
    }
  };

  return (
    <>
      <SEOHead 
        title="Our Menu | Authentic African Dishes | TK Afro Kitchen"
        description="Explore our authentic African menu featuring Nigerian Jollof Rice, Ghanaian Banku, and traditional West African dishes."
        canonical="https://tkafrokitchen.com/menu"
      />
      
      <div className="min-h-screen bg-background pt-32 sm:pt-40">
        {/* 1. HIGH-IMPACT HEADER */}
        <section className="px-4 mb-12 sm:mb-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl">
              <ScrollAnimation>
                <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.8] mb-6">
                  THE <span className="text-primary">MENU</span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl font-medium max-w-lg leading-relaxed">
                  Discover the rich flavors of Nigeria and West Africa, where every dish tells a story of tradition.
                </p>
              </ScrollAnimation>
            </div>

            {/* Stats Bento Block */}
            <div className="hidden md:flex gap-4">
               <div className="glass p-6 rounded-[2rem] text-center min-w-[120px]">
                  <p className="text-primary font-black text-2xl leading-none">5.0</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-2">Rating</p>
               </div>
               <div className="glass p-6 rounded-[2rem] text-center min-w-[120px]">
                  <UtensilsCrossed className="w-6 h-6 text-primary mx-auto" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-2">Authentic</p>
               </div>
            </div>
          </div>
        </section>

        {/* 2. SEARCH & FILTER BAR (STICKY) */}
        <div className="sticky top-24 z-40 bg-background/80 backdrop-blur-md border-y border-white/5 py-6 mb-12">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-6 items-center">
            
            {/* Search - Ultra Modern */}
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search flavours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 glass rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-bold uppercase tracking-widest"
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden md:flex flex-wrap gap-2">
              <button
                onClick={() => handleCategorySelect('all')}
                className={`px-6 py-3 rounded-full text-[10px] font-black tracking-widest uppercase transition-all
                  ${selectedCategory === 'all' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'glass text-gray-400 hover:text-white'}`}
              >
                All Dishes
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`px-6 py-3 rounded-full text-[10px] font-black tracking-widest uppercase transition-all
                    ${selectedCategory === cat.name ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'glass text-gray-400 hover:text-white'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. MOBILE FILTER COMPONENT */}
        <div className="md:hidden px-4 mb-8">
           <div className="flex items-center gap-2 mb-4 text-primary font-black uppercase text-xs tracking-widest">
              <Filter className="w-4 h-4" /> Filter by Category
           </div>
           <MobileCategoryFilter
             categories={categories}
             selectedCategory={selectedCategory}
             onCategorySelect={handleCategorySelect}
             searchTerm={searchTerm}
             onSearchChange={setSearchTerm}
           />
        </div>

        {/* 4. MAIN MENU GRID */}
        <section ref={menuItemsRef} className="pb-32 px-4">
          <div className="max-w-7xl mx-auto">
            {filteredItems.length > 0 ? (
              <ResponsiveMenuGrid 
                items={filteredItems} 
                selectedCategory={selectedCategory}
              />
            ) : (
              <div className="text-center py-40 glass rounded-[3rem]">
                 <Search className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                 <h3 className="text-xl font-black italic uppercase">No Dishes Found</h3>
                 <p className="text-gray-500 text-sm mt-2">Try searching for something else.</p>
              </div>
            )}
          </div>
        </section>

        {/* 5. FLOATING SCROLL INDICATOR (Subtle) */}
        <div className="fixed bottom-32 right-8 hidden lg:flex flex-col items-center gap-4">
           <span className="[writing-mode:vertical-lr] text-[10px] font-black uppercase tracking-[0.5em] text-gray-600">Scroll</span>
           <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
              <motion.div 
                animate={{ y: [0, 48] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 w-full h-4 bg-primary"
              />
           </div>
        </div>
      </div>
    </>
  );
}
