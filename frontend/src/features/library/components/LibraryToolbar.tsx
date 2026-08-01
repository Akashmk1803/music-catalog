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
    <div className="sticky top-20 z-30 -mx-margin px-margin py-4 sm:py-6 bg-background/80 backdrop-blur-xl border-b border-white/5">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Search and Filters Group */}
        <div className="flex flex-1 w-full md:w-auto items-center gap-2 sm:gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search library..." 
              className="w-full h-10 pl-10 pr-4 bg-surface-container-low/40 backdrop-blur-md rounded-lg border border-white/5 focus:border-primary/50 focus:bg-surface-container-high/40 focus:outline-none font-body-sm text-on-surface transition-all placeholder:text-on-surface-variant/40 shadow-sm" 
            />
          </div>
          <div className="flex items-center shrink-0">
            <div className="h-10 flex items-center gap-2 bg-surface-container-low/40 rounded-lg px-3 border border-white/5 shadow-sm">
              <Filter className="text-on-surface-variant/50" size={16} />
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
        <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-6">
          <div className="flex flex-col items-start md:items-end">
            <span className="text-[9px] font-label-caps text-on-surface-variant/50 uppercase tracking-[0.2em] mb-1">
              Sort Archives By
            </span>
            <select 
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-transparent font-headline-md text-[16px] text-on-surface border-none focus:ring-0 cursor-pointer appearance-none text-left md:text-right pr-4 hover:text-primary transition-colors"
            >
              <option value="Newest Added">Newest Added</option>
              <option value="Highest Rated">Highest Rated</option>
              <option value="Lowest Rated">Lowest Rated</option>
              <option value="Title A-Z">Title A-Z</option>
              <option value="Title Z-A">Title Z-A</option>
              <option value="Artist A-Z">Artist A-Z</option>
            </select>
          </div>
          <div className="flex gap-1 bg-surface-container-low/40 p-1 rounded-lg border border-white/5 shadow-sm">
            <button className="w-8 h-8 rounded flex items-center justify-center bg-primary/20 text-primary transition-colors">
              <Grid size={16} />
            </button>
            <button className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant/60 hover:text-on-surface hover:bg-surface-container-high/40 transition-colors">
              <List size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
