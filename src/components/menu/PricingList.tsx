'use client';

import { motion } from 'framer-motion';
import { ScrollAnimation } from '@/components/ui/ScrollAnimation';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

export function PricingList() {
  const pricingItems = [
    {
      title: "Small Portion",
      price: "£8.99",
      description: "Perfect for one person or as a side dish",
      features: ["Single serving", "Great for lunch", "Quick meal option"]
    },
    {
      title: "Medium Portion",
      price: "£12.99",
      description: "Ideal for two people or a hearty meal",
      features: ["Feeds 2 people", "Most popular choice", "Great value"]
    },
    {
      title: "Large Portion",
      price: "£16.99",
      description: "Perfect for families or sharing",
      features: ["Feeds 3-4 people", "Family size", "Best value for groups"]
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4">
      <div className="container mx-auto">
        <ScrollAnimation>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
                Portion Sizes & Pricing
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-2">
              Choose the perfect portion size for your needs. All our dishes are available in three convenient sizes.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pricingItems.map((item, index) => (
            <ScrollAnimation key={index} delay={index * 0.1}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4 sm:p-6 hover:border-orange-500/40 transition-all duration-300"
              >
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <div className="text-2xl sm:text-3xl font-bold text-orange-400 mb-3 sm:mb-4">{item.price}</div>
                  <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">{item.description}</p>
                  
                  <ul className="space-y-2 mb-6 sm:mb-8">
                    {item.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-xs sm:text-sm text-gray-400 flex items-center justify-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <AnimatedButton
                    onClick={() => window.location.href = '/menu'}
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-2 sm:py-3 rounded-lg text-sm sm:text-base"
                  >
                    Order Now
                  </AnimatedButton>
                </div>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
} 