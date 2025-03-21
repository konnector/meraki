'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ButtonAuth } from '@/components/ui/ButtonAuth'
import { validateEmail, validatePassword, getErrorMessage } from '@/lib/utils'
import { signUpWithEmail, signInWithGoogle, getSupabaseClient } from '@/lib/supabase'

export default function SignUp() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const supabase = getSupabaseClient()

  useEffect(() => {
    const checkSession = async () => {
      console.log('Checking for existing session...')
      const { data: { session } } = await supabase.auth.getSession()
      console.log('Session check result:', session ? 'Session exists' : 'No session')
      if (session) {
        console.log('Redirecting to /sheets due to existing session')
        window.location.href = '/sheets'
      }
    }
    checkSession()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    console.log('Starting sign-up process...')

    if (!name.trim()) {
      console.log('Name validation failed')
      setError('Please enter your name')
      return
    }

    if (!validateEmail(email)) {
      console.log('Email validation failed')
      setError('Please enter a valid email address')
      return
    }

    if (!validatePassword(password)) {
      console.log('Password validation failed')
      setError('Password must be at least 6 characters')
      return
    }

    try {
      setIsLoading(true)
      console.log('Attempting to sign up...')
      const response = await signUpWithEmail(email, password, name)
      console.log('Sign-up successful:', response)
      window.location.href = '/sheets'
    } catch (err) {
      console.error('Sign-up error:', err)
      setError(getErrorMessage(err))
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      console.log('Starting Google sign-in process...')
      await signInWithGoogle('/sheets')
    } catch (err) {
      console.error('Google sign-in error:', err)
      setError(getErrorMessage(err))
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="font-cal text-3xl tracking-tight">Create an account</h1>
        <p className="text-gray-500">Enter your information to get started</p>
      </div>

      <div className="space-y-6">
        <ButtonAuth
          variant="outline"
          fullWidth
          onClick={handleGoogleSignIn}
          isLoading={isLoading}
        >
          <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
          </svg>
          Continue with Google
        </ButtonAuth>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-[rgba(244,244,244,255)] px-2 text-gray-500">or continue with</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              required
            />
            <p className="text-xs text-gray-500">
              Must be at least 6 characters
            </p>
          </div>

          <ButtonAuth type="submit" fullWidth isLoading={isLoading}>
            Create account
          </ButtonAuth>
        </form>
      </div>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link href="/auth/signin" className="font-medium text-neutral-900 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
} 