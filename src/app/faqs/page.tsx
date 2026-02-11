'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { GlassCard } from "@/components/ui/GlassCard";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What areas do you deliver to?",
    answer: "We offer UK-wide delivery with next-day service to mainland UK from £24.99 (England & Wales) or £29.99 (Scotland). We also provide same-day delivery within Milton Keynes and surrounding areas. Our delivery service is available for orders over £70."
  },
  {
    question: "How far in advance should I order?",
    answer: "For regular orders, we recommend ordering at least 24 hours in advance. For large catering events, please contact us at least 1-2 weeks in advance to ensure we can accommodate your needs and provide the best service."
  },
  {
    question: "Do you accommodate dietary restrictions?",
    answer: "Yes! We offer vegetarian, vegan, and gluten-free options. We can also accommodate other dietary restrictions and allergies. Please let us know about any specific requirements when placing your order, and we'll ensure your meal is prepared safely and deliciously."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards, PayPal, and Apple Pay. Payment is processed securely at checkout. For large catering orders, we may require a deposit with the balance due before delivery."
  },
  {
    question: "How do I store and reheat my food?",
    answer: "All our food is delivered fresh and should be refrigerated immediately. Most dishes can be reheated in the microwave for 2-3 minutes or in the oven at 180°C for 10-15 minutes. We provide detailed reheating instructions with each order."
  },
  {
    question: "Do you offer catering for events?",
    answer: "Absolutely! We specialize in catering for weddings, corporate events, birthday parties, and other celebrations. We offer custom menus, professional setup, and can accommodate groups of any size. Contact us for a personalized quote."
  },
  {
    question: "What makes your food authentic?",
    answer: "Our recipes are passed down through generations and use traditional Nigerian cooking methods and authentic ingredients. Our founder learned these recipes from her grandmother in Nigeria, ensuring every dish captures the true flavors and spirit of Nigerian cuisine."
  },
  {
    question: "Can I modify my order after placing it?",
    answer: "Orders can be modified up to 12 hours before your scheduled delivery time. Please contact us directly at chef@tkafrokitchen.com or call us to make any changes to your order."
  },
  {
    question: "Do you offer frozen meals?",
    answer: "Yes! We offer a selection of frozen meals that are perfect for quick, delicious dinners. Our frozen meals maintain the same authentic flavors and can be stored for up to 3 months. They're perfect for busy families or those who want to stock up on authentic Nigerian cuisine."
  },
  {
    question: "What if I'm not satisfied with my order?",
    answer: "Customer satisfaction is our top priority. If you're not completely satisfied with your order, please contact us within 24 hours of delivery. We'll work with you to resolve any issues and ensure you're happy with your experience."
  }
];

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
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
                Frequently Asked Questions
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
              Find answers to the most common questions about our authentic Nigerian cuisine, delivery service, and catering options.
            </motion.p>
          </ScrollAnimation>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="px-4">
        <div className="container mx-auto max-w-4xl">
          <ScrollAnimation>
            <GlassCard className="p-4 sm:p-6 md:p-8">
              <div className="space-y-3 sm:space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-gray-700 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left bg-gray-800/50 hover:bg-gray-800/70 transition-colors duration-200 flex items-center justify-between"
                    >
                      <span className="text-sm sm:text-base md:text-lg font-semibold text-white pr-2 sm:pr-4 leading-tight">
                        {faq.question}
                      </span>
                      {openIndex === index ? (
                        <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 flex-shrink-0" />
                      )}
                    </button>
                    
                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-900/50"
                      >
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </ScrollAnimation>

          {/* Contact Section */}
          <ScrollAnimation delay={0.3}>
            <GlassCard className="p-4 sm:p-6 md:p-8 mt-6 sm:mt-8 text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Still Have Questions?</h2>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
                Can't find what you're looking for? We're here to help! Contact us directly and we'll get back to you within 2 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a
                  href="mailto:chef@tkafrokitchen.com"
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 text-sm sm:text-base"
                >
                  Email Us
                </a>
                <a
                  href="/contact"
                  className="border border-orange-500/30 text-orange-400 hover:bg-orange-500/20 font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 text-sm sm:text-base"
                >
                  Contact Form
                </a>
              </div>
            </GlassCard>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
} 