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
        
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 flex items-end p-6">
          <span className="text-[10px] font-label-caps text-primary tracking-widest uppercase">Premium Catalog Artifact</span>
        </div>
      </div>
      
      <div className="p-6 sm:p-8 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-4 mb-2">
          <div className="overflow-hidden">
            <h3 className="font-headline-md text-[18px] leading-tight text-on-surface group-hover:text-primary transition-colors truncate">
              {song.title}
            </h3>
            <p className="text-body-sm text-on-surface-variant/80 italic truncate mt-0.5">{song.artistName}</p>
          </div>
          {releaseYear && (
            <span className="text-[10px] font-data-md text-primary/60 shrink-0 uppercase tracking-widest">{releaseYear}</span>
          )}
        </div>
        
        <div className="flex items-center gap-2 mb-8 mt-auto">
          <span className="text-[9px] font-label-caps text-on-surface-variant/50 uppercase tracking-[0.2em]">Genre:</span>
          <span className="text-body-sm text-on-surface-variant/90 truncate">{song.genre || 'Unknown'}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <a 
            href={song.previewUrl || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 bg-primary/10 text-primary font-label-caps py-2.5 rounded-lg hover:bg-primary/20 transition-all active:scale-95 text-xs tracking-widest uppercase ${!song.previewUrl && 'opacity-50 pointer-events-none'}`}
          >
            <Play size={16} fill="currentColor" /> Preview
          </a>
          <button 
            onClick={handleAdd}
            disabled={isAdded || isPending}
            className={`flex items-center justify-center gap-2 border border-white/5 font-label-caps py-2.5 rounded-lg transition-all active:scale-95 text-xs tracking-widest uppercase ${
              isAdded 
                ? 'bg-primary/5 text-primary border-primary/20' 
                : 'bg-surface-container-highest/30 text-on-surface hover:bg-surface-container-highest/60 hover:border-white/10'
            }`}
          >
            {isPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : isAdded ? (
              'Added'
            ) : (
              <>
                <Plus size={16} /> Library
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
