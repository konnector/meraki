'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { MessageSquare, Check, RefreshCw, Terminal } from 'lucide-react'

export function AISpreadsheetDemo() {
  const controls = useAnimation()
  const [currentStage, setCurrentStage] = useState(0)
  const [typing, setTyping] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  
  const prompts = [
    "Create a sales dashboard",
    "Show me last month's revenue",
    "Format profits in green",
    "Create chart from this data"
  ]
  
  useEffect(() => {
    // Start the animation sequence
    const typeCommand = async () => {
      const command = prompts[currentStage]
      let typedText = ''
      
      // Clear previous command
      setTyping('')
      
      // Type the command letter by letter
      for (let i = 0; i < command.length; i++) {
        typedText += command[i]
        setTyping(typedText)
        await new Promise(r => setTimeout(r, 70 + Math.random() * 40))
      }
      
      // Wait for a moment
      await new Promise(r => setTimeout(r, 700))
      
      // Hide cursor while "processing"
      setShowCursor(false)
      
      // Wait for processing
      await new Promise(r => setTimeout(r, 1200))
      
      // Move to next stage
      setCurrentStage((prev) => (prev + 1) % prompts.length)
      
      // Show cursor again
      setShowCursor(true)
    }
    
    // Start the animation after mounting
    const timeout = setTimeout(() => {
      typeCommand()
    }, 1000)
    
    return () => clearTimeout(timeout)
  }, [currentStage, prompts])
  
  // Spreadsheet data for the demo
  const tableData = [
    { product: 'Product A', sales: '125', revenue: '$12,500', profit: '$3,750' },
    { product: 'Product B', sales: '85', revenue: '$8,500', profit: '$2,550' },
    { product: 'Product C', sales: '210', revenue: '$18,900', profit: '$5,670' },
    { product: 'Product D', sales: '65', revenue: '$5,850', profit: '$1,170' }
  ]
  
  return (
    <div className="h-full w-full rounded-xl bg-white overflow-hidden flex flex-col">
      {/* Top Bar */}
      <div className="bg-gray-100 border-b border-gray-200 py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-white p-1 rounded shadow-sm">
            <Terminal size={16} className="text-gray-700" />
          </div>
          <span className="text-sm font-medium">Meraki AI Spreadsheet</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Command Input Area */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm">
            <div className="p-2 bg-gray-100 rounded-full min-w-[36px] min-h-[36px] flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-gray-700" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-800 font-mono relative">
                {typing}<span className={`inline-block w-2 h-4 bg-gray-800 ml-0.5 ${showCursor ? 'animate-blink' : 'opacity-0'}`}></span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Response Area */}
        <div className="flex-1 p-4 overflow-hidden relative">
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* AI is thinking indicator */}
            {!showCursor && (
              <div className="flex items-center gap-2 mb-4 text-gray-500 text-sm">
                <RefreshCw size={14} className="animate-spin" />
                <span>Processing your request...</span>
              </div>
            )}
            
            {/* Spreadsheet */}
            <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 p-2 border-b border-gray-200 flex justify-between items-center">
                <div className="text-sm font-medium text-gray-700">Sales Dashboard</div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Check size={12} className="text-green-500" />
                  <span>Updated just now</span>
                </div>
              </div>
              
              {/* Table */}
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-3 border-b border-r border-gray-200 text-left font-medium">Product</th>
                      <th className="p-3 border-b border-r border-gray-200 text-left font-medium">Sales</th>
                      <th className="p-3 border-b border-r border-gray-200 text-left font-medium">Revenue</th>
                      <th className="p-3 border-b border-gray-200 text-left font-medium">Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, i) => (
                      <motion.tr 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * i }}
                        className="border-b border-gray-200 last:border-b-0"
                      >
                        <td className="p-3 border-r border-gray-200">{row.product}</td>
                        <td className="p-3 border-r border-gray-200">{row.sales}</td>
                        <td className="p-3 border-r border-gray-200">{row.revenue}</td>
                        <td className={`p-3 ${currentStage === 2 ? 'bg-green-50 text-green-700' : ''}`}>
                          {row.profit}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Chart appears if on the last stage */}
            {currentStage === 3 && (
              <motion.div 
                className="mt-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-sm font-medium mb-2">Revenue by Product</div>
                <div className="h-32 flex items-end gap-6 pt-4">
                  {/* Simple bar chart */}
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-blue-100 rounded-t" style={{ height: '60%' }}></div>
                    <div className="mt-1 text-xs text-gray-500">Product A</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-blue-100 rounded-t" style={{ height: '40%' }}></div>
                    <div className="mt-1 text-xs text-gray-500">Product B</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-blue-100 rounded-t" style={{ height: '90%' }}></div>
                    <div className="mt-1 text-xs text-gray-500">Product C</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-blue-100 rounded-t" style={{ height: '30%' }}></div>
                    <div className="mt-1 text-xs text-gray-500">Product D</div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  )
} 