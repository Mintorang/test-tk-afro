'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';
import { Category } from '@/data/sample-menu';

interface MobileCategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function MobileCategoryFilter({
  categories,
  selectedCategory,
  onCategorySelect,
  searchTerm,
  onSearchChange
}: MobileCategoryFilterProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Enhanced auto-scroll to selected category with better positioning
  useEffect(() => {
    if (selectedCategory && scrollContainerRef.current) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        const selectedElement = scrollContainerRef.current?.querySelector(
          `[data-category="${selectedCategory}"]`
        ) as HTMLElement;
        
        if (selectedElement && scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const elementRect = selectedElement.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          
          // Calculate the center position
          const elementCenter = elementRect.left + elementRect.width / 2;
          const containerCenter = containerRect.left + containerRect.width / 2;
          const scrollOffset = elementCenter - containerCenter;
          
          // Scroll to center the selected category
          container.scrollBy({
            left: scrollOffset,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [selectedCategory]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Enhanced category selection with immediate scroll
  const handleCategorySelect = (category: string) => {
    onCategorySelect(category);
    
    // Immediate scroll to ensure category is visible
    setTimeout(() => {
      const selectedElement = scrollContainerRef.current?.querySelector(
        `[data-category="${category}"]`
      ) as HTMLElement;
      
      if (selectedElement && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const elementRect = selectedElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Check if element is fully visible
        const isFullyVisible = 
          elementRect.left >= containerRect.left && 
          elementRect.right <= containerRect.right;
        
        if (!isFullyVisible) {
          // Calculate optimal scroll position to center the element
          const elementCenter = elementRect.left + elementRect.width / 2;
          const containerCenter = containerRect.left + containerRect.width / 2;
          const scrollOffset = elementCenter - containerCenter;
          
          container.scrollBy({
            left: scrollOffset,
            behavior: 'smooth'
          });
        }
      }
    }, 50);
  };

  return (
    <div className="sticky top-0 z-30 bg-black/95 backdrop-blur-md border-b border-orange-500/20">
      {/* Search Bar - Mobile Optimized */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 py-3 border-b border-orange-500/10"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-orange-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Navigation */}
      <div className="relative px-4 py-3">
        {/* Scroll Controls */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Categories</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Search className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Filter className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          {/* Left Scroll Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors border border-white/20"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Right Scroll Button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors border border-white/20"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Categories Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-3 overflow-x-auto scrollbar-hide px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* All Dishes Category */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
              data-category="all"
            >
              <button
                onClick={() => handleCategorySelect('all')}
                className={`relative w-32 h-20 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-br from-orange-500 to-yellow-500 border-orange-400 text-white shadow-lg'
                    : 'bg-white/10 border-white/20 text-gray-300 hover:border-orange-500/50 hover:text-orange-400'
                }`}
              >
                <div className="text-2xl mb-1">🍽️</div>
                <span className="text-xs font-medium">All Dishes</span>
                {selectedCategory === 'all' && (
                  <motion.div
                    layoutId="categoryIndicator"
                    className="absolute -bottom-1 w-6 h-1 bg-white rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            </motion.div>

            {/* Category Cards */}
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0"
                data-category={category.name}
              >
                <button
                  onClick={() => handleCategorySelect(category.name)}
                  className={`relative w-32 h-20 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center overflow-hidden ${
                    selectedCategory === category.name
                      ? 'bg-gradient-to-br from-orange-500 to-yellow-500 border-orange-400 text-white shadow-lg'
                      : 'bg-white/10 border-white/20 text-gray-300 hover:border-orange-500/50 hover:text-orange-400'
                  }`}
                >
                  {/* Category Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url(${category.imageUrl})` }}
                  />
                  
                  {/* Category Icon */}
                  <div className="relative z-10 text-2xl mb-1">
                    {getCategoryIcon(category.name)}
                  </div>
                  
                  {/* Category Name */}
                  <span className="relative z-10 text-xs font-medium text-center leading-tight">
                    {category.name}
                  </span>
                  
                  {/* Selection Indicator */}
                  {selectedCategory === category.name && (
                    <motion.div
                      layoutId="categoryIndicator"
                      className="absolute -bottom-1 w-6 h-1 bg-white rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Filter Pills - Show when filters are expanded */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 flex flex-wrap gap-2"
            >
              <button
                onClick={() => handleCategorySelect('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-orange-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.name)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === category.name
                      ? 'bg-orange-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Helper function to get category icons
function getCategoryIcon(categoryName: string): string {
  const iconMap: { [key: string]: string } = {
    'Rice Dishes': '🍚',
    'Soups & Stews': '🥘',
    'Protein Dishes': '🍖',
    'Vegetable Dishes': '🥬',
    'Snacks & Appetizers': '🥨',
    'Beverages': '🥤',
    'Desserts': '🍰',
    'Frozen Meals': '🧊',
    'Catering': '🎉',
    'Special Occasions': '🎊',
    'Traditional': '🏺',
    'Modern Fusion': '✨',
    'Spicy': '🌶️',
    'Mild': '😊',
    'Vegetarian': '🥗',
    'Vegan': '🌱',
    'Gluten-Free': '🌾',
    'Quick Meals': '⚡',
    'Family Size': '👨‍👩‍👧‍👦',
    'Party Packs': '🎈'
  };
  
  return iconMap[categoryName] || '🍽️';
} 