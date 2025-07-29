import type { Metadata } from "next"
import HeroSection from "./components/HeroSection"
import MissionSection from "./components/MissionSection"
import ProductSpotlight from "./components/ProductSpotlight"
import Testimonials from "./components/Testimonials"
import ValueProposition from "./components/ValueProposition"
import Footer from "./components/Footer"
import HomePageTracker from "./components/HomePageTracker"

export const metadata: Metadata = {
  title: "Lumeye: Illuminate Your Beauty | Targeted Skincare & Smile Care | South Africa",
  description: "Discover Lumeye's expertly formulated beauty solutions. From our revolutionary under-eye serum to GlowSmile instant whitening drops, we help you reveal your natural radiance. Proudly South African, scientifically proven, cruelty-free.",
  keywords: "Lumeye, beauty, skincare, under eye serum, GlowSmile, whitening drops, South Africa, natural beauty, confidence, radiance, cruelty-free, dermatologist tested, instant results, smile care, eye care",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Lumeye: Illuminate Your Beauty | Targeted Skincare & Smile Care | South Africa",
    description: "Discover Lumeye's expertly formulated beauty solutions. From our revolutionary under-eye serum to GlowSmile instant whitening drops, we help you reveal your natural radiance.",
    url: 'https://lumeye.co.za',
    type: 'website',
    images: [
      {
        url: '/homepage-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lumeye - Illuminate Your Beauty with targeted skincare and smile care',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Lumeye: Illuminate Your Beauty | Targeted Skincare & Smile Care | South Africa",
    description: "Discover Lumeye's expertly formulated beauty solutions. From our revolutionary under-eye serum to GlowSmile instant whitening drops, we help you reveal your natural radiance.",
    images: ['/homepage-twitter-image.jpg'],
  },
}

export default function HomePage() {
  return (
    <>
      <HomePageTracker />
      <main>
        <HeroSection />
        <MissionSection />
        <ProductSpotlight />
        <Testimonials />
        <ValueProposition />
      </main>
      <Footer />
    </>
  )
}
