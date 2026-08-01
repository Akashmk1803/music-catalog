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
      <div className="pt-20 px-margin min-h-screen">
        <AiSkeleton />
      </div>
    );
  }

  if (isError && !data) {
    return (
      <div className="pt-20 px-margin min-h-screen">
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
      <div className="pt-20 px-margin min-h-screen">
        <AiEmptyState />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="pt-20 px-margin min-h-screen bg-transparent">
      
      {/* Decorative Vertical Label */}
      <div className="fixed right-margin top-1/2 -translate-y-1/2 hidden xl:block">
        <span className="[writing-mode:vertical-rl] font-label-caps text-on-surface-variant/20 tracking-[1em] text-[10px] uppercase pointer-events-none">
          CATALOG × GEMINI INSIGHTS
        </span>
      </div>

      <div className="flex flex-col w-full pb-xxl">
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
