'use client';

import { Copy, Edit, Group, FileIcon, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ContextMenuProps {
  children: React.ReactNode;
  onCopy: () => void;
  onEdit: () => void;
  onGroup: () => void;
  onClone: () => void;
  onDelete: () => void;
}

export default function ContextMenu({
  children,
  onCopy,
  onEdit,
  onGroup,
  onClone,
  onDelete
}: ContextMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white shadow-md border border-gray-200 rounded-md overflow-hidden">
        <DropdownMenuLabel className="px-4 py-2 text-sm text-gray-500 font-normal">Label</DropdownMenuLabel>
        <DropdownMenuItem className="px-4 py-2 text-sm hover:bg-blue-50 flex items-center" onClick={onCopy}>
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem className="px-4 py-2 text-sm hover:bg-blue-50 flex items-center" onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="my-1 border-gray-200" />
        <DropdownMenuLabel className="px-4 py-2 text-sm text-gray-500 font-normal">Label</DropdownMenuLabel>
        
        <DropdownMenuItem className="px-4 py-2 text-sm hover:bg-blue-50 flex items-center" onClick={onGroup}>
          <Group className="mr-2 h-4 w-4" />
          Group
        </DropdownMenuItem>
        <DropdownMenuItem className="px-4 py-2 text-sm hover:bg-blue-50 flex items-center" onClick={onClone}>
          <FileIcon className="mr-2 h-4 w-4" />
          Clone
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center" 
          onClick={onDelete}
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 