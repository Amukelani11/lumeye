"use client"

import { User } from "lucide-react"
import { useState, useEffect } from "react"

export default function UserActivityWidget() {
  const [activeUsers, setActiveUsers] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/analytics')
        const data = await response.json()
        setActiveUsers(data.activeUsers || 0)
      } catch (error) {
        console.error('Failed to fetch active users:', error)
        setActiveUsers(0)
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
    <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
      <div className="bg-pink-100 p-3 rounded-full">
        <User className="w-7 h-7 text-pink-600" />
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900">
          {loading ? "..." : activeUsers}
        </div>
        <div className="text-gray-600 text-sm">Active Users Now</div>
      </div>
    </div>
  )
} 