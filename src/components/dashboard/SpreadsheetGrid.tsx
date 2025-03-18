"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { MoreHorizontal, FileSpreadsheet, Star, ChevronLeft, ChevronRight, Grid, List } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Spreadsheet {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  description?: string;
  is_public: boolean;
  is_starred: boolean;
}

interface SpreadsheetGridProps {
  spreadsheets: Spreadsheet[];
}

export default function SpreadsheetGrid({ spreadsheets }: SpreadsheetGridProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isRenaming, setIsRenaming] = useState(false);
  const [spreadsheetTitle, setSpreadsheetTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Simple preview data - this would be replaced with actual data in a real implementation
  const previewData = [
    ["Name", "Email", "Phone"],
    ["John Doe", "john@example.com", "123-456-7890"],
    ["Jane Smith", "jane@example.com", "098-765-4321"],
  ];

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 300;
    const currentScroll = scrollContainerRef.current.scrollLeft;
    
    scrollContainerRef.current.scrollTo({
      left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      behavior: "smooth",
    });
  };

  const handleRename = async (spreadsheet: Spreadsheet) => {
    setIsRenaming(true);
    setSpreadsheetTitle(spreadsheet.title || "Untitled spreadsheet");
    setEditingId(spreadsheet.id);
  };

  const handleSaveRename = async () => {
    if (!editingId || !spreadsheetTitle.trim()) return;
    
    try {
      const { error } = await supabase
        .from("sheets")
        .update({ title: spreadsheetTitle })
        .eq("id", editingId);
        
      if (error) throw error;
      toast.success("Spreadsheet renamed");
      router.refresh();
    } catch (error) {
      console.error("Error renaming spreadsheet:", error);
      toast.error("Failed to rename spreadsheet");
    } finally {
      setIsRenaming(false);
      setEditingId(null);
    }
  };

  const handleMakeCopy = async (spreadsheet: Spreadsheet) => {
    try {
      const { data, error } = await supabase
        .from("sheets")
        .insert({
          title: `${spreadsheet.title || "Untitled spreadsheet"} (Copy)`,
          description: spreadsheet.description,
          is_public: spreadsheet.is_public,
          is_starred: false,
          // Note: You would also need to copy the actual spreadsheet data in a real implementation
        })
        .select();
        
      if (error) throw error;
      toast.success("Spreadsheet copied");
      router.refresh();
    } catch (error) {
      console.error("Error copying spreadsheet:", error);
      toast.error("Failed to copy spreadsheet");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this spreadsheet? This action cannot be undone.")) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from("sheets")
        .delete()
        .eq("id", id);
        
      if (error) throw error;
      toast.success("Spreadsheet deleted");
      router.refresh();
    } catch (error) {
      console.error("Error deleting spreadsheet:", error);
      toast.error("Failed to delete spreadsheet");
    }
  };

  if (isRenaming && editingId) {
    return (
      <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
        <div className="bg-card p-6 rounded-lg shadow-lg w-full max-w-md">
          <h3 className="text-lg font-medium mb-4">Rename spreadsheet</h3>
          <input
            type="text"
            value={spreadsheetTitle}
            onChange={(e) => setSpreadsheetTitle(e.target.value)}
            className="w-full p-2 border border-border rounded mb-4"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsRenaming(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveRename}>Save</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <div className="bg-muted rounded-md p-1 flex items-center">
          <button
            className={`p-1 rounded-md ${viewMode === "grid" ? "bg-background shadow-sm" : "text-muted-foreground"}`}
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            className={`p-1 rounded-md ${viewMode === "list" ? "bg-background shadow-sm" : "text-muted-foreground"}`}
            onClick={() => setViewMode("list")}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="relative">
          {spreadsheets.length > 4 && (
            <>
              <button 
                onClick={() => handleScroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-background shadow-md rounded-full p-1"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={() => handleScroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-background shadow-md rounded-full p-1"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
          
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-4 scrollbar-hide snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {spreadsheets.map((spreadsheet) => (
              <div
                key={spreadsheet.id}
                className="group relative bg-card hover:bg-accent rounded-lg p-4 transition-colors flex-shrink-0 w-64 mx-2 snap-start"
              >
                <Link href={`/sheets/${spreadsheet.id}`}>
                  <div className="aspect-[4/3] mb-3 rounded border border-border bg-background/50 relative overflow-hidden">
                    {/* Spreadsheet preview */}
                    <div className="absolute inset-0 p-2">
                      <div className="overflow-hidden text-[7px] h-full">
                        <table className="w-full border-collapse">
                          <tbody>
                            {previewData.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                  <td 
                                    key={cellIndex}
                                    className={`border border-border/30 p-1 truncate ${
                                      rowIndex === 0 ? "bg-muted/50 font-medium" : ""
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    {spreadsheet.is_starred && (
                      <div className="absolute top-2 left-2 z-10">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-sm text-foreground truncate">
                      {spreadsheet.title || "Untitled spreadsheet"}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Opened {formatDistanceToNow(new Date(spreadsheet.updated_at))} ago
                    </p>
                  </div>
                </Link>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleRename(spreadsheet)}>
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleMakeCopy(spreadsheet)}>
                        Make a copy
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleDelete(spreadsheet.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground p-3">Name</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-3 hidden md:table-cell">Last modified</th>
                <th className="text-right text-xs font-medium text-muted-foreground p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {spreadsheets.map((spreadsheet) => (
                <tr key={spreadsheet.id} className="group border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-3">
                    <Link href={`/sheets/${spreadsheet.id}`} className="flex items-center gap-2">
                      <div className="relative">
                        <FileSpreadsheet className="h-5 w-5 text-primary/60" />
                        {spreadsheet.is_starred && (
                          <Star className="absolute -top-1 -right-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                        )}
                      </div>
                      <span className="font-medium text-sm text-foreground">
                        {spreadsheet.title || "Untitled spreadsheet"}
                      </span>
                    </Link>
                  </td>
                  <td className="p-3 text-xs text-muted-foreground hidden md:table-cell">
                    {formatDistanceToNow(new Date(spreadsheet.updated_at))} ago
                  </td>
                  <td className="p-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleRename(spreadsheet)}>
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleMakeCopy(spreadsheet)}>
                          Make a copy
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleDelete(spreadsheet.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 