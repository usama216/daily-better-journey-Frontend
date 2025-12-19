/**
 * Extract error message from RTK Query error
 * Prioritizes backend error messages over generic status code messages
 * @param error - The error object from RTK Query mutation
 * @param defaultMessage - Default message if error message cannot be extracted
 * @returns Error message string
 */
export const getErrorMessage = (error: any, defaultMessage: string = 'An error occurred'): string => {
  // RTK Query error structure - always check data first for backend messages
  if (error?.data) {
    // Backend error response - prioritize backend messages
    if (typeof error.data === 'object') {
      // Priority 1: Backend message field (most specific)
      if (error.data.message && typeof error.data.message === 'string') {
        return error.data.message
      }
      
      // Priority 2: Backend error field (technical details)
      if (error.data.error) {
        // If error is a string, use it directly
        if (typeof error.data.error === 'string') {
          return error.data.error
        }
        // If error is an object, try to extract meaningful message
        if (typeof error.data.error === 'object') {
          if (error.data.error.message) {
            return error.data.error.message
          }
          // Handle Supabase errors
          if (error.data.error.details) {
            return error.data.error.details
          }
          if (error.data.error.hint) {
            return error.data.error.hint
          }
        }
      }
      
      // Priority 3: Errors array (validation errors)
      if (Array.isArray(error.data.errors) && error.data.errors.length > 0) {
        return error.data.errors.map((e: any) => {
          if (typeof e === 'string') return e
          if (e.message) return e.message
          if (e.field && e.message) return `${e.field}: ${e.message}`
          return JSON.stringify(e)
        }).join(', ')
      }
      
      // Priority 4: Check success flag with message
      if (error.data.success === false && error.data.message) {
        return error.data.message
      }
    }
    
    // If data is a string, use it directly
    if (typeof error.data === 'string') {
      return error.data
    }
  }

  // Check for error field directly (fallback)
  if (error?.error) {
    if (typeof error.error === 'string') {
      return error.error
    }
    if (error.error?.message) {
      return error.error.message
    }
  }

  // Check for message field directly (fallback)
  if (error?.message && typeof error.message === 'string') {
    return error.message
  }

  // RTK Query specific status checks (only if no backend message found)
  if (error?.status === 'FETCH_ERROR') {
    return 'Network error. Please check your internet connection.'
  }

  if (error?.status === 'PARSING_ERROR') {
    return 'Failed to parse server response.'
  }

  if (error?.status === 'CUSTOM_ERROR') {
    return error.error || defaultMessage
  }

  // HTTP status codes with generic messages (only as last resort)
  // These should rarely be used since backend should provide messages
  if (error?.status === 400 && !error?.data?.message) {
    return 'Bad request. Please check your input.'
  }

  if (error?.status === 401 && !error?.data?.message) {
    return 'Unauthorized. Please login again.'
  }

  if (error?.status === 403 && !error?.data?.message) {
    return 'Access forbidden. You do not have permission.'
  }

  if (error?.status === 404 && !error?.data?.message) {
    return 'Resource not found.'
  }

  if (error?.status === 500 && !error?.data?.message) {
    // For 500 errors, try to get error details from backend if available
    if (error?.data?.error) {
      return typeof error.data.error === 'string' 
        ? error.data.error 
        : 'Server error. Please try again later.'
    }
    return 'Server error. Please try again later.'
  }

  // Default fallback
  return defaultMessage
}

