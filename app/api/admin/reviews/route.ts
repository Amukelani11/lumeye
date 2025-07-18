import { NextResponse } from "next/server"
import { supabase } from "@/lib/database"

export async function GET() {
  try {
    // Fetch reviews with user information
    const { data: reviews, error: reviewsError } = await supabase
      .from('product_reviews')
      .select(`
        id,
        rating,
        title,
        content,
        is_verified_purchase,
        helpful_count,
        created_at,
        user:users(first_name, last_name)
      `)
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

    // Format reviews for display
    const formattedReviews = reviews?.map(review => {
      let userName = 'Anonymous'
      if (review.user && typeof review.user === 'object' && !Array.isArray(review.user)) {
        const user = review.user as { first_name?: string; last_name?: string }
        userName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Anonymous'
      }
      
      return {
        id: review.id,
        rating: review.rating,
        title: review.title,
        content: review.content,
        user_name: userName,
        created_at: review.created_at,
        is_verified_purchase: review.is_verified_purchase,
        helpful_count: review.helpful_count
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