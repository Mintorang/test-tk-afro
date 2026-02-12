'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export function CartModal() {
  const { 
    items, 
    totalPrice, 
    isCartOpen, 
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    specialInstructions,
    setSpecialInstructions
  } = useCart();
  const router = useRouter();

  const MIN_ORDER = 70;
  const progress = Math.min((totalPrice / MIN_ORDER) * 100, 100);

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md bg-zinc-950 border-l border-white/10 p-0 flex flex-col">
        
        {/* Header */}
        <SheetHeader className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <SheetTitle className="text-xl font-black italic uppercase tracking-tighter text-white">Your Box</SheetTitle>
          </div>
        </SheetHeader>

        {/* Minimum Order Goal */}
        <div className="p-6 bg-primary/[0.03] border-b border-white/5">
          <div className="flex justify-between items-end mb-2">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Box Progress</p>
            <p className="text-sm font-bold text-white">£{totalPrice.toFixed(2)} / £{MIN_ORDER}</p>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-primary"
            />
          </div>
          {totalPrice < MIN_ORDER ? (
            <p className="text-[10px] text-orange-400/80 mt-2 font-medium italic">Add £{(MIN_ORDER - totalPrice).toFixed(2)} more for UK Delivery</p>
          ) : (
            <p className="text-[10px] text-green-400 mt-2 font-medium italic uppercase tracking-widest">Minimum order reached!</p>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-20">
              <ShoppingBag className="w-12 h-12 mb-4" />
              <p className="font-black uppercase tracking-widest text-xs">Empty Box</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.selectedSize.size}-${item.spiceLevel}`} className="flex gap-4 group">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden glass-card flex-shrink-0">
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-black uppercase tracking-tight text-white leading-none">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id, item.selectedSize.size, item.spiceLevel)} className="text-gray-600 hover:text-red-500 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-500 uppercase mt-1 font-bold tracking-widest">
                    {item.selectedSize.size} {item.spiceLevel && `• ${item.spiceLevel}`}
                  </p>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-white/5 rounded-full px-2 py-1">
                      <button onClick={() => updateQuantity(item.id, item.selectedSize.size, item.quantity - 1, item.spiceLevel)} className="p-1 hover:text-primary transition"><Minus className="w-3 h-3" /></button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.selectedSize.size, item.quantity + 1, item.spiceLevel)} className="p-1 hover:text-primary transition"><Plus className="w-3 h-3" /></button>
                    </div>
                    <p className="font-bold text-sm text-primary">£{(item.selectedSize.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 space-y-4 bg-zinc-950">
          <Textarea
            placeholder="Special kitchen notes..."
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            className="min-h-[80px] bg-white/[0.02] border-white/5 text-white placeholder:text-gray-600 rounded-2xl text-xs focus-visible:ring-primary/20"
          />
          
          <div className="flex justify-between items-end py-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Subtotal</span>
            <span className="text-2xl font-black italic text-white">£{totalPrice.toFixed(2)}</span>
          </div>

          <Button
            disabled={totalPrice < MIN_ORDER || items.length === 0}
            className="w-full h-14 bg-primary hover:bg-orange-600 text-white font-black uppercase tracking-widest rounded-2xl gap-2 disabled:opacity-20 disabled:grayscale transition-all"
            onClick={handleCheckout}
          >
            Checkout Now <ArrowRight className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center justify-center gap-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest pt-2">
            <ShieldCheck className="w-4 h-4 text-green-500/50" /> Secure Checkout
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
