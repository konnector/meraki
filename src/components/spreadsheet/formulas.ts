import { FormulaType } from './types';

type CellAccessFunction = (row: number, col: number) => string;

// Error types for better error handling
export const ERRORS = {
  DIV_BY_ZERO: '#DIV/0!',
  VALUE: '#VALUE!',
  REF: '#REF!',
  NAME: '#NAME?',
  NUM: '#NUM!',
  NULL: '#NULL!',
  INVALID_FORMULA: '#ERROR!'
} as const;

type SpreadsheetError = typeof ERRORS[keyof typeof ERRORS];

/**
 * Parse a cell reference (e.g., A1, B2) to row and column indices
 */
export const parseCellReference = (ref: string): { row: number; col: number } | null => {
  const match = ref.match(/^([A-Za-z]+)(\d+)$/);
  if (!match) return null;
  
  const [, colStr, rowStr] = match;
  const row = parseInt(rowStr) - 1; // Convert to 0-based index
  
  // Convert column letters to 0-based index (A=0, B=1, ..., Z=25, AA=26, ...)
  let col = 0;
  for (let i = 0; i < colStr.length; i++) {
    col = col * 26 + colStr.charCodeAt(i) - (colStr[i] >= 'a' ? 97 : 65);
  }
  
  return { row, col };
};

/**
 * Parse multiple ranges or single cells (e.g., "A1:B3,C1,D1:D5")
 */
export const parseRanges = (rangeStr: string): { startRow: number; startCol: number; endRow: number; endCol: number }[] => {
  const ranges = rangeStr.split(',').map(range => range.trim());
  const result = [];

  for (const range of ranges) {
    if (range.includes(':')) {
      // Handle range (e.g., A1:B3)
      const [start, end] = range.split(':');
      const startRef = parseCellReference(start);
      const endRef = parseCellReference(end);
      
      if (!startRef || !endRef) continue;
      
      result.push({
        startRow: Math.min(startRef.row, endRef.row),
        startCol: Math.min(startRef.col, endRef.col),
        endRow: Math.max(startRef.row, endRef.row),
        endCol: Math.max(startRef.col, endRef.col)
      });
    } else {
      // Handle single cell (e.g., A1)
      const cellRef = parseCellReference(range);
      if (!cellRef) continue;
      
      result.push({
        startRow: cellRef.row,
        startCol: cellRef.col,
        endRow: cellRef.row,
        endCol: cellRef.col
      });
    }
  }
  
  return result;
};

/**
 * Get numeric values from multiple ranges
 */
const getNumericValues = (rangeStr: string, getCellValue: CellAccessFunction): number[] => {
  const ranges = parseRanges(rangeStr);
  const values: number[] = [];
  
  for (const range of ranges) {
    for (let row = range.startRow; row <= range.endRow; row++) {
      for (let col = range.startCol; col <= range.endCol; col++) {
        const value = getCellValue(row, col);
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          values.push(numValue);
        }
      }
    }
  }
  
  return values;
};

/**
 * Calculate the sum of values in multiple ranges
 */
const sum = (rangeStr: string, getCellValue: CellAccessFunction): number | SpreadsheetError => {
  const values = getNumericValues(rangeStr, getCellValue);
  if (values.length === 0) return 0;
  return values.reduce((acc, val) => acc + val, 0);
};

/**
 * Calculate the average of values in multiple ranges
 */
const average = (rangeStr: string, getCellValue: CellAccessFunction): number | SpreadsheetError => {
  const values = getNumericValues(rangeStr, getCellValue);
  if (values.length === 0) return ERRORS.DIV_BY_ZERO;
  return values.reduce((acc, val) => acc + val, 0) / values.length;
};

/**
 * Find the maximum value in multiple ranges
 */
const max = (rangeStr: string, getCellValue: CellAccessFunction): number | SpreadsheetError => {
  const values = getNumericValues(rangeStr, getCellValue);
  if (values.length === 0) return ERRORS.NULL;
  return Math.max(...values);
};

/**
 * Find the minimum value in multiple ranges
 */
const min = (rangeStr: string, getCellValue: CellAccessFunction): number | SpreadsheetError => {
  const values = getNumericValues(rangeStr, getCellValue);
  if (values.length === 0) return ERRORS.NULL;
  return Math.min(...values);
};

/**
 * Count non-empty cells in multiple ranges
 */
