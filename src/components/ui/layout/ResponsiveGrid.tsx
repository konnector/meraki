'use client';

import { BREAKPOINTS } from '@/lib/constants/design-system';
import { cn } from '@/lib/utils';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveGrid({ children, className }: ResponsiveGridProps) {
  return (
    <div
      className={cn(
        'grid gap-4',
        'grid-cols-1',
        `sm:grid-cols-2`,
        `lg:grid-cols-3`,
        `xl:grid-cols-4`,
        className
      )}
    >
      {children}
    </div>
  );
} 