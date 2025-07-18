import type { Metadata } from "next"
import HeroSection from "./components/HeroSection"
import BeforeAfterGallery from "./components/BeforeAfterGallery"
import HowItWorks from "./components/HowItWorks"
import BenefitsGrid from "./components/BenefitsGrid"
import UrgencyCTA from "./components/UrgencyCTA"
import Testimonials from "./components/Testimonials"
import Footer from "./components/Footer"

export const metadata: Metadata = {
  title: "Lumeye Under Eye Serum | Transform Tired Eyes in 60 Seconds | South Africa",
  description: "Transform tired eyes instantly with Lumeye Under Eye Serum. Clinically proven to reduce puffiness and brighten dark circles in just 60 seconds. 4.9/5 stars from 127+ reviews. Dermatologist tested, cruelty-free. Free shipping in South Africa.",
  keywords: "under eye serum, eye cream, depuffing serum, dark circles treatment, eye care, skincare, anti-aging, brightening serum, South Africa, dermatologist tested, cruelty-free, sensitive skin, caffeine serum, vitamin C serum, hyaluronic acid, 60 second results",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Lumeye Under Eye Serum | Transform Tired Eyes in 60 Seconds | South Africa",
    description: "Transform tired eyes instantly with Lumeye Under Eye Serum. Clinically proven to reduce puffiness and brighten dark circles in just 60 seconds. 4.9/5 stars from 127+ reviews.",
    url: 'https://lumeye.co.za',
    type: 'website',
    images: [
      {
        url: '/homepage-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lumeye Under Eye Serum - Transform tired eyes in 60 seconds',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Lumeye Under Eye Serum | Transform Tired Eyes in 60 Seconds | South Africa",
    description: "Transform tired eyes instantly with Lumeye Under Eye Serum. Clinically proven to reduce puffiness and brighten dark circles in just 60 seconds. 4.9/5 stars from 127+ reviews.",
    images: ['/homepage-twitter-image.jpg'],
  },
}

export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <BeforeAfterGallery />
        <HowItWorks />
        <BenefitsGrid />
        <UrgencyCTA />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
