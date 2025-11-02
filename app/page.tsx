import type { Metadata } from "next"
import HeroSection from "./components/HeroSection"
import TechnologySection from "./components/TechnologySection"
import BeforeAfterGallery from "./components/BeforeAfterGallery"
import CoreDuoSection from "./components/CoreDuoSection"
import HowItWorks from "./components/HowItWorks"
import BenefitsGrid from "./components/BenefitsGrid"
import UrgencyCTA from "./components/UrgencyCTA"
import Footer from "./components/Footer"

export const metadata: Metadata = {
  title: "Lumeye | Advanced Skincare Meets Light Therapy | LED Skincare Devices South Africa",
  description: "Advanced skincare meets light therapy. Lumeye Glow Wand and Glow Gel deliver clinical-grade LED innovation designed to smooth, brighten, and rejuvenate your skin — from home. 4.9/5 stars from 127+ reviews. Free shipping in South Africa.",
  keywords: "LED light therapy, red light therapy device, skincare device, LED wand, at-home facial, collagen production, skin rejuvenation, anti-aging device, South Africa, skincare technology, LED therapy wand",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Lumeye | Advanced Skincare Meets Light Therapy | LED Skincare Devices South Africa",
    description: "Advanced skincare meets light therapy. Lumeye Glow Wand and Glow Gel deliver clinical-grade LED innovation designed to smooth, brighten, and rejuvenate your skin — from home.",
    url: 'https://lumeye.co.za',
    type: 'website',
    images: [
      {
        url: '/homepage-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lumeye Glow Wand - Advanced LED Light Therapy Device',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Lumeye | Advanced Skincare Meets Light Therapy | LED Skincare Devices South Africa",
    description: "Advanced skincare meets light therapy. Lumeye Glow Wand and Glow Gel deliver clinical-grade LED innovation designed to smooth, brighten, and rejuvenate your skin — from home.",
    images: ['/homepage-twitter-image.jpg'],
  },
}

export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <TechnologySection />
        <BeforeAfterGallery />
        <CoreDuoSection />
        <HowItWorks />
              <BenefitsGrid />
              <UrgencyCTA />
      </main>
      <Footer />
    </>
  )
}
