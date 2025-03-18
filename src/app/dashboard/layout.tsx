"use client";

import { MerakiSidebar, SidebarProvider, useSidebar } from "@/components/dashboard/MerakiSidebar";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardContent({ children }: { children: ReactNode }) {
  const { isExpanded } = useSidebar();
  
  return (
    <div className="flex h-screen">
      <MerakiSidebar />
      <motion.div 
        className="flex-1 overflow-auto"
        initial={false}
        animate={{ 
          marginLeft: isExpanded ? "15rem" : "3.5rem" 
        }}
        transition={{ 
          duration: 0.2,
          ease: "easeOut",
          type: "tween"
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <DashboardContent>
        {children}
      </DashboardContent>
    </SidebarProvider>
  );
} 