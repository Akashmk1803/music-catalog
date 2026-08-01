'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDeleteLibraryItem } from '../hooks/useLibraryQueries';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  songId: number;
  songTitle: string;
}

export function DeleteConfirmModal({ isOpen, onClose, songId, songTitle }: DeleteConfirmModalProps) {
  const { mutate: deleteSong, isPending } = useDeleteLibraryItem();

  const handleDelete = () => {
    deleteSong(songId, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-surface border border-outline-variant/20 text-on-surface w-full max-w-sm gap-0 p-0 overflow-hidden">
        <DialogHeader className="p-xl pb-md border-b border-outline-variant/10 bg-error/10">
          <DialogTitle className="font-headline-md text-headline-md text-error">Delete Song</DialogTitle>
        </DialogHeader>

        <div className="p-xl flex flex-col gap-md">
          <p className="text-body-md text-on-surface">
            Are you sure you want to delete &quot;{songTitle}&quot;?
          </p>
          <p className="text-body-sm text-on-surface-variant">
            This action cannot be undone.
          </p>

          <div className="mt-xl flex justify-end gap-md">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-lg py-sm text-on-surface-variant hover:text-on-surface font-label-caps uppercase tracking-widest transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              className="px-lg py-sm bg-error text-on-error font-label-caps rounded-lg hover:brightness-110 transition-all uppercase tracking-widest disabled:opacity-50"
            >
              {isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
