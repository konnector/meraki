'use client'

import { Check } from 'lucide-react'
import Link from 'next/link'

export function PricingSection() {
  return (
    <div className="flex flex-col gap-y-12 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="container flex justify-center">
        <div className="flex max-w-148 flex-col sm:mx-auto sm:items-center items-center">
          <h2 className="font-cal text-3xl lg:text-4xl text-center">
            <span>Simple </span>
            <span className="text-[#111111] font-semibold">transparent pricing</span>
          </h2>
          <p className="lg:mt-3 font-normal sm:text-center mt-3 text-center max-w-md text-base text-[#898989] lg:max-w-2xl lg:text-lg">
            Start with our free plan and upgrade when you need more power. No hidden fees or complicated tiers.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="flex flex-col p-8 rounded-xl border border-gray-200 bg-white shadow-sm h-full">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <div className="flex items-baseline gap-x-1">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="mt-3 text-gray-600">Perfect for trying out Meraki Sheets.</p>
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Up to 5 spreadsheets</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Basic formulas and functions</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Single-user access</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Export to CSV</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Community support</span>
              </div>
            </div>

            <div className="mt-auto">
              <Link href="/signup">
                <button className="w-full py-2.5 px-4 rounded-xl bg-white border border-gray-300 shadow-sm text-gray-900 font-medium hover:bg-gray-50 transition-colors">
                  Get Started
                </button>
              </Link>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="flex flex-col p-8 rounded-xl border-2 border-black bg-white shadow-lg relative h-full">
            <div className="absolute -top-4 right-8 bg-black text-white text-xs py-1 px-3 rounded-full">
              RECOMMENDED
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <div className="flex items-baseline gap-x-1">
                <span className="text-4xl font-bold">$9.99</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="mt-3 text-gray-600">Everything you need for serious data work.</p>
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Unlimited spreadsheets</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Advanced formulas and AI-powered insights</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Real-time collaboration with up to 10 users</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Version history (30 days)</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Data visualization tools</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Priority support</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">API access</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Export to multiple formats</span>
              </div>
            </div>

            <div className="mt-auto">
              <Link href="/signup">
                <button className="w-full py-2.5 px-4 rounded-xl font-medium relative border border-[transparent] dark:text-black bg-neutral-900 dark:bg-white hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-neutral-900 hover:opacity-90 transition-all duration-150 ease-in-out flex items-center justify-center bg-gradient-to-b from-[#2c2c30] to-[#1d1d20] text-white before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:shadow-[0px_2px_0.4px_0px_rgba(255,_255,_255,_0.16)_inset]">
                  Upgrade to Pro
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Enterprise Option */}
        <div className="mt-12 text-center">
          <p className="text-[#898989]">
            Need a custom solution for your enterprise?{" "}
            <Link href="/contact" className="text-black font-medium underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 