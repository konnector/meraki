import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Spreadsheet from '@/components/spreadsheet/Spreadsheet'

interface PageProps {
  params: {
    id: string
  }
}

export default async function SheetPage({ params }: PageProps) {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/auth/signin')
  }

  // Check if sheet exists and belongs to user
  const { data: sheet, error } = await supabase
    .from('sheets')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', session.user.id)
    .single()

  if (error || !sheet) {
    redirect('/sheets')
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Spreadsheet sheetId={params.id} isTemp={sheet.is_temporary} />
    </main>
  )
} 