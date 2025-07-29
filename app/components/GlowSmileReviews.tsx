"use client"

import { useState } from "react"
import { Star, CheckCircle, ChevronDown, ChevronUp } from "lucide-react"
import { glowsmileReviews } from "../data/glowsmile-reviews"

export default function GlowSmileReviews() {
  const [showAll, setShowAll] = useState(false)
  const [sortBy, setSortBy] = useState<"recent" | "rating">("recent")

  // Calculate average rating
  const averageRating = glowsmileReviews.reduce((sum, review) => sum + review.rating, 0) / glowsmileReviews.length
  const verifiedReviews = glowsmileReviews.filter(review => review.verified).length

  // Sort reviews
  const sortedReviews = [...glowsmileReviews].sort((a, b) => {
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
          <h2 className="font-dm-sans text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say About GlowSmile
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join thousands of happy customers who've transformed their smiles with our instant violet whitening drops
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{averageRating.toFixed(1)}/5</div>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-pink-600 mb-2">{glowsmileReviews.length}</div>
            <p className="text-gray-600">Total Reviews</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{verifiedReviews}</div>
            <p className="text-gray-600">Verified Reviews</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
            <p className="text-gray-600">Satisfaction Rate</p>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "recent" | "rating")}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="recent">Most Recent</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
          <div className="text-sm text-gray-600">
            Showing {displayedReviews.length} of {glowsmileReviews.length} reviews
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  {renderStars(review.rating)}
                  <span className="text-sm font-medium text-gray-900">{review.rating}/5</span>
                </div>
                {review.verified && (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">Verified</span>
                  </div>
                )}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-4 leading-relaxed">"{review.text}"</p>

              {/* Customer Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {review.initials || review.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                    <p className="text-gray-600 text-xs">{review.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-xs">{new Date(review.date).toLocaleDateString()}</p>
                  {review.timeUsed && (
                    <p className="text-gray-500 text-xs">Used for {review.timeUsed}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            {showAll ? (
              <>
                Show Less
                <ChevronUp className="w-5 h-5" />
              </>
            ) : (
              <>
                Show All {glowsmileReviews.length} Reviews
                <ChevronDown className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-white rounded-3xl p-8 shadow-lg">
          <div className="text-center">
            <h3 className="font-dm-sans text-2xl font-bold text-gray-900 mb-4">
              Join Thousands of Happy Customers
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Experience the confidence of a brighter smile with GlowSmile Instant Violet Whitening Drops
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">Instant</div>
                <p className="text-sm text-gray-600">Results in 60 seconds</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600 mb-1">Safe</div>
                <p className="text-sm text-gray-600">Enamel-friendly formula</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">Proven</div>
                <p className="text-sm text-gray-600">4.8/5 star rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 