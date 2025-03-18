'use client';

import { useState } from 'react';
import { Sheet, Folder } from '@/types/database.types';
import { cn } from '@/lib/utils';
import { 
  Trash2, 
  Star, 
  FolderPlus, 
  Archive, 
  Tag, 
  Copy, 
  X, 
  CheckCircle,
  Folder as FolderIcon,
  AlertCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BulkActionBarProps {
  selectedItems: string[];
  onClearSelection: () => void;
  onArchive: (ids: string[]) => void;
  onDelete: (ids: string[]) => void;
  onStar: (ids: string[]) => void;
  onUnstar: (ids: string[]) => void;
  onMove: (ids: string[], folderId: string) => void;
  onTag: (ids: string[], tagIds: string[]) => void;
  folders: Folder[];
  availableTags: { id: string; name: string }[];
  className?: string;
}

export function BulkActionBar({
  selectedItems,
  onClearSelection,
  onArchive,
  onDelete,
  onStar,
  onUnstar,
  onMove,
  onTag,
  folders = [],
  availableTags = [],
  className,
}: BulkActionBarProps) {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleteConfirmOpen(false);
    onDelete(selectedItems);
  };

  if (selectedItems.length === 0) return null;

  return (
    <div className={cn(
      'fixed bottom-0 left-0 right-0 bg-background border-t z-50 py-2 px-4',
      'animate-slide-up shadow-md',
      className
    )}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onClearSelection}
            className="p-1.5 hover:bg-accent rounded-md text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </button>
          
          <span className="text-sm font-medium">
            {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'} selected
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          {/* Star/Unstar */}
          <button
            onClick={() => onStar(selectedItems)}
            className="flex items-center gap-1 p-1.5 hover:bg-accent rounded-md text-sm"
            title="Star selected items"
          >
            <Star className="h-4 w-4" />
          </button>
          
          {/* Move to folder */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-1 p-1.5 hover:bg-accent rounded-md text-sm"
                title="Move to folder"
              >
                <FolderPlus className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {folders.length === 0 ? (
                <DropdownMenuItem 
                  className="text-muted-foreground"
                  disabled
                >
                  No folders available
                </DropdownMenuItem>
              ) : (
                folders.map(folder => (
                  <DropdownMenuItem
                    key={folder.id}
                    onClick={() => onMove(selectedItems, folder.id)}
                    className="flex items-center gap-2"
                  >
                    <FolderIcon className="h-4 w-4" />
                    <span>{folder.name}</span>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Add tags */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-1 p-1.5 hover:bg-accent rounded-md text-sm"
                title="Add tags"
              >
                <Tag className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {availableTags.length === 0 ? (
                <DropdownMenuItem 
                  className="text-muted-foreground"
                  disabled
                >
                  No tags available
                </DropdownMenuItem>
              ) : (
                availableTags.map(tag => (
                  <DropdownMenuItem
                    key={tag.id}
                    onClick={() => onTag(selectedItems, [tag.id])}
                    className="flex items-center gap-2"
                  >
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span>{tag.name}</span>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Archive */}
          <button
            onClick={() => onArchive(selectedItems)}
            className="flex items-center gap-1 p-1.5 hover:bg-accent rounded-md text-sm"
            title="Archive"
          >
            <Archive className="h-4 w-4" />
          </button>
          
          {/* Delete confirmation */}
          {isDeleteConfirmOpen ? (
            <div className="flex items-center bg-accent p-1 rounded-md">
              <span className="text-sm text-destructive mr-2">Delete {selectedItems.length} items?</span>
              <button
                onClick={handleDelete}
                className="p-1 bg-destructive text-destructive-foreground rounded-md mr-1"
              >
                <CheckCircle className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="p-1 hover:bg-accent rounded-md"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsDeleteConfirmOpen(true)}
              className="flex items-center gap-1 p-1.5 hover:bg-destructive/10 hover:text-destructive rounded-md text-sm"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 