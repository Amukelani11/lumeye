"use client"

import { useState, useEffect } from "react"
import { Star, MessageCircle } from "lucide-react"

interface Review {
  id: string
  rating: number
  title?: string
  content?: string
  user_name?: string
  created_at: string
  is_verified_purchase: boolean
  helpful_count: number
}

export default function CustomerReviewsWidget() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    verifiedPurchases: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/reviews')
        const data = await response.json()
        setReviews(data.reviews || [])
        setStats({
          totalReviews: data.totalReviews || 0,
          averageRating: data.averageRating || 0,
          verifiedPurchases: data.verifiedPurchases || 0
        })
      } catch (error) {
        console.error('Failed to fetch reviews:', error)
        setReviews([])
        setStats({ totalReviews: 0, averageRating: 0, verifiedPurchases: 0 })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // Refresh every 60 seconds
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="font-bold text-gray-900 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Customer Reviews
          {loading && <span className="text-sm font-normal text-gray-500 ml-2">(Loading...)</span>}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {loading ? "..." : stats.averageRating.toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">
            {loading ? "..." : `${stats.totalReviews} reviews`}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">
            {loading ? "..." : stats.totalReviews}
          </div>
          <div className="text-xs text-gray-600">Total Reviews</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">
            {loading ? "..." : stats.verifiedPurchases}
          </div>
          <div className="text-xs text-gray-600">Verified Purchases</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">
            {loading ? "..." : `${((stats.verifiedPurchases / stats.totalReviews) * 100).toFixed(1)}%`}
          </div>
          <div className="text-xs text-gray-600">Verification Rate</div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="space-y-4 max-h-64 overflow-y-auto">
        {loading ? (
          <div className="text-gray-500 text-sm">Loading reviews...</div>
        ) : reviews.length > 0 ? (
          reviews.slice(0, 5).map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-3 last:border-b-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {review.user_name || 'Anonymous'}
                    </span>
                    {review.is_verified_purchase && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Verified
                      </span>
                    )}
                  </div>
                  {review.title && (
                    <div className="font-medium text-gray-900 text-sm mb-1">
                      {review.title}
                    </div>
                  )}
                  <div className="text-gray-700 text-sm line-clamp-2">
                    {review.content}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(review.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-sm">No reviews yet</div>
        )}
      </div>

      {!loading && reviews.length > 5 && (
        <div className="mt-4 text-center">
          <button className="text-pink-600 text-sm hover:text-pink-700">
            View all {stats.totalReviews} reviews
          </button>
        </div>
      )}
    </div>
  )
} 