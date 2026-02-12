'use client';

import { motion } from 'framer-motion';
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { EnhancedHero } from '@/components/ui/EnhancedHero';
import { 
  Clock, 
  MapPin, 
  Mail, 
  ChefHat, 
  Truck, 
  ArrowUpRight,
  Instagram,
  Facebook
} from "lucide-react";
import Link from "next/link";
import { InteractiveMenuExperience } from '@/components/ui/InteractiveMenuExperience';
import BrandStorytelling from '@/components/ui/BrandStorytelling';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      
      {/* 1. HERO SECTION - Extended Scroll Duration */}
      <section className="relative h-[140vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <EnhancedHero />
        </div>
      </section>

      {/* 2. THE BENTO EXPERIENCE SECTION */}
      <section className="py-24 px-4 max-w-7xl mx-auto relative z-20 bg-background">
        <ScrollAnimation>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
                Beyond <span className="text-primary">Flavour</span>
              </h2>
              <p className="text-gray-400 mt-6 max-w-md font-medium text-lg">
                Authentic Nigerian & Ghanaian heritage delivered to your doorstep in Milton Keynes.
              </p>
            </div>
            <div className="flex items-center gap-6">
               <div className="flex gap-4 mr-4">
                  <a href="https://instagram.com/tkafrokitchen" className="hover:text-primary transition-colors"><Instagram /></a>
                  <a href="https://facebook.com/tkafrokitchen" className="hover:text-primary transition-colors"><Facebook /></a>
               </div>
               <Link href="/menu">
                  <AnimatedButton className="button-primary">Full Menu</AnimatedButton>
               </Link>
            </div>
          </div>
        </ScrollAnimation>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 h-auto">
          
          {/* Main Story Block */}
          <div className="md:col-span-3 h-[600px] relative group overflow-hidden rounded-[3rem] border border-white/10 glass-card p-12 flex flex-col justify-end">
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
             <Image 
               src="/images/story-bg.jpg" 
               alt="Heart of TK" 
               fill 
               className="object-cover opacity-60 group-hover:scale-105 transition duration-1000"
             />
             <div className="relative z-20">
                <ChefHat className="w-12 h-12 text-primary mb-6 animate-float" />
                <h3 className="text-4xl md:text-5xl font-black italic mb-4">THE HEART OF TK</h3>
                <p className="text-gray-300 text-lg max-w-sm mb-8">
                  Born from a grandmother's kitchen in Nigeria. Every dish is a piece of home.
                </p>
                <Link href="/about" className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all">
                   Read Full Story <ArrowUpRight className="w-4 h-4" />
                </Link>
             </div>
          </div>

          {/* Delivery Block */}
          <div className="md:col-span-3 h-[600px] bg-primary rounded-[3rem] p-12 relative overflow-hidden group cursor-pointer">
             <Truck className="absolute -right-8 -bottom-8 w-64 h-64 text-white/10 group-hover:translate-x-6 transition-transform duration-1000" />
             <div className="relative z-10 h-full flex flex-col justify-center">
                <span className="text-white/60 font-black uppercase tracking-[0.3em] text-xs mb-4 italic">Delivery Service</span>
                <h4 className="text-5xl font-black text-white italic leading-[0.9] uppercase tracking-tighter">
                  FREE DELIVERY <br/> ON SELECTED <br/> ORDERS
                </h4>
                <p className="text-white/80 text-sm mt-8 uppercase tracking-widest font-bold">Milton Keynes & Surrounding Areas</p>
             </div>
          </div>
        </div>

        {/* 3. INTERACTIVE MENU SECTION (Integrated here) */}
        <div className="mt-24">
           <InteractiveMenuExperience />
        </div>
      </section>

      {/* 5. CONTACT DOCK */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Mail, label: "Email Us", val: "chef@tkafrokitchen.com", link: "mailto:chef@tkafrokitchen.com" },
            { icon: Clock, label: "Opening Hours", val: "Mon - Sun: 9AM - 10PM", link: "#" },
            { icon: MapPin, label: "Location", val: "Milton Keynes, UK", link: "https://maps.google.com" }
          ].map((item, idx) => (
            <a href={item.link} key={idx} className="glass-card p-10 flex flex-col items-center text-center group rounded-[2.5rem]">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-all">
                <item.icon className="w-6 h-6 text-primary group-hover:text-white" />
              </div>
              <h4 className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase mb-3">{item.label}</h4>
              <p className="text-white text-lg font-bold">{item.val}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
