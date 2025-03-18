"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { 
  Home, 
  Settings,
  ChevronDown,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, createContext, useContext } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Animation variants
const sidebarVariants = {
  open: {
    width: "15rem",
  },
  closed: {
    width: "3.5rem",
  },
};

const contentVariants = {
  open: { display: "block", opacity: 1 },
  closed: { display: "block", opacity: 1 },
};

const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: -20,
    opacity: 0,
    transition: {
      x: { stiffness: 100 },
    },
  },
};

const transitionProps = {
  type: "tween",
  ease: "easeOut",
  duration: 0.2,
};

const staggerVariants = {
  open: {
    transition: { staggerChildren: 0.03, delayChildren: 0.02 },
  },
};

// Create a context to share sidebar state
export const SidebarContext = createContext({
  isExpanded: false,
  setIsExpanded: (value: boolean) => {},
});

export const useSidebar = () => useContext(SidebarContext);

interface SidebarSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  isCollapsed: boolean;
}

function SidebarSection({ title, children, className, isCollapsed }: SidebarSectionProps) {
  return (
    <div className={cn("mb-4", className)}>
      {title && !isCollapsed && (
        <h3 className="px-3 mb-1 text-xs font-medium text-gray-500">{title}</h3>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
  isCollapsed: boolean;
}

function SidebarItem({ icon, label, href, isActive, isCollapsed }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-3 py-2 text-sm rounded-md group hover:bg-gray-100",
        isActive && "bg-gray-100 font-medium"
      )}
    >
      <span className="mr-3 text-gray-500">{icon}</span>
      <motion.span 
        variants={variants}
        className="flex-1"
      >
        {!isCollapsed && label}
      </motion.span>
    </Link>
  );
}

export function MerakiSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { isExpanded, setIsExpanded } = useSidebar();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  return (
    <motion.div
      className="fixed left-0 z-40 h-full shrink-0 border-r bg-white"
      initial={!isExpanded ? "closed" : "open"}
      animate={!isExpanded ? "closed" : "open"}
      variants={sidebarVariants}
      transition={transitionProps}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <motion.div
        className="relative z-40 flex text-muted-foreground h-full shrink-0 flex-col bg-white transition-all"
        variants={contentVariants}
      >
        <motion.div variants={staggerVariants} className="flex h-full flex-col">
          {/* Organization/Brand */}
          <div className="p-3 flex items-center border-b h-[54px]">
            <div className="flex items-center justify-center h-6 w-6 rounded bg-black text-white mr-2 text-xs">
              M
            </div>
            <motion.span variants={variants} className="font-medium">
              {isExpanded && (
                <>
                  Meraki Sheets
                  <ChevronDown className="ml-2 h-4 w-4 text-gray-500 inline-block" />
                </>
              )}
            </motion.span>
          </div>

          {/* Main navigation */}
          <ScrollArea className="flex-1 pt-2">
            <SidebarSection isCollapsed={!isExpanded}>
              <SidebarItem
                icon={<Home className="h-4 w-4" />}
                label="Dashboard"
                href="/dashboard"
                isActive={pathname === "/dashboard"}
                isCollapsed={!isExpanded}
              />
              <SidebarItem
                icon={<Settings className="h-4 w-4" />}
                label="Settings"
                href="/settings"
                isActive={pathname.startsWith("/settings")}
                isCollapsed={!isExpanded}
              />
            </SidebarSection>
          </ScrollArea>

          {/* Logout button */}
          <div className="border-t mt-auto">
            <div className="p-3">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-100"
              >
                <span className="mr-3 text-gray-500">
                  <LogOut className="h-4 w-4" />
                </span>
                <motion.span variants={variants} className="flex-1">
                  {!isExpanded ? "" : "Logout"}
                </motion.span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Export a provider component for the sidebar context
export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <SidebarContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
} 