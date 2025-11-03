import Link from "next/link"
import Image from "next/image"
import { Shield, Truck, Clock, Star } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-white via-pink-50/30 to-white min-h-screen flex items-center overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left animate-slide-up">
            <div className="mb-6">
              <span className="inline-block bg-pink-50 text-pink-700 px-4 py-2 rounded-full text-xs font-medium mb-4">
                Advanced Skincare Technology
              </span>
            </div>

            <h1 className="font-dm-sans text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Advanced Skincare <br />
              <span className="text-pink-600">Meets Light Therapy</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              Clinically inspired LED innovation designed to smooth, brighten, and rejuvenate your skin — from home.
            </p>
            
            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10">
              <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-lg border border-gray-200">
                <Shield className="w-4 h-4 text-pink-600" />
                <span className="text-sm font-medium text-gray-700">Dermatologist Tested</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-lg border border-gray-200">
                <Truck className="w-4 h-4 text-pink-600" />
                <span className="text-sm font-medium text-gray-700">Free SA Shipping</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-lg border border-gray-200">
                <Clock className="w-4 h-4 text-pink-600" />
                <span className="text-sm font-medium text-gray-700">5-Minute Treatment</span>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-10">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-2 font-bold text-gray-900">4.9/5</span>
              </div>
              <span className="text-sm text-gray-600 font-medium">Trusted by 2,847+ customers</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Link href="/product">
                <button className="bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-pink-700 transition-colors shadow-lg hover:shadow-xl">
                  Shop the Glow Kit
                </button>
              </Link>
              <Link href="/product">
                <button className="bg-white text-gray-900 border-2 border-gray-300 px-8 py-4 rounded-lg font-semibold text-base hover:border-gray-400 transition-colors">
                  Learn More
                </button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-200">
              {/* Product Image Container */}
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src="/lumeyewandhero.png"
                  alt="Lumeye Glow Wand - Advanced LED Light Therapy Device"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                  quality={75}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
