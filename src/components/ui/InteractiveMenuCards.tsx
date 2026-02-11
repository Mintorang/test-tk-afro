'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card } from './card';
import { Button } from './button';
import { Badge } from './badge';
import { 
  ChefHat, 
  Star, 
  Clock, 
  Users, 
  Heart,
  ShoppingCart,
  ArrowRight,
  Info
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  prepTime: string;
  serves: string;
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
  features: string[];
}

const menuItems: MenuItem[] = [
  {
    id: "jollof-rice",
    name: "Jollof Rice",
    category: "Rice Dishes",
    description: "Authentic Nigerian Jollof rice cooked with tomatoes, peppers, and aromatic spices.",
    image: "/images/dishes/jolofrice.png",
    price: 30,
    rating: 4.8,
    prepTime: "25 min",
    serves: "4-6 people",
    popular: true,
    spicy: true,
    features: ["Traditional Recipe", "Rich Aroma", "Perfect Spice Blend"]
  },
  {
    id: "peppered-beef",
    name: "Peppered Beef & Chicken",
    category: "Protein Dishes",
    description: "Succulent beef and chicken cooked in a spicy pepper sauce with onions.",
    image: "/images/dishes/pepperedgoatmeat.jpeg",
    price: 60,
    rating: 4.9,
    prepTime: "30 min",
    serves: "4-6 people",
    popular: true,
    spicy: true,
    features: ["Premium Cuts", "Spicy Sauce", "Tender Meat"]
  },
  {
    id: "efo-riro",
    name: "Efo Riro",
    category: "Soups & Stews",
    description: "Traditional spinach stew served with fried yam, fried plantain, and sauce.",
    image: "/images/dishes/efo-riro.png",
    price: 60,
    rating: 4.7,
    prepTime: "20 min",
    serves: "4-6 people",
    features: ["Fresh Spinach", "Rich Broth", "Traditional Recipe"]
  },
  {
    id: "egusi-soup",
    name: "Egusi Soup",
    category: "Soups & Stews",
    description: "Ground melon seed soup with assorted meat and vegetables.",
    image: "/images/dishes/egusi_soup.jpg",
    price: 70,
    rating: 4.6,
    prepTime: "35 min",
    serves: "4-6 people",
    features: ["Ground Melon Seeds", "Assorted Meat", "Rich Flavor"]
  }
];

const InteractiveMenuCards = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-orange-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Interactive Menu Experience
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore our authentic Nigerian dishes with interactive 3D cards. 
            Hover to discover ingredients, preparation details, and customer ratings.
          </p>
        </motion.div>

        {/* Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredItem(item.id)}
              onHoverEnd={() => setHoveredItem(null)}
              className="group"
            >
              <Card className="relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full">
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {item.popular && (
                      <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-0">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                    {item.spicy && (
                      <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
                        🔥 Spicy
                      </Badge>
                    )}
                    {item.vegetarian && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                        🌱 Vegetarian
                      </Badge>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm font-semibold text-slate-900">
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category */}
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700 border-orange-200">
                      {item.category}
                    </Badge>
                    <div className="text-2xl font-bold text-slate-900">
                      £{item.price}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Details */}
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {item.prepTime}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {item.serves}
                    </div>
                  </div>

                  {/* Features (Visible on hover) */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: hoveredItem === item.id ? 1 : 0,
                      height: hoveredItem === item.id ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-slate-200 pt-4 mb-4">
                      <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center">
                        <Info className="w-4 h-4 mr-1" />
                        Features
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {item.features.map((feature, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs bg-slate-50 border-slate-200 text-slate-700"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                      asChild
                    >
                      <Link href="/menu">
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add to Cart
                      </Link>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white"
                      asChild
                    >
                      <Link href="/menu">
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-orange-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="p-8 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-orange-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Explore Our Full Menu
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Discover more authentic Nigerian dishes, from traditional soups to modern fusion creations. 
              Each dish is crafted with love and authentic recipes passed down through generations.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
              asChild
            >
              <Link href="/menu">View Complete Menu</Link>
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveMenuCards; 
