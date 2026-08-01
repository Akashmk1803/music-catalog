'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface NavigationItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export function NavigationItem({ href, icon, label, onClick }: NavigationItemProps) {
  const pathname = usePathname();
  // Using exact match for dashboard, prefix match for others if necessary, but exact is safer for now.
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  if (isActive) {
    return (
      <Link
        href={href}
        onClick={onClick}
        aria-current="page"
        className="group relative flex items-center px-4 py-2.5 rounded-lg transition-all duration-300 bg-gradient-to-r from-primary/10 to-transparent text-primary overflow-hidden"
      >
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-[3px] bg-primary rounded-r-sm"></div>
        <span className="mr-3 text-primary transition-colors flex items-center justify-center w-5 h-5">
          {icon}
        </span>
        <span className="font-body-md font-medium tracking-wide">{label}</span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative flex items-center px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all duration-300"
    >
      <span className="mr-3 group-hover:text-primary/80 transition-colors flex items-center justify-center w-5 h-5 opacity-70 group-hover:opacity-100">
        {icon}
      </span>
      <span className="font-body-md tracking-wide">{label}</span>
    </Link>
  );
}
