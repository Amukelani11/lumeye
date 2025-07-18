"use client"

import type React from "react"

import { useState } from "react"
import Footer from "../components/Footer"
import { Search, Package, Truck, CheckCircle, MapPin } from "lucide-react"

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [email, setEmail] = useState("")
  const [trackingResult, setTrackingResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setTrackingResult(null)

    try {
      const response = await fetch('/api/track-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderNumber,
          email
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setTrackingResult(data.trackingInfo)
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Order not found. Please check your order number and email address.")
      }
    } catch (error) {
      setError("An error occurred while tracking your order. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="font-dm-sans text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Track Your Order</h1>
          <p className="text-gray-600 text-lg">Enter your order details to track your Lumeye delivery</p>
        </div>

        {/* Tracking Form */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8">
          <form onSubmit={handleTrackOrder} className="space-y-6">
            <div>
              <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Order Number *
              </label>
              <input
                type="text"
                id="orderNumber"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                placeholder="e.g., LUM123456"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Tracking...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Track Order
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>

        {/* Tracking Results */}
        {trackingResult && (
          <div className="space-y-8">
            {/* Order Summary */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-dm-sans text-xl font-semibold text-gray-900">
                  Order #{trackingResult.orderNumber}
                </h2>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {trackingResult.status}
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Tracking Number</p>
                  <p className="font-semibold text-gray-900">{trackingResult.trackingNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Estimated Delivery</p>
                  <p className="font-semibold text-gray-900">{trackingResult.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-dm-sans text-lg font-semibold text-gray-900 mb-6">Tracking Timeline</h3>
              <div className="space-y-6">
                {trackingResult.timeline.map((item: any, index: number) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        item.completed
                          ? item.current
                            ? "bg-pink-600 text-white"
                            : "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {item.completed ? (
                        item.current ? (
                          <Truck className="w-4 h-4" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )
                      ) : (
                        <Package className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`font-medium ${
                            item.current ? "text-pink-600" : item.completed ? "text-gray-900" : "text-gray-500"
                          }`}
                        >
                          {item.status}
                        </h4>
                        <div className="text-right">
                          <p className={`text-sm ${item.completed ? "text-gray-900" : "text-gray-500"}`}>{item.date}</p>
                          <p className={`text-xs ${item.completed ? "text-gray-600" : "text-gray-400"}`}>{item.time}</p>
                        </div>
                      </div>
                      {item.current && (
                        <p className="text-sm text-pink-600 mt-1">
                          Your order is currently in transit and will be delivered soon!
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Information */}
            {trackingResult.shippingAddress && (
              <div className="bg-blush p-6 rounded-2xl">
                <h3 className="font-dm-sans text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 text-pink-600 mr-2" />
                  Delivery Information
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Delivery Address:</strong> {trackingResult.shippingAddress.address}, {trackingResult.shippingAddress.city}, {trackingResult.shippingAddress.postalCode}
                  </p>
                  <p>
                    <strong>Recipient:</strong> {trackingResult.shippingAddress.firstName} {trackingResult.shippingAddress.lastName}
                  </p>
                  <p>
                    <strong>Country:</strong> {trackingResult.shippingAddress.country}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Demo Instructions */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <h3 className="font-dm-sans text-lg font-semibold text-gray-900 mb-3">Demo Instructions</h3>
          <p className="text-gray-700 mb-2">To see the tracking demo, use these details:</p>
          <ul className="text-gray-700 space-y-1">
            <li>
              <strong>Order Number:</strong> LUM123456
            </li>
            <li>
              <strong>Email:</strong> Any valid email address
            </li>
          </ul>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <h3 className="font-dm-sans text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-4">Can't find your order or having trouble tracking? We're here to help!</p>
          <div className="space-y-2">
            <p className="text-gray-700">
              <strong>Email:</strong>{" "}
              <a href="mailto:support@lumeye.co.za" className="text-pink-600 hover:underline">
                support@lumeye.co.za
              </a>
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong>{" "}
              <a href="tel:+27123456789" className="text-pink-600 hover:underline">
                +27 12 345 6789
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
