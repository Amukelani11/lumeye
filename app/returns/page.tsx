import type { Metadata } from "next"
import Footer from "../components/Footer"
import { RotateCcw, CheckCircle, XCircle, AlertCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Returns & Exchanges | 30-Day Money-Back Guarantee | Lumeye",
  description: "30-day money-back guarantee on all Lumeye LED light therapy devices. Learn about our returns policy, how to return your order, and refund process.",
  keywords: "Lumeye returns, return policy, money-back guarantee, LED therapy returns, refund policy",
}

export default function ReturnsPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="font-dm-sans text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Returns & Exchanges</h1>
          <p className="text-gray-600 text-lg">Your satisfaction is our priority</p>
        </div>

        <div className="space-y-12">
          {/* Return Policy Overview */}
          <section>
            <h2 className="font-dm-sans text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <RotateCcw className="w-6 h-6 text-pink-600 mr-3" />
              30-Day Return Policy
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <p className="text-gray-700 leading-relaxed">
                We offer a <strong>30-day money-back guarantee</strong> on all Lumeye products. If you're not completely
                satisfied with your purchase, you can return it within 30 days of delivery for a full refund or
                exchange.
              </p>
            </div>
          </section>

          {/* What Can Be Returned */}
          <section>
            <h2 className="font-dm-sans text-2xl font-bold text-gray-900 mb-6">Return Eligibility</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="font-dm-sans text-lg font-semibold text-green-600 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Eligible for Return
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Products with at least 50% remaining</li>
                  <li>• Original packaging included</li>
                  <li>• Returned within 30 days</li>
                  <li>• Proof of purchase provided</li>
                  <li>• Unused or gently used products</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="font-dm-sans text-lg font-semibold text-red-600 mb-4 flex items-center">
                  <XCircle className="w-5 h-5 mr-2" />
                  Not Eligible for Return
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Products used more than 50%</li>
                  <li>• Damaged due to misuse</li>
                  <li>• Returned after 30 days</li>
                  <li>• Missing original packaging</li>
                  <li>• Products without proof of purchase</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How to Return */}
          <section>
            <h2 className="font-dm-sans text-2xl font-bold text-gray-900 mb-6">How to Return Your Order</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-dm-sans font-semibold text-gray-900 mb-2">Contact Us</h3>
                  <p className="text-gray-700">
                    Email us at{" "}
                    <a href="mailto:returns@lumeye.co.za" className="text-pink-600 hover:underline">
                      returns@lumeye.co.za
                    </a>{" "}
                    or call{" "}
                    <a href="tel:+27123456789" className="text-pink-600 hover:underline">
                      +27 12 345 6789
                    </a>{" "}
                    to initiate your return.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-dm-sans font-semibold text-gray-900 mb-2">Get Return Authorization</h3>
                  <p className="text-gray-700">
                    We'll provide you with a Return Authorization Number (RAN) and return instructions.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-dm-sans font-semibold text-gray-900 mb-2">Package Your Return</h3>
                  <p className="text-gray-700">
                    Securely package the product with original packaging and include the RAN in the package.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-dm-sans font-semibold text-gray-900 mb-2">Ship Your Return</h3>
                  <p className="text-gray-700">
                    Send the package to our returns center. We'll provide a prepaid return label for your convenience.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Refund Process */}
          <section>
            <h2 className="font-dm-sans text-2xl font-bold text-gray-900 mb-6">Refund Process</h2>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-dm-sans font-semibold text-gray-900 mb-2">Processing Time</h3>
                  <p className="text-gray-700">
                    Once we receive your return, we'll inspect it and process your refund within 3-5 business days.
                  </p>
                </div>
                <div>
                  <h3 className="font-dm-sans font-semibold text-gray-900 mb-2">Refund Method</h3>
                  <p className="text-gray-700">
                    Refunds will be issued to your original payment method. Bank transfers may take 5-10 business days
                    to reflect.
                  </p>
                </div>
                <div>
                  <h3 className="font-dm-sans font-semibold text-gray-900 mb-2">Shipping Costs</h3>
                  <p className="text-gray-700">
                    Original shipping costs are non-refundable unless the return is due to our error.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Exchanges */}
          <section>
            <h2 className="font-dm-sans text-2xl font-bold text-gray-900 mb-6">Exchanges</h2>
            <div className="bg-blush p-6 rounded-2xl">
              <p className="text-gray-700 mb-4">Currently, we don't offer direct exchanges. To exchange a product:</p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Return your original item following the return process above</li>
                <li>Place a new order for the desired product</li>
                <li>We'll process your refund once we receive the returned item</li>
              </ol>
            </div>
          </section>

          {/* Contact for Returns */}
          <section className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <h2 className="font-dm-sans text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
              Need Help?
            </h2>
            <p className="text-gray-700 mb-4">
              Our customer service team is here to help with any return questions or concerns.
            </p>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>Email:</strong>{" "}
                <a href="mailto:returns@lumeye.co.za" className="text-pink-600 hover:underline">
                  returns@lumeye.co.za
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong>{" "}
                <a href="tel:+27123456789" className="text-pink-600 hover:underline">
                  +27 12 345 6789
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Hours:</strong> Monday - Friday, 9 AM - 5 PM SAST
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
