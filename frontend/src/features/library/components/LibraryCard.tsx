'use client';

import { Edit, Trash2 } from 'lucide-react';
import { LibraryItem } from '../types/library';
import { RatingStars } from '@/components/ui/RatingStars';

interface LibraryCardProps {
  item: LibraryItem;
  onEdit: (item: LibraryItem) => void;
  onDelete: (item: LibraryItem) => void;
}

export function LibraryCard({ item, onEdit, onDelete }: LibraryCardProps) {
  // Determine badge styling based on status
  let statusBadgeClasses = 'border-primary text-primary'; // default Completed
  if (item.status === 'Planned') {
    statusBadgeClasses = 'border-on-surface-variant/40 text-on-surface-variant';
  } else if (item.status === 'Listening') {
    statusBadgeClasses = 'border-secondary text-secondary';
  }

  return (
    <div className="group relative flex flex-col bg-surface-container-low/40 backdrop-blur-md rounded-xl border border-white/5 overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      
      <div className="relative aspect-square overflow-hidden bg-surface-container">
        {item.artworkUrl ? (
          <img 
            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
            src={item.artworkUrl.replace('{w}x{h}', '400x400')} 
            alt={`Artwork for ${item.title}`} 
          />
        ) : (
          <div className="w-full h-full bg-surface-container-highest flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant/30">library_music</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-transparent to-transparent opacity-60"></div>
        
        {/* Hover Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={() => onEdit(item)}
            className="w-10 h-10 bg-surface-container-highest/80 backdrop-blur-md rounded-full flex items-center justify-center text-on-surface/80 hover:text-primary hover:bg-surface-container-highest transition-all shadow-lg"
          >
            <Edit size={16} />
          </button>
          <button 
            onClick={() => onDelete(item)}
            className="w-10 h-10 bg-surface-container-highest/80 backdrop-blur-md rounded-full flex items-center justify-center text-on-surface/80 hover:text-error hover:bg-surface-container-highest transition-all shadow-lg"
          >
            <Trash2 size={16} />
          </button>
        </div>
        
        <div className="absolute bottom-4 left-4">
          <span className={`px-3 py-1 border font-label-caps text-[9px] uppercase tracking-[0.2em] rounded-full bg-surface-container-lowest/50 backdrop-blur-sm ${statusBadgeClasses}`}>
            {item.status || 'Planned'}
          </span>
        </div>
      </div>
      
      <div className="p-6 sm:p-8 flex flex-col gap-1">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h3 className="font-headline-lg text-[20px] text-on-surface leading-tight tracking-tight truncate group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <RatingStars rating={item.rating || 0} size={14} className="mt-1 shrink-0" />
        </div>
        
        <div className="flex flex-col">
          <p className="font-body-sm text-on-surface-variant/80 italic truncate">{item.artist}</p>
          <div className="flex items-center gap-2 mt-4">
            <span className="font-label-caps text-[9px] text-on-surface-variant/50 uppercase tracking-[0.2em] truncate max-w-[120px]">
              {item.genre || 'Unknown'}
            </span>
            {item.releaseYear && (
              <>
                <span className="w-1 h-1 rounded-full bg-outline-variant/30"></span>
                <span className="font-data-md text-[10px] text-primary/60 uppercase tracking-widest">
                  {item.releaseYear}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