const count = (rangeStr: string, getCellValue: CellAccessFunction): number => {
  const ranges = parseRanges(rangeStr);
  let count = 0;
  
  for (const range of ranges) {
    for (let row = range.startRow; row <= range.endRow; row++) {
      for (let col = range.startCol; col <= range.endCol; col++) {
        const value = getCellValue(row, col);
        if (value && value.trim() !== '') {
          count++;
        }
      }
    }
  }
  
  return count;
};

/**
 * Count numeric values in multiple ranges
 */
const countNumbers = (rangeStr: string, getCellValue: CellAccessFunction): number => {
  const ranges = parseRanges(rangeStr);
  let count = 0;
  
  for (const range of ranges) {
    for (let row = range.startRow; row <= range.endRow; row++) {
      for (let col = range.startCol; col <= range.endCol; col++) {
        const value = getCellValue(row, col);
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          count++;
        }
      }
    }
  }
  
  return count;
};

/**
 * Safely evaluate a basic arithmetic expression
 */
const evaluateArithmeticExpression = (expression: string): number => {
  // Remove all whitespace
  expression = expression.replace(/\s/g, '');
  
  // Split into tokens (numbers and operators)
  const tokens = expression.match(/(\d+\.?\d*|\+|\-|\*|\/|\(|\))/g) || [];
  
  // Simple recursive descent parser
  let pos = 0;
  
  const parseExpression = (): number => {
    let result = parseTerm();
    
    while (pos < tokens.length) {
      const token = tokens[pos];
      if (token !== '+' && token !== '-') break;
      
      pos++;
      const term = parseTerm();
      if (token === '+') result += term;
      else result -= term;
    }
    
    return result;
  };
  
  const parseTerm = (): number => {
    let result = parseFactor();
    
    while (pos < tokens.length) {
      const token = tokens[pos];
      if (token !== '*' && token !== '/') break;
      
      pos++;
      const factor = parseFactor();
      if (token === '*') result *= factor;
      else {
        if (factor === 0) throw new Error('Division by zero');
        result /= factor;
      }
    }
    
    return result;
  };
  
  const parseFactor = (): number => {
    const token = tokens[pos];
    pos++;
    
    if (token === '(') {
      const result = parseExpression();
      if (tokens[pos] !== ')') throw new Error('Missing closing parenthesis');
      pos++;
      return result;
    }
    
    const num = parseFloat(token);
    if (isNaN(num)) throw new Error('Invalid number');
    return num;
  };
  
  return parseExpression();
};

/**
 * Evaluate a formula
 */
export const evaluateFormula = (formula: string, getCellValue: CellAccessFunction): string | number | SpreadsheetError => {
  // Check if it's a formula starting with =
  if (!formula.startsWith('=')) {
    return formula;
  }
  
  try {
    // Remove the = prefix and trim whitespace
    const expression = formula.slice(1).trim().toUpperCase();
    
    // Function pattern with support for multiple ranges
    const functionPattern = /^([A-Z]+)\((.*)\)$/;
    const match = expression.match(functionPattern);
    
    if (match) {
      const [, functionName, args] = match;
      
      switch (functionName) {
        case 'SUM':
          return sum(args, getCellValue);
        case 'AVERAGE':
          return average(args, getCellValue);
        case 'MAX':
          return max(args, getCellValue);
        case 'MIN':
          return min(args, getCellValue);
        case 'COUNT':
          return count(args, getCellValue);
        case 'COUNTA':
          return count(args, getCellValue);
        case 'COUNTNUMBERS':
          return countNumbers(args, getCellValue);
        default:
          return ERRORS.NAME;
      }
    }
    
    // If no function match, try to evaluate as a cell reference or basic arithmetic
    // This part will be enhanced in the next implementation
    const cellReferenceRegex = /([A-Za-z]+\d+)/g;
    const expressionWithValues = expression.replace(cellReferenceRegex, (match) => {
      const ref = parseCellReference(match);
      if (!ref) return '0';
      
      const { row, col } = ref;
      const value = getCellValue(row, col);
      const numValue = parseFloat(value);
      return isNaN(numValue) ? '0' : numValue.toString();
    });
    
    // Evaluate the arithmetic expression
    const result = evaluateArithmeticExpression(expressionWithValues);
    return isNaN(result) ? ERRORS.VALUE : result;
  } catch (error) {
    console.error('Error evaluating formula', formula, error);
    return ERRORS.INVALID_FORMULA;
  }
};