'use client';

import { useState, useRef, useEffect } from 'react';
import { Tag, X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagsInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  availableTags?: { id: string; name: string }[];
  className?: string;
}

export function TagsInput({
  tags,
  onChange,
  placeholder = 'Add tags...',
  maxTags = 5,
  availableTags = [],
  className
}: TagsInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [isInputActive, setIsInputActive] = useState(false);
  const [suggestedTags, setSuggestedTags] = useState<{ id: string; name: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Common tag colors for visual variety
  const tagColors = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-purple-100 text-purple-800',
    'bg-yellow-100 text-yellow-800',
    'bg-pink-100 text-pink-800',
    'bg-indigo-100 text-indigo-800',
  ];

  // Get color based on tag name (consistently)
  const getTagColor = (tag: string) => {
    const index = tag.length % tagColors.length;
    return tagColors[index];
  };

  // Update suggestions when input changes
  useEffect(() => {
    if (inputValue.trim()) {
      const filteredTags = availableTags.filter(tag => 
        tag.name.toLowerCase().includes(inputValue.toLowerCase()) && 
        !tags.includes(tag.id)
      );
      setSuggestedTags(filteredTags);
    } else {
      setSuggestedTags([]);
    }
  }, [inputValue, availableTags, tags]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setSuggestedTags([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle tag removal
  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  // Handle tag addition
  const addTag = (tag: string) => {
    // Skip empty tags and enforce max tags limit
    if (!tag.trim() || tags.length >= maxTags) return;
    
    // Skip if tag already exists
    if (tags.includes(tag)) return;
    
    onChange([...tags, tag]);
    setInputValue('');
    setSuggestedTags([]);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue) {
      e.preventDefault();
      
      // If there's an exact match in availableTags, use that
      const exactMatch = availableTags.find(tag => 
        tag.name.toLowerCase() === inputValue.toLowerCase()
      );
      
      if (exactMatch) {
        addTag(exactMatch.id);
      } else if (suggestedTags.length > 0) {
        // Use the first suggestion
        addTag(suggestedTags[0].id);
      } else {
        // Create a new tag with the input as both id and name
        // In a real app, you'd want to sanitize this and create a proper ID
        addTag(inputValue.toLowerCase().replace(/\s+/g, '-'));
      }
    } else if (e.key === 'Backspace' && !inputValue) {
      // Remove the last tag when pressing backspace in an empty input
      if (tags.length > 0) {
        removeTag(tags[tags.length - 1]);
      }
    }
  };

  return (
    <div className={className}>
      <div 
        className={cn(
          'flex flex-wrap items-center gap-2 p-2 min-h-[42px] rounded-md border',
          isInputActive && 'ring-1 ring-primary border-primary',
          !isInputActive && 'border-input'
        )}
        onClick={() => inputRef.current?.focus()}
      >
        <Tag className="h-4 w-4 text-muted-foreground ml-1" />
        
        {/* Render existing tags */}
        {tags.map((tag) => {
          // Try to find the tag name from availableTags
          const tagInfo = availableTags.find(t => t.id === tag);
          const displayName = tagInfo ? tagInfo.name : tag;
          
          return (
            <span 
              key={tag} 
              className={cn(
                'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                getTagColor(tag)
              )}
            >
              {displayName}
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
                className="ml-1 h-3.5 w-3.5 rounded-full flex items-center justify-center hover:bg-black/10"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            </span>
          );
        })}
        
        {/* Input for new tags */}
        {tags.length < maxTags && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsInputActive(true)}
            onBlur={() => setIsInputActive(false)}
            placeholder={tags.length === 0 ? placeholder : ''}
            className="flex-1 outline-none min-w-[120px] bg-transparent text-sm"
          />
        )}
      </div>
      
      {/* Tag suggestions */}
      {suggestedTags.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="mt-1 p-1 border rounded-md shadow-sm bg-background z-10 absolute w-full max-h-36 overflow-y-auto"
        >
          {suggestedTags.map(tag => (
            <button
              key={tag.id}
              onClick={() => addTag(tag.id)}
              className="w-full text-left px-2 py-1 text-sm rounded hover:bg-accent flex items-center gap-1"
            >
              <span 
                className={cn(
                  'w-2 h-2 rounded-full',
                  getTagColor(tag.id).replace('bg-', 'bg-').replace('text-', '')
                )} 
              />
              {tag.name}
            </button>
          ))}
        </div>
      )}
      
      {/* Max tags limit message */}
      {tags.length >= maxTags && (
        <p className="mt-1 text-xs text-muted-foreground">
          Maximum {maxTags} tags allowed
        </p>
      )}
    </div>
  );
} 