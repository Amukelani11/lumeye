"use client"

import { useState } from "react"
import { Star } from "lucide-react"

const tabs = [
  {
    id: "overview",
    label: "Overview",
    content: (
      <div className="prose max-w-none">
        <p className="text-gray-700 leading-relaxed mb-4">
          Lumeye Under Eye Serum is a revolutionary skincare solution designed specifically for the delicate under-eye
          area. Our fast-acting formula works in just 60 seconds to visibly reduce puffiness, brighten dark circles, and
          restore a youthful glow to tired eyes.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Crafted with premium, clinically-tested ingredients, this serum is gentle enough for sensitive skin while
          delivering powerful results. The lightweight, non-greasy formula absorbs quickly and can be worn under makeup.
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Reduces puffiness in 60 seconds</li>
          <li>Brightens dark circles</li>
          <li>Suitable for all skin types</li>
          <li>Non-irritating and fragrance-free</li>
          <li>Sustainable refillable packaging</li>
        </ul>
      </div>
    ),
  },
  {
    id: "ingredients",
    label: "Ingredients",
    content: (
      <div className="space-y-4">
        <h3 className="font-dm-sans text-lg font-semibold text-gray-900">Key Ingredients:</h3>
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-gray-900">Caffeine (2%)</h4>
            <p className="text-gray-600 text-sm">Reduces puffiness and improves circulation</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Vitamin C</h4>
            <p className="text-gray-600 text-sm">Brightens and evens skin tone</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Hyaluronic Acid</h4>
            <p className="text-gray-600 text-sm">Hydrates and plumps the skin</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Peptides</h4>
            <p className="text-gray-600 text-sm">Firms and smooths fine lines</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Full ingredients list: Aqua, Caffeine, Sodium Hyaluronate, Ascorbyl Glucoside, Palmitoyl Tripeptide-1,
          Glycerin, Phenoxyethanol, Ethylhexylglycerin.
        </p>
      </div>
    ),
  },
  {
    id: "usage",
    label: "How to Use",
    content: (
      <div className="space-y-4">
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li>Cleanse your face and pat dry</li>
          <li>Apply 2-3 pumps of serum under each eye</li>
          <li>Gently tap with fingertips until fully absorbed</li>
          <li>Use morning and evening for best results</li>
          <li>Follow with your regular moisturizer and sunscreen (morning)</li>
        </ol>
        <div className="bg-blush p-4 rounded-lg mt-6">
          <h4 className="font-medium text-gray-900 mb-2">Pro Tips:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Store in the refrigerator for an extra cooling effect</li>
            <li>• Can be used under makeup</li>
            <li>• Results are visible immediately and improve with continued use</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "reviews",
    label: "Customer Reviews",
    content: (
      <div className="space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <span className="text-lg font-medium">4.9 out of 5</span>
          <span className="text-gray-600">(127 reviews)</span>
        </div>

        <div className="space-y-4">
          {[
            { name: "Sarah K.", rating: 5, text: "Amazing results! My under-eyes look so much brighter." },
            { name: "Lisa M.", rating: 5, text: "Works instantly and lasts all day. Love this product!" },
            { name: "Jennifer R.", rating: 4, text: "Great for sensitive skin. No irritation at all." },
          ].map((review, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <div className="flex items-center mb-2">
                <div className="flex items-center mr-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="font-medium text-gray-900">{review.name}</span>
              </div>
              <p className="text-gray-700">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="border-t border-gray-200 pt-12">
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-rose-gold text-rose-gold"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="min-h-[300px]">{tabs.find((tab) => tab.id === activeTab)?.content}</div>
    </div>
  )
}
