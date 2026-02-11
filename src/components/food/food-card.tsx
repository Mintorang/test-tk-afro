'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Flame } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { ErrorBoundary, CartErrorFallback } from "@/components/error/ErrorBoundary";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

interface SizeOption {
  size: string;
  price: number;
  portionInfo: string;
}

interface FoodCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  sizeOptions: SizeOption[];
  defaultSizeIndex: number;
  showSpiceLevel?: boolean;
}

export function FoodCard({
  id,
  name,
  description,
  imageUrl,
  category,
  sizeOptions,
  defaultSizeIndex,
  showSpiceLevel = false
}: FoodCardProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(defaultSizeIndex);
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState('medium');
  const [isOpen, setIsOpen] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const spiceLevels = [
    { value: 'mild', label: 'Mild', icon: '🌶️' },
    { value: 'medium', label: 'Medium', icon: '🌶️🌶️' },
    { value: 'hot', label: 'Hot', icon: '🌶️🌶️🌶️' },
    { value: 'extra-hot', label: 'Extra Hot', icon: '🌶️🌶️🌶️🌶️' }
  ];

  const handleAddToCart = () => {
    try {
      const selectedSize = sizeOptions[selectedSizeIndex];
      
      if (!selectedSize) {
        console.error('No size selected');
        return;
      }
      
      const cartItem = {
        id,
        name,
        description,
        imageUrl,
        category,
        price: selectedSize.price,
        quantity: 1,
        portionInfo: selectedSize.portionInfo,
        selectedSize: {
          size: selectedSize.size,
          price: selectedSize.price,
          portionInfo: selectedSize.portionInfo
        },
        spiceLevel: showSpiceLevel ? selectedSpiceLevel : undefined
      };
      
      console.log('Adding item to cart:', cartItem);
      setIsAddingToCart(true);
      
      // Add to cart (synchronous function)
      addToCart(cartItem);
      
      // Open cart modal
      setIsCartOpen(true);
      
      // Close cart modal after a short delay
      setTimeout(() => {
        setIsCartOpen(false);
      }, 1000);
      
      setIsAddingToCart(false);
      setIsOpen(false); // Close the sheet
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setIsAddingToCart(false);
    }
  };

  return (
    <ErrorBoundary fallback={CartErrorFallback}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Card className="group bg-[#1e1e1e] backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-orange-900/20 cursor-pointer">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg">
              <Image
                src={imageUrl}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {showSpiceLevel && (
                <div className="absolute top-2 right-2 bg-orange-500/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white flex items-center gap-1">
                  <Flame className="h-3 w-3" />
                  Customizable
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="text-gradient text-lg mb-1">{name}</h3>
                  <p className="text-sm text-slate-300 line-clamp-2">{description}</p>
                  {showSpiceLevel && (
                    <p className="text-xs text-orange-400 mt-1 flex items-center gap-1">
                      <Flame className="h-3 w-3" />
                      Spice level customizable
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="text-right">
                    <div className="text-orange-400 font-medium">
                      From £{sizeOptions[0].price.toFixed(2)}
                    </div>
                    <div className="text-xs text-slate-400">
                      {sizeOptions.length} size options
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </SheetTrigger>
        
        <SheetContent 
          side="right" 
          className="w-full sm:max-w-md bg-[#1e1e1e] border-l border-orange-900/20 overflow-y-auto"
          style={{ 
            height: '100vh',
            maxHeight: '100vh',
            paddingBottom: 'env(safe-area-inset-bottom)'
          }}
        >
          <div className="flex flex-col h-full">
            <SheetHeader className="flex-shrink-0">
              <SheetTitle className="text-orange-400 text-lg sm:text-xl">{name}</SheetTitle>
            </SheetHeader>
            
            <div className="flex-1 overflow-y-auto pb-20">
              <div className="mt-6">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-slate-200 mb-3">Select Size</h3>
                  <div className="space-y-3">
                    {sizeOptions.map((option, index) => (
                      <button
                        key={option.size}
                        onClick={() => setSelectedSizeIndex(index)}
                        className={`w-full p-4 rounded-lg border transition-all ${
                          index === selectedSizeIndex
                            ? 'border-orange-500 bg-orange-500/10'
                            : 'border-gray-700 hover:border-orange-500/50'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="text-left">
                            <p className="font-medium text-slate-200 capitalize">{option.size}</p>
                            <p className="text-sm text-slate-400">{option.portionInfo}</p>
                          </div>
                          <p className="text-lg font-semibold text-orange-400">
                            £{option.price.toFixed(2)}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {showSpiceLevel && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-slate-200 mb-3 flex items-center gap-2">
                      <Flame className="h-5 w-5 text-orange-400" />
                      Choose Spice Level
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {spiceLevels.map((level) => (
                        <button
                          key={level.value}
                          onClick={() => setSelectedSpiceLevel(level.value)}
                          className={`p-3 rounded-lg border transition-all text-center ${
                            selectedSpiceLevel === level.value
                              ? 'border-orange-500 bg-orange-500/10'
                              : 'border-gray-700 hover:border-orange-500/50'
                          }`}
                        >
                          <div className="text-lg mb-1">{level.icon}</div>
                          <p className="text-sm font-medium text-slate-200">{level.label}</p>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      Don't worry! You can always request adjustments when ordering.
                    </p>
                  </div>
                )}
                
                <div className="mt-6">
                  <p className="text-sm text-slate-300 mb-4">{description}</p>
                </div>
              </div>
            </div>
            
            {/* Fixed Add to Cart Button */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#1e1e1e] border-t border-orange-900/20 p-4 pb-safe">
              <AnimatedButton
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-3 sm:py-4 text-sm sm:text-base font-semibold"
              >
                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </AnimatedButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </ErrorBoundary>
  );
}