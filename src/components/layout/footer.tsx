'use client';

import { motion } from 'framer-motion';
import { ScrollAnimation } from '@/components/ui/ScrollAnimation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Facebook, 
  Twitter,
  Heart,
  Code,
  Palette,
  Zap,
  Shield,
  Star,
  Award,
  Users,
  Globe,
  ArrowUp
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Menu", href: "/menu" },
        { name: "Catering", href: "/catering" },
        { name: "Frozen Foods", href: "/frozen" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Services",
      links: [
        { name: "UK-Wide Delivery", href: "/menu" },
        { name: "Event Catering", href: "/catering" },
        { name: "Frozen Meals", href: "/frozen" },
        { name: "Corporate Orders", href: "/contact" },
        { name: "Bulk Orders", href: "/contact" },
        { name: "Custom Menus", href: "/contact" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Instagram", href: "https://instagram.com/tk_afro_kitchen", icon: Instagram, color: "from-pink-500 to-purple-500" },
    { name: "Facebook", href: "https://facebook.com/Tk Afro kitchen", icon: Facebook, color: "from-blue-500 to-blue-600" },
    { name: "Twitter", href: "#", icon: Twitter, color: "from-blue-400 to-blue-500" }
  ];

  const features = [
    { icon: Star, title: "Premium Quality", description: "Authentic recipes with premium ingredients" },
    { icon: Shield, title: "Food Safety", description: "Highest standards of hygiene and safety" },
    { icon: Clock, title: "Fresh Daily", description: "All dishes prepared fresh daily" },
    { icon: Users, title: "Family Friendly", description: "Perfect portions for families and groups" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-900/20"></div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-500/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
            }}
            style={{
              left: `${10 + i * 10}%`,
              top: `${20 + i * 8}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Section */}
            <ScrollAnimation>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-1"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="relative w-12 h-12">
                    <Image
                      src="/images/brand/tklogo.jpg"
                      alt="TK Afro Kitchen"
                      fill
                      className="object-contain rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                      TKAfro Kitchen
                    </h3>
                    <p className="text-sm text-gray-400">Authentic Nigerian Cuisine</p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Experience the rich flavors of Nigeria and West Africa. Our authentic dishes are prepared with traditional recipes and premium ingredients, delivered fresh to your doorstep across the UK.
                </p>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <MapPin className="w-4 h-4 text-orange-400" />
                    <span className="text-sm">Milton Keynes, UK</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Mail className="w-4 h-4 text-orange-400" />
                    <span className="text-sm">chef@tkafrokitchen.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Clock className="w-4 h-4 text-orange-400" />
                    <span className="text-sm">Mon-Sat: 9AM-9PM</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`w-10 h-10 bg-gradient-to-r ${social.color} rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </ScrollAnimation>

            {/* Footer Links */}
            {footerSections.map((section, sectionIndex) => (
              <ScrollAnimation key={section.title} delay={sectionIndex * 0.1}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: sectionIndex * 0.1 }}
                >
                  <h4 className="text-lg font-semibold text-white mb-6 border-b border-orange-500/30 pb-2">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center group"
                        >
                          <span className="w-0 h-0.5 bg-orange-400 group-hover:w-4 transition-all duration-300 mr-2"></span>
                          {link.name}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>

          {/* Features Section */}
          <ScrollAnimation delay={0.4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h5 className="text-white font-semibold mb-2">{feature.title}</h5>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </ScrollAnimation>

          {/* Divider */}
          <div className="border-t border-gray-700/50 mb-8"></div>

          {/* Bottom Section */}
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Copyright */}
            <ScrollAnimation delay={0.6}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-center lg:text-left"
              >
                <p className="text-gray-400 text-sm">
                  © {currentYear} TKAfro Kitchen. All rights reserved.
                </p>
              </motion.div>
            </ScrollAnimation>

            {/* Web Design Attribution */}
            <ScrollAnimation delay={0.7}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-center lg:text-right"
              >
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <span>Website developed by</span>
                  <motion.a
                    href="https://cbis.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-orange-400 hover:text-orange-300 transition-colors duration-300 group"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Code className="w-4 h-4" />
                    <span className="font-semibold">CBIS</span>
                    <Palette className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  </motion.a>
                </div>
              </motion.div>
            </ScrollAnimation>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
} 