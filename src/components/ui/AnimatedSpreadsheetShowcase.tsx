'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Lottie from 'lottie-react'
import cursorAnimation from './icons8-cursor.json'

// Sample cell data with proper typing
interface CellContent {
  value: string;
  style: string;
}

// Email outreach spreadsheet data
const EMAIL_HEADERS = ['', 'A', 'B', 'C', 'D', 'E', 'F'];
const EMAIL_DATA: Record<string, CellContent> = {
  'A1': { value: 'Name', style: 'font-medium' },
  'B1': { value: 'Email', style: 'font-medium' },
  'C1': { value: 'Status', style: 'font-medium' },
  'D1': { value: 'Sent Date', style: 'font-medium' },
  'E1': { value: 'Open', style: 'font-medium' },
  'F1': { value: 'Response', style: 'font-medium' },
  
  'A2': { value: 'John Smith', style: '' },
  'B2': { value: 'john@example.com', style: '' },
  'C2': { value: 'Sent', style: 'text-green-600' },
  'D2': { value: '2023-05-12', style: '' },
  'E2': { value: 'Yes', style: 'text-green-600' },
  'F2': { value: 'Yes', style: 'text-green-600' },
  
  'A3': { value: 'Emily Johnson', style: '' },
  'B3': { value: 'emily@example.com', style: '' },
  'C3': { value: 'Sent', style: 'text-green-600' },
  'D3': { value: '2023-05-12', style: '' },
  'E3': { value: 'Yes', style: 'text-green-600' },
  'F3': { value: 'No', style: 'text-red-500' },
  
  'A4': { value: 'Michael Brown', style: '' },
  'B4': { value: 'michael@example.com', style: '' },
  'C4': { value: 'Sent', style: 'text-green-600' },
  'D4': { value: '2023-05-13', style: '' },
  'E4': { value: 'No', style: 'text-red-500' },
  'F4': { value: 'No', style: 'text-red-500' },
  
  'A5': { value: 'Sarah Wilson', style: '' },
  'B5': { value: 'sarah@example.com', style: '' },
  'C5': { value: 'Sent', style: 'text-green-600' },
  'D5': { value: '2023-05-13', style: '' },
  'E5': { value: 'Yes', style: 'text-green-600' },
  'F5': { value: 'No', style: 'text-red-500' },
  
  'A6': { value: 'Robert Garcia', style: '' },
  'B6': { value: 'robert@example.com', style: '' },
  'C6': { value: 'Sent', style: 'text-green-600' },
  'D6': { value: '2023-05-14', style: '' },
  'E6': { value: 'Yes', style: 'text-green-600' },
  'F6': { value: 'Yes', style: 'text-green-600' },
  
  'A7': { value: 'Jennifer Lee', style: '' },
  'B7': { value: 'jennifer@example.com', style: '' },
  'C7': { value: 'Sent', style: 'text-green-600' },
  'D7': { value: '2023-05-14', style: '' },
  'E7': { value: 'No', style: 'text-red-500' },
  'F7': { value: 'No', style: 'text-red-500' },
  
  'A8': { value: 'David Chen', style: '' },
  'B8': { value: 'david@example.com', style: '' },
  'C8': { value: 'Sent', style: 'text-green-600' },
  'D8': { value: '2023-05-15', style: '' },
  'E8': { value: 'Yes', style: 'text-green-600' },
  'F8': { value: 'No', style: 'text-red-500' },
  
  'A9': { value: 'Lisa Martinez', style: '' },
  'B9': { value: 'lisa@example.com', style: '' },
  'C9': { value: 'Sent', style: 'text-green-600' },
  'D9': { value: '2023-05-15', style: '' },
  'E9': { value: 'Yes', style: 'text-green-600' },
  'F9': { value: 'Yes', style: 'text-green-600' },
  
  'A10': { value: 'James Wilson', style: '' },
  'B10': { value: 'james@example.com', style: '' },
  'C10': { value: 'Sent', style: 'text-green-600' },
  'D10': { value: '2023-05-16', style: '' },
  'E10': { value: 'No', style: 'text-red-500' },
  'F10': { value: 'No', style: 'text-red-500' },
  
  'A11': { value: 'Mary Johnson', style: '' },
  'B11': { value: 'mary@example.com', style: '' },
  'C11': { value: 'Sent', style: 'text-green-600' },
  'D11': { value: '2023-05-16', style: '' },
  'E11': { value: 'Yes', style: 'text-green-600' },
  'F11': { value: 'No', style: 'text-red-500' },
  
  'A12': { value: 'Thomas Brown', style: '' },
  'B12': { value: 'thomas@example.com', style: '' },
  'C12': { value: 'Sent', style: 'text-green-600' },
  'D12': { value: '2023-05-17', style: '' },
  'E12': { value: 'Yes', style: 'text-green-600' },
  'F12': { value: 'No', style: 'text-red-500' },
  
  'A13': { value: 'Amanda Clark', style: '' },
  'B13': { value: 'amanda@example.com', style: '' },
  'C13': { value: 'Sent', style: 'text-green-600' },
  'D13': { value: '2023-05-17', style: '' },
  'E13': { value: 'Yes', style: 'text-green-600' },
  'F13': { value: 'Yes', style: 'text-green-600' },
  
  'A14': { value: 'Kevin Rodriguez', style: '' },
  'B14': { value: 'kevin@example.com', style: '' },
  'C14': { value: 'Sent', style: 'text-green-600' },
  'D14': { value: '2023-05-18', style: '' },
  'E14': { value: 'No', style: 'text-red-500' },
  'F14': { value: 'No', style: 'text-red-500' },
  
  'A15': { value: 'Susan Miller', style: '' },
  'B15': { value: 'susan@example.com', style: '' },
  'C15': { value: 'Sent', style: 'text-green-600' },
  'D15': { value: '2023-05-18', style: '' },
  'E15': { value: 'Yes', style: 'text-green-600' },
  'F15': { value: 'No', style: 'text-red-500' },
  
  // Campaign summary
  'A16': { value: 'Campaign Summary', style: 'font-medium' },
  'B16': { value: '', style: '' },
  'C16': { value: 'Total Sent:', style: 'font-medium' },
  'D16': { value: '15', style: 'font-medium' },
  'E16': { value: 'Open Rate:', style: 'font-medium' },
  'F16': { value: '73%', style: 'font-medium text-blue-600' },
  
  'A17': { value: '', style: '' },
  'B17': { value: '', style: '' },
  'C17': { value: 'Response Rate:', style: 'font-medium' },
  'D17': { value: '27%', style: 'font-medium text-green-600' },
  'E17': { value: '', style: '' },
  'F17': { value: '', style: '' },
};

