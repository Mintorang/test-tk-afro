// src/app/contact/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { QuoteFormModal } from "@/components/forms/quote-form-modal";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  ChefHat, 
  Heart,
  Star,
  Users,
  Award,
  MessageCircle
} from "lucide-react";
import Link from "next/link";
import { SEOHead } from "@/components/ui/SEOHead";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('contact');

  return (
    <>
      <SEOHead 
        title="Contact Us | TK Afro Kitchen | African Food Delivery Milton Keynes"
        description="Contact TK Afro Kitchen for African food delivery across UK. 5-star hygiene rated, £70 minimum order. Call us or order online for authentic Nigerian & Ghanaian cuisine."
        keywords="contact TK Afro Kitchen, African food delivery contact, Nigerian restaurant Milton Keynes, Ghanaian food delivery, catering services"
        canonical="https://tkafrokitchen.com/contact"
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
                  Let's Create Magic Together
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
                From intimate family gatherings to grand celebrations, we're here to bring the authentic flavors of Nigeria to your table. Every dish tells a story of tradition, love, and culinary excellence.
              </motion.p>
            </ScrollAnimation>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="px-4 mb-8 sm:mb-12">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {[
                { id: 'contact', label: 'Contact Us', icon: MessageCircle },
                { id: 'story', label: 'Our Story', icon: Heart },
                { id: 'bulk', label: 'Bulk Orders', icon: Users },
                { id: 'custom', label: 'Custom Menus', icon: ChefHat }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-full border transition-all duration-300 text-sm sm:text-base ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-orange-500 shadow-lg'
                      : 'bg-white/10 text-gray-300 border-gray-600 hover:border-orange-500 hover:text-orange-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">{tab.label}</span>
                  <span className="xs:hidden">{tab.label.split(' ')[0]}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Information */}
        {activeTab === 'contact' && (
          <section className="px-4">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* Contact Details */}
                <ScrollAnimation>
                  <GlassCard className="p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Get in Touch</h2>
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Email Us</h3>
                          <p className="text-sm sm:text-base text-gray-300">chef@tkafrokitchen.com</p>
                          <p className="text-xs sm:text-sm text-gray-400">We respond within 2 hours</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Opening Hours</h3>
                          <p className="text-sm sm:text-base text-gray-300">Wednesday - Saturday: 9:00 AM - 7:00 PM</p>
                          <p className="text-xs sm:text-sm text-gray-400">Monday, Tuesday & Sunday: Closed</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Location</h3>
                          <p className="text-sm sm:text-base text-gray-300">Milton Keynes, UK</p>
                          <p className="text-xs sm:text-sm text-gray-400">Delivery & Collection available Wednesday-Saturday</p>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </ScrollAnimation>

                {/* Contact Form */}
                <ScrollAnimation delay={0.2}>
                  <GlassCard className="p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Send Us a Message</h2>
                    <p className="text-sm sm:text-base text-gray-300 mb-6">
                      Have a question, need a quote, or want to discuss your event? We'd love to hear from you!
                    </p>
                    <QuoteFormModal 
                      trigger={
                        <AnimatedButton 
                          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 sm:py-4 rounded-xl text-base sm:text-lg"
                        >
                          Send Message to Kitchen
                        </AnimatedButton>
                      }
                    />
                    <div className="mt-4 sm:mt-6 text-center">
                      <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">Or connect with us on social media</p>
                      <div className="flex justify-center gap-3 sm:gap-4">
                        <Link 
                          href="https://instagram.com/tk_afro_kitchen" 
                          target="_blank"
                          className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                        >
                          <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                        </Link>
                        <Link 
                          href="https://facebook.com/Tk Afro kitchen" 
                          target="_blank"
                          className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                        >
                          <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                        </Link>
                      </div>
                    </div>
                  </GlassCard>
                </ScrollAnimation>
              </div>
            </div>
          </section>
        )}

        {/* Our Story */}
        {activeTab === 'story' && (
          <section className="px-4">
            <div className="container mx-auto max-w-4xl">
              <ScrollAnimation>
                <GlassCard className="p-6 sm:p-8">
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">The Heart Behind TK Afro Kitchen</h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-300">Every great dish begins with a story of passion, tradition, and love</p>
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
            </div>
          </section>
        )}

        {/* Bulk Orders */}
        {activeTab === 'bulk' && (
          <section className="px-4">
            <div className="container mx-auto max-w-4xl">
              <ScrollAnimation>
                <GlassCard className="p-6 sm:p-8">
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <Users className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Bulk Orders & Catering</h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-300">Perfect for events, parties, and large gatherings</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Star className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Events & Parties</h3>
                      <p className="text-sm sm:text-base text-gray-300">From intimate gatherings to large celebrations, we cater for all sizes</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Corporate Catering</h3>
                      <p className="text-sm sm:text-base text-gray-300">Professional catering for business meetings and corporate events</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <QuoteFormModal 
                      trigger={
                        <AnimatedButton 
                          className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-base sm:text-lg"
                        >
                          Get Bulk Order Quote
                        </AnimatedButton>
                      }
                    />
                  </div>
                </GlassCard>
              </ScrollAnimation>
            </div>
          </section>
        )}

        {/* Custom Menus */}
        {activeTab === 'custom' && (
          <section className="px-4">
            <div className="container mx-auto max-w-4xl">
              <ScrollAnimation>
                <GlassCard className="p-6 sm:p-8">
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <ChefHat className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Custom Menu Creation</h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-300">Let us create a personalized menu for your special occasion</p>
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6">
                      Every event is unique, and we believe your menu should reflect that. Our custom menu service allows you to work directly with our chef 
                      to create a personalized dining experience that perfectly matches your vision and dietary requirements.
                    </p>
                    
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-6">
                      Whether you have specific dishes in mind, dietary restrictions to accommodate, or want to explore new flavors, 
                      we'll work together to create a menu that delights your guests and makes your event truly memorable.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <QuoteFormModal 
                      trigger={
                        <AnimatedButton 
                          className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-base sm:text-lg"
                        >
                          Discuss Custom Menu
                        </AnimatedButton>
                      }
                    />
                  </div>
                </GlassCard>
              </ScrollAnimation>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
