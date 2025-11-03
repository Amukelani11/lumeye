"use client"

import { useState, useEffect } from "react"
import { X, Mail, Gift, Sparkles } from "lucide-react"
import { useCart } from "../lib/cart-context"

export default function DiscountPopup() {
  const [showPopup, setShowPopup] = useState(false)
  const [email, setEmail] = useState("")
  const [discountCode, setDiscountCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { state } = useCart()

  // Show popup after 3 seconds if user has items in cart and hasn't seen it yet
  useEffect(() => {
    if (state.items.length > 0) {
      const hasSeenPopup = localStorage.getItem('lumeye_discount_popup_seen')
      const hasDiscountCode = localStorage.getItem('lumeye_discount_code')
      
      if (!hasSeenPopup && !hasDiscountCode) {
        const timer = setTimeout(() => {
          setShowPopup(true)
        }, 3000)
        return () => clearTimeout(timer)
      }
    }
  }, [state.items.length])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address")
      setLoading(false)
      return
    }

    try {
      // Get session ID
      const sessionId = localStorage.getItem('cart_session_id') || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('cart_session_id', sessionId)

      // Generate discount code
      const response = await fetch('/api/discount/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          sessionId,
          cartItems: state.items,
          totalValue: state.total
        })
      })

      const data = await response.json()

      if (response.ok && data.discountCode) {
        // Store discount code and email
        localStorage.setItem('lumeye_discount_code', data.discountCode)
        localStorage.setItem('lumeye_discount_email', email)
        localStorage.setItem('lumeye_discount_popup_seen', 'true')
        
        setDiscountCode(data.discountCode)
        setShowPopup(false)

        // Track cart abandonment with email
        fetch('/api/track-cart-abandonment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            email,
            cartItems: state.items.map(item => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image
            })),
            totalValue: state.total
          })
        }).catch(err => console.error('Cart abandonment tracking error:', err))
      } else {
        setError(data.error || 'Failed to generate discount code')
      }
    } catch (err) {
      console.error('Error generating discount code:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setShowPopup(false)
    localStorage.setItem('lumeye_discount_popup_seen', 'true')
  }

  // Check if user already has a discount code
  useEffect(() => {
    const savedCode = localStorage.getItem('lumeye_discount_code')
    if (savedCode) {
      setDiscountCode(savedCode)
    }
  }, [])

  if (!showPopup && !discountCode) return null

  // Show success message if discount code exists
  if (discountCode && !showPopup) {
    return (
      <div className="fixed bottom-4 right-4 z-50 max-w-sm">
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl shadow-2xl p-6 border-2 border-pink-400">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Gift className="w-6 h-6" />
              <h3 className="font-bold text-lg">Discount Applied!</h3>
            </div>
            <button
              onClick={() => {
                setDiscountCode("")
                localStorage.removeItem('lumeye_discount_code')
              }}
              className="text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm mb-2">Your 10% discount code:</p>
          <div className="bg-white/20 rounded-lg p-3 mb-2">
            <code className="text-lg font-bold tracking-wider">{discountCode}</code>
          </div>
          <p className="text-xs opacity-90">This code will be automatically applied at checkout</p>
        </div>
      </div>
    )
  }

  if (!showPopup) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Popup */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border-2 border-pink-200">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Get <span className="text-pink-600">10% Off</span> Your Order!
          </h2>
          <p className="text-gray-600">
            Enter your email to unlock your exclusive discount code
          </p>
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <label htmlFor="popup-email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="popup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="your@email.com"
                required
                autoFocus
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Generating Code...</span>
              </>
            ) : (
              <>
                <Gift className="w-5 h-5" />
                <span>Get My 10% Discount</span>
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-4">
          By submitting, you agree to receive marketing emails. Unsubscribe anytime.
        </p>
      </div>
    </div>
  )
}

