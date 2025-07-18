"use client"

import { useState } from "react"
import { Star, CheckCircle, ChevronDown, ChevronUp } from "lucide-react"
import { reviews } from "../data/reviews"

export default function ProductReviews() {
  const [showAll, setShowAll] = useState(false)
  const [sortBy, setSortBy] = useState<"recent" | "rating">("recent")

  // Calculate average rating
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  const verifiedReviews = reviews.filter(review => review.verified).length

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else {
      return b.rating - a.rating
    }
  })

  // Show first 6 reviews by default, all if expanded
  const displayedReviews = showAll ? sortedReviews : sortedReviews.slice(0, 6)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ))
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Customer Reviews
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="flex">
                {renderStars(Math.round(averageRating))}
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <span className="text-gray-600">out of 5</span>
          </div>
          <p className="text-gray-600">
            Based on {reviews.length} reviews • {verifiedReviews} verified purchases
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "recent" | "rating")}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="recent">Most Recent</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
          <div className="text-sm text-gray-600">
            Showing {displayedReviews.length} of {reviews.length} reviews
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {renderStars(review.rating)}
                  </div>
                  {review.verified && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              
              <h4 className="font-medium text-gray-900 mb-2">{review.name}</h4>
              
              {review.location && (
                <p className="text-xs text-gray-500 mb-3">{review.location}</p>
              )}
              
              <p className="text-gray-700 text-sm leading-relaxed">
                {review.text}
              </p>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {reviews.length > 6 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 border border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
            >
              {showAll ? (
                <>
                  Show Less
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show All {reviews.length} Reviews
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Review Summary */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Review Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{reviews.length}</div>
              <div className="text-sm text-gray-600">Total Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{verifiedReviews}</div>
              <div className="text-sm text-gray-600">Verified Purchases</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {((verifiedReviews / reviews.length) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Verification Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {reviews.filter(r => r.rating === 5).length}
              </div>
              <div className="text-sm text-gray-600">5-Star Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 