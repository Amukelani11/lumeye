import Link from "next/link"
import Image from "next/image"
import { Shield, Truck, Clock, Star } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-beige to-blush min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-slide-up">
            <h1 className="font-dm-sans text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Depuff. <br />
              <span className="text-pink-600">Brighten.</span> <br />
              Glow.
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Achieve refreshed, radiant eyes in just 60 seconds with Lumeye Eye Serum.
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
                <span>60-Second Results</span>
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/product" className="btn-primary inline-block text-center">
                Shop Now - R299
              </Link>
              <div className="text-center lg:text-left">
                <p className="text-sm text-gray-500">Free nationwide shipping</p>
                <p className="text-xs text-gray-400">30-day money-back guarantee</p>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
              <Image
                src="/lumeye shot 5.png"
                alt="Lumeye Under Eye Serum - Erase Puffiness in 60 Seconds"
                width={400}
                height={500}
                className="w-full h-auto rounded-2xl"
                priority
              />
              <div className="absolute -top-4 -right-4 bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                R299
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                Cruelty-Free
              </div>
            </div>
            
            {/* Floating benefit badges */}
            <div className="absolute -top-8 -left-8 bg-white rounded-full p-3 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">60s</div>
                <div className="text-xs text-gray-600">Results</div>
              </div>
            </div>
            
            <div className="absolute -bottom-8 -right-8 bg-white rounded-full p-3 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-xs text-gray-600">Natural</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
