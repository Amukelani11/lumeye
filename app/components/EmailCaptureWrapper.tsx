"use client"

import { useEmailCapturePopup } from '../../hooks/useEmailCapturePopup'
import EmailCapturePopup from './EmailCapturePopup'

export default function EmailCaptureWrapper() {
  const { showPopup, closePopup, handleEmailCaptured } = useEmailCapturePopup()

  return (
    <>
      {showPopup && (
        <EmailCapturePopup
          onClose={closePopup}
          onEmailCaptured={handleEmailCaptured}
        />
      )}
    </>
  )
} 