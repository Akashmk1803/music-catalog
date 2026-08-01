'use client';

import { Suspense, useState, useCallback } from 'react';
import { SearchInput } from '@/features/search/components/SearchInput';
import { SearchSkeleton } from '@/features/search/components/SearchSkeleton';
import { EmptyState } from '@/features/search/components/EmptyState';
import { SongCard } from '@/features/search/components/SongCard';
import { useSearchMusic } from '@/features/search/hooks/useSearchQueries';
import { Filter, SortDesc } from 'lucide-react';
import { useRouter } from 'next/navigation';

function SearchPageContent() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  
  const { data: songs, isPending, isError } = useSearchMusic(query);

  const handleSearchChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  const handleBrowseAll = () => {
    setQuery('');
    router.replace('/search', { scroll: false });
  };

  return (
    <div className="flex flex-col w-full">
      <SearchInput onSearchChange={handleSearchChange} />

      <section className="w-full py-xl" id="resultsSection">
        {/* Results Header */}
        {query.trim().length > 0 && (
          <div className="flex items-baseline justify-between mb-xl border-b border-outline-variant/10 pb-md">
            <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-baseline">
              Search Results
              {!isPending && songs && (
                <span className="ml-sm font-data-md text-data-md text-on-surface-variant opacity-60">
                  ({songs.length} Found)
                </span>
              )}
            </h2>
            <div className="hidden md:flex items-center gap-lg">
              <button className="flex items-center gap-sm text-label-caps text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest">
                <Filter size={18} /> Filter
              </button>
              <button className="flex items-center gap-sm text-label-caps text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest">
                <SortDesc size={18} /> Sort: Popularity
              </button>
            </div>
          </div>
        )}

        {/* State Rendering */}
        {query.trim().length === 0 ? (
          // Idle state (could show trending or nothing)
          null
        ) : isPending ? (
          <SearchSkeleton />
        ) : isError ? (
          <div className="flex justify-center p-xl text-error">
            Failed to fetch search results. Please try again.
          </div>
        ) : songs && songs.length === 0 ? (
          <EmptyState onBrowseAll={handleBrowseAll} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-xl">
            {songs?.map((song) => (
              <SongCard key={song.appleCatalogId} song={song} />
            ))}
          </div>
        )}
      </section>

      {/* Decorative Sidebar Label */}
      <div className="fixed right-margin top-1/2 -translate-y-1/2 pointer-events-none z-0 hidden 2xl:block">
        <span className="[writing-mode:vertical-rl] text-label-caps text-on-surface-variant opacity-10 tracking-[1em] uppercase">
          Catalog Music Insights Archive
        </span>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-xl"><SearchSkeleton /></div>}>
      <SearchPageContent />
    </Suspense>
  );
}
