'use client';

import { useState } from 'react';
import { Folder, Sheet } from '@/types/database.types';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  ChevronRight, 
  ChevronDown, 
  Folder as FolderIcon, 
  FolderPlus, 
  Trash, 
  Archive, 
  Star, 
  Settings, 
  MoreHorizontal,
  Edit,
  FolderOpen
} from 'lucide-react';
import Link from 'next/link';

interface FolderSidebarProps {
  folders: Folder[];
  activeFolder?: string;
  className?: string;
}

export function FolderSidebar({ 
  folders = [], 
  activeFolder,
  className 
}: FolderSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // State to keep track of expanded folders
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});
  // State for showing the folder creation UI
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  
  // Toggle folder expansion
  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };
  
  // Create a new folder
  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    
    // Here you would call your API to create a folder
    // This is a placeholder
    console.log('Creating folder:', newFolderName);
    
    // Reset the state
    setNewFolderName('');
    setIsCreatingFolder(false);
  };
  
  // Get nested structure of folders
  const rootFolders = folders.filter(folder => !folder.parent_id);
  const getFolderChildren = (parentId: string) => 
    folders.filter(folder => folder.parent_id === parentId)
      .sort((a, b) => a.order - b.order);
  
  // Navigate to a folder
  const navigateToFolder = (folderId: string) => {
    const params = new URLSearchParams();
    
    // Preserve existing search params
    searchParams.forEach((value, key) => {
      if (key !== 'folder') {
        params.append(key, value);
      }
    });
    
    // Add folder param
    params.set('folder', folderId);
    
    router.push(`${pathname}?${params.toString()}`);
  };
  
  // Render a folder item with its children
  const renderFolder = (folder: Folder) => {
    const children = getFolderChildren(folder.id);
    const hasChildren = children.length > 0;
    const isExpanded = expandedFolders[folder.id];
    const isActive = activeFolder === folder.id;
    
    return (
      <div key={folder.id} className="mb-1">
        <div 
          className={cn(
            'flex items-center py-1 px-2 rounded-md text-sm cursor-pointer',
            isActive ? 'bg-primary/10 text-primary' : 'hover:bg-accent',
          )}
        >
          {hasChildren ? (
            <button 
              onClick={() => toggleFolder(folder.id)}
              className="mr-1 p-0.5 rounded-sm hover:bg-accent"
            >
              {isExpanded ? 
                <ChevronDown className="h-3.5 w-3.5" /> : 
                <ChevronRight className="h-3.5 w-3.5" />
              }
            </button>
          ) : (
            <span className="w-5" />
          )}
          
          <div 
            className="flex items-center flex-1 gap-2"
            onClick={() => navigateToFolder(folder.id)}
          >
            {isActive ? (
              <FolderOpen className="h-4 w-4" />
            ) : (
              <FolderIcon className="h-4 w-4" />
            )}
            <span>{folder.name}</span>
          </div>
          
          <button 
            className="p-1 opacity-0 group-hover:opacity-100 hover:bg-accent rounded-sm"
            onClick={(e) => {
              e.stopPropagation();
              // Show folder actions menu
            }}
          >
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
        
        {/* Render children if expanded */}
        {hasChildren && isExpanded && (
          <div className="pl-4 mt-1 border-l border-accent ml-3">
            {children.map(child => renderFolder(child))}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className={cn('w-64 border-r border-border h-full', className)}>
      <div className="p-3">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Folders</h3>
          <button 
            className="p-1 rounded-md hover:bg-accent"
            onClick={() => setIsCreatingFolder(true)}
          >
            <FolderPlus className="h-4 w-4" />
          </button>
        </div>
        
        {/* Folder creation UI */}
        {isCreatingFolder && (
          <div className="mb-3">
            <div className="flex items-center gap-2 bg-accent/50 p-2 rounded-md">
              <FolderIcon className="h-4 w-4" />
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Folder name"
                className="flex-1 bg-transparent border-none outline-none text-sm"
                autoFocus
              />
              <button 
                onClick={handleCreateFolder}
                className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-md"
              >
                Add
              </button>
              <button 
                onClick={() => setIsCreatingFolder(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
        
        {/* Default views */}
        <div className="mb-3 space-y-1">
          <Link
            href="/dashboard"
            className={cn(
              'flex items-center gap-2 py-1 px-2 rounded-md text-sm',
              !activeFolder ? 'bg-primary/10 text-primary' : 'hover:bg-accent'
            )}
          >
            <FolderIcon className="h-4 w-4" />
            <span>All Sheets</span>
          </Link>
          
          <Link
            href="/dashboard?view=recent"
            className={cn(
              'flex items-center gap-2 py-1 px-2 rounded-md text-sm hover:bg-accent',
              searchParams.get('view') === 'recent' && 'bg-primary/10 text-primary'
            )}
          >
            <FolderIcon className="h-4 w-4" />
            <span>Recent</span>
          </Link>
          
          <Link
            href="/dashboard?view=starred"
            className={cn(
              'flex items-center gap-2 py-1 px-2 rounded-md text-sm hover:bg-accent',
              searchParams.get('view') === 'starred' && 'bg-primary/10 text-primary'
            )}
          >
            <Star className="h-4 w-4" />
            <span>Starred</span>
          </Link>
          
          <Link
            href="/dashboard?view=archived"
            className={cn(
              'flex items-center gap-2 py-1 px-2 rounded-md text-sm hover:bg-accent',
              searchParams.get('view') === 'archived' && 'bg-primary/10 text-primary'
            )}
          >
            <Archive className="h-4 w-4" />
            <span>Archived</span>
          </Link>
        </div>
        
        {/* Folder list */}
        <div className="space-y-1">
          {rootFolders.map(folder => renderFolder(folder))}
        </div>
      </div>
    </div>
  );
} 