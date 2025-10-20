"use client"

import Image from "next/image"

export default function OrderSummary() {
  return (
    <div className="bg-cool-grey p-8 rounded-2xl">
      <h2 className="font-dm-sans text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-white rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt="Lumeye Under Eye Serum"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">Lumeye Under Eye Serum</h3>
            <p className="text-gray-600 text-sm">Quantity: 1</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-900">R159.00</p>
          </div>
        </div>

        <div className="border-t pt-6 space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>R159.00</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          <div className="border-t pt-3 flex justify-between font-semibold text-lg text-gray-900">
            <span>Total</span>
            <span>R159.00</span>
          </div>
        </div>

        <button className="btn-primary w-full">Complete Order</button>

        <div className="text-center text-sm text-gray-600">
          <p>By completing your order, you agree to our</p>
          <p>
            <a href="#" className="text-rose-gold hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-rose-gold hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
