import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Hardcoded South African timezone (UTC+2)
export function formatSATime(date: string | Date, options?: Intl.DateTimeFormatOptions) {
  try {
    const saDate = new Date(date)
    if (isNaN(saDate.getTime())) {
      return 'Invalid date'
    }
    // Add 2 hours for South African time (UTC+2)
    saDate.setHours(saDate.getHours() + 2)
    
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      ...options
    }
    
    return saDate.toLocaleString('en-US', defaultOptions)
  } catch (error) {
    return 'Invalid date'
  }
}

export function formatSATimeOnly(date: string | Date) {
  try {
    const saDate = new Date(date)
    if (isNaN(saDate.getTime())) {
      return 'Invalid date'
    }
    // Add 2 hours for South African time (UTC+2)
    saDate.setHours(saDate.getHours() + 2)
    
    return saDate.toLocaleTimeString('en-US', { 
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
    })
  } catch (error) {
    return 'Invalid date'
  }
}

export function formatSADateOnly(date: string | Date) {
  try {
    const saDate = new Date(date)
    if (isNaN(saDate.getTime())) {
      return 'Invalid date'
    }
    // Add 2 hours for South African time (UTC+2)
    saDate.setHours(saDate.getHours() + 2)
    
    return saDate.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  } catch (error) {
    return 'Invalid date'
  }
}
