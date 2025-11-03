import { SprayCanIcon as Spray, Hand, Sparkles, Clock } from "lucide-react"
import Image from "next/image"

const steps = [
  {
    icon: Spray,
    title: "Cleanse",
    description: "Start with clean, dry skin",
    detail: "Remove all makeup and gently pat your face dry with a soft towel",
    time: "1 minute"
  },
  {
    icon: Hand,
    title: "Apply Glow Gel",
    description: "Apply a thin layer of Lumeye Glow Gel to treatment areas",
    detail: "The gel enhances LED conductivity and provides deep hydration while you treat",
    time: "30 seconds"
  },
  {
    icon: Sparkles,
    title: "Glide the Wand",
    description: "Glide the wand over your skin for 5 minutes",
    detail: "Use slow, circular motions covering your entire face or focus on specific areas like under-eyes",
    time: "5 minutes"
  },
  {
    icon: Sparkles,
    title: "Finish with Moisturizer",
    description: "Complete your routine with your favorite moisturizer",
    detail: "Lock in the benefits and protect your skin barrier",
    time: "30 seconds"
  },
]

export default function HowItWorks() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-dm-sans text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Designed for convenience — Lumeye fits seamlessly into your daily skincare ritual.
          </p>
        </div>

        {/* Visual Guide */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 mb-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden bg-gray-50">
              <Image
                src="/lumeyewandhowitworks (1).png"
                alt="How Lumeye Glow Wand Works"
                width={400}
                height={400}
                className="w-full h-full object-contain"
                quality={75}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 400px"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">5 Minutes</div>
                  <div className="text-sm text-gray-600">Daily treatment time</div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Simple, effective, and designed to fit into your daily routine. Complete your entire skincare ritual in just 7 minutes.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <step.icon className="w-5 h-5 text-pink-600" />
                    <h3 className="font-dm-sans text-lg font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mb-2">{step.time}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">{step.description}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{step.detail}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
