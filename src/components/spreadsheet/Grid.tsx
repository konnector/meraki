'use client';

import { useState, useRef, useEffect } from 'react';
import { CellData, CellPosition, Selection, ColumnSize, RowSize } from './types';
import Cell from './Cell';

interface GridProps {
  rowCount: number;
  colCount: number;
  selectedCell: CellPosition | null;
  editingCell: CellPosition | null;
  selection: Selection | null;
  columnSizes: ColumnSize[];
  rowSizes: RowSize[];
  onSelectCell: (row: number, col: number) => void;
  onStartEditing: (row: number, col: number) => void;
  onStopEditing: () => void;
  onCellValueChange: (row: number, col: number, value: string) => void;
  onSelectionChange: (start: CellPosition, end: CellPosition) => void;
  onResizeColumn: (index: number, width: number) => void;
  onResizeRow: (index: number, height: number) => void;
  getCellData: (row: number, col: number) => CellData;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export default function Grid({
  rowCount = 100,
  colCount = 26,
  selectedCell,
  editingCell,
  selection,
  columnSizes = [],
  rowSizes = [],
  onSelectCell,
  onStartEditing,
  onStopEditing,
  onCellValueChange,
  onSelectionChange,
  onResizeColumn,
  onResizeRow,
  getCellData,
  onKeyDown
}: GridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [resizingCol, setResizingCol] = useState<number | null>(null);
  const [resizingRow, setResizingRow] = useState<number | null>(null);
  const [initialMousePosition, setInitialMousePosition] = useState<{ x: number, y: number } | null>(null);
  const [initialSize, setInitialSize] = useState<number | null>(null);
  
  const getColWidth = (index: number): number => {
    const column = columnSizes.find(col => col.index === index);
    return column ? column.width : 100; // Default width
  };
  
  const getRowHeight = (index: number): number => {
    const row = rowSizes.find(row => row.index === index);
    return row ? row.height : 32; // Default height
  };
  
  const handleCellMouseDown = (e: React.MouseEvent, row: number, col: number) => {
    if (resizingCol !== null || resizingRow !== null) return;
    
    if (e.button === 0) { // Left mouse button
      onSelectCell(row, col);
      setIsSelecting(true);
    }
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!gridRef.current) return;

    if (resizingCol !== null && initialMousePosition !== null && initialSize !== null) {
      const deltaX = e.clientX - initialMousePosition.x;
      const newWidth = Math.max(50, initialSize + deltaX); // Minimum width: 50px
      onResizeColumn(resizingCol, newWidth);
      return;
    }
    
    if (resizingRow !== null && initialMousePosition !== null && initialSize !== null) {
      const deltaY = e.clientY - initialMousePosition.y;
      const newHeight = Math.max(20, initialSize + deltaY); // Minimum height: 20px
      onResizeRow(resizingRow, newHeight);
      return;
    }
    
    if (!isSelecting || !selectedCell) return;
    
    const grid = gridRef.current;
    const rect = grid.getBoundingClientRect();
    
    // Calculate col and row from mouse position
    let col = 0;
    let totalWidth = 40; // Start after row header width
    
    while (col < colCount && totalWidth < e.clientX - rect.left) {
      totalWidth += getColWidth(col);
      if (totalWidth > e.clientX - rect.left) break;
      col++;
    }
    
    let row = 0;
    let totalHeight = 32; // Start after column header height
    
    while (row < rowCount && totalHeight < e.clientY - rect.top) {
      totalHeight += getRowHeight(row);
      if (totalHeight > e.clientY - rect.top) break;
      row++;
    }
    
    // Validate row and col
    row = Math.max(0, Math.min(rowCount - 1, row));
    col = Math.max(0, Math.min(colCount - 1, col));
    
    // Update selection if needed
    if (selection && (selection.end.row !== row || selection.end.col !== col)) {
      onSelectionChange(selection.start, { row, col });
    }
  };
  
