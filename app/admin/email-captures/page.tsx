"use client"

import { useState, useEffect } from 'react'
import { Mail, Download, Filter, Search } from 'lucide-react'
import Link from 'next/link'

interface EmailCapture {
  id: number
  email: string
  session_id: string
  discount_code: string
  discount_applied: boolean
  applied_at: string | null
  source: string
  created_at: string
}

export default function EmailCapturesPage() {
  const [emailCaptures, setEmailCaptures] = useState<EmailCapture[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSource, setFilterSource] = useState('all')
  const [filterApplied, setFilterApplied] = useState('all')

  useEffect(() => {
    fetchEmailCaptures()
  }, [])

  const fetchEmailCaptures = async () => {
    try {
      const response = await fetch('/api/admin/email-captures')
      const data = await response.json()
      setEmailCaptures(data.emailCaptures || [])
    } catch (error) {
      console.error('Failed to fetch email captures:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCaptures = emailCaptures.filter(capture => {
    const matchesSearch = capture.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSource = filterSource === 'all' || capture.source === filterSource
    const matchesApplied = filterApplied === 'all' || 
      (filterApplied === 'applied' && capture.discount_applied) ||
      (filterApplied === 'not_applied' && !capture.discount_applied)
    
    return matchesSearch && matchesSource && matchesApplied
  })

  const exportToCSV = () => {
    const headers = ['Email', 'Source', 'Discount Code', 'Applied', 'Applied At', 'Created At']
    const csvContent = [
      headers.join(','),
      ...filteredCaptures.map(capture => [
        capture.email,
        capture.source,
        capture.discount_code,
        capture.discount_applied ? 'Yes' : 'No',
        capture.applied_at || '',
        new Date(capture.created_at).toLocaleDateString()
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `email-captures-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const stats = {
    total: emailCaptures.length,
    applied: emailCaptures.filter(c => c.discount_applied).length,
    notApplied: emailCaptures.filter(c => !c.discount_applied).length,
    popup: emailCaptures.filter(c => c.source === 'popup').length,
    checkout: emailCaptures.filter(c => c.source === 'checkout').length,
    cart: emailCaptures.filter(c => c.source === 'cart').length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Email Captures</h1>
              <p className="text-gray-600 mt-2">Manage email captures for 10% discount</p>
            </div>
            <Link href="/admin" className="text-pink-600 hover:text-pink-700">
              ← Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Captures</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-green-600">{stats.applied}</div>
            <div className="text-sm text-gray-600">Applied</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-orange-600">{stats.notApplied}</div>
            <div className="text-sm text-gray-600">Not Applied</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-blue-600">{stats.popup}</div>
            <div className="text-sm text-gray-600">From Popup</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-purple-600">{stats.checkout}</div>
            <div className="text-sm text-gray-600">From Checkout</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-indigo-600">{stats.cart}</div>
            <div className="text-sm text-gray-600">From Cart</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filterSource}
                onChange={(e) => setFilterSource(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="all">All Sources</option>
                <option value="popup">Popup</option>
                <option value="checkout">Checkout</option>
                <option value="cart">Cart</option>
              </select>
              <select
                value={filterApplied}
                onChange={(e) => setFilterApplied(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="applied">Applied</option>
                <option value="not_applied">Not Applied</option>
              </select>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Email Captures Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discount Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCaptures.map((capture) => (
                  <tr key={capture.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{capture.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        capture.source === 'popup' ? 'bg-blue-100 text-blue-800' :
                        capture.source === 'checkout' ? 'bg-purple-100 text-purple-800' :
                        'bg-indigo-100 text-indigo-800'
                      }`}>
                        {capture.source}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {capture.discount_code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        capture.discount_applied 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {capture.discount_applied ? 'Applied' : 'Not Applied'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {capture.applied_at 
                        ? new Date(capture.applied_at).toLocaleDateString()
                        : '-'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(capture.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredCaptures.length === 0 && (
            <div className="text-center py-12">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No email captures found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 