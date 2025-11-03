"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscriptionMessage, setSubscriptionMessage] = useState("")

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setSubscriptionMessage("Please enter your email address")
      return
    }

    setIsSubscribing(true)
    setSubscriptionMessage("")

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'footer'
        })
      })

      const data = await response.json()

      if (data.success) {
        setSubscriptionMessage("Thank you for subscribing! Check your email for confirmation.")
        setEmail("")
      } else {
        setSubscriptionMessage(data.error || "Failed to subscribe. Please try again.")
      }
    } catch (error) {
      setSubscriptionMessage("An error occurred. Please try again.")
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/Lumeyelogo.png"
                alt="Lumeye"
                width={120}
                height={40}
                className="h-8 w-auto"
                quality={85}
                loading="lazy"
                sizes="120px"
              />
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Advanced skincare meets light therapy. Clinically inspired LED innovation designed to smooth, brighten, and rejuvenate your skin — from home.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-pink-400 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-pink-400 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-pink-400 transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-dm-sans text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-pink-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/product" className="text-gray-300 hover:text-pink-400 transition-colors">
                  Product
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-pink-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-300 hover:text-pink-400 transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-dm-sans text-lg font-semibold mb-4">Customer Care</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-pink-400 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-pink-400 transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-300 hover:text-pink-400 transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-pink-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-dm-sans text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-pink-400 flex-shrink-0" />
                <a href="tel:+27748016300" className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                  +27 74 801 6300
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-pink-400 flex-shrink-0" />
                <a
                  href="mailto:hello@lumeye.co.za"
                  className="text-gray-300 hover:text-pink-400 transition-colors text-sm"
                >
                  hello@lumeye.co.za
                </a>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="font-dm-sans font-medium mb-3">Stay Updated</h4>
              <form onSubmit={handleNewsletterSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent text-sm"
                    disabled={isSubscribing}
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-pink-600 hover:bg-pink-700 transition-colors rounded-r-lg text-sm font-medium disabled:opacity-50"
                    disabled={isSubscribing}
                  >
                    {isSubscribing ? "Subscribing..." : "Subscribe"}
                  </button>
                </div>
                {subscriptionMessage && (
                  <p className={`text-xs ${subscriptionMessage.includes("Thank you") ? "text-green-400" : "text-red-400"}`}>
                    {subscriptionMessage}
                  </p>
                )}
                <p className="text-gray-400 text-xs">Get exclusive offers and skincare tips!</p>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <p>&copy; 2024 Lumeye. All rights reserved.</p>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-pink-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="hover:text-pink-400 transition-colors">
                  Terms of Service
                </Link>
                <Link href="#" className="hover:text-pink-400 transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">We accept:</span>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">VISA</span>
                </div>
                <div className="w-8 h-5 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">MC</span>
                </div>
                <div className="w-8 h-5 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">EFT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
