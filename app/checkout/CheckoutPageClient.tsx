"use client"

import { useEffect } from "react"
import { useCart } from "../lib/cart-context"
import CheckoutForm from "../components/CheckoutForm"
import CheckoutSummary from "../components/CheckoutSummary"
import Link from "next/link"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import Footer from "../components/Footer"
import { trackInitiateCheckout } from "@/lib/facebook-pixel-events"

export default function CheckoutPageClient() {
  const { state } = useCart()

  // Track InitiateCheckout event when user lands on checkout page
  useEffect(() => {
    if (state.items.length > 0) {
      const contentIds = state.items.map(item => item.id)
      const contents = state.items.map(item => ({
        id: item.id,
        quantity: item.quantity,
        item_price: item.price
      }))

      trackInitiateCheckout({
        content_ids: contentIds,
        content_type: 'product',
        value: state.total,
        currency: 'ZAR',
        num_items: state.itemCount,
        contents: contents
      })
    }
  }, []) // Only track once on mount

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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="mb-6 sm:mb-8">
          <Link href="/cart" className="flex items-center text-pink-600 hover:text-pink-700 transition-colors mb-3 sm:mb-4 text-sm sm:text-base">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="font-dm-sans text-2xl sm:text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Complete your order</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          <div className="order-2 lg:order-1">
            <CheckoutForm />
          </div>
          <div className="order-1 lg:order-2">
            <CheckoutSummary />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

