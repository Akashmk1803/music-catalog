'use client';

import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';

export function AiEmptyState() {
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-[120px] text-center bg-surface-container-lowest/30 rounded-xl border border-white/5">
      <div className="relative mb-xl">
        <Sparkles className="text-on-surface-variant/20 w-24 h-24" strokeWidth={1} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
        </div>
      </div>
      <h2 className="font-headline-lg text-headline-lg text-on-surface mb-md">No Insights Available</h2>
      <p className="text-body-lg text-on-surface-variant max-w-md mx-auto mb-xl">
        Gemini needs a foundation to work with. Start adding songs to your catalog to generate personalized AI insights.
      </p>
      <button 
        onClick={() => router.push('/search')}
        className="px-xl py-md bg-primary text-on-primary font-label-caps rounded-lg hover:brightness-110 transition-all active:scale-95 uppercase tracking-widest"
      >
        Search Music
      </button>
    </div>
  );
}
