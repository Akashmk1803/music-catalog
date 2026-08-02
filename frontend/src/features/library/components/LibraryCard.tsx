'use client';

import { Edit, Trash2 } from 'lucide-react';
import { LibraryItem } from '../types/library';
import { RatingStars } from '@/components/ui/RatingStars';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { IconButton } from '@/components/ui/Button';

interface LibraryCardProps {
  item: LibraryItem;
  onEdit: (item: LibraryItem) => void;
  onDelete: (item: LibraryItem) => void;
}

export function LibraryCard({ item, onEdit, onDelete }: LibraryCardProps) {
  let badgeVariant: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'outline' = 'primary';
  if (item.status === 'Planned') {
    badgeVariant = 'outline';
  } else if (item.status === 'Listening') {
    badgeVariant = 'success';
  }

  return (
    <Card className="group relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
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
          <IconButton
            icon={<Edit size={16} />}
            onClick={() => onEdit(item)}
            className="w-10 h-10 bg-surface-container-highest/80 backdrop-blur-md text-on-surface/80 hover:text-primary hover:bg-surface-container-highest shadow-lg"
          />
          <IconButton
            icon={<Trash2 size={16} />}
            onClick={() => onDelete(item)}
            className="w-10 h-10 bg-surface-container-highest/80 backdrop-blur-md text-on-surface/80 hover:text-error hover:bg-surface-container-highest shadow-lg"
          />
        </div>
        
        <div className="absolute bottom-4 left-4">
          <Badge variant={badgeVariant} className="bg-surface-container-lowest/50 backdrop-blur-sm">
            {item.status || 'Planned'}
          </Badge>
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
          <p className="font-body-sm text-[14px] text-on-surface-variant/80 italic truncate">{item.artist}</p>
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
    </Card>
  );
}
