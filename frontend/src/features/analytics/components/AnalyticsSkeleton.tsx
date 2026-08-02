import { Card, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

export function AnalyticsSkeleton() {
  return (
    <div className="flex flex-col w-full gap-16 pb-16">
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-8 flex flex-col gap-6">
          <div className="flex items-baseline gap-6">
            <Skeleton className="h-4 w-32 rounded" />
            <div className="h-[1px] flex-1 bg-outline-variant/20"></div>
          </div>
          <Skeleton className="h-12 w-3/4 rounded mt-6" />
        </div>
        <Skeleton className="md:col-span-4 rounded-xl h-[120px]" />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="h-[140px]">
            <CardContent className="p-8">
              <Skeleton className="h-6 w-6 rounded-full mb-8" />
              <Skeleton className="h-4 w-24 rounded mb-2" />
              <Skeleton className="h-8 w-16 rounded" />
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-7 h-[350px]">
            <CardContent />
        </Card>
        <Card className="lg:col-span-5 h-[350px]">
            <CardContent />
        </Card>
      </section>
      
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-8 h-[400px]">
            <CardContent />
        </Card>
        <div className="lg:col-span-4 flex flex-col gap-8">
          <Card className="h-[180px]"><CardContent /></Card>
          <Card className="h-[180px]"><CardContent /></Card>
        </div>
      </section>
    </div>
  );
}
