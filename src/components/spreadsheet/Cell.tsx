'use client';

import { useState, useRef, useEffect } from 'react';
import { CellData } from './types';

interface CellProps {
  row: number;
  col: number;
  cellData: CellData;
  width: number;
  height: number;
  isSelected: boolean;
  isEditing: boolean;
  isInSelection: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onDoubleClick: () => void;
  onCellValueChange: (value: string) => void;
  onStopEditing: () => void;
}

export default function Cell({
  row,
  col,
  cellData = { value: '' },
  width = 100,
  height = 32,
  isSelected = false,
  isEditing = false,
  isInSelection = false,
  onMouseDown,
  onDoubleClick,
  onCellValueChange,
  onStopEditing
}: CellProps) {
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Initialize the edit value ONLY when editing begins
  useEffect(() => {
    if (isEditing) {
      setEditValue(cellData.formula || cellData.value || '');
      // Focus the input and select all text
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [isEditing]); // Only depend on isEditing, not cellData
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onCellValueChange(editValue);
      onStopEditing();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onStopEditing();
    }
  };
  
  const handleBlur = () => {
    if (isEditing) {
      onCellValueChange(editValue);
      onStopEditing();
    }
  };
  
  // Apply cell styles with defaults
  const cellStyle = {
    width: `${width}px`,
    height: `${height}px`,
    textAlign: cellData.style?.textAlign || 'left',
    fontWeight: cellData.style?.fontWeight || 'normal',
    fontStyle: cellData.style?.fontStyle || 'normal',
    textDecoration: cellData.style?.textDecoration || 'none',
    backgroundColor: cellData.style?.backgroundColor || 'transparent',
    color: cellData.style?.color || 'inherit',
    fontSize: cellData.style?.fontSize || 'inherit',
    fontFamily: cellData.style?.fontFamily || 'inherit',
  };
  
  return (
    <div
      className={`cell relative ${isSelected || isInSelection ? 'cell-selected' : ''}`}
      style={cellStyle}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          className="absolute inset-0 p-1 w-full h-full outline-none border-0 bg-white"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      ) : (
        <div className="truncate px-1 py-0.5">
          {cellData.value || ''}
        </div>
      )}
    </div>
  );
}