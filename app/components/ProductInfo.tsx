"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Star, Minus, Plus, ShoppingBag, Zap, Check } from "lucide-react"
import { useCart } from "../lib/cart-context"

type ProductType = "wand" | "gel" | "bundle"

const products = {
  wand: {
    id: "lumeye-glow-wand",
    name: "Lumeye Glow Wand",
    price: 799,
    originalPrice: 999,
    image: "/lumeyewandhero.png",
    description: "A precision-engineered LED device that visibly smooths fine lines, reduces puffiness, and enhances your skin's natural radiance. Clinically tested wavelengths. Effortless, elegant, and effective.",
  },
  gel: {
    id: "lumeye-glow-gel",
    name: "Lumeye Glow Gel",
    price: 99,
    originalPrice: 129,
    image: "/lumeyegelhero.png",
    description: "Formulated to amplify LED results — combining Hyaluronic Acid and Soothing Aloe for deep hydration and enhanced skin comfort. LED-safe formula that won't interfere with light therapy.",
  },
  bundle: {
    id: "lumeye-glow-kit",
    name: "Lumeye Glow Kit",
    price: 849,
    originalPrice: 898, // 799 + 99
    image: "/lumeyebundleimage.png",
    description: "Maximize your results with the complete Lumeye system. Includes the Glow Wand and Glow Gel. Save when you bundle.",
  },
}

interface ProductInfoProps {
  selectedProduct?: ProductType
  onProductSelect?: (product: ProductType) => void
}

export default function ProductInfo({ selectedProduct: externalSelectedProduct, onProductSelect }: ProductInfoProps) {
  const [internalSelectedProduct, setInternalSelectedProduct] = useState<ProductType>("wand")
  const selectedProduct = externalSelectedProduct ?? internalSelectedProduct
  const [quantity, setQuantity] = useState(1)
  const { dispatch } = useCart()
  const router = useRouter()

  const handleProductSelect = (product: ProductType) => {
    setInternalSelectedProduct(product)
    onProductSelect?.(product)
  }

  const currentProduct = products[selectedProduct]
  const savings = currentProduct.originalPrice - currentProduct.price
  const savingsPercentage = Math.round((savings / currentProduct.originalPrice) * 100)

  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  const addToCart = (productType?: ProductType) => {
    const product = productType ? products[productType] : currentProduct
    const finalQuantity = productType ? 1 : quantity
    
    for (let i = 0; i < finalQuantity; i++) {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
      })
    }
    if (!productType) {
      setQuantity(1)
    }
  }

  const addBundleToCart = () => {
    // Add bundle as a single item
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: products.bundle.id,
        name: products.bundle.name,
        price: products.bundle.price,
        image: products.bundle.image,
      },
    })
  }

  const buyNow = () => {
    dispatch({
      type: "BUY_NOW",
      payload: {
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        image: currentProduct.image,
      },
    })
    router.push('/checkout')
  }

  return (
    <div className="space-y-8">
      {/* Product Details */}
      <div>
        <h1 className="font-dm-sans text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          {currentProduct.name}
        </h1>

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
            <span className="text-3xl font-bold text-pink-600">R{currentProduct.price}</span>
            <span className="text-xl text-gray-400 line-through">R{currentProduct.originalPrice}</span>
            <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded-full">
              Save {savingsPercentage}%
            </span>
          </div>
          <p className="text-sm text-gray-600">
            You save R{savings} compared to similar premium products
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-8">
          {currentProduct.description}
        </p>
      </div>

      <div className="space-y-6">
        {/* Product Selector */}
        <div>
          <label className="block text-gray-700 font-medium mb-3">Select Product:</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleProductSelect("wand")}
              className={`p-4 border-2 rounded-lg transition-all ${
                selectedProduct === "wand"
                  ? "border-pink-600 bg-pink-50"
                  : "border-gray-200 hover:border-pink-300 bg-white"
              }`}
            >
              <div className="text-left">
                <div className="font-semibold text-gray-900 mb-1">Glow Wand</div>
                <div className="text-sm text-gray-600">R{products.wand.price}</div>
              </div>
            </button>
            <button
              onClick={() => handleProductSelect("gel")}
              className={`p-4 border-2 rounded-lg transition-all ${
                selectedProduct === "gel"
                  ? "border-pink-600 bg-pink-50"
                  : "border-gray-200 hover:border-pink-300 bg-white"
              }`}
            >
              <div className="text-left">
                <div className="font-semibold text-gray-900 mb-1">Glow Gel</div>
                <div className="text-sm text-gray-600">R{products.gel.price}</div>
              </div>
            </button>
          </div>
        </div>

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
            <span>Buy Now - R{currentProduct.price}</span>
          </button>

          {/* Add to Cart Button */}
          <button 
            onClick={() => addToCart()} 
            className="w-full bg-white hover:bg-gray-50 text-pink-600 border-2 border-pink-600 font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>

          <Link href="/cart" className="text-pink-600 hover:text-pink-700 text-center block text-sm font-medium">
            View Cart & Checkout
          </Link>
        </div>

        {/* Bundle Card */}
        <div className="border-2 border-pink-400 rounded-xl p-6 bg-gradient-to-br from-pink-50 to-rose-50 relative overflow-hidden">
          <div className="absolute top-2 right-2 bg-pink-600 text-white px-3 py-1 rounded-lg text-xs font-bold">
            SAVE R{products.bundle.originalPrice - products.bundle.price}
          </div>
          
          <div className="mb-4">
            <h3 className="font-bold text-lg text-gray-900 mb-2">Glow Kit - Illuminate + Hydrate</h3>
            <p className="text-sm text-gray-700 mb-4">
              Bundle both products and save R{products.bundle.originalPrice - products.bundle.price}
            </p>
          </div>

          {/* Bundle Images */}
          <div className="flex gap-3 mb-4">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-white border border-gray-200">
              <Image
                src={products.wand.image}
                alt={products.wand.name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-white border border-gray-200">
              <Image
                src={products.gel.image}
                alt={products.gel.name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bundle Price */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-bold text-gray-900">R{products.bundle.price}</span>
              <span className="text-lg text-gray-400 line-through">R{products.bundle.originalPrice}</span>
            </div>
            <p className="text-xs text-gray-600">
              Save R{products.bundle.originalPrice - products.bundle.price} when you bundle
            </p>
          </div>

          {/* Bundle Features */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Check className="w-4 h-4 text-pink-600 flex-shrink-0" />
              <span>Lumeye Glow Wand</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Check className="w-4 h-4 text-pink-600 flex-shrink-0" />
              <span>Lumeye Glow Gel</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Check className="w-4 h-4 text-pink-600 flex-shrink-0" />
              <span>USB-C Charging Cable</span>
            </div>
          </div>

          <button
            onClick={addBundleToCart}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Add Bundle to Cart - R{products.bundle.price}
          </button>
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
      </div>
    </div>
  )
}
