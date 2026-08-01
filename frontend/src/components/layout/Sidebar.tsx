'use client';

import { NavigationItem } from './NavigationItem';
import { UserMenu } from './UserMenu';
import { 
  LayoutDashboard, 
  Search, 
  Library, 
  LineChart, 
  Sparkles, 
  UserCircle,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/library', label: 'Library', icon: Library },
  { href: '/analytics', label: 'Analytics', icon: LineChart },
  { href: '/ai-insights', label: 'AI Insights', icon: Sparkles },
  { href: '/profile', label: 'Profile', icon: UserCircle },
];

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed left-0 top-0 h-full w-[240px] bg-surface-container-low/95 lg:bg-surface-container-low/40 backdrop-blur-xxl z-50 flex flex-col border-r border-outline-variant/10 shadow-[inset_0_1px_0_0_rgba(237,232,221,0.05)] border-t border-primary/20 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="px-8 py-8 flex items-center justify-between gap-sm">
          <Link href="/dashboard" className="flex items-center gap-sm group">
            {/* Keeping the image from Stitch design */}
            <img 
              alt="Catalog Logo" 
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiSiW1AIKVorii8BTmbd4GMOfSk1wv2_OiT23OOBY4RS99XjUxQlbw_ajg62nhvlrTEXtc3ATi50pRTjrSiUBwfOIFHm_r7mRhzGV4_0xoBT79jMnds1cbtXj841oZrTR9BBDRtIg-T7ZOZn6bqYaf73mgmRItGJULTNepiVczYIuP0bxnD4AVPaxQIPS0kKeizZNiJCUY70D3w_8UZWCCzXO0T6BUGb9hPleZv2uzySyhCYRik88"
            />
            <span className="font-headline-md text-headline-md text-on-surface tracking-tight group-hover:text-primary transition-colors">Catalog</span>
          </Link>
          <button 
            className="lg:hidden text-on-surface-variant hover:text-on-surface"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-2 px-6 mt-4 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavigationItem 
                key={item.href} 
                href={item.href} 
                icon={<Icon size={20} />} 
                label={item.label} 
              />
            );
          })}
        </nav>

        <UserMenu />
      </aside>
    </>
  );
}
