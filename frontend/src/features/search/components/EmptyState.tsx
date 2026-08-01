'use client';

import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  onBrowseAll: () => void;
}

export function EmptyState({ onBrowseAll }: EmptyStateProps) {
  return (
    <section className="flex-1 flex flex-col items-center justify-center py-[120px] text-center" id="emptyState">
      <div className="relative mb-xl">
        <SearchX className="text-on-surface-variant/10 w-24 h-24" strokeWidth={1} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
        </div>
      </div>
      <h2 className="font-headline-lg text-headline-lg text-on-surface mb-md">No songs matched your search</h2>
      <p className="text-body-lg text-on-surface-variant max-w-md mx-auto">
        Refine your keywords or browse our trending genres for fresh inspiration.
      </p>
      <button 
        onClick={onBrowseAll}
        className="mt-xl px-xl py-md bg-primary text-on-primary font-label-caps rounded-lg hover:brightness-110 transition-all active:scale-95 uppercase tracking-widest"
      >
        Browse All Music
      </button>
    </section>
  );
}
