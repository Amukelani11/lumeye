import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSATime(date: string | Date, options?: Intl.DateTimeFormatOptions) {
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
  
  return new Date(date).toLocaleString('en-US', defaultOptions)
}

export function formatSATimeOnly(date: string | Date) {
  return new Date(date).toLocaleTimeString('en-US', { 
    timeZone: 'Africa/Johannesburg',
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
  })
}

export function formatSADateOnly(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', { 
    timeZone: 'Africa/Johannesburg',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
