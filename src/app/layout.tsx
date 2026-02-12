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
          {/* Header Section: Now fills top of page without gaps */}
          <div className="relative z-[100] w-full flex flex-col">
             <DeliveryBanner />
             <Header /> 
          </div>

          {/* Main Content: Removed the large pt-32 padding so it flows naturally after the header */}
          <main className="min-h-screen relative overflow-x-hidden">
            {children}
          </main>

          <Footer />

          {/* Blow up the attribution bit and move it out of floating mode */}
          <div className="py-8 bg-zinc-950 flex justify-center border-t border-white/5">
            <WebDesignAttribution variant="expanded" className="scale-110" />
          </div>

          <MobileNav />
          <CartModal />
        </CartProvider>
      </body>
    </html>
  );
}
