'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="lg:pl-[240px] transition-all duration-300 ease-in-out">
        <TopNavbar onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="relative pt-20 px-md lg:px-margin min-h-screen pb-xl">
          {children}
        </main>
      </div>
    </div>
  );
}
