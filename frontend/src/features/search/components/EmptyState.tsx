'use client';

import { SearchX } from 'lucide-react';
import { EmptyState as BaseEmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  onBrowseAll: () => void;
}

export function EmptyState({ onBrowseAll }: EmptyStateProps) {
  return (
    <BaseEmptyState
      id="emptyState"
      icon={SearchX}
      title="No songs matched your search"
      description="Refine your keywords or browse our trending genres for fresh inspiration."
      action={
        <Button 
          onClick={onBrowseAll}
          variant="primary"
          size="lg"
        >
          Browse All Music
        </Button>
      }
    />
  );
}
