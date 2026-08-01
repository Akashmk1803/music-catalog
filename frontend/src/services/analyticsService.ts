import api from '@/utils/axios';
import {
  AnalyticsOverview,
  GenreAnalytics,
  RatingAnalytics,
  ReleaseYearAnalytics,
  StatusAnalytics,
} from '@/features/analytics/types/analytics';

export const analyticsService = {
  getOverview: async (): Promise<AnalyticsOverview> => {
    const response = await api.get<AnalyticsOverview>('/api/analytics/overview');
    return response.data;
  },

  getGenres: async (): Promise<GenreAnalytics[]> => {
    const response = await api.get<GenreAnalytics[]>('/api/analytics/genres');
    return response.data;
  },

  getRatings: async (): Promise<RatingAnalytics[]> => {
    const response = await api.get<RatingAnalytics[]>('/api/analytics/ratings');
    return response.data;
  },

  getStatus: async (): Promise<StatusAnalytics[]> => {
    const response = await api.get<StatusAnalytics[]>('/api/analytics/status');
    return response.data;
  },

  getReleaseYears: async (): Promise<ReleaseYearAnalytics[]> => {
    const response = await api.get<ReleaseYearAnalytics[]>('/api/analytics/release-years');
    return response.data;
  }
};
