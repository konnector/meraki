'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text'
import { AISpreadsheetDemo } from './AISpreadsheetDemo'

export function HeroSection() {
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
      <div className="grid w-full grid-cols-1 items-center justify-start gap-4 py-0 md:gap-[6%] lg:grid-cols-[45%_auto] lg:items-start">
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
              <button className="text-sm font-medium relative border border-[transparent] dark:text-black bg-neutral-900 dark:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-neutral-900 hover:opacity-90 transition-all duration-150 ease-in-out flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#2c2c30] to-[#1d1d20] px-4 py-2.5 text-white shadow-inner before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:shadow-[0px_2px_0.4px_0px_rgba(255,_255,_255,_0.16)_inset] hover:bg-[#1f1f1f] hover:shadow-none">
                <Image
                  alt="Google"
                  src="/google.svg"
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px] object-contain"
                />
                <span className="text-sm">Sign up with Google</span>
              </button>
              <Link href="/signup" className="text-sm font-medium relative dark:text-black dark:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-neutral-900 hover:opacity-90 transition-all duration-150 ease-in-out flex w-full items-center justify-center gap-2 rounded-xl border border-black/20 bg-[#F2F2F3] px-4 py-2 text-gray-900 hover:bg-[#F2F2F3] hover:shadow-none">
                <p className="text-sm">Sign up with email</p>
              </Link>
            </div>
            <p className="mt-4 text-center text-sm text-[#898989]">No credit card required</p>
          </div>
        </div>

        {/* Right Column - AI Spreadsheet Demo */}
        <div className="relative z-[2] mx-auto origin-top-left self-center justify-self-center">
          <div className="animate-move-up lg:animate-fade-right origin-center transform rounded-xl bg-[#FAFAFA] p-1 transition-all duration-500 border border-gray-200">
            <div className="h-[580px] w-[500px] md:h-[410px] rounded-xl border border-gray-200 overflow-hidden">
              <AISpreadsheetDemo />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 