"use client"

import Image from "next/image"
import { useState } from "react"

const productImages = [
  {
    src: "/lumeyewandhero.png",
    alt: "Lumeye Glow Wand - Hero Product Shot",
    caption: "Lumeye Glow Wand"
  },
  {
    src: "/lumeyewandwhatitdoes.png",
    alt: "What Lumeye Glow Wand Does - Benefits",
    caption: "Key Benefits"
  },
  {
    src: "/lumeyewandhowitworks (1).png",
    alt: "How Lumeye Glow Wand Works - Science",
    caption: "How It Works"
  },
  {
    src: "/lumeyegelhero.png",
    alt: "Lumeye Glow Gel - Hero Product Shot",
    caption: "Lumeye Glow Gel"
  },
  {
    src: "/lumeyegelstats.png",
    alt: "Lumeye Glow Gel - Ingredients and Stats",
    caption: "Gel Ingredients"
  },
  {
    src: "/lumeyecloseupgelshot.png",
    alt: "Lumeye Glow Wand - Close Up Detail",
    caption: "Product Detail"
  },
]

export default function ProductImageGallery() {
  return (
    <section className="mt-16 border-t border-gray-200 pt-12">
      <div className="text-center mb-12">
        <h2 className="font-dm-sans text-3xl font-bold text-gray-900 mb-4">Product Gallery</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Explore the Lumeye Glow Wand and Glow Gel from every angle
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productImages.map((image, index) => (
          <div key={index} className="group relative rounded-xl overflow-hidden bg-gray-100 aspect-square">
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={400}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              quality={75}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-medium text-sm">{image.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

