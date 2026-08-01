'use client';

import { Library } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function LibraryEmptyState() {
  const router = useRouter();

  return (
    <section className="flex-1 flex flex-col items-center justify-center py-[120px] text-center" id="emptyState">
      <div className="relative mb-xl">
        <Library className="text-on-surface-variant/10 w-24 h-24" strokeWidth={1} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
        </div>
      </div>
      <h2 className="font-headline-lg text-headline-lg text-on-surface mb-md">Your library is empty</h2>
      <p className="text-body-lg text-on-surface-variant max-w-md mx-auto">
        Start building your personal catalog by searching for your favorite tracks and adding them to your collection.
      </p>
      <button 
        onClick={() => router.push('/search')}
        className="mt-xl px-xl py-md bg-primary text-on-primary font-label-caps rounded-lg hover:brightness-110 transition-all active:scale-95 uppercase tracking-widest"
      >
        Search Music
      </button>
    </section>
  );
}
