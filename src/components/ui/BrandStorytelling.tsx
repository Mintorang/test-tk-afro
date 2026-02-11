'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  ChefHat, 
  Heart, 
  Users, 
  Award, 
  Star, 
  Clock,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { Card } from './card';
import { Button } from './button';
import Link from 'next/link';

const BrandStorytelling = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const timelineData = [
    {
      year: "2018",
      title: "The Beginning",
      description: "Started as a small family kitchen, sharing authentic Nigerian flavors with our community.",
      icon: ChefHat,
      color: "from-orange-500 to-yellow-500"
    },
    {
      year: "2020",
      title: "Growing Community",
      description: "Expanded our menu and built a loyal customer base who loved our traditional recipes.",
      icon: Users,
      color: "from-green-500 to-emerald-500"
    },
    {
      year: "2022",
      title: "Award Recognition",
      description: "Received recognition for excellence in authentic Nigerian cuisine and customer service.",
      icon: Award,
      color: "from-purple-500 to-pink-500"
    },
    {
      year: "2024",
      title: "Digital Innovation",
      description: "Launched our online platform to serve more customers with the same authentic taste.",
      icon: Star,
      color: "from-blue-500 to-cyan-500"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Authenticity",
      description: "Every dish tells a story of our heritage and tradition."
    },
    {
      icon: ChefHat,
      title: "Quality",
      description: "Only the finest ingredients make it to your plate."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building connections through shared meals and culture."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Consistent delivery of exceptional dining experiences."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Story
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            From humble beginnings to serving authentic Nigerian cuisine across the community. 
            Every dish carries the legacy of our ancestors and the love of our family.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-yellow-500"></div>
            
            {timelineData.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`flex items-center mb-12 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Timeline Item */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${item.color} mb-4`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-300">{item.description}</p>
                    </Card>
                  </div>

                  {/* Timeline Dot */}
                  <div className="relative z-10">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color} border-4 border-slate-900`}></div>
                  </div>

                  {/* Year */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8 text-right'}`}>
                    <div className="text-3xl font-bold text-orange-400">{item.year}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Our Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                >
                  <Card className="p-6 text-center bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">{value.title}</h4>
                    <p className="text-slate-300">{value.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <Card className="p-8 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-sm border-orange-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Join Our Culinary Journey
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Experience the authentic taste of Nigeria. Every meal is prepared with love, 
              tradition, and the finest ingredients. Order now and taste the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                asChild
              >
                <Link href="/menu">View Our Menu</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandStorytelling; 