"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Clock, Star } from "lucide-react"

const beforeAfterImages = [
  { 
    before: "/after.png", 
    after: "/before.png", 
    name: "Sarah M.",
    age: "32",
    location: "Cape Town",
    testimonial: "I was skeptical at first, but the results were instant! My dark circles disappeared in under a minute.",
    timeFrame: "60 seconds",
    rating: 5
  },
  {
    before: "/after.png",
    after: "/before.png",
    name: "Jessica L.",
    age: "28",
    location: "Johannesburg",
    testimonial: "Perfect for my morning routine. No more puffy eyes before important meetings!",
    timeFrame: "45 seconds",
    rating: 5
  },
  { 
    before: "/after.png", 
    after: "/before.png", 
    name: "Maria K.",
    age: "35",
    location: "Durban",
    testimonial: "After years of trying different products, this is the only one that actually works immediately.",
    timeFrame: "90 seconds",
    rating: 5
  },
  {
    before: "/before2.png",
    after: "/after2.png",
    name: "Michelle R.",
    age: "42",
    location: "Pretoria",
    testimonial: "At my age, I thought nothing could help my under-eye area. This serum proved me wrong!",
    timeFrame: "75 seconds",
    rating: 5
  },
  {
    before: "/before2.png",
    after: "/after2.png",
    name: "Amanda T.",
    age: "38",
    location: "Port Elizabeth",
    testimonial: "The fine lines around my eyes have improved dramatically. I look years younger!",
    timeFrame: "90 seconds",
    rating: 5
  },
  {
    before: "/before2.png",
    after: "/after2.png",
    name: "Lisa W.",
    age: "45",
    location: "Bloemfontein",
    testimonial: "Finally found something that works for mature skin. The results are incredible!",
    timeFrame: "60 seconds",
    rating: 5
  },
]

export default function BeforeAfterGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % beforeAfterImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + beforeAfterImages.length) % beforeAfterImages.length)
  }

  return (
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-dm-sans text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Real Results from Real People
        </h2>
        <p className="text-gray-600 mb-4 text-lg">See the transformation in just 60 seconds</p>
        <p className="text-sm text-gray-500 mb-12">No filters, no editing - just real results from our customers</p>

        <div className="relative">
          <div className="flex justify-center items-center relative">
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-rose-gold" />
            </button>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto px-16">
              <div className="text-center">
                <h3 className="font-dm-sans text-lg font-semibold mb-4 text-gray-700">Before</h3>
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={beforeAfterImages[currentIndex].before || "/placeholder.svg"}
                    alt="Before using Lumeye"
                    width={300}
                    height={300}
                    className="w-full h-auto"
                  />
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Tired Eyes
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-dm-sans text-lg font-semibold mb-4 text-rose-gold">After</h3>
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={beforeAfterImages[currentIndex].after || "/placeholder.svg"}
                    alt="After using Lumeye"
                    width={300}
                    height={300}
                    className="w-full h-auto"
                  />
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Refreshed
                  </div>
                  <div className="absolute top-2 right-2 bg-pink-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {beforeAfterImages[currentIndex].timeFrame}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-rose-gold" />
            </button>
          </div>

          {/* Customer Info */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600 font-medium">{beforeAfterImages[currentIndex].name.charAt(0)}</span>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">{beforeAfterImages[currentIndex].name}</p>
                <p className="text-sm text-gray-500">{beforeAfterImages[currentIndex].age} • {beforeAfterImages[currentIndex].location}</p>
              </div>
            </div>
            
            {/* Rating */}
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(beforeAfterImages[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>

            {/* Testimonial */}
            <blockquote className="text-gray-600 italic max-w-2xl mx-auto mb-4">
              "{beforeAfterImages[currentIndex].testimonial}"
            </blockquote>

            <div className="flex justify-center mt-4 space-x-2">
              {beforeAfterImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-rose-gold" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600 mb-2">94%</div>
            <p className="text-gray-600">See results in under 60 seconds</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">2,847+</div>
            <p className="text-gray-600">Happy customers</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">4.9/5</div>
            <p className="text-gray-600">Average rating</p>
          </div>
        </div>
      </div>
    </section>
  )
}
