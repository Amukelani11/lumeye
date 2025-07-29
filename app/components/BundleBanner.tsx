"use client"

import { Gift, Sparkles } from "lucide-react"

export default function BundleBanner() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl mb-6">
      <div className="flex items-center justify-center gap-3">
        <Gift className="w-6 h-6" />
        <div className="text-center">
          <h3 className="font-bold text-lg">Glow Duo Bundle</h3>
          <p className="text-sm opacity-90">Eye Serum + GlowSmile - Save R79!</p>
        </div>
        <Sparkles className="w-6 h-6" />
      </div>
    </div>
  )
} 