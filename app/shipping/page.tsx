import Footer from "../components/Footer"
import { Truck, Clock, MapPin, Package } from "lucide-react"

export default function ShippingPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="font-dm-sans text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Shipping Information</h1>
          <p className="text-gray-600 text-lg">Fast, reliable delivery across South Africa</p>
        </div>

        <div className="space-y-12">
          {/* Shipping Options */}
          <section>
            <h2 className="font-dm-sans text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Truck className="w-6 h-6 text-pink-600 mr-3" />
              Shipping Options
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blush p-6 rounded-2xl">
                <h3 className="font-dm-sans text-lg font-semibold text-gray-900 mb-3">Standard Shipping</h3>
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-center">
                    <Clock className="w-4 h-4 text-pink-600 mr-2" />
                    3-5 business days
                  </p>
                  <p className="font-semibold text-pink-600">FREE on orders over R250</p>
                  <p>R50 for orders under R250</p>
                </div>
              </div>
              <div className="bg-cool-grey p-6 rounded-2xl">
                <h3 className="font-dm-sans text-lg font-semibold text-gray-900 mb-3">Express Shipping</h3>
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-center">
                    <Clock className="w-4 h-4 text-pink-600 mr-2" />
                    1-2 business days
                  </p>
                  <p className="font-semibold">R150 nationwide</p>
                  <p>Available in major cities</p>
                </div>
              </div>
            </div>
          </section>

          {/* Delivery Areas */}
          <section>
            <h2 className="font-dm-sans text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="w-6 h-6 text-pink-600 mr-3" />
              Delivery Areas
            </h2>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-dm-sans font-semibold text-gray-900 mb-3">Major Cities</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Cape Town</li>
                    <li>• Johannesburg</li>
                    <li>• Durban</li>
                    <li>• Pretoria</li>
                    <li>• Port Elizabeth</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-dm-sans font-semibold text-gray-900 mb-3">Regional Areas</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Western Cape</li>
                    <li>• Gauteng</li>
                    <li>• KwaZulu-Natal</li>
                    <li>• Eastern Cape</li>
                    <li>• Free State</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-dm-sans font-semibold text-gray-900 mb-3">Remote Areas</h3>
                  <p className="text-gray-700 text-sm">
                    We deliver to remote areas with additional 2-3 business days. Remote area surcharge may apply.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Processing Time */}
          <section>
            <h2 className="font-dm-sans text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Package className="w-6 h-6 text-pink-600 mr-3" />
              Order Processing
            </h2>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-dm-sans font-semibold text-gray-900">Order Confirmation</h3>
                    <p className="text-gray-700">
                      You'll receive an email confirmation within minutes of placing your order.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-dm-sans font-semibold text-gray-900">Processing</h3>
                    <p className="text-gray-700">
                      Orders are processed within 24 hours (Monday-Friday, excluding holidays).
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-dm-sans font-semibold text-gray-900">Dispatch</h3>
                    <p className="text-gray-700">You'll receive tracking information once your order is dispatched.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Important Notes */}
          <section className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <h2 className="font-dm-sans text-xl font-semibold text-gray-900 mb-4">Important Notes</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Orders placed after 2 PM will be processed the next business day</li>
              <li>• Weekend and public holiday orders will be processed on the next business day</li>
              <li>• Delivery times may be extended during peak seasons and holidays</li>
              <li>• Someone must be available to receive the package during delivery hours</li>
              <li>• We'll attempt delivery twice before returning to depot</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
