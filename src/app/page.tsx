import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Meraki Sheets - Modern Online Spreadsheet',
  description: 'Transform your data with Meraki Sheets - A powerful online spreadsheet that makes collaboration seamless',
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo placeholder */}
          <div className="text-xl font-bold">Meraki Sheets</div>
          
          {/* Nav links placeholder */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/sheets" 
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Open Sheets
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Transform Your Data with Meraki Sheets
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A powerful online spreadsheet that makes collaboration seamless
          </p>
          <Link 
            href="/sheets"
            className="inline-flex items-center justify-center h-12 px-8 py-3 bg-primary text-white text-lg font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 px-4">
        <div className="container mx-auto">
          {/* Features content will go here */}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          {/* How it works content will go here */}
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-gray-50 px-4">
        <div className="container mx-auto">
          {/* Use cases content will go here */}
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          {/* Social proof content will go here */}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gray-50 px-4">
        <div className="container mx-auto">
          {/* Pricing content will go here */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary-50 px-4">
        <div className="container mx-auto">
          {/* CTA content will go here */}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white px-4">
        <div className="container mx-auto">
          {/* Footer content will go here */}
        </div>
      </footer>
    </main>
  )
}