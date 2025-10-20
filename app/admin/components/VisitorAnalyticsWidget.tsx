"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Eye, TrendingUp, Clock, Monitor, Smartphone, Tablet, Globe, Activity, Target } from "lucide-react"

interface VisitorData {
  activeVisitors: number
  totalViews: number
  productViews: number
  averageSessionTime: number
  topPages: Array<{ page: string; views: number }>
  recentActivity: Array<{ time: string; action: string; page: string; sessionId?: string; metadata?: any }>
  deviceBreakdown: {
    desktop: number
    mobile: number
    tablet: number
    other: number
  }
  estimatedCountries: number
  bounceRate: number
  conversionRate: number
}

export default function VisitorAnalyticsWidget() {
  const [visitorData, setVisitorData] = useState<VisitorData>({
    activeVisitors: 0,
    totalViews: 0,
    productViews: 0,
    averageSessionTime: 0,
    topPages: [],
    recentActivity: [],
    deviceBreakdown: { desktop: 0, mobile: 0, tablet: 0, other: 0 },
    estimatedCountries: 0,
    bounceRate: 0,
    conversionRate: 0
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

        {/* Additional Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-indigo-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Activity className="h-5 w-5 text-indigo-600" />
              <span className="text-2xl font-bold text-indigo-600">{visitorData.bounceRate}%</span>
            </div>
            <p className="text-sm text-gray-600">Bounce Rate</p>
          </div>

          <div className="text-center p-4 bg-pink-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="h-5 w-5 text-pink-600" />
              <span className="text-2xl font-bold text-pink-600">{visitorData.conversionRate}%</span>
            </div>
            <p className="text-sm text-gray-600">Conversion Rate</p>
          </div>

          <div className="text-center p-4 bg-cyan-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Globe className="h-5 w-5 text-cyan-600" />
              <span className="text-2xl font-bold text-cyan-600">{visitorData.estimatedCountries}</span>
            </div>
            <p className="text-sm text-gray-600">Countries</p>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Monitor className="h-5 w-5 text-gray-600" />
              <span className="text-2xl font-bold text-gray-600">{visitorData.deviceBreakdown.desktop}</span>
            </div>
            <p className="text-sm text-gray-600">Desktop</p>
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
                <span className="text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 