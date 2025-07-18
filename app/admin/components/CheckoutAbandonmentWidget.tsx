"use client"

import { CreditCard } from "lucide-react"
import { useState, useEffect } from "react"

export default function CheckoutAbandonmentWidget() {
  const [checkoutAbandoned, setCheckoutAbandoned] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/analytics')
        const data = await response.json()
        setCheckoutAbandoned(data.checkoutAbandonment || 0)
      } catch (error) {
        console.error('Failed to fetch checkout abandonment:', error)
        setCheckoutAbandoned(0)
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
      <div className="bg-orange-100 p-3 rounded-full">
        <CreditCard className="w-7 h-7 text-orange-600" />
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900">
          {loading ? "..." : checkoutAbandoned}
        </div>
        <div className="text-gray-600 text-sm">Checkout Abandonments</div>
      </div>
    </div>
  )
} 