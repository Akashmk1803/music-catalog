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
        <div className="absolute top-md right-md flex flex-col gap-sm translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={() => onEdit(item)}
            className="w-10 h-10 bg-surface-container-highest/80 backdrop-blur-md flex items-center justify-center text-on-surface/80 hover:text-primary transition-colors"
          >
            <Edit size={18} />
          </button>
          <button 
            onClick={() => onDelete(item)}
            className="w-10 h-10 bg-surface-container-highest/80 backdrop-blur-md flex items-center justify-center text-on-surface/80 hover:text-error transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
        
        <div className="absolute bottom-md left-md">
          <span className={`px-sm py-[2px] border font-label-caps text-[10px] uppercase tracking-tighter ${statusBadgeClasses}`}>
            {item.status || 'Planned'}
          </span>
        </div>
      </div>
      
      <div className="p-6 sm:p-8 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <h3 className="font-headline-lg text-[22px] text-on-surface leading-tight tracking-tight truncate">
            {item.title}
          </h3>
          <RatingStars rating={item.rating || 0} size={14} className="mt-xs shrink-0" />
        </div>
        
        <div className="flex flex-col">
          <p className="font-body-md text-on-surface-variant/80 italic truncate">{item.artist}</p>
          <div className="flex items-center gap-xs mt-xs">
            <span className="font-data-md text-data-md text-on-surface-variant/40 truncate max-w-[120px]">
              {item.genre || 'Unknown'}
            </span>
            {item.releaseYear && (
              <>
                <span className="w-1 h-1 rounded-full bg-outline-variant/30"></span>
                <span className="font-data-md text-data-md text-on-surface-variant/40">
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
