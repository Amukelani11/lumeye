import { Target, Activity, Sparkles } from "lucide-react"
import Image from "next/image"

export default function TechnologySection() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-dm-sans text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            The Technology
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our red light therapy targets the deeper layers of your skin, enhancing collagen production, micro-circulation, and cellular renewal for a visibly smoother texture.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow text-center">
            <div className="w-16 h-16 bg-pink-50 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="font-dm-sans text-xl font-bold text-gray-900 mb-4">Boosts Collagen</h3>
            <p className="text-gray-600 leading-relaxed">
              Red LED light penetrates deep into the dermis, stimulating fibroblast activity and increasing collagen production for firmer, more youthful skin.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow text-center">
            <div className="w-16 h-16 bg-pink-50 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Activity className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="font-dm-sans text-xl font-bold text-gray-900 mb-4">Improves Circulation</h3>
            <p className="text-gray-600 leading-relaxed">
              Enhanced blood flow delivers essential nutrients and oxygen to skin cells, promoting healthier, more radiant-looking skin.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow text-center">
            <div className="w-16 h-16 bg-pink-50 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="font-dm-sans text-xl font-bold text-gray-900 mb-4">Supports Skin Repair</h3>
            <p className="text-gray-600 leading-relaxed">
              Cellular renewal processes are accelerated, helping repair damage and restore your skin's natural glow and texture.
            </p>
          </div>
        </div>

        {/* How Red Light Therapy Works */}
        <div className="bg-gray-50 rounded-xl p-8 sm:p-12 border border-gray-200">
          <div className="text-center mb-8">
            <h3 className="font-dm-sans text-2xl sm:text-3xl font-bold text-gray-900 mb-4">How Red Light Therapy Works</h3>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Red LED light at clinically proven wavelengths (660nm) penetrates deep into skin tissue, reaching the dermis where collagen production occurs.
            </p>
          </div>
          
          {/* Image */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white">
              <Image
                src="/lumeyewandhowitworks (1).png"
                alt="How Red Light Therapy Works - Lumeye Glow Wand"
                width={800}
                height={600}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
            
          {/* Key Points */}
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
              <p className="text-sm font-semibold text-gray-900 mb-1">660nm Wavelength</p>
              <p className="text-xs text-gray-600">Optimal for skin penetration</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
              <p className="text-sm font-semibold text-gray-900 mb-1">5 Minutes Daily</p>
              <p className="text-xs text-gray-600">Recommended treatment time</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
              <p className="text-sm font-semibold text-gray-900 mb-1">Safe & Non-Invasive</p>
              <p className="text-xs text-gray-600">No UV rays, no heat</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

