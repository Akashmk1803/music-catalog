'use client';

export function AiSkeleton() {
  return (
    <div className="flex flex-col w-full pb-xxl animate-pulse">
      {/* Top Insight Glass Panel */}
      <section className="relative w-full mb-xxl">
        <div className="relative bg-surface-container-low/40 rounded-xl p-8 lg:p-12 border border-white/5 shadow-lg h-[300px]">
          <div className="flex flex-col gap-lg max-w-4xl relative z-10 h-full">
            <div className="flex items-center gap-md mb-md">
              <div className="h-6 w-32 bg-surface-container-high rounded-full"></div>
              <div className="h-4 w-40 bg-surface-container-high rounded"></div>
            </div>
            <div className="h-10 w-full bg-surface-container-high rounded mt-md"></div>
            <div className="h-10 w-3/4 bg-surface-container-high rounded mt-sm"></div>
            <div className="h-16 w-full bg-surface-container-high rounded mt-xl"></div>
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg mb-xxl">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-surface-container-low/40 p-8 rounded-xl border border-white/5 shadow-lg h-[160px] flex flex-col justify-between">
            <div className="h-6 w-6 bg-surface-container-high rounded-full"></div>
            <div>
              <div className="h-4 w-24 bg-surface-container-high rounded mb-sm"></div>
              <div className="h-8 w-16 bg-surface-container-high rounded"></div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
