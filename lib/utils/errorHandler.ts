/**
 * Extract error message from RTK Query error
 * @param error - The error object from RTK Query mutation
 * @param defaultMessage - Default message if error message cannot be extracted
 * @returns Error message string
 */
export const getErrorMessage = (error: any, defaultMessage: string = 'An error occurred'): string => {
  // RTK Query error structure
  if (error?.data) {
    // Backend error response
    if (typeof error.data === 'object') {
      // Check for message field
      if (error.data.message) {
        return error.data.message
      }
      // Check for error field
      if (error.data.error) {
        return error.data.error
      }
      // Check for errors array (validation errors)
      if (Array.isArray(error.data.errors) && error.data.errors.length > 0) {
        return error.data.errors.map((e: any) => e.message || e).join(', ')
      }
      // If data is an object, try to stringify meaningful fields
      if (error.data.success === false && error.data.message) {
        return error.data.message
      }
    }
    // If data is a string
    if (typeof error.data === 'string') {
      return error.data
    }
  }

  // Check for error field directly
  if (error?.error) {
    return error.error
  }

  // Check for message field directly
  if (error?.message) {
    return error.message
  }

  // Check for status text
  if (error?.status === 'FETCH_ERROR') {
    return 'Network error. Please check your internet connection.'
  }

  if (error?.status === 'PARSING_ERROR') {
    return 'Failed to parse server response.'
  }

  if (error?.status === 'CUSTOM_ERROR') {
    return error.error || defaultMessage
  }

  // HTTP status codes
  if (error?.status === 400) {
    return 'Bad request. Please check your input.'
  }

  if (error?.status === 401) {
    return 'Unauthorized. Please login again.'
  }

  if (error?.status === 403) {
    return 'Access forbidden. You do not have permission.'
  }

  if (error?.status === 404) {
    return 'Resource not found.'
  }

  if (error?.status === 500) {
    return 'Server error. Please try again later.'
  }

  // Default fallback
  return defaultMessage
}

