import { SprayCanIcon as Spray, Hand, Sparkles, Clock } from "lucide-react"

const steps = [
  {
    icon: Spray,
    title: "Apply",
    description: "Spray 2-3 pumps under each eye area",
    detail: "The fine mist ensures even coverage without tugging at delicate skin",
    time: "10 seconds"
  },
  {
    icon: Hand,
    title: "Tap & Absorb",
    description: "Gently tap with fingertips until fully absorbed",
    detail: "The lightweight formula absorbs quickly without leaving any residue",
    time: "30 seconds"
  },
  {
    icon: Sparkles,
    title: "See Results",
    description: "Watch puffiness disappear and eyes brighten instantly",
    detail: "Advanced peptides and natural extracts work immediately to depuff and brighten",
    time: "20 seconds"
  },
]

export default function HowItWorks() {
  return (
    <section className="section-padding bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-6">
          <span className="inline-block bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 px-6 py-2 rounded-full text-sm font-semibold mb-6">
            Simple 3-Step Process
          </span>
        </div>
        <h2 className="font-dm-sans text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          How <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Lumeye</span> Works
        </h2>
        <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
          Our innovative spray formula makes application effortless while delivering professional-grade results in just three simple steps
        </p>

        {/* Total Time Highlight */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 mb-20 max-w-lg mx-auto shadow-xl border border-blue-100">
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="text-3xl font-bold text-gray-900 mb-1">60 Seconds</div>
              <div className="text-gray-600 font-medium">Total application time</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center animate-slide-up group">
              <div className="relative mb-10">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 group-hover:from-blue-200 group-hover:to-cyan-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <step.icon className="w-12 h-12 text-blue-600 group-hover:text-cyan-600 transition-colors duration-300" />
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-all duration-300">
                  {index + 1}
                </div>
                <div className="absolute -bottom-3 -left-3 bg-white text-blue-700 px-3 py-2 rounded-full text-sm font-bold shadow-lg border border-blue-100">
                  {step.time}
                </div>
              </div>
              <h3 className="font-dm-sans text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-800 transition-colors duration-300">{step.title}</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4 font-medium">{step.description}</p>
              <p className="text-gray-600 leading-relaxed">{step.detail}</p>
            </div>
          ))}
        </div>

        {/* Key Benefits */}
        <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-pink-100">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-pink-600 font-bold text-lg">✨</span>
            </div>
            <div className="text-2xl font-bold text-pink-700 mb-3">No Mess</div>
            <p className="text-gray-600 leading-relaxed">Fine mist application prevents drips and waste for a clean experience</p>
          </div>
          <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-green-100">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 font-bold text-lg">🌿</span>
            </div>
            <div className="text-2xl font-bold text-green-700 mb-3">No Grease</div>
            <p className="text-gray-600 leading-relaxed">Lightweight formula absorbs completely without residue</p>
          </div>
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-100">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-lg">⚡</span>
            </div>
            <div className="text-2xl font-bold text-blue-700 mb-3">No Waiting</div>
            <p className="text-gray-600 leading-relaxed">See results immediately, no dry time needed for busy mornings</p>
          </div>
          <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-purple-100">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 font-bold text-lg">🛡️</span>
            </div>
            <div className="text-2xl font-bold text-purple-700 mb-3">Safe</div>
            <p className="text-gray-600 leading-relaxed">Gentle enough for sensitive skin and contact lens wearers</p>
          </div>
        </div>
      </div>
    </section>
  )
}
