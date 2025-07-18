"use client"

import { BarChart2 } from "lucide-react"
import { useState, useEffect } from "react"

export default function AdPerformanceWidget() {
  const [adData, setAdData] = useState({
    totalSpend: 0,
    campaigns: 0
  })
  const [salesData, setSalesData] = useState({
    totalOrders: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch ad spend data from dedicated API
        const adResponse = await fetch('/api/admin/ad-spend')
        const adData = await adResponse.json()
        
        // Fetch sales data from analytics API
        const analyticsResponse = await fetch('/api/admin/analytics')
        const analyticsData = await analyticsResponse.json()
        
        setAdData({
          totalSpend: adData.totalSpend || 0,
          campaigns: adData.campaigns || 0
        })
        setSalesData({
          totalOrders: analyticsData.sales?.totalOrders || 0
        })
      } catch (error) {
        console.error('Failed to fetch ad performance data:', error)
        setAdData({ totalSpend: 0, campaigns: 0 })
        setSalesData({ totalOrders: 0 })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // Refresh every 60 seconds
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [])

  const cpa = salesData.totalOrders > 0 ? (adData.totalSpend / salesData.totalOrders).toFixed(2) : "0.00"

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
      <div className="bg-blue-100 p-3 rounded-full">
        <BarChart2 className="w-7 h-7 text-blue-600" />
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900">
          R{loading ? "..." : adData.totalSpend.toLocaleString()}
        </div>
        <div className="text-gray-600 text-sm">Ad Spend</div>
        <div className="text-xs text-gray-500">CPA: R{loading ? "..." : cpa}</div>
      </div>
    </div>
  )
} 