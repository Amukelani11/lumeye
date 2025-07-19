"use client"

import { useEffect, useState, Suspense } from "react"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { trackPurchase } from "../../lib/meta-pixel"
import { trackPurchase as gaTrackPurchase } from "../../lib/google-analytics"

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Set loading to false immediately since we don't need to fetch order details
    setLoading(false)
    
    // Track purchase event for Meta Pixel
    if (orderId) {
      trackPurchase(299, 'ZAR', orderId)
    } else {
      // Fallback if no order ID
      trackPurchase(299, 'ZAR')
    }
    
    // Track purchase event for Google Analytics
    gaTrackPurchase({
      transaction_id: orderId || `order_${Date.now()}`,
      value: 299,
      currency: 'ZAR',
      items: [{
        item_id: 'lumeye-serum',
        item_name: 'Lumeye Under Eye Serum',
        price: 299,
        quantity: 1
      }]
    })
  }, [orderId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="font-dm-sans text-3xl font-bold text-gray-900 mb-4">
            Thank You for Your Order!
          </h1>
          <p className="text-lg text-gray-600">
            Your order has been confirmed and payment processed successfully.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-sm border p-8 mb-8">
          <h2 className="font-dm-sans text-xl font-semibold text-gray-900 mb-6">
            Order Details
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Status:</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Confirmed
              </span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Payment:</span>
              <span className="font-semibold text-gray-900">Processed Successfully</span>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600">Product:</span>
              <span className="font-semibold text-gray-900">Lumeye Under Eye Serum</span>
            </div>
          </div>
        </div>

        {/* Email Confirmation */}
        <div className="bg-blue-50 rounded-2xl border border-blue-200 p-8 mb-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Check Your Email</h3>
              <p className="text-sm text-gray-600 mt-1">
                We've sent you a confirmation email with your order details and tracking number. 
                Please check your inbox (and spam folder) for the email.
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-sm border p-8 mb-8">
          <h2 className="font-dm-sans text-xl font-semibold text-gray-900 mb-6">
            What's Next?
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Package className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Order Processing</h3>
                <p className="text-sm text-gray-600 mt-1">
                  We're preparing your order for shipment. You'll receive an email confirmation shortly.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Truck className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Shipping</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Your order will be shipped within 1-2 business days. You'll receive tracking information via email.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/track-order" 
            className="flex-1 text-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Track Order
          </Link>
          <Link 
            href="/" 
            className="flex-1 text-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Support Info */}
        <div className="text-center mt-12 text-sm text-gray-600">
          <p>Have questions about your order?</p>
          <p className="mt-1">
            Contact us at{" "}
            <a href="mailto:hello@lumeye.co.za" className="text-pink-600 hover:underline">
              hello@lumeye.co.za
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  )
} 