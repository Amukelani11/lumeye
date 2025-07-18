"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Star, Minus, Plus, ShoppingBag, Zap } from "lucide-react"
import { useCart } from "../lib/cart-context"
import { trackViewContent, trackAddToCart, trackInitiateCheckout } from "../../lib/meta-pixel"

export default function ProductInfo() {
  const [quantity, setQuantity] = useState(1)
  const { dispatch } = useCart()
  const router = useRouter()

  // Track product view on component mount
  useEffect(() => {
    trackViewContent('Lumeye Under Eye Serum', 'product')
  }, [])

  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  const addToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: "lumeye-serum",
          name: "Lumeye Under Eye Serum",
          price: 299,
          image: "/lumeye shot 5.png",
        },
      })
    }
    // Track add to cart event
    trackAddToCart(299 * quantity, 'ZAR', 'Lumeye Under Eye Serum')
    // Reset quantity after adding to cart
    setQuantity(1)
  }

  const buyNow = () => {
    // Clear cart and add the item for immediate checkout
    dispatch({
      type: "BUY_NOW",
      payload: {
        id: "lumeye-serum",
        name: "Lumeye Under Eye Serum",
        price: 299,
        image: "/lumeye shot 5.png",
      },
    })
    // Track initiate checkout event
    trackInitiateCheckout(299 * quantity, 'ZAR')
    // Navigate to checkout
    router.push('/checkout')
  }

  const originalPrice = 599 // Compared at price
  const currentPrice = 299
  const savings = originalPrice - currentPrice
  const savingsPercentage = Math.round((savings / originalPrice) * 100)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-dm-sans text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Lumeye Under Eye Serum</h1>

        <div className="flex items-center mb-4">
          <div className="flex items-center mr-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <span className="text-gray-600">(127 reviews)</span>
        </div>

        {/* Price Display */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-3xl font-bold text-pink-600">R{currentPrice}</span>
            <span className="text-xl text-gray-400 line-through">R{originalPrice}</span>
            <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded-full">
              Save {savingsPercentage}%
            </span>
          </div>
          <p className="text-sm text-gray-600">
            You save R{savings} compared to similar premium eye serums
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-8">
          Transform tired, puffy eyes in just 60 seconds with our premium under-eye serum. Formulated with
          clinically-tested ingredients to depuff, brighten, and rejuvenate the delicate eye area. Perfect for all skin
          types, including sensitive skin.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 font-medium">Quantity:</span>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button onClick={decreaseQuantity} className="p-2 hover:bg-gray-100 transition-colors">
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 font-medium">{quantity}</span>
            <button onClick={increaseQuantity} className="p-2 hover:bg-gray-100 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Buy Now Button */}
          <button 
            onClick={buyNow} 
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <Zap className="w-5 h-5" />
            <span>Buy Now - R{currentPrice}</span>
          </button>

          {/* Add to Cart Button */}
          <button 
            onClick={addToCart} 
            className="w-full bg-white hover:bg-gray-50 text-pink-600 border-2 border-pink-600 font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>

          <Link href="/cart" className="text-pink-600 hover:text-pink-700 text-center block text-sm font-medium">
            View Cart & Checkout
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-600">
          <div>
            <div className="font-medium">Secure Checkout</div>
          </div>
          <div>
            <div className="font-medium">Fast Shipping</div>
          </div>
          <div>
            <div className="font-medium">30-Day Return</div>
          </div>
        </div>

        {/* Urgency Message */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-orange-800">
            <Zap className="w-4 h-4" />
            <span className="font-medium">Limited Time Offer</span>
          </div>
          <p className="text-orange-700 text-sm mt-1">
            Save R{savings} today! This special pricing won't last long.
          </p>
        </div>
      </div>
    </div>
  )
}
