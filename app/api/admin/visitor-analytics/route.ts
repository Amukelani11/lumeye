import { NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET() {
  try {
    // Get current timestamp for "active users" (users active in last 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

    // Active visitors (unique sessions in last 5 minutes)
    const { data: activeSessions } = await supabase
      .from('visitor_tracking')
      .select('session_id, created_at, metadata')
      .gte('created_at', fiveMinutesAgo.toISOString())
      .order('created_at', { ascending: false })

    const activeVisitors = activeSessions ? new Set(activeSessions.map(s => s.session_id)).size : 0

    // Total views (all page views in last 24 hours)
    const { count: totalViews } = await supabase
      .from('visitor_tracking')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', oneDayAgo.toISOString())

    // Product views (page views on product page in last 24 hours)
    const { count: productViews } = await supabase
      .from('visitor_tracking')
      .select('*', { count: 'exact', head: true })
      .eq('page', '/product')
      .gte('created_at', oneDayAgo.toISOString())

    // Calculate average session time (using visitor tracking data)
    const { data: sessionData } = await supabase
      .from('visitor_tracking')
      .select('session_id, created_at')
      .gte('created_at', oneHourAgo.toISOString())
      .order('created_at', { ascending: true })

    let averageSessionTime = 0
    if (sessionData && sessionData.length > 0) {
      // Group by session and calculate duration
      const sessionDurations = new Map()
      sessionData.forEach(record => {
        const sessionId = record.session_id
        if (!sessionDurations.has(sessionId)) {
          sessionDurations.set(sessionId, {
            start: new Date(record.created_at),
            end: new Date(record.created_at)
          })
        } else {
          const session = sessionDurations.get(sessionId)
          session.end = new Date(record.created_at)
        }
      })

      const totalTime = Array.from(sessionDurations.values()).reduce((sum, session) => {
        return sum + (session.end.getTime() - session.start.getTime())
      }, 0)

      averageSessionTime = Math.round(totalTime / sessionDurations.size / 1000 / 60) // Convert to minutes
    }

    // Top pages (actual page views from tracking data)
    const { data: pageViewsData } = await supabase
      .from('visitor_tracking')
      .select('page')
      .gte('created_at', oneDayAgo.toISOString())

    const pageViewsCount = new Map()
    pageViewsData?.forEach(record => {
      const page = record.page
      pageViewsCount.set(page, (pageViewsCount.get(page) || 0) + 1)
    })

    const topPages = Array.from(pageViewsCount.entries())
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5)

    // Recent activity (actual visitor actions with enhanced data)
    const { data: recentActivity } = await supabase
      .from('visitor_tracking')
      .select('created_at, action, page, session_id, metadata')
      .gte('created_at', oneHourAgo.toISOString())
      .order('created_at', { ascending: false })
      .limit(15)

    const formattedRecentActivity = recentActivity?.map(activity => ({
      time: new Date(activity.created_at).toLocaleTimeString(),
      action: activity.action === 'page_view' ? 'Page viewed' : activity.action,
      page: activity.page,
      sessionId: activity.session_id,
      metadata: activity.metadata ? JSON.parse(activity.metadata) : null
    })) || []

    // Device breakdown (from user agents in last hour)
    const { data: deviceData } = await supabase
      .from('visitor_tracking')
      .select('user_agent')
      .gte('created_at', oneHourAgo.toISOString())
      .not('user_agent', 'is', null)

    const deviceBreakdown = {
      desktop: 0,
      mobile: 0,
      tablet: 0,
      other: 0
    }

    deviceData?.forEach(record => {
      const ua = record.user_agent.toLowerCase()
      if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
        deviceBreakdown.mobile++
      } else if (ua.includes('tablet') || ua.includes('ipad')) {
        deviceBreakdown.tablet++
      } else if (ua.includes('windows') || ua.includes('mac') || ua.includes('linux')) {
        deviceBreakdown.desktop++
      } else {
        deviceBreakdown.other++
      }
    })

    // Geographic data (from IP addresses - basic estimation)
    const { data: geoData } = await supabase
      .from('visitor_tracking')
      .select('ip_address')
      .gte('created_at', oneDayAgo.toISOString())
      .not('ip_address', 'eq', 'unknown')

    const uniqueIPs = new Set(geoData?.map(d => d.ip_address) || [])
    const estimatedCountries = uniqueIPs.size * 0.7 // Rough estimate: 70% of unique IPs are from different countries

    return NextResponse.json({
      activeVisitors,
      totalViews: totalViews || 0,
      productViews: productViews || 0,
      averageSessionTime: averageSessionTime || 0,
      topPages,
      recentActivity: formattedRecentActivity,
      deviceBreakdown,
      estimatedCountries: Math.round(estimatedCountries),
      // Additional real-time metrics
      bounceRate: totalViews && totalViews > 0 ? Math.round((activeVisitors / totalViews) * 100) || 0 : 0,
      conversionRate: totalViews && productViews && totalViews > 0 ? Math.round((productViews / totalViews) * 100) || 0 : 0
    })

  } catch (error) {
    console.error('Error fetching visitor analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch visitor analytics' },
      { status: 500 }
    )
  }
} 