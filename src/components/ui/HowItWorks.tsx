'use client'

import Image from 'next/image'
import { HiOutlineFire, HiOutlineLightningBolt } from 'react-icons/hi'
import { MessageSquare, FileSpreadsheet, RefreshCw, GitMerge } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HowItWorks() {
  return (
    <div className="mx-auto w-full relative max-w-[1175px] gap-8 overflow-clip rounded-xl py-6 md:py-20 !bg-transparent px-1 md:px-1">
      <div className="flex flex-col pb-3.5 items-center text-center">
        <div>
          <span className="my-3 flex items-center justify-center mb-4">
            <span className="shadow-fade inline-flex items-center justify-start gap-1 rounded-full px-3.5 py-1 bg-white">
              <span className="flex h-4 w-auto items-center justify-center py-[1.33px] transition-transform duration-300">
                <HiOutlineLightningBolt className="h-4 w-4" />
              </span>
              <p className="text-xs text-[#242424]">How it works</p>
            </span>
          </span>
        </div>
        <h1 className="font-cal !leading-xs md:!leading-h1 text-[32px] lg:text-5xl pb-3">
          <span style={{ display: 'inline-block', verticalAlign: 'top', textDecoration: 'inherit', textWrap: 'balance' }}>
            AI-powered spreadsheets at your command
          </span>
        </h1>
        <p className="max-w-md text-base text-[#898989] lg:max-w-2xl lg:text-lg">
          Simply tell our AI what you need, and watch as your spreadsheets come to life. No formulas to memorize, no complex interfaces to navigate.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
        {/* Card 1: Natural Language Interface */}
        <div className="shadow-fade rounded-2xl bg-white overflow-hidden group">
          <div className="px-[20px] py-[20px]">
            <span className="mb-3 inline-block rounded-md bg-gray-200 px-2 py-1 font-mono text-sm font-bold text-gray-500">01</span>
            <p className="text-md mb-1.5 font-semibold">Talk to your spreadsheet</p>
            <p className="text-content-subtle max-w-[300px] text-[#898989] text-[16px]">
              Create complete spreadsheets with a single sentence. Just describe what you need, and our AI brings it to life instantly.
            </p>
          </div>
          <div className="relative p-5 pb-0 min-h-[260px] bg-gradient-to-b from-white to-gray-50 overflow-hidden transition-all duration-500 group-hover:translate-y-2">
            <div className="absolute inset-0 opacity-5 bg-grid-pattern"></div>
            <div className="flex flex-col space-y-3 relative">
              <div className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm transform transition-transform duration-300 hover:scale-[1.02]">
                <div className="p-2 bg-gray-100 rounded-full min-w-[40px] min-h-[40px] flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">Create me a spreadsheet for my cold emails</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-[1px] bg-gray-200 ml-5"></div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transform transition-all duration-300 origin-top animate-fade-in">
                <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 flex items-center">
                  <FileSpreadsheet className="h-4 w-4 text-gray-500 mr-2" />
                  <p className="text-sm font-medium text-gray-700">Cold Email Campaign Tracker</p>
                </div>
                <div className="p-3">
                  <div className="w-full overflow-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="p-2 border border-gray-200 text-left">Contact</th>
                          <th className="p-2 border border-gray-200 text-left">Email</th>
                          <th className="p-2 border border-gray-200 text-left">Status</th>
                          <th className="p-2 border border-gray-200 text-left">Response</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 border border-gray-200 text-left">John Doe</td>
                          <td className="p-2 border border-gray-200 text-left">john@example.com</td>
                          <td className="p-2 border border-gray-200 text-left">Sent</td>
                          <td className="p-2 border border-gray-200 text-left">Pending</td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-gray-200 text-left">Jane Smith</td>
                          <td className="p-2 border border-gray-200 text-left">jane@example.com</td>
                          <td className="p-2 border border-gray-200 text-left">Draft</td>
                          <td className="p-2 border border-gray-200 text-left">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Voice Updates */}
        <div className="shadow-fade rounded-2xl bg-white overflow-hidden group">
          <div className="px-[20px] py-[20px]">
            <span className="mb-3 inline-block rounded-md bg-gray-200 px-2 py-1 font-mono text-sm font-bold text-gray-500">02</span>
            <p className="text-md mb-1.5 font-semibold">Voice updates to your data</p>
            <p className="text-content-subtle max-w-[300px] text-[#898989] text-[16px]">
              Update your spreadsheet with simple voice commands. Track your progress and manage your data conversationally.
            </p>
          </div>
          <div className="relative p-5 pb-0 min-h-[260px] bg-gradient-to-b from-white to-gray-50 overflow-hidden transition-all duration-500 group-hover:translate-y-2">
            <div className="absolute inset-0 opacity-5 bg-grid-pattern"></div>
            <div className="flex flex-col space-y-3 relative">
              <div className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm transform transition-transform duration-300 hover:scale-[1.02]">
                <div className="p-2 bg-gray-100 rounded-full min-w-[40px] min-h-[40px] flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">Today I sent 50 emails, got 5 replies, and booked 2 calls</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-[1px] bg-gray-200 ml-5"></div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transform transition-all duration-300 origin-top animate-fade-in">
                <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 flex items-center">
                  <FileSpreadsheet className="h-4 w-4 text-gray-500 mr-2" />
                  <p className="text-sm font-medium text-gray-700">Campaign Results <span className="text-green-500 text-xs font-medium">• Updated</span></p>
                </div>
                <div className="p-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-gray-200 p-3">
                      <p className="text-xs text-gray-500">Total Emails</p>
                      <div className="flex items-baseline">
                        <p className="text-xl font-semibold">50</p>
                        <span className="ml-2 text-xs text-green-500">+50 today</span>
                      </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-3">
                      <p className="text-xs text-gray-500">Replies</p>
                      <div className="flex items-baseline">
                        <p className="text-xl font-semibold">5</p>
                        <span className="ml-2 text-xs text-green-500">+5 today</span>
                      </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-3">
                      <p className="text-xs text-gray-500">Calls Booked</p>
                      <div className="flex items-baseline">
                        <p className="text-xl font-semibold">2</p>
                        <span className="ml-2 text-xs text-green-500">+2 today</span>
                      </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-3">
                      <p className="text-xs text-gray-500">Response Rate</p>
                      <div className="flex items-baseline">
                        <p className="text-xl font-semibold">10%</p>
                        <span className="ml-2 text-xs text-green-500">↑</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Automated Updates */}
        <div className="shadow-fade rounded-2xl bg-white overflow-hidden group">
          <div className="px-[20px] py-[20px]">
            <span className="mb-3 inline-block rounded-md bg-gray-200 px-2 py-1 font-mono text-sm font-bold text-gray-500">03</span>
            <p className="text-md mb-1.5 font-semibold">Real-time data automation</p>
            <p className="text-content-subtle max-w-[300px] text-[#898989] text-[16px]">
              Connect to other services and websites for automated real-time updates to your spreadsheet without manual entry.
            </p>
          </div>
          <div className="relative p-5 pb-0 min-h-[260px] bg-gradient-to-b from-white to-gray-50 overflow-hidden transition-all duration-500 group-hover:translate-y-2">
            <div className="absolute inset-0 opacity-5 bg-grid-pattern"></div>
            <div className="flex flex-col space-y-3 relative">
              <div className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm transform transition-transform duration-300 hover:scale-[1.02]">
                <div className="p-2 bg-gray-100 rounded-full min-w-[40px] min-h-[40px] flex items-center justify-center">
                  <GitMerge className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">Connect my CRM and update lead status automatically</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-[1px] bg-gray-200 ml-5"></div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm transform transition-all duration-300 origin-top animate-fade-in">
                <div className="p-3 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center">
                        <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">CRM Integration</p>
                        <p className="text-xs text-gray-500">Auto-updates every 15 minutes</p>
                      </div>
                    </div>
                    <div className="h-6 w-10 bg-green-100 rounded-full flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-500 transform translate-x-5"></div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-medium text-gray-500">LAST UPDATE</p>
                    <div className="flex items-center">
                      <RefreshCw className="h-3 w-3 text-green-500 mr-1 animate-spin-slow" />
                      <p className="text-xs text-gray-500">3 minutes ago</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-md bg-gray-50 border border-gray-200">
                      <p className="text-sm">New lead: Sarah Johnson</p>
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">New</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-md bg-gray-50 border border-gray-200">
                      <p className="text-sm">Status change: Michael Chen</p>
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Qualified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Smart Formatting */}
        <div className="shadow-fade rounded-2xl bg-white overflow-hidden group">
          <div className="px-[20px] py-[20px]">
            <span className="mb-3 inline-block rounded-md bg-gray-200 px-2 py-1 font-mono text-sm font-bold text-gray-500">04</span>
            <p className="text-md mb-1.5 font-semibold">Smart formatting with commands</p>
            <p className="text-content-subtle max-w-[300px] text-[#898989] text-[16px]">
              Apply conditional formatting and styling with simple commands. Make your data visually clear and actionable.
            </p>
          </div>
          <div className="relative p-5 pb-0 min-h-[260px] bg-gradient-to-b from-white to-gray-50 overflow-hidden transition-all duration-500 group-hover:translate-y-2">
            <div className="absolute inset-0 opacity-5 bg-grid-pattern"></div>
            <div className="flex flex-col space-y-3 relative">
              <div className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm transform transition-transform duration-300 hover:scale-[1.02]">
                <div className="p-2 bg-gray-100 rounded-full min-w-[40px] min-h-[40px] flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">/format the open rates over 3% to green and under 3% to red</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-[1px] bg-gray-200 ml-5"></div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transform transition-all duration-300 origin-top animate-fade-in">
                <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center">
                    <FileSpreadsheet className="h-4 w-4 text-gray-500 mr-2" />
                    <p className="text-sm font-medium text-gray-700">Email Campaign Performance</p>
                  </div>
                  <span className="text-xs text-green-500 font-medium">• Formatting applied</span>
                </div>
                <div className="p-3">
                  <div className="w-full overflow-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="p-2 border border-gray-200 text-left">Campaign</th>
                          <th className="p-2 border border-gray-200 text-left">Sent</th>
                          <th className="p-2 border border-gray-200 text-left">Opens</th>
                          <th className="p-2 border border-gray-200 text-left">Open Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 border border-gray-200 text-left">Product Launch</td>
                          <td className="p-2 border border-gray-200 text-left">250</td>
                          <td className="p-2 border border-gray-200 text-left">12</td>
                          <td className="p-2 border border-gray-200 text-left bg-red-50 text-red-700">2.4%</td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-gray-200 text-left">Newsletter</td>
                          <td className="p-2 border border-gray-200 text-left">500</td>
                          <td className="p-2 border border-gray-200 text-left">23</td>
                          <td className="p-2 border border-gray-200 text-left bg-green-50 text-green-700">4.6%</td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-gray-200 text-left">Follow-up</td>
                          <td className="p-2 border border-gray-200 text-left">150</td>
                          <td className="p-2 border border-gray-200 text-left">5</td>
                          <td className="p-2 border border-gray-200 text-left bg-red-50 text-red-700">1.7%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
} 