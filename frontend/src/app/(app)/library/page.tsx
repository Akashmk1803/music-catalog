'use client';

import { useState, useMemo } from 'react';
import { useMyLibrary, useSearchLibrary } from '@/features/library/hooks/useLibraryQueries';
import { useDebounce } from '@/features/search/hooks/useDebounce';
import { LibraryToolbar, SortOption } from '@/features/library/components/LibraryToolbar';
import { LibraryCard } from '@/features/library/components/LibraryCard';
import { LibrarySkeleton } from '@/features/library/components/LibrarySkeleton';
import { LibraryEmptyState } from '@/features/library/components/LibraryEmptyState';
import { EditSongModal } from '@/features/library/components/EditSongModal';
import { DeleteConfirmModal } from '@/features/library/components/DeleteConfirmModal';
import { LibraryItem, LibraryStatus } from '@/features/library/types/library';

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);
  
  const [statusFilter, setStatusFilter] = useState<LibraryStatus | 'All'>('All');
  const [sortOption, setSortOption] = useState<SortOption>('Newest Added');

  // Modals state
  const [editItem, setEditItem] = useState<LibraryItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<LibraryItem | null>(null);

  // Queries
  const isSearching = debouncedQuery.trim().length > 0;
  const libraryQuery = useMyLibrary();
  const searchQueryResult = useSearchLibrary(debouncedQuery);

  const activeQuery = isSearching ? searchQueryResult : libraryQuery;
  const { data, isPending, isError } = activeQuery;

  // Derived state: Filter & Sort
  const processedData = useMemo(() => {
    if (!data) return [];
    
    // 1. Filter by status
    let result = data;
    if (statusFilter !== 'All') {
      result = result.filter(item => item.status === statusFilter);
    }

    // 2. Sort
    result = [...result].sort((a, b) => {
      switch (sortOption) {
        case 'Newest Added':
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        case 'Highest Rated':
          return (b.rating || 0) - (a.rating || 0);
        case 'Lowest Rated':
          return (a.rating || 0) - (b.rating || 0);
        case 'Title A-Z':
          return (a.title || '').localeCompare(b.title || '');
        case 'Title Z-A':
          return (b.title || '').localeCompare(a.title || '');
        case 'Artist A-Z':
          return (a.artist || '').localeCompare(b.artist || '');
        default:
          return 0;
      }
    });

    return result;
  }, [data, statusFilter, sortOption]);

  const handleEdit = (item: LibraryItem) => setEditItem(item);
  const handleDelete = (item: LibraryItem) => setDeleteItem(item);

  return (
    <div className="flex flex-col w-full relative min-h-screen">
      <LibraryToolbar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      <section className="w-full py-xl pb-xxl" id="libraryResults">
        {isPending ? (
          <LibrarySkeleton />
        ) : isError ? (
          <div className="flex justify-center p-xl text-error">
            Failed to load library.
          </div>
        ) : !data || data.length === 0 ? (
          <LibraryEmptyState />
        ) : processedData.length === 0 ? (
          <div className="flex justify-center p-xl text-on-surface-variant">
            No items match your filters.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-xxl mt-xl">
              {processedData.map((item) => (
                <LibraryCard 
                  key={item.id} 
                  item={item} 
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
            
            {/* Decorative Footer Metadata */}
            <div className="mt-xxl pt-xl border-t border-outline-variant/10 flex items-center justify-between opacity-40 group">
              <div className="flex items-center gap-lg">
                <div className="flex flex-col">
                  <span className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">
                    Archival Total
                  </span>
                  <span className="font-data-lg text-[20px] text-on-surface mt-xs tracking-tighter">
                    {data.length} Records
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Decorative Accent */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] opacity-5 pointer-events-none select-none z-0 hidden 2xl:block">
        <span className="font-display-lg text-[120px] leading-none uppercase tracking-tighter text-on-surface tracking-[-0.03em]">
          Archives
        </span>
      </div>

      <EditSongModal 
        song={editItem} 
        isOpen={!!editItem} 
        onClose={() => setEditItem(null)} 
      />
      
      {deleteItem && (
        <DeleteConfirmModal
          songId={deleteItem.id}
          songTitle={deleteItem.title}
          isOpen={!!deleteItem}
          onClose={() => setDeleteItem(null)}
        />
      )}
    </div>
  );
}
