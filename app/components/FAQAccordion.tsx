"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "Is it safe for sensitive skin?",
    answer:
      "Yes! Lumeye Under Eye Serum is specifically formulated to be gentle on sensitive skin. It's fragrance-free, non-irritating, and has been dermatologically tested. We recommend doing a patch test before first use if you have extremely sensitive skin.",
  },
  {
    question: "How long does one bottle last?",
    answer:
      "One bottle of Lumeye Under Eye Serum typically lasts 2-3 months with regular use (morning and evening). Each bottle contains 30ml of product, and you only need 2-3 pumps per application.",
  },
  {
    question: "Can I use it with makeup?",
    answer:
      "The lightweight, fast-absorbing formula makes it perfect to use under makeup. Wait 60 seconds after application for the serum to fully absorb, then apply your concealer or foundation as usual.",
  },
  {
    question: "Where do you deliver?",
    answer:
      "We deliver nationwide across South Africa. Standard shipping is free for orders over R250. We also offer express shipping options for faster delivery. International shipping is available to select countries.",
  },
  {
    question: "How quickly will I see results?",
    answer:
      "You'll see immediate depuffing effects within 60 seconds of application. For long-term benefits like reduced dark circles and improved skin texture, most customers notice significant improvements after 2-4 weeks of consistent use.",
  },
  {
    question: "What's your return policy?",
    answer:
      "We offer a 30-day money-back guarantee. If you're not completely satisfied with your purchase, you can return the product within 30 days for a full refund. The product should be at least 50% full for returns.",
  },
  {
    question: "Is the packaging really refillable?",
    answer:
      "Yes! Our commitment to sustainability includes refillable glass bottles. Once you finish your serum, you can purchase refill cartridges at a discounted price. This reduces waste and saves you money on future purchases.",
  },
  {
    question: "Can men use this product?",
    answer:
      "Lumeye Under Eye Serum is suitable for all genders. The formula is designed to address common under-eye concerns that affect everyone, regardless of gender.",
  },
]

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
          >
            <span className="font-dm-sans font-semibold text-gray-900 pr-4">{faq.question}</span>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-rose-gold flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-rose-gold flex-shrink-0" />
            )}
          </button>

          {openIndex === index && (
            <div className="px-6 py-4 bg-blush border-t border-gray-200">
              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
