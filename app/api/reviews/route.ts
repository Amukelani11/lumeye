import { NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    // During build time, return empty data gracefully
    if (!supabaseUrl || !supabaseServiceKey) {
      console.log('Supabase credentials not configured, returning empty reviews')
      return NextResponse.json({
        reviews: [],
        totalReviews: 0,
        averageRating: 0,
        verifiedPurchases: 0
      })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Fetch all published reviews with reviewer_name
    const { data: reviews, error: reviewsError } = await supabase
      .from('product_reviews')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    if (reviewsError) {
      console.error('Error fetching reviews:', reviewsError)
      return NextResponse.json(
        { error: 'Failed to fetch reviews' },
        { status: 500 }
      )
    }

    // Calculate statistics
    const totalReviews = reviews?.length || 0
    const totalRating = reviews?.reduce((sum, review) => sum + review.rating, 0) || 0
    const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0
    const verifiedPurchases = reviews?.filter(review => review.is_verified_purchase).length || 0

    // Format reviews for display (matching the old Review interface)
    const formattedReviews = reviews?.map(review => {
      // Format reviewer name - use reviewer_name if available, otherwise Anonymous
      const reviewerName = review.reviewer_name || 'Anonymous'
      // Format as "First L." (first name + last initial)
      const nameParts = reviewerName.split(' ')
      const displayName = nameParts.length > 1 
        ? `${nameParts[0]} ${nameParts[nameParts.length - 1][0]}.`
        : reviewerName

      return {
        id: review.id,
        name: displayName,
        rating: review.rating,
        text: review.content || review.title || '',
        date: review.created_at || new Date().toISOString().split('T')[0],
        verified: review.is_verified_purchase || false,
        location: null // Location not stored in DB, can be added later if needed
      }
    }) || []

    return NextResponse.json({
      reviews: formattedReviews,
      totalReviews,
      averageRating,
      verifiedPurchases
    })

  } catch (error) {
    console.error('Reviews API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews data' },
      { status: 500 }
    )
  }
}

