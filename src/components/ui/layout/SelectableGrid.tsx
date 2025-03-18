'use client';

import { useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Sheet } from '@/types/database.types';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface SelectableGridProps {
  items: Sheet[];
  renderItem: (item: Sheet, isSelected: boolean, toggleSelect: (id: string) => void) => ReactNode;
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  canSelect?: boolean;
  className?: string;
}

export function SelectableGrid({
  items,
  renderItem,
  selectedIds,
  onSelectionChange,
  canSelect = true,
  className,
}: SelectableGridProps) {
  const [isSelectMode, setIsSelectMode] = useState(false);
  
  // Toggle select mode
  const toggleSelectMode = () => {
    if (isSelectMode) {
      // Clear selection when exiting select mode
      onSelectionChange([]);
    }
    setIsSelectMode(!isSelectMode);
  };
  
  // Toggle selection of a single item
  const toggleSelect = (id: string) => {
    if (!canSelect) return;
    
    // If not in select mode yet, enter it
    if (!isSelectMode) {
      setIsSelectMode(true);
    }
    
    const newSelectedIds = selectedIds.includes(id)
      ? selectedIds.filter(selectedId => selectedId !== id)
      : [...selectedIds, id];
    
    onSelectionChange(newSelectedIds);
    
    // If no items selected, exit select mode
    if (newSelectedIds.length === 0) {
      setIsSelectMode(false);
    }
  };
  
  // Handle long press for mobile
  const handleLongPress = (id: string) => {
    if (!canSelect) return;
    
    // Enter select mode and select the item
    setIsSelectMode(true);
    
    if (!selectedIds.includes(id)) {
      onSelectionChange([...selectedIds, id]);
    }
  };
  
  // Handle key press for keyboard accessibility
  const handleKeyPress = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleSelect(id);
    }
  };
  
  // Select all items
  const selectAll = () => {
    onSelectionChange(items.map(item => item.id));
  };
  
  // Clear all selections
  const clearSelection = () => {
    onSelectionChange([]);
    setIsSelectMode(false);
  };
  
  return (
    <div className={cn('space-y-4', className)}>
      {/* Selection controls */}
      {isSelectMode && (
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">
              {selectedIds.length} selected
            </span>
            <button
              onClick={selectAll}
              className="text-sm text-primary hover:text-primary/80"
            >
              Select all
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearSelection}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map(item => (
          <div 
            key={item.id}
            className={cn(
              'relative group',
              isSelectMode && 'cursor-pointer',
              selectedIds.includes(item.id) && 'ring-2 ring-primary rounded-lg'
            )}
            onClick={() => isSelectMode && toggleSelect(item.id)}
            onKeyDown={(e) => handleKeyPress(e, item.id)}
            tabIndex={isSelectMode ? 0 : undefined}
            aria-selected={selectedIds.includes(item.id)}
            onContextMenu={(e) => {
              e.preventDefault();
              handleLongPress(item.id);
            }}
          >
            {/* Overlay check icon when selected */}
            {selectedIds.includes(item.id) && (
              <div className="absolute top-2 right-2 z-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-primary text-primary-foreground rounded-full p-0.5"
                >
                  <CheckCircle className="h-4 w-4" />
                </motion.div>
              </div>
            )}
            
            {renderItem(item, selectedIds.includes(item.id), toggleSelect)}
          </div>
        ))}
      </div>
    </div>
  );
} 