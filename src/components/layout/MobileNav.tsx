'use client';

import { motion } from 'framer-motion';
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
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
    >
      {/* Background with glassmorphism */}
      <div className="relative">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md border-t border-white/10" />
        
        <div className="relative flex items-center justify-around px-2 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center space-y-1"
                >
                  <motion.div
                    className={`
                      relative p-2.5 rounded-xl transition-all duration-300
                      ${isActive 
                        ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white' 
                        : 'text-gray-400 hover:text-white'
                      }
                    `}
                    animate={{
                      scale: isActive ? 1.1 : 1,
                    }}
                  >
                    <Icon size={18} />
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.div>
                  
                  <span className={`
                    text-xs font-medium transition-colors text-center
                    ${isActive ? 'text-orange-400' : 'text-gray-400'}
                  `}>
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
          
          {/* Cart button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center space-y-1"
            onClick={() => setIsCartOpen(true)}
          >
            <motion.div
              className="relative p-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white"
              whileHover={{ 
                boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)" 
              }}
            >
              <ShoppingCart size={18} />
              
              {/* Cart badge - only show if there are items */}
              {cartItemCount > 0 && (
                <motion.div
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-xs font-bold text-white">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                </motion.div>
              )}
            </motion.div>
            
            <span className="text-xs font-medium text-green-400">
              Cart
            </span>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
} 