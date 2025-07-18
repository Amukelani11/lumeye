import { NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET() {
  try {
    // For now, return manual data - you can expand this to use a proper ad_spend table
    // or integrate with Google Ads, Facebook Ads APIs
    return NextResponse.json({
      totalSpend: 3500, // Manual input - replace with real data
      campaigns: 3,
      breakdown: [
        { platform: "Facebook Ads", spend: 2000, clicks: 450, conversions: 15 },
        { platform: "Google Ads", spend: 1200, clicks: 280, conversions: 12 },
        { platform: "Instagram Ads", spend: 300, clicks: 120, conversions: 8 }
      ]
    })
  } catch (error) {
    console.error('Ad Spend API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ad spend data' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { totalSpend, campaigns, breakdown } = body

    // Here you would save to your ad_spend table
    // For now, just return success
    return NextResponse.json({ 
      success: true, 
      message: 'Ad spend data updated' 
    })
  } catch (error) {
    console.error('Ad Spend Update Error:', error)
    return NextResponse.json(
      { error: 'Failed to update ad spend data' },
      { status: 500 }
    )
  }
} 