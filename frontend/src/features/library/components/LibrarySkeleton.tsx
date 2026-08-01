export function LibrarySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-xxl mt-xxl">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="skeleton-card flex flex-col bg-surface-container-lowest/30 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden animate-pulse">
          <div className="aspect-square w-full bg-surface-container-high/40"></div>
          <div className="p-lg space-y-md">
            <div className="flex justify-between items-start">
              <div className="h-6 w-3/4 bg-surface-container-highest rounded"></div>
              <div className="h-4 w-16 bg-surface-container-highest rounded"></div>
            </div>
            
            <div className="space-y-xs">
              <div className="h-4 w-1/2 bg-surface-container-highest/60 rounded"></div>
              <div className="h-3 w-1/3 bg-surface-container-highest/40 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
