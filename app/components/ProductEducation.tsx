"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Heart, Droplets, Sparkles, Leaf, Award } from "lucide-react"

const educationSections = [
  {
    id: "ingredients",
    title: "Powerful Ingredients That Work",
    icon: Droplets,
    content: {
      intro:
        "Our scientifically-formulated serum combines the most effective ingredients for under-eye care, each chosen for its proven benefits and gentle nature.",
      ingredients: [
        {
          name: "Caffeine (2%)",
          benefit: "Reduces Puffiness",
          description:
            "Clinically proven to constrict blood vessels and reduce fluid retention, giving you instantly depuffed eyes.",
        },
        {
          name: "Vitamin C (L-Ascorbic Acid)",
          benefit: "Brightens Dark Circles",
          description:
            "A powerful antioxidant that brightens skin tone and stimulates collagen production for firmer, more radiant under-eyes.",
        },
        {
          name: "Hyaluronic Acid",
          benefit: "Deep Hydration",
          description:
            "Holds up to 1000x its weight in water, providing intense hydration that plumps fine lines and smooths skin texture.",
        },
        {
          name: "Peptides Complex",
          benefit: "Anti-Aging",
          description:
            "Stimulates collagen synthesis and improves skin elasticity, reducing the appearance of fine lines and wrinkles.",
        },
      ],
    },
  },
  {
    id: "science",
    title: "The Science Behind Lumeye",
    icon: Award,
    content: {
      intro:
        "Backed by clinical research and dermatologist testing, our formula delivers measurable results in just 60 seconds.",
      studies: [
        {
          title: "Clinical Study Results",
          description: "In a 4-week clinical study with 50 participants:",
          results: [
            "94% saw reduced puffiness within 60 seconds",
            "87% noticed brighter under-eyes after 1 week",
            "92% reported smoother, more hydrated skin",
            "89% would recommend to friends and family",
          ],
        },
        {
          title: "Dermatologist Tested",
          description: "Our formula has been rigorously tested by certified dermatologists:",
          results: [
            "Hypoallergenic and non-comedogenic",
            "Safe for sensitive skin and contact lens wearers",
            "pH balanced to match natural skin levels",
            "Free from parabens, sulfates, and artificial fragrances",
          ],
        },
      ],
    },
  },
  {
    id: "application",
    title: "How to Get Maximum Results",
    icon: Sparkles,
    content: {
      intro: "Follow our expert-recommended application technique for the best results from your Lumeye serum.",
      steps: [
        {
          step: 1,
          title: "Cleanse & Prep",
          description:
            "Start with clean, dry skin. Remove all makeup and gently pat the under-eye area dry with a soft towel.",
          tip: "Pro tip: Use lukewarm water to avoid irritating the delicate eye area.",
        },
        {
          step: 2,
          title: "Apply Serum",
          description:
            "Dispense 2-3 pumps onto your ring finger (the gentlest finger). Apply in small dots under each eye, from inner to outer corner.",
          tip: "Pro tip: Keep the serum at least 5mm away from the lash line to prevent irritation.",
        },
        {
          step: 3,
          title: "Gentle Massage",
          description:
            "Using your ring finger, gently tap and press the serum into the skin. Never rub or pull the delicate under-eye area.",
          tip: "Pro tip: Use a light tapping motion to stimulate circulation and enhance absorption.",
        },
        {
          step: 4,
          title: "Wait & Layer",
          description:
            "Allow 60 seconds for full absorption before applying moisturizer or makeup. Use morning and evening for best results.",
          tip: "Pro tip: Store in the refrigerator for an extra cooling, depuffing effect.",
        },
      ],
    },
  },
  {
    id: "sustainability",
    title: "Our Commitment to Sustainability",
    icon: Leaf,
    content: {
      intro:
        "We believe beautiful skin shouldn't come at the cost of our planet. That's why we've made sustainability a core part of our mission.",
      initiatives: [
        {
          title: "Refillable Packaging",
          description:
            "Our premium glass bottles are designed to be refilled, reducing waste by up to 70%. Simply purchase refill cartridges when you run out.",
          impact: "Each refill saves 15g of packaging waste",
        },
        {
          title: "Sustainable Sourcing",
          description:
            "All our ingredients are ethically sourced from suppliers who share our commitment to environmental responsibility and fair trade practices.",
          impact: "Supporting 12 sustainable farming communities",
        },
        {
          title: "Carbon Neutral Shipping",
          description:
            "We offset 100% of our shipping emissions through verified carbon offset programs, making every delivery climate-positive.",
          impact: "Over 500kg CO2 offset this year",
        },
        {
          title: "Cruelty-Free Promise",
          description:
            "Never tested on animals and certified by Leaping Bunny. We believe in beauty without compromise.",
          impact: "Proudly cruelty-free since day one",
        },
      ],
    },
  },
]

