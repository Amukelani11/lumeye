import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    if (!slug) {
      return NextResponse.json({ error: 'Product slug required' }, { status: 400 })
    }

    // Get product with computed fields
    const { data: product, error } = await supabase
      .rpc('get_product_with_rating', { product_slug: slug })

    if (error) {
      console.error('Error fetching product:', error)
      return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
    }

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ product })
  } catch (error) {
    console.error('Error in product GET API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 