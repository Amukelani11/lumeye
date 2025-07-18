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
    <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-center space-x-4">
      <div className="w-20 h-20 bg-cool-grey rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-dm-sans font-semibold text-gray-900 truncate">{item.name}</h3>
        <p className="text-pink-600 font-semibold mt-1">R{item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => updateQuantity(item.quantity - 1)}
            className="p-2 hover:bg-gray-100 transition-colors"
            disabled={item.quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-3 py-2 font-medium min-w-[3rem] text-center">{item.quantity}</span>
          <button onClick={() => updateQuantity(item.quantity + 1)} className="p-2 hover:bg-gray-100 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={removeItem}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          title="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="text-right min-w-[5rem]">
        <p className="font-semibold text-gray-900">R{(item.price * item.quantity).toFixed(2)}</p>
      </div>
    </div>
  )
}
