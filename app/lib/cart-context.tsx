"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  discountCode?: string
  discountPercentage?: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }
  | { type: "BUY_NOW"; payload: Omit<CartItem, "quantity"> }
  | { type: "APPLY_DISCOUNT"; payload: { code: string; percentage: number } }
  | { type: "REMOVE_DISCOUNT" }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
        return calculateTotals({ ...state, items: updatedItems })
      } else {
        const newItem = { ...action.payload, quantity: 1 }
        return calculateTotals({ ...state, items: [...state.items, newItem] })
      }
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter((item) => item.id !== action.payload)
      return calculateTotals({ ...state, items: updatedItems })
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        const updatedItems = state.items.filter((item) => item.id !== action.payload.id)
        return calculateTotals({ ...state, items: updatedItems })
      }

      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
      )
      return calculateTotals({ ...state, items: updatedItems })
    }

    case "CLEAR_CART":
      return { items: [], total: 0, itemCount: 0, discountCode: undefined, discountPercentage: undefined }

    case "APPLY_DISCOUNT":
      return { ...state, discountCode: action.payload.code, discountPercentage: action.payload.percentage }

    case "REMOVE_DISCOUNT":
      return { ...state, discountCode: undefined, discountPercentage: undefined }

    case "LOAD_CART":
      return calculateTotals({ ...state, items: action.payload })

    case "BUY_NOW": {
      // Clear cart and add only the buy now item
      const newItem = { ...action.payload, quantity: 1 }
      return calculateTotals({ ...state, items: [newItem] })
    }

    default:
      return state
  }
}

function calculateTotals(state: Omit<CartState, "total" | "itemCount">): CartState {
  // Check if both wand and gel are in the cart
  const wandItem = state.items.find(item => item.id === "lumeye-glow-wand")
  const gelItem = state.items.find(item => item.id === "lumeye-glow-gel")
  const bundleItem = state.items.find(item => item.id === "lumeye-glow-kit")
  
  let processedItems = [...state.items]
  
  // If both wand and gel are present, automatically convert to bundle(s)
  if (wandItem && gelItem && !bundleItem) {
    const minQuantity = Math.min(wandItem.quantity, gelItem.quantity)
    
    if (minQuantity > 0) {
      // Remove used wand and gel items
      processedItems = processedItems.filter(item => item.id !== "lumeye-glow-wand" && item.id !== "lumeye-glow-gel")
      
      // Add bundle with the combined quantity
      processedItems.push({
        id: "lumeye-glow-kit",
        name: "Lumeye Glow Kit",
        price: 749,
        quantity: minQuantity,
        image: "/lumeyebundleimage.png"
      })
      
      // Add remaining wand/gel quantities if any
      if (wandItem.quantity > minQuantity) {
        processedItems.push({
          ...wandItem,
          quantity: wandItem.quantity - minQuantity
        })
      }
      if (gelItem.quantity > minQuantity) {
        processedItems.push({
          ...gelItem,
          quantity: gelItem.quantity - minQuantity
        })
      }
    }
  }
  
  let subtotal = processedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = processedItems.reduce((sum, item) => sum + item.quantity, 0)
  
  // Apply discount if present
  let total = subtotal
  if (state.discountPercentage) {
    const discount = subtotal * (state.discountPercentage / 100)
    total = subtotal - discount
  }
  
  return { ...state, items: processedItems, total, itemCount }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
    discountCode: undefined,
    discountPercentage: undefined,
  })

  // Load cart and discount code from localStorage on mount
  useEffect(() => {
    // Load discount code
    const savedDiscountCode = localStorage.getItem('lumeye_discount_code')
    if (savedDiscountCode) {
      // Validate discount code
      fetch('/api/discount/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: savedDiscountCode })
      })
        .then(res => res.json())
        .then(data => {
          if (data.valid && data.discountPercentage) {
            dispatch({
              type: 'APPLY_DISCOUNT',
              payload: { code: savedDiscountCode, percentage: data.discountPercentage }
            })
          } else {
            localStorage.removeItem('lumeye_discount_code')
          }
        })
        .catch(err => console.error('Error validating discount code:', err))
    }

    const savedCart = localStorage.getItem("lumeye-cart")
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart)

        // Check if any items have old product IDs and update them
        const updatedItems = cartItems.map((item: CartItem) => {
          // Update old product references
          if (item.id === "lumeye-serum" || item.id === "lumeye-under-eye-serum") {
            return { ...item, id: "lumeye-glow-wand", price: 699, name: "Lumeye Glow Wand", image: "/lumeyewandhero.png" }
          }
          return item
        })

        // If items were updated, save back to localStorage and dispatch
        if (JSON.stringify(cartItems) !== JSON.stringify(updatedItems)) {
          localStorage.setItem("lumeye-cart", JSON.stringify(updatedItems))
          dispatch({ type: "LOAD_CART", payload: updatedItems })
        } else {
          dispatch({ type: "LOAD_CART", payload: cartItems })
        }
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error)
        // Clear corrupted cart data
        localStorage.removeItem("lumeye-cart")
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("lumeye-cart", JSON.stringify(state.items))
    
    // Track cart abandonment when items are in cart
    if (state.items.length > 0) {
      const sessionId = localStorage.getItem('cart_session_id') || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('cart_session_id', sessionId)
      
      // Debounce cart abandonment tracking
      const timeoutId = setTimeout(() => {
        fetch('/api/track-cart-abandonment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            cartItems: state.items.map(item => ({
              product_name: item.name,
              quantity: item.quantity,
              unit_price: item.price,
              product_image: item.image
            })),
            totalValue: state.total
          })
        }).catch(err => console.error('Cart abandonment tracking error:', err))
      }, 5000) // Track after 5 seconds of inactivity
      
      return () => clearTimeout(timeoutId)
    }
  }, [state.items, state.total])

  // Listen for discount code generation events
  useEffect(() => {
    const handleDiscountCodeGenerated = (event: CustomEvent) => {
      const { code, percentage } = event.detail
      if (code && percentage) {
        dispatch({
          type: 'APPLY_DISCOUNT',
          payload: { code, percentage }
        })
        localStorage.setItem('lumeye_discount_code', code)
      }
    }

    window.addEventListener('discountCodeGenerated', handleDiscountCodeGenerated as EventListener)

    // Also reload discount code periodically if state doesn't have one
    const checkDiscountInterval = setInterval(() => {
      if (!state.discountCode) {
        const savedDiscountCode = localStorage.getItem('lumeye_discount_code')
        if (savedDiscountCode) {
          fetch('/api/discount/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: savedDiscountCode })
          })
            .then(res => res.json())
            .then(data => {
              if (data.valid && data.discountPercentage) {
                dispatch({
                  type: 'APPLY_DISCOUNT',
                  payload: { code: savedDiscountCode, percentage: data.discountPercentage }
                })
              }
            })
            .catch(() => {})
        }
      }
    }, 2000) // Check every 2 seconds

    return () => {
      window.removeEventListener('discountCodeGenerated', handleDiscountCodeGenerated as EventListener)
      clearInterval(checkDiscountInterval)
    }
  }, [state.discountCode])

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
