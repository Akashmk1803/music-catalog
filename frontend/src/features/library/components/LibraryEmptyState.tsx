'use client';

import { Library } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

export function LibraryEmptyState() {
  const router = useRouter();

  return (
    <EmptyState
      id="emptyState"
      icon={Library}
      title="Your library is empty"
      description="Start building your personal catalog by searching for your favorite tracks and adding them to your collection."
      action={
        <Button 
          onClick={() => router.push('/search')}
          variant="primary"
          size="lg"
        >
          Search Music
        </Button>
      }
    />
  );
}
