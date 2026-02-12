import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { CartProvider } from "@/contexts/CartContext";
import { CartModal } from "@/components/cart/CartModal";
import { DeliveryBanner } from "@/components/ui/DeliveryBanner";
import { WebDesignAttribution } from "@/components/ui/WebDesignAttribution";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-background text-foreground antialiased selection:bg-orange-500/30`}>
        <CartProvider>
          {/* 1. Floating Delivery Banner (Top) */}
          <div className="fixed top-0 inset-x-0 z-[60]">
             <DeliveryBanner />
          </div>

          {/* 2. Floating Glass Header */}
          <div className="fixed top-12 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
            <div className="glass w-full max-w-6xl h-16 rounded-full flex items-center justify-between px-2 pointer-events-auto shadow-2xl shadow-black/50">
               <Header />
            </div>
          </div>

          {/* 3. Main Content Area */}
          <main className="min-h-screen pt-32 pb-24 md:pb-12">
            {children}
          </main>

          {/* 4. Footer & Attribution */}
          <Footer />
          <div className="pb-24 md:pb-0">
            <WebDesignAttribution variant="floating" />
          </div>

          {/* 5. Mobile Navigation (The "App Dock") */}
          <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center px-6 md:hidden">
            <div className="glass w-full h-16 rounded-[2rem] shadow-2xl shadow-orange-500/10">
               <MobileNav />
            </div>
          </div>

          {/* 6. Modals */}
          <CartModal />
        </CartProvider>
      </body>
    </html>
  );
}
