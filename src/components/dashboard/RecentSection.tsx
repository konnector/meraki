'use client';

import { useState } from 'react';
import { Sheet, SheetTag } from '@/types/database.types';
import { SpreadsheetActions } from './SpreadsheetActions';
import { ScrollableGrid } from '@/components/ui/layout/ScrollableGrid';
import { ResponsiveGrid } from '@/components/ui/layout/ResponsiveGrid';
import { ViewSelector, type ViewMode } from './ViewSelector';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { format } from 'date-fns';
import { FileSpreadsheet, Star } from 'lucide-react';

interface RecentSectionProps {
  sheets: Sheet[];
  availableTags?: SheetTag[];
}

export function RecentSection({ sheets, availableTags = [] }: RecentSectionProps) {
  // Use local storage to remember the user's preferred view
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>('spreadsheets-view-mode', 'sliding');

  // For demonstration, create demo tags if none provided
  const tags = availableTags.length > 0 ? availableTags : [
    { id: 'work', name: 'Work' },
    { id: 'personal', name: 'Personal' },
    { id: 'finance', name: 'Finance' },
    { id: 'project', name: 'Project' },
    { id: 'important', name: 'Important' },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Recent Spreadsheets</h2>
        <ViewSelector activeView={viewMode} onChange={setViewMode} />
      </div>

      {sheets.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No recent spreadsheets found.</p>
          <p className="text-sm mt-1">Create a new spreadsheet to get started.</p>
        </div>
      ) : (
        <>
          {/* Grid View */}
          {viewMode === 'grid' && (
            <ResponsiveGrid>
              {sheets.map((sheet) => (
                <SpreadsheetActions key={sheet.id} sheet={sheet} availableTags={tags} />
              ))}
            </ResponsiveGrid>
          )}

          {/* Sliding View */}
          {viewMode === 'sliding' && (
            <ScrollableGrid>
              {sheets.map((sheet) => (
                <div key={sheet.id} className="min-w-[300px] w-[300px] snap-start">
                  <SpreadsheetActions sheet={sheet} availableTags={tags} />
                </div>
              ))}
            </ScrollableGrid>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="space-y-2">
              {sheets.map((sheet) => (
                <div 
                  key={sheet.id} 
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <FileSpreadsheet className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{sheet.title}</h3>
                      <p className="text-sm text-gray-500">
                        Last modified {format(new Date(sheet.updated_at), 'MMM d, yyyy')}
                      </p>
                      
                      {/* Show tags in list view */}
                      {sheet.tags && sheet.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {sheet.tags.slice(0, 2).map(tagId => {
                            const tag = tags.find(t => t.id === tagId);
                            return (
                              <span 
                                key={tagId}
                                className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs"
                              >
                                {tag?.name || tagId}
                              </span>
                            );
                          })}
                          {sheet.tags.length > 2 && (
                            <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">
                              +{sheet.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {sheet.is_starred && <Star className="h-4 w-4 text-black fill-black" />}
                    <button 
                      onClick={() => window.location.href = `/sheets/${sheet.id}`}
                      className="text-sm px-3 py-1 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Open
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
} 