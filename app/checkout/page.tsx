"use client"

import { useCart } from "../lib/cart-context"
import { useVisitorTracking } from "../../hooks/useVisitorTracking"
import CheckoutForm from "../components/CheckoutForm"
import CheckoutSummary from "../components/CheckoutSummary"
import Link from "next/link"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import Footer from "../components/Footer"
import { useEffect } from "react"

export default function CheckoutPage() {
  const { state } = useCart()
  const { trackActivity } = useVisitorTracking()

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

        <div className="grid lg:grid-cols-2 gap-12">
          <CheckoutForm />
          <CheckoutSummary />
        </div>
      </main>
      <Footer />
    </>
  )
}
