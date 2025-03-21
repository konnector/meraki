'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { 
  ChevronDown, 
  Users, 
  User, 
  Building2, 
  Code2,
  LineChart,
  GraduationCap,
  Phone,
  Stethoscope,
  MessageSquare,
  ShoppingCart,
  Clock,
  FileSpreadsheet,
  BarChart3,
  History,
  Layout,
  Wand2,
  FileUp,
  Calculator,
  Chrome,
  FileCode,
  Webhook,
  Puzzle
} from "lucide-react"

export function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session)
    }
    
    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const dropdownContent = {
    features: {
      sections: [
        {
          title: "Core Features",
          items: [
            { name: "Real-time Collaboration", description: "Work together seamlessly in real-time", icon: Users },
            { name: "Advanced Formulas", description: "Powerful calculations and data analysis", icon: Calculator },
            { name: "Data Visualization", description: "Create stunning charts and graphs", icon: BarChart3 },
            { name: "Version History", description: "Track changes and restore previous versions", icon: History }
          ]
        },
        {
          title: "Smart Tools",
          items: [
            { name: "Templates", description: "Ready-to-use professional templates", icon: Layout },
            { name: "Automation", description: "Automate repetitive tasks", icon: Wand2 },
            { name: "Data Import", description: "Import data from multiple sources", icon: FileUp },
            { name: "Custom Functions", description: "Create your own spreadsheet functions", icon: FileSpreadsheet }
          ]
        }
      ]
    },
    solutions: {
      sections: [
        {
          title: "By Team Size",
          items: [
            { name: "For Individuals", description: "Personal productivity tools", icon: User },
            { name: "For Teams", description: "Collaborative workspace solutions", icon: Users },
            { name: "For Enterprise", description: "Large-scale deployment and control", icon: Building2 }
          ]
        },
        {
          title: "By Industry",
          items: [
            { name: "Finance", description: "Financial modeling and analysis", icon: LineChart },
            { name: "Education", description: "Teaching and learning tools", icon: GraduationCap },
            { name: "Business", description: "Business planning and analytics", icon: ShoppingCart },
            { name: "Research", description: "Data analysis and reporting", icon: Clock }
          ]
        }
      ]
    },
    integrations: {
      sections: [
        {
          title: "Popular Integrations",
          items: [
            { name: "Google Workspace", description: "Seamless Google integration", icon: Chrome },
            { name: "Microsoft 365", description: "Excel compatibility", icon: FileSpreadsheet },
            { name: "Slack", description: "Real-time notifications", icon: MessageSquare },
            { name: "Zapier", description: "Connect with 3000+ apps", icon: Webhook }
          ]
        },
        {
          title: "Developer Tools",
          items: [
            { name: "API Access", description: "Build custom integrations", icon: Code2 },
            { name: "Plugins", description: "Extend functionality", icon: Puzzle },
            { name: "Custom Scripts", description: "Automate workflows", icon: FileCode }
          ]
        }
      ]
    }
  }

  return (
    <div className="h-24 relative">
      <div className="border-b-0 before:hidden after:hidden">
        <div className={`w-full max-w-[1440px] px-4 md:px-[34px] fixed left-1/2 top-0 z-50 mx-auto mb-8 flex -translate-x-1/2 items-center justify-between py-5 lg:mt-2 lg:max-w-[min(1150px,calc(100vw-24px))] lg:rounded-2xl lg:py-0 before:shadow-fade before:absolute before:inset-0 before:z-[-1] before:bg-white before:opacity-0 before:transition-all before:duration-500 before:ease-in-out lg:before:rounded-2xl ${
          isScrolled ? 'bg-white/95 backdrop-blur-sm before:opacity-100 before:block before:border transition-all duration-500 ease-in-out' : 'bg-[rgba(244,244,244,255)] transition-all duration-500 ease-in-out'
        }`}>
          {/* Logo */}
          <div className="flex cursor-pointer rtl:relative rtl:top-3">
            <Link href="/" className="flex items-center">
              <span className="font-cal text-2xl font-semibold text-[#111111]">Meraki.ai<sup className="text-[11px] relative -top-2.5 -ml-0.5 ml-[1px]">©</sup></span>
            </Link>
          </div>
          
          {/* Middle Navigation */}
          <nav aria-label="Main" className="hidden lg:block">
            <div className="font-matter rounded-4xl relative z-20 text-sm leading-[22px] text-black">
              <ul className="flex" dir="ltr">
                <li 
                  className="relative -mx-2 flex flex-col justify-center [&:first-child]:ml-0 [&:nth-child(5)]:mr-0"
                  onMouseEnter={() => setActiveDropdown('features')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="group flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                    Features
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  <div className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-all duration-200 ${
                    activeDropdown === 'features' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'
                  }`}>
                    <div className="w-screen max-w-[850px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                      <div className="grid grid-cols-2 gap-8">
                        {dropdownContent.features.sections.map((section, idx) => (
                          <div key={idx} className="flex flex-col">
                            <h3 className="mb-4 text-sm font-cal text-gray-500 uppercase tracking-wider">{section.title}</h3>
                            <div className="space-y-1">
                              {section.items.map((item, itemIdx) => {
                                const Icon = item.icon
                                return (
                                  <Link 
                                    href="#" 
                                    key={itemIdx}
                                    className="group flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                                  >
                                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white group-hover:shadow-sm transition-all">
                                      <Icon className="h-4 w-4 text-gray-600" />
                                    </div>
                                    <div>
                                      <div className="font-cal text-[15px] text-gray-900">{item.name}</div>
                                      <div className="font-matter text-sm text-gray-500">{item.description}</div>
                                    </div>
                                  </Link>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
                <li 
                  className="relative -mx-2 flex flex-col justify-center [&:first-child]:ml-0 [&:nth-child(5)]:mr-0"
                  onMouseEnter={() => setActiveDropdown('solutions')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="group flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                    Solutions
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  <div className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-all duration-200 ${
                    activeDropdown === 'solutions' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'
                  }`}>
                    <div className="w-screen max-w-[850px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                      <div className="grid grid-cols-2 gap-8">
                        {dropdownContent.solutions.sections.map((section, idx) => (
                          <div key={idx} className="flex flex-col">
                            <h3 className="mb-4 text-sm font-cal text-gray-500 uppercase tracking-wider">{section.title}</h3>
                            <div className="space-y-1">
                              {section.items.map((item, itemIdx) => {
                                const Icon = item.icon
                                return (
                                  <Link 
                                    href="#" 
                                    key={itemIdx}
                                    className="group flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                                  >
                                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white group-hover:shadow-sm transition-all">
                                      <Icon className="h-4 w-4 text-gray-600" />
                                    </div>
                                    <div>
                                      <div className="font-cal text-[15px] text-gray-900">{item.name}</div>
                                      <div className="font-matter text-sm text-gray-500">{item.description}</div>
                                    </div>
                                  </Link>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
                <li 
                  className="relative -mx-2 flex flex-col justify-center [&:first-child]:ml-0 [&:nth-child(5)]:mr-0"
                  onMouseEnter={() => setActiveDropdown('integrations')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="group flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                    Integrations
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  <div className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-all duration-200 ${
                    activeDropdown === 'integrations' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'
                  }`}>
                    <div className="w-screen max-w-[850px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                      <div className="grid grid-cols-2 gap-8">
                        {dropdownContent.integrations.sections.map((section, idx) => (
                          <div key={idx} className="flex flex-col">
                            <h3 className="mb-4 text-sm font-cal text-gray-500 uppercase tracking-wider">{section.title}</h3>
                            <div className="space-y-1">
                              {section.items.map((item, itemIdx) => {
                                const Icon = item.icon
                                return (
                                  <Link 
                                    href="#" 
                                    key={itemIdx}
                                    className="group flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                                  >
                                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white group-hover:shadow-sm transition-all">
                                      <Icon className="h-4 w-4 text-gray-600" />
                                    </div>
                                    <div>
                                      <div className="font-cal text-[15px] text-gray-900">{item.name}</div>
                                      <div className="font-matter text-sm text-gray-500">{item.description}</div>
                                    </div>
                                  </Link>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
                <li className="relative -mx-2 flex flex-col justify-center [&:first-child]:ml-0 [&:nth-child(5)]:mr-0">
                  <Link href="/pricing" className="flex items-start px-7 py-5 mix-blend-difference header_blend-layer transition-opacity hover:opacity-80 font-semibold text-gray-700">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Right Side - Auth Buttons */}
          <div className="flex items-center justify-center">
            {!isAuthenticated ? (
              <>
                <Link 
                  href="/auth/signin" 
                  className="mr-4 hidden text-sm font-medium lg:flex opacity-100"
                >
                  Sign in
                </Link>
                <div>
                  <Link 
                    href="/auth/signup" 
                    className="px-3 py-2 text-sm font-medium border border-[transparent] dark:text-black bg-neutral-900 dark:bg-white hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-neutral-900 hover:opacity-90 transition-all duration-150 ease-in-out group relative hidden overflow-hidden whitespace-nowrap rounded-xl lg:flex items-center justify-center bg-gradient-to-b from-[#2c2c30] to-[#1d1d20] text-white before:shadow-[0px_2px_0.4px_0px_rgba(255,_255,_255,_0.16)_inset] before:pointer-events-none before:absolute before:inset-0 before:rounded-xl"
                  >
                    <span>Get started</span>
                  </Link>
                </div>
              </>
            ) : (
              <div>
                <Link 
                  href="/dashboard" 
                  className="px-3 py-2 text-sm font-medium border border-[transparent] dark:text-black bg-neutral-900 dark:bg-white hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-neutral-900 hover:opacity-90 transition-all duration-150 ease-in-out group relative hidden overflow-hidden whitespace-nowrap rounded-xl lg:flex items-center justify-center bg-gradient-to-b from-[#2c2c30] to-[#1d1d20] text-white before:shadow-[0px_2px_0.4px_0px_rgba(255,_255,_255,_0.16)_inset] before:pointer-events-none before:absolute before:inset-0 before:rounded-xl"
                >
                  <span>Dashboard</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="p-2 hover:cursor-pointer lg:hidden"
              aria-label="Open menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="relative h-4 w-4">
                <span className={`absolute left-0 top-0 h-[1.5px] w-4 transform transition-all duration-300 bg-black ${isMobileMenuOpen ? 'rotate-45 top-[7px]' : 'rotate-0'}`}></span>
                <span className={`absolute left-0 top-[7px] h-[1.5px] w-4 transition-all duration-300 bg-black ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute left-0 top-[14px] h-[1.5px] w-4 transform transition-all duration-300 bg-black ${isMobileMenuOpen ? '-rotate-45 top-[7px]' : 'rotate-0'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`bg-[rgba(244,244,244,255)] fixed inset-0 z-40 w-full lg:!hidden top-[72px] ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} style={{ opacity: isMobileMenuOpen ? 1 : 0, height: isMobileMenuOpen ? '100vh' : 0 }}>
        <ul className="font-cal text-standard border-primary-700 flex flex-col overflow-y-auto border-t-2 pb-[290px]">
          <Link href="/features" className="border-primary-700 align-center leading-standard flex border-b-2 border-dashed px-4 py-4 md:px-[34px]">
            Features
          </Link>
          <Link href="/solutions" className="border-primary-700 align-center leading-standard flex border-b-2 border-dashed px-4 py-4 md:px-[34px]">
            Solutions
          </Link>
          <Link href="/integrations" className="border-primary-700 align-center leading-standard flex border-b-2 border-dashed px-4 py-4 md:px-[34px]">
            Integrations
          </Link>
          <Link href="/pricing" className="border-primary-700 align-center leading-standard flex border-b-2 border-dashed px-4 py-4 md:px-[34px]">
            Pricing
          </Link>
        </ul>
        <div className="text-standard font-matter fixed bottom-0 mx-auto flex w-full flex-col items-center justify-center gap-4 bg-[transparent] px-4 py-6 md:pb-12">
          {!isAuthenticated ? (
            <>
              <p>
                Existing customer?{" "}
                <Link href="/auth/signin" className="font-bold">
                  Login
                </Link>
              </p>
              <Link
                href="/auth/signup"
                className="px-3 py-2 font-medium relative border border-[transparent] dark:text-black bg-neutral-900 dark:bg-white hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-neutral-900 hover:opacity-90 transition-all duration-150 ease-in-out flex !h-20 w-full max-w-lg items-center justify-center overflow-hidden rounded-xl text-center text-xl bg-gradient-to-b from-[#2c2c30] to-[#1d1d20] text-white before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:shadow-[0px_2px_0.4px_0px_rgba(255,_255,_255,_0.16)_inset]"
              >
                Get started
              </Link>
            </>
          ) : (
            <Link
              href="/dashboard"
              className="px-3 py-2 font-medium relative border border-[transparent] dark:text-black bg-neutral-900 dark:bg-white hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-neutral-900 hover:opacity-90 transition-all duration-150 ease-in-out flex !h-20 w-full max-w-lg items-center justify-center overflow-hidden rounded-xl text-center text-xl bg-gradient-to-b from-[#2c2c30] to-[#1d1d20] text-white before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:shadow-[0px_2px_0.4px_0px_rgba(255,_255,_255,_0.16)_inset]"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </div>
  )
} 