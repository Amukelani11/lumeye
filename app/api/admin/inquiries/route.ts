import { NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET() {
  try {
    const { data: inquiries, error } = await supabase
      .from('contact_inquiries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching inquiries:', error)
      return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 })
    }

    return NextResponse.json({ inquiries: inquiries || [] })
  } catch (error) {
    console.error('Error in inquiries API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

