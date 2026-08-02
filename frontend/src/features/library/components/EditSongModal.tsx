'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LibraryItem, LibraryItemUpdate } from '../types/library';
import { useUpdateLibraryItem } from '../hooks/useLibraryQueries';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter
} from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FormField } from '@/components/ui/FormField';
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
    <Modal open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <ModalContent className="max-w-md">
        <ModalHeader className="border-b border-white/5 bg-surface-container-low/40">
          <ModalTitle>
            Edit &quot;{song?.title}&quot;
          </ModalTitle>
          <ModalDescription>
            Update library information for &quot;{song.title}&quot;.
          </ModalDescription>
        </ModalHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="p-8 flex flex-col gap-6 max-h-[60vh] overflow-y-auto">
            <FormField label="Title" error={errors.title?.message}>
              <Input
                {...register('title')}
              />
            </FormField>

            <FormField label="Artist" error={errors.artist?.message}>
              <Input
                {...register('artist')}
              />
            </FormField>

            <div className="grid grid-cols-2 gap-6">
              <FormField label="Genre">
                <Input
                  {...register('genre')}
                />
              </FormField>
              <FormField label="Year">
                <Input
                  type="number"
                  {...register('releaseYear')}
                />
              </FormField>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormField label="Status">
                <select
                  {...register('status')}
                  className="w-full bg-transparent border-b border-white/10 py-2 font-body-md text-[14px] text-on-surface outline-none transition-colors focus:border-primary disabled:opacity-50 appearance-none"
                >
                  <option value="Completed" className="bg-surface">Completed</option>
                  <option value="Listening" className="bg-surface">Listening</option>
                  <option value="Planned" className="bg-surface">Planned</option>
                </select>
              </FormField>
              <FormField label="Rating">
                <div className="h-[37px] flex items-center border-b border-white/10 px-0">
                  <RatingStars
                    rating={ratingValue}
                    interactive={true}
                    size={20}
                    onRate={(val) => setValue('rating', val, { shouldDirty: true })}
                  />
                </div>
              </FormField>
            </div>

            <FormField label="Notes">
              <textarea
                {...register('notes')}
                rows={3}
                className="w-full bg-transparent border-b border-white/10 py-2 font-body-md text-[14px] text-on-surface outline-none transition-colors focus:border-primary disabled:opacity-50 resize-none"
              />
            </FormField>
          </div>

          <ModalFooter className="border-t border-white/5 bg-surface-container-low/20">
            <Button
              type="button"
              onClick={onClose}
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              variant="outline"
              loading={isPending}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
