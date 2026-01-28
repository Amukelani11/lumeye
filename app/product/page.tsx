import type { Metadata } from "next"
import ProductPageClient from "./ProductPageClient"
import ProductTabs from "../components/ProductTabs"
import ProductEducation from "../components/ProductEducation"
import ProductReviews from "../components/ProductReviews"
import ProductStructuredData from "../components/ProductStructuredData"
import Footer from "../components/Footer"
import BeforeAfterGallery from "../components/BeforeAfterGallery"
import BundleSection from "../components/BundleSection"
import ProductImageGallery from "../components/ProductImageGallery"

export const metadata: Metadata = {
  title: "Lumeye Glow Wand | Advanced LED Light Therapy | Free Shipping South Africa",
  description: "Buy Lumeye Glow Wand - Advanced skincare meets light therapy. Precision-engineered LED device with 660nm red light technology. Reduces fine lines, brightens skin, and promotes collagen production. 4.9/5 stars from 127+ reviews. Free shipping across South Africa.",
  keywords: "buy LED light therapy device, red light therapy wand, LED skincare device South Africa, at-home facial device, collagen production device, anti-aging LED wand, skin rejuvenation device, LED therapy online, skincare technology, red light therapy",
  alternates: {
    canonical: '/product',
  },
  openGraph: {
    title: "Lumeye Glow Wand | Advanced LED Light Therapy | Free Shipping South Africa",
    description: "Buy Lumeye Glow Wand - Advanced skincare meets light therapy. Precision-engineered LED device with 660nm red light technology. Reduces fine lines, brightens skin, and promotes collagen production. 4.9/5 stars from 127+ reviews.",
    url: 'https://lumeye.co.za/product',
    type: 'website',
    images: [
      {
        url: '/product-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lumeye Glow Wand - Advanced LED Light Therapy Device',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Lumeye Glow Wand | Advanced LED Light Therapy | Free Shipping South Africa",
    description: "Buy Lumeye Glow Wand - Advanced skincare meets light therapy. Precision-engineered LED device with 660nm red light technology. Reduces fine lines, brightens skin, and promotes collagen production. 4.9/5 stars from 127+ reviews.",
    images: ['/product-twitter-image.jpg'],
  },
  other: {
    'product:price:amount': '699',
    'product:price:currency': 'ZAR',
    'product:availability': 'in stock',
    'product:condition': 'new',
    'product:retailer_item_id': 'lumeye-glow-wand',
    'product:brand': 'Lumeye',
    'product:category': 'Beauty & Personal Care > Skincare > LED Devices',
    'product:original_price:amount': '999',
    'product:original_price:currency': 'ZAR',
  },
}

export default function ProductPage() {
  return (
    <>
      <ProductStructuredData />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32">
        <ProductPageClient />
        <ProductTabs />
        {/* Before/After Gallery Section */}
        <div className="my-16">
          <BeforeAfterGallery />
        </div>
        {/* Product Image Gallery */}
        <ProductImageGallery />
        {/* Bundle Section */}
        <div className="my-16">
          <BundleSection />
        </div>
        <ProductEducation />
        {/* Customer Reviews Section */}
        <ProductReviews />
      </main>
      <Footer />
    </>
  )
}
