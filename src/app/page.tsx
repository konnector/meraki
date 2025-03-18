import type { Metadata } from "next"
import dynamic from "next/dynamic"

// Use dynamic import with ssr: false to prevent document not defined error
const HomePageContent = dynamic(() => import('@/components/HomePageContent'), {
  ssr: false,
})

export const metadata: Metadata = {
  title: 'Meraki Sheets - Modern Online Spreadsheet',
  description: 'Transform your data with Meraki Sheets - A powerful online spreadsheet that makes collaboration seamless',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      }
    ],
  }
}

export default function Home() {
  return <HomePageContent />
}