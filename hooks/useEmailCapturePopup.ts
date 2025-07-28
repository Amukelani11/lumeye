import { useState, useEffect } from 'react'

export const useEmailCapturePopup = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [hasShownPopup, setHasShownPopup] = useState(false)

  useEffect(() => {
    // Check if user has already seen the popup or captured email
    const hasSeenPopup = localStorage.getItem('email_capture_popup_shown')
    const hasCapturedEmail = localStorage.getItem('discount_email')
    
    if (hasSeenPopup || hasCapturedEmail) {
      setHasShownPopup(true)
      return
    }

    // Show popup after 5 seconds on first visit
    const timer = setTimeout(() => {
      setShowPopup(true)
      setHasShownPopup(true)
      localStorage.setItem('email_capture_popup_shown', 'true')
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const closePopup = () => {
    setShowPopup(false)
  }

  const handleEmailCaptured = (email: string) => {
    // Email was captured, popup will auto-close
    console.log('Email captured:', email)
  }

  return {
    showPopup,
    hasShownPopup,
    closePopup,
    handleEmailCaptured
  }
} 