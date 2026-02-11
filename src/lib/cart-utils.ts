import { CartItem } from '@/contexts/CartContext';
import { MenuItem, SizeOption } from '@/data/sample-menu';
import { featuredDishes } from "@/data/sample-menu";
import { notFound } from "next/navigation";

// Helper function to create a cart item with all required properties
export function createCartItem(
  item: MenuItem,
  quantity: number = 1,
  selectedSize?: SizeOption
): CartItem {
  // Defensive: ensure item.sizeOptions exists and has at least one entry
  const sizeOpts = item.sizeOptions && item.sizeOptions.length > 0 ? item.sizeOptions : [];
  const defaultIndex = typeof item.defaultSizeIndex === 'number' && item.defaultSizeIndex >= 0 && item.defaultSizeIndex < sizeOpts.length ? item.defaultSizeIndex : 0;

  // If no size is selected but item has size options, use the default (or first) safely
  const defaultSize = selectedSize || (sizeOpts.length > 0 ? sizeOpts[defaultIndex] : null);

  // Get the price from the size option or fall back to legacy item.price if present
  const itemPrice = defaultSize?.price ?? (typeof (item as any).price === 'number' ? (item as any).price : 0);

  // Create the cart item with all required properties
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    imageUrl: item.imageUrl,
    category: item.category,
    quantity: quantity,
    price: itemPrice,
    portionInfo: defaultSize?.portionInfo ?? "Single portion",
    selectedSize: {
      size: defaultSize?.size ?? "Regular",
      price: itemPrice,
      portionInfo: defaultSize?.portionInfo ?? "Single portion"
    }
  };
}

export async function generateStaticParams() {
  return featuredDishes.map(dish => ({
    id: dish.id
  }));
}

// If using the app directory (Next.js 13+ with /app), use this type:
type ProductPageProps = {
  params: {
    id: string;
  };
};

export function getProductById(id: string) {
  return featuredDishes.find(dish => dish.id === id) || null;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  const product = getProductById(id);

  if (!product) {
    return null;
  }

  const sizeOpts = product.sizeOptions && product.sizeOptions.length > 0 ? product.sizeOptions : [];
  const defaultIndex = typeof product.defaultSizeIndex === 'number' && product.defaultSizeIndex >= 0 && product.defaultSizeIndex < sizeOpts.length ? product.defaultSizeIndex : 0;
  const selected = sizeOpts.length > 0 ? sizeOpts[defaultIndex] : null;

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    imageUrl: product.imageUrl,
    category: product.category,
    price: selected?.price ?? 0,
    portionInfo: selected?.portionInfo ?? "",
    selectedSize: selected ?? null
  };
}
