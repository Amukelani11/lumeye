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
    <section className="section-padding bg-gradient-to-br from-white via-slate-50 to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="mb-6">
            <span className="inline-block bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 px-6 py-2 rounded-full text-sm font-semibold mb-6">
              Science-Backed Formula
            </span>
          </div>
          <h2 className="font-dm-sans text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">Lumeye</span> Stands Out
          </h2>
          <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
            Our clinically tested formula combines cutting-edge peptide technology with nature's most potent ingredients
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Every ingredient is dermatologist-selected for maximum efficacy while maintaining the gentleness your delicate under-eye skin deserves.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group text-center p-8 rounded-3xl bg-white hover:bg-gradient-to-br hover:from-white hover:to-pink-50 border border-gray-100 hover:border-pink-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-slide-up"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-rose-100 group-hover:from-pink-200 group-hover:to-rose-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <benefit.icon className="w-10 h-10 text-pink-600 group-hover:text-rose-600 transition-colors duration-300" />
              </div>
              <h3 className="font-dm-sans text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-800 transition-colors duration-300">{benefit.title}</h3>
              <p className="text-gray-700 text-base leading-relaxed mb-4 font-medium">{benefit.description}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{benefit.detail}</p>
            </div>
          ))}
        </div>

        {/* Ingredient Spotlight */}
        <div className="mt-24 bg-gradient-to-br from-slate-50 via-pink-50 to-rose-50 rounded-4xl p-12 border border-pink-100">
          <div className="text-center mb-12">
            <div className="mb-4">
              <span className="inline-block bg-white text-pink-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                Premium Formula
              </span>
            </div>
            <h3 className="font-dm-sans text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Key Active Ingredients</h3>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">Each ingredient is carefully selected and clinically tested for maximum efficacy</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <span className="text-pink-700 font-bold text-xl">HA</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-200 rounded-full flex items-center justify-center">
                  <span className="text-pink-800 font-bold text-xs">1</span>
                </div>
              </div>
              <h4 className="font-dm-sans text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-800 transition-colors duration-300">Hyaluronic Acid</h4>
              <p className="text-gray-600 leading-relaxed">Deeply hydrates and plumps fine lines for a smoother, more youthful appearance</p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <span className="text-green-700 font-bold text-xl">C</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-200 rounded-full flex items-center justify-center">
                  <span className="text-green-800 font-bold text-xs">2</span>
                </div>
              </div>
              <h4 className="font-dm-sans text-xl font-bold text-gray-900 mb-3 group-hover:text-green-800 transition-colors duration-300">Caffeine</h4>
              <p className="text-gray-600 leading-relaxed">Reduces puffiness and dark circles by improving circulation and reducing inflammation</p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <span className="text-orange-700 font-bold text-xl">VC</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center">
                  <span className="text-orange-800 font-bold text-xs">3</span>
                </div>
              </div>
              <h4 className="font-dm-sans text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-800 transition-colors duration-300">Vitamin C</h4>
              <p className="text-gray-600 leading-relaxed">Brightens and evens skin tone while protecting against environmental damage</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
