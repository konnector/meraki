'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { CellData, CellPosition, Selection, ColumnSize, RowSize } from './types';
import Toolbar from './Toolbar';
import Grid from './Grid';
import MenuBar from './MenuBar';
import { evaluateFormula } from './formulas';
import { handleKeyboardShortcut } from './keyboardShortcuts';
import { AnimatedList } from '../magicui/animated-list';
import { ClipboardIcon, DocumentDuplicateIcon as ClipboardCopyIcon, ArrowUturnLeftIcon as UndoIcon, ArrowUturnRightIcon as RedoIcon } from '@heroicons/react/24/outline';

const DEFAULT_ROWS = 100;
const DEFAULT_COLS = 26;

interface SpreadsheetProps {
  sheetId: string;
}

type Notification = {
  id: string;
  message: string;
  timestamp: number;
};

const formatTimeAgo = (timestamp: number) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) {
    return 'just now';
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours}h ago`;
  } else {
    const days = Math.floor(seconds / 86400);
    return `${days}d ago`;
  }
};

export default function Spreadsheet({ sheetId }: SpreadsheetProps) {
  const supabase = createClientComponentClient();
  const [data, setData] = useState<Record<string, CellData>>({});
  const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);
  const [editingCell, setEditingCell] = useState<CellPosition | null>(null);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [columnSizes, setColumnSizes] = useState<ColumnSize[]>([]);
  const [rowSizes, setRowSizes] = useState<RowSize[]>([]);
  const [title, setTitle] = useState('Loading...');
  const [isLoading, setIsLoading] = useState(true);
  
  // Add history tracking
  const [history, setHistory] = useState<Record<string, CellData>[]>([{}]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const [isEditing, setIsEditing] = useState(false);
  const [clipboard, setClipboard] = useState<{
    start: CellPosition;
    end: CellPosition;
    cells: Record<string, CellData>;
  } | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load sheet data
  useEffect(() => {
    const loadSheetData = async () => {
      try {
        // Load sheet metadata
        const { data: sheet, error: sheetError } = await supabase
          .from('sheets')
          .select('*')
          .eq('id', sheetId)
          .single();

        if (sheetError) throw sheetError;
        if (sheet) {
          setTitle(sheet.title);
        }

        // Load sheet data
        const { data: cellData, error: dataError } = await supabase
          .from('sheet_data')
          .select('*')
          .eq('sheet_id', sheetId);

        if (dataError) throw dataError;

        // Convert array of cell data to our data format
        const newData: Record<string, CellData> = {};
        cellData?.forEach(cell => {
          const key = getCellKey(cell.row_index, cell.col_index);
          newData[key] = {
            value: cell.cell_value || '',
            type: cell.cell_type || 'text'
          };
        });

        setData(newData);
        setHistory([newData]);
        setHistoryIndex(0);
      } catch (error) {
        console.error('Error loading sheet:', error);
        addNotification('Error loading sheet');
      } finally {
        setIsLoading(false);
      }
    };

    loadSheetData();
  }, [sheetId, supabase]);

  // Save changes to database
  const saveChanges = useCallback(async (key: string, cellData: CellData) => {
    const [row, col] = key.split(',').map(Number);
    
    try {
      const { error } = await supabase
        .from('sheet_data')
        .upsert({
          sheet_id: sheetId,
          row_index: row,
          col_index: col,
          cell_value: cellData.value,
          cell_type: cellData.type || 'text'
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving cell:', error);
      addNotification('Error saving changes');
    }
  }, [sheetId, supabase]);

  // Update the updateCellData function to save to database
  const updateCellData = useCallback((row: number, col: number, cellData: Partial<CellData>) => {
    const key = getCellKey(row, col);
    const currentData = data[key] || { value: '' };
    const newData = { ...currentData, ...cellData };
    
    // Create new data state
    const newDataState = {
      ...data,
      [key]: newData
    };

    // Update data
    setData(newDataState);

    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newDataState);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    // Save to database
    saveChanges(key, newData);

    // Re-evaluate cells with formulas if needed
    if (cellData.value !== undefined) {
      recalculateDependentCells(row, col);
    }
  }, [data, history, historyIndex, saveChanges]);

  const getCellKey = (row: number, col: number) => `${row},${col}`;

  const getCellData = (row: number, col: number): CellData => {
    const key = getCellKey(row, col);
    return data[key] || { value: '' };
  };

  const addNotification = useCallback((message: string) => {
    const id = Math.random().toString(36).substring(7);
    const notification = { id, message, timestamp: Date.now() };
    setNotifications(prev => [notification, ...prev]);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  }, []);

  // Update handlers to include notifications
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setData(history[historyIndex - 1]);
      addNotification('Undo');
    }
  }, [historyIndex, history, addNotification]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setData(history[historyIndex + 1]);
      addNotification('Redo');
    }
  }, [historyIndex, history, addNotification]);

  const recalculateDependentCells = (row: number, col: number) => {
    // In a real application, we would track dependencies between cells
    // and recalculate only the affected cells
    Object.entries(data).forEach(([key, cell]) => {
      if (cell.formula) {
        const [r, c] = key.split(',').map(Number);
        const evaluatedValue = evaluateFormula(cell.formula, (r, c) => {
          const cellData = getCellData(r, c);
          return cellData.value;
        });
        
        if (evaluatedValue !== undefined) {
          setData(prev => ({
            ...prev,
            [key]: { ...cell, value: String(evaluatedValue) }
          }));
        }
      }
    });
  };

  const handleSelectCell = (row: number, col: number) => {
    setSelectedCell({ row, col });
    setSelection({ start: { row, col }, end: { row, col } });
  };

  const handleStartEditing = (row: number, col: number) => {
    setEditingCell({ row, col });
  };

  const handleStopEditing = () => {
    setEditingCell(null);
  };

  const handleSelectionChange = (start: CellPosition, end: CellPosition) => {
    setSelection({ start, end });
  };

  const handleResizeColumn = (index: number, width: number) => {
    setColumnSizes(prev => {
      const existing = prev.find(col => col.index === index);
      if (existing) {
        return prev.map(col => col.index === index ? { ...col, width } : col);
      } else {
        return [...prev, { index, width }];
      }
    });
  };

  const handleResizeRow = (index: number, height: number) => {
    setRowSizes(prev => {
      const existing = prev.find(row => row.index === index);
      if (existing) {
        return prev.map(row => row.index === index ? { ...row, height } : row);
      } else {
        return [...prev, { index, height }];
      }
    });
  };

  const handleCellValueChange = (row: number, col: number, value: string) => {
    let formula = undefined;
    
    // Check if the value is a formula (starts with =)
    if (value.startsWith('=')) {
      formula = value;
      const evaluatedValue = evaluateFormula(value, (r, c) => {
        const cellData = getCellData(r, c);
        return cellData.value;
      });
      
      if (evaluatedValue !== undefined) {
        value = String(evaluatedValue);
      }
    }
    
    updateCellData(row, col, { value, formula });
  };

  const handleStyleChange = (style: Partial<CellData['style']>) => {
    if (!selection) return;
    
    const { start, end } = selection;
    
    for (let row = Math.min(start.row, end.row); row <= Math.max(start.row, end.row); row++) {
      for (let col = Math.min(start.col, end.col); col <= Math.max(start.col, end.col); col++) {
        const key = getCellKey(row, col);
        const currentData = data[key] || { value: '' };
        
        setData(prev => ({
          ...prev,
          [key]: {
            ...currentData,
            style: {
              ...currentData.style,
              ...style
            }
          }
        }));
      }
    }
  };

  const handleMove = (deltaRow: number, deltaCol: number) => {
    if (selectedCell) {
      handleSelectCell(selectedCell.row + deltaRow, selectedCell.col + deltaCol);
    }
  };

  const getColumnLetter = (col: number) => {
    const letter = String.fromCharCode(65 + col);
    // Use full-width 'Ｉ' for column I with slight adjustment
    return letter === 'I' ? 'ＩI'.slice(0, 1) : letter;
  };

  const getCellRangeNotation = (start: CellPosition, end: CellPosition) => {
    const startCol = getColumnLetter(start.col);
    const startRow = start.row + 1;
    const endCol = getColumnLetter(end.col);
    const endRow = end.row + 1;
    
    // If start and end are the same, return single cell reference
    if (start.row === end.row && start.col === end.col) {
      return `${startCol}${startRow}`;
    }
    
    return `${startCol}${startRow}:${endCol}${endRow}`;
  };

  const handleCopy = () => {
    if (selection) {
      const cells: Record<string, CellData> = {};
      
      // Copy all cells in the selection range
      for (let row = Math.min(selection.start.row, selection.end.row); 
           row <= Math.max(selection.start.row, selection.end.row); row++) {
        for (let col = Math.min(selection.start.col, selection.end.col); 
             col <= Math.max(selection.start.col, selection.end.col); col++) {
          const key = getCellKey(row, col);
          cells[key] = data[key] || { value: '', style: {} };
        }
      }
      
      setClipboard({
        start: selection.start,
        end: selection.end,
        cells
      });
      
      const rangeNotation = getCellRangeNotation(selection.start, selection.end);
      addNotification(`Copied (${rangeNotation})`);
    }
  };

  const handleCut = () => {
    if (selection) {
      // Save to clipboard with full range
      const cells: Record<string, CellData> = {};
      
      // Copy all cells in the selection range
      for (let row = Math.min(selection.start.row, selection.end.row); 
           row <= Math.max(selection.start.row, selection.end.row); row++) {
        for (let col = Math.min(selection.start.col, selection.end.col); 
             col <= Math.max(selection.start.col, selection.end.col); col++) {
          const key = getCellKey(row, col);
          cells[key] = data[key] || { value: '', style: {} };
        }
      }
      
      setClipboard({
        start: selection.start,
        end: selection.end,
        cells
      });
      
      // Clear the selected range
      for (let row = Math.min(selection.start.row, selection.end.row); 
           row <= Math.max(selection.start.row, selection.end.row); row++) {
        for (let col = Math.min(selection.start.col, selection.end.col); 
             col <= Math.max(selection.start.col, selection.end.col); col++) {
          updateCellData(row, col, { value: '', style: {} });
        }
      }
      
      const rangeNotation = getCellRangeNotation(selection.start, selection.end);
      addNotification(`Cut (${rangeNotation})`);
    }
  };

  // FIXED PASTE FUNCTION
  const handlePaste = () => {
    if (selectedCell && clipboard) {
      // Calculate dimensions of copied range
      const rowCount = Math.abs(clipboard.end.row - clipboard.start.row) + 1;
      const colCount = Math.abs(clipboard.end.col - clipboard.start.col) + 1;
      
      // Calculate starting positions for source range
      const sourceStartRow = Math.min(clipboard.start.row, clipboard.end.row);
      const sourceStartCol = Math.min(clipboard.start.col, clipboard.end.col);
      
      // Create a batch update
      const newDataState = { ...data };
      
      // Paste all cells in the range
      for (let rowOffset = 0; rowOffset < rowCount; rowOffset++) {
        for (let colOffset = 0; colOffset < colCount; colOffset++) {
          const sourceRow = sourceStartRow + rowOffset;
          const sourceCol = sourceStartCol + colOffset;
          const sourceKey = getCellKey(sourceRow, sourceCol);
          
          const targetRow = selectedCell.row + rowOffset;
          const targetCol = selectedCell.col + colOffset;
          const targetKey = getCellKey(targetRow, targetCol);
          
          // Get the source cell data from clipboard
          const sourceCellData = clipboard.cells[sourceKey];
          if (sourceCellData) {
            // Add to our batch update
            const currentData = newDataState[targetKey] || { value: '' };
            newDataState[targetKey] = {
              ...currentData,
              value: sourceCellData.value,
              formula: sourceCellData.formula,
              style: sourceCellData.style
            };
          }
        }
      }
      
      // Update data once with all changes
      setData(newDataState);
      
      // Add to history
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newDataState);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      
      // Update selection to cover the pasted range
      const pasteEnd = {
        row: selectedCell.row + rowCount - 1,
        col: selectedCell.col + colCount - 1
      };
      
      setSelection({
        start: selectedCell,
        end: pasteEnd
      });
      
      const sourceRange = getCellRangeNotation(clipboard.start, clipboard.end);
      const targetRange = getCellRangeNotation(selectedCell, pasteEnd);
      addNotification(`Pasted (${sourceRange}) to (${targetRange})`);
      
      // Recalculate formulas after paste
      setTimeout(() => {
        recalculateDependentCells(-1, -1);
      }, 0);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const action = handleKeyboardShortcut(event);
    if (!action) return;

    switch (action.type) {
      case 'MOVE':
        handleMove(action.deltaRow, action.deltaCol);
        break;
      case 'START_EDITING':
        setIsEditing(true);
        break;
      case 'STYLE':
        if (selectedCell) {
          const key = `${selectedCell.row},${selectedCell.col}`;
          const newStyle = { ...data[key]?.style, ...action.style };
          updateCellData(selectedCell.row, selectedCell.col, { ...data[key], style: newStyle });
        }
        break;
      case 'COPY':
        handleCopy();
        break;
      case 'CUT':
        handleCut();
        break;
      case 'PASTE':
        handlePaste();
        break;
      case 'UNDO':
        handleUndo();
        break;
      case 'REDO':
        handleRedo();
        break;
    }
  };

  const getNotificationIcon = (message: string) => {
    const iconClass = "w-8 h-8 p-1.5 rounded-full bg-blue-500 text-white";
    
    if (message.startsWith('Copied')) {
      return (
        <div className={iconClass}>
          <ClipboardCopyIcon />
        </div>
      );
    } else if (message.startsWith('Cut')) {
      return (
        <div className={`${iconClass} !bg-rose-500`}>
          <ClipboardIcon />
        </div>
      );
    } else if (message.startsWith('Pasted')) {
      return (
        <div className={`${iconClass} !bg-emerald-500`}>
          <ClipboardIcon />
        </div>
      );
    } else if (message === 'Undo') {
      return (
        <div className={`${iconClass} !bg-amber-500`}>
          <UndoIcon />
        </div>
      );
    } else if (message === 'Redo') {
      return (
        <div className={`${iconClass} !bg-purple-500`}>
          <RedoIcon />
        </div>
      );
    }
    return null;
  };

  const handleTitleChange = async (newTitle: string) => {
    try {
      const { error } = await supabase
        .from('sheets')
        .update({ title: newTitle })
        .eq('id', sheetId);

      if (error) throw error;
      setTitle(newTitle);
      addNotification('Sheet name updated');
    } catch (error) {
      console.error('Error updating sheet title:', error);
      addNotification('Error updating sheet name');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading spreadsheet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <MenuBar 
        title={title} 
        sheetId={sheetId}
        onTitleChange={handleTitleChange}
      />
      <Toolbar 
        selectedCell={selectedCell}
        selection={selection}
        onStyleChange={handleStyleChange}
        getCellData={getCellData}
        onUndo={handleUndo}
        onRedo={handleRedo}
      />
      <div className="flex-grow overflow-auto">
        <Grid 
          rowCount={DEFAULT_ROWS}
          colCount={DEFAULT_COLS}
          selectedCell={selectedCell}
          editingCell={editingCell}
          selection={selection}
          columnSizes={columnSizes}
          rowSizes={rowSizes}
          onSelectCell={handleSelectCell}
          onStartEditing={handleStartEditing}
          onStopEditing={handleStopEditing}
          onCellValueChange={handleCellValueChange}
          onSelectionChange={handleSelectionChange}
          onResizeColumn={handleResizeColumn}
          onResizeRow={handleResizeRow}
          getCellData={getCellData}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="fixed bottom-4 right-4 z-50">
        <AnimatedList className="flex flex-col-reverse gap-3" delay={0}>
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className="flex items-start gap-3 bg-white dark:bg-gray-800 shadow-lg rounded-2xl py-4 px-4 min-w-[300px] border border-gray-100 dark:border-gray-700"
            >
              {getNotificationIcon(notification.message)}
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {notification.message}
                </span>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>Spreadsheet</span>
                  <span>•</span>
                  <span>{formatTimeAgo(notification.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}
        </AnimatedList>
      </div>
    </div>
  );
}