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
          Lumeye Glow Wand is a precision-engineered LED device that delivers professional-grade red light therapy in the comfort of your home. Using clinically tested 660nm wavelengths, it penetrates deep into your skin to stimulate collagen production and cellular renewal.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Designed for daily use, the Lumeye Glow Wand is safe, non-invasive, and requires just 5 minutes of treatment time. Combined with the Lumeye Glow Gel, you'll experience visible improvements in skin tone, firmness, and clarity within weeks.
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Reduces fine lines and early wrinkles</li>
          <li>Brightens tired or uneven skin</li>
          <li>Promotes elasticity and firmness</li>
          <li>Depuffs under-eyes and contours facial features</li>
          <li>Safe for daily use with no downtime</li>
        </ul>
      </div>
    ),
  },
  {
    id: "ingredients",
    label: "Ingredients",
    content: (
      <div className="space-y-4">
        <h3 className="font-dm-sans text-lg font-semibold text-gray-900 mb-4">Product Specifications:</h3>
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-gray-900">LED Wavelength</h4>
            <p className="text-gray-600 text-sm">660nm red light (clinically proven for skin treatment)</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Treatment Time</h4>
            <p className="text-gray-600 text-sm">5 minutes per session, recommended daily</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Battery Life</h4>
            <p className="text-gray-600 text-sm">Rechargeable via USB-C, 60+ sessions per charge</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Safety Features</h4>
            <p className="text-gray-600 text-sm">No UV rays, no heat, safe for all skin types</p>
          </div>
        </div>
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Recommended Pairing:</h4>
          <p className="text-sm text-gray-700">
            For best results, use with Lumeye Glow Gel. The gel enhances LED conductivity and provides deep hydration with Hyaluronic Acid and Aloe Complex.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "usage",
    label: "How to Use",
    content: (
      <div className="space-y-4">
        <ol className="list-decimal list-inside space-y-4 text-gray-700">
          <li className="mb-2">
            <strong>Cleanse and dry your skin.</strong>
            <p className="text-sm text-gray-600 ml-6 mt-1">Remove all makeup and gently pat your face dry with a soft towel.</p>
          </li>
          <li className="mb-2">
            <strong>Apply a thin layer of Lumeye Glow Gel.</strong>
            <p className="text-sm text-gray-600 ml-6 mt-1">Apply to treatment areas (face, under-eyes, or specific target zones). The gel enhances LED conductivity.</p>
          </li>
          <li className="mb-2">
            <strong>Glide the wand over your skin for 5 minutes.</strong>
            <p className="text-sm text-gray-600 ml-6 mt-1">Use slow, circular motions. Keep the wand in gentle contact with your skin, moving it continuously to avoid heating any single area.</p>
          </li>
          <li className="mb-2">
            <strong>Follow with your moisturizer.</strong>
            <p className="text-sm text-gray-600 ml-6 mt-1">Complete your routine with your favorite moisturizer to lock in the benefits.</p>
          </li>
        </ol>
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mt-6">
          <h4 className="font-medium text-gray-900 mb-2">Pro Tips:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Use once daily, ideally in the evening as part of your skincare routine</li>
            <li>• Start with shorter sessions (2-3 minutes) if you have sensitive skin</li>
            <li>• Results become more visible after consistent use over 2-4 weeks</li>
            <li>• Keep the device clean by wiping with a soft, damp cloth after each use</li>
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
