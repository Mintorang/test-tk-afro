'use client';

import { motion } from 'framer-motion';
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { Heart, Star, Award, Users, Mail, Clock, MapPin } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import { SEOHead } from "@/components/ui/SEOHead";

export default function AboutPage() {
  return (
    <>
      <SEOHead 
        title="Our Story | TK Afro Kitchen"
        description="Discover the passion and tradition behind Milton Keynes' premier African kitchen."
        canonical="https://tkafrokitchen.com/about"
      />
      <div className="min-h-screen bg-[#050505] pt-32 pb-20">
        {/* Header */}
        <section className="container mx-auto px-4 mb-24 text-center">
          <ScrollAnimation>
            <h1 className="text-6xl md:text-[10rem] font-black italic uppercase tracking-tighter text-white leading-none mb-4">
              Our <span className="text-primary">Story</span>
            </h1>
            <p className="text-gray-500 text-[10px] md:text-xs font-black uppercase tracking-[0.5em]">
              Tradition. Passion. Excellence.
            </p>
          </ScrollAnimation>
        </section>

        {/* Narrative Section */}
        <section className="container mx-auto px-4 mb-32">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <ScrollAnimation>
              <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden">
                <Image 
                  src="/images/updates/Business-description.jpeg" 
                  alt="TK Afro Kitchen Journey" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>
            </ScrollAnimation>

            <div className="space-y-12">
              <ScrollAnimation delay={0.2}>
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-5xl font-black italic uppercase text-white leading-tight">
                    From Grandmother's <br/>
                    <span className="text-primary underline decoration-white/10">Kitchen to London</span>
                  </h2>
                  <p className="text-gray-400 font-medium leading-relaxed text-lg">
                    Born and raised in the vibrant culinary landscape of Nigeria, our founder learned the art of cooking from her grandmother's side. Every morning was a transformation of simple ingredients into extraordinary dishes.
                  </p>
                  <p className="text-gray-400 font-medium leading-relaxed">
                    Today, TK Afro Kitchen stands as a testament to that vision. We are not just serving food; we are sharing culture, creating memories, and building community through the universal language of great cuisine.
                  </p>
                </div>
              </ScrollAnimation>

              <ScrollAnimation delay={0.4}>
                <div className="grid grid-cols-2 gap-4">
                  <GlassCard className="p-6 border-white/5">
                    <Star className="text-primary mb-4" />
                    <h4 className="text-white font-black uppercase italic text-sm">Authentic</h4>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Generational Recipes</p>
                  </GlassCard>
                  <GlassCard className="p-6 border-white/5">
                    <Award className="text-primary mb-4" />
                    <h4 className="text-white font-black uppercase italic text-sm">Quality</h4>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Premium Ingredients</p>
                  </GlassCard>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Contact Strip */}
        <section className="container mx-auto px-4">
          <GlassCard className="p-12 md:p-20 rounded-[4rem] border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 grid md:grid-cols-3 gap-12 text-center">
              <div>
                <Mail className="mx-auto text-primary mb-4" size={28} />
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Email</p>
                <p className="text-white font-black italic uppercase">chef@tkafrokitchen.com</p>
              </div>
              <div>
                <Clock className="mx-auto text-primary mb-4" size={28} />
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Service</p>
                <p className="text-white font-black italic uppercase">Wed - Sat | 9am - 7pm</p>
              </div>
              <div>
                <MapPin className="mx-auto text-primary mb-4" size={28} />
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Location</p>
                <p className="text-white font-black italic uppercase">Milton Keynes, UK</p>
              </div>
            </div>

            <div className="text-center mt-20">
              <Link href="/contact">
                <AnimatedButton className="px-12 py-5">Initiate Contact</AnimatedButton>
              </Link>
            </div>
          </GlassCard>
        </section>
      </div>
    </>
  );
}
