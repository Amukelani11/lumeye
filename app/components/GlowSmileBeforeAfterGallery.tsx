"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Clock, Star } from "lucide-react"

const beforeAfterImages = [
  { 
    before: "/Teeth-Cleaning-Before-and-After.jpg", 
    after: "/Teeth-Cleaning-Before-and-After.jpg", 
    name: "Sarah M.",
    age: "32",
    location: "Cape Town",
    testimonial: "I was skeptical at first, but the results were instant! My yellow teeth are now pearly white.",
    timeFrame: "60 seconds",
    rating: 5
  },
  {
    before: "/5_1_480x480.jpg",
    after: "/5_1_480x480.jpg",
    name: "Jessica L.",
    age: "28",
    location: "Johannesburg",
    testimonial: "Perfect for my morning routine. The violet drops neutralize yellow tones instantly!",
    timeFrame: "45 seconds",
    rating: 5
  },
  { 
    before: "/1780901669732842.png", 
    after: "/1780901669732842.png", 
    name: "Maria K.",
    age: "35",
    location: "Durban",
    testimonial: "After years of trying different whitening products, this is the only one that actually works immediately.",
    timeFrame: "90 seconds",
    rating: 5
  },
  {
    before: "/IMG_5455.jpg",
    after: "/IMG_5455.jpg",
    name: "Michelle R.",
    age: "42",
    location: "Pretoria",
    testimonial: "The violet drops work like magic! My teeth look so much brighter and more confident.",
    timeFrame: "75 seconds",
    rating: 5
  },
  {
    before: "/Teeth-Cleaning-Before-and-After.jpg",
    after: "/Teeth-Cleaning-Before-and-After.jpg",
    name: "Amanda T.",
    age: "38",
    location: "Port Elizabeth",
    testimonial: "I love how easy it is to use! Just a few drops and my teeth look instantly brighter.",
    timeFrame: "90 seconds",
    rating: 5
  },
  {
    before: "/5_1_480x480.jpg",
    after: "/5_1_480x480.jpg",
    name: "Lisa W.",
    age: "45",
    location: "Bloemfontein",
    testimonial: "Perfect for coffee and wine lovers! The violet drops neutralize stains instantly.",
    timeFrame: "60 seconds",
    rating: 5
  },
]

export default function GlowSmileBeforeAfterGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % beforeAfterImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + beforeAfterImages.length) % beforeAfterImages.length)
  }

  const currentImage = beforeAfterImages[currentIndex]

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-dm-sans text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Real Results from Real Customers
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            See the incredible transformation of smiles with our GlowSmile Instant Violet Whitening Drops
          </p>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Main Image */}
          <div className="relative bg-white rounded-3xl p-8 shadow-2xl max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Before/After Image */}
              <div className="relative">
                <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6">
                  <Image
                    src={currentImage.before}
                    alt={`Before and after teeth whitening results - ${currentImage.name}`}
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-xl shadow-lg"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-sm font-semibold text-gray-700">Before & After</span>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="space-y-6">
                {/* Rating */}
                <div className="flex items-center gap-2">
                  {[...Array(currentImage.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-lg font-semibold text-gray-900">{currentImage.rating}/5</span>
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-xl text-gray-700 italic leading-relaxed">
                  "{currentImage.testimonial}"
                </blockquote>

                {/* Customer Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                    {currentImage.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{currentImage.name}</p>
                    <p className="text-gray-600 text-sm">{currentImage.location} • {currentImage.age}</p>
                  </div>
                </div>

                {/* Time Frame */}
                <div className="flex items-center gap-2 text-purple-600">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Results in {currentImage.timeFrame}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {beforeAfterImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-purple-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.8/5</div>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-pink-600 mb-2">1,234+</div>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
            <p className="text-gray-600">Verified Reviews</p>
          </div>
        </div>
      </div>
    </section>
  )
} 