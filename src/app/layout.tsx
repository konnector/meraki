import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'
import './fonts.css'
import { Toaster } from "sonner";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Meraki.ai',
    template: '%s | Meraki.ai'
  },
  description: 'Transform your spreadsheet experience with AI-powered automation',
  icons: {
    icon: '/icon.svg'
  },
  manifest: '/manifest.json'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
