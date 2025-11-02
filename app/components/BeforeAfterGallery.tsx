"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Clock, Star } from "lucide-react"

// Before and after results
const beforeAfterResults = [
  {
    before: "/Beforeafter1.png",
    after: "/Beforeafter1.png",
    name: "Customer Result 1",
    testimonial: "After 4 weeks of daily use, I noticed smoother skin and reduced fine lines. The LED therapy really works!",
    timeFrame: "4 weeks",
    rating: 5,
  },
  {
    before: "/Beforeafter2.png",
    after: "/Beforeafter2.png",
    name: "Customer Result 2",
    testimonial: "My skin texture improved significantly. The combination of the wand and gel has transformed my routine.",
    timeFrame: "6 weeks",
    rating: 5,
  },
]

export default function BeforeAfterGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % beforeAfterResults.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + beforeAfterResults.length) % beforeAfterResults.length)
  }

  return (
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-dm-sans text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Results You Can See
        </h2>
        <p className="text-gray-700 mb-4 text-lg font-medium">Clinical-grade performance with visible improvement in skin tone, firmness, and clarity — in as little as four weeks.</p>
        <p className="text-sm text-gray-500 mb-12">Real results from real customers using Lumeye LED therapy</p>

        <div className="relative">
          <div className="flex justify-center items-center relative">
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-rose-gold" />
            </button>

            <div className="max-w-4xl mx-auto px-4">
              <div className="text-center">
                <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200 inline-block max-w-full">
                  <Image
                    src={beforeAfterResults[currentIndex].before || "/placeholder.svg"}
                    alt="Before and after results using Lumeye LED therapy"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-4 right-4 bg-pink-600 text-white px-3 py-1 rounded text-xs font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {beforeAfterResults[currentIndex].timeFrame}
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
            {/* Rating */}
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(beforeAfterResults[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>

            {/* Testimonial */}
            <blockquote className="text-gray-700 max-w-2xl mx-auto mb-4 font-medium">
              "{beforeAfterResults[currentIndex].testimonial}"
            </blockquote>

            <div className="flex justify-center mt-4 space-x-2">
              {beforeAfterResults.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-pink-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">85%</div>
            <p className="text-sm text-gray-600 font-medium">See visible results in 4 weeks</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">2,847+</div>
            <p className="text-sm text-gray-600 font-medium">Happy customers</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
            <p className="text-sm text-gray-600 font-medium">Average rating</p>
          </div>
        </div>
      </div>
    </section>
  )
}
