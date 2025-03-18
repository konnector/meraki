'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Filter, Calendar, Tag, Users, 
  ChevronDown, X, Check 
} from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface FilterDropdownProps {
  className?: string;
}

type DateFilter = 'today' | 'yesterday' | 'last7days' | 'last30days' | 'custom';
type TypeFilter = 'all' | 'budget' | 'todo' | 'tracker' | 'blank';

export function FilterDropdown({ className }: FilterDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  // Filter states
  const [dateFilter, setDateFilter] = useState<DateFilter | null>(null);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [tagFilters, setTagFilters] = useState<string[]>([]);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    // Copy current search params, except for filter-related ones
    searchParams.forEach((value, key) => {
      if (!key.startsWith('filter_')) {
        params.append(key, value);
      }
    });
    
    // Add active filters to URL
    if (dateFilter) {
      params.set('filter_date', dateFilter);
    }
    
    if (typeFilter !== 'all') {
      params.set('filter_type', typeFilter);
    }
    
    if (tagFilters.length > 0) {
      params.set('filter_tags', tagFilters.join(','));
    }
    
    // Update active filters count for UI
    const newActiveFilters = [];
    if (dateFilter) newActiveFilters.push('date');
    if (typeFilter !== 'all') newActiveFilters.push('type');
    if (tagFilters.length > 0) newActiveFilters.push('tags');
    setActiveFilters(newActiveFilters);
    
    // Only update URL if filters have been applied
    if (dateFilter || typeFilter !== 'all' || tagFilters.length > 0) {
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [dateFilter, typeFilter, tagFilters, pathname, router, searchParams]);
  
  // Reset all filters
  const clearAllFilters = () => {
    setDateFilter(null);
    setTypeFilter('all');
    setTagFilters([]);
    
    // Remove filter params from URL
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (!key.startsWith('filter_')) {
        params.append(key, value);
      }
    });
    
    router.push(`${pathname}?${params.toString()}`);
  };
  
  // Common tag options (in a real app, these would come from backend)
  const availableTags = [
    { id: 'personal', name: 'Personal' },
    { id: 'work', name: 'Work' },
    { id: 'finance', name: 'Finance' },
    { id: 'project', name: 'Project' },
  ];
  
  // Toggle tag selection
  const toggleTag = (tagId: string) => {
    setTagFilters(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };
  
  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 h-10 px-3 py-2 text-sm',
          'rounded-lg border bg-background',
          'hover:bg-accent hover:text-accent-foreground',
          'transition-colors duration-200',
          activeFilters.length > 0 && 'border-primary text-primary'
        )}
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
        {activeFilters.length > 0 && (
          <span className="flex items-center justify-center rounded-full bg-primary/10 text-primary h-5 w-5 text-xs font-medium">
            {activeFilters.length}
          </span>
        )}
        <ChevronDown className="h-4 w-4" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 z-50 bg-background rounded-lg border shadow-lg overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Filters</h3>
              {activeFilters.length > 0 && (
                <button 
                  onClick={clearAllFilters}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
          
          {/* Date filter */}
          <div className="p-3 border-b">
            <div className="flex items-center gap-2 text-sm font-medium mb-2">
              <Calendar className="h-4 w-4" />
              <span>Date modified</span>
            </div>
            <div className="space-y-2">
              {[
                { id: 'today', label: 'Today' },
                { id: 'yesterday', label: 'Yesterday' },
                { id: 'last7days', label: 'Last 7 days' },
                { id: 'last30days', label: 'Last 30 days' }
              ].map(option => (
                <label 
                  key={option.id} 
                  className="flex items-center gap-2 text-sm cursor-pointer hover:bg-accent rounded px-1 py-0.5"
                >
                  <input
                    type="radio"
                    name="dateFilter"
                    className="h-4 w-4 accent-primary"
                    checked={dateFilter === option.id}
                    onChange={() => setDateFilter(option.id as DateFilter)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
          
          {/* Type filter */}
          <div className="p-3 border-b">
            <div className="flex items-center gap-2 text-sm font-medium mb-2">
              <Filter className="h-4 w-4" />
              <span>Sheet type</span>
            </div>
            <div className="space-y-2">
              {[
                { id: 'all', label: 'All types' },
                { id: 'budget', label: 'Budget' },
                { id: 'todo', label: 'To-do list' },
                { id: 'tracker', label: 'Tracker' },
                { id: 'blank', label: 'Blank sheet' }
              ].map(option => (
                <label 
                  key={option.id} 
                  className="flex items-center gap-2 text-sm cursor-pointer hover:bg-accent rounded px-1 py-0.5"
                >
                  <input
                    type="radio"
                    name="typeFilter"
                    className="h-4 w-4 accent-primary"
                    checked={typeFilter === option.id}
                    onChange={() => setTypeFilter(option.id as TypeFilter)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
          
          {/* Tags filter */}
          <div className="p-3">
            <div className="flex items-center gap-2 text-sm font-medium mb-2">
              <Tag className="h-4 w-4" />
              <span>Tags</span>
            </div>
            <div className="space-y-2">
              {availableTags.map(tag => (
                <label 
                  key={tag.id} 
                  className="flex items-center gap-2 text-sm cursor-pointer hover:bg-accent rounded px-1 py-0.5"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-primary"
                    checked={tagFilters.includes(tag.id)}
                    onChange={() => toggleTag(tag.id)}
                  />
                  {tag.name}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 