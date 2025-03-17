'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Star, User, Settings, CreditCard, LogOut, 
  FileText, Copy, Scissors, ClipboardPaste, Search, ChevronDown,
  Plus, BarChart3, FunctionSquare, Image, Grid2X2
} from 'lucide-react';
import styles from './MenuBar.module.css';

interface MenuBarProps {
  title: string;
  sheetId: string;
  onTitleChange?: (newTitle: string) => void;
}

export default function MenuBar({ title, sheetId, onTitleChange }: MenuBarProps) {
  const [isStarred, setIsStarred] = useState(false);
  const [isStarring, setIsStarring] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [userEmail, setUserEmail] = useState<string>("");
  const supabase = createClientComponentClient();
  
  // Example of how to add icons to menu items
  const fileMenuItems = [
    { label: 'New', icon: <FileText className="mr-2 h-4 w-4" /> },
    { label: 'Open', icon: <FileText className="mr-2 h-4 w-4" /> },
    { label: 'Make a copy', icon: <Copy className="mr-2 h-4 w-4" /> },
    { label: 'Share', icon: <User className="mr-2 h-4 w-4" /> },
    { label: 'Email', icon: <FileText className="mr-2 h-4 w-4" /> },
    { label: 'Download', icon: <FileText className="mr-2 h-4 w-4" /> },
    { label: 'Rename', icon: <FileText className="mr-2 h-4 w-4" /> },
    { label: 'Move', icon: <FileText className="mr-2 h-4 w-4" /> },
    { label: 'Delete', icon: <FileText className="mr-2 h-4 w-4" /> },
  ];
  
  const menuItems = {
    File: ['New', 'Open', 'Make a copy', 'Share', 'Email', 'Download', 'Rename', 'Move', 'Delete'],
    Edit: ['Undo', 'Redo', 'Cut', 'Copy', 'Paste', 'Find and replace', 'Select all'],
    Insert: ['Row above', 'Row below', 'Column left', 'Column right', 'Chart', 'Function', 'Image'],
    Format: ['Number', 'Text', 'Borders', 'Alignment', 'Font size', 'Font color', 'Cell color'],
    Data: ['Sort range', 'Filter', 'Group', 'Pivot table', 'Data validation'],
    Tools: ['Spelling', 'Protect sheet', 'Macros'],
    Extensions: ['Add-ons', 'App Script'],
    Help: ['Documentation', 'Keyboard shortcuts', 'Report abuse', 'About']
  };

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
      }
    };
    getUser();
  }, [supabase.auth]);

  // Fetch initial starred status
  useEffect(() => {
    const fetchStarredStatus = async () => {
      const { data, error } = await supabase
        .from('sheets')
        .select('is_starred')
        .eq('id', sheetId)
        .single();
      
      if (!error && data) {
        setIsStarred(data.is_starred);
      }
    };
    
    fetchStarredStatus();
  }, [sheetId, supabase]);

  // Handle starring/unstarring
  const handleStarClick = async () => {
    if (isStarring) return; // Prevent multiple clicks while processing
    
    setIsStarring(true);
    const newStarredStatus = !isStarred;
    
    // Optimistic update
    setIsStarred(newStarredStatus);
    
    try {
      const { error } = await supabase
        .from('sheets')
        .update({ is_starred: newStarredStatus })
        .eq('id', sheetId);
      
      if (error) {
        throw error;
      }
    } catch (error) {
      // Revert on error
      setIsStarred(!newStarredStatus);
      console.error('Error updating starred status:', error);
    } finally {
      setIsStarring(false);
    }
  };

  const handleTitleClick = () => {
    setIsEditing(true);
    setEditedTitle(title);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    if (editedTitle.trim() !== title && onTitleChange) {
      onTitleChange(editedTitle.trim());
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditedTitle(title);
    }
  };

  return (
    <div className={styles.menuContainer}>
      <div className={styles.menuBar}>
        {/* Left side - Dashboard Icon, Title and Star */}
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Grid2X2 className="w-5 h-5 text-emerald-600" />
          </Link>
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleTitleBlur}
              onKeyDown={handleTitleKeyDown}
              className="text-lg font-medium bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none px-0 py-0.5 min-w-[200px]"
              autoFocus
            />
          ) : (
            <h1 
              className="text-lg font-medium cursor-pointer hover:text-blue-600"
              onClick={handleTitleClick}
            >
              {title}
            </h1>
          )}
          <button 
            onClick={handleStarClick}
            disabled={isStarring}
            className={`text-gray-500 hover:text-yellow-500 transition-colors ${isStarring ? 'opacity-50' : ''}`}
          >
            <Star className={`w-5 h-5 ${isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
          </button>
        </div>

        {/* Center - Menu Items */}
        <div className={styles.menuItems}>
          {/* File menu with icons */}
          <div 
            className={styles.menuGroup}
            onMouseEnter={() => setActiveMenu('File')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <Button 
              variant="ghost" 
              className={`${styles.menuButton} ${activeMenu === 'File' ? styles.activeMenuButton : ''}`}
            >
              File
            </Button>
            <div className={styles.dropdownContent}>
              {fileMenuItems.map((item) => (
                <div 
                  key={item.label}
                  className={styles.menuItem}
                >
                  {item.icon}
                  {item.label}
                </div>
              ))}
            </div>
          </div>
          
          {/* Rest of the menus */}
          {Object.entries(menuItems).filter(([menu]) => menu !== 'File').map(([menu, items]) => (
            <div 
              key={menu}
              className={styles.menuGroup}
              onMouseEnter={() => setActiveMenu(menu)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Button 
                variant="ghost" 
                className={`${styles.menuButton} ${activeMenu === menu ? styles.activeMenuButton : ''}`}
              >
                {menu}
              </Button>
              <div className={styles.dropdownContent}>
                {items.map((item) => (
                  <div 
                    key={item}
                    className={styles.menuItem}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right side - Profile */}
        <div className={`${styles.menuGroup} ${styles.profileGroup}`}>
          <div className={styles.profileButton}>
            <div className="flex items-center gap-1 focus:outline-none focus:ring-0">
              <Avatar className="h-8 w-8 cursor-pointer border-0 ring-0 outline-none">
                <AvatarImage src={`https://avatar.vercel.sh/${userEmail}`} />
                <AvatarFallback>{userEmail?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-gray-500 ml-1" />
            </div>
          </div>
          <div className={`${styles.dropdownContent}`}>
            <div className="px-2.5 py-1.5 text-sm font-medium text-muted-foreground">
              {userEmail}
            </div>
            <div className="my-0.5 border-t border-gray-200" />
            <div className={styles.menuItem}>
              <User className="mr-1.5 h-4 w-4" />
              <span>Profile</span>
            </div>
            <div className={styles.menuItem}>
              <Settings className="mr-1.5 h-4 w-4" />
              <span>Settings</span>
            </div>
            <div className={styles.menuItem}>
              <CreditCard className="mr-1.5 h-4 w-4" />
              <span>Billing</span>
            </div>
            <div className="my-0.5 border-t border-gray-200" />
            <div className={`${styles.menuItem} text-red-600 hover:text-red-700 hover:bg-red-50`}>
              <LogOut className="mr-1.5 h-4 w-4 text-red-600" />
              <span>Log out</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 