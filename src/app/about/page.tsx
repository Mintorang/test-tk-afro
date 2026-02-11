'use client';

import { motion } from 'framer-motion';
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { GlassCard } from "@/components/ui/GlassCard";
import VirtualExperienceTour from '@/components/ui/VirtualExperienceTour';
import { 
  Heart, 
  Star, 
  Award, 
  Users, 
  Clock, 
  MapPin,
  Mail
} from "lucide-react";
import Link from "next/link";
import { SEOHead } from "@/components/ui/SEOHead";

export default function AboutPage() {
  return (
    <>
      <SEOHead 
        title="About Us | TK Afro Kitchen | Authentic African Cuisine Story"
        description="TK Afro Kitchen brings authentic African flavors to UK homes. 5-star hygiene certified, family recipes, fresh ingredients. Learn our story and commitment to quality African cuisine."
        keywords="TK Afro Kitchen story, African restaurant Milton Keynes, Nigerian food history, authentic African cuisine, family recipes, 5-star hygiene"
        canonical="https://tkafrokitchen.com/about"
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-16 sm:pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 md:py-20 px-4">
          <div className="container mx-auto text-center">
            <ScrollAnimation>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
              >
                <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
                  Our Story
                </span>
              </motion.h1>
            </ScrollAnimation>
            
            <ScrollAnimation delay={0.2}>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-2"
              >
                Every great dish begins with a story of passion, tradition, and love. Discover the journey that brought TK Afro Kitchen to life.
              </motion.p>
            </ScrollAnimation>
          </div>
        </section>

        {/* Main Content */}
        <section className="px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
              {/* Story Content */}
              <ScrollAnimation>
                <GlassCard className="p-6 sm:p-8">
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">The Heart Behind TK Afro Kitchen</h2>
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6">
                      Born and raised in the vibrant culinary landscape of Nigeria, our founder discovered her passion for cooking at her grandmother's side. 
                      Every morning, she would watch in awe as her grandmother transformed simple ingredients into extraordinary dishes that brought families together.
                    </p>
                    
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6">
                      After moving to London, she realized that the authentic flavors of home were missing from the local food scene. 
                      What started as cooking for friends and family quickly grew into a mission to share the rich, diverse tastes of Nigerian cuisine with the world.
                    </p>
                    
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-6">
                      Today, TK Afro Kitchen stands as a testament to that vision. Every dish we create is infused with the same love, 
                      attention to detail, and respect for tradition that she learned from her grandmother. We're not just serving food; 
                      we're sharing culture, creating memories, and building community through the universal language of great cuisine.
                    </p>
                  </div>
                </GlassCard>
              </ScrollAnimation>

              {/* Values Grid */}
              <ScrollAnimation delay={0.2}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <GlassCard className="p-4 sm:p-6 text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Star className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Authentic Recipes</h3>
                    <p className="text-xs sm:text-sm text-gray-400">Handed down through generations, preserving the true flavors of Nigeria</p>
                  </GlassCard>
                  
                  <GlassCard className="p-4 sm:p-6 text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Award className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Quality Ingredients</h3>
                    <p className="text-xs sm:text-sm text-gray-400">Sourced with care and attention to ensure the best possible taste</p>
                  </GlassCard>
                  
                  <GlassCard className="p-4 sm:p-6 text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Made with Love</h3>
                    <p className="text-xs sm:text-sm text-gray-400">Every dish tells a story and is crafted with passion and care</p>
                  </GlassCard>
                  
                  <GlassCard className="p-4 sm:p-6 text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Community Focus</h3>
                    <p className="text-xs sm:text-sm text-gray-400">Building connections through the universal language of great food</p>
                  </GlassCard>
                </div>
              </ScrollAnimation>
            </div>
            
            {/* Contact Information */}
            <ScrollAnimation>
              <GlassCard className="p-6 sm:p-8">
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Get in Touch</h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-300">Ready to experience the magic? We'd love to hear from you!</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Email Us</h3>
                    <p className="text-sm sm:text-base text-gray-300">chef@tkafrokitchen.com</p>
                    <p className="text-xs sm:text-sm text-gray-400">We respond within 2 hours</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Opening Hours</h3>
                    <p className="text-sm sm:text-base text-gray-300">Wednesday - Saturday</p>
                    <p className="text-xs sm:text-sm text-gray-400">9:00 AM - 7:00 PM</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Location</h3>
                    <p className="text-sm sm:text-base text-gray-300">Milton Keynes, UK</p>
                    <p className="text-xs sm:text-sm text-gray-400">Delivery & Collection</p>
                  </div>
                </div>
                
                <div className="text-center mt-6 sm:mt-8">
                  <Link href="/contact">
                    <AnimatedButton 
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-base sm:text-lg"
                    >
                      Contact Us Today
                    </AnimatedButton>
                  </Link>
                </div>
              </GlassCard>
            </ScrollAnimation>
          </div>
        </section>
      </div>
    </>
  );

} 
