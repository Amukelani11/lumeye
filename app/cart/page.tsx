"use client"

import { useCart } from "../lib/cart-context"
import CartItem from "../components/CartItem"
import Link from "next/link"
import { ShoppingBag, ArrowLeft } from "lucide-react"
import Footer from "../components/Footer"

export default function CartPage() {
  const { state } = useCart()

  if (state.items.length === 0) {
    return (
      <>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="font-dm-sans text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <Link href="/product" className="btn-primary">
              Shop Now
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const subtotal = state.total
  const shipping = 0 as number // Free shipping for all orders
  const total = subtotal + shipping

  return (
    <>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/product" className="flex items-center text-pink-600 hover:text-pink-700 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="font-dm-sans text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {state.itemCount} {state.itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-cool-grey p-6 rounded-2xl h-fit">
            <h2 className="font-dm-sans text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>R{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                  {shipping === 0 ? "Free" : `R${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t pt-4 flex justify-between font-semibold text-lg text-gray-900">
                <span>Total</span>
                <span>R{total.toFixed(2)}</span>
              </div>
            </div>


            <Link href="/checkout" className="btn-primary w-full text-center block">
              Proceed to Checkout
            </Link>

            <div className="mt-4 text-center text-sm text-gray-600">
              <p>Secure checkout with SSL encryption</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
