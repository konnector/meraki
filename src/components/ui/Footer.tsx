"use client"

import Link from "next/link"
import Image from "next/image"
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa"

export function Footer() {
  return (
    <footer className="bg-[rgba(244,244,244,255)] border-t border-gray-400/40">
      <div className="mx-auto relative max-w-[1175px] gap-8 overflow-clip rounded-xl px-1 md:py-10 !bg-transparent text-black mt-4 flex h-full w-full flex-col py-6 md:px-0">
        <div className="flex w-full flex-col gap-6 md:flex-row md:justify-between">
          {/* Left Column */}
          <div className="mb-12 flex flex-col text-sm md:pl-2 lg:mb-0">
            <div className="flex pb-2 lg:pb-5">
              <div className="flex">
                <Link href="/">
                  <span className="font-cal text-2xl font-semibold text-[#111111]">Meraki.ai</span>
                </Link>
                <span className="font-cal -mt-1.5 ml-[1px]">®</span>
              </div>
            </div>
            <p className="max-w-[250px] lg:block">
              Meraki Sheets® is a registered trademark. All rights reserved.
            </p>
            <div className="mt-6 flex gap-4">
              <Link href="https://twitter.com/merakisheets" className="[&>svg]:transition-fill hover:opacity-70 [&>svg]:duration-150" target="_blank" rel="noopener">
                <FaTwitter className="h-5 w-5 text-gray-600" />
              </Link>
              <Link href="https://github.com/merakisheets" className="[&>svg]:transition-fill hover:opacity-70 [&>svg]:duration-150" target="_blank" rel="noopener">
                <FaGithub className="h-5 w-5 text-gray-600" />
              </Link>
              <Link href="https://linkedin.com/company/merakisheets" className="[&>svg]:transition-fill hover:opacity-70 [&>svg]:duration-150" target="_blank" rel="noopener">
                <FaLinkedin className="h-5 w-5 text-gray-600" />
              </Link>
            </div>
            <p className="mt-4 max-w-[350px] pr-4 text-base transition-opacity ease-in-out">
              Our mission is to transform how businesses work with spreadsheets through AI-powered automation.
            </p>
            <p className="mt-4 lg:block">
              Need Help? <Link href="mailto:support@merakisheets.com" className="text-[#0561A2] underline">support@merakisheets.com</Link>
            </p>
          </div>

          {/* Right Column - Navigation */}
          <div className="w-full md:flex md:w-auto md:justify-end">
            <nav className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-3">
              {/* Product Links */}
              <ul>
                <li className="text-[17px] font-semibold">Product</li>
                <li className="pt-4 text-[17px]">
                  <Link href="/features" className="flex items-start text-[16px] hover:opacity-50">Features</Link>
                </li>
                <li className="pt-4 text-[17px]">
                  <Link href="/integrations" className="flex items-start text-[16px] hover:opacity-50">Integrations</Link>
                </li>
                <li className="pt-4 text-[17px]">
                  <Link href="/pricing" className="flex items-start text-[16px] hover:opacity-50">Pricing</Link>
                </li>
                <li className="pt-4 text-[17px]">
                  <Link href="/changelog" className="flex items-start text-[16px] hover:opacity-50">Changelog</Link>
                </li>
                <li className="pt-4 text-[17px]">
                  <Link href="/docs" className="flex items-start text-[16px] hover:opacity-50">Documentation</Link>
                </li>
              </ul>

              {/* Resources Links */}
              <ul>
                <li className="text-[17px] font-semibold">Resources</li>
                <li className="pt-4 text-[17px]">
                  <Link href="/blog" className="flex items-start text-[16px] hover:opacity-50">Blog</Link>
                </li>
                <li className="pt-4 text-[17px]">
                  <Link href="/tutorials" className="flex items-start text-[16px] hover:opacity-50">Tutorials</Link>
                </li>
                <li className="pt-4 text-[17px]">
                  <Link href="/templates" className="flex items-start text-[16px] hover:opacity-50">Templates</Link>
                </li>
                <li className="pt-4 text-[17px]">
                  <Link href="/community" className="flex items-start text-[16px] hover:opacity-50">Community</Link>
                </li>
                <li className="pt-4 text-[17px]">
                  <Link href="/support" className="flex items-start text-[16px] hover:opacity-50">Support</Link>
                </li>
              </ul>

              {/* Company Links */}
              <ul>
                <li className="text-[17px] font-semibold">Company</li>
                <li className="pt-4 text-[17px]">
                  <Link href="/about" className="flex items-start text-[16px] hover:opacity-50">About</Link>
                </li>
                <li className="pt-4 text-[17px]">
                  <Link href="/careers" className="flex items-start text-[16px] hover:opacity-50">Careers</Link>
                </li>
                <li className="pt-4 text-[17px]">
                  <Link href="/legal/privacy" className="flex items-start text-[16px] hover:opacity-50">Privacy</Link>
                </li>
                <li className="pt-4 text-[17px]">
                  <Link href="/legal/terms" className="flex items-start text-[16px] hover:opacity-50">Terms</Link>
                </li>
                <li className="pt-4 text-[17px]">
                  <Link href="/contact" className="flex items-start text-[16px] hover:opacity-50">Contact</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
} 