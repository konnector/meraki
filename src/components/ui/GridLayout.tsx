"use client"

import { usePathname } from "next/navigation"

export function GridLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLandingPage = pathname === "/"

  return (
    <div className="relative min-h-screen">
      {/* Vertical Grid Lines - Only show on landing page */}
      {isLandingPage && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="h-full w-full max-w-[1200px] mx-auto relative">
            <div className="absolute left-1 top-0 bottom-0 w-px bg-neutral-300"></div>
            <div className="absolute right-1 top-0 bottom-0 w-px bg-neutral-300"></div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {children}
    </div>
  )
} 