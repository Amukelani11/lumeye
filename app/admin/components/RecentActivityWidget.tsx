"use client"

import { useState, useEffect } from "react"

export default function RecentActivityWidget() {
  const [activities, setActivities] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/analytics')
        const data = await response.json()
        
        // Format the activities for display
        const formattedActivities = data.recentActivity?.map((activity: any) => {
          const timestamp = new Date(activity.timestamp).toLocaleTimeString()
          const user = activity.user || 'Anonymous'
          
          switch (activity.type) {
            case 'cart_updated':
              return `${user} updated cart at ${timestamp}`
            case 'purchase_completed':
              return `${user} completed purchase at ${timestamp}`
            case 'order_created':
              return `${user} started checkout at ${timestamp}`
            default:
              return `${user} performed action at ${timestamp}`
          }
        }) || []
        
        setActivities(formattedActivities)
      } catch (error) {
        console.error('Failed to fetch recent activity:', error)
        setActivities([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white rounded-2xl shadow p-6 h-72 flex flex-col">
      <div className="font-bold text-gray-900 mb-4">
        Recent Activity
        {loading && <span className="text-sm font-normal text-gray-500 ml-2">(Loading...)</span>}
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {loading ? (
          <div className="text-gray-500 text-sm">Loading activities...</div>
        ) : activities.length > 0 ? (
          activities.map((activity, i) => (
            <div key={i} className="text-gray-700 text-sm bg-gray-50 rounded px-3 py-2">
              {activity}
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-sm">No recent activity</div>
        )}
      </div>
    </div>
  )
} 