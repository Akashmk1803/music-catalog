'use client';

import { Shapes, StarHalf, Library, CheckCircle, Headphones, CalendarClock } from 'lucide-react';
import { AISummaryResponse } from '../types/ai';

interface AiInsightsKpiGridProps {
  data: AISummaryResponse;
}

export function AiInsightsKpiGrid({ data }: AiInsightsKpiGridProps) {
  const rating = data.averageRating?.toFixed(2) ?? '0.00';
  
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg mb-xxl">
      
      {/* Favorite Genre */}
      <div className="bg-surface-container-high/30 backdrop-blur-md p-lg rounded-xl border-t border-white/5 flex flex-col justify-between group hover:bg-surface-container-highest/40 transition-all duration-500">
        <div className="flex justify-between items-start">
          <Shapes className="text-primary/60" size={24} />
        </div>
        <div className="mt-xl">
          <span className="font-label-caps text-label-caps text-on-surface-variant block mb-sm">Favorite Genre</span>
          <span className="font-display-lg text-headline-lg text-on-surface truncate block" title={data.favoriteGenre}>{data.favoriteGenre || 'None'}</span>
        </div>
      </div>

      {/* Average Rating */}
      <div className="bg-surface-container-high/30 backdrop-blur-md p-lg rounded-xl border-t border-white/5 flex flex-col justify-between group hover:bg-surface-container-highest/40 transition-all duration-500">
        <div className="flex justify-between items-start">
          <StarHalf className="text-primary/60" size={24} />
        </div>
        <div className="mt-xl">
          <span className="font-label-caps text-label-caps text-on-surface-variant block mb-sm">Avg. Rating</span>
          <div className="flex items-baseline gap-xs">
            <span className="font-display-lg text-headline-lg text-on-surface">{rating}</span>
            <span className="font-data-md text-data-md text-on-surface-variant/40">/ 5.0</span>
          </div>
        </div>
      </div>

      {/* Total Songs */}
      <div className="bg-surface-container-high/30 backdrop-blur-md p-lg rounded-xl border-t border-white/5 flex flex-col justify-between group hover:bg-surface-container-highest/40 transition-all duration-500">
        <div className="flex justify-between items-start">
          <Library className="text-primary/60" size={24} />
        </div>
        <div className="mt-xl">
          <span className="font-label-caps text-label-caps text-on-surface-variant block mb-sm">Total Songs</span>
          <span className="font-display-lg text-headline-lg text-on-surface">{data.totalSongs}</span>
        </div>
      </div>

      {/* Completed Songs */}
      <div className="bg-surface-container-high/30 backdrop-blur-md p-lg rounded-xl border-t border-white/5 flex flex-col justify-between group hover:bg-surface-container-highest/40 transition-all duration-500">
        <div className="flex justify-between items-start">
          <CheckCircle className="text-primary/60" size={24} />
        </div>
        <div className="mt-xl">
          <span className="font-label-caps text-label-caps text-on-surface-variant block mb-sm">Completed Songs</span>
          <span className="font-display-lg text-headline-lg text-on-surface">{data.completedSongs}</span>
        </div>
      </div>

      {/* Listening Songs */}
      <div className="bg-surface-container-high/30 backdrop-blur-md p-lg rounded-xl border-t border-white/5 flex flex-col justify-between group hover:bg-surface-container-highest/40 transition-all duration-500">
        <div className="flex justify-between items-start">
          <Headphones className="text-primary/60" size={24} />
        </div>
        <div className="mt-xl">
          <span className="font-label-caps text-label-caps text-on-surface-variant block mb-sm">Listening Songs</span>
          <span className="font-display-lg text-headline-lg text-on-surface">{data.listeningSongs}</span>
        </div>
      </div>

      {/* Planned Songs */}
      <div className="bg-surface-container-high/30 backdrop-blur-md p-lg rounded-xl border-t border-white/5 flex flex-col justify-between group hover:bg-surface-container-highest/40 transition-all duration-500">
        <div className="flex justify-between items-start">
          <CalendarClock className="text-primary/60" size={24} />
        </div>
        <div className="mt-xl">
          <span className="font-label-caps text-label-caps text-on-surface-variant block mb-sm">Planned Songs</span>
          <span className="font-display-lg text-headline-lg text-on-surface">{data.plannedSongs}</span>
        </div>
      </div>

    </section>
  );
}
