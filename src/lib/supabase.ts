import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Create a single instance of the Supabase client
let supabaseClient: ReturnType<typeof createClientComponentClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createClientComponentClient()
  }
  return supabaseClient
}

export type Profile = {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  created_at: string
}

// Auth helper functions
export async function signInWithEmail(email: string, password: string) {
  const supabase = getSupabaseClient()
  console.log('Starting email sign-in with Supabase...')
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) {
    console.error('Supabase sign-in error:', error)
    throw error
  }

  console.log('Initial sign-in successful, verifying session...')
  // Verify session is established
  const { data: { session } } = await supabase.auth.getSession()
  console.log('Session verification result:', session ? 'Valid session' : 'No session')
  
  if (!session) {
    console.error('Failed to establish session after successful sign-in')
    throw new Error('Failed to establish session')
  }

  console.log('Sign-in and session verification complete')
  return data
}

export async function signUpWithEmail(email: string, password: string, fullName: string) {
  const supabase = getSupabaseClient()
  console.log('Starting email sign-up with Supabase...')
  
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })
  if (authError) throw authError

  console.log('Sign-up successful, creating profile...')
  // Create profile record
  if (authData.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          email: email,
          full_name: fullName,
        },
      ])
    if (profileError) throw profileError
  }

  console.log('Profile created successfully')
  return authData
}

export async function signInWithGoogle(redirectTo?: string) {
  const supabase = getSupabaseClient()
  console.log('Starting Google OAuth sign-in...')
  console.log('Redirect URL:', redirectTo)
  
  const redirectUrl = `${window.location.origin}/auth/callback?redirectTo=${encodeURIComponent(redirectTo || '/sheets')}`
  console.log('Full redirect URL:', redirectUrl)
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUrl,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })
  
  if (error) {
    console.error('Google OAuth error:', error)
    throw error
  }
  
  console.log('Google OAuth initiated successfully')
  return data
}

export async function resetPassword(email: string) {
  const supabase = getSupabaseClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  })
  if (error) throw error
}

export async function updatePassword(newPassword: string) {
  const supabase = getSupabaseClient()
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })
  if (error) throw error
}

export async function signOut() {
  const supabase = getSupabaseClient()
  const { error } = await supabase.auth.signOut()
  if (error) throw error
} 