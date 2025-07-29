"use client"

import { Users, ShoppingCart, CreditCard, Eye } from "lucide-react"
import { useState, useEffect } from "react"

interface LiveVisitor {
  session_id: string
  current_page: string
  email?: string
  cart_value: number
  status: string
  last_activity: string
}

export default function LiveVisitorsWidget() {
  const [liveVisitors, setLiveVisitors] = useState<LiveVisitor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLiveVisitors = async () => {
      try {
        const response = await fetch('/api/admin/live-visitors')
        const data = await response.json()
        setLiveVisitors(data.visitors || [])
      } catch (error) {
        console.error('Failed to fetch live visitors:', error)
        setLiveVisitors([])
      } finally {
        setLoading(false)
      }
    }

    fetchLiveVisitors()
    // Refresh every 5 seconds for real-time updates
    const interval = setInterval(fetchLiveVisitors, 5000)
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'browsing':
        return <Eye className="w-4 h-4 text-blue-500" />
      case 'cart':
        return <ShoppingCart className="w-4 h-4 text-yellow-500" />
      case 'checkout':
        return <CreditCard className="w-4 h-4 text-orange-500" />
      case 'purchased':
        return <Users className="w-4 h-4 text-green-500" />
      default:
        return <Eye className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'browsing':
        return 'Browsing'
      case 'cart':
        return 'In Cart'
      case 'checkout':
        return 'Checkout'
      case 'purchased':
        return 'Purchased'
      default:
        return 'Unknown'
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000)
    
    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    return `${Math.floor(diffInSeconds / 3600)}h ago`
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      timeZone: 'Africa/Johannesburg',
      hour12: true,
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Live Visitors</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live</span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading visitors...</p>
        </div>
      ) : liveVisitors.length === 0 ? (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600">No active visitors</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {liveVisitors.map((visitor, index) => (
            <div key={visitor.session_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(visitor.status)}
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {visitor.email ? visitor.email : `Visitor ${index + 1}`}
                  </p>
                  <p className="text-xs text-gray-600">
                    {visitor.current_page} • {getStatusText(visitor.status)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                {visitor.cart_value > 0 && (
                  <p className="text-sm font-medium text-green-600">
                    R{visitor.cart_value.toFixed(2)}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  {formatTimeAgo(visitor.last_activity)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Total Active: {liveVisitors.length}</span>
          <span>Updates every 5s</span>
        </div>
      </div>
    </div>
  )
} 