'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ScrollAnimation } from './ScrollAnimation';
import { AnimatedButton } from './AnimatedButton';

export function InteractiveMenuExperience() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Dishes', icon: '🍽️' },
    { id: 'main', name: 'Main Courses', icon: '🍖' },
    { id: 'sides', name: 'Side Dishes', icon: '🥬' },
    { id: 'drinks', name: 'Beverages', icon: '🥤' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' }
  ];

  const interactiveDishes = [
    {
      id: 1,
      name: "Jollof Rice",
      description: "Aromatic rice cooked in rich tomato sauce with traditional spices",
      price: "From £35",
      category: "main",
      image: "/images/dishes/Jollof.jpeg",
      origin: "West Africa",
      spiceLevel: "Medium",
      ingredients: ["Rice", "Tomatoes", "Bell Peppers", "Traditional Spices"],
      culturalContext: "Jollof Rice is a celebration dish, often served at weddings and special occasions across West Africa.",
      preparation: "Slow-cooked for hours to develop deep, complex flavors"
    },
    {
      id: 2,
      name: "Efo Riro",
      description: "Rich and nutritious Nigerian spinach stew",
      price: "From £60",
      category: "main",
      image: "/images/dishes/eforiro-with-assortedmeat.jpg",
      origin: "Nigeria",
      spiceLevel: "Mild",
      ingredients: ["Spinach", "Palm Oil", "Locust Beans", "Assorted Meat"],
      culturalContext: "A staple dish in Nigerian households, representing comfort and home.",
      preparation: "Spinach stew simmered with traditional spices and assorted meats"
    },
    {
      id: 3,
      name: "Peppered Beef and Chicken",
      description: "Perfectly seasoned combination of beef and chicken",
      price: "From £60",
      category: "main",
      image: "/images/dishes/chicken.png",
      origin: "Nigeria",
      spiceLevel: "Hot",
      ingredients: ["Beef", "Chicken", "Cayenne Pepper", "Traditional Spices"],
      culturalContext: "A popular protein dish, perfect for sharing with family and friends.",
      preparation: "Marinated beef and chicken cooked in rich pepper sauce"
    },
    {
      id: 4,
      name: "Meat Pies",
      description: "Nigerian style meat pies with flaky pastry",
      price: "£20",
      category: "desserts",
      image: "/images/updates/meatpie.png",
      origin: "West Africa",
      spiceLevel: "None",
      ingredients: ["Flour", "Minced Meat", "Onions", "Traditional Spices"],
      culturalContext: "A beloved snack across West Africa, often enjoyed with tea or coffee.",
      preparation: "Flaky pastry filled with seasoned minced meat"
    },
    {
      id: 5,
      name: "Egusi Soup",
      description: "Rich melon seed soup with assorted meat",
      price: "From £70",
      category: "drinks",
      image: "/images/dishes/egusi1.png",
      origin: "Nigeria",
      spiceLevel: "Mild",
      ingredients: ["Melon Seeds", "Spinach", "Palm Oil", "Assorted Meat"],
      culturalContext: "A traditional soup that's both nutritious and delicious.",
      preparation: "Ground melon seeds simmered with vegetables and meat"
    },
    {
      id: 6,
      name: "Peppered Fish",
      description: "Fresh fish in rich pepper sauce",
      price: "From £60",
      category: "sides",
      image: "/images/dishes/peppered_fish.jpg",
      origin: "Nigeria",
      spiceLevel: "Hot",
      ingredients: ["Fresh Fish", "Cayenne Pepper", "Onions", "Traditional Spices"],
      culturalContext: "A coastal Nigerian favorite, perfect for seafood lovers.",
      preparation: "Fresh fish cooked in aromatic pepper sauce"
    }
  ];

  const filteredDishes = selectedCategory === 'all' 
    ? interactiveDishes 
    : interactiveDishes.filter(dish => dish.category === selectedCategory);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto">
        {/* Section Header */}
        <ScrollAnimation>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Interactive Menu
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our dishes with cultural context, origins, and traditional preparation methods
            </p>
          </motion.div>
        </ScrollAnimation>

        {/* Category Filter */}
        <ScrollAnimation delay={0.2}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-orange-500'
                    : 'bg-transparent text-gray-300 border-gray-600 hover:border-orange-500 hover:text-orange-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </motion.div>
        </ScrollAnimation>

        {/* Interactive Dish Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDishes.map((dish, index) => (
            <ScrollAnimation key={dish.id} delay={index * 0.1}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative"
                whileHover={{ y: -10 }}
              >
                {/* 3D Card Effect */}
                <div className="relative bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-6 h-full transform transition-all duration-500 group-hover:rotate-y-2 group-hover:scale-105">
                  
                  {/* Dish Image */}
                  <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-500/20" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-300" />
                    <div className="absolute top-4 right-4 bg-orange-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-bold">
                      {dish.price}
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                      🌶️ {dish.spiceLevel}
                    </div>
                  </div>

                  {/* Dish Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{dish.name}</h3>
                      <p className="text-gray-300 text-sm">{dish.description}</p>
                    </div>

                    {/* Cultural Context */}
                    <div className="bg-black/20 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <span className="text-orange-400 mr-2">🏛️</span>
                        <span className="text-orange-400 font-medium text-sm">{dish.origin}</span>
                      </div>
                      <p className="text-gray-300 text-xs leading-relaxed">{dish.culturalContext}</p>
                    </div>

                    {/* Ingredients */}
                    <div>
                      <h4 className="text-white font-medium mb-2 text-sm">Key Ingredients:</h4>
                      <div className="flex flex-wrap gap-2">
                        {dish.ingredients.slice(0, 3).map((ingredient, idx) => (
                          <span key={idx} className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full">
                            {ingredient}
                          </span>
                        ))}
                        {dish.ingredients.length > 3 && (
                          <span className="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded-full">
                            +{dish.ingredients.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Preparation Method */}
                    <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-lg p-3">
                      <p className="text-gray-300 text-xs italic">"{dish.preparation}"</p>
                    </div>

                    {/* Action Button */}
                    <AnimatedButton 
                      size="sm" 
                      className="w-full"
                      onClick={() => window.location.href = '/menu'}
                    >
                      Add to Order
                    </AnimatedButton>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-yellow-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Call to Action */}
        <ScrollAnimation delay={0.8}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Experience the Full Menu</h3>
              <p className="text-gray-300 mb-6">
                Discover more authentic dishes and learn about their cultural significance
              </p>
              <AnimatedButton size="lg" onClick={() => window.location.href = '/menu'}>
                View Complete Menu
              </AnimatedButton>
            </div>
          </motion.div>
        </ScrollAnimation>
      </div>
    </section>
  );
} 