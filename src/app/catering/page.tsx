'use client';

import { QuoteFormModal } from "@/components/forms/quote-form-modal";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { motion } from 'framer-motion';
import { 
  ChefHat, 
  Users, 
  Star, 
  Heart, 
  Award, 
  Clock, 
  MapPin, 
  Phone,
  Instagram,
  Facebook
} from "lucide-react";
import Link from "next/link";

export default function CateringPage() {
  return (
    <div className="min-h-screen bg-[#1e1e1e]">
      <main className="pb-16 pt-32">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-yellow-500/5 to-transparent" />
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-br from-orange-600/20 via-yellow-500/10 to-orange-400/5" />
          </div>
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <ScrollAnimation>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-6"
                >
                  <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ChefHat className="w-12 h-12 text-white" />
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent 
                               bg-gradient-to-r from-orange-400 to-yellow-400 
                               leading-tight md:leading-tight">
                    Premium Catering Services
                  </h1>
                </motion.div>
              </ScrollAnimation>
              <ScrollAnimation delay={0.2}>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto 
                            leading-relaxed"
                >
                  Transform your events into unforgettable celebrations with authentic Nigerian cuisine. 
                  Every dish tells a story of tradition, every flavor brings people together.
                </motion.p>
              </ScrollAnimation>
              <ScrollAnimation delay={0.4}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <QuoteFormModal 
                    trigger={
                      <AnimatedButton 
                        className="button-primary text-lg px-8 py-4" 
                        size="lg"
                      >
                        Start Your Catering Journey
                      </AnimatedButton>
                    }
                  />
                  <Link href="/contact">
                    <AnimatedButton 
                      variant="outline"
                      className="border-orange-500/30 text-orange-400 hover:bg-orange-500/20 px-8 py-4 text-lg"
                    >
                      Learn Our Story
                    </AnimatedButton>
                  </Link>
                </motion.div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <ScrollAnimation>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">Why Choose TK Afro Kitchen?</h2>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                  We don't just serve food; we create experiences that bring people together through the universal language of great cuisine.
                </p>
              </div>
            </ScrollAnimation>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ScrollAnimation delay={0.1}>
                <GlassCard className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-orange-400">Made with Love</h3>
                  <p className="text-slate-300">Every dish is crafted with the same passion and care that our founder learned from her grandmother's kitchen.</p>
                </GlassCard>
              </ScrollAnimation>

              <ScrollAnimation delay={0.2}>
                <GlassCard className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-orange-400">Authentic Recipes</h3>
                  <p className="text-slate-300">Traditional Nigerian recipes passed down through generations, ensuring every bite is a taste of home.</p>
                </GlassCard>
              </ScrollAnimation>

              <ScrollAnimation delay={0.3}>
                <GlassCard className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-orange-400">Quality Assured</h3>
                  <p className="text-slate-300">Certified food safety standards, premium ingredients, and professional service you can trust.</p>
                </GlassCard>
              </ScrollAnimation>

              <ScrollAnimation delay={0.4}>
                <GlassCard className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-orange-400">Personal Touch</h3>
                  <p className="text-slate-300">Customized menus, dietary accommodations, and personalized service for your unique event.</p>
                </GlassCard>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <ScrollAnimation>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">Our Catering Services</h2>
            </ScrollAnimation>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ScrollAnimation delay={0.1}>
                <GlassCard className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-orange-400">Corporate Events</h3>
                  <p className="text-slate-300 mb-4">Elevate your business meetings, conferences, and corporate functions with professional catering that impresses clients and motivates teams.</p>
                  <ul className="text-slate-300 space-y-2 text-sm">
                    <li>• Business lunches & dinners</li>
                    <li>• Conference catering</li>
                    <li>• Team building events</li>
                    <li>• Client entertainment</li>
                  </ul>
                </GlassCard>
              </ScrollAnimation>

              <ScrollAnimation delay={0.2}>
                <GlassCard className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-orange-400">Private Parties</h3>
                  <p className="text-slate-300 mb-4">Create unforgettable memories with personalized menus for birthdays, anniversaries, and family gatherings that bring everyone together.</p>
                  <ul className="text-slate-300 space-y-2 text-sm">
                    <li>• Birthday celebrations</li>
                    <li>• Anniversary parties</li>
                    <li>• Family reunions</li>
                    <li>• Holiday gatherings</li>
                  </ul>
                </GlassCard>
              </ScrollAnimation>

              <ScrollAnimation delay={0.3}>
                <GlassCard className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-orange-400">Weddings & Celebrations</h3>
                  <p className="text-slate-300 mb-4">Make your special day extraordinary with exquisite wedding catering services that blend tradition with modern elegance.</p>
                  <ul className="text-slate-300 space-y-2 text-sm">
                    <li>• Wedding receptions</li>
                    <li>• Engagement parties</li>
                    <li>• Cultural celebrations</li>
                    <li>• Milestone events</li>
                  </ul>
                </GlassCard>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <ScrollAnimation>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">The Story Behind Every Dish</h2>
                  <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                    Our journey began in a small kitchen in Nigeria, where our founder learned the art of cooking from her grandmother. 
                    Every morning, she would watch in awe as simple ingredients transformed into extraordinary dishes that brought families together.
                  </p>
                  <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                    After moving to London, she realized that the authentic flavors of home were missing from the local food scene. 
                    What started as cooking for friends and family quickly grew into a mission to share the rich, diverse tastes of Nigerian cuisine with the world.
                  </p>
                  <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                    Today, TK Afro Kitchen stands as a testament to that vision. Every dish we create is infused with the same love, 
                    attention to detail, and respect for tradition that she learned from her grandmother.
                  </p>
                  <Link href="/contact">
                    <AnimatedButton className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold px-8 py-4 rounded-full">
                      Learn More About Us
                    </AnimatedButton>
                  </Link>
                </div>
              </ScrollAnimation>
              
              <ScrollAnimation delay={0.2}>
                <div className="relative">
                  <img 
                    src="/images/updates/Business-description.jpeg" 
                    alt="TK Afro Kitchen founder and team"
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Catering Gallery Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <ScrollAnimation>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">Catering Gallery</h2>
            </ScrollAnimation>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ScrollAnimation delay={0.1}>
                <GlassCard className="overflow-hidden">
                  <div className="relative">
                    <img 
                      src="/images/updates/cater-dish.jpeg" 
                      alt="Professional catering presentation"
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-orange-400">Professional Presentation</h3>
                    <p className="text-slate-300">Every dish is beautifully presented to create a memorable dining experience for your guests.</p>
                  </div>
                </GlassCard>
              </ScrollAnimation>
              
              <ScrollAnimation delay={0.2}>
                <GlassCard className="overflow-hidden">
                  <div className="relative">
                    <img 
                      src="/images/updates/catalogue.png" 
                      alt="Comprehensive catering menu catalogue"
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-orange-400">Custom Menu Design</h3>
                    <p className="text-slate-300">Comprehensive menu options tailored to your event type, guest preferences, and dietary requirements.</p>
                  </div>
                </GlassCard>
              </ScrollAnimation>
              
              <ScrollAnimation delay={0.3}>
                <GlassCard className="overflow-hidden">
                  <div className="relative">
                    <img 
                      src="/images/updates/we-are-open.png" 
                      alt="Flexible service hours for events"
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-orange-400">Flexible Service</h3>
                    <p className="text-slate-300">Available for events throughout the week, including weekends and holidays, with 24/7 catering support.</p>
                  </div>
                </GlassCard>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <ScrollAnimation>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">Certifications & Standards</h2>
            </ScrollAnimation>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <ScrollAnimation delay={0.1}>
                <GlassCard className="p-8 text-center">
                  <img 
                    src="/images/updates/Food-Hygiene.png" 
                    alt="Food hygiene certification"
                    className="w-32 h-32 mx-auto mb-6 object-contain"
                  />
                  <h3 className="text-2xl font-semibold mb-4 text-orange-400">Food Hygiene Excellence</h3>
                  <p className="text-slate-300">Certified food safety standards ensuring every dish meets the highest quality and safety requirements for all catering services.</p>
                </GlassCard>
              </ScrollAnimation>
              
              <ScrollAnimation delay={0.2}>
                <GlassCard className="p-8 text-center">
                  <img 
                    src="/images/updates/Food-Allergy.png" 
                    alt="Food allergy awareness certification"
                    className="w-32 h-32 mx-auto mb-6 object-contain"
                  />
                  <h3 className="text-2xl font-semibold mb-4 text-orange-400">Allergy Awareness</h3>
                  <p className="text-slate-300">Comprehensive allergy management and dietary accommodations to ensure every guest can enjoy our cuisine safely and confidently.</p>
                </GlassCard>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <ScrollAnimation>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gradient">Ready to Create Something Extraordinary?</h2>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Let us help you plan your next event. Every celebration deserves exceptional food, 
                and we're here to make your vision a reality with authentic Nigerian cuisine that brings people together.
              </p>
            </ScrollAnimation>
            <ScrollAnimation delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <QuoteFormModal 
                  trigger={
                    <AnimatedButton className="button-primary text-lg px-8 py-4">
                      Get Your Custom Quote
                    </AnimatedButton>
                  }
                />
                <Link href="/menu">
                  <AnimatedButton 
                    variant="outline"
                    className="border-orange-500/30 text-orange-400 hover:bg-orange-500/20 px-8 py-4 text-lg"
                  >
                    Explore Our Menu
                  </AnimatedButton>
                </Link>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation delay={0.6}>
              <div className="mt-12 pt-8 border-t border-orange-500/20">
                <p className="text-slate-400 mb-4">Connect with us for the latest updates and inspiration</p>
                <div className="flex justify-center gap-4">
                  <Link 
                    href="https://instagram.com/tk_afro_kitchen" 
                    target="_blank"
                    className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                  >
                    <Instagram className="w-6 h-6" />
                  </Link>
                  <Link 
                    href="https://facebook.com/Tk Afro kitchen" 
                    target="_blank"
                    className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                  >
                    <Facebook className="w-6 h-6" />
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </section>
      </main>
    </div>
  );
}