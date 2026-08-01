'use client';

import { User } from 'lucide-react';

export function UserMenu() {
  return (
    <div className="mt-auto p-6">
      <div className="bg-surface-container-low/50 hover:bg-surface-container-low/80 transition-colors duration-300 rounded-xl p-4 border border-outline-variant/10 flex items-center gap-3 cursor-pointer group">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:border-primary/40 transition-colors">
          <User className="text-primary w-4 h-4" />
        </div>
        <div className="overflow-hidden">
          <p className="text-body-sm font-medium text-on-surface truncate tracking-wide">User</p>
          <span className="px-2 py-[2px] bg-primary/10 text-primary text-[9px] font-label-caps rounded uppercase inline-block mt-1 tracking-widest">
            Executive
          </span>
        </div>
      </div>
    </div>
  );
}
