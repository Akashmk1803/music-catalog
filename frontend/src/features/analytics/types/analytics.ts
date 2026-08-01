export interface AnalyticsOverview {
  totalSongs: number;
  completedSongs: number;
  listeningSongs: number;
  plannedSongs: number;
  averageRating: number;
}

export interface GenreAnalytics {
  genre: string;
  count: number;
}

export interface RatingAnalytics {
  rating: number;
  count: number;
}

export interface ReleaseYearAnalytics {
  year: number;
  count: number;
}

export interface StatusAnalytics {
  status: string;
  count: number;
}
