export function SearchSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-xl">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="skeleton-card flex flex-col bg-surface-container-low/40 backdrop-blur-md rounded-xl border border-white/5 overflow-hidden shadow-lg animate-pulse">
          <div className="aspect-square w-full bg-surface-container-high/40"></div>
          <div className="p-lg space-y-md">
            <div className="h-6 w-3/4 bg-surface-container-highest rounded"></div>
            <div className="h-4 w-1/2 bg-surface-container-highest/60 rounded"></div>
            
            <div className="grid grid-cols-2 gap-md mt-lg">
              <div className="h-12 bg-surface-container-highest rounded-lg"></div>
              <div className="h-12 bg-surface-container-highest rounded-lg"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
