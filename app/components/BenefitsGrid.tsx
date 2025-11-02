import { Zap, Shield, RotateCcw, Award, Leaf, Droplets, Clock, Heart } from "lucide-react"

const benefits = [
  {
    icon: Zap,
    title: "660nm Red LED Technology",
    description: "Clinically proven wavelength for optimal skin penetration",
    detail: "Targets deeper skin layers to stimulate collagen production and cellular renewal"
  },
  {
    icon: Shield,
    title: "Safe & Non-Invasive",
    description: "No UV rays, no heat, no side effects",
    detail: "Dermatologist tested and suitable for all skin types, including sensitive skin"
  },
  {
    icon: Clock,
    title: "5-Minute Daily Treatment",
    description: "Quick and convenient at-home therapy",
    detail: "Just 5 minutes a day to see visible improvements in skin texture and tone"
  },
  {
    icon: Award,
    title: "Clinically Tested",
    description: "Backed by scientific research and studies",
    detail: "Proven to improve collagen production, circulation, and skin repair"
  },
  {
    icon: Droplets,
    title: "Enhanced with Glow Gel",
    description: "LED-safe formula amplifies results",
    detail: "Hyaluronic Acid and Aloe Complex provide deep hydration during treatment"
  },
  {
    icon: RotateCcw,
    title: "Rechargeable Battery",
    description: "USB-C charging for convenience",
    detail: "Long-lasting battery life, ready whenever you need it"
  },
  {
    icon: Heart,
    title: "Professional Results at Home",
    description: "Spa-quality treatment in your own home",
    detail: "Save time and money while achieving professional-grade results"
  },
  {
    icon: Leaf,
    title: "Suitable for Daily Use",
    description: "Gentle enough for everyday skincare routine",
    detail: "No downtime, no irritation - use morning or evening as part of your routine"
  },
]

export default function BenefitsGrid() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-dm-sans text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Why <span className="text-pink-600">Lumeye</span> Stands Out
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Clinical-grade LED technology combined with premium skincare formulation for visible, lasting results. Our precision-engineered devices deliver professional-grade light therapy in the comfort of your home.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-dm-sans text-lg font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-2">{benefit.description}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{benefit.detail}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
