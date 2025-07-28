"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface DiscountContextType {
  discountCode: string
  discountApplied: boolean
  discountAmount: number
  setDiscountCode: (code: string) => void
  setDiscountApplied: (applied: boolean) => void
  setDiscountAmount: (amount: number) => void
  applyDiscount: (code: string, subtotal: number) => void
  clearDiscount: () => void
}

const DiscountContext = createContext<DiscountContextType | undefined>(undefined)

export function DiscountProvider({ children }: { children: React.ReactNode }) {
  const [discountCode, setDiscountCode] = useState('')
  const [discountApplied, setDiscountApplied] = useState(false)
  const [discountAmount, setDiscountAmount] = useState(0)

  useEffect(() => {
    // Check for saved discount on mount
    const savedEmail = localStorage.getItem('discount_email')
    const savedDiscount = localStorage.getItem('discount_code')
    
    if (savedEmail && savedDiscount) {
      setDiscountCode(savedDiscount)
      setDiscountApplied(true)
    }
  }, [])

  const applyDiscount = (code: string, subtotal: number) => {
    if (code === 'WELCOME10') {
      setDiscountCode(code)
      setDiscountApplied(true)
      setDiscountAmount(subtotal * 0.1)
    }
  }

  const clearDiscount = () => {
    setDiscountCode('')
    setDiscountApplied(false)
    setDiscountAmount(0)
  }

  return (
    <DiscountContext.Provider value={{
      discountCode,
      discountApplied,
      discountAmount,
      setDiscountCode,
      setDiscountApplied,
      setDiscountAmount,
      applyDiscount,
      clearDiscount
    }}>
      {children}
    </DiscountContext.Provider>
  )
}

export function useDiscount() {
  const context = useContext(DiscountContext)
  if (context === undefined) {
    throw new Error('useDiscount must be used within a DiscountProvider')
  }
  return context
} 