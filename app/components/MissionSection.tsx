import { Heart, Sparkles, Shield } from "lucide-react"

export default function MissionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Heart className="w-6 h-6 text-purple-600" />
          <span className="text-lg font-medium text-purple-600">Our Mission</span>
        </div>
        
        <h2 className="font-dm-sans text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
          At Lumeye, we believe true beauty shines from within
        </h2>
        
        <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto">
          Our expertly formulated products are designed to enhance your natural radiance, 
          giving you the confidence to glow every day. We combine cutting-edge science 
          with gentle, effective ingredients to deliver results you can see and feel.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Natural Radiance</h3>
            <p className="text-gray-600">Enhance your natural beauty with gentle, effective formulations</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Safe & Proven</h3>
            <p className="text-gray-600">Dermatologist tested and cruelty-free for your peace of mind</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Confidence Building</h3>
            <p className="text-gray-600">Feel confident and beautiful in your own skin</p>
          </div>
        </div>
      </div>
    </section>
  )
} 