  const handleMouseUp = () => {
    setIsSelecting(false);
    setResizingCol(null);
    setResizingRow(null);
    setInitialMousePosition(null);
    setInitialSize(null);
  };
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isSelecting, selection, resizingCol, resizingRow, initialMousePosition, initialSize]);
  
  const handleColResizeStart = (e: React.MouseEvent, colIndex: number) => {
    e.stopPropagation();
    setResizingCol(colIndex);
    setInitialMousePosition({ x: e.clientX, y: e.clientY });
    setInitialSize(getColWidth(colIndex));
  };
  
  const handleRowResizeStart = (e: React.MouseEvent, rowIndex: number) => {
    e.stopPropagation();
    setResizingRow(rowIndex);
    setInitialMousePosition({ x: e.clientX, y: e.clientY });
    setInitialSize(getRowHeight(rowIndex));
  };
  
  // Convert column index to letter (A, B, C, ..., Z, AA, AB, ...)
  const colIndexToLetter = (index: number) => {
    let letter = '';
    index++;
    
    while (index > 0) {
      const remainder = (index - 1) % 26;
      const normalLetter = String.fromCharCode(65 + remainder);
      // Use full-width 'Ｉ' for column I with slight adjustment
      letter = (normalLetter === 'I' ? 'ＩI'.slice(0, 1) : normalLetter) + letter;
      index = Math.floor((index - 1) / 26);
    }
    
    return letter;
  };
  
  // Check if a cell is within the current selection
  const isCellInSelection = (row: number, col: number) => {
    if (!selection) return false;
    
    const { start, end } = selection;
    const minRow = Math.min(start.row, end.row);
    const maxRow = Math.max(start.row, end.row);
    const minCol = Math.min(start.col, end.col);
    const maxCol = Math.max(start.col, end.col);
    
    return row >= minRow && row <= maxRow && col >= minCol && col <= maxCol;
  };
  
  return (
    <div 
      ref={gridRef} 
      className="inline-block relative outline-none"
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      {/* Corner cell (top-left empty cell) */}
      <div className="absolute top-0 left-0 w-10 h-8 bg-gray-100 border border-gray-300 z-20 flex items-center justify-center"></div>
      
      {/* Column headers */}
      <div className="flex sticky top-0 left-0 z-10 bg-white ml-10">
        {Array.from({ length: colCount }).map((_, colIndex) => (
          <div 
            key={`col-${colIndex}`} 
            className="header-cell flex items-center justify-center"
            style={{ width: getColWidth(colIndex) }}
          >
            <span className="select-none">{colIndexToLetter(colIndex)}</span>
            <div 
              className="resize-handle"
              onMouseDown={(e) => handleColResizeStart(e, colIndex)}
            ></div>
          </div>
        ))}
      </div>
      
      {/* Row headers and grid cells */}
      <div className="flex">
        {/* Row headers */}
        <div className="sticky left-0 z-10">
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <div 
              key={`row-${rowIndex}`} 
              className="row-header"
              style={{ height: getRowHeight(rowIndex) }}
            >
              <span className="select-none">{rowIndex + 1}</span>
              <div 
                className="resize-handle-row"
                onMouseDown={(e) => handleRowResizeStart(e, rowIndex)}
              ></div>
            </div>
          ))}
        </div>
        
        {/* Grid cells */}
        <div>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <div 
              key={`row-${rowIndex}`} 
              className="flex"
              style={{ height: getRowHeight(rowIndex) }}
            >
              {Array.from({ length: colCount }).map((_, colIndex) => {
                const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                const isEditing = editingCell?.row === rowIndex && editingCell?.col === colIndex;
                const isInSelection = isCellInSelection(rowIndex, colIndex);
                
                return (
                  <Cell
                    key={`cell-${rowIndex}-${colIndex}`}
                    row={rowIndex}
                    col={colIndex}
                    cellData={getCellData(rowIndex, colIndex)}
                    width={getColWidth(colIndex)}
                    height={getRowHeight(rowIndex)}
                    isSelected={isSelected}
                    isEditing={isEditing}
                    isInSelection={isInSelection}
                    onMouseDown={(e) => handleCellMouseDown(e, rowIndex, colIndex)}
                    onDoubleClick={() => onStartEditing(rowIndex, colIndex)}
                    onCellValueChange={(value) => onCellValueChange(rowIndex, colIndex, value)}
                    onStopEditing={onStopEditing}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}