'use client'

import Image from 'next/image'
import { HiOutlineFire } from 'react-icons/hi'

export default function HowItWorks() {
  return (
    <div className="mx-auto w-full relative max-w-[1175px] gap-8 overflow-clip rounded-xl py-6 md:py-20 !bg-transparent px-1 md:px-1">
      <div className="flex flex-col pb-3.5 items-center text-center">
        <div>
          <span className="my-3 flex items-center justify-center mb-4">
            <span className="shadow-fade inline-flex items-center justify-start gap-1 rounded-full px-3.5 py-1 bg-white">
              <span className="flex h-4 w-auto items-center justify-center py-[1.33px] transition-transform duration-300">
                <HiOutlineFire className="h-4 w-4" />
              </span>
              <p className="text-xs text-[#242424]">How it works</p>
            </span>
          </span>
        </div>
        <h1 className="font-cal !leading-xs md:!leading-h1 text-[32px] lg:text-5xl pb-3">
          <span style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance' }}>
            With us, spreadsheet automation is easy
          </span>
        </h1>
        <p className="max-w-md text-base text-[#898989] lg:max-w-2xl lg:text-lg">
          Effortless spreadsheet automation for business and individuals, powerful solutions for fast-growing modern companies.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 */}
        <div className="shadow-fade grid grid-cols-1 grid-rows-[auto_1fr] overflow-hidden rounded-2xl bg-white">
          <div className="px-[20px] py-[20px]">
            <span className="mb-3 inline-block rounded-md bg-gray-200 px-2 py-1 font-mono text-sm font-bold text-gray-500">01</span>
            <p className="text-md mb-1.5 font-semibold">Connect your spreadsheet</p>
            <p className="text-content-subtle max-w-[300px] text-[#898989] text-[16px]">
              We'll handle all the cross-referencing, so you don't have to worry about data synchronization.
            </p>
          </div>
          <div className="flex min-h-[200px] justify-center">
            <div className="aspect-video w-full overflow-clip">
              <div className="@container mt-[-5%] grid h-full w-full grid-cols-1 place-items-center px-1 [&>*]:[grid-area:1/1]">
                <div className="grid h-full w-full grid-cols-1 place-items-center [&>*]:[grid-area:1/1]">
                  <div className="border-subtle aspect-square rounded-full border w-[100cqw]"></div>
                  <div className="border-subtle aspect-square rounded-full border w-[80cqw]"></div>
                  <div className="border-subtle aspect-square rounded-full border w-[60cqw]"></div>
                  <div className="border-subtle aspect-square rounded-full border w-[40cqw]"></div>
                </div>
                <div className="relative z-10 grid h-full w-full grid-cols-1 place-items-center">
                  <div className="shadow-fade h-auto w-[25%] rounded-full px-4 py-3">
                    <Image src="/logo.svg" alt="logo" width={100} height={100} className="h-auto w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="shadow-fade grid grid-cols-1 grid-rows-[auto_1fr] overflow-hidden rounded-2xl bg-white">
          <div className="px-[20px] py-[20px]">
            <span className="mb-3 inline-block rounded-md bg-gray-200 px-2 py-1 font-mono text-sm font-bold text-gray-500">02</span>
            <p className="text-md mb-1.5 font-semibold">Set your automation rules</p>
            <p className="text-content-subtle max-w-[300px] text-[#898989] text-[16px]">
              Want to automate data entry? Set up any triggers? We make that easy.
            </p>
          </div>
          <div className="flex min-h-[200px] justify-center">
            <div className="grid h-full w-full overflow-clip pl-[20%] [&>*]:[grid-area:1/1]">
              <div className="border-subtle h-full w-[120%] rounded-tl-3xl border-l border-t bg-white p-5 opacity-60"></div>
              <div className="border-subtle h-full w-[120%] rounded-tl-3xl border-l border-t bg-white p-5 relative -left-4 top-3 opacity-80"></div>
              <div className="border-subtle h-full w-[120%] rounded-tl-3xl border-l border-t bg-white p-5 relative -left-8 top-6">
                <div className="grid max-w-[90%] grid-cols-[auto_1fr_auto_1fr] gap-4">
                  <div className="col-span-4 grid grid-cols-[subgrid] items-center gap-2">
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-11 rounded-full bg-blue-500"></div>
                      <input type="text" className="rounded-[10px] border font-normal bg-default border-default text-default h-8 px-3 py-2 text-sm w-full pointer-events-none mb-0" value="When new row is added" readOnly />
                    </div>
                  </div>
                  <div className="col-span-4 grid grid-cols-[subgrid] items-center gap-2">
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-11 rounded-full bg-blue-500"></div>
                      <input type="text" className="rounded-[10px] border font-normal bg-default border-default text-default h-8 px-3 py-2 text-sm w-full pointer-events-none mb-0" value="Send email notification" readOnly />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="shadow-fade grid grid-cols-1 grid-rows-[auto_1fr] overflow-hidden rounded-2xl bg-white">
          <div className="px-[20px] py-[20px]">
            <span className="mb-3 inline-block rounded-md bg-gray-200 px-2 py-1 font-mono text-sm font-bold text-gray-500">03</span>
            <p className="text-md mb-1.5 font-semibold">Choose your actions</p>
            <p className="text-content-subtle max-w-[300px] text-[#898989] text-[16px]">
              It could be sending emails, updating records, or triggering workflows!
            </p>
          </div>
          <div className="flex min-h-[200px] justify-center">
            <div className="grid h-full w-full max-w-[600px] overflow-clip pl-[10%] [&>*]:[grid-area:1/1]">
              <div className="border-subtle h-full w-[120%] rounded-t-3xl border-l border-r border-t bg-white md:w-full lg:w-[120%] relative grid grid-rows-[auto_1fr_auto] opacity-80">
                <div className="flex gap-1 border-b border-gray-200 px-5 py-3">
                  <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                  <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                  <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                </div>
                <div className="grid grid-cols-2">
                  <div className="relative grid place-items-center border-r border-gray-200 py-4">
                    <div className="absolute h-16 w-16 animate-ping rounded-full bg-gray-400/20"></div>
                    <svg className="h-12 w-12 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div className="relative grid place-items-center py-4">
                    <div className="absolute h-16 w-16 animate-ping rounded-full bg-gray-400/20"></div>
                    <svg className="h-12 w-12 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="flex items-center justify-center gap-4 rounded-t-2xl border-l border-r border-t border-gray-200 px-5 py-3">
                    <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 