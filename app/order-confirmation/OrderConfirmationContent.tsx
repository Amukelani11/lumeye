"use client"

import { useEffect, useState, Suspense } from "react"
import { CheckCircle, Package, Truck, Mail, XCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { getStoredTrackingParams, clearTrackingParams } from "@/lib/url-tracking"
import { trackPurchase } from "@/lib/facebook-pixel-events"
import { trackPurchase as trackGAPurchase } from "@/lib/google-analytics-events"

function OrderConfirmationContentInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const checkoutId = searchParams.get('checkoutId')
  const [loading, setLoading] = useState(true)
  const [orderCreated, setOrderCreated] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [orderNumber, setOrderNumber] = useState<string | null>(null)

  useEffect(() => {
    const verifyPaymentAndCreateOrder = async () => {
      try {
        // Check if order was already created (prevent duplicate on refresh)
        const orderCreatedFlag = sessionStorage.getItem('order_created')
        if (orderCreatedFlag) {
          setOrderCreated(true)
          setOrderNumber(orderCreatedFlag)
          setLoading(false)
          return
        }

        // Get checkout data from sessionStorage
        const pendingCheckoutStr = sessionStorage.getItem('pending_checkout')
        if (!pendingCheckoutStr) {
          setError('No checkout session found. Please start checkout again.')
          setLoading(false)
          return
        }

        const pendingCheckout = JSON.parse(pendingCheckoutStr)
        const checkoutIdToVerify = checkoutId || pendingCheckout.checkoutId

        if (!checkoutIdToVerify) {
          setError('Checkout ID not found. Please try again.')
          setLoading(false)
          return
        }

        // Verify payment with Yoco
        const verifyResponse = await fetch('/api/yoco/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ checkoutId: checkoutIdToVerify })
        })

        if (!verifyResponse.ok) {
          const errorData = await verifyResponse.json()
          throw new Error(errorData.error || 'Failed to verify payment')
        }

        const verifyResult = await verifyResponse.json()

        if (!verifyResult.isPaid) {
          setError('Payment was not completed. Please try again.')
          setLoading(false)
          return
        }

        // Payment verified - now create the order
        const shippingAddress = {
          first_name: pendingCheckout.formData.firstName,
          last_name: pendingCheckout.formData.lastName,
          address_line_1: pendingCheckout.formData.address,
          city: pendingCheckout.formData.city,
          postal_code: pendingCheckout.formData.postalCode,
          country: 'ZA'
        }

        // Get tracking parameters from stored checkout data or localStorage
        const trackingParams = pendingCheckout.trackingParams || getStoredTrackingParams() || {}

        const orderData = {
          email: pendingCheckout.formData.email,
          phone: pendingCheckout.formData.phone,
          shippingAddress,
          paymentMethod: 'yoco',
          paymentId: verifyResult.paymentId || checkoutIdToVerify,
          paymentAmount: pendingCheckout.amount,
          notes: `Payment processed via Yoco Checkout. Checkout ID: ${checkoutIdToVerify}`,
          trackingParams: trackingParams, // Include URL tracking parameters
          items: pendingCheckout.items.map((item: any) => ({
            product_id: item.id,
            quantity: item.quantity,
            unit_price: item.price,
            total_price: item.price * item.quantity,
            name: item.name,
            images: [item.image]
          }))
        }

        const orderResponse = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        })

        if (!orderResponse.ok) {
          const errorData = await orderResponse.json()
          throw new Error(errorData.error || 'Failed to create order')
        }

        const orderResult = await orderResponse.json()
        const orderNum = orderResult.order?.order_number || null
        setOrderNumber(orderNum)
        setOrderCreated(true)

        // Track Purchase event for Facebook Pixel
        const contentIds = pendingCheckout.items.map((item: any) => item.id)
        const contents = pendingCheckout.items.map((item: any) => ({
          id: item.id,
          quantity: item.quantity,
          item_price: item.price
        }))

        // Track Purchase event for Facebook Pixel
        trackPurchase({
          content_ids: contentIds,
          content_type: 'product',
          value: pendingCheckout.amount,
          currency: 'ZAR',
          num_items: pendingCheckout.items.reduce((sum: number, item: any) => sum + item.quantity, 0),
          contents: contents,
          order_id: orderNum || undefined
        })
        
        // Track Purchase event for Google Analytics
        trackGAPurchase({
          currency: 'ZAR',
          value: pendingCheckout.amount,
          transaction_id: orderNum || undefined,
          items: pendingCheckout.items.map((item: any) => ({
            item_id: item.id,
            item_name: item.name || 'Lumeye Product',
            quantity: item.quantity,
            price: item.price
          }))
        })

        // Mark order as created to prevent duplicates on refresh
        if (orderNum) {
          sessionStorage.setItem('order_created', orderNum)
        }

        // Clear pending checkout from sessionStorage
        sessionStorage.removeItem('pending_checkout')

        // Clear cart
        localStorage.removeItem('lumeye-cart')

        // Clear tracking parameters after successful purchase
        clearTrackingParams()

      } catch (err) {
        console.error('Error verifying payment or creating order:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    verifyPaymentAndCreateOrder()
  }, [checkoutId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying payment and creating order...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="font-dm-sans text-3xl font-bold text-gray-900 mb-4">
              Payment Verification Failed
            </h1>
            <p className="text-lg text-gray-600 mb-8">{error}</p>
            <Link 
              href="/checkout" 
              className="inline-block px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              Return to Checkout
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!orderCreated) {
    return null
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
            {orderNumber && (
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-semibold text-gray-900">{orderNumber}</span>
              </div>
            )}
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
              <span className="text-gray-600">Order Status:</span>
              <span className="font-semibold text-gray-900">Processing</span>
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

export default function OrderConfirmationContent() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    }>
      <OrderConfirmationContentInner />
    </Suspense>
  )
}

