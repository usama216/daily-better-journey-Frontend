'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLoginMutation } from '@/lib/api/authApi'
import { setToken, setUser, isAuthenticated } from '@/lib/auth'
import { MdOutlineLock, MdOutlineEmail, MdVisibility, MdVisibilityOff } from 'react-icons/md'

export default function AdminLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  const [login, { isLoading }] = useLoginMutation()

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/admin')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const result = await login(formData).unwrap()
      
      if (result.success && result.data) {
        // Store token and user
        setToken(result.data.token)
        setUser(result.data.user)
        
        // Redirect to admin dashboard
        router.push('/admin')
      }
    } catch (err: any) {
      setError(err?.data?.message || 'Invalid email or password. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-charcoal-50 to-white flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-golden-200 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-forest-200 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-charcoal-200 p-8">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-forest-600 to-golden-600 rounded-xl mb-4">
              <MdOutlineLock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-charcoal-900 mb-2">Admin Login</h1>
            <p className="text-charcoal-600 text-sm">Enter your credentials to access the admin dashboard</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-charcoal-900 mb-2">
                Email Address
              </label>
              <div className="relative">
                <MdOutlineEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-charcoal-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-charcoal-200 rounded-lg focus:outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-200 transition-all text-charcoal-900"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-charcoal-900 mb-2">
                Password
              </label>
              <div className="relative">
                <MdOutlineLock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-charcoal-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-3 border-2 border-charcoal-200 rounded-lg focus:outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-200 transition-all text-charcoal-900"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <MdVisibilityOff className="w-5 h-5" />
                  ) : (
                    <MdVisibility className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 border-2 border-red-200 text-red-800 rounded-lg text-sm font-semibold"
                role="alert"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-700 hover:to-forest-800 text-white px-6 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </motion.button>
          </form>

          {/* Footer Note */}
          <p className="mt-6 text-center text-xs text-charcoal-500">
            Secure admin access only
          </p>
        </div>
      </motion.div>
    </div>
  )
}

