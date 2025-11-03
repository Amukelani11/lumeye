"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart, type CartItem as CartItemType } from "../lib/cart-context"

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { dispatch } = useCart()

  const updateQuantity = (newQuantity: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: item.id, quantity: newQuantity },
    })
  }

  const removeItem = () => {
    dispatch({ type: "REMOVE_ITEM", payload: item.id })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        {/* Image */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-cool-grey rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            width={80}
            height={80}
            className="w-full h-full object-cover"
            quality={75}
            loading="lazy"
            sizes="80px"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>

        {/* Product Info and Actions */}
        <div className="flex-1 min-w-0 w-full sm:w-auto">
          <div className="flex items-start justify-between gap-2 sm:gap-4 mb-2 sm:mb-0">
            <div className="flex-1 min-w-0">
              <h3 className="font-dm-sans font-semibold text-sm sm:text-base text-gray-900 truncate">{item.name}</h3>
              <p className="text-pink-600 font-semibold mt-1 text-sm sm:text-base">R{item.price.toFixed(2)}</p>
            </div>
            
            {/* Price - Mobile */}
            <div className="text-right sm:hidden">
              <p className="font-semibold text-gray-900 text-sm">R{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between sm:justify-start gap-3 mt-3 sm:mt-2">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => updateQuantity(item.quantity - 1)}
                className="p-2 hover:bg-gray-100 transition-colors touch-manipulation"
                disabled={item.quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 py-2 font-medium min-w-[3rem] text-center text-sm sm:text-base">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.quantity + 1)} 
                className="p-2 hover:bg-gray-100 transition-colors touch-manipulation"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={removeItem}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors touch-manipulation"
              title="Remove item"
              aria-label="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Price - Desktop */}
        <div className="hidden sm:block text-right min-w-[5rem]">
          <p className="font-semibold text-gray-900 text-base">R{(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}
