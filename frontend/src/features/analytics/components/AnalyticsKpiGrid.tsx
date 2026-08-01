'use client';

import { Library, StarHalf, Shapes, CheckCircle, Headphones, CalendarClock } from 'lucide-react';
import { AnalyticsOverview } from '../types/analytics';

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
      {/* Total Songs */}
      <div className="bg-surface-container-low/40 backdrop-blur-md p-6 border-t border-white/10 flex flex-col gap-4 hover:bg-surface-container-high/60 transition-all duration-300">
        <div className="flex justify-between items-start">
          <Library className="text-primary" size={24} />
        </div>
        <div>
          <h4 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Total Songs</h4>
          <p className="font-display-lg text-display-lg text-on-surface mt-xs">{total}</p>
        </div>
      </div>

      {/* Average Rating */}
      <div className="bg-surface-container-low/40 backdrop-blur-md p-6 border-t border-white/10 flex flex-col gap-4 hover:bg-surface-container-high/60 transition-all duration-300">
        <div className="flex justify-between items-start">
          <StarHalf className="text-primary" size={24} />
        </div>
        <div>
          <h4 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Average Rating</h4>
          <p className="font-display-lg text-display-lg text-on-surface mt-xs">{rating}</p>
        </div>
      </div>

      {/* Favorite Genre */}
      <div className="bg-surface-container-low/40 backdrop-blur-md p-6 border-t border-white/10 flex flex-col gap-4 hover:bg-surface-container-high/60 transition-all duration-300">
        <div className="flex justify-between items-start">
          <Shapes className="text-primary" size={24} />
        </div>
        <div>
          <h4 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Favorite Genre</h4>
          <p className="font-headline-lg text-headline-lg text-on-surface mt-xs truncate" title={genre}>{genre}</p>
        </div>
      </div>

      {/* Completed Songs */}
      <div className="bg-surface-container-low/40 backdrop-blur-md p-6 border-t border-white/10 flex flex-col gap-4 hover:bg-surface-container-high/60 transition-all duration-300">
        <div className="flex justify-between items-start">
          <CheckCircle className="text-primary" size={24} />
        </div>
        <div>
          <h4 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Completed Songs</h4>
          <p className="font-display-lg text-display-lg text-on-surface mt-xs">{completed}</p>
        </div>
      </div>

      {/* Listening Songs */}
      <div className="bg-surface-container-low/40 backdrop-blur-md p-6 border-t border-white/10 flex flex-col gap-4 hover:bg-surface-container-high/60 transition-all duration-300">
        <div className="flex justify-between items-start">
          <Headphones className="text-primary" size={24} />
        </div>
        <div>
          <h4 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Listening Songs</h4>
          <p className="font-display-lg text-display-lg text-on-surface mt-xs">{listening}</p>
        </div>
      </div>

      {/* Planned Songs */}
      <div className="bg-surface-container-low/40 backdrop-blur-md p-6 border-t border-white/10 flex flex-col gap-4 hover:bg-surface-container-high/60 transition-all duration-300">
        <div className="flex justify-between items-start">
          <CalendarClock className="text-primary" size={24} />
        </div>
        <div>
          <h4 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Planned Songs</h4>
          <p className="font-display-lg text-display-lg text-on-surface mt-xs">{planned}</p>
        </div>
      </div>
    </section>
  );
}
