import './globals.css';
import type { Metadata } from 'next';
import { GridLayout } from "@/components/ui/GridLayout"
import { Inter } from 'next/font/google'
import './fonts.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Meraki.ai',
  description: 'Transform your spreadsheet experience with AI-powered automation',
  icons: {
    icon: [
      {
        url: '/Meraki.svg',
        type: 'image/svg+xml',
      }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GridLayout>
          {children}
        </GridLayout>
      </body>
    </html>
  );
}