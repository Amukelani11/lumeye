import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// South African timezone (UTC+2) - convert from UTC to SA time
export function formatSATime(date: string | Date, options?: Intl.DateTimeFormatOptions) {
  try {
    const saDate = new Date(date)
    if (isNaN(saDate.getTime())) {
      return 'Invalid date'
    }
    
    const defaultOptions: Intl.DateTimeFormatOptions = {
      timeZone: 'Africa/Johannesburg',
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
    
    return saDate.toLocaleTimeString('en-US', { 
      timeZone: 'Africa/Johannesburg',
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
    
    return saDate.toLocaleDateString('en-US', { 
      timeZone: 'Africa/Johannesburg',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  } catch (error) {
    return 'Invalid date'
  }
}
