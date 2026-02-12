'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Utensils, Snowflake, Users, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/menu', label: 'Menu', icon: Utensils },
  { href: '/frozen', label: 'Frozen', icon: Snowflake },
  { href: '/catering', label: 'Catering', icon: Users },
];

export function MobileNav() {
  const pathname = usePathname();
  const { items, setIsCartOpen } = useCart();
  const cartItemCount = items.length;

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="fixed bottom-6 left-4 right-4 z-50 md:hidden"
    >
      {/* Floating Glass Container */}
      <div className="relative glass rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />
        
        <div className="relative flex items-center justify-around px-2 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link key={item.href} href={item.href} className="relative group">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div className="relative p-1">
                    <Icon 
                      size={20} 
                      className={`transition-all duration-300 ${isActive ? 'text-primary' : 'text-gray-500'}`} 
                    />
                    
                    {/* Active Underglow Glow */}
                    {isActive && (
                      <motion.div
                        layoutId="navUnderglow"
                        className="absolute inset-0 bg-primary/20 blur-md rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </div>
                  
                  <span className={`
                    text-[9px] font-black uppercase italic tracking-tighter transition-colors
                    ${isActive ? 'text-white' : 'text-gray-500'}
                  `}>
                    {item.label}
                  </span>

                  {/* High-End Active Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute -bottom-1 w-4 h-[2px] bg-primary rounded-full shadow-[0_0_8px_#f97316]"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
          
          {/* Boutique Cart Button */}
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center gap-1.5"
            onClick={() => setIsCartOpen(true)}
          >
            <div className="relative p-1">
              <div className={`
                p-2 rounded-xl bg-white/5 border border-white/10 transition-all
                ${cartItemCount > 0 ? 'text-primary border-primary/30' : 'text-gray-500'}
              `}>
                <ShoppingCart size={18} />
              </div>
              
              {cartItemCount > 0 && (
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center border-2 border-black"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <span className="text-[8px] font-black text-white">
                    {cartItemCount}
                  </span>
                </motion.div>
              )}
            </div>
            <span className="text-[9px] font-black uppercase italic tracking-tighter text-gray-500">
              Cart
            </span>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
