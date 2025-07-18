import { Star, Quote, CheckCircle, Clock, Heart } from "lucide-react"

const testimonials = [
  {
    name: "Lindiwe M.",
    location: "Johannesburg",
    age: "29",
    rating: 5,
    text: "I don't even need concealer anymore! This serum has completely transformed my under-eye area. I use it every morning and my colleagues keep asking if I've been on vacation.",
    initials: "LM",
    timeUsed: "3 months",
    verified: true
  },
  {
    name: "Sarah K.",
    location: "Cape Town",
    age: "34",
    rating: 5,
    text: "The results are instant! My eyes look so much brighter and more awake. Perfect for my morning routine before important meetings. Worth every cent!",
    initials: "SK",
    timeUsed: "6 months",
    verified: true
  },
  {
    name: "Priya D.",
    location: "Durban",
    age: "27",
    rating: 5,
    text: "Finally found something that works for my sensitive skin. No irritation and amazing results. I've tried everything before this - nothing compares!",
    initials: "PD",
    timeUsed: "2 months",
    verified: true
  },
  {
    name: "Michelle R.",
    location: "Pretoria",
    age: "31",
    rating: 5,
    text: "As a mom of two, I'm always tired. This serum is a game-changer! My dark circles disappear in seconds and I look refreshed even on 4 hours of sleep.",
    initials: "MR",
    timeUsed: "4 months",
    verified: true
  },
  {
    name: "Zinhle N.",
    location: "Bloemfontein",
    age: "26",
    rating: 5,
    text: "I was skeptical about the 60-second claim, but it really works! My puffiness disappears immediately. The refillable bottle is also a huge plus for the environment.",
    initials: "ZN",
    timeUsed: "1 month",
    verified: true
  },
  {
    name: "Amanda T.",
    location: "Port Elizabeth",
    age: "33",
    rating: 5,
    text: "Contact lens wearer here - this is the only eye product that doesn't irritate my eyes. Plus the results are incredible. My husband noticed the difference immediately!",
    initials: "AT",
    timeUsed: "5 months",
    verified: true
  },
]

export default function Testimonials() {
  return (
    <section className="section-padding bg-beige">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-dm-sans text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
        <p className="text-gray-600 mb-8 text-lg">Join thousands of happy customers</p>
        
        {/* Trust Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl font-bold text-pink-600 mb-1">4.9/5</div>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl font-bold text-green-600 mb-1">2,847+</div>
            <p className="text-sm text-gray-600">Happy Customers</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl font-bold text-blue-600 mb-1">94%</div>
            <p className="text-sm text-gray-600">See Results in 60s</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="text-2xl font-bold text-purple-600 mb-1">100%</div>
            <p className="text-sm text-gray-600">Verified Reviews</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up"
            >
              {/* Quote Icon */}
              <div className="flex justify-between items-start mb-4">
                <Quote className="w-8 h-8 text-rose-gold opacity-50" />
                {testimonial.verified && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
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
                <div className="w-12 h-12 bg-rose-gold rounded-full flex items-center justify-center text-white font-bold mr-4">
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
                  <span>Verified Customer</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-white rounded-3xl p-8 shadow-lg">
          <h3 className="font-dm-sans text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Eyes?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of customers who've discovered the secret to brighter, more awake-looking eyes in just 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 mb-1">R299</div>
              <div className="text-sm text-gray-500">Free SA Shipping</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">30-day guarantee</div>
              <div className="text-xs text-gray-500">No risk purchase</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
