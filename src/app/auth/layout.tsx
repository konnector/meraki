import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication - Meraki Sheets',
  description: 'Authentication pages for Meraki Sheets - Sign in, Sign up, and Password Recovery',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[rgba(244,244,244,255)] flex flex-col">
      {/* Header */}
      <header className="w-full max-w-[1440px] px-4 md:px-[34px] mx-auto py-6">
        <Link href="/" className="flex items-center">
          <span className="font-cal text-2xl font-semibold text-[#111111]">
            Meraki.ai
            <sup className="text-[11px] relative -top-2.5 -ml-0.5 ml-[1px]">©</sup>
          </span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-500">
        <div className="space-x-4">
          <Link href="/legal/privacy" className="hover:text-gray-900 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/legal/terms" className="hover:text-gray-900 transition-colors">
            Terms of Service
          </Link>
          <Link href="/support" className="hover:text-gray-900 transition-colors">
            Help Center
          </Link>
        </div>
      </footer>
    </div>
  )
} 