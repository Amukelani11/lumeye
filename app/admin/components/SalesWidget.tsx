"use client"

import { DollarSign } from "lucide-react"
import { useState, useEffect } from "react"

export default function SalesWidget() {
  const [salesData, setSalesData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    avgOrderValue: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/analytics')
        const data = await response.json()
        setSalesData({
          totalOrders: data.sales?.totalOrders || 0,
          totalRevenue: data.sales?.totalRevenue || 0,
          avgOrderValue: data.sales?.avgOrderValue || 0
        })
      } catch (error) {
        console.error('Failed to fetch sales data:', error)
        setSalesData({ totalOrders: 0, totalRevenue: 0, avgOrderValue: 0 })
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
      <div className="bg-green-100 p-3 rounded-full">
        <DollarSign className="w-7 h-7 text-green-600" />
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900">
          {loading ? "..." : `${salesData.totalOrders} Orders`}
        </div>
        <div className="text-gray-600 text-sm">
          Revenue: R{loading ? "..." : salesData.totalRevenue.toLocaleString()}
        </div>
        <div className="text-gray-500 text-xs">
          Avg Order: R{loading ? "..." : Math.round(salesData.avgOrderValue)}
        </div>
      </div>
    </div>
  )
} 