'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

export function AiSkeleton() {
  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Insight Glass Panel */}
      <section className="relative w-full mb-8">
        <Card className="h-[300px]">
          <CardContent className="flex flex-col gap-6 max-w-4xl relative z-10 h-full p-8 sm:p-12">
            <div className="flex items-center gap-4 mb-4">
              <Skeleton className="h-6 w-32 rounded-full" />
              <Skeleton className="h-4 w-40" />
            </div>
            <Skeleton className="h-10 w-full mt-4" />
            <Skeleton className="h-10 w-3/4 mt-2" />
            <Skeleton className="h-16 w-full mt-6" />
          </CardContent>
        </Card>
      </section>

      {/* Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="h-[160px]">
            <CardContent className="p-8 h-full flex flex-col justify-between">
              <Skeleton className="h-6 w-6 rounded-full" />
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
