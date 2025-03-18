import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { ResponsiveGrid } from "@/components/ui/layout/ResponsiveGrid";
import { SpreadsheetActions } from "@/components/dashboard/SpreadsheetActions";
import TemplatesSection from "@/components/dashboard/TemplatesSection";
import { RecentSection } from "@/components/dashboard/RecentSection";
import { Sheet, SheetTag } from "@/types/database.types";
import { addDays, parseISO, subDays, startOfDay } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface SearchParams {
  q?: string;
  filter_date?: string;
  filter_type?: string;
  filter_tags?: string;
}

export default async function DashboardPage({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const supabase = createServerComponentClient({ cookies });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth");
  }

  const user = session.user;
  const userAvatarUrl = user?.user_metadata?.avatar_url || null;
  const userInitials = user?.email 
    ? user.email.substring(0, 2).toUpperCase() 
    : "US";

  // Get search query and filters from URL params
  const searchQuery = searchParams.q?.trim() || '';
  const dateFilter = searchParams.filter_date || '';
  const typeFilter = searchParams.filter_type || '';
  const tagFilter = searchParams.filter_tags || '';
  
  // Start query
  let sheetsQuery = supabase
    .from("sheets")
    .select("*");
    
  // Apply search filter if provided
  if (searchQuery) {
    sheetsQuery = sheetsQuery.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
  }
  
  // Apply date filter if provided
  if (dateFilter) {
    const today = new Date();
    let dateStart;
    
    if (dateFilter === 'today') {
      dateStart = startOfDay(today);
    } else if (dateFilter === 'yesterday') {
      dateStart = startOfDay(subDays(today, 1));
      const dateEnd = startOfDay(today);
      sheetsQuery = sheetsQuery.gte('updated_at', dateStart.toISOString()).lt('updated_at', dateEnd.toISOString());
    } else if (dateFilter === 'last7days') {
      dateStart = startOfDay(subDays(today, 7));
      sheetsQuery = sheetsQuery.gte('updated_at', dateStart.toISOString());
    } else if (dateFilter === 'last30days') {
      dateStart = startOfDay(subDays(today, 30));
      sheetsQuery = sheetsQuery.gte('updated_at', dateStart.toISOString());
    }
  }
  
  // Apply type filter if provided
  if (typeFilter && typeFilter !== 'all') {
    // In a real app, this would filter by sheet template type
    // For demo purposes, we'll filter based on title containing the type
    sheetsQuery = sheetsQuery.ilike('title', `%${typeFilter}%`);
  }
  
  // Apply tag filter if provided
  if (tagFilter) {
    const tagIds = tagFilter.split(',');
    // In a real app with proper JSON array support:
    // sheetsQuery = sheetsQuery.contains('tags', tagIds);
    
    // For demo purposes with limited filtering, let's simulate
    // by filtering sheets that have any matching tag
    // This is just a placeholder - real implementation would depend on how tags are stored
  }
  
  // Order by updated_at
  sheetsQuery = sheetsQuery.order("updated_at", { ascending: false });

  // Execute the query
  const { data: allSpreadsheets, error } = await sheetsQuery;

  if (error) {
    console.error("Error fetching spreadsheets:", error);
    // In production, handle this error better
  }

  // Separate starred and recent spreadsheets
  const starredSpreadsheets = allSpreadsheets?.filter(sheet => sheet.is_starred) || [];
  const recentSpreadsheets = allSpreadsheets?.filter(sheet => !sheet.is_starred) || [];
  
  // For demonstration, add some tags to sheets
  const sheetsWithTags = addDemoTags(allSpreadsheets || []);
  const demoTags: SheetTag[] = [
    { id: 'work', name: 'Work' },
    { id: 'personal', name: 'Personal' },
    { id: 'finance', name: 'Finance' },
    { id: 'project', name: 'Project' },
    { id: 'important', name: 'Important' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Meraki Sheets</h1>
            <nav className="flex ml-4">
              <Link href="/dashboard" className="px-3 py-1 text-sm font-medium border-b-2 border-blue-500">Recent</Link>
              <Link href="/templates" className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900">Templates</Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search Form */}
            <form action="/dashboard" method="get" className="relative max-w-md w-[350px]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type="search"
                name="q"
                defaultValue={searchQuery}
                placeholder="Search spreadsheets... (Ctrl + /)"
                className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {/* Preserve other filters in hidden inputs */}
              {dateFilter && <input type="hidden" name="filter_date" value={dateFilter} />}
              {typeFilter && <input type="hidden" name="filter_type" value={typeFilter} />}
              {tagFilter && <input type="hidden" name="filter_tags" value={tagFilter} />}
            </form>
            
            {/* Filters Dropdown */}
            <div className="relative group">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
              
              {/* Filter Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-10 hidden group-hover:block">
                <div className="p-3">
                  <h3 className="text-sm font-medium mb-2">Date Modified</h3>
                  <div className="space-y-1">
                    <Link href={`/dashboard?${searchQuery ? `q=${searchQuery}&` : ''}filter_date=today${typeFilter ? `&filter_type=${typeFilter}` : ''}${tagFilter ? `&filter_tags=${tagFilter}` : ''}`} 
                      className={`block px-2 py-1 text-sm rounded hover:bg-gray-100 ${dateFilter === 'today' ? 'bg-blue-50 text-blue-600' : ''}`}>
                      Today
                    </Link>
                    <Link href={`/dashboard?${searchQuery ? `q=${searchQuery}&` : ''}filter_date=yesterday${typeFilter ? `&filter_type=${typeFilter}` : ''}${tagFilter ? `&filter_tags=${tagFilter}` : ''}`} 
                      className={`block px-2 py-1 text-sm rounded hover:bg-gray-100 ${dateFilter === 'yesterday' ? 'bg-blue-50 text-blue-600' : ''}`}>
                      Yesterday
                    </Link>
                    <Link href={`/dashboard?${searchQuery ? `q=${searchQuery}&` : ''}filter_date=last7days${typeFilter ? `&filter_type=${typeFilter}` : ''}${tagFilter ? `&filter_tags=${tagFilter}` : ''}`} 
                      className={`block px-2 py-1 text-sm rounded hover:bg-gray-100 ${dateFilter === 'last7days' ? 'bg-blue-50 text-blue-600' : ''}`}>
                      Last 7 days
                    </Link>
                    <Link href={`/dashboard?${searchQuery ? `q=${searchQuery}&` : ''}filter_date=last30days${typeFilter ? `&filter_type=${typeFilter}` : ''}${tagFilter ? `&filter_tags=${tagFilter}` : ''}`} 
                      className={`block px-2 py-1 text-sm rounded hover:bg-gray-100 ${dateFilter === 'last30days' ? 'bg-blue-50 text-blue-600' : ''}`}>
                      Last 30 days
                    </Link>
                  </div>
                </div>
                <div className="border-t p-3">
                  <h3 className="text-sm font-medium mb-2">Tags</h3>
                  <div className="space-y-1">
                    {demoTags.map(tag => (
                      <Link
                        key={tag.id}
                        href={`/dashboard?${searchQuery ? `q=${searchQuery}&` : ''}${dateFilter ? `filter_date=${dateFilter}&` : ''}filter_tags=${tag.id}`}
                        className={`block px-2 py-1 text-sm rounded hover:bg-gray-100 ${tagFilter === tag.id ? 'bg-blue-50 text-blue-600' : ''}`}
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
                {(dateFilter || tagFilter) && (
                  <div className="border-t p-3">
                    <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">
                      Clear all filters
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            {/* User Avatar */}
            <Avatar className="h-8 w-8">
              {userAvatarUrl ? (
                <AvatarImage src={userAvatarUrl} alt="User" />
              ) : null}
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-8">
          {/* Templates Section */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Start a new spreadsheet
              </h2>
              <Link href="/templates" className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                Template gallery →
              </Link>
            </div>
            <TemplatesSection />
          </section>

          {/* Starred Section */}
          {starredSpreadsheets.length > 0 && (
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Starred
                </h2>
              </div>
              <ResponsiveGrid>
                {sheetsWithTags
                  .filter(sheet => sheet.is_starred)
                  .map((sheet) => (
                    <SpreadsheetActions 
                      key={sheet.id} 
                      sheet={sheet} 
                      availableTags={demoTags}
                    />
                  ))
                }
              </ResponsiveGrid>
            </section>
          )}
          
          {/* Recent Section with view selector */}
          <RecentSection 
            sheets={sheetsWithTags.filter(sheet => !sheet.is_starred)} 
          />
          
          {/* No results message */}
          {allSpreadsheets?.length === 0 && searchQuery && (
            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No spreadsheets found</h3>
              <p className="text-gray-500">
                No spreadsheets match your search for "{searchQuery}". Try a different search term or clear filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to add demo tags to sheets for demonstration
function addDemoTags(sheets: Sheet[]): Sheet[] {
  const demoTagOptions = [
    ['work', 'important'],
    ['personal', 'finance'],
    ['project', 'work'],
    ['finance'],
    ['personal'],
    ['important', 'finance', 'personal'],
  ];
  
  return sheets.map((sheet, index) => {
    // Assign tags based on sheet index
    const tagIndex = index % demoTagOptions.length;
    return {
      ...sheet,
      tags: demoTagOptions[tagIndex]
    };
  });
} 