'use client';

import { useCallback, useEffect, useState } from 'react';
import { updateSheet } from '@/lib/sheets';
import type { Sheet } from '@/types/database.types';
import debounce from 'lodash/debounce';

export interface SheetEditorProps {
  sheet: Sheet;
  isEditable?: boolean;
}

export default function SheetEditor({ sheet: initialSheet, isEditable = true }: SheetEditorProps) {
  const [sheet, setSheet] = useState(initialSheet);
  const [title, setTitle] = useState(initialSheet.title || 'Untitled Sheet');
  const [content, setContent] = useState(initialSheet.content || '');
  const [isSaving, setIsSaving] = useState(false);

  // Debounced save function
  const saveChanges = debounce(async (updates: Partial<Sheet>) => {
    if (!isEditable) return;
    
    setIsSaving(true);
    try {
      const updatedSheet = await updateSheet(sheet.id, updates);
      setSheet(updatedSheet);
    } catch (error) {
      console.error('Failed to save changes:', error);
    } finally {
      setIsSaving(false);
    }
  }, 1000);

  // Auto-save when title changes
  useEffect(() => {
    if (title !== sheet.title) {
      saveChanges({ title });
    }
  }, [title, sheet.title]);

  // Auto-save when content changes
  useEffect(() => {
    if (content !== sheet.content) {
      saveChanges({ content });
    }
  }, [content, sheet.content]);

  // Update last_accessed periodically
  useEffect(() => {
    const interval = setInterval(() => {
      saveChanges({ updated_at: new Date().toISOString() });
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [sheet.id]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl font-bold border-none focus:outline-none bg-transparent"
          placeholder="Untitled Sheet"
          disabled={!isEditable}
        />
      </div>
      
      <div className="border rounded-lg bg-white shadow-sm">
        {/* Spreadsheet grid component can be added here */}
        <textarea
          className="min-h-[500px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={!isEditable}
          placeholder="Start typing..."
        />
      </div>
    </div>
  );
}