export function AnimatedSpreadsheetShowcase() {
  const [animationPhase, setAnimationPhase] = useState(0);
  // 0: Initial, 1: Typing, 2: Cursor on button, 3: Click, 4: Building spreadsheet, 5: Scrolling, 6: Complete
  const [typedText, setTypedText] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const promptText = "Create me a spreadsheet for my cold outbound emails";
  
  // Get relative cursor position within the component
  const getCursorPosition = () => {
    if (!containerRef.current) return { x: 0, y: 0 };
    
    const container = containerRef.current.getBoundingClientRect();
    
    if (animationPhase < 2) {
      // Position at the end of typed text
      return { 
        x: 240 + Math.min(typedText.length * 6, 150), 
        y: container.height / 2 - 40
      };
    } else if (animationPhase === 2 || animationPhase === 3) {
      // Position on send button
      if (buttonRef.current) {
        const button = buttonRef.current.getBoundingClientRect();
        return { 
          x: button.right - container.left - 15, 
          y: button.top - container.top + 15
        };
      }
      return { x: container.width - 50, y: container.height / 2 };
    } else {
      // Move out of view
      return { x: -50, y: -50 };
    }
  };
  
  // Animation sequence timing
  useEffect(() => {
    const sequence = [
      setTimeout(() => setAnimationPhase(1), 1000), // Start typing
      setTimeout(() => {
        // Move to button after typing finishes
        const typingDuration = promptText.length * 50;
        setTimeout(() => setAnimationPhase(2), typingDuration + 300);
      }, 1000),
      setTimeout(() => setAnimationPhase(3), 4000), // Click button
      setTimeout(() => setAnimationPhase(4), 5000), // Show spreadsheet
      setTimeout(() => setAnimationPhase(5), 7000), // Start scrolling
      setTimeout(() => setAnimationPhase(6), 9000), // Complete animation
    ];
    
    return () => sequence.forEach(clearTimeout);
  }, []);
  
  // Typing animation effect
  useEffect(() => {
    if (animationPhase !== 1) return;
    
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < promptText.length) {
        setTypedText(promptText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
    
    return () => clearInterval(typingInterval);
  }, [animationPhase]);
  
  // Scrolling animation effect
  useEffect(() => {
    if (animationPhase !== 5 || !scrollContainerRef.current) return;
    
    // Calculate the position of the campaign summary row
    const targetScrollPosition = 600; // Approximate position to show the summary
    
    // Animate scrolling
    const duration = 1500; // ms
    const startTime = performance.now();
    const startPosition = 0;
    
    const animateScroll = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentPosition = startPosition + (targetScrollPosition * easeOutProgress);
      setScrollPosition(currentPosition);
      
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = currentPosition;
      }
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
    
    requestAnimationFrame(animateScroll);
  }, [animationPhase]);
  
  // Calculate cursor position
  const cursorPosition = getCursorPosition();
  
  return (
    <div 
      ref={containerRef}
      className="h-[580px] w-[575px] md:h-[410px] rounded-xl border border-gray-200 bg-white relative overflow-hidden font-cal"
    >
      {/* Animated cursor */}
      {animationPhase <= 3 && (
        <motion.div 
          className="absolute z-50 pointer-events-none"
          style={{ 
            width: 30, 
            height: 30,
            left: 0,
            top: 0
          }}
          animate={{ 
            x: cursorPosition.x,
            y: cursorPosition.y,
            scale: animationPhase === 3 ? 0.9 : 1
          }}
          transition={{ 
            type: "spring",
            damping: 20,
            stiffness: 400,
            duration: 0.5
          }}
        >
          <Lottie 
            animationData={cursorAnimation} 
            loop={animationPhase === 3}
            autoplay={animationPhase === 3}
            style={{ width: 30, height: 30 }}
          />
        </motion.div>
      )}
      
      {/* Ask Meraki Prompt UI */}
      <AnimatePresence>
        {animationPhase <= 3 && (
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center p-6"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-800">Ask Meraki Anything</h2>
              </div>
              
              <div className="p-4">
                <div className="min-h-[100px] mb-4 bg-gray-50 rounded-lg p-3 relative">
                  <div className="text-sm text-gray-800">
                    {typedText}
                    {animationPhase < 2 && (
                      <motion.span 
                        className="inline-block w-[2px] h-[16px] bg-black ml-[1px] align-middle"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <motion.button
                    ref={buttonRef}
                    className="bg-black text-white rounded-full px-4 py-2 flex items-center gap-2"
                    whileTap={{ scale: 0.95 }}
                    animate={animationPhase === 3 ? { scale: [1, 0.9, 1] } : {}}
                  >
                    <span>Send</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Spreadsheet Building Animation */}
      <AnimatePresence>
        {animationPhase >= 4 && (
          <motion.div 
            className="h-full flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Toolbar */}
            <motion.div 
              className="h-10 bg-gray-50 border-b border-gray-200 flex items-center px-3 justify-between"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-md bg-black-500 mr-2"></div>
                <div className="text-sm font-medium text-gray-600">Cold Outbound Email Tracker</div>
              </div>
              
              {/* Email stats at top right */}
              <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: animationPhase >= 5 ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">Open Rate: 73%</div>
                <div className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Response: 27%</div>
              </motion.div>
            </motion.div>
            
            {/* Formula bar */}
            <motion.div 
              className="h-8 border-b border-gray-200 flex items-center px-3 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-xs text-gray-500 mr-2">fx</div>
              <motion.div 
                className="text-xs text-gray-800 font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: animationPhase >= 5 ? 1 : 0 }}
                transition={{ delay: 1 }}
              >
                =COUNTIF(F2:F15,"Yes")/COUNTIF(C2:C15,"Sent")
              </motion.div>
            </motion.div>
            
            {/* Spreadsheet grid */}
            <div 
              ref={scrollContainerRef}
              className="overflow-auto h-[calc(100%-74px)] hide-scrollbar"
            >
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    {EMAIL_HEADERS.map((header, index) => (
                      <motion.th 
                        key={index} 
                        className="sticky top-0 bg-gray-50 border-b border-r border-gray-200 px-2 py-1 text-xs font-medium text-gray-600 min-w-[60px] text-center z-10"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          delay: 0.4 + (index * 0.05),
                          duration: 0.3
                        }}
                      >
                        {header}
                      </motion.th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 17 }, (_, i) => i + 1).map((row) => (
                    <motion.tr 
                      key={row}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 0.6 + (row * 0.04),
                        duration: 0.3
                      }}
                      className={row >= 16 ? "bg-blue-50/20" : ""}
                    >
                      {EMAIL_HEADERS.map((col, colIndex) => {
                        // First column shows row numbers
                        if (colIndex === 0) {
                          return (
                            <td 
                              key={`${row}-${colIndex}`} 
                              className="bg-gray-50 border-r border-b border-gray-200 px-2 py-1 text-xs font-medium text-gray-600 text-center"
                            >
                              {row}
                            </td>
                          );
                        }
                        
                        const cellId = `${col}${row}`;
                        const cellContent = EMAIL_DATA[cellId] || { value: '', style: '' };
                        
                        // Special highlighting for formula cells (removed)
                        const isSummary = row >= 16;
                        
                        return (
                          <motion.td 
                            key={`${row}-${colIndex}`}
                            className={`border-r border-b border-gray-200 px-2 py-1 text-xs ${cellContent.style} ${isSummary ? 'bg-blue-50/20' : 'bg-white'}`}
                          >
                            {cellContent.value}
                          </motion.td>
                        );
                      })}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 