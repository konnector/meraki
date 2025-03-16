'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FileSpreadsheet, MessageSquare, Share2, LayoutTemplate } from 'lucide-react'

export function FeaturesSection() {
  return (
    <div className="mx-auto w-full relative max-w-[1200px] gap-8 overflow-clip rounded-xl px-1 py-6 md:px-1 md:py-20 !bg-transparent">
      {/* Header */}
      <div className="flex flex-col pb-3.5 items-center text-center">
        <div>
          <span className="my-3 flex items-center justify-center mb-4">
            <span className="shadow-fade inline-flex items-center justify-start gap-1 rounded-full px-3.5 py-1 bg-white">
              <span className="flex h-4 w-auto items-center justify-center py-[1.33px] transition-transform duration-300">
                <FileSpreadsheet className="h-5 w-5" />
              </span>
              <p className="text-xs text-[#242424]">Features</p>
            </span>
          </span>
        </div>
        <h1 className="font-cal !leading-xs md:!leading-h1 text-[32px] lg:text-5xl pb-3">
          <span style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance' }}>
            Power and simplicity in one platform
          </span>
        </h1>
        <p className="max-w-md text-base text-[#898989] lg:max-w-2xl lg:text-lg">
          Elevate your data management with powerful tools designed for everyone. Unlimited features, seamless experience.
        </p>
        
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link 
            href="/signup" 
            className="inline-flex items-center px-3 py-2 text-sm font-medium border border-[transparent] dark:text-black text-white bg-neutral-900 dark:bg-white hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-neutral-900 hover:opacity-90 transition-all duration-150 ease-in-out group relative overflow-hidden rounded-xl bg-gradient-to-b from-[#2c2c30] to-[#1d1d20] before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:shadow-[0px_2px_0.4px_0px_rgba(255,_255,_255,_0.16)_inset]"
          >
            Get started
            <div className="ml-3 mt-0.5 scale-150">
              <svg className="stroke-gray-400 stroke-2" fill="none" width="7" height="7" viewBox="0 0 10 10" aria-hidden="true">
                <path className="opacity-0 transition group-hover:opacity-100" d="M0 5h7"></path>
                <path className="transition group-hover:translate-x-[3px]" d="M1 1l4 4-4 4"></path>
              </svg>
            </div>
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mt-4 grid grid-cols-1 grid-rows-[auto_auto_1fr] gap-8 md:grid-cols-2 md:px-2">
        {/* Feature 1: AI Assistant */}
        <div className="shadow-fade grid h-full grid-rows-[auto_auto_1fr] gap-4 overflow-hidden rounded-xl bg-white p-8 pb-0">
          <p className="break-words text-xl font-medium">Intelligent AI Assistance</p>
          <p className="break-words text-[16px] text-gray-500">
            Experience the power of AI to understand your needs in natural language. Create complex spreadsheets, generate reports, and analyze data with simple conversational commands.
          </p>
          <div className="mt-auto">
            <div className="pointer-events-none grid h-full w-full place-items-center overflow-clip">
              <div className="-mb-6 grid h-full w-full max-w-[400px] pt-8">
                <div className="relative p-6 bg-[#fafafa] rounded-t-3xl border border-gray-200">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-100 rounded-full">
                        <MessageSquare className="h-6 w-6 text-gray-700" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-700">How do I analyze my Q1 sales data?</p>
                        <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">I'll help you create a sales analysis spreadsheet with trends, comparisons, and visualizations for Q1. Would you like to include month-over-month growth calculations?</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: Formula Assistant */}
        <div className="shadow-fade grid h-full grid-rows-[auto_auto_1fr] gap-4 overflow-hidden rounded-xl bg-white p-8 pb-0">
          <p className="break-words text-xl font-medium">Formula Composer</p>
          <p className="break-words text-[16px] text-gray-500">
            Say goodbye to complex formula syntax. Our intelligent formula composer helps you create, understand, and optimize spreadsheet formulas with interactive guidance and suggestions.
          </p>
          <div className="mt-auto">
            <div className="pointer-events-none grid h-full w-full place-items-center overflow-clip">
              <div className="-mb-6 grid h-full w-full max-w-[400px] pt-8">
                <div className="relative p-6 bg-[#fafafa] rounded-t-3xl border border-gray-200">
                  <div className="p-3 border border-gray-200 rounded-lg bg-white">
                    <p className="text-sm font-medium mb-2">Formula Builder</p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1 px-2 bg-blue-100 text-blue-700 rounded text-xs font-mono">SUMIFS</div>
                      <div className="p-1 px-2 bg-green-100 text-green-700 rounded text-xs font-mono">VLOOKUP</div>
                      <div className="p-1 px-2 bg-orange-100 text-orange-700 rounded text-xs font-mono">IF</div>
                    </div>
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded">
                      <p className="text-xs font-mono">
                        =<span className="text-blue-600">SUMIFS</span>(Sales, Date, "&gt;"&Date(2023,1,1), Date, "&lt;"&Date(2023,4,1))
                      </p>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">Sums sales values from Q1 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 3: Collaboration */}
        <div className="shadow-fade grid h-full grid-rows-[auto_auto_1fr] gap-4 overflow-hidden rounded-xl bg-white p-8 pb-0">
          <p className="break-words text-xl font-medium">Seamless Collaboration</p>
          <p className="break-words text-[16px] text-gray-500">
            Work together in real-time with teammates. Share your spreadsheets instantly, control access permissions, and see live changes without conflicts or confusion.
          </p>
          <div className="mt-auto">
            <div className="pointer-events-none grid h-full w-full place-items-center overflow-clip">
              <div className="-mb-6 grid h-full w-full max-w-[400px] pt-8">
                <div className="relative p-6 bg-[#fafafa] rounded-t-3xl border border-gray-200">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <p className="font-medium">Q2 Budget Planning</p>
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">JD</div>
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">MK</div>
                        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">AR</div>
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs">+2</div>
                      </div>
                    </div>
                    <div className="p-2 bg-green-50 rounded mb-2 text-sm flex items-center">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs mr-2">MK</div>
                      <span className="text-green-800 text-xs">Michelle K. is editing cell F24</span>
                    </div>
                    <div className="flex">
                      <Share2 className="h-5 w-5 text-gray-500 mr-1" />
                      <p className="text-xs text-gray-500">Share settings: Edit access</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 4: Templates */}
        <div className="shadow-fade grid h-full grid-rows-[auto_auto_1fr] gap-4 overflow-hidden rounded-xl bg-white p-8 pb-0">
          <p className="break-words text-xl font-medium">Ready-to-Use Templates</p>
          <p className="break-words text-[16px] text-gray-500">
            Start fast with professionally designed templates for budgeting, project management, data analysis, and more. Customize them to your needs in seconds.
          </p>
          <div className="mt-auto">
            <div className="pointer-events-none grid h-full w-full place-items-center overflow-clip">
              <div className="-mb-6 grid h-full w-full max-w-[400px] pt-8">
                <div className="relative p-6 bg-[#fafafa] rounded-t-3xl border border-gray-200">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 border border-gray-200 rounded-lg bg-white">
                      <LayoutTemplate className="h-5 w-5 text-blue-600 mb-1" />
                      <p className="text-sm font-medium">Project Tracker</p>
                      <p className="text-xs text-gray-500">20+ users</p>
                    </div>
                    <div className="p-3 border border-gray-200 rounded-lg bg-white">
                      <LayoutTemplate className="h-5 w-5 text-green-600 mb-1" />
                      <p className="text-sm font-medium">Financial Dashboard</p>
                      <p className="text-xs text-gray-500">50+ users</p>
                    </div>
                    <div className="p-3 border border-gray-200 rounded-lg bg-white">
                      <LayoutTemplate className="h-5 w-5 text-purple-600 mb-1" />
                      <p className="text-sm font-medium">Sales Pipeline</p>
                      <p className="text-xs text-gray-500">35+ users</p>
                    </div>
                    <div className="p-3 border border-gray-200 rounded-lg bg-white">
                      <LayoutTemplate className="h-5 w-5 text-orange-600 mb-1" />
                      <p className="text-sm font-medium">Team Roadmap</p>
                      <p className="text-xs text-gray-500">15+ users</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Features Section */}
      <div>
        <div className="mb-10 mt-20">
          <div className="flex flex-col pb-3.5 items-center text-center">
            <h1 className="font-cal !leading-xs md:!leading-h1 text-[32px] lg:text-5xl pb-3">
              <span style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance' }}>
                ...and so much more!
              </span>
            </h1>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-2 place-items-center content-center sm:grid-cols-4 md:w-max lg:grid-cols-4">
          {/* Additional feature 1 */}
          <FeatureBox title="Advanced Data Analysis" icon={<FileSpreadsheet className="h-6 w-6" />} description="Gain deeper insights with powerful analysis tools" />
          
          {/* Additional feature 2 */}
          <FeatureBox title="Cloud Synchronization" icon={<Share2 className="h-6 w-6" />} description="Access your spreadsheets from any device, anywhere" />
          
          {/* Additional feature 3 */}
          <FeatureBox title="Interactive Dashboards" icon={<LayoutTemplate className="h-6 w-6" />} description="Create beautiful visual representations of your data" />
          
          {/* Additional feature 4 */}
          <FeatureBox title="Smart Data Import" icon={<FileSpreadsheet className="h-6 w-6" />} description="Import data from multiple sources with ease" />
        </div>
      </div>
    </div>
  )
}

