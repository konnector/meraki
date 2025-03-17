'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ButtonAuth } from '@/components/ui/ButtonAuth'
import { validateEmail, getErrorMessage } from '@/lib/utils'
import { resetPassword } from '@/lib/supabase'

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    try {
      setIsLoading(true)
      await resetPassword(email)
      setSuccess(true)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="font-cal text-3xl tracking-tight">Reset your password</h1>
        <p className="text-gray-500">
          Enter your email address and we'll send you instructions to reset your password
        </p>
      </div>

      <div className="space-y-6">
        {success ? (
          <div className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg text-sm text-green-700">
              If an account exists for {email}, you will receive password reset instructions at this email address.
            </div>
            <Link href="/auth/signin">
              <ButtonAuth variant="outline" fullWidth>
                Return to sign in
              </ButtonAuth>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

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

            <ButtonAuth type="submit" fullWidth isLoading={isLoading}>
              Send reset instructions
            </ButtonAuth>
          </form>
        )}
      </div>

      <p className="text-center text-sm text-gray-500">
        Remember your password?{' '}
        <Link href="/auth/signin" className="font-medium text-neutral-900 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
} 