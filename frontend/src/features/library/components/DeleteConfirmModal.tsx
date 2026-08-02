'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter
} from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
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
    <Modal open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <ModalContent className="max-w-sm">
        <ModalHeader className="border-b border-error/10 bg-error/5">
          <ModalTitle className="text-error">Delete Song</ModalTitle>
          <ModalDescription className="sr-only">
            Confirm deletion of the song
          </ModalDescription>
        </ModalHeader>

        <div className="p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="font-body-lg text-[16px] text-on-surface">
              Are you sure you want to delete &quot;{songTitle}&quot;?
            </p>
            <p className="font-body-md text-[14px] text-on-surface-variant/80">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <ModalFooter>
          <Button
            type="button"
            onClick={onClose}
            disabled={isPending}
            variant="ghost"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            variant="danger"
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
