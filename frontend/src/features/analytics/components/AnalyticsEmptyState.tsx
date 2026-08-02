'use client';

import { useRouter } from 'next/navigation';
import { BarChart3 } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

export function AnalyticsEmptyState() {
  const router = useRouter();

  return (
    <EmptyState
      icon={BarChart3}
      title="No Analytics Available"
      description="Your library is currently empty. Start adding songs to your catalog to generate personalized analytics and insights."
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
