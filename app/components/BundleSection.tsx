"use client"

import Link from "next/link"
import Image from "next/image"
import { Sparkles, Gift } from "lucide-react"

export default function BundleSection() {
  const wandPrice = 799
  const gelPrice = 99
  const totalIndividual = wandPrice + gelPrice
  const bundlePrice = 849
  const savings = totalIndividual - bundlePrice

  return (
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-dm-sans text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            The Glow Kit — Illuminate + Hydrate
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Maximize your results with the complete Lumeye system. Save R{savings} when you bundle.
          </p>
        </div>

        <div className="bg-white p-8 lg:p-12 border border-gray-200 rounded-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Bundle Image */}
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden border border-gray-200">
                <Image
                  src="/lumeyebundleimage.png"
                  alt="Lumeye Glow Kit Bundle - Glow Wand and Glow Gel"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                  quality={75}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 600px"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
              
              {/* Ribbon Badge */}
              <div className="absolute -top-3 -right-3 bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
                SAVE R{savings}
              </div>
            </div>

            {/* Bundle Details */}
            <div>
              <div className="mb-8">
                <h3 className="font-dm-sans text-2xl font-bold text-gray-900 mb-6">What's Included</h3>
                
                <div className="space-y-5 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                      <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Lumeye Glow Wand</p>
                      <p className="text-sm text-gray-600">Precision LED device with 660nm wavelength technology</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                      <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Lumeye Glow Gel</p>
                      <p className="text-sm text-gray-600">Enhancing gel with Hyaluronic Acid and Aloe Complex</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                      <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">USB-C Charging Cable</p>
                      <p className="text-sm text-gray-600">For convenient recharging of your Glow Wand</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                      <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">User Guide & Instructions</p>
                      <p className="text-sm text-gray-600">Complete guide to using your Lumeye system</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600 text-sm font-medium">Individual Price:</span>
                  <span className="text-lg text-gray-400 line-through">R{totalIndividual}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600 text-sm font-medium">Bundle Price:</span>
                  <span className="text-3xl font-bold text-gray-900">R{bundlePrice}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="font-semibold text-gray-900">You Save:</span>
                  <span className="text-xl font-bold text-pink-600">R{savings}</span>
                </div>
              </div>

              {/* CTA */}
              <Link href="/product?bundle=true" className="block">
                <button className="w-full bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-pink-700 transition-colors">
                  Shop the Glow Kit
                </button>
              </Link>

              <p className="text-center text-sm text-gray-500 mt-4">
                Free shipping • 30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

