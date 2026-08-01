'use client';

import { Bell, Menu, Search, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface TopNavbarProps {
  onMenuClick: () => void;
}

export function TopNavbar({ onMenuClick }: TopNavbarProps) {
  const pathname = usePathname();
  
  // Create a readable title from pathname
  const pageTitle = pathname === '/' 
    ? 'Dashboard' 
    : pathname.split('/')[1]?.charAt(0).toUpperCase() + pathname.split('/')[1]?.slice(1).replace('-', ' ') || 'Dashboard';

  return (
    <header className="fixed top-0 left-0 lg:left-[240px] right-0 h-20 bg-background/40 backdrop-blur-xl z-30 border-b border-outline-variant/5 border-t border-primary/20 transition-all duration-300">
      <div className="w-full max-w-7xl mx-auto h-full flex items-center justify-between px-6 sm:px-10 lg:px-16">
        <div className="flex items-center gap-md">
          <button 
            onClick={onMenuClick}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="flex flex-col">
            <span className="text-headline-md font-headline-md text-on-surface">{pageTitle}</span>
          </div>
        </div>

        <div className="flex items-center gap-sm lg:gap-lg">
          <div className="hidden md:flex items-center gap-sm bg-surface-container-high/40 px-md py-xs rounded-full border border-outline-variant/10 text-on-surface-variant cursor-text hover:border-primary/30 transition-colors">
            <Search size={18} />
            <span className="text-body-sm font-label-caps uppercase tracking-widest">Search...</span>
            <span className="ml-xl text-[10px] bg-surface-container-highest px-sm py-[1px] rounded font-data-md">⌘K</span>
          </div>
          <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors">
            <Search size={20} />
          </button>
          
          <div className="flex items-center gap-xs lg:gap-md">
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors relative group">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-primary rounded-full border border-background"></span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
