"use client"

import Image from "next/image"
import { useCart } from "../lib/cart-context"
import { useDiscount } from "../lib/discount-context"

export default function CheckoutSummary() {
  const { state } = useCart()
  const { discountApplied, discountAmount, discountCode } = useDiscount()

  const subtotal = state.total
  const shipping = 0 // Free shipping for all orders
  const total = subtotal + shipping - (discountApplied ? discountAmount : 0)

  return (
    <div className="bg-cool-grey p-8 rounded-2xl h-fit">
      <h2 className="font-dm-sans text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {state.items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 text-sm truncate">{item.name}</h3>
              <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900 text-sm">R{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-6 space-y-3">
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
        {discountApplied && discountAmount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Bundle Discount ({discountCode})</span>
            <span>-R{discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="border-t pt-3 flex justify-between font-semibold text-lg text-gray-900">
          <span>Total</span>
          <span>R{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Free shipping message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
        <p className="text-sm text-green-800">🎉 Free shipping on all orders!</p>
      </div>

      {discountApplied && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
          <p className="text-sm text-green-800">🎉 Your {discountCode === 'GLOWDUO' ? 'Glow Duo Bundle' : discountCode} discount has been applied!</p>
        </div>
      )}

      <div className="mt-6 text-center text-sm text-gray-600">
        <p>🔒 Your payment information is secure and encrypted</p>
      </div>
    </div>
  )
}
