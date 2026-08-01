'use client';

import { Search, Filter, Grid, List } from 'lucide-react';
import { LibraryStatus } from '../types/library';

export type SortOption = 
  | 'Newest Added' 
  | 'Highest Rated' 
  | 'Lowest Rated' 
  | 'Title A-Z' 
  | 'Title Z-A' 
  | 'Artist A-Z';

interface LibraryToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: LibraryStatus | 'All';
  onStatusChange: (status: LibraryStatus | 'All') => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function LibraryToolbar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortOption,
  onSortChange,
}: LibraryToolbarProps) {
  return (
    <div className="sticky top-20 z-30 -mx-margin px-margin py-lg bg-background/60 backdrop-blur-xl border-b border-outline-variant/10">
      <div className="flex flex-wrap items-center justify-between gap-lg">
        {/* Search and Filters Group */}
        <div className="flex flex-1 items-center gap-md min-w-[300px]">
          <div className="relative flex-1 group">
            <Search className="absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" size={20} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search your library..." 
              className="w-full h-12 pl-xl pr-md bg-surface-container-low/45 backdrop-blur-xl border-b border-outline-variant/20 focus:border-primary focus:outline-none font-body-md text-on-surface transition-all placeholder:text-on-surface-variant/40" 
            />
          </div>
          <div className="flex items-center gap-xs">
            <div className="h-12 flex items-center gap-sm bg-surface-container-high/20 px-sm border-b border-transparent">
              <Filter className="text-on-surface-variant ml-sm" size={20} />
              <select
                value={statusFilter}
                onChange={(e) => onStatusChange(e.target.value as LibraryStatus | 'All')}
                className="bg-transparent font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant hover:text-on-surface focus:outline-none cursor-pointer h-full appearance-none pr-md"
              >
                <option value="All">Status: All</option>
                <option value="Completed">Completed</option>
                <option value="Listening">Listening</option>
                <option value="Planned">Planned</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Sorting Group */}
        <div className="flex items-center gap-lg">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-label-caps text-primary/60 uppercase tracking-[0.2em] mb-xs">
              Sort Archives By
            </span>
            <select 
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-transparent font-headline-md text-[20px] text-on-surface border-none focus:ring-0 cursor-pointer appearance-none text-right pr-6"
            >
              <option value="Newest Added">Newest Added</option>
              <option value="Highest Rated">Highest Rated</option>
              <option value="Lowest Rated">Lowest Rated</option>
              <option value="Title A-Z">Title A-Z</option>
              <option value="Title Z-A">Title Z-A</option>
              <option value="Artist A-Z">Artist A-Z</option>
            </select>
          </div>
          <div className="flex gap-1">
            <button className="w-10 h-10 flex items-center justify-center bg-primary text-on-primary">
              <Grid size={20} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high/40 transition-colors">
              <List size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
