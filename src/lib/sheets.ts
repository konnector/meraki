import { getSupabaseClient } from './supabase'
import { Sheet, SheetData } from '@/types/database.types'

export async function createSheet(title: string, description?: string) {
    const supabase = getSupabaseClient()
    
    // Get the current user's ID
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User must be logged in to create a sheet')

    const { data, error } = await supabase
        .from('sheets')
        .insert([
            {
                user_id: user.id,
                title,
                description,
                is_public: false,
            }
        ])
        .select()
        .single()

    if (error) throw error
    return data as Sheet
}

export async function getSheetBySlug(slug: string) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
        .from('sheets')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error) throw error
    return data as Sheet
}

export async function getUserSheets() {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
        .from('sheets')
        .select('*')
        .order('updated_at', { ascending: false })

    if (error) throw error
    return data as Sheet[]
}

export async function updateSheet(id: string, updates: Partial<Sheet>) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
        .from('sheets')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

    if (error) throw error
    return data as Sheet
}

export async function deleteSheet(id: string) {
    const supabase = getSupabaseClient()
    const { error } = await supabase
        .from('sheets')
        .delete()
        .eq('id', id)

    if (error) throw error
}

export async function getSheetData(sheetId: string) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
        .from('sheet_data')
        .select('*')
        .eq('sheet_id', sheetId)
        .order('row_index', { ascending: true })
        .order('col_index', { ascending: true })

    if (error) throw error
    return data as SheetData[]
}

export async function updateSheetData(
    sheetId: string,
    rowIndex: number,
    colIndex: number,
    value: string,
    type: SheetData['cell_type'] = 'text'
) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
        .from('sheet_data')
        .upsert({
            sheet_id: sheetId,
            row_index: rowIndex,
            col_index: colIndex,
            cell_value: value,
            cell_type: type,
        })
        .select()
        .single()

    if (error) throw error
    return data as SheetData
}

export async function deleteSheetData(sheetId: string, rowIndex: number, colIndex: number) {
    const supabase = getSupabaseClient()
    const { error } = await supabase
        .from('sheet_data')
        .delete()
        .eq('sheet_id', sheetId)
        .eq('row_index', rowIndex)
        .eq('col_index', colIndex)

    if (error) throw error
} 