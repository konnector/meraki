'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text'
import { AnimatedSpreadsheetShowcase } from '@/components/ui/AnimatedSpreadsheetShowcase'
import { signInWithGoogle } from '@/lib/supabase'

export function HeroSection() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      await signInWithGoogle()
    } catch (err) {
      console.error('Error signing in with Google:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full relative max-w-[1175px] gap-8 rounded-[15px] px-1 bg-white overflow-hidden py-0 pt-8 md:px-0 md:py-0 md:pt-8 lg:py-8 lg:pl-12 border border-gray-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      {/* Background Grid Image */}
      <div className="absolute -bottom-20 -top-20 right-0 z-[1] hidden lg:block">
        <div className="relative h-[calc(100%+10rem)] w-[800px]">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/10 to-white/0"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/10 to-white/5"></div>
          <Image
            alt="background grid"
            src="/homepage-grid.svg"
            width={1200}
            height={1200}
            className="h-full w-full object-cover opacity-50"
            priority
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid w-full grid-cols-1 items-center justify-start gap-4 py-0 md:gap-[2%] lg:grid-cols-[45%_auto] lg:items-start">
        {/* Left Column - Content */}
        <div className="animate-move-up z-[3] w-full flex-col items-center p-4 text-center lg:items-start lg:text-left">
          {/* Announcement Banner */}
          <div className="flex flex-col pb-3.5 items-center text-center lg:items-start lg:text-left">
            <Link href="/blog">
              <span className="my-3 flex items-center justify-center mb-4">
                <span className="shadow-fade inline-flex items-center justify-start gap-1 rounded-full px-3.5 py-1 bg-[#F5F5F5] border border-gray-300/70 flex-row-reverse [&_span]:hover:translate-x-1 [&_span]:focus-visible:translate-x-1">
                  <span className="flex h-4 w-auto items-center justify-center py-[1.33px] transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <AnimatedShinyText className="font-medium text-xs text-[#242424] w-fit" shimmerWidth={80}>
                    ✨ Meraki Sheets launches v1.0
                  </AnimatedShinyText>
                </span>
              </span>
            </Link>

            {/* Main Heading */}
            <h1 className="font-cal text-[40px] leading-none md:text-[65px] lg:text-[60px] xl:text-[69px] pb-3">
              <span style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance' }}>
                The better way to work with spreadsheets
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-md text-base text-[#898989] lg:max-w-2xl lg:text-lg">
              A fully customizable AI-powered spreadsheet platform for individuals, teams, and developers building the next generation of data-driven solutions.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="w-full md:w-auto lg:w-[90%]">
            <div className="mx-auto grid w-full max-w-[400px] grid-cols-1 place-items-center items-center gap-4 px-5 md:max-w-[600px] md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(210px,1fr))] lg:px-0">
              <button 
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="text-sm font-medium relative border border-[transparent] dark:text-black bg-neutral-900 dark:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-neutral-900 hover:opacity-90 transition-all duration-150 ease-in-out flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#2c2c30] to-[#1d1d20] px-4 py-2.5 text-white shadow-inner before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:shadow-[0px_2px_0.4px_0px_rgba(255,_255,_255,_0.16)_inset] hover:bg-[#1f1f1f] hover:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="h-[18px] w-[18px]" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
                <span className="text-sm">{isLoading ? 'Signing in...' : 'Sign up with Google'}</span>
              </button>
              
              <Link 
                href="/auth/signup"
                className="text-sm font-medium relative border border-gray-300 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-neutral-900 hover:bg-gray-50 transition-all duration-150 ease-in-out flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-gray-900"
              >
                <span className="text-sm">Sign up with email</span>
              </Link>
            </div>
            <p className="mt-4 text-center text-sm text-[#898989]">No credit card required</p>
          </div>
        </div>

        {/* Right Column - Ai Spreadsheet Preview */}
        <div className="relative z-[2] origin-top-left self-center mt-8">
          <div className="animate-move-up lg:animate-fade-right origin-center transform rounded-xl bg-[#FAFAFA] p-1 transition-all duration-500 border border-gray-200">
            {/* Replace the empty placeholder with our AnimatedSpreadsheetShowcase */}
            <AnimatedSpreadsheetShowcase />
          </div>
        </div>
      </div>
    </div>
  )
} 