'use client';

import { useState, useCallback, useEffect } from 'react';
import { CellData, CellPosition, Selection } from './types';
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { 
  Share2, 
  ChevronDown, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Undo2,
  Redo2,
  Percent,
  Hash,
  DollarSign,
  Calendar
} from 'lucide-react';

interface ToolbarProps {
  selectedCell: CellPosition | null;
  selection: Selection | null;
  onStyleChange: (style: Partial<CellData['style']>) => void;
  getCellData: (row: number, col: number) => CellData;
  onUndo?: () => void; // Add undo functionality
  onRedo?: () => void; // Add redo functionality
}

export default function Toolbar({
  selectedCell,
  selection,
  onStyleChange,
  getCellData,
  onUndo = () => {},
  onRedo = () => {}
}: ToolbarProps) {
  const [fontSizeOpen, setFontSizeOpen] = useState(false);
  const [fontFamilyOpen, setFontFamilyOpen] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [bgColorPickerOpen, setBgColorPickerOpen] = useState(false);
  const [numberFormatOpen, setNumberFormatOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [zoomOpen, setZoomOpen] = useState(false);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.toolbar-dropdown')) {
        setFontSizeOpen(false);
        setFontFamilyOpen(false);
        setColorPickerOpen(false);
        setBgColorPickerOpen(false);
        setNumberFormatOpen(false);
        setZoomOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fontSizes = ['8px', '9px', '10px', '11px', '12px', '14px', '16px', '18px', '20px', '22px', '24px', '28px', '32px', '36px', '42px', '48px'];
  
  const fontFamilies = [
    { name: 'Arial', value: 'Arial, sans-serif' },
    { name: 'Calibri', value: 'Calibri, sans-serif' },
    { name: 'Comic Sans MS', value: '"Comic Sans MS", cursive' },
    { name: 'Courier New', value: '"Courier New", monospace' },
    { name: 'Georgia', value: 'Georgia, serif' },
    { name: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
    { name: 'Times New Roman', value: '"Times New Roman", serif' },
    { name: 'Verdana', value: 'Verdana, sans-serif' }
  ];
  
  const colors = [
    '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff',
    '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff',
    '#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc',
    '#dd7e6b', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#a4c2f4', '#9fc5e8', '#b4a7d6', '#d5a6bd',
    '#cc4125', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6d9eeb', '#6fa8dc', '#8e7cc3', '#c27ba0',
    '#a61c00', '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3c78d8', '#3d85c6', '#674ea7', '#a64d79',
    '#85200c', '#990000', '#b45f06', '#bf9000', '#38761d', '#134f5c', '#1155cc', '#0b5394', '#351c75', '#741b47',
    '#5b0f00', '#660000', '#783f04', '#7f6000', '#274e13', '#0c343d', '#1c4587', '#073763', '#20124d', '#4c1130'
  ];

  // Number formatting options
  const numberFormats = [
    { name: 'Automatic', value: 'auto', icon: <Hash size={16} /> },
    { name: 'Plain text', value: 'text', icon: null },
    { name: 'Number', value: 'number', icon: <Hash size={16} /> },
    { name: 'Percent', value: 'percent', icon: <Percent size={16} /> },
    { name: 'Currency ($)', value: 'currency', icon: <DollarSign size={16} /> },
    { name: 'Date', value: 'date', icon: <Calendar size={16} /> },
  ];

  // Zoom levels
  const zoomLevels = [50, 75, 90, 100, 125, 150, 200];
  
  const getCurrentCellStyle = useCallback(() => {
    if (!selectedCell) return {};
    
    const { row, col } = selectedCell;
    const cellData = getCellData(row, col);
    return cellData.style || {};
  }, [selectedCell, getCellData]);
  
  const toggleBold = useCallback(() => {
    const currentStyle = getCurrentCellStyle();
    onStyleChange({
      fontWeight: currentStyle.fontWeight === 'bold' ? 'normal' : 'bold'
    });
  }, [getCurrentCellStyle, onStyleChange]);
  
  const toggleItalic = useCallback(() => {
    const currentStyle = getCurrentCellStyle();
    onStyleChange({
      fontStyle: currentStyle.fontStyle === 'italic' ? 'normal' : 'italic'
    });
  }, [getCurrentCellStyle, onStyleChange]);
  
  const toggleUnderline = useCallback(() => {
    const currentStyle = getCurrentCellStyle();
    onStyleChange({
      textDecoration: currentStyle.textDecoration === 'underline' ? 'none' : 'underline'
    });
  }, [getCurrentCellStyle, onStyleChange]);
  
  const setTextAlign = useCallback((align: 'left' | 'center' | 'right') => {
    onStyleChange({ textAlign: align });
  }, [onStyleChange]);
  
  const setFontSize = useCallback((size: string) => {
    onStyleChange({ fontSize: size });
    setFontSizeOpen(false);
  }, [onStyleChange]);
  
  const setFontFamily = useCallback((family: string) => {
    onStyleChange({ fontFamily: family });
    setFontFamilyOpen(false);
  }, [onStyleChange]);
  
  const setTextColor = useCallback((color: string) => {
    onStyleChange({ color });
    setColorPickerOpen(false);
  }, [onStyleChange]);
  
  const setBackgroundColor = useCallback((color: string) => {
    onStyleChange({ backgroundColor: color });
    setBgColorPickerOpen(false);
  }, [onStyleChange]);

  const setNumberFormat = useCallback((format: string) => {
    // This will add the number format to the cell's style properties
    onStyleChange({ numberFormat: format });
    setNumberFormatOpen(false);
  }, [onStyleChange]);

  const handleZoomChange = useCallback((level: number) => {
    setZoomLevel(level);
    setZoomOpen(false);
    // Here you would implement the actual zoom functionality
    // For example, by setting a CSS transform scale on your spreadsheet
    const spreadsheetElement = document.querySelector('.spreadsheet-container');
    if (spreadsheetElement) {
      (spreadsheetElement as HTMLElement).style.transform = `scale(${level / 100})`;
      (spreadsheetElement as HTMLElement).style.transformOrigin = 'top left';
    }
  }, []);
  
  const currentStyle = getCurrentCellStyle();
  
  return (
    <div className="flex flex-col w-full">
      {/* Updated toolbar styling to match Google Sheets */}
      <div className="flex items-center py-1 px-2 border-b border-gray-200 bg-white shadow-sm">
        {/* Left navigation buttons (undo/redo) */}
        <div className="flex mr-2">
          <button 
            className="p-1 text-gray-600 hover:bg-gray-100 rounded-sm disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={onUndo}
            title="Undo"
          >
            <Undo2 size={18} />
          </button>
          <button 
            className="p-1 text-gray-600 hover:bg-gray-100 rounded-sm disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={onRedo}
            title="Redo"
          >
            <Redo2 size={18} />
          </button>
        </div>

        {/* Font Controls */}
        <div className="flex items-center space-x-1 border-r border-gray-200 pr-1">
          {/* Font Family Dropdown */}
          <div className="relative toolbar-dropdown">
            <button 
              className="flex items-center h-8 px-2 border border-transparent hover:border-gray-300 rounded text-sm text-gray-700 disabled:opacity-50"
              onClick={() => setFontFamilyOpen(!fontFamilyOpen)}
              disabled={!selectedCell}
            >
              <span className="truncate max-w-24">{currentStyle.fontFamily ? 
                fontFamilies.find(f => f.value === currentStyle.fontFamily)?.name || 'Arial' : 
                'Arial'}</span>
              <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            
            {fontFamilyOpen && (
              <div className="absolute left-0 top-full mt-1 w-40 max-h-60 overflow-y-auto bg-white border border-gray-200 shadow-lg rounded-md z-50">
                {fontFamilies.map((font) => (
                  <div 
                    key={font.value} 
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm" 
                    style={{ fontFamily: font.value }}
                    onClick={() => setFontFamily(font.value)}
                  >
                    {font.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Font Size Dropdown */}
          <div className="relative toolbar-dropdown">
            <button 
              className="flex items-center h-8 px-2 border border-transparent hover:border-gray-300 rounded text-sm text-gray-700 disabled:opacity-50"
              onClick={() => setFontSizeOpen(!fontSizeOpen)}
              disabled={!selectedCell}
            >
              <span>{currentStyle.fontSize || '11'}</span>
              <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            
            {fontSizeOpen && (
              <div className="absolute left-0 top-full mt-1 w-20 max-h-60 overflow-y-auto bg-white border border-gray-200 shadow-lg rounded-md z-50">
                {fontSizes.map((size) => (
                  <div 
                    key={size} 
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm" 
                    onClick={() => setFontSize(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Text Formatting Controls */}
        <div className="flex items-center space-x-1 px-1 border-r border-gray-200">
          {/* Bold Button */}
          <button 
            className={`p-1.5 rounded-sm hover:bg-gray-100 ${currentStyle.fontWeight === 'bold' ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
            onClick={toggleBold}
            disabled={!selectedCell}
            title="Bold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
              <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
            </svg>
          </button>
          
          {/* Italic Button */}
          <button 
            className={`p-1.5 rounded-sm hover:bg-gray-100 ${currentStyle.fontStyle === 'italic' ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
            onClick={toggleItalic}
            disabled={!selectedCell}
            title="Italic"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="4" x2="10" y2="4"></line>
              <line x1="14" y1="20" x2="5" y2="20"></line>
              <line x1="15" y1="4" x2="9" y2="20"></line>
            </svg>
          </button>
          
          {/* Underline Button */}
          <button 
            className={`p-1.5 rounded-sm hover:bg-gray-100 ${currentStyle.textDecoration === 'underline' ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
            onClick={toggleUnderline}
            disabled={!selectedCell}
            title="Underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path>
              <line x1="4" y1="21" x2="20" y2="21"></line>
            </svg>
          </button>
          
          {/* Strikethrough Button (placeholder, not functional) */}
          <button 
            className="p-1.5 rounded-sm hover:bg-gray-100 text-gray-700 opacity-50"
            disabled={true}
            title="Strikethrough (disabled)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 9V6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v3"></path>
              <path d="M16 15v3a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-3"></path>
              <line x1="4" y1="12" x2="20" y2="12"></line>
            </svg>
          </button>
        </div>
        
        {/* Text Color and Background Color */}
        <div className="flex items-center space-x-1 px-1 border-r border-gray-200">
          {/* Text Color */}
          <div className="relative toolbar-dropdown">
            <button 
              className="p-1.5 rounded-sm hover:bg-gray-100 text-gray-700 flex items-center"
              onClick={() => setColorPickerOpen(!colorPickerOpen)}
              disabled={!selectedCell}
              title="Text color"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 7h6l-3 8z"></path>
                <line x1="4" y1="20" x2="20" y2="20"></line>
              </svg>
              <div 
                className="w-2 h-2 ml-1"
                style={{ backgroundColor: currentStyle.color || '#000000' }}
              ></div>
            </button>
            
            {colorPickerOpen && (
              <div className="absolute left-0 top-full mt-1 p-2 w-64 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                <div className="grid grid-cols-10 gap-1">
                  {colors.map((color) => (
                    <div 
                      key={color} 
                      className="w-5 h-5 cursor-pointer border border-gray-300 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => setTextColor(color)}
                    ></div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Background Color */}
          <div className="relative toolbar-dropdown">
            <button 
              className="p-1.5 rounded-sm hover:bg-gray-100 text-gray-700 flex items-center"
              onClick={() => setBgColorPickerOpen(!bgColorPickerOpen)}
              disabled={!selectedCell}
              title="Fill color"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 12l3.6 3.6L18 4.033"></path>
                <path d="M18 4l2 2V4h-2z"></path>
                <path d="M21 14l-9 9h9"></path>
              </svg>
              <div 
                className="w-2 h-2 ml-1"
                style={{ backgroundColor: currentStyle.backgroundColor || 'transparent', border: currentStyle.backgroundColor ? 'none' : '1px solid #ccc' }}
              ></div>
            </button>
            
            {bgColorPickerOpen && (
              <div className="absolute left-0 top-full mt-1 p-2 w-64 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                <div className="grid grid-cols-10 gap-1">
                  {colors.map((color) => (
                    <div 
                      key={color} 
                      className="w-5 h-5 cursor-pointer border border-gray-300 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => setBackgroundColor(color)}
                    ></div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Alignment Controls */}
        <div className="flex items-center space-x-1 px-1 border-r border-gray-200">
          <button 
            className={`p-1.5 rounded-sm hover:bg-gray-100 ${currentStyle.textAlign === 'left' ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
            onClick={() => setTextAlign('left')}
            disabled={!selectedCell}
            title="Align left"
          >
            <AlignLeft size={16} />
          </button>
          
          <button 
            className={`p-1.5 rounded-sm hover:bg-gray-100 ${currentStyle.textAlign === 'center' ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
            onClick={() => setTextAlign('center')}
            disabled={!selectedCell}
            title="Align center"
          >
            <AlignCenter size={16} />
          </button>
          
          <button 
            className={`p-1.5 rounded-sm hover:bg-gray-100 ${currentStyle.textAlign === 'right' ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
            onClick={() => setTextAlign('right')}
            disabled={!selectedCell}
            title="Align right"
          >
            <AlignRight size={16} />
          </button>
        </div>

        {/* Number Format Controls */}
        <div className="flex items-center space-x-1 px-1 border-r border-gray-200">
          <div className="relative toolbar-dropdown">
            <button 
              className="flex items-center h-8 px-2 border border-transparent hover:border-gray-300 rounded text-sm text-gray-700 disabled:opacity-50"
              onClick={() => setNumberFormatOpen(!numberFormatOpen)}
              disabled={!selectedCell}
              title="Number format"
            >
              {currentStyle.numberFormat && currentStyle.numberFormat !== 'auto' && currentStyle.numberFormat !== 'text' ? 
                numberFormats.find(f => f.value === currentStyle.numberFormat)?.icon || <Hash size={16} /> : 
                <Hash size={16} />}
              <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            
            {numberFormatOpen && (
              <div className="absolute left-0 top-full mt-1 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                {numberFormats.map((format) => (
                  <div 
                    key={format.value} 
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center ${currentStyle.numberFormat === format.value ? 'bg-blue-50 text-blue-600' : ''}`}
                    onClick={() => setNumberFormat(format.value)}
                  >
                    {format.icon && <span className="mr-2">{format.icon}</span>}
                    {format.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Zoom Control */}
        <div className="flex items-center space-x-1 px-1 border-r border-gray-200">
          <div className="relative toolbar-dropdown">
            <button 
              className="flex items-center h-8 px-2 border border-transparent hover:border-gray-300 rounded text-sm text-gray-700"
              onClick={() => setZoomOpen(!zoomOpen)}
              title="Zoom level"
            >
              <span>{zoomLevel}%</span>
              <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            
            {zoomOpen && (
              <div className="absolute left-0 top-full mt-1 w-24 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                {zoomLevels.map((level) => (
                  <div 
                    key={level} 
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm ${zoomLevel === level ? 'bg-blue-50 text-blue-600' : ''}`}
                    onClick={() => handleZoomChange(level)}
                  >
                    {level}%
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Format selector */}
        <div className="flex items-center space-x-1 px-1">
          <button className="flex items-center h-8 px-2 border border-transparent hover:border-gray-300 rounded text-sm text-gray-700">
            <span>General</span>
            <ChevronDown className="ml-1 w-4 h-4" />
          </button>
        </div>

        {/* Spacer to push Share button to the right */}
        <div className="flex-grow"></div>
        
        {/* Keep the original Share button */}
        <div className="flex items-center pl-4">
          <RainbowButton 
            onClick={() => {}} 
            className="h-8 px-5 rounded-lg text-sm font-medium bg-opacity-90 dark:text-white hover:opacity-90 transition-opacity"
          >
            <Share2 className="w-3.5 h-3.5 mr-2" />
            Share
          </RainbowButton>
        </div>
      </div>
    </div>
  );
}