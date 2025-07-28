"use client"

import { useState, useEffect } from 'react'
import { X, Mail, Gift } from 'lucide-react'
import { useVisitorTracking } from '../../hooks/useVisitorTracking'

interface EmailCapturePopupProps {
  onClose: () => void
  onEmailCaptured: (email: string) => void
}

export default function EmailCapturePopup({ onClose, onEmailCaptured }: EmailCapturePopupProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const { trackActivity } = useVisitorTracking()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/email-capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'popup',
          discountCode: 'WELCOME10'
        }),
      })

      if (response.ok) {
        setSuccess(true)
        onEmailCaptured(email)
        
        // Track email capture
        trackActivity({
          action: 'email_capture',
          email,
          page: window.location.pathname
        })

        // Store in localStorage to remember the discount
        localStorage.setItem('discount_email', email)
        localStorage.setItem('discount_code', 'WELCOME10')
        
        // Close popup after 2 seconds
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to capture email')
      }
    } catch (error) {
      console.error('Error capturing email:', error)
      setError('Failed to capture email. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Gift className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">🎉 Welcome!</h3>
          <p className="text-gray-600 mb-4">
            Your 10% discount code <strong>WELCOME10</strong> has been applied!
          </p>
          <p className="text-sm text-gray-500">
            Use it at checkout to save on your Lumeye products.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="bg-pink-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Gift className="w-8 h-8 text-pink-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Get 10% Off!</h3>
          <p className="text-gray-600">
            Enter your email to receive a special welcome discount on your first order.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Applying Discount...' : 'Get 10% Off Now!'}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          By entering your email, you'll receive our newsletter with exclusive offers and updates.
        </p>
      </div>
    </div>
  )
} 