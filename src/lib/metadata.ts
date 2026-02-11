import { Metadata } from 'next';

// Base metadata configuration
export const baseMetadata: Metadata = {
  title: "TK Afro Kitchen | Authentic African Food Delivery Milton Keynes | 5-Star Hygiene",
  description: "Experience authentic African cuisine delivered fresh to your door. 5-star hygiene rated, £70 minimum order, UK mainland delivery. Order Nigerian Jollof Rice, Ghanaian dishes & more today!",
  keywords: "African food delivery, Nigerian cuisine, Ghanaian food, Milton Keynes, Jollof rice, authentic African food, UK delivery, 5-star hygiene, African restaurant",
  authors: [{ name: "TK Afro Kitchen" }],
  creator: "TK Afro Kitchen",
  publisher: "TK Afro Kitchen",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tkafrokitchen.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "TK Afro Kitchen | Authentic African Food Delivery Milton Keynes",
    description: "Experience authentic African cuisine delivered fresh to your door. 5-star hygiene rated, £70 minimum order, UK mainland delivery. Order Nigerian Jollof Rice, Ghanaian dishes & more today!",
    url: 'https://tkafrokitchen.com',
    siteName: 'TK Afro Kitchen',
    images: [
      {
        url: '/images/brand/tklogo.jpg',
        width: 1200,
        height: 630,
        alt: 'TK Afro Kitchen - Authentic African Cuisine',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TK Afro Kitchen | Authentic African Food Delivery',
    description: 'Experience authentic African cuisine delivered fresh to your door. 5-star hygiene rated, UK mainland delivery.',
    images: ['/images/brand/tklogo.jpg'],
  },
  icons: {
    icon: '/icon',
    shortcut: '/favicon.jpg',
    apple: '/apple-icon',
  },
  manifest: '/manifest.json',
};

// Page-specific metadata configurations
export const pageMetadata = {
  home: {
    title: "TK Afro Kitchen | Authentic African Food Delivery Milton Keynes | 5-Star Hygiene",
    description: "Experience authentic African cuisine delivered fresh to your door. 5-star hygiene rated, £70 minimum order, UK mainland delivery. Order Nigerian Jollof Rice, Ghanaian dishes & more today!",
    keywords: "African food delivery, Nigerian cuisine, Ghanaian food, Milton Keynes, Jollof rice, authentic African food, UK delivery, 5-star hygiene, African restaurant",
  },
  menu: {
    title: "Our Menu | Authentic African Dishes | TK Afro Kitchen",
    description: "Explore our authentic African menu featuring Nigerian Jollof Rice, Ghanaian Banku, and traditional West African dishes. Fresh ingredients, 5-star hygiene, UK delivery. Order online today!",
    keywords: "African menu, Nigerian food, Ghanaian cuisine, Jollof rice, Banku, West African dishes, African restaurant menu, Milton Keynes",
  },
  about: {
    title: "About Us | TK Afro Kitchen | Authentic African Cuisine Story",
    description: "TK Afro Kitchen brings authentic African flavors to UK homes. 5-star hygiene certified, family recipes, fresh ingredients. Learn our story and commitment to quality African cuisine.",
    keywords: "TK Afro Kitchen story, African restaurant Milton Keynes, Nigerian food history, authentic African cuisine, family recipes, 5-star hygiene",
  },
  contact: {
    title: "Contact Us | TK Afro Kitchen | African Food Delivery Milton Keynes",
    description: "Contact TK Afro Kitchen for African food delivery across UK. 5-star hygiene rated, £70 minimum order. Call us or order online for authentic Nigerian & Ghanaian cuisine.",
    keywords: "contact TK Afro Kitchen, African food delivery contact, Nigerian restaurant Milton Keynes, Ghanaian food delivery, catering services",
  },
  frozen: {
    title: "Frozen African Meals | TK Afro Kitchen | Ready-to-Eat Nigerian Food",
    description: "Order frozen African meals from TK Afro Kitchen. Authentic Nigerian and Ghanaian dishes, ready-to-eat, UK delivery. Perfect for quick meals with authentic taste.",
    keywords: "frozen African food, ready-to-eat Nigerian meals, frozen Ghanaian food, African meal prep, Milton Keynes delivery",
  },
  catering: {
    title: "African Catering Services | TK Afro Kitchen | Events & Parties Milton Keynes",
    description: "Professional African catering services for events, parties, and corporate functions. Authentic Nigerian cuisine, 5-star hygiene, Milton Keynes and UK delivery.",
    keywords: "African catering, Nigerian catering, event catering Milton Keynes, corporate catering, party food, African restaurant catering",
  },
  faqs: {
    title: "FAQs | TK Afro Kitchen | African Food Delivery Questions",
    description: "Frequently asked questions about TK Afro Kitchen's African food delivery service. Ordering, delivery, hygiene standards, and more. Get answers to all your questions.",
    keywords: "TK Afro Kitchen FAQ, African food delivery questions, Nigerian restaurant FAQ, delivery information, ordering help",
  },
  pricing: {
    title: "Pricing & Value Calculator | TK Afro Kitchen | African Food Menu Prices",
    description: "Complete pricing guide for TK Afro Kitchen's authentic African menu. Value calculator, portion guides, and best value recommendations. Transparent pricing for all dishes.",
    keywords: "African food prices, Nigerian restaurant pricing, menu prices Milton Keynes, value calculator, portion guides",
  },
  services: {
    title: "Our Services | TK Afro Kitchen | African Food Delivery & Catering",
    description: "Comprehensive African food services including delivery, catering, frozen meals, and custom menus. 5-star hygiene rated, UK mainland delivery, Milton Keynes based.",
    keywords: "African food services, delivery services, catering services, custom menus, frozen meals, Milton Keynes",
  },
};

// Helper function to generate metadata for any page
export function generatePageMetadata(page: keyof typeof pageMetadata): Metadata {
  const pageData = pageMetadata[page];
  
  return {
    ...baseMetadata,
    title: pageData.title,
    description: pageData.description,
    keywords: pageData.keywords,
    openGraph: {
      ...baseMetadata.openGraph,
      title: pageData.title,
      description: pageData.description,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: pageData.title,
      description: pageData.description,
    },
  };
} 