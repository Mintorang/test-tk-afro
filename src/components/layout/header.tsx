'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, MapPin, Instagram, Facebook, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";

export function Header() {
  const { items, setIsCartOpen } = useCart();
  const cartItemCount = items.length;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // Detect Safari for specific handling
    const userAgent = navigator.userAgent;
    const safari = /Safari/.test(userAgent) && !/Chrome|CriOS|FxiOS/.test(userAgent);
    setIsSafari(safari);
    
    if (safari) {
      console.log('📱 Safari detected - applying Safari-specific fixes');
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Safari-specific link handler
  const handleSafariLink = (e: React.MouseEvent, href: string) => {
    if (isSafari) {
      e.preventDefault();
      // Force navigation in Safari
      window.location.href = href;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-[#1e1e1e]/95 border-b border-orange-900/20">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm border-b border-orange-900/10">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-slate-300">
              <MapPin className="h-4 w-4 mr-2 text-orange-400" />
              <span>Milton Keynes, UK</span>
            </div>
          </div>
          
          {/* Add Social Media Icons */}
          <div className="flex items-center space-x-4">
            {/* Social Media Links */}
            <div className="flex items-center space-x-3 mr-6">
              <Link href="https://instagram.com/tk_afro_kitchen" target="_blank" className="text-slate-300 hover:text-orange-400 transition-colors">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="https://facebook.com/Tk Afro kitchen" target="_blank" className="text-slate-300 hover:text-orange-400 transition-colors">
                <Facebook className="h-4 w-4" />
              </Link>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex items-center space-x-4">
              <Link 
                href="/about" 
                className="nav-link"
                onClick={(e) => handleSafariLink(e, '/about')}
              >
                About
              </Link>
              <Link 
                href="/size-guide" 
                className="nav-link"
                onClick={(e) => handleSafariLink(e, '/size-guide')}
              >
                Size Guide
              </Link>
              <Link 
                href="/faqs" 
                className="nav-link"
                onClick={(e) => handleSafariLink(e, '/faqs')}
              >
                FAQ
              </Link>
              <Link 
                href="/contact" 
                className="nav-link"
                onClick={(e) => handleSafariLink(e, '/contact')}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link 
            href="/" 
            className="flex items-center space-x-2"
            onClick={(e) => handleSafariLink(e, '/')}
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10">
              <Image
                src="/images/brand/tklogo.jpg"
                alt="TK Afro Kitchen"
                fill
                className="object-contain rounded-full"
              />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gradient">
              TKAfro Kitchen
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/menu" 
              className="nav-link"
              onClick={(e) => handleSafariLink(e, '/menu')}
            >
              Menu
            </Link>
            <Link 
              href="/frozen" 
              className="nav-link"
              onClick={(e) => handleSafariLink(e, '/frozen')}
            >
              Frozen
            </Link>
            <Link 
              href="/catering" 
              className="nav-link"
              onClick={(e) => handleSafariLink(e, '/catering')}
            >
              Catering
            </Link>
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button 
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 sm:h-9 sm:w-9"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-slate-300" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Button>
            <Button 
              className="md:hidden h-8 w-8 sm:h-9 sm:w-9" 
              variant="ghost" 
              size="icon"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
            <Link 
              href="/menu" 
              className="hidden md:flex inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
              onClick={(e) => handleSafariLink(e, '/menu')}
            >
              Order Now
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#1e1e1e] border-t border-orange-900/20">
            <nav className="flex flex-col py-4">
              <Link 
                href="/menu" 
                className="px-4 py-2 text-slate-300 hover:bg-orange-500/10 hover:text-orange-400"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleSafariLink(e, '/menu');
                }}
              >
                Menu
              </Link>
              <Link 
                href="/frozen" 
                className="px-4 py-2 text-slate-300 hover:bg-orange-500/10 hover:text-orange-400"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleSafariLink(e, '/frozen');
                }}
              >
                Frozen
              </Link>
              <Link 
                href="/catering" 
                className="px-4 py-2 text-slate-300 hover:bg-orange-500/10 hover:text-orange-400"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleSafariLink(e, '/catering');
                }}
              >
                Catering
              </Link>
              <Link 
                href="/about" 
                className="px-4 py-2 text-slate-300 hover:bg-orange-500/10 hover:text-orange-400"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleSafariLink(e, '/about');
                }}
              >
                About
              </Link>
              <Link 
                href="/size-guide" 
                className="px-4 py-2 text-slate-300 hover:bg-orange-500/10 hover:text-orange-400"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleSafariLink(e, '/size-guide');
                }}
              >
                Size Guide
              </Link>
              <Link 
                href="/faqs" 
                className="px-4 py-2 text-slate-300 hover:bg-orange-500/10 hover:text-orange-400"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleSafariLink(e, '/faqs');
                }}
              >
                FAQ
              </Link>
              <Link 
                href="/contact" 
                className="px-4 py-2 text-slate-300 hover:bg-orange-500/10 hover:text-orange-400"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleSafariLink(e, '/contact');
                }}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}