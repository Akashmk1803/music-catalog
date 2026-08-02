'use client';

import { Library, StarHalf, Shapes, CheckCircle, Headphones, CalendarClock } from 'lucide-react';
import { AnalyticsOverview } from '../types/analytics';
import { KpiCard } from '@/components/ui/KpiCard';

interface AnalyticsKpiGridProps {
  overview: AnalyticsOverview | undefined;
  favoriteGenre: string | undefined;
}

export function AnalyticsKpiGrid({ overview, favoriteGenre }: AnalyticsKpiGridProps) {
  // Use fallbacks for loading state or missing data
  const total = overview?.totalSongs ?? 0;
  const rating = overview?.averageRating?.toFixed(2) ?? '0.00';
  const genre = favoriteGenre ?? 'None';
  const completed = overview?.completedSongs ?? 0;
  const listening = overview?.listeningSongs ?? 0;
  const planned = overview?.plannedSongs ?? 0;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <KpiCard
        icon={Library}
        title="Total Songs"
        value={total}
      />
      <KpiCard
        icon={StarHalf}
        title="Average Rating"
        value={rating}
      />
      <KpiCard
        icon={Shapes}
        title="Favorite Genre"
        value={<span className="font-headline-lg text-[24px] truncate" title={genre}>{genre}</span>}
      />
      <KpiCard
        icon={CheckCircle}
        title="Completed Songs"
        value={completed}
      />
      <KpiCard
        icon={Headphones}
        title="Listening Songs"
        value={listening}
      />
      <KpiCard
        icon={CalendarClock}
        title="Planned Songs"
        value={planned}
      />
    </section>
  );
}
