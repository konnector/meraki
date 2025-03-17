import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const redirectTo = requestUrl.searchParams.get('redirectTo') || '/sheets'
    
    const supabase = createRouteHandlerClient({ cookies })

    if (code) {
      await supabase.auth.exchangeCodeForSession(code)
    }

    // After exchanging the code, verify the session
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      throw new Error('No session established')
    }

    // If we have a session, redirect to sheets
    return NextResponse.redirect(new URL('/sheets', request.url))
  } catch (error) {
    console.error('Auth callback error:', error)
    // If there's an error, redirect to sign in
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
} 