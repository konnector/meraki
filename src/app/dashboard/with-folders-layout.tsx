'use client';

import { useState, useCallback, ReactNode } from 'react';
import { Sheet, Folder, SheetTag, SheetCategory } from '@/types/database.types';
import { FolderSidebar } from '@/components/dashboard/FolderSidebar';
import { BulkActionBar } from '@/components/dashboard/BulkActionBar';
import { ReorderableSections, SectionType } from '@/components/dashboard/ReorderableSections';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface WithFoldersLayoutProps {
  sheets: Sheet[];
  folders: Folder[];
  categories: SheetCategory[];
  tags: SheetTag[];
  starredSection: ReactNode;
  recentSection: ReactNode;
  templatesSection: ReactNode;
  archivedSection?: ReactNode;
  currentFolder?: string;
}

export function WithFoldersLayout({
  sheets,
  folders,
  categories,
  tags,
  starredSection,
  recentSection,
  templatesSection,
  archivedSection,
  currentFolder,
}: WithFoldersLayoutProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  // Define default sections for the reorderable section component
  const defaultSections: SectionType[] = [
    {
      id: 'templates',
      title: 'Templates',
      visible: true,
      component: templatesSection,
    },
    {
      id: 'starred',
      title: 'Starred',
      visible: true,
      component: starredSection,
    },
    {
      id: 'recent',
      title: 'Recent',
      visible: true,
      component: recentSection,
    },
  ];

  // Add archived section if provided
  if (archivedSection) {
    defaultSections.push({
      id: 'archived',
      title: 'Archived',
      visible: false, // Hidden by default
      component: archivedSection,
    });
  }
  
  // Handle bulk actions
  const handleArchive = useCallback(async (ids: string[]) => {
    try {
      const { error } = await supabase
        .from('sheets')
        .update({ 
          is_archived: true,
          archived_at: new Date().toISOString(),
        })
        .in('id', ids);
        
      if (error) throw error;
      
      toast.success(`${ids.length} ${ids.length === 1 ? 'item' : 'items'} archived`);
      setSelectedItems([]);
      router.refresh();
    } catch (error) {
      toast.error('Failed to archive items');
      console.error(error);
    }
  }, [supabase, router]);
  
  const handleDelete = useCallback(async (ids: string[]) => {
    try {
      const { error } = await supabase
        .from('sheets')
        .delete()
        .in('id', ids);
        
      if (error) throw error;
      
      toast.success(`${ids.length} ${ids.length === 1 ? 'item' : 'items'} deleted`);
      setSelectedItems([]);
      router.refresh();
    } catch (error) {
      toast.error('Failed to delete items');
      console.error(error);
    }
  }, [supabase, router]);
  
  const handleStar = useCallback(async (ids: string[]) => {
    try {
      const { error } = await supabase
        .from('sheets')
        .update({ is_starred: true })
        .in('id', ids);
        
      if (error) throw error;
      
      toast.success(`${ids.length} ${ids.length === 1 ? 'item' : 'items'} starred`);
      setSelectedItems([]);
      router.refresh();
    } catch (error) {
      toast.error('Failed to star items');
      console.error(error);
    }
  }, [supabase, router]);
  
  const handleUnstar = useCallback(async (ids: string[]) => {
    try {
      const { error } = await supabase
        .from('sheets')
        .update({ is_starred: false })
        .in('id', ids);
        
      if (error) throw error;
      
      toast.success(`${ids.length} ${ids.length === 1 ? 'item' : 'items'} unstarred`);
      setSelectedItems([]);
      router.refresh();
    } catch (error) {
      toast.error('Failed to unstar items');
      console.error(error);
    }
  }, [supabase, router]);
  
  const handleMove = useCallback(async (ids: string[], folderId: string) => {
    try {
      const { error } = await supabase
        .from('sheets')
        .update({ folder_id: folderId })
        .in('id', ids);
        
      if (error) throw error;
      
      toast.success(`${ids.length} ${ids.length === 1 ? 'item' : 'items'} moved to folder`);
      setSelectedItems([]);
      router.refresh();
    } catch (error) {
      toast.error('Failed to move items');
      console.error(error);
    }
  }, [supabase, router]);
  
  const handleAddTags = useCallback(async (ids: string[], tagIds: string[]) => {
    try {
      // This is a placeholder - in a real app you'd need to handle this differently
      // since we'd need to merge existing tags with new ones
      const { error } = await supabase
        .from('sheets')
        .update({ tags: tagIds })
        .in('id', ids);
        
      if (error) throw error;
      
      toast.success(`Tags added to ${ids.length} ${ids.length === 1 ? 'item' : 'items'}`);
      setSelectedItems([]);
      router.refresh();
    } catch (error) {
      toast.error('Failed to add tags');
      console.error(error);
    }
  }, [supabase, router]);
  
  return (
    <div className="flex h-[calc(100vh-60px)]">
      {/* Folder sidebar */}
      <FolderSidebar 
        folders={folders}
        activeFolder={currentFolder}
        className="hidden md:block"
      />
      
      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-4">
        <ReorderableSections defaultSections={defaultSections} />
      </div>
      
      {/* Bulk action bar */}
      <BulkActionBar
        selectedItems={selectedItems}
        onClearSelection={() => setSelectedItems([])}
        onArchive={handleArchive}
        onDelete={handleDelete}
        onStar={handleStar}
        onUnstar={handleUnstar}
        onMove={handleMove}
        onTag={handleAddTags}
        folders={folders}
        availableTags={tags}
      />
    </div>
  );
} 