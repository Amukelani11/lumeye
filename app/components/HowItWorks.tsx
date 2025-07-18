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
    <section className="section-padding bg-cool-grey">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-dm-sans text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-gray-600 mb-8 text-lg">Three simple steps to brighter, depuffed eyes</p>
        
        {/* Total Time Highlight */}
        <div className="bg-white rounded-2xl p-6 mb-16 max-w-md mx-auto shadow-lg">
          <div className="flex items-center justify-center gap-3">
            <Clock className="w-8 h-8 text-pink-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">60 Seconds</div>
              <div className="text-sm text-gray-600">Total application time</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center animate-slide-up">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-pink-600 font-bold text-sm shadow-md">
                  {index + 1}
                </div>
                <div className="absolute -bottom-2 -left-2 bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-xs font-medium">
                  {step.time}
                </div>
              </div>
              <h3 className="font-dm-sans text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-3">{step.description}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{step.detail}</p>
            </div>
          ))}
        </div>

        {/* Key Benefits */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-2xl font-bold text-pink-600 mb-2">No Mess</div>
            <p className="text-sm text-gray-600">Fine mist application prevents drips and waste</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-2xl font-bold text-green-600 mb-2">No Grease</div>
            <p className="text-sm text-gray-600">Lightweight formula absorbs completely</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-2xl font-bold text-blue-600 mb-2">No Waiting</div>
            <p className="text-sm text-gray-600">See results immediately, no dry time needed</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-2xl font-bold text-purple-600 mb-2">Safe</div>
            <p className="text-sm text-gray-600">Gentle enough for sensitive skin</p>
          </div>
        </div>
      </div>
    </section>
  )
}
