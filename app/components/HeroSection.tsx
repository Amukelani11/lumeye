import Link from "next/link"
import Image from "next/image"
import { Shield, Truck, Clock, Star } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-pink-50 to-rose-50 min-h-screen flex items-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-100 rounded-full opacity-15 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-100 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left animate-slide-up">
            <div className="mb-6">
              <span className="inline-block bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                ✨ New Formula - Even Faster Results
              </span>
            </div>

            <h1 className="font-dm-sans text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Transform Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
                Under-Eye Area
              </span>
              <br />In Just 60 Seconds
            </h1>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed font-light max-w-lg">
              Experience clinically proven results with our advanced peptide technology.
              <span className="font-semibold text-gray-900"> Depuff, brighten, and glow</span> with every application.
            </p>
            
            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Dermatologist Tested</span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Truck className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Free SA Shipping</span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">60-Second Results</span>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-10">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-200 to-rose-300 border-3 border-white shadow-md"></div>
                ))}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 to-rose-400 border-3 border-white shadow-md flex items-center justify-center">
                  <span className="text-xs font-bold text-white">+</span>
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-2 font-bold text-gray-900">4.9/5</span>
                </div>
                <span className="text-sm text-gray-600 font-medium">Trusted by 2,847+ customers</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
              <Link href="/product" className="group">
                <button className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group-hover:from-pink-700 group-hover:to-rose-700">
                  ✨ Shop Now - R159 ✨
                </button>
              </Link>
              <div className="text-center lg:text-left bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-800">Free nationwide shipping</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-800">30-day money-back guarantee</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 shadow-2xl border border-gray-100">
              {/* Product Image Container */}
              <div className="relative mb-6">
                <Image
                  src="/lumeye shot 5.png"
                  alt="Lumeye Under Eye Serum - Professional Results in 60 Seconds"
                  width={400}
                  height={500}
                  className="w-full h-auto rounded-2xl shadow-lg"
                  priority
                />
                {/* Product badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  R159
                </div>
                <div className="absolute -bottom-3 -left-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  ✨ Cruelty-Free
                </div>
              </div>

              {/* Product Features */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-pink-50 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-pink-600 mb-1">60s</div>
                  <div className="text-xs text-gray-600 font-medium">Fast Results</div>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-green-600 mb-1">100%</div>
                  <div className="text-xs text-gray-600 font-medium">Natural</div>
                </div>
              </div>
            </div>

            {/* Floating benefit badges */}
            <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
              <div className="text-center">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-pink-600 font-bold text-sm">✓</span>
                </div>
                <div className="text-sm font-bold text-gray-800">Proven Results</div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
              <div className="text-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 font-bold text-sm">✓</span>
                </div>
                <div className="text-sm font-bold text-gray-800">Dermatologist Tested</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
