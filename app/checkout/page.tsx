"use client"

import { useCart } from "../lib/cart-context"
import { useVisitorTracking } from "../../hooks/useVisitorTracking"
import { DiscountProvider, useDiscount } from "../lib/discount-context"
import CheckoutForm from "../components/CheckoutForm"
import CheckoutSummary from "../components/CheckoutSummary"
import BundleBanner from "../components/BundleBanner"
import Link from "next/link"
import { ArrowLeft, ShoppingBag, AlertCircle } from "lucide-react"
import Footer from "../components/Footer"
import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"

function CheckoutContent() {
  const { state, dispatch } = useCart()
  const { trackActivity } = useVisitorTracking()
  const { applyDiscount } = useDiscount()
  const searchParams = useSearchParams()
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [cartRestored, setCartRestored] = useState(false)
  const [bundleApplied, setBundleApplied] = useState(false)

  // Handle bundle parameter and restore cart
  useEffect(() => {
    const bundle = searchParams.get('bundle')
    
    if (bundle === 'glow-duo' && state.items.length === 0) {
      // Add bundle items to cart
      const bundleItems = [
        {
          id: "lumeye-serum",
          name: "Lumeye Under Eye Serum",
          price: 159,
          image: "/lumeye shot 5.png",
          quantity: 1
        },
        {
          id: "lumeye-glowsmile",
          name: "Lumeye GlowSmile - Instant Violet Whitening Drops",
          price: 199,
          image: "/lumeye teeth 1.png",
          quantity: 1
        }
      ]
      
      // Clear cart and add bundle items
      dispatch({ type: "CLEAR_CART" })
      bundleItems.forEach(item => {
        dispatch({
          type: "ADD_ITEM",
          payload: {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
          }
        })
      })
      
      setCartRestored(true)
      setBundleApplied(true)
      
      // Apply bundle discount
      const bundleSubtotal = bundleItems.reduce((sum, item) => sum + item.price, 0)
      applyDiscount('GLOWDUO', bundleSubtotal)
      
      console.log('Bundle items added to cart:', bundleItems)
    } else if (state.items.length === 0 && !cartRestored) {
      // Restore cart from localStorage if empty
      const savedCart = localStorage.getItem("lumeye-cart")
      if (savedCart) {
        try {
          const cartItems = JSON.parse(savedCart)
          if (cartItems && cartItems.length > 0) {
            dispatch({ type: "LOAD_CART", payload: cartItems })
            setCartRestored(true)
            console.log('Cart restored from localStorage:', cartItems)
          }
        } catch (error) {
          console.error("Failed to load cart from localStorage:", error)
        }
      }
    }
  }, [state.items.length, cartRestored, dispatch, searchParams, applyDiscount])

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
  }, [searchParams, trackActivity, state.items.length])

  // Track checkout page view and checkout start
  useEffect(() => {
    const cartValue = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    
    // Track page view
    trackActivity({
      action: 'page_view',
      page: '/checkout',
      cartValue,
      items: state.items
    })
    
    // Track checkout start (only if cart has items)
    if (state.items.length > 0) {
      trackActivity({
        action: 'checkout_start',
        page: '/checkout',
        cartValue,
        items: state.items
      })
    }
  }, [trackActivity, state.items])

  if (state.items.length === 0) {
    // Check if this is a cancelled payment return
    const paymentStatus = searchParams.get('payment_status')
    
    if (paymentStatus === 'cancelled' || paymentStatus === 'failed') {
      return (
        <>
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h1 className="font-dm-sans text-2xl font-bold text-gray-900 mb-4">Payment Cancelled</h1>
              <p className="text-gray-600 mb-8">Your payment was cancelled. Please return to your cart to try again.</p>
              <Link href="/cart" className="btn-primary">
                Return to Cart
              </Link>
            </div>
          </main>
          <Footer />
        </>
      )
    }
    
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
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-yellow-800">Payment Cancelled</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  {paymentError.includes('cancelled') 
                    ? 'Your payment was cancelled. You can try again below or return to your cart.'
                    : paymentError
                  }
                </p>
                {paymentError.includes('cancelled') && (
                  <div className="mt-3 flex space-x-3">
                    <Link 
                      href="/cart" 
                      className="text-sm text-yellow-800 hover:text-yellow-900 underline"
                    >
                      Return to Cart
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {bundleApplied && <BundleBanner />}
        <div className="grid lg:grid-cols-2 gap-12">
          <CheckoutForm />
          <CheckoutSummary />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function CheckoutPage() {
  return (
    <DiscountProvider>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
        </div>
      }>
        <CheckoutContent />
      </Suspense>
    </DiscountProvider>
  )
}

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic'
