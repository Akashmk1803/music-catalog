'use client';

import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

export function AiEmptyState() {
  const router = useRouter();

  return (
    <EmptyState
      icon={Sparkles}
      title="No Insights Available"
      description="Gemini needs a foundation to work with. Start adding songs to your catalog to generate personalized AI insights."
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
