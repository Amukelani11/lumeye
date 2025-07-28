import { NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET() {
  try {
    const { data: emailCaptures, error } = await supabase
      .from('email_captures')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching email captures:', error)
      return NextResponse.json({ error: 'Failed to fetch email captures' }, { status: 500 })
    }

    return NextResponse.json({
      emailCaptures: emailCaptures || [],
      count: emailCaptures?.length || 0
    })

  } catch (error) {
    console.error('Email captures API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch email captures data' },
      { status: 500 }
    )
  }
} 