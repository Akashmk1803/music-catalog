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
        className="group flex items-center px-md py-sm rounded-lg transition-all duration-300 bg-surface-container-highest/60 text-primary border-l-2 border-primary"
      >
        <span className="mr-md text-primary transition-colors flex items-center justify-center w-5 h-5">
          {icon}
        </span>
        <span className="font-body-md font-medium">{label}</span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex items-center px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high/40 hover:text-on-surface transition-all duration-300 border-l-2 border-transparent"
    >
      <span className="mr-md group-hover:text-primary transition-colors flex items-center justify-center w-5 h-5">
        {icon}
      </span>
      <span className="font-body-md">{label}</span>
    </Link>
  );
}
