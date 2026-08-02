'use client';

import { Shapes, StarHalf, Library, CheckCircle, Headphones, CalendarClock } from 'lucide-react';
import { AISummaryResponse } from '../types/ai';
import { KpiCard } from '@/components/ui/KpiCard';

interface AiInsightsKpiGridProps {
  data: AISummaryResponse;
}

export function AiInsightsKpiGrid({ data }: AiInsightsKpiGridProps) {
  const rating = data.averageRating?.toFixed(2) ?? '0.00';
  
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <KpiCard
        icon={Shapes}
        title="Favorite Genre"
        value={<span className="font-headline-lg text-[24px] truncate" title={data.favoriteGenre}>{data.favoriteGenre || 'None'}</span>}
      />
      <KpiCard
        icon={StarHalf}
        title="Avg. Rating"
        value={
          <div className="flex items-baseline gap-2">
            <span>{rating}</span>
            <span className="font-data-md text-[14px] text-on-surface-variant/40">/ 5.0</span>
          </div>
        }
      />
      <KpiCard
        icon={Library}
        title="Total Songs"
        value={data.totalSongs}
      />
      <KpiCard
        icon={CheckCircle}
        title="Completed Songs"
        value={data.completedSongs}
      />
      <KpiCard
        icon={Headphones}
        title="Listening Songs"
        value={data.listeningSongs}
      />
      <KpiCard
        icon={CalendarClock}
        title="Planned Songs"
        value={data.plannedSongs}
      />
    </section>
  );
}
