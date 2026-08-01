'use client';

import { 
  useAnalyticsOverview, 
  useAnalyticsGenres, 
  useAnalyticsRatings, 
  useAnalyticsStatus, 
  useAnalyticsReleaseYears 
} from '@/features/analytics/hooks/useAnalyticsQueries';
import { AnalyticsKpiGrid } from '@/features/analytics/components/AnalyticsKpiGrid';
import { GenreDistributionChart } from '@/features/analytics/components/GenreDistributionChart';
import { RatingDensityChart } from '@/features/analytics/components/RatingDensityChart';
import { StatusDistributionChart } from '@/features/analytics/components/StatusDistributionChart';
import { ReleaseYearChart } from '@/features/analytics/components/ReleaseYearChart';
import { AnalyticsSkeleton } from '@/features/analytics/components/AnalyticsSkeleton';
import { AnalyticsEmptyState } from '@/features/analytics/components/AnalyticsEmptyState';
import { AnalyticsErrorState } from '@/features/analytics/components/AnalyticsErrorState';
import { useMemo } from 'react';

export default function AnalyticsPage() {
  const overviewQuery = useAnalyticsOverview();
  const genresQuery = useAnalyticsGenres();
  const ratingsQuery = useAnalyticsRatings();
  const statusQuery = useAnalyticsStatus();
  const releaseYearsQuery = useAnalyticsReleaseYears();

  const isPending = 
    overviewQuery.isPending || 
    genresQuery.isPending || 
    ratingsQuery.isPending || 
    statusQuery.isPending || 
    releaseYearsQuery.isPending;

  const favoriteGenre = useMemo(() => {
    if (!genresQuery.data || genresQuery.data.length === 0) return undefined;
    return [...genresQuery.data].sort((a, b) => b.count - a.count)[0]?.genre;
  }, [genresQuery.data]);

  // If we're loading, show skeleton
  if (isPending) {
    return (
      <div className="flex flex-col w-full h-full">
        <AnalyticsSkeleton />
      </div>
    );
  }

  // If the overview fails, the whole page fails
  if (overviewQuery.isError) {
    return (
      <div className="flex flex-col w-full h-full">
        <AnalyticsErrorState 
          message="Could not load your analytics overview. Please try again later." 
          onRetry={overviewQuery.refetch} 
        />
      </div>
    );
  }

  // If the user has no songs, show empty state
  if (overviewQuery.data?.totalSongs === 0) {
    return (
      <div className="flex flex-col w-full h-full">
        <AnalyticsEmptyState />
      </div>
    );
  }

  // Otherwise, render the dashboard, with individual error boundaries/fallbacks where appropriate
  return (
    <div className="flex flex-col w-full h-full gap-12">
        
        {/* Top Level Stats Bar */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-8 flex flex-col gap-md">
            <div className="flex items-baseline gap-md">
              <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">Performance Metric</span>
              <div className="h-[1px] flex-1 bg-outline-variant/20"></div>
            </div>
            <h2 className="font-display-lg text-display-lg text-on-surface max-w-2xl leading-tight">
              A symphony of data points, refined for the <span className="text-primary italic">modern curator.</span>
            </h2>
          </div>
          
          <div className="md:col-span-4 bg-surface-container-high/40 backdrop-blur-xl p-xl rounded-xl border-t border-white/10 shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-xs">COLLECTION HEALTH</p>
              <p className="font-data-lg text-data-lg text-primary">100% Optimized</p>
              <div className="w-full bg-surface-container-highest h-1 mt-md rounded-full overflow-hidden">
                <div className="bg-primary h-full w-full transition-all duration-1000 ease-out"></div>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[120px]">analytics</span>
            </div>
          </div>
        </section>

        {/* KPI Grid */}
        <AnalyticsKpiGrid 
          overview={overviewQuery.data} 
          favoriteGenre={favoriteGenre} 
        />

        {/* Distribution Analysis */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Genre Distribution */}
          <div className="lg:col-span-7 bg-surface-container/30 p-xl border-t border-white/5 rounded-sm">
            {genresQuery.isError ? (
              <AnalyticsErrorState message="Could not load genre data." onRetry={genresQuery.refetch} />
            ) : genresQuery.data ? (
              <GenreDistributionChart data={genresQuery.data} />
            ) : null}
          </div>
          
          {/* Rating Distribution */}
          <div className="lg:col-span-5 bg-surface-container/30 p-xl border-t border-white/5 rounded-sm">
            {ratingsQuery.isError ? (
              <AnalyticsErrorState message="Could not load rating data." onRetry={ratingsQuery.refetch} />
            ) : ratingsQuery.data ? (
              <RatingDensityChart data={ratingsQuery.data} />
            ) : null}
          </div>
        </section>

        {/* Collection Growth & Status Distribution */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-surface-container/30 p-xl border-t border-white/5 rounded-sm overflow-hidden relative h-full min-h-[400px]">
            {releaseYearsQuery.isError ? (
              <AnalyticsErrorState message="Could not load release year data." onRetry={releaseYearsQuery.refetch} />
            ) : releaseYearsQuery.data ? (
              <ReleaseYearChart data={releaseYearsQuery.data} />
            ) : null}
          </div>
          
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="bg-surface-container/30 p-xl border-t border-white/5 rounded-sm flex-1">
              {statusQuery.isError ? (
                <AnalyticsErrorState message="Could not load status data." onRetry={statusQuery.refetch} />
              ) : statusQuery.data ? (
                <StatusDistributionChart data={statusQuery.data} />
              ) : null}
            </div>
            
            <div className="bg-primary p-xl border-t border-white/20 rounded-sm flex flex-col justify-between group cursor-pointer overflow-hidden relative border-2 border-primary h-[160px]">
              <div className="relative z-10">
                <h4 className="font-label-caps text-label-caps text-on-primary uppercase tracking-widest mb-sm opacity-80">Export Report</h4>
                <p className="font-headline-md text-headline-md text-on-primary">Full Catalog Audit</p>
              </div>
              <span className="material-symbols-outlined text-on-primary text-4xl self-end group-hover:translate-x-2 transition-transform duration-300 relative z-10">arrow_forward</span>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            </div>
          </div>
        </section>

    </div>
  );
}
