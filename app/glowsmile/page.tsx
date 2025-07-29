import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Star, Check, Shield, Truck, Clock, Heart, ArrowRight } from "lucide-react"
import { Suspense } from "react"
import GlowSmileTracker from "../components/GlowSmileTracker"
import GlowSmileProductInfo from "../components/GlowSmileProductInfo"
import GlowSmileBeforeAfterGallery from "../components/GlowSmileBeforeAfterGallery"
import GlowSmileReviews from "../components/GlowSmileReviews"
import EmailCaptureWrapper from "../components/EmailCaptureWrapper"

export const metadata: Metadata = {
  title: "Lumeye GlowSmile - Instant Violet Whitening Drops | Brighten Your Smile in Seconds | South Africa",
  description: "Achieve an instantly brighter smile with Lumeye GlowSmile Instant Violet Whitening Drops. Neutralizes yellow tones in seconds with our enamel-safe, sensitivity-free formula. 4.8/5 stars from 1,234+ reviews. Free shipping in South Africa.",
  keywords: "GlowSmile, whitening drops, violet whitening, instant teeth whitening, yellow teeth, bright smile, enamel safe, sensitivity free, South Africa, color correction, purple drops, smile care, oral care, beauty",
  alternates: {
    canonical: '/glowsmile',
  },
  openGraph: {
    title: "Lumeye GlowSmile - Instant Violet Whitening Drops | Brighten Your Smile in Seconds",
    description: "Achieve an instantly brighter smile with Lumeye GlowSmile Instant Violet Whitening Drops. Neutralizes yellow tones in seconds with our enamel-safe formula.",
    url: 'https://lumeye.co.za/glowsmile',
    type: 'website',
    images: [
      {
        url: '/lumeye teeth 1.png',
        width: 1200,
        height: 630,
        alt: 'Lumeye GlowSmile - Instant Violet Whitening Drops',
      },
    ],
  },
}

function GlowSmileContent() {
  return (
    <>
      <GlowSmileTracker />
      <EmailCaptureWrapper />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Product Images */}
            <div className="space-y-6">
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                <Image
                  src="/lumeye teeth 1.png"
                  alt="Lumeye GlowSmile - Instant Violet Whitening Drops"
                  width={500}
                  height={600}
                  className="w-full h-auto rounded-2xl"
                  priority
                />
                <div className="absolute -top-4 -right-4 bg-pink-600 text-white px-4 py-2 rounded-full text-lg font-bold">
                  R199
                </div>
                <div className="absolute -bottom-4 -left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  New
                </div>
              </div>
              
              {/* Image Gallery */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-lg">
                  <Image
                    src="/lumeye teeth 2.png"
                    alt="GlowSmile usage demonstration"
                    width={150}
                    height={150}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="bg-white rounded-xl p-4 shadow-lg">
                  <Image
                    src="/lumeye teeth 4.png"
                    alt="Before using GlowSmile"
                    width={150}
                    height={150}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="bg-white rounded-xl p-4 shadow-lg">
                  <Image
                    src="/lumeye teeth 5.png"
                    alt="After using GlowSmile"
                    width={150}
                    height={150}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <GlowSmileProductInfo />
          </div>
        </div>
      </section>

      {/* Product Description */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-dm-sans text-3xl font-bold text-gray-900 mb-8 text-center">
            Discover Your Brightest Smile
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <div className="bg-purple-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">The Problem</h3>
              <p className="text-gray-700 mb-4">
                Are dull, yellow tones holding your smile back? Tired of harsh, sensitive whitening treatments that take weeks to show results?
              </p>
            </div>
            
            <div className="bg-pink-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">The Solution</h3>
              <p className="text-gray-700 mb-4">
                Introducing Lumeye GlowSmile – the revolutionary violet color-correcting drops that instantly neutralize unwanted yellow undertones, revealing a visibly brighter, more confident smile in seconds.
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h3>
              <p className="text-gray-700 mb-4">
                Inspired by the science of color theory, our purple serum counteracts yellow stains, making your teeth appear whiter without damaging enamel or causing sensitivity. It's like a purple shampoo for your teeth!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-dm-sans text-3xl font-bold text-gray-900 mb-12 text-center">
            Key Benefits
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Instant Brightness</h3>
              <p className="text-gray-600">See a noticeable difference from your very first use</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Enamel-Safe & Gentle</h3>
              <p className="text-gray-600">Formulated without harsh peroxides, perfect for sensitive teeth</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Easy & Mess-Free</h3>
              <p className="text-gray-600">Simply apply to your toothbrush and brush for 60 seconds</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Fresh Minty Taste</h3>
              <p className="text-gray-600">Leaves your mouth feeling clean and refreshed</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">On-the-Go Confidence</h3>
              <p className="text-gray-600">Compact bottle, perfect for touch-ups before events</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Proven Results</h3>
              <p className="text-gray-600">Trusted by thousands of customers for instant smile transformation</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-dm-sans text-3xl font-bold text-gray-900 mb-12 text-center">
            How to Use
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Dispense</h3>
              <p className="text-gray-600">Apply 1-2 pumps onto your toothbrush</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Brush</h3>
              <p className="text-gray-600">Brush gently for 30-60 seconds</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Rinse & Admire</h3>
              <p className="text-gray-600">Rinse and admire your instantly brighter smile!</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 italic">
              For best results, use daily or before important events
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-dm-sans text-3xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Is it permanent?</h3>
              <p className="text-gray-600">No, it's temporary color correction for instant brightening. The effects last for several hours and can be reapplied as needed.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-3">How often can I use it?</h3>
              <p className="text-gray-600">You can use GlowSmile daily. It's safe for regular use and won't damage your enamel.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Will it make my teeth purple?</h3>
              <p className="text-gray-600">No! The violet color neutralizes yellow tones, making your teeth appear whiter. The purple color washes away completely.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Is it safe for veneers/crowns?</h3>
              <p className="text-gray-600">Yes, GlowSmile is safe for all dental work including veneers, crowns, and fillings.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-3">What are the ingredients?</h3>
              <p className="text-gray-600">Our formula contains safe, enamel-friendly ingredients including purified water, natural violet colorants, and mint flavoring.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After Gallery */}
      <GlowSmileBeforeAfterGallery />

      {/* Customer Reviews */}
      <GlowSmileReviews />

      {/* Bundle Offer */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-dm-sans text-3xl font-bold mb-6">
            Complete Your Lumeye Collection
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get the "Lumeye Glow Duo" - Eye Serum + GlowSmile for the ultimate beauty transformation
          </p>
          <div className="text-3xl font-bold mb-8">
            <span className="line-through opacity-70">R528</span>
            <span className="ml-4">R449</span>
            <span className="text-lg ml-2 opacity-90">(Save R79)</span>
          </div>
          <Link 
            href="/checkout?bundle=glow-duo" 
            className="bg-white text-purple-600 py-4 px-8 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            Shop the Bundle
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}

export default function GlowSmilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GlowSmileContent />
    </Suspense>
  )
} 