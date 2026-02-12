'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { ScrollAnimation } from './ScrollAnimation';
import { ShoppingCart, Info, Sparkles, Instagram, Facebook, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { GlassCard } from './GlassCard';

export function InteractiveMenuExperience() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bannerVisible, setBannerVisible] = useState(true);
  const { addToCart } = useCart();

  const categories = [
    { id: 'all', name: 'All', icon: '🍽️' },
    { id: 'deals', name: 'Deals', icon: '🎁' },
    { id: 'main', name: 'Mains', icon: '🍖' },
    { id: 'sides', name: 'Sides', icon: '🥬' },
    { id: 'desserts', name: 'Snacks', icon: '🍰' }
  ];

  const interactiveDishes = [
    {
      id: 'small-treats-pkg',
      name: "Small Treats Package",
      description: "A curated selection of our best-selling finger foods and snacks. Perfect for sampling.",
      price: "25.00",
      category: "deals",
      image: "/images/updates/peperred-soft-chicken.jpeg",
      origin: "TK Afro Special",
      spiceLevel: "Variable",
      culturalContext: "Designed for the 'Small-Small' cravings.",
      isDeal: true
    },
    // ... add other dishes here
  ];

  const filteredDishes = selectedCategory === 'all' 
    ? interactiveDishes 
    : interactiveDishes.filter(dish => dish.category === selectedCategory);

  return (
    <section className="relative py-24 px-4 bg-[#080808]">
      {/* Social Integration Floating Bar */}
      <div className="absolute top-10 right-10 flex gap-4 z-20">
        <a href="https://instagram.com/tkafrokitchen" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-primary transition-colors">
          <Instagram className="w-5 h-5 text-white" />
        </a>
        <a href="https://facebook.com/tkafrokitchen" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-primary transition-colors">
          <Facebook className="w-5 h-5 text-white" />
        </a>
      </div>

      {/* Deletable Delivery Banner */}
      <AnimatePresence>
        {bannerVisible && (
          <motion.div 
            exit={{ height: 0, opacity: 0 }}
            className="mb-12 bg-primary/10 border border-primary/20 rounded-3xl p-4 flex items-center justify-between overflow-hidden"
          >
            <div className="flex items-center gap-3 ml-4">
              <Sparkles className="text-primary w-5 h-5" />
              <p className="text-white font-bold text-sm uppercase tracking-widest">Free Delivery on orders over £50!</p>
            </div>
            <button onClick={() => setBannerVisible(false)} className="p-2 hover:bg-white/10 rounded-full">
              <X className="w-4 h-4 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto">
        <ScrollAnimation delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-7xl font-black italic uppercase tracking-tighter mb-6">
              <span className="text-white">Taste the</span><br/>
              <span className="text-primary">Heritage</span>
            </h2>
          </div>
        </ScrollAnimation>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all border ${
                selectedCategory === cat.id ? 'bg-primary text-white border-transparent shadow-orange-500/20 shadow-xl' : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredDishes.map((dish) => (
              <motion.div
                layout
                key={dish.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <GlassCard className="h-full border-white/5 hover:border-white/20 transition-all rounded-[2.5rem] overflow-hidden">
                  <div className="relative h-72">
                    <Image src={dish.image} alt={dish.name} fill className="object-cover" />
                    <div className="absolute bottom-6 left-6 bg-white text-black px-4 py-2 rounded-2xl font-black">
                      £{dish.price}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-black italic uppercase text-white mb-2">{dish.name}</h3>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-2 uppercase tracking-tight">{dish.description}</p>
                    <button 
                      onClick={() => addToCart({
                        id: dish.id.toString(),
                        name: dish.name,
                        price: parseFloat(dish.price),
                        quantity: 1,
                        imageUrl: dish.image,
                        description: dish.description,
                        category: dish.category,
                        portionInfo: 'Standard',
                        selectedSize: { size: 'Standard', price: parseFloat(dish.price), portionInfo: '' }
                      })}
                      className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" /> Add to Order
                    </button>
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
