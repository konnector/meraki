export interface CellData {
  value: string;
  formula?: string;
  style?: CellStyle;
}

export interface CellStyle {
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  textDecoration?: 'none' | 'underline' | 'line-through';
  textAlign?: 'left' | 'center' | 'right';
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  fontFamily?: string;
  numberFormat?: string; // Add this new property
}

export interface CellPosition {
  row: number;
  col: number;
}

export interface Selection {
  start: CellPosition;
  end: CellPosition;
}

export interface ColumnSize {
  index: number;
  width: number;
}

export interface RowSize {
  index: number;
  height: number;
}

export enum FormulaType {
  SUM = 'SUM',
  AVERAGE = 'AVERAGE',
  MAX = 'MAX',
  MIN = 'MIN',
  COUNT = 'COUNT',
}