export default function ProductEducation() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [likedSections, setLikedSections] = useState<Set<string>>(new Set())

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId)
  }

  const toggleLike = (sectionId: string) => {
    const newLikedSections = new Set(likedSections)
    if (newLikedSections.has(sectionId)) {
      newLikedSections.delete(sectionId)
    } else {
      newLikedSections.add(sectionId)
    }
    setLikedSections(newLikedSections)
  }

  return (
    <section className="mt-16 border-t border-gray-200 pt-12">
      <div className="text-center mb-12">
        <h2 className="font-dm-sans text-3xl font-bold text-gray-900 mb-4">Learn More About Lumeye</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover the science, ingredients, and care that goes into every bottle of our premium under-eye serum.
        </p>
      </div>

      <div className="space-y-4">
        {educationSections.map((section) => (
          <div key={section.id} className="border border-gray-200 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-6 py-6 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-dm-sans text-xl font-semibold text-gray-900">{section.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">Click to explore this section</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleLike(section.id)
                  }}
                  className={`p-2 rounded-full transition-colors ${
                    likedSections.has(section.id)
                      ? "bg-pink-100 text-pink-600"
                      : "bg-gray-100 text-gray-400 hover:bg-pink-100 hover:text-pink-600"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${likedSections.has(section.id) ? "fill-current" : ""}`} />
                </button>
                {activeSection === section.id ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </button>

            {activeSection === section.id && (
              <div className="px-6 pb-8 bg-blush border-t border-gray-200">
                <div className="pt-6">
                  <p className="text-gray-700 leading-relaxed mb-8">{section.content.intro}</p>

                  {/* Ingredients Section */}
                  {section.id === "ingredients" && (
                    <div className="grid md:grid-cols-2 gap-8">
                      {section.content.ingredients?.map((ingredient, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                          <div>
                            <h4 className="font-dm-sans font-semibold text-gray-900 mb-1">{ingredient.name}</h4>
                            <p className="text-pink-600 text-sm font-medium mb-2">{ingredient.benefit}</p>
                            <p className="text-gray-600 text-sm leading-relaxed">{ingredient.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Science Section */}
                  {section.id === "science" && (
                    <div className="space-y-8">
                      {section.content.studies?.map((study, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                          <div>
                            <h4 className="font-dm-sans text-lg font-semibold text-gray-900 mb-3">{study.title}</h4>
                            <p className="text-gray-700 mb-4">{study.description}</p>
                            <ul className="space-y-2">
                              {study.results.map((result, resultIndex) => (
                                <li key={resultIndex} className="flex items-start space-x-2">
                                  <div className="w-2 h-2 bg-pink-600 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-700 text-sm">{result}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Application Section */}
                  {section.id === "application" && (
                    <div className="space-y-8">
                      {section.content.steps?.map((step, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                          <div>
                            <div className="flex items-center mb-4">
                              <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                {step.step}
                              </div>
                              <h4 className="font-dm-sans text-lg font-semibold text-gray-900">{step.title}</h4>
                            </div>
                            <p className="text-gray-700 mb-4 leading-relaxed">{step.description}</p>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                              <p className="text-yellow-800 text-sm font-medium">{step.tip}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Sustainability Section */}
                  {section.id === "sustainability" && (
                    <div className="grid md:grid-cols-2 gap-6">
                      {section.content.initiatives?.map((initiative, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                          <div>
                            <h4 className="font-dm-sans font-semibold text-gray-900 mb-2">{initiative.title}</h4>
                            <p className="text-gray-700 text-sm leading-relaxed mb-3">{initiative.description}</p>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                              <p className="text-green-800 text-sm font-medium">{initiative.impact}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center bg-pink-600 text-white rounded-2xl p-8">
        <h3 className="font-dm-sans text-2xl font-bold mb-4">Ready to Transform Your Under-Eyes?</h3>
        <p className="text-pink-100 mb-6 max-w-2xl mx-auto">
          Join thousands of satisfied customers who have discovered the power of Lumeye. Experience the difference in
          just 60 seconds.
        </p>
        <button className="bg-white text-pink-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
          Add to Cart - R159
        </button>
      </div>
    </section>
  )
}
