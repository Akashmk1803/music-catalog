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
        <DialogHeader className="p-8 pb-6 border-b border-error/10 bg-error/5">
          <DialogTitle className="font-headline-md text-[22px] text-error">Delete Song</DialogTitle>
        </DialogHeader>

        <div className="p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-body-lg text-on-surface">
              Are you sure you want to delete &quot;{songTitle}&quot;?
            </p>
            <p className="text-body-md text-on-surface-variant/80">
              This action cannot be undone.
            </p>
          </div>

          <div className="mt-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-6 py-2.5 text-on-surface-variant/80 hover:text-on-surface font-label-caps text-xs uppercase tracking-[0.2em] transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              className="px-6 py-2.5 bg-error/10 text-error border border-error/20 font-label-caps text-xs rounded-lg hover:bg-error hover:text-on-error transition-all uppercase tracking-[0.2em] disabled:opacity-50"
            >
              {isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
