'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update URL with search query
  const updateSearchParams = (newQuery: string) => {
    const params = new URLSearchParams();
    // Copy current search params
    searchParams.forEach((value, key) => {
      params.append(key, value);
    });
    
    if (newQuery) {
      params.set('q', newQuery);
    } else {
      params.delete('q');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams(query);
  };

  // Clear search
  const clearSearch = () => {
    setQuery('');
    updateSearchParams('');
    inputRef.current?.focus();
  };

  // Keyboard shortcut for search (Ctrl+/)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <form onSubmit={handleSearch} className={cn('relative w-full max-w-md', className)}>
      <div
        className={cn(
          'flex items-center h-10 w-full rounded-lg border bg-background px-3',
          'transition-all duration-100',
          isFocused ? 'border-primary ring-1 ring-primary/20' : 'border-input'
        )}
      >
        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search spreadsheets... (Ctrl + /)"
          className="flex-1 border-0 bg-transparent px-2 py-1.5 outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="h-5 w-5 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      
      <div className="text-xs text-muted-foreground mt-1 px-3">
        <span className="hidden">
          Press <kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">Enter</kbd> to search
        </span>
      </div>
    </form>
  );
} 