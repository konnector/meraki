import { FormulaType } from './types';

type CellAccessFunction = (row: number, col: number) => string;

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
 * Parse a cell range (e.g., A1:B3) to start and end cell positions
 */
export const parseCellRange = (range: string): { startRow: number; startCol: number; endRow: number; endCol: number } | null => {
  const [start, end] = range.split(':');
  if (!start || !end) return null;
  
  const startRef = parseCellReference(start);
  const endRef = parseCellReference(end);
  
  if (!startRef || !endRef) return null;
  
  return {
    startRow: startRef.row,
    startCol: startRef.col,
    endRow: endRef.row,
    endCol: endRef.col
  };
};

/**
 * Get values from a cell range
 */
const getCellRangeValues = (range: string, getCellValue: CellAccessFunction): number[] => {
  const rangeInfo = parseCellRange(range);
  if (!rangeInfo) return [];
  
  const { startRow, startCol, endRow, endCol } = rangeInfo;
  const values: number[] = [];
  
  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      const value = parseFloat(getCellValue(row, col));
      if (!isNaN(value)) {
        values.push(value);
      }
    }
  }
  
  return values;
};

/**
 * Calculate the sum of values in a range
 */
const sum = (range: string, getCellValue: CellAccessFunction): number => {
  const values = getCellRangeValues(range, getCellValue);
  return values.reduce((acc, val) => acc + val, 0);
};

/**
 * Calculate the average of values in a range
 */
const average = (range: string, getCellValue: CellAccessFunction): number => {
  const values = getCellRangeValues(range, getCellValue);
  if (values.length === 0) return 0;
  return values.reduce((acc, val) => acc + val, 0) / values.length;
};

/**
 * Find the maximum value in a range
 */
const max = (range: string, getCellValue: CellAccessFunction): number => {
  const values = getCellRangeValues(range, getCellValue);
  if (values.length === 0) return 0;
  return Math.max(...values);
};

/**
 * Find the minimum value in a range
 */
const min = (range: string, getCellValue: CellAccessFunction): number => {
  const values = getCellRangeValues(range, getCellValue);
  if (values.length === 0) return 0;
  return Math.min(...values);
};

/**
 * Count non-empty cells in a range
 */
const count = (range: string, getCellValue: CellAccessFunction): number => {
  const rangeInfo = parseCellRange(range);
  if (!rangeInfo) return 0;
  
  const { startRow, startCol, endRow, endCol } = rangeInfo;
  let count = 0;
  
  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      const value = getCellValue(row, col);
      if (value && value.trim() !== '') {
        count++;
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
export const evaluateFormula = (formula: string, getCellValue: CellAccessFunction): number | string | undefined => {
  // Check if it's a formula starting with =
  if (!formula.startsWith('=')) {
    return formula;
  }
  
  try {
    // Remove the = prefix
    const expression = formula.slice(1).trim().toUpperCase();
    
    // Check for built-in functions: SUM, AVERAGE, MAX, MIN, COUNT
    const sumMatch = expression.match(/^SUM\(([A-Z0-9:]+)\)$/);
    if (sumMatch) {
      return sum(sumMatch[1], getCellValue);
    }
    
    const averageMatch = expression.match(/^AVERAGE\(([A-Z0-9:]+)\)$/);
    if (averageMatch) {
      return average(averageMatch[1], getCellValue);
    }
    
    const maxMatch = expression.match(/^MAX\(([A-Z0-9:]+)\)$/);
    if (maxMatch) {
      return max(maxMatch[1], getCellValue);
    }
    
    const minMatch = expression.match(/^MIN\(([A-Z0-9:]+)\)$/);
    if (minMatch) {
      return min(minMatch[1], getCellValue);
    }
    
    const countMatch = expression.match(/^COUNT\(([A-Z0-9:]+)\)$/);
    if (countMatch) {
      return count(countMatch[1], getCellValue);
    }
    
    // Handle cell references like A1, B2, etc.
    // Replace cell references with their values
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
    return evaluateArithmeticExpression(expressionWithValues);
  } catch (error) {
    console.error('Error evaluating formula', formula, error);
    return 'ERROR';
  }
};