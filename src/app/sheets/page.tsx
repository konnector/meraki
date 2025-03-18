import type { Metadata } from "next"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

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

  try {
    // Get count of existing sheets for numbering
    const { count, error: countError } = await supabase
      .from('sheets')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', session.user.id)
    
    if (countError) {
      console.error('Error counting sheets:', countError)
    }

    const sheetNumber = (count || 0) + 1
    const sheetTitle = `Untitled Spreadsheet ${sheetNumber}`

    // Create a new spreadsheet
    const sheetId = uuidv4()
    const { error } = await supabase
      .from('sheets')
      .insert({
        id: sheetId,
        title: sheetTitle,
        user_id: session.user.id,
        is_temporary: true // Mark as temporary
      })

    if (error) {
      console.error('Error creating sheet:', error)
      throw error
    }

    // Create initial sheet_data structure
    try {
      await supabase
        .from('sheet_data')
        .insert({
          sheet_id: sheetId,
          cell_key: 'metadata',
          data: { 
            title: sheetTitle,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        })
    } catch (dataError) {
      console.error('Error creating initial sheet data:', dataError)
      // Continue anyway, this is not critical
    }

    // Verify the sheet was created before redirecting
    const { data: sheetCheck, error: checkError } = await supabase
      .from('sheets')
      .select('id')
      .eq('id', sheetId)
      .single();
    
    if (checkError || !sheetCheck) {
      console.error('Error verifying sheet creation:', checkError);
      // If verification fails, redirect to dashboard instead
      redirect('/dashboard');
    }

    // Redirect to the new sheet
    redirect(`/sheets/${sheetId}`)
  } catch (error) {
    console.error('Error in sheet creation process:', error);
    redirect('/dashboard');
  }
} 