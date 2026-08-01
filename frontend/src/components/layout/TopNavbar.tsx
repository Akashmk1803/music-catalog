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

        <div className="flex items-center gap-2 lg:gap-4">
          <div className="hidden md:flex items-center bg-surface-container-high/40 px-4 py-2 rounded-full border border-outline-variant/10 text-on-surface-variant cursor-text hover:bg-surface-container-high/60 transition-colors">
            <Search size={16} className="text-on-surface-variant/70" />
            <span className="text-body-sm font-label-caps uppercase tracking-widest text-[11px] ml-2">Search</span>
            <span className="ml-8 text-[9px] bg-surface-container-highest px-1.5 py-[2px] rounded font-data-md opacity-60">⌘K</span>
          </div>
          <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors">
            <Search size={18} />
          </button>
          
          <div className="flex items-center gap-1 lg:gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors relative group">
              <Bell size={18} />
              <span className="absolute top-[11px] right-[11px] w-[6px] h-[6px] bg-primary rounded-full"></span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors">
              <Settings size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
