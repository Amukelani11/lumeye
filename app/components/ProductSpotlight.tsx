import Link from "next/link"
import Image from "next/image"
import { Check, Star, Eye, Smile } from "lucide-react"

export default function ProductSpotlight() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-dm-sans text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Discover Your Perfect Lumeye Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From bright eyes to confident smiles, we have everything you need to illuminate your natural beauty
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Eye Serum Spotlight */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">Eye Care</span>
            </div>
            
            <h3 className="font-dm-sans text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Unlock Brighter, Younger-Looking Eyes
            </h3>
            
            <div className="relative mb-6">
              <Image
                src="/lumeye shot 5.png"
                alt="Lumeye Under Eye Serum"
                width={400}
                height={300}
                className="w-full h-auto rounded-2xl"
              />
              <div className="absolute -top-3 -right-3 bg-purple-600 text-white px-4 py-2 rounded-full text-lg font-bold">
                R299
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600">4.9/5 (2,847+ reviews)</span>
            </div>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Reduces puffiness & dark circles</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Smooths fine lines & wrinkles</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Hydrates & rejuvenates in 60 seconds</span>
              </div>
            </div>
            
            <Link 
              href="/product" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 inline-block text-center"
            >
              Learn More & Shop Eye Serum
            </Link>
          </div>

          {/* GlowSmile Spotlight */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Smile className="w-5 h-5 text-pink-600" />
              <span className="text-sm font-medium text-pink-600">Smile Care</span>
            </div>
            
            <h3 className="font-dm-sans text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Achieve an Instantly Brighter Smile
            </h3>
            
            <div className="relative mb-6">
              <Image
                src="/lumeye teeth 1.png"
                alt="Lumeye GlowSmile - Instant Violet Whitening Drops"
                width={400}
                height={300}
                className="w-full h-auto rounded-2xl"
              />
              <div className="absolute -top-3 -right-3 bg-pink-600 text-white px-4 py-2 rounded-full text-lg font-bold">
                R229
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600">4.8/5 (1,234+ reviews)</span>
            </div>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Neutralizes yellow tones in seconds</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">No sensitivity, enamel-safe formula</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Reveals a visibly whiter, confident smile</span>
              </div>
            </div>
            
            <Link 
              href="/glowsmile" 
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-300 inline-block text-center"
            >
              Learn More & Shop GlowSmile
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 