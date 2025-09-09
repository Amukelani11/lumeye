"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Star, Minus, Plus, ShoppingBag, Zap, Gift } from "lucide-react"
import { useCart } from "../lib/cart-context"
import { trackViewContent, trackAddToCart, trackInitiateCheckout } from "../../lib/meta-pixel"
import { trackViewItem, trackAddToCart as gaTrackAddToCart, trackBeginCheckout as gaTrackBeginCheckout } from "../../lib/google-analytics"
import { useVisitorTracking } from "../../hooks/useVisitorTracking"

export default function ProductInfo() {
  const [quantity, setQuantity] = useState(1)
  const { dispatch } = useCart()
  const router = useRouter()
  const { trackActivity } = useVisitorTracking()

  // Track product view on component mount
  useEffect(() => {
    trackViewContent('Lumeye Under Eye Serum', 'product')
    trackViewItem({
      item_id: 'lumeye-serum',
      item_name: 'Lumeye Under Eye Serum',
      price: 159,
      currency: 'ZAR',
      quantity: 1
    })
    trackActivity({ 
      action: 'page_view',
      page: '/product'
    })
  }, [trackActivity])

  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  const addToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: "lumeye-serum",
          name: "Lumeye Under Eye Serum",
          price: 159,
          image: "/lumeye shot 5.png",
        },
      })
    }
    // Track add to cart event
    trackAddToCart(159 * quantity, 'ZAR', 'Lumeye Under Eye Serum')
    gaTrackAddToCart({
      item_id: 'lumeye-serum',
      item_name: 'Lumeye Under Eye Serum',
      price: 159,
      currency: 'ZAR',
      quantity: quantity
    })
    trackActivity({
      action: 'cart_add',
      cartValue: 159 * quantity,
      items: [{ name: 'Lumeye Under Eye Serum', quantity, price: 159 }]
    })
    // Reset quantity after adding to cart
    setQuantity(1)
  }

  const buyNow = () => {
    // Clear cart and add the item for immediate checkout with selected quantity
    dispatch({
      type: "BUY_NOW",
      payload: {
        id: "lumeye-serum",
        name: "Lumeye Under Eye Serum",
        price: 159,
        image: "/lumeye shot 5.png",
        quantity: quantity,
      },
    })
    // Track initiate checkout event
    trackInitiateCheckout(159 * quantity, 'ZAR')
    gaTrackBeginCheckout([{
      item_id: 'lumeye-serum',
      item_name: 'Lumeye Under Eye Serum',
      price: 159,
      quantity: quantity
    }], 'ZAR')
    trackActivity({
      action: 'checkout_start',
      cartValue: 159 * quantity,
      items: [{ name: 'Lumeye Under Eye Serum', quantity, price: 159 }]
    })
    // Navigate to checkout
    router.push('/checkout')
  }

  const originalPrice = 299 // Compared at price
  const currentPrice = 159
  const savings = originalPrice - currentPrice
  const savingsPercentage = Math.round((savings / originalPrice) * 100)

  // Buy 2 Get 1 Free calculation
  const buy2Get1Price = currentPrice * 2 // Pay for 2, get 3
  const buy2Get1Savings = (currentPrice * 3) - buy2Get1Price // Save 1 bottle price
  const buy2Get1SavingsPercentage = Math.round((buy2Get1Savings / (currentPrice * 3)) * 100)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-dm-sans text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Lumeye Under Eye Serum
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          Erase Puffiness in 60 Seconds
        </p>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <span className="text-lg font-semibold text-gray-900">4.9/5</span>
          <span className="text-gray-600">(2,847+ reviews)</span>
        </div>
      </div>

      {/* Buy 2 Get 1 Free Promotion */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border-2 border-purple-200">
        <div className="flex items-center gap-2 mb-4">
          <Gift className="w-6 h-6 text-purple-600" />
          <span className="text-lg font-bold text-purple-600">BUY 2 GET 1 FREE!</span>
        </div>
        
        {/* Visual representation */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="relative">
            <div className="w-16 h-16 bg-white rounded-lg border-2 border-purple-300 flex items-center justify-center">
              <div className="w-8 h-8 bg-purple-200 rounded"></div>
            </div>
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">R159</span>
          </div>
          <span className="text-2xl font-bold text-gray-400">+</span>
          <div className="relative">
            <div className="w-16 h-16 bg-white rounded-lg border-2 border-purple-300 flex items-center justify-center">
              <div className="w-8 h-8 bg-purple-200 rounded"></div>
            </div>
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium">R159</span>
          </div>
          <span className="text-2xl font-bold text-gray-400">=</span>
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg border-2 border-purple-500 flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-green-600">FREE!</span>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">R{buy2Get1Price.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mb-2">for 3 bottles (Save R{buy2Get1Savings.toLocaleString()})</div>
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
            Save {buy2Get1SavingsPercentage}%
          </div>
        </div>
      </div>

      {/* Regular Pricing */}
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold text-pink-600">R{currentPrice}</div>
          <div className="text-2xl text-gray-400 line-through">R{originalPrice}</div>
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Save {savingsPercentage}%
          </div>
        </div>
        <p className="text-green-600 font-medium">You save R{savings}!</p>
      </div>

      {/* Quantity Selector */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Quantity</label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={decreaseQuantity}
              className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-16 text-center font-semibold">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="text-sm text-gray-600">
            Total: R{(currentPrice * quantity).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <button
          onClick={buyNow}
          className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5" />
          Buy Now - R{(currentPrice * quantity).toLocaleString()}
        </button>
        
        <button
          onClick={addToCart}
          className="w-full bg-white border-2 border-pink-600 text-pink-600 py-4 px-6 rounded-xl font-semibold hover:bg-pink-50 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          Add to Cart
        </button>
      </div>

      {/* Trust Signals */}
      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">Free</div>
          <p className="text-sm text-gray-600">SA Shipping</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">30 Days</div>
          <p className="text-sm text-gray-600">Money Back</p>
        </div>
      </div>

      {/* Product Benefits */}
      <div className="space-y-3 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
          </div>
          <span className="text-gray-700">Reduces puffiness & dark circles</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
          </div>
          <span className="text-gray-700">Smooths fine lines & wrinkles</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
          </div>
          <span className="text-gray-700">Hydrates & rejuvenates in 60 seconds</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
          </div>
          <span className="text-gray-700">Safe for sensitive skin</span>
        </div>
      </div>
    </div>
  )
}
