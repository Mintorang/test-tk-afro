'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollAnimation } from '@/components/ui/ScrollAnimation';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { featuredDishes, categories, allMenuItems } from '@/data/sample-menu';
import { MobileCategoryFilter } from '@/components/menu/MobileCategoryFilter';
import { ResponsiveMenuGrid } from '@/components/menu/ResponsiveMenuGrid';
import { SEOHead } from '@/components/ui/SEOHead';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const menuItemsRef = useRef<HTMLElement>(null);

  // Filter items based on category and search
  const filteredItems = allMenuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Auto-scroll to menu items when category changes on mobile
  useEffect(() => {
    if (selectedCategory && menuItemsRef.current) {
      // Check if we're on mobile (you can adjust this breakpoint)
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        // Small delay to ensure the menu items have updated
        setTimeout(() => {
          if (menuItemsRef.current) {
            menuItemsRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 300);
      }
    }
  }, [selectedCategory]);

  // Enhanced category selection with scroll
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    
    // Immediate scroll to menu items on mobile
    if (window.innerWidth < 768 && menuItemsRef.current) {
      setTimeout(() => {
        if (menuItemsRef.current) {
          menuItemsRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  };

  return (
    <>
      <SEOHead 
        title="Our Menu | Authentic African Dishes | TK Afro Kitchen"
        description="Explore our authentic African menu featuring Nigerian Jollof Rice, Ghanaian Banku, and traditional West African dishes. Fresh ingredients, 5-star hygiene, UK delivery. Order online today!"
        keywords="African menu, Nigerian food, Ghanaian cuisine, Jollof rice, Banku, West African dishes, African restaurant menu, Milton Keynes"
        canonical="https://tkafrokitchen.com/menu"
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-16 sm:pt-24">
        {/* Hero Section - Mobile Optimized */}
        <section className="relative py-12 sm:py-16 md:py-20 px-4">
          <div className="container mx-auto text-center">
            <ScrollAnimation>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6"
              >
                <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
                  Our Menu
                </span>
              </motion.h1>
            </ScrollAnimation>
            
            <ScrollAnimation delay={0.2}>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-2 sm:px-4"
              >
                Discover the rich flavors of Nigeria and West Africa, each dish tells a story of tradition and heritage
              </motion.p>
            </ScrollAnimation>

            {/* Desktop Search Bar - Hidden on Mobile */}
            <ScrollAnimation delay={0.4}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-md mx-auto mb-6 sm:mb-8 md:mb-12 hidden md:block"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for dishes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-orange-500/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm sm:text-base"
                  />
                  <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                  </div>
                </div>
              </motion.div>
            </ScrollAnimation>

            {/* Desktop Category Filter - Hidden on Mobile */}
            <ScrollAnimation delay={0.6}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-12 hidden md:flex"
              >
                <motion.button
                  onClick={() => handleCategorySelect('all')}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full border transition-all duration-300 text-sm sm:text-base ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-orange-500'
                      : 'bg-transparent text-gray-300 border-gray-600 hover:border-orange-500 hover:text-orange-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🍽️ All Dishes
                </motion.button>
                
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.name)}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full border transition-all duration-300 text-sm sm:text-base ${
                      selectedCategory === category.name
                        ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-orange-500'
                        : 'bg-transparent text-gray-300 border-gray-600 hover:border-orange-500 hover:text-orange-400'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </motion.div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Mobile Category Filter - Only visible on mobile */}
        <div className="md:hidden">
          <MobileCategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>

        {/* Menu Items Section */}
        <section ref={menuItemsRef} className="py-6 sm:py-8 md:py-20">
          <div className="container mx-auto">
            <ResponsiveMenuGrid 
              items={filteredItems} 
              selectedCategory={selectedCategory}
            />
          </div>
        </section>

      </div>
    </>
  );
}
