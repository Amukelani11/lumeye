"use client"

import type React from "react"
import { useState } from "react"
import { Shield, Truck, RotateCcw, CreditCard, Lock, ExternalLink } from "lucide-react"
import { useCart } from "../lib/cart-context"

interface FormData {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  postalCode: string
  phone: string
}

interface FormErrors {
  [key: string]: string
}

export default function CheckoutForm() {
  const { state, dispatch } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // Capture email for abandoned cart tracking
    if (name === 'email' && value && value.includes('@')) {
      const sessionId = localStorage.getItem('cart_session_id') || `session_${Date.now()}`
      fetch('/api/capture-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: value,
          sessionId,
          cartData: state.items
        }),
      }).catch(error => {
        console.error('Error capturing email:', error)
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Required field validation
    const requiredFields = [
      "email",
      "firstName",
      "lastName",
      "address",
      "city",
      "postalCode",
      "phone",
    ]

    requiredFields.forEach((field) => {
      if (!formData[field as keyof FormData].trim()) {
        newErrors[field] = "This field is required"
      }
    })

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const createOrder = async (checkoutId: string, paymentAmount: number) => {
    try {
      const shippingAddress = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_line_1: formData.address,
        city: formData.city,
        postal_code: formData.postalCode,
        country: 'ZA'
      }

      const orderData = {
        email: formData.email,
        phone: formData.phone,
        shippingAddress,
        paymentMethod: 'yoco',
        paymentId: checkoutId,
        paymentAmount: paymentAmount,
        notes: `Payment processed via Yoco Checkout. Checkout ID: ${checkoutId}`,
        items: state.items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity,
          name: item.name,
          images: [item.image]
        }))
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create order')
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Error creating order:', error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (state.items.length === 0) {
      alert("Your cart is empty. Please add items before checkout.")
      return
    }

    setIsProcessing(true)

    try {
      // Calculate total amount
      const subtotal = state.total
      const shipping = 0 as number // Free shipping for all orders
      const total = subtotal + shipping

      console.log('Creating Yoco checkout for amount:', total)
      console.log('Cart items:', state.items)
      console.log('Cart total:', state.total)
      console.log('Amount in rand:', total)
      console.log('Amount in cents:', Math.round(total * 100))

      // Create line items for display
      const lineItems = state.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        unitPrice: Math.round(item.price * 100), // in cents
        totalPrice: Math.round(item.price * item.quantity * 100) // in cents
      }))

      // Create Yoco checkout
      const checkoutResponse = await fetch('/api/yoco/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          currency: 'ZAR',
          metadata: {
            email: formData.email,
            phone: formData.phone,
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode
          },
          lineItems
        })
      })

      if (!checkoutResponse.ok) {
        const errorData = await checkoutResponse.json()
        throw new Error(errorData.error || 'Failed to create checkout')
      }

      const checkoutResult = await checkoutResponse.json()
      console.log('Checkout created successfully:', checkoutResult)

      // Create order in database
      const orderResult = await createOrder(checkoutResult.checkout.id, total)

      if (!orderResult.success) {
        throw new Error('Failed to create order')
      }

      // Clear cart
      dispatch({ type: "CLEAR_CART" })

      // Redirect to Yoco checkout page
      console.log('Redirecting to Yoco checkout:', checkoutResult.checkout.redirectUrl)
      window.location.href = checkoutResult.checkout.redirectUrl
      
    } catch (error) {
      console.error('Checkout error:', error)
      
      if (error instanceof Error) {
        alert(`Checkout failed: ${error.message}`)
      } else {
        alert("Checkout failed. Please try again.")
      }
    } finally {
      setIsProcessing(false)
    }
  }

  // Debug information
  const isButtonDisabled = isProcessing || state.items.length === 0
  const buttonText = isProcessing 
    ? "Creating Checkout..." 
    : state.items.length === 0 
    ? "Cart is Empty" 
    : "Proceed to Payment"

  console.log('Checkout form state:', {
    isProcessing,
    cartItems: state.items.length,
    total: state.total,
    isButtonDisabled
  })

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Information */}
        <div>
          <h2 className="font-dm-sans text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
        </div>

        {/* Shipping Information */}
        <div>
          <h2 className="font-dm-sans text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="123 Main Street"
            />
            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
                Postal Code *
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent ${
                  errors.postalCode ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="0123456789"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>
        </div>

        {/* Payment Information */}
        <div>
          <h2 className="font-dm-sans text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Payment Information
          </h2>
          
          <div className="bg-gray-50 p-6 rounded-lg border">
            <div className="flex items-center mb-4">
              <img 
                src="https://www.yoco.com/static/images/yoco-logo.svg" 
                alt="Yoco" 
                className="h-8 mr-3"
              />
              <span className="font-medium text-gray-900">Secure Payment with Yoco</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              You'll be redirected to Yoco's secure payment page to complete your purchase. We accept all major credit and debit cards.
            </p>
            <div className="flex space-x-2">
              <img src="https://www.yoco.com/static/images/payment-methods/visa.svg" alt="Visa" className="h-6" />
              <img src="https://www.yoco.com/static/images/payment-methods/mastercard.svg" alt="Mastercard" className="h-6" />
              <img src="https://www.yoco.com/static/images/payment-methods/amex.svg" alt="American Express" className="h-6" />
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-600 py-6 border-t">
          <div className="flex flex-col items-center">
            <Shield className="w-6 h-6 text-pink-600 mb-2" />
            <span>Secure Checkout</span>
          </div>
          <div className="flex flex-col items-center">
            <Truck className="w-6 h-6 text-pink-600 mb-2" />
            <span>Fast Shipping</span>
          </div>
          <div className="flex flex-col items-center">
            <RotateCcw className="w-6 h-6 text-pink-600 mb-2" />
            <span>30-Day Return</span>
          </div>
        </div>

        {/* Debug Info (remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
            <p><strong>Debug Info:</strong></p>
            <p>Cart Items: {state.items.length}</p>
            <p>Cart Total: R{state.total}</p>
            <p>Button Disabled: {isButtonDisabled ? 'Yes' : 'No'}</p>
            <p>Processing: {isProcessing ? 'Yes' : 'No'}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isButtonDisabled}
          className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Creating Checkout...</span>
            </>
          ) : (
            <>
              <ExternalLink className="w-5 h-5" />
              <span>{buttonText}</span>
            </>
          )}
        </button>

        <div className="text-center text-sm text-gray-600">
          <p>By completing your order, you agree to our</p>
          <p>
            <a href="#" className="text-pink-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-pink-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}
