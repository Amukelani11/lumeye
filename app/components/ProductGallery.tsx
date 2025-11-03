"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

type ProductType = "wand" | "gel"

const productSlides = [
  {
    id: 1,
    src: "/lumeyewandhero.png",
    alt: "Lumeye Glow Wand Hero Shot",
    overlay: {
      headline: "Light up your skin.",
      subheadline: "5 minutes a day to smoother, brighter, younger-looking skin."
    }
  },
  {
    id: 2,
    src: "/lumeyewandwhatitdoes.png",
    alt: "What Lumeye Glow Wand Does - Benefits",
    overlay: {
      headline: "Visibly firmer. Noticeably smoother. Always glowing.",
      subheadline: ""
    }
  },
  {
    id: 3,
    src: "/lumeyewandhowitworks (1).png",
    alt: "How Lumeye Glow Wand Works - Science",
    overlay: {
      headline: "Red light therapy = collagen boost + faster cell renewal.",
      subheadline: ""
    }
  },
  {
    id: 4,
    src: "/lumeyewandwhoitsitfor.png",
    alt: "Who Lumeye Glow Wand Is For",
    overlay: {
      headline: "Perfect for anyone who wants:",
      subheadline: "glowing, even, youthful skin."
    }
  },
  {
    id: 5,
    src: "/lumeyebundleimage.png",
    alt: "How To Use Lumeye Glow Wand",
    overlay: {
      headline: "Just 5 minutes a day.",
      subheadline: "1) Cleanse 2) Apply Glow Gel 3) Glide for 5 minutes 4) Glow"
    }
  },
  {
    id: 6,
    src: "/lumeyecloseupgelshot.png",
    alt: "Lumeye Glow Wand Detail - Macro Shot",
    overlay: {
      headline: "Precision-engineered beauty tech.",
      subheadline: ""
    }
  },
  {
    id: 7,
    src: "/lumeyegelhero.png",
    alt: "Lumeye Glow Gel Hero",
    overlay: {
      headline: "Hydration meets innovation.",
      subheadline: "Our LED-safe Hyaluronic + Aloe formula."
    }
  },
  {
    id: 8,
    src: "/lumeyegelstats.png",
    alt: "Lumeye Glow Gel Ingredients",
    overlay: {
      headline: "Made to glide. Made to glow.",
      subheadline: ""
    }
  },
  {
    id: 9,
    src: "/Beforeafter2.png",
    alt: "Lumeye Glow Kit Bundle",
    overlay: {
      headline: "Bundle & Save.",
      subheadline: "Glow Kit – Illuminate + Hydrate."
    }
  },
  {
    id: 10,
    src: "/Beforeafter1.png",
    alt: "Lumeye Holiday Promo",
    overlay: {
      headline: "Holiday Glow Drop ✨",
      subheadline: "Up to 50% off – limited stock."
    }
  },
]

interface ProductGalleryProps {
  selectedProduct?: ProductType
  onProductChange?: (product: ProductType) => void
}

export default function ProductGallery({ selectedProduct = "wand", onProductChange }: ProductGalleryProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Navigate to product hero image when product selection changes
  useEffect(() => {
    if (selectedProduct === "wand") {
      setCurrentSlide(0) // Wand hero is slide 0
    } else if (selectedProduct === "gel") {
      setCurrentSlide(6) // Gel hero is slide 6
    }
  }, [selectedProduct])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % productSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + productSlides.length) % productSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="space-y-4">
      {/* Main Carousel */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-lg group">
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-gray-900" />
        </button>

        {/* Image */}
        <Image
          src={productSlides[currentSlide].src}
          alt={productSlides[currentSlide].alt}
          width={600}
          height={600}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="w-full h-full object-cover"
          priority={currentSlide === 0}
          loading={currentSlide === 0 ? undefined : "lazy"}
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />

        {/* Slide Indicator */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
          {currentSlide + 1} / {productSlides.length}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
        {productSlides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
              currentSlide === index 
                ? "border-pink-600 shadow-lg ring-2 ring-pink-200" 
                : "border-gray-200 hover:border-pink-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Slide Navigation Dots */}
      <div className="flex justify-center gap-2">
        {productSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index 
                ? "w-8 bg-pink-600" 
                : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
