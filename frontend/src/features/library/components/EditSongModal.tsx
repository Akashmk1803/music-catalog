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
        <DialogHeader className="p-xl pb-md border-b border-outline-variant/10 bg-surface-container-low/50">
          <DialogTitle className="font-headline-md text-headline-md text-on-surface">
            Edit &quot;{song?.title}&quot;
          </DialogTitle>
          <DialogDescription className="text-body-md text-on-surface-variant">
            Update library information for &quot;{song.title}&quot;.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-xl flex flex-col gap-md max-h-[70vh] overflow-y-auto">
          <div className="space-y-xs">
            <label className="text-label-caps text-on-surface-variant uppercase tracking-widest">Title</label>
            <input
              {...register('title')}
              className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-lg p-md text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
            {errors.title && <p className="text-error text-body-sm">{errors.title.message}</p>}
          </div>

          <div className="space-y-xs">
            <label className="text-label-caps text-on-surface-variant uppercase tracking-widest">Artist</label>
            <input
              {...register('artist')}
              className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-lg p-md text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
            {errors.artist && <p className="text-error text-body-sm">{errors.artist.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-md">
            <div className="space-y-xs">
              <label className="text-label-caps text-on-surface-variant uppercase tracking-widest">Genre</label>
              <input
                {...register('genre')}
                className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-lg p-md text-on-surface focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="space-y-xs">
              <label className="text-label-caps text-on-surface-variant uppercase tracking-widest">Year</label>
              <input
                type="number"
                {...register('releaseYear')}
                className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-lg p-md text-on-surface focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-md">
            <div className="space-y-xs">
              <label className="text-label-caps text-on-surface-variant uppercase tracking-widest">Status</label>
              <select
                {...register('status')}
                className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-lg p-md text-on-surface focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option value="Completed">Completed</option>
                <option value="Listening">Listening</option>
                <option value="Planned">Planned</option>
              </select>
            </div>
            <div className="space-y-xs">
              <label className="text-label-caps text-on-surface-variant uppercase tracking-widest">Rating</label>
              <div className="h-[54px] flex items-center bg-surface-container/50 border border-outline-variant/20 rounded-lg px-md">
                <RatingStars
                  rating={ratingValue}
                  interactive={true}
                  size={20}
                  onRate={(val) => setValue('rating', val, { shouldDirty: true })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-xs">
            <label className="text-label-caps text-on-surface-variant uppercase tracking-widest">Notes</label>
            <textarea
              {...register('notes')}
              rows={3}
              className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-lg p-md text-on-surface focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          <div className="mt-md flex justify-end gap-md">
            <button
              type="button"
              onClick={onClose}
              className="px-xl py-md text-on-surface-variant hover:text-on-surface font-label-caps uppercase tracking-widest transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-xl py-md bg-primary text-on-primary font-label-caps rounded-lg hover:brightness-110 transition-all uppercase tracking-widest disabled:opacity-50"
            >
              {isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
