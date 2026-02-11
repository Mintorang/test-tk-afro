'use client';

import { motion } from 'framer-motion';
import { ScrollAnimation } from '@/components/ui/ScrollAnimation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  Star, 
  Clock, 
  ChefHat, 
  Sparkles,
  Calculator,
  Info,
  ShoppingCart,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface PricingItem {
  id: string;
  name: string;
  category: string;
  sizes: {
    size: string;
    price: number;
    portionInfo: string;
    value?: string;
  }[];
  imageUrl?: string;
  description?: string;
  popular?: boolean;
  bestValue?: boolean;
}

const pricingData: PricingItem[] = [
  {
    id: "jollof-rice",
    name: "Jollof Rice",
    category: "Rice Dishes",
    sizes: [
      { size: "2L", price: 35, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 50, portionInfo: "4 Litres", value: "Serves 8-12 people" },
      { size: "Half Cooler", price: 90, portionInfo: "Half Cooler", value: "Perfect for events" }
    ],
    popular: true,
    bestValue: true
  },
  {
    id: "peppered-fried-rice",
    name: "Peppered Fried Rice",
    category: "Rice Dishes",
    sizes: [
      { size: "2L", price: 45, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 70, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "coconut-rice",
    name: "Coconut Rice",
    category: "Rice Dishes",
    sizes: [
      { size: "2L", price: 45, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 70, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "peppered-native-rice",
    name: "Native Rice",
    category: "Rice Dishes",
    sizes: [
      { size: "2L", price: 65, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 95, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "yam-porridge",
    name: "Yam Porridge (Asaro)",
    category: "Side Dishes",
    sizes: [
      { size: "2L", price: 60, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 90, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "peppered-beef-chicken",
    name: "Peppered Beef & Chicken",
    category: "Protein Dishes",
    sizes: [
      { size: "2L", price: 60, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 90, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ],
    popular: true
  },
  {
    id: "peppered-beef-only",
    name: "Peppered Beef Only",
    category: "Protein Dishes",
    sizes: [
      { size: "2L", price: 70, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 110, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "peppered-chicken-hard",
    name: "Peppered Chicken Hard",
    category: "Protein Dishes",
    sizes: [
      { size: "2L", price: 55, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 85, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "peppered-grilled-chicken",
    name: "Peppered Grilled Soft Chicken",
    category: "Protein Dishes",
    sizes: [
      { size: "2L", price: 55, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 85, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "peppered-fish",
    name: "Peppered Fish",
    category: "Protein Dishes",
    sizes: [
      { size: "2L", price: 65, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 95, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "peppered-turkey-wings",
    name: "Turkey Wings",
    category: "Protein Dishes",
    sizes: [
      { size: "2L", price: 65, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 95, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "peppered-goat",
    name: "Peppered Goat Meat",
    category: "Protein Dishes",
    sizes: [
      { size: "2L", price: 70, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 110, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "assorted-stew",
    name: "Assorted Stew",
    category: "Soups & Stews",
    sizes: [
      { size: "2L", price: 65, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 95, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "chicken-stew",
    name: "Chicken Stew",
    category: "Soups & Stews",
    sizes: [
      { size: "2L", price: 55, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 85, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "fish-stew",
    name: "Fish Stew",
    category: "Soups & Stews",
    sizes: [
      { size: "2L", price: 65, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 95, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "efo-riro",
    name: "Efo Riro",
    category: "Soups & Stews",
    sizes: [
      { size: "2L", price: 60, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 90, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "efo-riro-fish",
    name: "Efo Riro with Fish",
    category: "Soups & Stews",
    sizes: [
      { size: "2L", price: 65, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 95, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "egusi-soup",
    name: "Egusi Soup",
    category: "Soups & Stews",
    sizes: [
      { size: "2L", price: 70, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 110, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "okra-soup",
    name: "Assorted Okra Soup",
    category: "Soups & Stews",
    sizes: [
      { size: "2L", price: 60, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 90, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "seafood-okra",
    name: "Seafood Okra Soup",
    category: "Soups & Stews",
    sizes: [
      { size: "2L", price: 70, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 110, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "ayamase",
    name: "Ayamase Sauce",
    category: "Soups & Stews",
    sizes: [
      { size: "2L", price: 70, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 110, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "ofada-sauce",
    name: "Ofada Sauce",
    category: "Soups & Stews",
    sizes: [
      { size: "2L", price: 70, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 110, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "ogbono-soup",
    name: "Ogbono Soup",
    category: "Soups & Stews",
    sizes: [
      { size: "2L", price: 60, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 90, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "dodo-gizzards",
    name: "Dodo Gizzards",
    category: "Side Dishes",
    sizes: [
      { size: "2L", price: 60, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 90, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "assorted-pepper-soup",
    name: "Assorted Pepper Soup",
    category: "Side Dishes",
    sizes: [
      { size: "2L", price: 60, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 90, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "fish-pepper-soup",
    name: "Fish Pepper Soup",
    category: "Soups & Stews",
    sizes: [
      { size: "2L", price: 60, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 90, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "plantain",
    name: "Plantain",
    category: "Side Dishes",
    sizes: [
      { size: "2L", price: 40, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 70, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "ewa-agoyin",
    name: "Ewa Agoyin and Sauce",
    category: "Side Dishes",
    sizes: [
      { size: "2L", price: 60, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 90, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "beans-porridge",
    name: "Beans Porridge",
    category: "Side Dishes",
    sizes: [
      { size: "2L", price: 55, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 85, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  },
  {
    id: "beans-dodo",
    name: "Beans & Dodo",
    category: "Side Dishes",
    sizes: [
      { size: "2L", price: 50, portionInfo: "2 Litres", value: "Serves 4-6 people" },
      { size: "4L", price: 80, portionInfo: "4 Litres", value: "Serves 8-12 people" }
    ]
  }
];

const snackItems = [
  { name: "Meat Pies", price: 20, portionInfo: "Pack of 10" },
  { name: "Sausage Rolls", price: 20, portionInfo: "Pack of 10" },
  { name: "Chicken Pies", price: 20, portionInfo: "Pack of 10" },
  { name: "Fish Pies", price: 20, portionInfo: "Pack of 10" },
  { name: "Puff Puff", price: 40, portionInfo: "Tray" },
  { name: "Mix and Match", price: 50, portionInfo: "Tray" }
];

const platterItems = [
  { name: "Tilapia Fish Platter", price: 35, portionInfo: "Combo Platter" },
  { name: "Croker Fish Platter", price: 40, portionInfo: "Combo Platter" }
];

export function EnhancedPricingDisplay() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showValueCalculator, setShowValueCalculator] = useState(false);

  const categories = [
    { id: 'all', name: 'All Items', icon: '🍽️' },
    { id: 'Rice Dishes', name: 'Rice Dishes', icon: '🍚' },
    { id: 'Protein Dishes', name: 'Protein Dishes', icon: '🥩' },
    { id: 'Soups & Stews', name: 'Soups & Stews', icon: '🍲' },
    { id: 'Side Dishes', name: 'Side Dishes', icon: '🥘' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? pricingData 
    : pricingData.filter(item => item.category === selectedCategory);

  const calculateValue = (price: number, size: string) => {
    if (size === '2L') return price / 2;
    if (size === '4L') return price / 4;
    return price / 6; // For half cooler
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <ScrollAnimation>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Complete Price List
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Discover our authentic Nigerian cuisine with transparent pricing and generous portions
              </p>
            </motion.div>

            {/* Value Propositions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/20"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Best Value</h3>
                <p className="text-gray-300 text-sm">Larger portions offer better value per person</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Perfect for Groups</h3>
                <p className="text-gray-300 text-sm">Ideal for families, events, and gatherings</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Chef Quality</h3>
                <p className="text-gray-300 text-sm">Authentic recipes with premium ingredients</p>
              </motion.div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Category Filter */}
        <ScrollAnimation delay={0.3}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>
        </ScrollAnimation>

        {/* Value Calculator Toggle */}
        <ScrollAnimation delay={0.4}>
          <div className="text-center mb-8">
            <Button
              onClick={() => setShowValueCalculator(!showValueCalculator)}
              variant="outline"
              className="bg-white/10 border-orange-500/30 text-orange-400 hover:bg-orange-500/20"
            >
              <Calculator className="w-4 h-4 mr-2" />
              {showValueCalculator ? 'Hide' : 'Show'} Value Calculator
            </Button>
          </div>
        </ScrollAnimation>

        {/* Value Calculator */}
        {showValueCalculator && (
          <ScrollAnimation delay={0.5}>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-400" />
                Value Calculator
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-2">2 Litres</div>
                  <p className="text-gray-300 text-sm">Perfect for 4-6 people</p>
                  <p className="text-gray-400 text-xs mt-1">Great for small families</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-2">4 Litres</div>
                  <p className="text-gray-300 text-sm">Perfect for 8-12 people</p>
                  <p className="text-gray-400 text-xs mt-1">Best value per person</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-2">Half Cooler</div>
                  <p className="text-gray-300 text-sm">Perfect for events</p>
                  <p className="text-gray-400 text-xs mt-1">Catering size portions</p>
                </div>
              </div>
            </motion.div>
          </ScrollAnimation>
        )}

        {/* Main Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <ScrollAnimation key={item.id} delay={index * 0.1}>
              <Link href="/menu" className="block">
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                >
                  <Card className="relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-orange-500/50 transition-all duration-500">
                    {/* Popular Badge */}
                    {item.popular && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-0">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      </div>
                    )}

                    {/* Best Value Badge */}
                    {item.bestValue && (
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Best Value
                        </Badge>
                      </div>
                    )}

                    {/* Header */}
                    <div className="p-6 border-b border-gray-700/50">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-400">{item.category}</p>
                    </div>

                    {/* Pricing Options */}
                    <div className="p-6">
                      <div className="space-y-4">
                        {item.sizes.map((size, sizeIndex) => (
                          <motion.div
                            key={size.size}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + sizeIndex * 0.1 }}
                            className="relative"
                          >
                            <div className="flex justify-between items-center p-4 rounded-lg bg-gradient-to-r from-gray-700/30 to-gray-800/30 border border-gray-600/30 hover:border-orange-500/50 transition-all duration-300">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-white">{size.size}</span>
                                  {sizeIndex === 1 && (
                                    <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                                      Best Value
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-400">{size.portionInfo}</p>
                                {size.value && (
                                  <p className="text-xs text-gray-500 mt-1">{size.value}</p>
                                )}
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-orange-400">
                                  £{size.price}
                                </div>
                                <div className="text-xs text-gray-500">
                                  £{(size.price / (size.size === '2L' ? 2 : size.size === '4L' ? 4 : 6)).toFixed(1)}/person
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Add to Cart Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className="mt-6"
                      >
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold group-hover:scale-105 transition-transform duration-300">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Order Now
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              </Link>
            </ScrollAnimation>
          ))}
        </div>

        {/* Snacks Section */}
        <ScrollAnimation delay={0.8}>
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Snacks & Pastries
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {snackItems.map((item, index) => (
                <Link key={item.name} href="/menu" className="block">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="cursor-pointer group"
                  >
                    <Card className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 group-hover:scale-105">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">{item.name}</h3>
                          <p className="text-sm text-gray-400">{item.portionInfo}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-orange-400">£{item.price}</div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </ScrollAnimation>

        {/* Fish Platters Section */}
        <ScrollAnimation delay={1.0}>
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Fish Platters
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {platterItems.map((item, index) => (
                <Link key={item.name} href="/menu" className="block">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="cursor-pointer group"
                  >
                    <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 group-hover:scale-105">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">{item.name}</h3>
                          <p className="text-sm text-gray-400">{item.portionInfo}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-blue-400">£{item.price}</div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </ScrollAnimation>

        {/* Call to Action */}
        <ScrollAnimation delay={1.2}>
          <div className="text-center mt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/20"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Experience Authentic Nigerian Cuisine?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Order now and enjoy our delicious dishes with generous portions perfect for sharing with family and friends.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/menu">
                  <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold px-8 py-3 group">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Order Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
                <Button variant="outline" className="border-orange-500/30 text-orange-400 hover:bg-orange-500/20 px-8 py-3">
                  <Info className="w-5 h-5 mr-2" />
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
} 