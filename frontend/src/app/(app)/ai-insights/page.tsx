'use client';

import { useState, useEffect } from 'react';
import { useAiSummary } from '@/features/ai/hooks/useAiSummary';
import { AiSummaryPanel } from '@/features/ai/components/AiSummaryPanel';
import { AiInsightsKpiGrid } from '@/features/ai/components/AiInsightsKpiGrid';
import { AiSkeleton } from '@/features/ai/components/AiSkeleton';
import { AiEmptyState } from '@/features/ai/components/AiEmptyState';
import { AiErrorState } from '@/features/ai/components/AiErrorState';

export default function AiInsightsPage() {
  const { data, isPending, isError, refetch, isRefetching } = useAiSummary();
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Update the timestamp only when data successfully arrives/refetches
  useEffect(() => {
    if (data && !isRefetching) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLastUpdated(new Date());
    }
  }, [data, isRefetching]);

  if (isPending && !data) {
    return (
      <div className="flex flex-col w-full h-full">
        <AiSkeleton />
      </div>
    );
  }

  if (isError && !data) {
    return (
      <div className="flex flex-col w-full h-full">
        <AiErrorState 
          onRetry={() => refetch()} 
          isRetrying={isRefetching}
        />
      </div>
    );
  }

  // If totalSongs is 0, the user has no data for Gemini to analyze
  if (data?.totalSongs === 0) {
    return (
      <div className="flex flex-col w-full h-full">
        <AiEmptyState />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex flex-col w-full h-full relative">
      
      {/* Decorative Vertical Label */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden xl:block">
        <span className="[writing-mode:vertical-rl] font-label-caps text-on-surface-variant/20 tracking-[1em] text-[10px] uppercase pointer-events-none">
          CATALOG × GEMINI INSIGHTS
        </span>
      </div>

      <div className="flex flex-col w-full gap-12">
        <AiSummaryPanel 
          summary={data.summary} 
          updatedAt={lastUpdated || new Date()} 
          onRefresh={() => refetch()} 
          isRefetching={isRefetching} 
        />
        <AiInsightsKpiGrid data={data} />
      </div>
    </div>
  );
}
