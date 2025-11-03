"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Shield, Truck, RotateCcw, ExternalLink } from "lucide-react"
import { useCart } from "../lib/cart-context"
import { getStoredTrackingParams } from "@/lib/url-tracking"

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
  const [discountCode, setDiscountCode] = useState("")
  const [discountError, setDiscountError] = useState("")
  const [applyingDiscount, setApplyingDiscount] = useState(false)
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

  // Load discount code from localStorage on mount and when state changes
  useEffect(() => {
    const savedCode = localStorage.getItem('lumeye_discount_code')
    if (savedCode && !state.discountCode) {
      handleApplyDiscount(savedCode)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.discountCode])

  const handleApplyDiscount = async (code?: string) => {
    const codeToApply = code || discountCode.trim()
    if (!codeToApply) return

    setDiscountError("")
    setApplyingDiscount(true)

    try {
      const response = await fetch('/api/discount/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeToApply })
      })

      const data = await response.json()

      if (data.valid && data.discountPercentage) {
        dispatch({
          type: 'APPLY_DISCOUNT',
          payload: { code: data.code, percentage: data.discountPercentage }
        })
        setDiscountCode(data.code)
        localStorage.setItem('lumeye_discount_code', data.code)
      } else {
        setDiscountError(data.error || 'Invalid discount code')
        dispatch({ type: 'REMOVE_DISCOUNT' })
      }
    } catch (err) {
      console.error('Error validating discount code:', err)
      setDiscountError('Failed to validate discount code')
      dispatch({ type: 'REMOVE_DISCOUNT' })
    } finally {
      setApplyingDiscount(false)
    }
  }

  // Track checkout abandonment immediately when email is entered
  useEffect(() => {
    if (state.items.length > 0 && formData.email && formData.email.includes('@')) {
      const sessionId = localStorage.getItem('cart_session_id') || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('cart_session_id', sessionId)
      
      // Debounce to avoid too many API calls
      const timeoutId = setTimeout(() => {
        fetch('/api/track-checkout-abandonment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            email: formData.email,
            checkoutItems: state.items.map(item => ({
              id: item.id,
              product_name: item.name,
              quantity: item.quantity,
              unit_price: item.price,
              product_image: item.image
            })),
            totalValue: state.total,
            formData: formData
          })
        }).catch(err => console.error('Checkout abandonment tracking error:', err))
      }, 1000) // Small delay to avoid excessive calls
      
      return () => clearTimeout(timeoutId)
    }
  }, [formData.email, state.items, state.total])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // Email is now tracked immediately via useEffect above
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

  // Order creation moved to order-confirmation page after payment verification

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
      // Calculate total amount with discount
      const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const discount = state.discountPercentage ? subtotal * (state.discountPercentage / 100) : 0
      const shipping = 0 as number // Free shipping for all orders
      const total = subtotal - discount + shipping

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

      // Get tracking parameters for attribution
      const trackingParams = getStoredTrackingParams()

      // Store checkout data in sessionStorage for order creation after payment
      sessionStorage.setItem('pending_checkout', JSON.stringify({
        checkoutId: checkoutResult.checkout.id,
        amount: total,
        formData: formData,
        items: state.items,
        checkoutUrl: checkoutResult.checkout.redirectUrl,
        trackingParams: trackingParams || {} // Include tracking parameters
      }))

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
      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        {/* Discount Code */}
        {state.discountCode ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Discount Applied!</p>
                <p className="text-xs text-green-600 mt-1">Code: <span className="font-mono font-semibold">{state.discountCode}</span> ({state.discountPercentage}% off)</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  dispatch({ type: 'REMOVE_DISCOUNT' })
                  localStorage.removeItem('lumeye_discount_code')
                  setDiscountCode("")
                }}
                className="text-sm text-green-700 hover:text-green-900 underline"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
            <label htmlFor="discountCode" className="block text-sm font-medium text-gray-700 mb-2">
              Have a discount code?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="discountCode"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === 'Enter' && handleApplyDiscount()}
                className={`flex-1 px-4 py-2 text-base bg-white text-gray-900 border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent ${
                  discountError ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter discount code"
              />
              <button
                type="button"
                onClick={() => handleApplyDiscount()}
                disabled={applyingDiscount || !discountCode.trim()}
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
              >
                {applyingDiscount ? "..." : "Apply"}
              </button>
            </div>
            {discountError && <p className="mt-1 text-sm text-red-600">{discountError}</p>}
          </div>
        )}

        {/* Contact Information */}
        <div>
          <h2 className="font-dm-sans text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Contact Information</h2>
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
              className={`w-full px-4 py-3 text-base bg-white text-gray-900 border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
        </div>

        {/* Shipping Information */}
        <div>
          <h2 className="font-dm-sans text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Shipping Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
                className={`w-full px-4 py-3 text-base bg-white text-gray-900 border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent ${
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
                className={`w-full px-4 py-3 text-base bg-white text-gray-900 border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent ${
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
              className={`w-full px-4 py-3 text-base bg-white text-gray-900 border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="123 Main Street"
            />
            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
                className={`w-full px-4 py-3 text-base bg-white text-gray-900 border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent ${
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
                className={`w-full px-4 py-3 text-base bg-white text-gray-900 border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent ${
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
              className={`w-full px-4 py-3 text-base bg-white text-gray-900 border rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="0123456789"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>
        </div>

        {/* Trust Signals */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center text-xs sm:text-sm text-gray-600 py-4 sm:py-6 border-t">
          <div className="flex flex-col items-center">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 mb-1 sm:mb-2" />
            <span className="break-words">Secure Checkout</span>
          </div>
          <div className="flex flex-col items-center">
            <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 mb-1 sm:mb-2" />
            <span className="break-words">Fast Shipping</span>
          </div>
          <div className="flex flex-col items-center">
            <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 mb-1 sm:mb-2" />
            <span className="break-words">30-Day Return</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isButtonDisabled}
          className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 sm:py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 text-base sm:text-lg touch-manipulation"
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

        <div className="text-center text-xs sm:text-sm text-gray-600 px-2">
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

