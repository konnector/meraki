import type { Metadata } from "next"
import Spreadsheet from "@/components/spreadsheet/Spreadsheet"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Meraki Sheets - Modern Online Spreadsheet',
  description: 'Transform your data with Meraki Sheets - A powerful online spreadsheet that makes collaboration seamless',
}

export const dynamic = 'force-dynamic'

export default async function SheetsPage() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Spreadsheet />
    </main>
  )
} 