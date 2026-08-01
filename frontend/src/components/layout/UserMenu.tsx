'use client';

import { User } from 'lucide-react';

export function UserMenu() {
  return (
    <div className="mt-auto p-md">
      <div className="bg-surface-container/30 rounded-xl p-md border border-outline-variant/10 flex items-center gap-md">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
          <User className="text-on-primary w-5 h-5" />
        </div>
        <div className="overflow-hidden">
          <p className="text-body-sm font-semibold text-on-surface truncate">User</p>
          <span className="px-sm py-[2px] bg-primary-container/20 text-primary text-[10px] font-label-caps rounded uppercase inline-block mt-0.5">
            Member
          </span>
        </div>
      </div>
    </div>
  );
}
