import { FlaskConical, MapPin, Heart, Shield } from "lucide-react"

export default function ValueProposition() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-dm-sans text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Lumeye?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to delivering exceptional beauty solutions that work for you
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FlaskConical className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-3">Scientifically Formulated</h3>
            <p className="text-gray-600">
              Our products are developed with cutting-edge science and proven ingredients for effective, safe results
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-10 h-10 text-pink-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-3">Proudly South African</h3>
            <p className="text-gray-600">
              Designed specifically for South African beauty needs and climate conditions
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-3">Cruelty-Free</h3>
            <p className="text-gray-600">
              We never test on animals. Our products are certified cruelty-free and ethically produced
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-3">Customer Satisfaction</h3>
            <p className="text-gray-600">
              Backed by our 30-day money-back guarantee. Your satisfaction is our priority
            </p>
          </div>
        </div>

        {/* Additional trust signals */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">4.9/5</div>
              <p className="text-gray-600">Average Customer Rating</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-2">5,000+</div>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">30 Days</div>
              <p className="text-gray-600">Money-Back Guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 