import { NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET() {
  try {
    // Get current timestamp for "active visitors" (visitors active in last 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
    
    // Active visitors (sessions active in last 5 minutes) - use last_seen_at
    const { data: activeVisitorSessions } = await supabase
      .from('visitor_tracking')
      .select('session_id')
      .gte('last_seen_at', fiveMinutesAgo)
      
    const uniqueActiveSessions = new Set(activeVisitorSessions?.map(v => v.session_id) || [])
    const activeVisitors = uniqueActiveSessions.size

    // If last_seen_at doesn't work, try created_at as fallback
    let activeVisitorsFallback = activeVisitors
    if (activeVisitors === 0) {
      const { data: recentSessions } = await supabase
        .from('visitor_tracking')
        .select('session_id')
        .gte('created_at', fiveMinutesAgo)
      const uniqueRecent = new Set(recentSessions?.map(v => v.session_id) || [])
      activeVisitorsFallback = uniqueRecent.size
    }

    // Total views in last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const { count: totalViews } = await supabase
      .from('visitor_tracking')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', oneDayAgo)

    // Product views (pages containing 'product')
    const { count: productViews } = await supabase
      .from('visitor_tracking')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', oneDayAgo)
      .like('page', '%product%')

    // Top pages (last 24 hours)
    const { data: pageViews } = await supabase
      .from('visitor_tracking')
      .select('page, created_at')
      .gte('created_at', oneDayAgo)
      .order('created_at', { ascending: false })
      .limit(1000)

    // Calculate top pages
    const pageCounts: { [key: string]: number } = {}
    pageViews?.forEach(view => {
      const page = view.page || 'unknown'
      pageCounts[page] = (pageCounts[page] || 0) + 1
    })

    const topPages = Object.entries(pageCounts)
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10)

    // Recent activity (last 50 actions)
    const { data: recentActivity } = await supabase
      .from('visitor_tracking')
      .select('session_id, page, action, created_at, metadata')
      .order('created_at', { ascending: false })
      .limit(50)

    const formattedActivity = recentActivity?.map(activity => ({
      time: activity.created_at,
      action: activity.action || 'view',
      page: activity.page || 'unknown',
      sessionId: activity.session_id,
      metadata: activity.metadata
    })) || []

    // Device breakdown removed - not needed

    // Calculate average session time using last_seen_at
    const { data: sessionData } = await supabase
      .from('visitor_tracking')
      .select('session_id, created_at, last_seen_at')
      .gte('created_at', oneDayAgo)

    const sessionTimes: { [key: string]: { first: Date, last: Date } } = {}
    sessionData?.forEach(activity => {
      const sessionId = activity.session_id
      const firstTimestamp = new Date(activity.created_at)
      const lastTimestamp = activity.last_seen_at ? new Date(activity.last_seen_at) : new Date(activity.created_at)
      
      if (!sessionTimes[sessionId]) {
        sessionTimes[sessionId] = { first: firstTimestamp, last: lastTimestamp }
      } else {
        if (firstTimestamp < sessionTimes[sessionId].first) {
          sessionTimes[sessionId].first = firstTimestamp
        }
        if (lastTimestamp > sessionTimes[sessionId].last) {
          sessionTimes[sessionId].last = lastTimestamp
        }
      }
    })

    const sessionDurations = Object.values(sessionTimes).map(session => 
      (session.last.getTime() - session.first.getTime()) / 60000 // in minutes
    )

    const averageSessionTime = sessionDurations.length > 0
      ? Math.round(sessionDurations.reduce((a, b) => a + b, 0) / sessionDurations.length)
      : 0

    // Get unique sessions for bounce rate calculation
    const { data: uniqueSessions } = await supabase
      .from('visitor_tracking')
      .select('session_id')
      .gte('created_at', oneDayAgo)

    const uniqueSessionIds = new Set(uniqueSessions?.map(v => v.session_id) || [])
    const totalSessions = uniqueSessionIds.size

    // Bounce rate (sessions with only 1 page view)
    const { data: singlePageSessions } = await supabase
      .from('visitor_tracking')
      .select('session_id')
      .gte('created_at', oneDayAgo)

    const sessionPageCounts: { [key: string]: number } = {}
    singlePageSessions?.forEach(session => {
      const sessionId = session.session_id
      sessionPageCounts[sessionId] = (sessionPageCounts[sessionId] || 0) + 1
    })

    const bouncedSessions = Object.values(sessionPageCounts).filter(count => count === 1).length
    const bounceRate = totalSessions > 0 ? Math.round((bouncedSessions / totalSessions) * 100) : 0

    // Conversion rate (simplified - sessions that reached checkout)
    const { count: checkoutSessions } = await supabase
      .from('visitor_tracking')
      .select('session_id', { count: 'exact', head: true })
      .gte('created_at', oneDayAgo)
      .like('page', '%checkout%')

    const conversionRate = totalSessions > 0 
      ? Math.round((checkoutSessions || 0) / totalSessions * 100) 
      : 0

    return NextResponse.json({
      activeVisitors: activeVisitors > 0 ? activeVisitors : activeVisitorsFallback,
      totalViews: totalViews || 0,
      productViews: productViews || 0,
      averageSessionTime,
      topPages,
      recentActivity: formattedActivity,
      bounceRate,
      conversionRate
    })

  } catch (error) {
    console.error('Visitor Analytics API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch visitor analytics' },
      { status: 500 }
    )
  }
}
