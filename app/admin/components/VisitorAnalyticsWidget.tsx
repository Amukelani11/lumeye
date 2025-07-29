"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Users, Eye, Clock, TrendingUp, BarChart3 } from "lucide-react"
import { formatSATimeOnly } from "@/lib/utils"

interface VisitorData {
  activeVisitors: number
  totalViews: number
  productViews: number
  averageSessionTime: number
  topPages: Array<{ page: string; views: number }>
  recentActivity: Array<{ time: string; action: string; page: string }>
}

export default function VisitorAnalyticsWidget() {
  const [visitorData, setVisitorData] = useState<VisitorData>({
    activeVisitors: 0,
    totalViews: 0,
    productViews: 0,
    averageSessionTime: 0,
    topPages: [],
    recentActivity: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        const response = await fetch('/api/admin/visitor-analytics')
        if (response.ok) {
          const data = await response.json()
          setVisitorData(data)
        }
      } catch (error) {
        console.error('Error fetching visitor data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVisitorData()
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchVisitorData, 30000)
    
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Visitor Analytics
          </CardTitle>
          <CardDescription>Loading visitor data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Visitor Analytics
        </CardTitle>
        <CardDescription>Real-time visitor and page view data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">{visitorData.activeVisitors}</span>
            </div>
            <p className="text-sm text-gray-600">Active Visitors</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Eye className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">{visitorData.totalViews}</span>
            </div>
            <p className="text-sm text-gray-600">Total Views</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">{visitorData.productViews}</span>
            </div>
            <p className="text-sm text-gray-600">Product Views</p>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <span className="text-2xl font-bold text-orange-600">{visitorData.averageSessionTime}m</span>
            </div>
            <p className="text-sm text-gray-600">Avg Session</p>
          </div>
        </div>

        {/* Top Pages */}
        <div>
          <h4 className="font-semibold mb-3">Top Pages</h4>
          <div className="space-y-2">
            {visitorData.topPages.map((page, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">{page.page}</span>
                <span className="text-sm text-gray-600">{page.views} views</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h4 className="font-semibold mb-3">Recent Activity</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {visitorData.recentActivity.map((activity, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
                <div>
                  <span className="font-medium">{activity.action}</span>
                  <span className="text-gray-600 ml-2">on {activity.page}</span>
                </div>
                <span className="text-gray-500">{(() => {
                  const saDate = new Date(activity.time)
                  saDate.setHours(saDate.getHours() + 2) // Add 2 hours for SA time
                  return saDate.toLocaleTimeString('en-US', { 
                    hour12: true,
                    hour: 'numeric',
                    minute: '2-digit',
                    second: '2-digit'
                  })
                })()}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 