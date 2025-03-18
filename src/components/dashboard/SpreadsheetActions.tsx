'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SpreadsheetCard } from '@/components/ui/cards/SpreadsheetCard';
import { Sheet, SheetTag } from '@/types/database.types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { ConfirmationModal } from '@/components/ui/modals/ConfirmationModal';

interface SpreadsheetActionsProps {
  sheet: Sheet;
  availableTags?: SheetTag[];
}

export function SpreadsheetActions({ sheet, availableTags = [] }: SpreadsheetActionsProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sheetToDelete, setSheetToDelete] = useState<string | null>(null);
  const [localAvailableTags, setLocalAvailableTags] = useState<SheetTag[]>(availableTags);

  // Fetch available tags if not provided
  useEffect(() => {
    const fetchTags = async () => {
      if (availableTags.length > 0) return;
      
      try {
        // This would be replaced with an actual API call in a real app
        // For now, we'll use some demo tags
        const demoTags: SheetTag[] = [
          { id: 'work', name: 'Work' },
          { id: 'personal', name: 'Personal' },
          { id: 'finance', name: 'Finance' },
          { id: 'project', name: 'Project' },
          { id: 'important', name: 'Important' },
        ];
        setLocalAvailableTags(demoTags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    
    fetchTags();
  }, [availableTags]);

  const handleStar = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('sheets')
        .update({ is_starred: !sheet.is_starred })
        .eq('id', id);

      if (error) throw error;
      router.refresh();
      toast.success(sheet.is_starred ? 'Removed from starred' : 'Added to starred');
    } catch (error) {
      toast.error('Failed to update star status');
    }
  };

  const handleShare = async (id: string) => {
    // Implement share functionality
    toast.info('Share functionality coming soon');
  };

  const handleDuplicate = async (id: string) => {
    try {
      const newSheet = {
        ...sheet,
        id: undefined,
        title: `${sheet.title} (Copy)`,
        is_starred: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('sheets')
        .insert([newSheet]);

      if (error) throw error;
      router.refresh();
      toast.success('Sheet duplicated successfully');
    } catch (error) {
      toast.error('Failed to duplicate sheet');
    }
  };

  const openDeleteModal = (id: string) => {
    setSheetToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!sheetToDelete) return;
    
    try {
      const { error } = await supabase
        .from('sheets')
        .delete()
        .eq('id', sheetToDelete);

      if (error) throw error;
      router.refresh();
      toast.success('Sheet deleted successfully');
    } catch (error) {
      toast.error('Failed to delete sheet');
    } finally {
      setIsDeleteModalOpen(false);
      setSheetToDelete(null);
    }
  };

  return (
    <>
      <SpreadsheetCard
        sheet={sheet}
        availableTags={localAvailableTags}
        onStar={handleStar}
        onShare={handleShare}
        onDuplicate={handleDuplicate}
        onDelete={openDeleteModal}
      />
      
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Delete Sheet"
        message={`Are you sure you want to delete "${sheet.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        variant="danger"
      />
    </>
  );
} 