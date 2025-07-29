import { Star, Quote, CheckCircle, Clock, Heart, Eye, Smile } from "lucide-react"

const testimonials = [
  // Eye Serum Reviews
  {
    name: "Lindiwe M.",
    location: "Johannesburg",
    age: "29",
    rating: 5,
    text: "I don't even need concealer anymore! This serum has completely transformed my under-eye area. I use it every morning and my colleagues keep asking if I've been on vacation.",
    initials: "LM",
    timeUsed: "3 months",
    verified: true,
    product: "Eye Serum"
  },
  {
    name: "Sarah K.",
    location: "Cape Town",
    age: "34",
    rating: 5,
    text: "The results are instant! My eyes look so much brighter and more awake. Perfect for my morning routine before important meetings. Worth every cent!",
    initials: "SK",
    timeUsed: "6 months",
    verified: true,
    product: "Eye Serum"
  },
  {
    name: "Priya D.",
    location: "Durban",
    age: "27",
    rating: 5,
    text: "Finally found something that works for my sensitive skin. No irritation and amazing results. I've tried everything before this - nothing compares!",
    initials: "PD",
    timeUsed: "2 months",
    verified: true,
    product: "Eye Serum"
  },
  // GlowSmile Reviews
  {
    name: "Michelle R.",
    location: "Pretoria",
    age: "31",
    rating: 5,
    text: "GlowSmile is incredible! My teeth look instantly whiter and brighter. Perfect for touch-ups before important events. No sensitivity at all!",
    initials: "MR",
    timeUsed: "2 months",
    verified: true,
    product: "GlowSmile"
  },
  {
    name: "Zinhle N.",
    location: "Bloemfontein",
    age: "26",
    rating: 5,
    text: "I was skeptical about the violet drops, but they really work! My smile looks so much brighter and more confident. The minty taste is a bonus!",
    initials: "ZN",
    timeUsed: "1 month",
    verified: true,
    product: "GlowSmile"
  },
  {
    name: "Amanda T.",
    location: "Port Elizabeth",
    age: "33",
    rating: 5,
    text: "Both products are amazing! The eye serum fixes my tired eyes and GlowSmile gives me a confident smile. Lumeye has transformed my beauty routine!",
    initials: "AT",
    timeUsed: "3 months",
    verified: true,
    product: "Both Products"
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-dm-sans text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
        <p className="text-gray-600 mb-8 text-lg">Join thousands of happy customers</p>
        
        {/* Trust Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl font-bold text-purple-600 mb-1">4.9/5</div>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl font-bold text-pink-600 mb-1">5,000+</div>
            <p className="text-sm text-gray-600">Happy Customers</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl font-bold text-blue-600 mb-1">94%</div>
            <p className="text-sm text-gray-600">See Instant Results</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
            <p className="text-sm text-gray-600">Verified Reviews</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {/* Product Badge */}
              <div className="flex justify-between items-start mb-4">
                <Quote className="w-8 h-8 text-purple-400 opacity-50" />
                <div className="flex items-center gap-2">
                  {testimonial.product === "Eye Serum" && (
                    <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                      <Eye className="w-3 h-3" />
                      <span>Eye Serum</span>
                    </div>
                  )}
                  {testimonial.product === "GlowSmile" && (
                    <div className="flex items-center gap-1 bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs">
                      <Smile className="w-3 h-3" />
                      <span>GlowSmile</span>
                    </div>
                  )}
                  {testimonial.product === "Both Products" && (
                    <div className="flex items-center gap-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                      <span>Both Products</span>
                    </div>
                  )}
                  {testimonial.verified && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 italic leading-relaxed text-sm">"{testimonial.text}"</p>

              {/* Customer Info */}
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.initials}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.location} • {testimonial.age}</p>
                </div>
              </div>

              {/* Usage Info */}
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Used for {testimonial.timeUsed}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-red-400" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-white rounded-3xl p-8 shadow-lg">
          <h3 className="font-dm-sans text-2xl font-bold text-gray-900 mb-4">Ready to Illuminate Your Beauty?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of customers who've discovered the secret to brighter eyes and confident smiles with Lumeye.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">R299</div>
              <div className="text-sm text-gray-500">Eye Serum</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 mb-1">R199</div>
              <div className="text-sm text-gray-500">GlowSmile</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Free SA Shipping</div>
              <div className="text-xs text-gray-500">30-day guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
