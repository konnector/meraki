import type { Metadata } from "next"
import Link from "next/link"
import { NavigationBar } from "@/components/ui/NavigationBar"
import { HeroSection } from "@/components/ui/HeroSection"
import { Footer } from "@/components/ui/Footer"
import HowItWorks from '@/components/ui/HowItWorks'
import { TestimonialsSection } from '@/components/ui/TestimonialsSection'
import { PricingSection } from '@/components/ui/PricingSection'
import { FeaturesSection } from '@/components/ui/FeaturesSection'

export const metadata: Metadata = {
  title: 'Meraki Sheets - Modern Online Spreadsheet',
  description: 'Transform your data with Meraki Sheets - A powerful online spreadsheet that makes collaboration seamless',
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[rgba(244,244,244,255)]">
      <NavigationBar />
      
      {/* Hero Section with proper spacing */}
      <section className="pt-0 pb-12">
        <HeroSection />
      </section>

      {/* How It Works Section */}
      <section className="py-0 border-t border-gray-400/40">
        <HowItWorks />
      </section>

      {/* Features Section */}
      <section className="py-1 border-t border-gray-400/40">
        <FeaturesSection />
      </section>

      {/* Testimonials Section */}
      <section className="py-24 border-t border-gray-400/40">
        <TestimonialsSection />
      </section>

      {/* Pricing Section */}
      <section className="py-24 border-t border-gray-400/40">
        <PricingSection />
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-gray-400/40">
        <div className="container">
          {/* CTA content will go here */}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}