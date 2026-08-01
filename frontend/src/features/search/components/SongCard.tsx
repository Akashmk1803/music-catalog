'use client';

import { Play, Plus, Loader2 } from 'lucide-react';
import { SearchResult } from '../types/search';
import { formatReleaseYear } from '@/utils/formatReleaseYear';
import { useAddToLibrary } from '../hooks/useSearchQueries';
import { useState } from 'react';

interface SongCardProps {
  song: SearchResult;
}

export function SongCard({ song }: SongCardProps) {
  const { mutate: addToLibrary, isPending } = useAddToLibrary();
  const [isAdded, setIsAdded] = useState(false);
  const releaseYear = formatReleaseYear(song.releaseDate);

  const handleAdd = () => {
    if (isAdded) return;
    
    addToLibrary(
      {
        appleCatalogId: song.appleCatalogId,
        title: song.title,
        artist: song.artistName,
        genre: song.genre,
        releaseYear: releaseYear || undefined,
        artworkUrl: song.artworkUrl,
        previewUrl: song.previewUrl,
        status: 'WANT_TO_LISTEN',
      },
      {
        onSuccess: () => setIsAdded(true),
      }
    );
  };

  return (
    <div className="group relative bg-surface-container-low/40 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-surface-container-high/40 flex flex-col">
      <div className="aspect-square w-full overflow-hidden relative">
        {song.artworkUrl ? (
          <img 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            src={song.artworkUrl.replace('{w}x{h}', '400x400')} 
            alt={`Artwork for ${song.title}`} 
          />
        ) : (
          <div className="w-full h-full bg-surface-container-highest flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant/30">music_note</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-lg">
          <span className="text-label-caps text-primary tracking-widest uppercase">Premium Catalog Artifact</span>
        </div>
      </div>
      
      <div className="p-6 sm:p-8 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4 gap-4">
          <div className="overflow-hidden">
            <h3 className="font-headline-md text-[20px] text-on-surface mb-xs group-hover:text-primary transition-colors truncate">
              {song.title}
            </h3>
            <p className="text-body-md text-on-surface-variant truncate">{song.artistName}</p>
          </div>
          {releaseYear && (
            <span className="font-data-md text-data-md text-primary/60 shrink-0">{releaseYear}</span>
          )}
        </div>
        
        <div className="flex items-center gap-2 mb-6 mt-auto">
          <span className="text-label-caps text-on-surface-variant/60 uppercase tracking-tighter">Genre:</span>
          <span className="text-body-sm text-on-surface-variant italic truncate">{song.genre || 'Unknown'}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <a 
            href={song.previewUrl || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-sm bg-primary text-on-primary font-label-caps py-md rounded-lg hover:brightness-110 transition-all active:scale-95 ${!song.previewUrl && 'opacity-50 pointer-events-none'}`}
          >
            <Play size={18} fill="currentColor" /> Preview
          </a>
          <button 
            onClick={handleAdd}
            disabled={isAdded || isPending}
            className={`flex items-center justify-center gap-sm border-t border-white/10 font-label-caps py-md rounded-lg transition-all active:scale-95 ${
              isAdded 
                ? 'bg-primary/20 text-primary border-primary/20' 
                : 'bg-surface-container-highest/40 text-on-surface hover:bg-surface-container-highest'
            }`}
          >
            {isPending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : isAdded ? (
              'Added'
            ) : (
              <>
                <Plus size={18} /> Library
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
