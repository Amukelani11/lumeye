"use client"

import { useState, useEffect, ReactNode } from "react"
import { Lock } from "lucide-react"

const ADMIN_CODE = "113345"
const REMEMBER_KEY = "lumeye_admin_code_remembered"
const CODE_KEY = "lumeye_admin_code"

interface AdminCodeAuthProps {
  children: ReactNode
}

export default function AdminCodeAuth({ children }: AdminCodeAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [code, setCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [rememberMe, setRememberMe] = useState(false)

  useEffect(() => {
    // Check if code is remembered
    const rememberedCode = localStorage.getItem(CODE_KEY)
    const isRemembered = localStorage.getItem(REMEMBER_KEY) === "true"

    if (isRemembered && rememberedCode === ADMIN_CODE) {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (code === ADMIN_CODE) {
      setIsAuthenticated(true)
      
      if (rememberMe) {
        localStorage.setItem(REMEMBER_KEY, "true")
        localStorage.setItem(CODE_KEY, ADMIN_CODE)
      }
    } else {
      setError("Invalid code. Please try again.")
      setCode("")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-pink-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
              <p className="text-gray-600">Enter the admin code to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Code
                </label>
                <input
                  id="code"
                  type="password"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg text-center tracking-widest"
                  placeholder="Enter code"
                  autoFocus
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                  Remember me on this device
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Enter Admin
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

