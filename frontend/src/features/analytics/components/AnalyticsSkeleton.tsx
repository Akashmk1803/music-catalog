export function AnalyticsSkeleton() {
  return (
    <div className="flex flex-col w-full gap-xxl pb-xxl animate-pulse">
      <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
        <div className="md:col-span-8 flex flex-col gap-md">
          <div className="flex items-baseline gap-md">
            <div className="h-4 w-32 bg-surface-container-high rounded"></div>
            <div className="h-[1px] flex-1 bg-outline-variant/20"></div>
          </div>
          <div className="h-12 w-3/4 bg-surface-container-high rounded mt-md"></div>
        </div>
        <div className="md:col-span-4 bg-surface-container-high/40 p-xl rounded-xl h-[120px]"></div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-surface-container-low/40 p-8 rounded-xl border border-white/5 h-[140px] shadow-lg">
            <div className="h-6 w-6 bg-surface-container-high rounded-full mb-lg"></div>
            <div className="h-4 w-24 bg-surface-container-high rounded mb-sm"></div>
            <div className="h-8 w-16 bg-surface-container-high rounded"></div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-7 bg-surface-container/30 p-xl h-[350px] rounded-xl border border-white/5 shadow-lg"></div>
        <div className="lg:col-span-5 bg-surface-container/30 p-xl h-[350px] rounded-xl border border-white/5 shadow-lg"></div>
      </section>
      
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-8 bg-surface-container/30 p-xl h-[400px] rounded-xl border border-white/5 shadow-lg"></div>
        <div className="lg:col-span-4 flex flex-col gap-gutter">
          <div className="bg-surface-container/30 p-xl h-[180px] rounded-xl border border-white/5 shadow-lg"></div>
          <div className="bg-surface-container/30 p-xl h-[180px] rounded-xl border border-white/5 shadow-lg"></div>
        </div>
      </section>
    </div>
  );
}
