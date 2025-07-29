"use client"

import { useCart } from "../lib/cart-context"
import { useVisitorTracking } from "../../hooks/useVisitorTracking"
import { DiscountProvider } from "../lib/discount-context"
import CheckoutForm from "../components/CheckoutForm"
import CheckoutSummary from "../components/CheckoutSummary"
import Link from "next/link"
import { ArrowLeft, ShoppingBag, AlertCircle } from "lucide-react"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function CheckoutPage() {
  const { state } = useCart()
  const { trackActivity } = useVisitorTracking()
  const searchParams = useSearchParams()
  const [paymentError, setPaymentError] = useState<string | null>(null)

  // Check for payment status parameters
  useEffect(() => {
    const paymentStatus = searchParams.get('payment_status')
    const errorMessage = searchParams.get('error_message')
    const checkoutId = searchParams.get('checkout_id')

    if (paymentStatus === 'failed' || paymentStatus === 'cancelled') {
      setPaymentError(errorMessage || 'Payment was not completed. Please try again.')
      
      // Track payment failure
      trackActivity({
        action: 'payment_failed',
        page: '/checkout',
        checkoutId: checkoutId || 'unknown'
      })
    }

    // If there's a checkout ID, verify payment status from database
    if (checkoutId) {
      fetch(`/api/check-payment-status?checkout_id=${checkoutId}`)
        .then(response => response.json())
        .then(data => {
          if (data.success && data.order) {
            const order = data.order
            if (order.paymentStatus === 'failed' || order.status === 'cancelled') {
              setPaymentError('Payment was not completed. Please try again.')
            } else if (order.paymentStatus === 'completed' && order.status === 'confirmed') {
              // Payment was successful, redirect to order confirmation
              window.location.href = `/order-confirmation?orderId=${order.orderNumber}`
            }
          }
        })
        .catch(error => {
          console.error('Error checking payment status:', error)
        })
    }
  }, [searchParams, trackActivity])

  // Track checkout page view
  useEffect(() => {
    const cartValue = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    trackActivity({
      action: 'page_view',
      page: '/checkout',
      cartValue,
      items: state.items
    })
  }, [trackActivity, state.items])

  if (state.items.length === 0) {
    return (
      <>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="font-dm-sans text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some products to checkout!</p>
            <Link href="/product" className="btn-primary">
              Shop Now
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/cart" className="flex items-center text-pink-600 hover:text-pink-700 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="font-dm-sans text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your order</p>
        </div>

        {/* Payment Error Alert */}
        {paymentError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Payment Failed</h3>
                <p className="text-sm text-red-700 mt-1">{paymentError}</p>
              </div>
            </div>
          </div>
        )}

        <DiscountProvider>
          <div className="grid lg:grid-cols-2 gap-12">
            <CheckoutForm />
            <CheckoutSummary />
          </div>
        </DiscountProvider>
      </main>
      <Footer />
    </>
  )
}
