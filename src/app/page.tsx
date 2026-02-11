'use client';

import { motion } from 'framer-motion';
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { EnhancedHero } from '@/components/ui/EnhancedHero';
import { 
  Heart, 
  Star, 
  Award, 
  Users, 
  Clock, 
  MapPin, 
  Mail,
  ChefHat,
  Truck
} from "lucide-react";
import Link from "next/link";

// Note: InteractiveMenuCards and BrandStorytelling are kept for the brand sections
import InteractiveMenuCards from '@/components/ui/InteractiveMenuCards';
import BrandStorytelling from '@/components/ui/BrandStorytelling';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <EnhancedHero />

      {/* Brand Visuals Section */}
      <section className="py-12">
        <InteractiveMenuCards />
      </section>

      {/* Main Story Section */}
      <section className="relative py-12 sm:py-16 px-4">
        <div className="container mx-auto text-center">
          <ScrollAnimation>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
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
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-2"
            >
              Every great dish begins with a story of passion, tradition, and love. Discover the journey that brought TK Afro Kitchen to life.
            </motion.p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Story & Values Content */}
      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
            {/* Story Content */}
            <ScrollAnimation>
              <GlassCard className="p-6 sm:p-8">
                <div className="text-center mb-6 sm:mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">The Heart Behind TK Afro Kitchen</h2>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-4">
                    Born and raised in the vibrant culinary landscape of Nigeria, our founder discovered her passion for cooking at her grandmother's side.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-4">
                    After moving to London, she realized that the authentic flavors of home were missing from the local food scene. What started as cooking for friends and family quickly grew into a mission to share the rich tastes of Nigerian cuisine with the world.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                    Today, TK Afro Kitchen stands as a testament to that vision. We're not just serving food; we're sharing culture and building community through the universal language of great cuisine.
                  </p>
                </div>
              </GlassCard>
            </ScrollAnimation>

            {/* Values Grid */}
            <ScrollAnimation delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Star, title: "Authentic Recipes", desc: "Handed down through generations." },
                  { icon: Award, title: "Quality Ingredients", desc: "Sourced with care for the best taste." },
                  { icon: Heart, title: "Made with Love", desc: "Every dish tells a story of passion." },
                  { icon: Users, title: "Community Focus", desc: "Building connections through food." }
                ].map((value, index) => (
                  <GlassCard key={index} className="p-4 sm:p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{value.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-400">{value.desc}</p>
                  </GlassCard>
                ))}
              </div>
            </ScrollAnimation>
          </div>

          {/* Evolution Timeline Section */}
          <BrandStorytelling />

          {/* Contact Information Bar */}
          <ScrollAnimation>
            <GlassCard className="p-6 sm:p-8 mt-16">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-white">Email Us</h3>
                  <p className="text-sm text-gray-300">chef@tkafrokitchen.com</p>
                </div>

                <div className="text-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-white">Opening Hours</h3>
                  <p className="text-sm text-gray-300">Mon - Sun: 9AM - 10PM</p>
                </div>

                <div className="text-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-white">Location</h3>
                  <p className="text-sm text-gray-300">Milton Keynes, UK</p>
                </div>
              </div>

              <div className="text-center mt-8">
                <Link href="/contact">
                  <AnimatedButton className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold py-3 px-8 rounded-xl">
                    Contact Us Today
                  </AnimatedButton>
                </Link>
              </div>
            </GlassCard>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
}
