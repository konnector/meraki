import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SpreadsheetGrid from "@/components/dashboard/SpreadsheetGrid";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TemplatesSection from "@/components/dashboard/TemplatesSection";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth");
  }

  // Fetch all spreadsheets
  const { data: allSpreadsheets } = await supabase
    .from("sheets")
    .select("*")
    .order("updated_at", { ascending: false });

  // Separate starred and recent spreadsheets
  const starredSpreadsheets = allSpreadsheets?.filter(sheet => sheet.is_starred) || [];
  const recentSpreadsheets = allSpreadsheets?.filter(sheet => !sheet.is_starred) || [];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-6">
        <TemplatesSection />
        
        {/* Starred section */}
        {starredSpreadsheets.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Starred</h2>
            </div>
            <div className="mb-8">
              <SpreadsheetGrid spreadsheets={starredSpreadsheets} />
            </div>
          </>
        )}

        {/* Recent section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Recent spreadsheets</h2>
          <div className="flex items-center gap-2">
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              List view
            </button>
          </div>
        </div>
        <SpreadsheetGrid spreadsheets={recentSpreadsheets} />
      </main>
    </div>
  );
} 