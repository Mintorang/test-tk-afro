'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollAnimation } from '@/components/ui/ScrollAnimation';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { frozenCategories, frozenItems, FrozenMenuItem } from '@/data/frozen-menu';
import { MobileCategoryFilter } from '@/components/menu/MobileCategoryFilter';
import { SEOHead } from '@/components/ui/SEOHead';
import { useCart } from '@/contexts/CartContext';

export default function FrozenPage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const menuItemsRef = useRef<HTMLElement>(null);

  // Filter items based on category and search
  const filteredItems = frozenItems.filter((item: FrozenMenuItem) => {
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

  // Handle adding frozen item to cart
  const handleAddToCart = (item: FrozenMenuItem) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      imageUrl: item.imageUrl,
      category: item.category,
      price: item.price,
      quantity: 1,
      portionInfo: item.servings,
      selectedSize: {
        size: 'Standard',
        price: item.price,
        portionInfo: item.servings
      }
    };
    
    addToCart(cartItem);
  };

  // Convert frozen categories to match the Category interface for MobileCategoryFilter
  const categoriesForFilter = frozenCategories.map(cat => ({
    id: cat.id,
    name: cat.name,
    description: cat.description || '',
    imageUrl: '/images/frozen/default-frozen.jpg' // Default image for frozen categories
  }));

  return (
    <>
      <SEOHead 
        title="Frozen African Meals | TK Afro Kitchen | Ready-to-Eat Nigerian Food"
        description="Order frozen African meals from TK Afro Kitchen. Authentic Nigerian and Ghanaian dishes, ready-to-eat, UK delivery. Perfect for quick meals with authentic taste."
        keywords="frozen African food, ready-to-eat Nigerian meals, frozen Ghanaian food, African meal prep, Milton Keynes delivery"
        canonical="https://tkafrokitchen.com/frozen"
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
                  Frozen Meals
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
                Stock up on authentic Nigerian flavors with our frozen meals. Perfect for quick, delicious dinners that maintain the same authentic taste.
              </motion.p>
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
                  🧊 All Frozen
                </motion.button>
                
                {frozenCategories.map((category) => (
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
            categories={categoriesForFilter}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>

        {/* Menu Items Section */}
        <section ref={menuItemsRef} className="py-6 sm:py-8 md:py-20">
          <div className="container mx-auto px-4">
            {filteredItems.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🧊</div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">No frozen items found</h3>
                <p className="text-sm sm:text-base text-gray-400">Try adjusting your search or category filter</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl border border-orange-500/20 overflow-hidden hover:border-orange-500/40 transition-all duration-300"
                  >
                    {/* Item Image */}
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                    
                    {/* Item Details */}
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{item.name}</h3>
                      <p className="text-sm text-gray-300 mb-3 sm:mb-4 line-clamp-3">{item.description}</p>
                      
                      {/* Item Info */}
                      <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                          <span>🍽️</span>
                          <span>{item.servings}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                          <span>🧊</span>
                          <span>{item.storageInfo}</span>
                        </div>
                      </div>
                      
                      {/* Price and Order Button */}
                      <div className="flex items-center justify-between">
                        <div className="text-xl sm:text-2xl font-bold text-orange-400">£{item.price}</div>
                        <AnimatedButton
                          onClick={() => handleAddToCart(item)}
                          className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm"
                        >
                          Order Now
                        </AnimatedButton>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-8 sm:py-12 md:py-20 px-4">
          <div className="container mx-auto">
            <ScrollAnimation>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gradient">Why Choose Our Frozen Meals?</h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-2">
                  Same authentic flavors, convenient storage, and perfect for busy lifestyles
                </p>
              </div>
            </ScrollAnimation>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <ScrollAnimation delay={0.1}>
                <div className="text-center p-4 sm:p-6 bg-white/5 rounded-xl border border-orange-500/20">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-lg sm:text-xl">
                    🧊
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-orange-400">3-Month Storage</h3>
                  <p className="text-xs sm:text-sm text-gray-300">Store for up to 3 months without losing flavor or quality</p>
                </div>
              </ScrollAnimation>
              
              <ScrollAnimation delay={0.2}>
                <div className="text-center p-4 sm:p-6 bg-white/5 rounded-xl border border-orange-500/20">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-lg sm:text-xl">
                    ⚡
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-orange-400">Quick & Easy</h3>
                  <p className="text-xs sm:text-sm text-gray-300">Ready in minutes with simple reheating instructions</p>
                </div>
              </ScrollAnimation>
              
              <ScrollAnimation delay={0.3}>
                <div className="text-center p-4 sm:p-6 bg-white/5 rounded-xl border border-orange-500/20">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-lg sm:text-xl">
                    🍽️
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-orange-400">Same Authentic Taste</h3>
                  <p className="text-xs sm:text-sm text-gray-300">Preserves all the authentic flavors and traditional recipes</p>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-8 sm:py-12 md:py-20 px-4">
          <div className="container mx-auto">
            <ScrollAnimation>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-sm border border-orange-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">Ready to Stock Up?</h3>
                  <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
                    Order your favorite frozen meals and enjoy authentic Nigerian cuisine anytime
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <AnimatedButton
                      onClick={() => window.location.href = '/menu'}
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full text-sm sm:text-base"
                    >
                      View Full Menu
                    </AnimatedButton>
                    <AnimatedButton
                      onClick={() => window.location.href = '/contact'}
                      variant="outline"
                      className="border-orange-500/30 text-orange-400 hover:bg-orange-500/20 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full text-sm sm:text-base"
                    >
                      Contact Us
                    </AnimatedButton>
                  </div>
                </div>
              </motion.div>
            </ScrollAnimation>
          </div>
        </section>
      </div>
    </>
  );
} 