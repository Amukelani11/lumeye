"use client"

import Link from "next/link"
import { Clock, Truck, Star, Shield, Zap } from "lucide-react"
import { useState, useEffect } from "react"

export default function UrgencyCTA() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Set initial countdown to 2 days from now
    const now = new Date()
    const endTime = new Date(now.getTime() + (2 * 24 * 60 * 60 * 1000)) // 2 days from now
    
    const timer = setInterval(() => {
      const now = new Date()
      const difference = endTime.getTime() - now.getTime()
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        
        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        // Reset to 2 days when countdown reaches zero
        const newEndTime = new Date(now.getTime() + (2 * 24 * 60 * 60 * 1000))
        setTimeLeft({ days: 2, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-gradient-to-r from-pink-600 to-rose-600 text-white py-20">
      <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        {/* Urgency Badge */}
        <div className="flex justify-center items-center mb-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
            <Clock className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-medium uppercase tracking-wide">Limited Time Offer</span>
          </div>
        </div>

        {/* Main Headline */}
        <h2 className="font-dm-sans text-4xl lg:text-5xl font-bold mb-6">
          Only R159
          <span className="block text-2xl lg:text-3xl font-normal mt-2 opacity-90">
            Free Nationwide Shipping
          </span>
        </h2>

        {/* Value Proposition */}
        <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
          Join 2,847+ customers who've transformed their tired eyes in just 60 seconds
        </p>

        {/* Trust Signals */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-300 fill-current" />
            <span className="text-sm">4.9/5 from 2,847+ reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span className="text-sm">30-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <span className="text-sm">See results in 60 seconds</span>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Truck className="w-6 h-6" />
            <span className="text-lg font-semibold">Free SA Shipping</span>
          </div>
          <p className="text-sm opacity-90">Delivered to your door in 2-3 business days</p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            href="/product"
            className="bg-white text-pink-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 inline-block shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Shop Now - R159
          </Link>
          <div className="text-center sm:text-left">
            <p className="text-sm opacity-75">No risk - 30-day guarantee</p>
            <p className="text-xs opacity-60">Free returns & exchanges</p>
          </div>
        </div>

        {/* Urgency Timer */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
          <p className="text-sm mb-2 opacity-90">Offer ends in:</p>
          <div className="flex justify-center gap-4 text-2xl font-bold">
            <div className="bg-white/20 rounded-lg px-3 py-2">
              <span>{timeLeft.days}</span>
              <div className="text-xs opacity-75">Days</div>
            </div>
            <div className="bg-white/20 rounded-lg px-3 py-2">
              <span>{timeLeft.hours.toString().padStart(2, '0')}</span>
              <div className="text-xs opacity-75">Hours</div>
            </div>
            <div className="bg-white/20 rounded-lg px-3 py-2">
              <span>{timeLeft.minutes.toString().padStart(2, '0')}</span>
              <div className="text-xs opacity-75">Minutes</div>
            </div>
            <div className="bg-white/20 rounded-lg px-3 py-2">
              <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
              <div className="text-xs opacity-75">Seconds</div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-white"></div>
            ))}
          </div>
          <p className="text-sm opacity-90">Join 47 customers who purchased today</p>
        </div>
      </div>
    </section>
  )
}
