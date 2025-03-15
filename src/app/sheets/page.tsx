import type { Metadata } from "next"
import Spreadsheet from "@/components/spreadsheet/Spreadsheet"

export const metadata: Metadata = {
  title: 'Meraki Sheets - Spreadsheet',
  description: 'Your online spreadsheet workspace',
}

export default function SheetsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Spreadsheet />
    </main>
  )
} 