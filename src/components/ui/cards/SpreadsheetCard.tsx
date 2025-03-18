'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sheet, SheetTag } from '@/types/database.types';
import { STATUS_COLORS, TRANSITIONS } from '@/lib/constants/design-system';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Star, Share2, Copy, Trash2, MoreHorizontal, Crown, Pencil, Eye } from 'lucide-react';
import { SpreadsheetTags } from './SpreadsheetTags';

interface SpreadsheetCardProps {
  sheet: Sheet;
  availableTags?: SheetTag[];
  onStar?: (id: string) => void;
  onShare?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function SpreadsheetCard({ 
  sheet, 
  availableTags = [],
  onStar, 
  onShare, 
  onDuplicate, 
  onDelete 
}: SpreadsheetCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/sheets/${sheet.id}`} className="block">
      <motion.div
        className={cn(
          'group relative bg-white rounded-lg shadow-sm',
          'hover:shadow-md transition-all duration-150',
          'border border-gray-200'
        )}
        whileHover={{ scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Preview Section */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg bg-gray-50">
          {sheet.preview_url ? (
            <Image
              src={sheet.preview_url}
              alt={sheet.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-4xl text-gray-400">📊</div>
            </div>
          )}
          
          {/* Status Indicator */}
          <div className={cn(
            'absolute top-2 left-2 w-2 h-2 rounded-full',
            `bg-${STATUS_COLORS[sheet.status || 'active']}-500`
          )} />
          
          {/* Star Button - Always Visible */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onStar?.(sheet.id);
            }}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-sm text-gray-600 hover:text-black transition-colors"
          >
            <Star className={cn('w-4 h-4', sheet.is_starred && 'fill-black text-black')} />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-gray-900">{sheet.title}</h3>
              <p className="text-sm text-gray-500">
                Last modified {format(new Date(sheet.updated_at), 'MMM d, yyyy')}
              </p>
              
              {/* Tags */}
              {sheet.tags && sheet.tags.length > 0 && (
                <SpreadsheetTags 
                  tags={sheet.tags} 
                  availableTags={availableTags} 
                  maxDisplay={3}
                />
              )}
            </div>
            
            {/* Permission Icon */}
            {sheet.permission === 'owner' && <Crown className="w-4 h-4 text-black" />}
            {sheet.permission === 'editor' && <Pencil className="w-4 h-4 text-black" />}
            {sheet.permission === 'viewer' && <Eye className="w-4 h-4 text-gray-500" />}
          </div>

          {/* Collaborators */}
          {sheet.collaborators && sheet.collaborators.length > 0 && (
            <div className="mt-2 flex -space-x-2">
              {sheet.collaborators.slice(0, 3).map((collaborator, i) => (
                <Image
                  key={i}
                  src={collaborator.avatar_url}
                  alt={collaborator.name}
                  width={24}
                  height={24}
                  className="rounded-full border-2 border-white"
                />
              ))}
              {sheet.collaborators.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                  +{sheet.collaborators.length - 3}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Other Quick Actions (on hover) */}
        <div className={cn(
          'absolute top-2 right-12 flex items-center gap-1',
          'opacity-0 group-hover:opacity-100 transition-opacity'
        )}>
          <button
            onClick={(e) => {
              e.preventDefault();
              onShare?.(sheet.id);
            }}
            className="p-1 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-black"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              onDuplicate?.(sheet.id);
            }}
            className="p-1 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-black"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              onDelete?.(sheet.id);
            }}
            className="p-1 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button 
            onClick={(e) => e.preventDefault()} 
            className="p-1 rounded-full bg-white/80 hover:bg-white text-gray-600"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </Link>
  );
} 