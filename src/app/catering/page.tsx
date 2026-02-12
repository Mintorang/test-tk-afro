'use client';

import { QuoteFormModal } from "@/components/forms/quote-form-modal";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  ChefHat, Users, Star, Heart, Award, ChevronRight,
  Instagram, Facebook 
} from "lucide-react";
import Link from "next/link";

export default function CateringPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <main className="pb-16 pt-32">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 px-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
          
          <div className="relative z-10 container mx-auto text-center">
            <ScrollAnimation>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8">
                  <ChefHat size={14} className="text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">The Private Collection</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-[0.85] mb-8">
                  Premium <br/>
                  <span className="text-primary">Catering</span>
                </h1>
                <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                  Transforming events into unforgettable culinary experiences with authentic Nigerian flavors.
                </p>
              </motion.div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <QuoteFormModal 
                  trigger={
                    <AnimatedButton className="text-sm px-10 py-5">
                      Request Private Quote
                    </AnimatedButton>
                  }
                />
                <Link href="/contact">
                  <button className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors flex items-center gap-2">
                    Learn Our Story <ChevronRight size={14} />
                  </button>
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Corporate", icon: Users, desc: "Bespoke menus for business lunches, conferences, and gala dinners." },
              { title: "Private", icon: Heart, desc: "Intimate birthday celebrations, anniversaries, and family reunions." },
              { title: "Weddings", icon: Star, desc: "Traditional cultural ceremonies blended with modern luxury service." }
            ].map((service, i) => (
              <ScrollAnimation key={i} delay={i * 0.1}>
                <GlassCard className="p-10 border-white/5 hover:border-primary/30 group">
                  <service.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-black italic uppercase text-white mb-4">{service.title}</h3>
                  <p className="text-gray-500 text-xs font-bold leading-relaxed uppercase tracking-tight">
                    {service.desc}
                  </p>
                </GlassCard>
              </ScrollAnimation>
            ))}
          </div>
        </section>

        {/* Brand Showcase Section */}
        <section className="py-24 bg-white/5 border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <ScrollAnimation>
                <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10">
                  <Image 
                    src="/images/updates/cater-dish.jpeg" 
                    alt="Boutique Catering" 
                    fill 
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
              </ScrollAnimation>
              <ScrollAnimation delay={0.2}>
                <h2 className="text-4xl md:text-6xl font-black italic uppercase text-white mb-8 leading-none">
                  Excellence <br/>
                  <span className="text-primary">In Every Detail</span>
                </h2>
                <div className="space-y-6">
                  <p className="text-gray-400 font-medium leading-relaxed">
                    We don't just serve food; we curate moments. Our catering service brings the full TK Afro Kitchen experience to your venue, ensuring every guest feels the warmth of Nigerian hospitality.
                  </p>
                  <div className="flex gap-8 py-8 border-t border-white/10">
                    <div>
                      <p className="text-2xl font-black text-white italic">5★</p>
                      <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Hygiene Rating</p>
                    </div>
                    <div>
                      <p className="text-2xl font-black text-white italic">100%</p>
                      <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Bespoke Menus</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-24 text-center px-4">
          <ScrollAnimation>
            <h2 className="text-3xl font-black italic uppercase text-white mb-12">Connect With The Kitchen</h2>
            <div className="flex justify-center gap-6">
               <Link href="https://instagram.com/tk_afro_kitchen" target="_blank" className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:text-primary transition-colors">
                  <Instagram size={24} />
               </Link>
               <Link href="https://facebook.com/Tk Afro kitchen" target="_blank" className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:text-primary transition-colors">
                  <Facebook size={24} />
               </Link>
            </div>
          </ScrollAnimation>
        </section>
      </main>
    </div>
  );
}
