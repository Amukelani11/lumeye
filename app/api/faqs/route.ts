import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '50')

    let query = supabase
      .from('faqs')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (category) {
      query = query.eq('category', category)
    }

    if (limit) {
      query = query.limit(limit)
    }

    const { data: faqs, error } = await query

    if (error) {
      console.error('Error fetching FAQs:', error)
      return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 })
    }

    return NextResponse.json({ faqs: faqs || [] })
  } catch (error) {
    console.error('Error in FAQs GET API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 