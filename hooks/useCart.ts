import { useState, useEffect } from 'react'
import { Cart, CartItem } from '@/lib/database'

interface UseCartOptions {
  sessionId?: string
  userId?: string
}

interface UseCartReturn {
  cart: Cart | null
  loading: boolean
  error: string | null
  addToCart: (productId: string, quantity: number) => Promise<void>
  updateCartItem: (itemId: string, quantity: number) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  clearCart: () => Promise<void>
  refetch: () => void
}

export function useCart(options: UseCartOptions = {}): UseCartReturn {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCart = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (options.userId) params.append('userId', options.userId)
      if (options.sessionId) params.append('sessionId', options.sessionId)

      const response = await fetch(`/api/cart?${params}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch cart')
      }

      setCart(data.cart)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId: string, quantity: number) => {
    try {
      setError(null)

      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity,
          userId: options.userId,
          sessionId: options.sessionId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add to cart')
      }

      // Refetch cart to get updated data
      await fetchCart()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to cart')
    }
  }

  const updateCartItem = async (itemId: string, quantity: number) => {
    try {
      setError(null)

      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId,
          quantity,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update cart')
      }

      // Refetch cart to get updated data
      await fetchCart()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update cart')
    }
  }

  const removeFromCart = async (itemId: string) => {
    await updateCartItem(itemId, 0)
  }

  const clearCart = async () => {
    try {
      setError(null)

      const params = new URLSearchParams()
      if (options.userId) params.append('userId', options.userId)
      if (options.sessionId) params.append('sessionId', options.sessionId)

      const response = await fetch(`/api/cart?${params}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to clear cart')
      }

      setCart(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear cart')
    }
  }

  useEffect(() => {
    if (options.userId || options.sessionId) {
      fetchCart()
    }
  }, [options.userId, options.sessionId])

  return {
    cart,
    loading,
    error,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    refetch: fetchCart,
  }
} 