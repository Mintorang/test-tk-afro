'use client';

import { motion } from 'framer-motion';
import { ScrollAnimation } from './ScrollAnimation';

export function CulturalStorytelling() {
  const timelineData = [
    {
      year: "1980s",
      title: "Family Roots",
      description: "Our journey began in Nigeria, where traditional recipes were passed down through generations",
      icon: "🏠"
    },
    {
      year: "2000s",
      title: "Milton Keynes Calling",
      description: "Brought authentic flavors to Milton Keynes, sharing our heritage with the community",
      icon: "🇬🇧"
    },
    {
      year: "2010s",
      title: "Kitchen Dreams",
      description: "Established TK Afro Kitchen, combining tradition with modern culinary techniques",
      icon: "👨‍🍳"
    },
    {
      year: "Today",
      title: "Cultural Bridge",
      description: "Serving authentic African cuisine while building bridges between cultures",
      icon: "🌍"
    }
  ];

  const heritageHighlights = [
    {
      title: "Traditional Spices",
      description: "Authentic Nigerian spices imported directly from West Africa",
      image: "/images/spices.jpg",
      icon: "🌶️"
    },
    {
      title: "Family Recipes",
      description: "Secret recipes passed down through generations of our family",
      image: "/images/recipes.jpg",
      icon: "📜"
    },
    {
      title: "Cultural Heritage",
      description: "Every dish tells a story of our rich African heritage and traditions",
      image: "/images/heritage.jpg",
      icon: "🏛️"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
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
                Our Story
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A journey of passion, tradition, and the love for authentic African cuisine
            </p>
          </motion.div>
        </ScrollAnimation>

        {/* Animated Timeline */}
        <div className="mb-20">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-yellow-500" />
            
            {timelineData.map((item, index) => (
              <ScrollAnimation key={index} delay={index * 0.2}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`flex items-center mb-12 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Timeline content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6">
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                      <div className="text-orange-400 font-bold mt-2">{item.year}</div>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="relative z-10">
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full border-4 border-gray-900" />
                  </div>

                  {/* Empty space for alignment */}
                  <div className="w-1/2" />
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        {/* Heritage Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {heritageHighlights.map((item, index) => (
            <ScrollAnimation key={index} delay={index * 0.2}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative overflow-hidden rounded-xl"
              >
                {/* Background image */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-500/20" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
                
                {/* Content */}
                <div className="relative z-10 p-8 text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>

                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.05 }}
                />
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Cultural Values */}
        <ScrollAnimation delay={0.8}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Our Cultural Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🤝</div>
                  <p className="text-gray-300 font-medium">Community</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🌟</div>
                  <p className="text-gray-300 font-medium">Excellence</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🏛️</div>
                  <p className="text-gray-300 font-medium">Heritage</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">❤️</div>
                  <p className="text-gray-300 font-medium">Passion</p>
                </div>
              </div>
            </div>
          </motion.div>
        </ScrollAnimation>
      </div>
    </section>
  );
} 