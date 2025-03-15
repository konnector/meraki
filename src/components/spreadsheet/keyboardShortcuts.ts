import { CellStyle } from './types';

type KeyboardAction = 
  | { type: 'MOVE'; deltaRow: number; deltaCol: number }
  | { type: 'START_EDITING' }
  | { type: 'STYLE'; style: Partial<CellStyle> }
  | { type: 'COPY' }
  | { type: 'CUT' }
  | { type: 'PASTE' }
  | { type: 'UNDO' }
  | { type: 'REDO' };

/**
 * Handle keyboard shortcuts for the spreadsheet
 */
export const handleKeyboardShortcut = (event: React.KeyboardEvent): KeyboardAction | null => {
  const isCtrlPressed = event.ctrlKey || event.metaKey;
  const isShiftPressed = event.shiftKey;

  // Navigation with arrow keys
  if (!isCtrlPressed && !event.altKey && !isShiftPressed) {
    switch (event.key) {
      case 'ArrowUp':
        return { type: 'MOVE', deltaRow: -1, deltaCol: 0 };
      case 'ArrowDown':
        return { type: 'MOVE', deltaRow: 1, deltaCol: 0 };
      case 'ArrowLeft':
        return { type: 'MOVE', deltaRow: 0, deltaCol: -1 };
      case 'ArrowRight':
        return { type: 'MOVE', deltaRow: 0, deltaCol: 1 };
      case 'Enter':
        if (!event.shiftKey) {
          return { type: 'START_EDITING' };
        }
        break;
    }
  }
  
  // Formatting shortcuts with Ctrl key
  if (isCtrlPressed) {
    switch (event.key.toLowerCase()) {
      case 'b': // Bold
        event.preventDefault();
        return { type: 'STYLE', style: { fontWeight: 'bold' } };
      
      case 'i': // Italic
        event.preventDefault();
        return { type: 'STYLE', style: { fontStyle: 'italic' } };
      
      case 'u': // Underline
        event.preventDefault();
        return { type: 'STYLE', style: { textDecoration: 'underline' } };
      
      case 'c': // Copy
        return { type: 'COPY' };
      
      case 'x': // Cut
        return { type: 'CUT' };
      
      case 'v': // Paste
        return { type: 'PASTE' };

      case 'z': // Undo
        event.preventDefault();
        if (isShiftPressed) {
          return { type: 'REDO' };
        }
        return { type: 'UNDO' };

      case 'y': // Redo (alternative)
        event.preventDefault();
        return { type: 'REDO' };
    }
  }
  
  return null;
};