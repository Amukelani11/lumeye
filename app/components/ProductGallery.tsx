"use client"

import { useState } from "react"
import Image from "next/image"

const productImages = [
  {
    src: "/lumeye shot 5.png",
    alt: "Lumeye Under Eye Serum - Erase Puffiness in 60 Seconds",
    description: "Main product shot with key benefit messaging"
  },
  {
    src: "/lumeye shot 1.png",
    alt: "Lumeye product with natural elements - marble and tropical leaf",
    description: "Premium lifestyle shot with natural elements"
  },
  {
    src: "/lumeye shot 2.png",
    alt: "Lumeye Under Eye Serum with packaging box",
    description: "Product with packaging and luxury setting"
  },
  {
    src: "/lumeye shot 3.png",
    alt: "Woman applying Lumeye serum with happy expression",
    description: "Real application demonstration"
  },
  {
    src: "/lumeye shot 4.png",
    alt: "Before and after comparison showing results",
    description: "Before and after transformation"
  },
  {
    src: "/lumeye shot 6.png",
    alt: "Woman applying serum with rollerball - Wake Up Refreshed",
    description: "Application with rollerball and refreshed messaging"
  },
]

export default function ProductGallery() {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square rounded-2xl overflow-hidden bg-cool-grey shadow-lg">
        <Image
          src={productImages[selectedImage].src}
          alt={productImages[selectedImage].alt}
          width={600}
          height={600}
          className="w-full h-full object-cover"
          priority={selectedImage === 0}
        />
      </div>



      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-6 gap-3">
        {productImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
              selectedImage === index 
                ? "border-pink-600 shadow-lg" 
                : "border-gray-200 hover:border-pink-300"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={150}
              height={150}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Image Counter */}
      <div className="text-center text-sm text-gray-500">
        {selectedImage + 1} of {productImages.length} images
      </div>
    </div>
  )
}
