import type { Metadata } from "next"
import ProductGallery from "../components/ProductGallery"
import ProductInfo from "../components/ProductInfo"
import ProductTabs from "../components/ProductTabs"
import ProductEducation from "../components/ProductEducation"
import ProductReviews from "../components/ProductReviews"
import ProductStructuredData from "../components/ProductStructuredData"
import Footer from "../components/Footer"
import BeforeAfterGallery from "../components/BeforeAfterGallery"

export const metadata: Metadata = {
  title: "Lumeye Under Eye Serum | Buy Online | R159 (Save R140) | Free Shipping South Africa",
  description: "Buy Lumeye Under Eye Serum online. Was R299, Now R159 - Save R140! Clinically proven to reduce puffiness and brighten dark circles in 60 seconds. 4.9/5 stars from 127+ reviews. Dermatologist tested, cruelty-free. Free shipping across South Africa.",
  keywords: "buy under eye serum, eye cream online, depuffing serum South Africa, dark circles treatment, eye care products, skincare online, anti-aging serum, brightening cream, caffeine eye serum, vitamin C eye cream, sale, discount",
  alternates: {
    canonical: '/product',
  },
  openGraph: {
    title: "Lumeye Under Eye Serum | Buy Online | R159 (Save R140) | Free Shipping South Africa",
    description: "Buy Lumeye Under Eye Serum online. Was R299, Now R159 - Save R140! Clinically proven to reduce puffiness and brighten dark circles in 60 seconds. 4.9/5 stars from 127+ reviews.",
    url: 'https://lumeye.co.za/product',
    type: 'website',
    images: [
      {
        url: '/product-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lumeye Under Eye Serum - Buy Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Lumeye Under Eye Serum | Buy Online | R159 (Save R140) | Free Shipping South Africa",
    description: "Buy Lumeye Under Eye Serum online. Was R299, Now R159 - Save R140! Clinically proven to reduce puffiness and brighten dark circles in 60 seconds. 4.9/5 stars from 127+ reviews.",
    images: ['/product-twitter-image.jpg'],
  },
  other: {
    'product:price:amount': '159',
    'product:price:currency': 'ZAR',
    'product:availability': 'in stock',
    'product:condition': 'new',
    'product:retailer_item_id': 'lumeye-serum-001',
    'product:brand': 'Lumeye',
    'product:category': 'Beauty & Personal Care > Skincare > Eye Care',
    'product:original_price:amount': '299',
    'product:original_price:currency': 'ZAR',
  },
}

export default function ProductPage() {
  return (
    <>
      <ProductStructuredData />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <ProductGallery />
          <ProductInfo />
        </div>
        <ProductTabs />
        {/* Before/After Gallery Section */}
        <div className="my-16">
          <BeforeAfterGallery />
        </div>
        <ProductEducation />
        {/* Customer Reviews Section */}
        <ProductReviews />
      </main>
      <Footer />
    </>
  )
}
