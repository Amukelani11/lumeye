import { Star, Quote, CheckCircle, Clock, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Filter testimonials to only include those with profile images
const testimonialsWithImages = [
  {
    name: "Lindiwe M.",
    location: "Johannesburg",
    age: "29",
    rating: 5,
    text: "I don't even need concealer anymore! This serum has completely transformed my under-eye area. I use it every morning and my colleagues keep asking if I've been on vacation.",
    initials: "LM",
    timeUsed: "3 months",
    verified: true,
    profileImage: "/placeholder-user.jpg"
  },
  {
    name: "Sarah K.",
    location: "Cape Town",
    age: "34",
    rating: 5,
    text: "The results are instant! My eyes look so much brighter and more awake. Perfect for my morning routine before important meetings. Worth every cent!",
    initials: "SK",
    timeUsed: "6 months",
    verified: true,
    profileImage: "/placeholder-user.jpg"
  },
  {
    name: "Priya D.",
    location: "Durban",
    age: "27",
    rating: 5,
    text: "Finally found something that works for my sensitive skin. No irritation and amazing results. I've tried everything before this - nothing compares!",
    initials: "PD",
    timeUsed: "2 months",
    verified: true,
    profileImage: "/placeholder-user.jpg"
  },
  {
    name: "Michelle R.",
    location: "Pretoria",
    age: "31",
    rating: 5,
    text: "As a mom of two, I'm always tired. This serum is a game-changer! My dark circles disappear in seconds and I look refreshed even on 4 hours of sleep.",
    initials: "MR",
    timeUsed: "4 months",
    verified: true,
    profileImage: "/placeholder-user.jpg"
  },
  {
    name: "Zinhle N.",
    location: "Bloemfontein",
    age: "26",
    rating: 5,
    text: "I was skeptical about the 60-second claim, but it really works! My puffiness disappears immediately. The refillable bottle is also a huge plus for the environment.",
    initials: "ZN",
    timeUsed: "1 month",
    verified: true,
    profileImage: "/placeholder-user.jpg"
  },
  {
    name: "Amanda T.",
    location: "Port Elizabeth",
    age: "33",
    rating: 5,
    text: "Contact lens wearer here - this is the only eye product that doesn't irritate my eyes. Plus the results are incredible. My husband noticed the difference immediately!",
    initials: "AT",
    timeUsed: "5 months",
    verified: true,
    profileImage: "/placeholder-user.jpg"
  },
]

export default function Testimonials() {
  return (
    <section className="section-padding bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-6">
          <span className="inline-block bg-white text-rose-800 px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
            Customer Love
          </span>
        </div>
        <h2 className="font-dm-sans text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Real <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">Results</span> from Real People
        </h2>
        <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
          Join over 2,800 happy customers who've discovered the secret to brighter, more awake-looking eyes
        </p>
        
        {/* Trust Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-pink-600 font-bold text-lg">⭐</span>
            </div>
            <div className="text-3xl font-bold text-pink-700 mb-2">4.9/5</div>
            <p className="text-gray-700 font-medium">Average Rating</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 font-bold text-lg">👥</span>
            </div>
            <div className="text-3xl font-bold text-green-700 mb-2">2,847+</div>
            <p className="text-gray-700 font-medium">Happy Customers</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-lg">⚡</span>
            </div>
            <div className="text-3xl font-bold text-blue-700 mb-2">94%</div>
            <p className="text-gray-700 font-medium">See Results in 60s</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 font-bold text-lg">✅</span>
            </div>
            <div className="text-3xl font-bold text-purple-700 mb-2">100%</div>
            <p className="text-gray-700 font-medium">Verified Reviews</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonialsWithImages.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 animate-slide-up"
            >
              {/* Quote Icon & Verification */}
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center">
                  <Quote className="w-6 h-6 text-rose-600" />
                </div>
                {testimonial.verified && (
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-800 mb-8 italic leading-relaxed text-lg font-medium">"{testimonial.text}"</p>

              {/* Customer Info */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden mr-5 ring-2 ring-rose-200 group-hover:ring-rose-300 transition-all duration-300">
                  <Image
                    src={testimonial.profileImage || "/placeholder-user.jpg"}
                    alt={`${testimonial.name}'s profile`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900 text-lg">{testimonial.name}</p>
                  <p className="text-gray-600 font-medium">{testimonial.location} • {testimonial.age}</p>
                </div>
              </div>

              {/* Usage Info */}
              <div className="flex items-center justify-center gap-6 text-sm text-gray-600 bg-gray-50 rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-2.5 h-2.5 text-blue-600" />
                  </div>
                  <span className="font-medium">Used for {testimonial.timeUsed}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                    <Heart className="w-2.5 h-2.5 text-green-600" />
                  </div>
                  <span className="font-medium">Verified Customer</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-24 bg-gradient-to-br from-white via-rose-50 to-pink-50 rounded-4xl p-12 shadow-2xl border border-rose-100">
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="inline-block bg-gradient-to-r from-rose-100 to-pink-100 text-rose-800 px-4 py-2 rounded-full text-sm font-semibold">
                Limited Time Offer
              </span>
            </div>
            <h3 className="font-dm-sans text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Eyes?</h3>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join over 2,800 customers who've discovered the secret to brighter, more awake-looking eyes in just 60 seconds.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 mb-2">R159</div>
              <div className="text-gray-700 font-semibold mb-1">Free SA Shipping</div>
              <div className="text-sm text-gray-600">Orders over R200</div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold text-sm">✓</span>
              </div>
              <div className="text-gray-700 font-semibold mb-1">30-day guarantee</div>
              <div className="text-sm text-gray-600">100% money back</div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-sm">⚡</span>
              </div>
              <div className="text-gray-700 font-semibold mb-1">Fast delivery</div>
              <div className="text-sm text-gray-600">2-3 business days</div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/checkout" className="inline-block">
              <button className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-12 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                ✨ Shop Now & Transform Your Eyes ✨
              </button>
            </Link>
            <p className="text-xs text-gray-500 mt-3">No hidden fees • Cancel anytime • Secure checkout</p>
          </div>
        </div>
      </div>
    </section>
  )
}
