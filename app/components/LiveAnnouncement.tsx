"use client"

import { useState, useEffect } from 'react'
import { X, Info, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/database'

interface Announcement {
  id: number
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  is_active: boolean
  expires_at?: string
  created_at: string
  dismissed_by: string[]
}

export default function LiveAnnouncement() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')

  useEffect(() => {
    // Get or create session ID
    let currentSessionId = localStorage.getItem('visitor_session')
    if (!currentSessionId) {
      currentSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('visitor_session', currentSessionId)
    }
    setSessionId(currentSessionId)

    // Fetch active announcements
    fetchActiveAnnouncement(currentSessionId)

    // Set up real-time subscription
    const channel = supabase
      .channel('announcements')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'announcements' 
        }, 
        () => {
          fetchActiveAnnouncement(currentSessionId)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchActiveAnnouncement = async (currentSessionId: string) => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true)
        .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching announcement:', error)
        return
      }

      if (data) {
        // Check if user has already dismissed this announcement
        const dismissedBy = data.dismissed_by || []
        if (!dismissedBy.includes(currentSessionId)) {
          setAnnouncement(data)
          setIsVisible(true)
        }
      }
    } catch (error) {
      console.error('Error fetching announcement:', error)
    }
  }

  const dismissAnnouncement = async () => {
    if (!announcement) return

    try {
      // Add current session to dismissed_by array
      const dismissedBy = announcement.dismissed_by || []
      const updatedDismissedBy = [...dismissedBy, sessionId]

      const { error } = await supabase
        .from('announcements')
        .update({ dismissed_by: updatedDismissedBy })
        .eq('id', announcement.id)

      if (error) {
        console.error('Error dismissing announcement:', error)
      } else {
        setIsVisible(false)
        setAnnouncement(null)
      }
    } catch (error) {
      console.error('Error dismissing announcement:', error)
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <Info className="w-5 h-5 text-blue-600" />
    }
  }

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-blue-50 border-blue-200'
    }
  }

  const getTextColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-800'
      case 'warning':
        return 'text-yellow-800'
      case 'error':
        return 'text-red-800'
      default:
        return 'text-blue-800'
    }
  }

  if (!isVisible || !announcement) {
    return null
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md mx-4">
      <div className={`${getBgColor(announcement.type)} border rounded-lg p-4 shadow-lg`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getIcon(announcement.type)}
          </div>
          <div className="ml-3 flex-1">
            <h3 className={`text-sm font-medium ${getTextColor(announcement.type)}`}>
              {announcement.title}
            </h3>
            <p className={`mt-1 text-sm ${getTextColor(announcement.type)}`}>
              {announcement.message}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={dismissAnnouncement}
              className={`inline-flex rounded-md p-1.5 ${getTextColor(announcement.type)} hover:bg-opacity-20 hover:bg-current focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 