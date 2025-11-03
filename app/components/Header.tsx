"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, ShoppingBag, Package, Phone } from "lucide-react"
import { useCart } from "../lib/cart-context"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { state } = useCart()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/Lumeyelogo.png"
              alt="Lumeye"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-pink-600 transition-colors">
              Home
            </Link>
            <Link href="/product" className="text-gray-700 hover:text-pink-600 transition-colors">
              Product
            </Link>
            <Link href="/faq" className="text-gray-700 hover:text-pink-600 transition-colors">
              FAQ
            </Link>
            <Link href="/track-order" className="text-gray-700 hover:text-pink-600 transition-colors flex items-center">
              <Package className="w-4 h-4 mr-1" />
              Track Order
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-pink-600 transition-colors flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="text-pink-600 hover:text-opacity-80 transition-colors relative">
              <ShoppingBag className="w-6 h-6" />
              {state.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button className="lg:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-pink-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/product"
                className="text-gray-700 hover:text-pink-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Product
              </Link>
              <Link
                href="/faq"
                className="text-gray-700 hover:text-pink-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/track-order"
                className="text-gray-700 hover:text-pink-600 transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package className="w-4 h-4 mr-2" />
                Track Order
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-pink-600 transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="w-4 h-4 mr-2" />
                Contact Us
              </Link>
              <Link
                href="/cart"
                className="text-gray-700 hover:text-pink-600 transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Cart {state.itemCount > 0 && `(${state.itemCount})`}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
