'use client';

import { Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SheetTag } from '@/types/database.types';

interface SpreadsheetTagsProps {
  tags: string[];
  availableTags?: SheetTag[];
  maxDisplay?: number;
  className?: string;
}

export function SpreadsheetTags({ 
  tags, 
  availableTags = [], 
  maxDisplay = 3,
  className 
}: SpreadsheetTagsProps) {
  if (!tags || tags.length === 0) return null;
  
  // Common tag colors for visual variety
  const tagColors = [
    'bg-gray-100 text-gray-800',
    'bg-gray-200 text-gray-900',
    'bg-black/5 text-black',
    'bg-gray-50 text-gray-700',
    'bg-black/10 text-black',
    'bg-gray-150 text-gray-850',
  ];

  // Get color based on tag name (consistently)
  const getTagColor = (tag: string) => {
    // First try to get from availableTags
    const tagInfo = availableTags.find(t => t.id === tag);
    if (tagInfo?.color) return tagInfo.color;
    
    // Fallback to algorithm
    const index = tag.length % tagColors.length;
    return tagColors[index];
  };
  
  // Get display name for tag
  const getTagName = (tagId: string) => {
    const tagInfo = availableTags.find(t => t.id === tagId);
    return tagInfo?.name || tagId;
  };
  
  // Display tags up to maxDisplay, then show a +X more
  const displayTags = tags.slice(0, maxDisplay);
  const hasMoreTags = tags.length > maxDisplay;
  
  return (
    <div className={cn('flex flex-wrap gap-1 mt-2', className)}>
      {displayTags.map(tag => (
        <span
          key={tag}
          className={cn(
            'inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium',
            getTagColor(tag)
          )}
        >
          {getTagName(tag)}
        </span>
      ))}
      
      {hasMoreTags && (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          +{tags.length - maxDisplay} more
        </span>
      )}
    </div>
  );
} 