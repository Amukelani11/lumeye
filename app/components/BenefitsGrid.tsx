import { Zap, Shield, RotateCcw, Award, Leaf, Droplets, Clock, Heart } from "lucide-react"

const benefits = [
  {
    icon: Zap,
    title: "Fast-acting formula",
    description: "See results in just 60 seconds with our advanced peptide technology",
    detail: "Clinically proven to reduce puffiness and brighten under-eye area immediately"
  },
  {
    icon: Shield,
    title: "Non-irritating & fragrance-free",
    description: "Safe for sensitive skin and contact lens wearers",
    detail: "Dermatologist tested and ophthalmologist approved for daily use"
  },
  {
    icon: RotateCcw,
    title: "Refillable glass bottle",
    description: "Sustainable and eco-friendly packaging",
    detail: "Reduce plastic waste with our refill system - save 30% on refills"
  },
  {
    icon: Award,
    title: "Clinically tested ingredients",
    description: "Proven effective and safe for all skin types",
    detail: "Contains hyaluronic acid, caffeine, and vitamin C for maximum efficacy"
  },
  {
    icon: Leaf,
    title: "100% Natural extracts",
    description: "No harsh chemicals or artificial preservatives",
    detail: "Made with organic chamomile, cucumber, and green tea extracts"
  },
  {
    icon: Droplets,
    title: "Lightweight & non-greasy",
    description: "Absorbs instantly without leaving any residue",
    detail: "Perfect under makeup - won't cause creasing or smudging"
  },
  {
    icon: Clock,
    title: "Long-lasting results",
    description: "Effects last up to 8 hours with proper application",
    detail: "Can be reapplied throughout the day as needed"
  },
  {
    icon: Heart,
    title: "Made with love in SA",
    description: "Locally formulated and manufactured",
    detail: "Supporting local business and reducing carbon footprint"
  },
]

export default function BenefitsGrid() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-dm-sans text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Lumeye?</h2>
          <p className="text-gray-600 text-lg mb-4">Premium ingredients, proven results</p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Every ingredient is carefully selected for its proven effectiveness in depuffing, brightening, and protecting the delicate under-eye area.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-blush hover:shadow-lg transition-all duration-300 hover:scale-105 animate-slide-up"
            >
              <div className="w-16 h-16 bg-rose-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-dm-sans text-lg font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">{benefit.description}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{benefit.detail}</p>
            </div>
          ))}
        </div>

        {/* Ingredient Spotlight */}
        <div className="mt-16 bg-gradient-to-r from-pink-50 to-rose-50 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h3 className="font-dm-sans text-2xl font-bold text-gray-900 mb-2">Key Ingredients</h3>
            <p className="text-gray-600">Scientifically proven to transform tired eyes</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-pink-600 font-bold text-lg">HA</span>
              </div>
              <h4 className="font-dm-sans font-bold text-gray-900 mb-2">Hyaluronic Acid</h4>
              <p className="text-sm text-gray-600">Deeply hydrates and plumps fine lines</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-lg">C</span>
              </div>
              <h4 className="font-dm-sans font-bold text-gray-900 mb-2">Caffeine</h4>
              <p className="text-sm text-gray-600">Reduces puffiness and dark circles</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold text-lg">VC</span>
              </div>
              <h4 className="font-dm-sans font-bold text-gray-900 mb-2">Vitamin C</h4>
              <p className="text-sm text-gray-600">Brightens and evens skin tone</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
