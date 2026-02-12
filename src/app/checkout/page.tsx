'use client';

import OptimizedCheckout from "@/components/checkout/OptimizedCheckout";
import { ShieldCheck, Lock, Truck } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 border-b border-white/5 pb-8">
          <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase mb-2">
            Final <span className="text-primary">Step</span>
          </h1>
          <div className="flex flex-wrap gap-6 mt-4">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
              <ShieldCheck className="w-4 h-4 text-primary" /> 5-Star Hygiene Rated
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
              <Truck className="w-4 h-4 text-primary" /> Nationwide Delivery
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
              <Lock className="w-4 h-4 text-primary" /> Secure Payment
            </div>
          </div>
        </div>

        {/* The Checkout Component */}
        <div className="relative">
          <OptimizedCheckout />
        </div>
      </div>
    </div>
  );
}
