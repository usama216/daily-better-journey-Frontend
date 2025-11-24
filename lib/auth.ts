// Auth utility functions

export const AUTH_TOKEN_KEY = 'admin_token'
export const AUTH_USER_KEY = 'admin_user'

export interface AuthUser {
  id: string
  email: string
  name: string
}

// Get token from localStorage
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

// Set token in localStorage
export const setToken = (token: string): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(AUTH_TOKEN_KEY, token)
}

// Remove token from localStorage
export const removeToken = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(AUTH_USER_KEY)
}

// Get user from localStorage
export const getUser = (): AuthUser | null => {
  if (typeof window === 'undefined') return null
  const userStr = localStorage.getItem(AUTH_USER_KEY)
  if (!userStr) return null
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

// Set user in localStorage
export const setUser = (user: AuthUser): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getToken() !== null
}

// Logout user
export const logout = (): void => {
  removeToken()
  if (typeof window !== 'undefined') {
    window.location.href = '/admin/login'
  }
}

// Get authorization header for API requests
export const getAuthHeader = (): { Authorization: string } | {} => {
  const token = getToken()
  if (!token) return {}
  return { Authorization: `Bearer ${token}` }
}

