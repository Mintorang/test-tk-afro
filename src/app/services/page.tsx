'use client';

import { motion } from 'framer-motion';
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  Truck, 
  ChefHat, 
  Users, 
  Clock, 
  Star, 
  Award,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 px-4">
        <div className="container mx-auto text-center">
          <ScrollAnimation>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
                Our Services
              </span>
            </motion.h1>
          </ScrollAnimation>
          
          <ScrollAnimation delay={0.2}>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              From delivery to catering, we bring authentic Nigerian cuisine to your doorstep and events with professional service and exceptional quality.
            </motion.p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Delivery Service */}
            <ScrollAnimation>
              <GlassCard className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-orange-400">Delivery Service</h3>
                <p className="text-gray-300 mb-6">
                  Bringing authentic Nigerian flavors directly to your doorstep with our reliable and efficient delivery service.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-gray-300">Next-day delivery across UK mainland</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-gray-300">Temperature-controlled packaging</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-gray-300">Same-day delivery in Milton Keynes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-gray-300">Minimum order value: £70</span>
                  </li>
                </ul>
                <Link href="/menu">
                  <AnimatedButton className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 rounded-lg">
                    Order Now
                  </AnimatedButton>
                </Link>
              </GlassCard>
            </ScrollAnimation>

            {/* Catering Service */}
            <ScrollAnimation delay={0.1}>
              <GlassCard className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                  <ChefHat className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-orange-400">Catering Service</h3>
                <p className="text-gray-300 mb-6">
                  Transform your events into unforgettable celebrations with our professional catering services.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-gray-300">Professional event catering</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-gray-300">Customized menu options</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-gray-300">Full service setup and cleanup</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-gray-300">Corporate and private events</span>
                  </li>
                </ul>
                <Link href="/contact">
                  <AnimatedButton className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 rounded-lg">
                    Get Quote
                  </AnimatedButton>
                </Link>
              </GlassCard>
            </ScrollAnimation>

            {/* Frozen Meals */}
            <ScrollAnimation delay={0.2}>
              <GlassCard className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-orange-400">Frozen Meals</h3>
                <p className="text-gray-300 mb-6">
                  Stock up on authentic Nigerian flavors with our selection of frozen meals perfect for quick, delicious dinners.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-gray-300">Same authentic flavors</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-gray-300">3-month storage life</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-gray-300">Perfect for busy families</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-gray-300">Easy reheating instructions</span>
                  </li>
                </ul>
                <Link href="/frozen">
                  <AnimatedButton className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 rounded-lg">
                    View Frozen Menu
                  </AnimatedButton>
                </Link>
              </GlassCard>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 mt-16">
        <div className="container mx-auto">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">Why Choose TK Afro Kitchen?</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                We don't just serve food; we create experiences that bring people together through the universal language of great cuisine.
              </p>
            </div>
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ScrollAnimation delay={0.1}>
              <GlassCard className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-orange-400">5-Star Food Hygiene</h3>
                <p className="text-gray-300">Certified by Milton Keynes Council for maintaining the highest food safety standards</p>
              </GlassCard>
            </ScrollAnimation>
            
            <ScrollAnimation delay={0.2}>
              <GlassCard className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-orange-400">Authentic Recipes</h3>
                <p className="text-gray-300">Traditional Nigerian recipes passed down through generations</p>
              </GlassCard>
            </ScrollAnimation>
            
            <ScrollAnimation delay={0.3}>
              <GlassCard className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-orange-400">Community Focused</h3>
                <p className="text-gray-300">Bringing people together through great cuisine and shared experiences</p>
              </GlassCard>
            </ScrollAnimation>
            
            <ScrollAnimation delay={0.4}>
              <GlassCard className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-orange-400">UK-Wide Delivery</h3>
                <p className="text-gray-300">Reliable delivery service available across the United Kingdom</p>
              </GlassCard>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-4 mt-16">
        <div className="container mx-auto max-w-4xl">
          <ScrollAnimation>
            <GlassCard className="p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience Our Services?</h2>
              <p className="text-gray-300 mb-8">
                Whether you need delivery, catering, or frozen meals, we're here to bring authentic Nigerian cuisine to your table.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Email Us</h3>
                  <p className="text-gray-300">chef@tkafrokitchen.com</p>
                  <p className="text-sm text-gray-400">We respond within 2 hours</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Call Us</h3>
                  <p className="text-gray-300">Available during business hours</p>
                  <p className="text-sm text-gray-400">For urgent inquiries</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
                  <p className="text-gray-300">Milton Keynes, UK</p>
                  <p className="text-sm text-gray-400">Serving nationwide</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/menu">
                  <AnimatedButton className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold px-8 py-4 rounded-lg">
                    Order Now
                  </AnimatedButton>
                </Link>
                <Link href="/contact">
                  <AnimatedButton 
                    variant="outline"
                    className="border-orange-500/30 text-orange-400 hover:bg-orange-500/20 px-8 py-4 rounded-lg"
                  >
                    Get in Touch
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