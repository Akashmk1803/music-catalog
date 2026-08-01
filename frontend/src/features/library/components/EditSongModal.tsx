'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LibraryItem, LibraryItemUpdate } from '../types/library';
import { useUpdateLibraryItem } from '../hooks/useLibraryQueries';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { RatingStars } from '@/components/ui/RatingStars';
import { useEffect } from 'react';

const editSongSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  artist: z.string().min(1, 'Artist is required'),
  album: z.string().optional(),
  genre: z.string().optional(),
  releaseYear: z.any().transform(val => val ? Number(val) : undefined),
  rating: z.number().min(1).max(5).optional(),
  status: z.enum(['Completed', 'Listening', 'Planned']),
  notes: z.string().optional(),
});

type EditSongFormValues = z.infer<typeof editSongSchema>;

interface EditSongModalProps {
  song: LibraryItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EditSongModal({ song, isOpen, onClose }: EditSongModalProps) {
  const { mutate: updateSong, isPending } = useUpdateLibraryItem();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditSongFormValues>({
    resolver: zodResolver(editSongSchema),
    defaultValues: {
      status: 'Planned',
      rating: 0,
    },
  });

  const ratingValue = watch('rating') || 0;

  useEffect(() => {
    if (song && isOpen) {
      reset({
        title: song.title,
        artist: song.artist,
        album: song.album || '',
        genre: song.genre || '',
        releaseYear: song.releaseYear || undefined,
        rating: song.rating || 0,
        status: song.status || 'Planned',
        notes: song.notes || '',
      });
    }
  }, [song, isOpen, reset]);

  const onSubmit = (data: EditSongFormValues) => {
    if (!song) return;
    updateSong(
      { id: song.id, data: data as LibraryItemUpdate },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  if (!song) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-surface border border-outline-variant/20 text-on-surface w-full max-w-md gap-0 p-0 overflow-hidden">
        <DialogHeader className="p-8 pb-6 border-b border-white/5 bg-surface-container-low/40">
          <DialogTitle className="font-headline-md text-[22px] text-on-surface">
            Edit &quot;{song?.title}&quot;
          </DialogTitle>
          <DialogDescription className="text-body-md text-on-surface-variant">
            Update library information for &quot;{song.title}&quot;.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 flex flex-col gap-6 max-h-[70vh] overflow-y-auto">
          <div className="space-y-2">
            <label className="text-[10px] font-label-caps text-on-surface-variant/60 uppercase tracking-[0.2em]">Title</label>
            <input
              {...register('title')}
              className="w-full bg-surface-container-lowest/50 border-b border-white/10 rounded-t-lg p-3 text-on-surface text-body-md focus:outline-none focus:bg-surface-container-low/60 focus:border-primary/50 transition-all shadow-sm"
            />
            {errors.title && <p className="text-error text-body-sm">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-label-caps text-on-surface-variant/60 uppercase tracking-[0.2em]">Artist</label>
            <input
              {...register('artist')}
              className="w-full bg-surface-container-lowest/50 border-b border-white/10 rounded-t-lg p-3 text-on-surface text-body-md focus:outline-none focus:bg-surface-container-low/60 focus:border-primary/50 transition-all shadow-sm"
            />
            {errors.artist && <p className="text-error text-body-sm">{errors.artist.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-label-caps text-on-surface-variant/60 uppercase tracking-[0.2em]">Genre</label>
              <input
                {...register('genre')}
                className="w-full bg-surface-container-lowest/50 border-b border-white/10 rounded-t-lg p-3 text-on-surface text-body-md focus:outline-none focus:bg-surface-container-low/60 focus:border-primary/50 transition-all shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-label-caps text-on-surface-variant/60 uppercase tracking-[0.2em]">Year</label>
              <input
                type="number"
                {...register('releaseYear')}
                className="w-full bg-surface-container-lowest/50 border-b border-white/10 rounded-t-lg p-3 text-on-surface text-body-md focus:outline-none focus:bg-surface-container-low/60 focus:border-primary/50 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-label-caps text-on-surface-variant/60 uppercase tracking-[0.2em]">Status</label>
              <select
                {...register('status')}
                className="w-full bg-surface-container-lowest/50 border-b border-white/10 rounded-t-lg p-3 text-on-surface text-body-md focus:outline-none focus:bg-surface-container-low/60 focus:border-primary/50 transition-all shadow-sm appearance-none"
              >
                <option value="Completed">Completed</option>
                <option value="Listening">Listening</option>
                <option value="Planned">Planned</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-label-caps text-on-surface-variant/60 uppercase tracking-[0.2em]">Rating</label>
              <div className="h-[46px] flex items-center bg-surface-container-lowest/50 border-b border-white/10 rounded-t-lg px-4 shadow-sm">
                <RatingStars
                  rating={ratingValue}
                  interactive={true}
                  size={20}
                  onRate={(val) => setValue('rating', val, { shouldDirty: true })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-label-caps text-on-surface-variant/60 uppercase tracking-[0.2em]">Notes</label>
            <textarea
              {...register('notes')}
              rows={3}
              className="w-full bg-surface-container-lowest/50 border-b border-white/10 rounded-t-lg p-3 text-on-surface text-body-md focus:outline-none focus:bg-surface-container-low/60 focus:border-primary/50 transition-all shadow-sm resize-none"
            />
          </div>

          <div className="mt-4 pt-6 border-t border-white/5 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-on-surface-variant/80 hover:text-on-surface font-label-caps text-xs uppercase tracking-[0.2em] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 bg-primary/10 text-primary border border-primary/20 font-label-caps text-xs rounded-lg hover:bg-primary hover:text-on-primary transition-all uppercase tracking-[0.2em] disabled:opacity-50"
            >
              {isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
