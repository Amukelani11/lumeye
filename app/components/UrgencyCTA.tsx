import Link from "next/link"

export default function UrgencyCTA() {
  return (
    <section className="bg-white border-t border-b border-gray-200 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        {/* Main Headline */}
        <h2 className="font-dm-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Transform Your Skincare Routine
        </h2>

        {/* Value Proposition */}
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover the power of clinical-grade LED therapy at home with Lumeye Glow Wand and Glow Gel
        </p>

        {/* Trust Signals */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <span>✓ Dermatologist Tested</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <span>✓ Clinically Inspired</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <span>✓ Professional Results at Home</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/product"
            className="bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-pink-700 transition-colors"
          >
            Shop Now
          </Link>
          <Link
            href="/product"
            className="bg-white text-gray-900 border-2 border-gray-300 px-8 py-4 rounded-lg font-semibold text-base hover:border-gray-400 transition-colors"
          >
            Learn More
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto text-sm">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="font-semibold text-gray-900 mb-1">30-Day Returns</p>
            <p className="text-xs text-gray-600">Free returns within 30 days</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="font-semibold text-gray-900 mb-1">2,847+ Customers</p>
            <p className="text-xs text-gray-600">Trusted by our community</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="font-semibold text-gray-900 mb-1">Free SA Shipping</p>
            <p className="text-xs text-gray-600">Free shipping on all orders</p>
          </div>
        </div>
      </div>
    </section>
  )
}
