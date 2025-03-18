'use client';

import { useState } from 'react';
import { SheetCategory } from '@/types/database.types';
import { cn } from '@/lib/utils';
import { 
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Tag,
  CheckCircle,
  MoreHorizontal,
  PaletteIcon,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CategoryManagerProps {
  categories: SheetCategory[];
  onCreateCategory: (category: Partial<SheetCategory>) => Promise<void>;
  onUpdateCategory: (id: string, data: Partial<SheetCategory>) => Promise<void>;
  onDeleteCategory: (id: string) => Promise<void>;
  className?: string;
}

export function CategoryManager({
  categories = [],
  onCreateCategory,
  onUpdateCategory,
  onDeleteCategory,
  className,
}: CategoryManagerProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState<Partial<SheetCategory>>({
    name: '',
    color: '#2c2c30', // Default black
  });
  const [editCategory, setEditCategory] = useState<Partial<SheetCategory>>({});
  
  // Available colors for categories
  const colorOptions = [
    { name: 'Black', value: '#2c2c30' },
    { name: 'Dark Gray', value: '#4a4a4d' },
    { name: 'Gray', value: '#71717a' },
    { name: 'Light Gray', value: '#a1a1aa' },
    { name: 'Lighter Gray', value: '#d4d4d8' },
    { name: 'White', value: '#ffffff' },
  ];
  
  // Handle creating a new category
  const handleCreate = async () => {
    if (!newCategory.name?.trim()) return;
    
    try {
      await onCreateCategory(newCategory);
      setNewCategory({ name: '', color: '#2c2c30' });
      setIsCreating(false);
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };
  
  // Handle updating a category
  const handleUpdate = async () => {
    if (!editingId || !editCategory.name?.trim()) return;
    
    try {
      await onUpdateCategory(editingId, editCategory);
      setEditingId(null);
      setEditCategory({});
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };
  
  // Start editing a category
  const startEditing = (category: SheetCategory) => {
    setEditingId(category.id);
    setEditCategory({ name: category.name, color: category.color });
  };
  
  // Cancel editing/creating
  const cancelEditing = () => {
    setEditingId(null);
    setEditCategory({});
    setIsCreating(false);
    setNewCategory({ name: '', color: '#2c2c30' });
  };
  
  return (
    <div className={cn('', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Categories</h3>
        <button
          onClick={() => setIsCreating(true)}
          className="p-1.5 rounded-md hover:bg-accent text-sm flex items-center gap-1"
          disabled={isCreating}
        >
          <Plus className="h-4 w-4" />
          <span>New Category</span>
        </button>
      </div>
      
      {/* Category creation form */}
      {isCreating && (
        <div className="mb-4 p-3 border rounded-md bg-accent/10">
          <h4 className="text-sm font-medium mb-2">New Category</h4>
          <div className="flex items-center gap-2 mb-3">
            <div 
              className="h-4 w-4 rounded-full" 
              style={{ backgroundColor: newCategory.color }}
            />
            <input
              type="text"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              placeholder="Category name"
              className="flex-1 px-2 py-1 text-sm rounded-md border"
              autoFocus
            />
          </div>
          
          <div className="text-xs text-muted-foreground mb-1">Color</div>
          <div className="flex flex-wrap gap-1">
            {colorOptions.map(color => (
              <button
                key={color.value}
                onClick={() => setNewCategory({ ...newCategory, color: color.value })}
                className={cn(
                  'w-6 h-6 rounded-full hover:ring-2 hover:ring-offset-1',
                  newCategory.color === color.value && 'ring-2 ring-offset-1'
                )}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
          
          <div className="flex items-center justify-end gap-2 mt-3">
            <button
              onClick={cancelEditing}
              className="px-2 py-1 text-sm rounded-md hover:bg-accent"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="px-2 py-1 text-sm rounded-md bg-black text-white hover:bg-black/90"
              disabled={!newCategory.name?.trim()}
            >
              Create
            </button>
          </div>
        </div>
      )}
      
      {/* Categories list */}
      <div className="space-y-2">
        {categories.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground text-sm">
            No categories yet. Create one to start organizing your sheets.
          </div>
        ) : (
          categories.map(category => (
            <div
              key={category.id}
              className={cn(
                'py-2 px-3 rounded-md flex items-center justify-between',
                editingId === category.id ? 'bg-accent/10 border' : 'hover:bg-accent/10',
              )}
            >
              {editingId === category.id ? (
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="h-4 w-4 rounded-full" 
                      style={{ backgroundColor: editCategory.color }}
                    />
                    <input
                      type="text"
                      value={editCategory.name}
                      onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                      placeholder="Category name"
                      className="flex-1 px-2 py-1 text-sm rounded-md border"
                      autoFocus
                    />
                  </div>
                  
                  <div className="text-xs text-muted-foreground mb-1">Color</div>
                  <div className="flex flex-wrap gap-1">
                    {colorOptions.map(color => (
                      <button
                        key={color.value}
                        onClick={() => setEditCategory({ ...editCategory, color: color.value })}
                        className={cn(
                          'w-5 h-5 rounded-full hover:ring-2 hover:ring-offset-1',
                          editCategory.color === color.value && 'ring-2 ring-offset-1'
                        )}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-end gap-2 mt-3">
                    <button
                      onClick={cancelEditing}
                      className="p-1 rounded-md text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleUpdate}
                      className="p-1 rounded-md text-black hover:text-black/80"
                      disabled={!editCategory.name?.trim()}
                    >
                      <Save className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <div 
                      className="h-4 w-4 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span>{category.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => startEditing(category)}
                      className="p-1 text-muted-foreground hover:text-foreground rounded-md"
                      title="Edit category"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteCategory(category.id)}
                      className="p-1 text-muted-foreground hover:text-red-500 rounded-md"
                      title="Delete category"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
} 