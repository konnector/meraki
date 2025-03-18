'use client';

import { cn } from '@/lib/utils';
import { Grid, List, Rows } from 'lucide-react';

export type ViewMode = 'sliding' | 'grid' | 'list';

interface ViewSelectorProps {
  activeView: ViewMode;
  onChange: (view: ViewMode) => void;
  className?: string;
}

export function ViewSelector({ activeView, onChange, className }: ViewSelectorProps) {
  const views: { id: ViewMode; icon: React.ReactNode; label: string }[] = [
    {
      id: 'sliding',
      icon: <Rows className="h-4 w-4" />,
      label: 'Sliding view'
    },
    {
      id: 'grid',
      icon: <Grid className="h-4 w-4" />,
      label: 'Grid view'
    },
    {
      id: 'list',
      icon: <List className="h-4 w-4" />,
      label: 'List view'
    }
  ];

  return (
    <div className={cn('flex items-center border rounded-md overflow-hidden', className)}>
      {views.map((view) => (
        <button
          key={view.id}
          type="button"
          onClick={() => onChange(view.id)}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 text-sm',
            'transition-colors duration-200',
            activeView === view.id 
              ? 'bg-gray-100 text-gray-900 font-medium' 
              : 'text-gray-600 hover:bg-gray-50'
          )}
          title={view.label}
        >
          {view.icon}
        </button>
      ))}
    </div>
  );
} 