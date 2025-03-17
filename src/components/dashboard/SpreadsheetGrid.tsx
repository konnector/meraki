"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreHorizontal, FileSpreadsheet, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {spreadsheets.map((spreadsheet) => (
        <div
          key={spreadsheet.id}
          className="group relative bg-card hover:bg-accent rounded-lg p-4 transition-colors"
        >
          <Link href={`/sheets/${spreadsheet.id}`}>
            <div className="aspect-[4/3] mb-3 rounded border border-border flex items-center justify-center bg-background/50 relative">
              <FileSpreadsheet className="h-12 w-12 text-primary/60" />
              {spreadsheet.is_starred && (
                <div className="absolute top-2 left-2">
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
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Rename</DropdownMenuItem>
                <DropdownMenuItem>Make a copy</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
} 