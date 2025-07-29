import { NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET() {
  try {
    // Get visitors active in the last 2 minutes for more real-time feel
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000)
    
    const { data: visitors, error } = await supabase
      .from('live_visitors')
      .select('*')
      .gte('last_activity', twoMinutesAgo.toISOString())
      .order('last_activity', { ascending: false })

    if (error) {
      console.error('Error fetching live visitors:', error)
      return NextResponse.json({ error: 'Failed to fetch live visitors' }, { status: 500 })
    }

    return NextResponse.json({
      visitors: visitors || [],
      count: visitors?.length || 0
    })

  } catch (error) {
    console.error('Live visitors API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch live visitors data' },
      { status: 500 }
    )
  }
} 