// Feature Box Component for Additional Features
function FeatureBox({ title, icon, description }: { title: string, icon: React.ReactNode, description: string }) {
  return (
    <div className="relative grid p-3 shadow-[1px_1px_0px_0px_#E1E2E3,inset_1px_1px_0px_0px_#E1E2E3]">
      <span aria-hidden="true" className="pointer-events-none absolute bottom-[-11px] left-[-11px] right-[-11px] top-[-11px] z-10 bg-[url(/cross.svg),url(/cross.svg),url(/cross.svg),url(/cross.svg)] bg-[length:22px] bg-[position:top_left,top_right,bottom_left,bottom_right] bg-no-repeat"></span>
      <div className="perspective-1000 h-40 w-full max-w-[180px]">
        <div className="shadow-fade group relative grid h-full w-full overflow-clip rounded-2xl bg-white [&>*]:[grid-area:1/1]">
          <div className="flex h-full w-full flex-col items-center p-4 transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0">
            <div className="flex h-20 items-center justify-center">
              <div className="shadow-fade relative grid h-[64px] w-[64px] shrink-0 place-items-center rounded-lg bg-neutral-100 text-gray-700">
                <div className="absolute left-2 top-2 h-1 w-1 rounded-full bg-gray-300"></div>
                <div className="absolute right-2 top-2 h-1 w-1 rounded-full bg-gray-300"></div>
                <div className="absolute bottom-2 left-2 h-1 w-1 rounded-full bg-gray-300"></div>
                <div className="absolute bottom-2 right-2 h-1 w-1 rounded-full bg-gray-300"></div>
                {icon}
              </div>
            </div>
            <div className="flex flex-grow items-center">
              <h1 className="text-center text-base font-semibold leading-tight">{title}</h1>
            </div>
          </div>
          <div className="relative flex h-full w-full scale-95 select-none flex-col items-center justify-center rounded-xl p-2 opacity-0 transition-[opacity,transform] duration-300 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100 group-focus-visible:pointer-events-auto group-focus-visible:scale-100 group-focus-visible:opacity-100">
            <div className="absolute left-3 top-3 h-1.5 w-1.5 rounded-full bg-gray-200"></div>
            <div className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-gray-200"></div>
            <div className="absolute bottom-3 left-3 h-1.5 w-1.5 rounded-full bg-gray-200"></div>
            <div className="absolute bottom-3 right-3 h-1.5 w-1.5 rounded-full bg-gray-200"></div>
            <p className="mb-2 text-center text-sm font-semibold leading-tight md:text-base">{title}</p>
            <p className="text-center text-sm font-medium text-gray-700">{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 