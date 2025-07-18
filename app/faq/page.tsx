import FAQAccordion from "../components/FAQAccordion"
import Footer from "../components/Footer"

export default function FAQPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="font-dm-sans text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 text-lg">Everything you need to know about Lumeye Under Eye Serum</p>
        </div>

        <FAQAccordion />
      </main>
      <Footer />
    </>
  )
}
