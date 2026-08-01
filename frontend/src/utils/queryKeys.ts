export const queryKeys = {
  search: {
    all: ['search'] as const,
    query: (q: string) => [...queryKeys.search.all, q] as const,
  },
  library: {
    all: ['library'] as const,
    search: (q: string) => [...queryKeys.library.all, 'search', q] as const,
  },
  analytics: {
    all: ['analytics'] as const,
    overview: () => [...queryKeys.analytics.all, 'overview'] as const,
    genres: () => [...queryKeys.analytics.all, 'genres'] as const,
    ratings: () => [...queryKeys.analytics.all, 'ratings'] as const,
    status: () => [...queryKeys.analytics.all, 'status'] as const,
    releaseYears: () => [...queryKeys.analytics.all, 'releaseYears'] as const,
  },
  ai: {
    all: ['ai'] as const,
    summary: () => [...queryKeys.ai.all, 'summary'] as const,
  }
};
