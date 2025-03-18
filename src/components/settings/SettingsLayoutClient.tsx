'use client';

import { MerakiSidebar, SidebarProvider, useSidebar } from "@/components/dashboard/MerakiSidebar";
import { usePathname } from 'next/navigation';
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { motion } from "framer-motion";

function SettingsContent({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useSidebar();

  return (
    <div className="flex h-screen">
      <MerakiSidebar />
      <motion.div 
        className="flex-1 flex flex-col overflow-hidden"
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
        <DashboardHeader />
        <div className="flex-1 overflow-auto">
          <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-4 py-8">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-semibold text-black">Settings</h1>
                <div className="flex gap-3">
                  <button className="btn bg-white text-gray-700 hover:bg-gray-100 border-gray-200">Cancel</button>
                  <button className="btn bg-black text-white hover:bg-black/90">Save changes</button>
                </div>
              </div>

              {/* Main content area - full width */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                {children}
              </div>
            </main>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SettingsLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <SettingsContent>
        {children}
      </SettingsContent>
    </SidebarProvider>
  );
} 