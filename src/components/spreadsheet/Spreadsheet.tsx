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
import { MessageLoading } from "@/components/ui/message-loading";

const DEFAULT_ROWS = 100;
const DEFAULT_COLS = 26;

interface SpreadsheetProps {
  sheetId: string;
  isTemp?: boolean;
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

export default function Spreadsheet({ sheetId, isTemp = false }: SpreadsheetProps) {
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
  const [hasModifications, setHasModifications] = useState(false);

  // Define addNotification before it's used
  const addNotification = useCallback((message: string) => {
    const id = Math.random().toString(36).substring(7);
    const notification = { id, message, timestamp: Date.now() };
    setNotifications(prev => [notification, ...prev]);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  }, []);

  // Load sheet data
  useEffect(() => {
    const loadSheetData = async () => {
      try {
        setIsLoading(true);
        
        // Load sheet metadata
        const { data: sheet, error: sheetError } = await supabase
          .from('sheets')
          .select('*')
          .eq('id', sheetId)
          .single();

        if (sheetError) {
          console.error('Error loading sheet metadata:', sheetError);
          // Don't redirect for PGRST116 (not found) error if we're going to create on the fly
          if (sheetError.code === 'PGRST116') {
            // Sheet might be getting created at the same time in [id]/page.tsx
            // Reload the page once after a short delay
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            return;
          }
          
          // For other errors, show a notification but don't redirect
          addNotification('Error loading sheet data');
          setIsLoading(false);
          return;
        }
        
        if (sheet) {
          setTitle(sheet.title);
        } else {
          // Sheet doesn't exist but we shouldn't redirect
          // It might be getting created on the server
          console.error('No sheet found with id:', sheetId);
          setTitle('Untitled Spreadsheet');
          setIsLoading(false);
          return;
        }

        try {
          // Load sheet data
          const { data: cellData, error: dataError } = await supabase
            .from('sheet_data')
            .select('*')
            .eq('sheet_id', sheetId);

          if (dataError) {
            console.error('Error in loadSheetData:', dataError);
            // Don't throw here - we can continue with empty data
            addNotification('Starting with empty sheet');
          }

          if (cellData && cellData.length > 0) {
            const newData: Record<string, CellData> = {};
            
            // Process cell data
            cellData.forEach((cell) => {
              if (cell.cell_key !== 'metadata' && cell.data) {
                newData[cell.cell_key] = cell.data as CellData;
              }
            });
            
            setData(newData);
            
            // Add to history
            setHistory([newData]);
            setHistoryIndex(0);
          }
          
          // Handle column and row sizes
          try {
            const { data: colSizes, error: colError } = await supabase
              .from('column_sizes')
              .select('*')
              .eq('sheet_id', sheetId);
              
            if (!colError && colSizes) {
              setColumnSizes(colSizes.map(cs => ({ index: cs.column_index, width: cs.width })));
            } else if (colError) {
              console.error('Error loading column sizes:', colError);
            }
          } catch (err) {
            console.error('Error loading column sizes:', err);
          }
          
          try {
            const { data: rowSizes, error: rowError } = await supabase
              .from('row_sizes')
              .select('*')
              .eq('sheet_id', sheetId);
              
            if (!rowError && rowSizes) {
              setRowSizes(rowSizes.map(rs => ({ index: rs.row_index, height: rs.height })));
            } else if (rowError) {
              console.error('Error loading row sizes:', rowError);
            }
          } catch (err) {
            console.error('Error loading row sizes:', err);
          }
        } catch (e) {
          console.error('Error in data loading section:', e);
          // Continue with empty data
          addNotification('Starting with empty sheet');
        }
      } catch (e) {
        console.error('Error in loadSheetData:', e);
        addNotification('Error loading spreadsheet');
      } finally {
        setIsLoading(false);
      }
    };

    loadSheetData();
  }, [sheetId, supabase, addNotification]);

  // Save changes to the database
  const saveChanges = useCallback(async (key: string, cellData: CellData) => {
    try {
      // First mark the sheet as non-temporary if it was temporary
      if (isTemp && hasModifications) {
        const { error: updateError } = await supabase
          .from('sheets')
          .update({ is_temporary: false })
          .eq('id', sheetId);
          
        if (updateError) {
          console.error('Error updating sheet temporary status:', updateError);
        }
      }
      
      // Check if the cell data already exists
      const { data: existingData, error: getError } = await supabase
        .from('sheet_data')
        .select('*')
        .eq('sheet_id', sheetId)
        .eq('cell_key', key)
        .maybeSingle();
      
      // Exit early if there was an error checking existing data
      if (getError) {
        console.error('Error checking existing cell data:', getError);
        return;
      }
      
      let error;
      
      // Update the updated_at timestamp
      const { error: metaError } = await supabase
        .from('sheets')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', sheetId);
        
      if (metaError) {
        console.error('Error updating sheet timestamp:', metaError);
      }
        
      if (existingData) {
        // Update existing cell data
        const { error: updateError } = await supabase
          .from('sheet_data')
          .update({ data: cellData })
          .eq('sheet_id', sheetId)
          .eq('cell_key', key);
          
        error = updateError;
      } else {
        // Insert new cell data
        const { error: insertError } = await supabase
          .from('sheet_data')
          .insert({
            sheet_id: sheetId,
            cell_key: key,
            data: cellData
          });
          
        error = insertError;
      }

      if (error) throw error;
    } catch (error) {
      console.error('Error saving cell:', error);
      addNotification('Error saving changes');
    }
  }, [sheetId, supabase, addNotification, isTemp, hasModifications]);

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
    setHasModifications(true);

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
        .update({ 
          title: newTitle,
          is_temporary: false // Once titled, it's no longer temporary
        })
        .eq('id', sheetId);

      if (error) throw error;
      
      setTitle(newTitle);
      setHasModifications(true);
      addNotification('Title updated');
    } catch (error) {
      console.error('Error updating title:', error);
      addNotification('Error updating title');
    }
  };

  // Add cleanup effect for temporary sheets
  useEffect(() => {
    // We'll use a visit counter to track if the sheet was actually used
    const visitKey = `sheet_visit_${sheetId}`;
    
    // Check if this is the first visit to this sheet
    const isFirstVisit = !localStorage.getItem(visitKey);
    
    // Mark this sheet as visited
    if (isFirstVisit) {
      localStorage.setItem(visitKey, 'visited');
    }
    
    // Only add cleanup logic after the sheet is fully loaded
    // This prevents cleanup on the initial load
    if (isLoading) {
      return;
    }
    
    const handleBeforeUnload = async (e: BeforeUnloadEvent) => {
      if (isTemp && !hasModifications) {
        // Don't delete on the first page load/rendering
        if (isFirstVisit) {
          return;
        }
        
        // Delete the sheet if it's temporary and has no modifications
        await supabase
          .from('sheets')
          .delete()
          .eq('id', sheetId);
          
        // Clean up the localStorage item
        localStorage.removeItem(visitKey);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
      // Only delete on unmount if not the first visit and no modifications
      if (isTemp && !hasModifications && !isFirstVisit) {
        const cleanup = async () => {
          try {
            await supabase
              .from('sheets')
              .delete()
              .eq('id', sheetId);
            console.log('Temporary sheet deleted');
            
            // Clean up the localStorage item
            localStorage.removeItem(visitKey);
          } catch (error) {
            console.error('Error deleting temporary sheet:', error);
          }
        };
        void cleanup();
      }
    };
  }, [isTemp, hasModifications, sheetId, supabase, isLoading]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 text-black mx-auto">
            <MessageLoading />
          </div>
          <p className="text-sm text-gray-600">Loading spreadsheet...</p>
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