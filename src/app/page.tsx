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
  Truck,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import InteractiveMenuCards from '@/components/ui/InteractiveMenuCards';
import BrandStorytelling from '@/components/ui/BrandStorytelling';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 1. HERO SECTION - Massive Impact */}
      <EnhancedHero />

      {/* 2. THE BENTO EXPERIENCE SECTION */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <ScrollAnimation>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
                Beyond <span className="text-primary">Flavour</span>
              </h2>
              <p className="text-gray-400 mt-4 max-w-md font-medium">
                Authentic Nigerian & Ghanaian heritage delivered to your doorstep in Milton Keynes.
              </p>
            </div>
            <Link href="/menu">
               <AnimatedButton className="button-primary">Explore Full Menu</AnimatedButton>
            </Link>
          </div>
        </ScrollAnimation>

        {/* BENTO GRID START */}
        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4 h-auto md:h-[700px]">
          
          {/* Main Story Block (Large) */}
          <div className="md:col-span-3 md:row-span-2 relative group overflow-hidden rounded-[2.5rem] border border-white/10 glass-card p-8 md:p-12 flex flex-col justify-end">
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
             <img 
               src="/images/story-bg.jpg" // Update with your actual food/story image
               className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition duration-1000" 
               alt="Our Story" 
             />
             <div className="relative z-20">
                <ChefHat className="w-12 h-12 text-primary mb-6 animate-float" />
                <h3 className="text-3xl md:text-5xl font-black italic mb-4">THE HEART OF TK</h3>
                <p className="text-gray-300 text-sm md:text-lg max-w-md mb-8">
                  Born from a grandmother's kitchen in Nigeria, brought to life in the UK. Every dish is a piece of home.
                </p>
                <Link href="/about" className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all">
                   Read Full Story <ArrowUpRight className="w-4 h-4" />
                </Link>
             </div>
          </div>

          {/* Interactive Menu Cards (Category Teasers) */}
          <div className="md:col-span-3 glass-card rounded-[2.5rem] overflow-hidden">
             <InteractiveMenuCards />
          </div>

          {/* Value Blocks (Small) */}
          <div className="md:col-span-1 glass-card rounded-[2.5rem] flex flex-col items-center justify-center p-6 text-center group">
             <div className="bg-primary/20 p-4 rounded-full mb-4 group-hover:bg-primary transition-colors">
                <Star className="w-6 h-6 text-primary group-hover:text-white" />
             </div>
             <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">5-Star</span>
             <p className="text-xs font-bold">Hygiene</p>
          </div>

          <div className="md:col-span-2 bg-primary rounded-[2.5rem] p-8 relative overflow-hidden group cursor-pointer">
             <Truck className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 group-hover:translate-x-4 transition-transform duration-700" />
             <div className="relative z-10 h-full flex flex-col justify-center">
                <h4 className="text-2xl font-black text-white italic leading-tight">FREE DELIVERY <br/> ON SELECTED ORDERS</h4>
                <p className="text-white/80 text-xs mt-2 uppercase tracking-widest font-bold">Milton Keynes & Beyond</p>
             </div>
          </div>

        </div>
      </section>

      {/* 3. EVOLUTION TIMELINE - High Contrast */}
      <section className="bg-zinc-950/50 py-24 border-y border-white/5">
        <BrandStorytelling />
      </section>

      {/* 4. CONTACT / LOCATION DOCK */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Mail, label: "Email Us", val: "chef@tkafrokitchen.com", link: "mailto:chef@tkafrokitchen.com" },
              { icon: Clock, label: "Opening Hours", val: "Mon - Sun: 9AM - 10PM", link: "#" },
              { icon: MapPin, label: "Location", val: "Milton Keynes, UK", link: "https://maps.google.com" }
            ].map((item, idx) => (
              <a href={item.link} key={idx} className="glass-card p-8 flex flex-col items-center text-center group">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary transition-all">
                  <item.icon className="w-5 h-5 text-primary group-hover:text-white" />
                </div>
                <h4 className="text-xs font-black tracking-[0.2em] text-gray-500 uppercase mb-2">{item.label}</h4>
                <p className="text-white font-bold">{item.val}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer is handled by layout.tsx */}
    </div>
  );
}
