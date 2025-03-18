'use client';

import { useState } from 'react';
import { Sheet, SheetTag } from '@/types/database.types';
import { SpreadsheetActions } from './SpreadsheetActions';
import { SpreadsheetCard } from '@/components/ui/cards/SpreadsheetCard';
import { ScrollableGrid } from '@/components/ui/layout/ScrollableGrid';
import { SelectableGrid } from '@/components/ui/layout/SelectableGrid';
import { ViewSelector, type ViewMode } from './ViewSelector';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { format } from 'date-fns';
import { FileSpreadsheet, Star } from 'lucide-react';

interface SelectableRecentSectionProps {
  sheets: Sheet[];
  availableTags?: SheetTag[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  className?: string;
}

export function SelectableRecentSection({ 
  sheets, 
  availableTags = [], 
  selectedIds,
  onSelectionChange,
  className 
}: SelectableRecentSectionProps) {
  // Use local storage to remember the user's preferred view
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>('recentSheetsView', 'sliding');

  // For demonstration, create demo tags if none provided
  const tags = availableTags.length > 0 ? availableTags : [
    { id: 'work', name: 'Work' },
    { id: 'personal', name: 'Personal' },
    { id: 'finance', name: 'Finance' },
    { id: 'project', name: 'Project' },
    { id: 'important', name: 'Important' },
  ];

  return (
    <section className="bg-white rounded-xl p-6 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Recent spreadsheets
        </h2>
        <ViewSelector activeView={viewMode} onChange={setViewMode} />
      </div>

      {sheets.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          <p>No recent spreadsheets found.</p>
        </div>
      ) : (
        <>
          {/* Use SelectableGrid for Grid View */}
          {viewMode === 'grid' && (
            <SelectableGrid
              items={sheets}
              selectedIds={selectedIds}
              onSelectionChange={onSelectionChange}
              renderItem={(sheet, isSelected, toggleSelect) => (
                <SpreadsheetCard
                  sheet={sheet}
                  availableTags={tags}
                  onStar={() => {}} // These will be handled by bulk actions
                  onShare={() => {}}
                  onDuplicate={() => {}}
                  onDelete={() => {}}
                />
              )}
            />
          )}

          {/* Sliding View - Not selectable */}
          {viewMode === 'sliding' && (
            <ScrollableGrid>
              {sheets.map((sheet) => (
                <div key={sheet.id} className="min-w-[300px] w-[300px] snap-start">
                  <SpreadsheetActions sheet={sheet} availableTags={tags} />
                </div>
              ))}
            </ScrollableGrid>
          )}

          {/* List View with selection */}
          {viewMode === 'list' && (
            <div className="space-y-2">
              {sheets.map((sheet) => {
                const isSelected = selectedIds.includes(sheet.id);
                
                return (
                  <div 
                    key={sheet.id} 
                    className={`flex items-center justify-between p-3 rounded-lg border border-gray-200 
                      hover:bg-gray-50 transition-colors cursor-pointer
                      ${isSelected ? 'bg-primary/5 border-primary/30' : ''}`}
                    onClick={() => {
                      const newSelectedIds = isSelected
                        ? selectedIds.filter(id => id !== sheet.id)
                        : [...selectedIds, sheet.id];
                      onSelectionChange(newSelectedIds);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                        <FileSpreadsheet className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{sheet.title}</h3>
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
                      {sheet.is_starred && <Star className="h-4 w-4 text-amber-500 fill-amber-500" />}
                      {isSelected && (
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </section>
  );
} 