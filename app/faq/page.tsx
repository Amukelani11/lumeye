import type { Metadata } from "next"
import FAQAccordion from "../components/FAQAccordion"
import Footer from "../components/Footer"

export const metadata: Metadata = {
  title: "FAQ | Frequently Asked Questions | Lumeye LED Light Therapy",
  description: "Frequently asked questions about Lumeye Glow Wand, Glow Gel, and Glow Kit. Learn about LED light therapy, usage instructions, shipping, returns, and more.",
  keywords: "Lumeye FAQ, LED therapy FAQ, frequently asked questions, Lumeye help, product questions",
}

export default function FAQPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="font-dm-sans text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 text-lg">Everything you need to know about Lumeye LED Light Therapy Devices</p>
        </div>

        <FAQAccordion />
      </main>
      <Footer />
    </>
  )
}
