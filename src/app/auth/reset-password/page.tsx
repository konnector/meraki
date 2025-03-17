'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ButtonAuth } from '@/components/ui/ButtonAuth'
import { validatePassword, getErrorMessage } from '@/lib/utils'
import { updatePassword } from '@/lib/supabase'

export default function ResetPassword() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!token) {
      setError('Invalid or expired reset link')
      return
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one number')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      setIsLoading(true)
      await updatePassword(password)
      setSuccess(true)
      setTimeout(() => {
        router.push('/auth/signin')
      }, 2000)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="text-center space-y-4">
        <h1 className="font-cal text-3xl tracking-tight">Invalid Reset Link</h1>
        <p className="text-gray-500">
          This password reset link is invalid or has expired. Please request a new password reset link.
        </p>
        <ButtonAuth
          variant="outline"
          onClick={() => router.push('/auth/forgot-password')}
        >
          Request New Link
        </ButtonAuth>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="font-cal text-3xl tracking-tight">Set new password</h1>
        <p className="text-gray-500">
          Enter your new password below
        </p>
      </div>

      <div className="space-y-6">
        {success ? (
          <div className="bg-green-50 p-4 rounded-lg text-sm text-green-700">
            Your password has been successfully reset. Redirecting to sign in...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                New password
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
                Must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm new password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                required
              />
            </div>

            <ButtonAuth type="submit" fullWidth isLoading={isLoading}>
              Reset password
            </ButtonAuth>
          </form>
        )}
      </div>
    </div>
  )
} 