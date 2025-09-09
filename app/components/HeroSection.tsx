import Link from "next/link"
import Image from "next/image"
import { Shield, Truck, Clock, Star, Sparkles } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-white to-pink-50 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-slide-up">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">Illuminate Your Beauty</span>
            </div>
            
            <h1 className="font-dm-sans text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Lumeye: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Illuminate Your Beauty
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Targeted Skincare & Smile Care for a Confident You
            </p>
            
            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Safe & Gentle</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>Free SA Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-orange-600" />
                <span>Instant Results</span>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">4.9/5</span>
                </div>
                <span className="text-xs">from 2,847+ customers</span>
              </div>
            </div>

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
              <Link href="/product" className="btn-primary inline-block text-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Shop Eye Serum - R159
              </Link>
              <Link href="/glowsmile" className="btn-secondary inline-block text-center bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-50">
                Shop GlowSmile - R199
              </Link>
            </div>
            
            <div className="text-center lg:text-left">
              <p className="text-sm text-gray-500">Free nationwide shipping</p>
              <p className="text-xs text-gray-400">30-day money-back guarantee</p>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
              {/* Eye Serum Product */}
              <div className="relative bg-white rounded-3xl p-6 shadow-2xl">
                <Image
                  src="/lumeye shot 5.png"
                  alt="Lumeye Under Eye Serum - Erase Puffiness in 60 Seconds"
                  width={200}
                  height={250}
                  className="w-full h-auto rounded-2xl"
                  priority
                />
                <div className="absolute -top-3 -right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  R159
                </div>
                <div className="absolute -bottom-3 -left-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Eye Care
                </div>
              </div>
              
              {/* GlowSmile Product */}
              <div className="relative bg-white rounded-3xl p-6 shadow-2xl">
                <Image
                  src="/lumeye teeth 1.png"
                  alt="Lumeye GlowSmile - Instant Violet Whitening Drops"
                  width={200}
                  height={250}
                  className="w-full h-auto rounded-2xl"
                />
                <div className="absolute -top-3 -right-3 bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  R199
                </div>
                <div className="absolute -bottom-3 -left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Smile Care
                </div>
              </div>
            </div>
            
            {/* Floating benefit badges */}
            <div className="absolute -top-8 -left-8 bg-white rounded-full p-3 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">60s</div>
                <div className="text-xs text-gray-600">Eye Results</div>
              </div>
            </div>
            
            <div className="absolute -bottom-8 -right-8 bg-white rounded-full p-3 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">Instantly</div>
                <div className="text-xs text-gray-600">Brighter Smile</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
