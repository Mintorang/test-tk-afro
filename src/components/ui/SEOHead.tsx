'use client';

import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
}

export function SEOHead({
  title = "TK Afro Kitchen | Authentic African Food Delivery Milton Keynes | 5-Star Hygiene",
  description = "Experience authentic African cuisine delivered fresh to your door. 5-star hygiene rated, £70 minimum order, UK mainland delivery. Order Nigerian Jollof Rice, Ghanaian dishes & more today!",
  keywords = "African food delivery, Nigerian cuisine, Ghanaian food, Milton Keynes, Jollof rice, authentic African food, UK delivery, 5-star hygiene, African restaurant",
  canonical = "https://tkafrokitchen.com",
  ogImage = "/images/brand/tklogo.jpg",
  ogType = "website"
}: SEOHeadProps) {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://tkafrokitchen.com${ogImage}`} />
      <meta property="og:site_name" content="TK Afro Kitchen" />
      <meta property="og:locale" content="en_GB" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`https://tkafrokitchen.com${ogImage}`} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="TK Afro Kitchen" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Local Business Schema Hints */}
      <meta name="geo.region" content="GB-MIK" />
      <meta name="geo.placename" content="Milton Keynes" />
      <meta name="geo.position" content="52.0406;-0.7594" />
      <meta name="ICBM" content="52.0406, -0.7594" />
    </Head>
  );
} 