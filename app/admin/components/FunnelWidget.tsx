"use client"

import { useState, useEffect } from "react"

export default function FunnelWidget() {
  const [funnelData, setFunnelData] = useState({
    visitors: 0,
    productViews: 0,
    addedToCart: 0,
    checkoutStarted: 0,
    purchased: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/analytics')
        const data = await response.json()
        setFunnelData({
          visitors: data.funnel?.visitors || 0,
          productViews: data.funnel?.productViews || 0,
          addedToCart: data.funnel?.addedToCart || 0,
          checkoutStarted: data.funnel?.checkoutStarted || 0,
          purchased: data.funnel?.purchased || 0
        })
      } catch (error) {
        console.error('Failed to fetch funnel data:', error)
        setFunnelData({ visitors: 0, productViews: 0, addedToCart: 0, checkoutStarted: 0, purchased: 0 })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // Refresh every 60 seconds
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [])

  const funnel = [
    { label: "Visitors", value: funnelData.visitors },
    { label: "Product Views", value: funnelData.productViews },
    { label: "Added to Cart", value: funnelData.addedToCart },
    { label: "Checkout", value: funnelData.checkoutStarted },
    { label: "Purchased", value: funnelData.purchased },
  ]
  const max = Math.max(...funnel.map(f => f.value))

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="font-bold text-gray-900 mb-4">
        Customer Journey Funnel
        {loading && <span className="text-sm font-normal text-gray-500 ml-2">(Loading...)</span>}
      </div>
      <div className="space-y-3">
        {funnel.map((stage, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-32 text-sm text-gray-600">{stage.label}</div>
            <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-4 rounded-full bg-pink-500 transition-all"
                style={{ width: max > 0 ? `${(stage.value / max) * 100}%` : '0%' }}
              ></div>
            </div>
            <div className="w-10 text-right text-gray-700 font-medium">
              {loading ? "..." : stage.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 