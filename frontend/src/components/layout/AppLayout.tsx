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
        
        <main className="relative pt-28 pb-32 px-6 sm:px-10 lg:px-16 w-full max-w-7xl mx-auto min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
