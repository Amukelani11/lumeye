"use client"

import { ShoppingCart } from "lucide-react"
import { useState, useEffect } from "react"

export default function CartAbandonmentWidget() {
  const [abandonedCarts, setAbandonedCarts] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/analytics')
        const data = await response.json()
        setAbandonedCarts(data.cartAbandonment || 0)
      } catch (error) {
        console.error('Failed to fetch cart abandonment:', error)
        setAbandonedCarts(0)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // Refresh every 60 seconds
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
      <div className="bg-yellow-100 p-3 rounded-full">
        <ShoppingCart className="w-7 h-7 text-yellow-600" />
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900">
          {loading ? "..." : abandonedCarts}
        </div>
        <div className="text-gray-600 text-sm">Abandoned Carts</div>
      </div>
    </div>
  )
} 