// Session management for guest carts
export function generateSessionId(): string {
  return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
}

export function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  
  let sessionId = localStorage.getItem('lumeye-session-id')
  if (!sessionId) {
    sessionId = generateSessionId()
    localStorage.setItem('lumeye-session-id', sessionId)
  }
  return sessionId
}

export function clearSessionId(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('lumeye-session-id')
}

// User management (for future authentication)
export function getUserId(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('lumeye-user-id')
}

export function setUserId(userId: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('lumeye-user-id', userId)
}

export function clearUserId(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('lumeye-user-id')
} 