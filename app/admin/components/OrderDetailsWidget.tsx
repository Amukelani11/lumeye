"use client"

import { useState, useEffect } from "react"

interface Order {
  id: string
  items: string
  value: number
  time: string
  status: string
  email: string
}

export default function OrderDetailsWidget() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/analytics')
        const data = await response.json()
        
        // Format the orders for display
        const formattedOrders = data.recentOrders?.map((order: any) => ({
          id: order.id,
          items: "Lumeye Serum x1", // You can expand this to show actual items
          value: order.total_amount,
          time: new Date(order.created_at).toLocaleString(),
          status: order.status,
          email: order.email
        })) || []
        
        setOrders(formattedOrders)
      } catch (error) {
        console.error('Failed to fetch recent orders:', error)
        setOrders([])
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
    <div className="bg-white rounded-2xl shadow p-6 mt-8">
      <div className="font-bold text-gray-900 mb-4">
        Recent Orders
        {loading && <span className="text-sm font-normal text-gray-500 ml-2">(Loading...)</span>}
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-gray-500 text-sm">Loading orders...</div>
        ) : orders.length > 0 ? (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-2 pr-4">Order ID</th>
                <th className="py-2 pr-4">Items</th>
                <th className="py-2 pr-4">Value</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-2 pr-4 font-mono">{order.id}</td>
                  <td className="py-2 pr-4">{order.items}</td>
                  <td className="py-2 pr-4 text-green-700 font-semibold">R{order.value}</td>
                  <td className="py-2 pr-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-gray-500 text-sm">No recent orders</div>
        )}
      </div>
    </div>
  )
} 