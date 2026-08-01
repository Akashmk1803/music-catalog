import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '@/services/analyticsService';
import { queryKeys } from '@/utils/queryKeys';

export const useAnalyticsOverview = () => {
  return useQuery({
    queryKey: queryKeys.analytics.overview(),
    queryFn: () => analyticsService.getOverview(),
  });
};

export const useAnalyticsGenres = () => {
  return useQuery({
    queryKey: queryKeys.analytics.genres(),
    queryFn: () => analyticsService.getGenres(),
  });
};

export const useAnalyticsRatings = () => {
  return useQuery({
    queryKey: queryKeys.analytics.ratings(),
    queryFn: () => analyticsService.getRatings(),
  });
};

export const useAnalyticsStatus = () => {
  return useQuery({
    queryKey: queryKeys.analytics.status(),
    queryFn: () => analyticsService.getStatus(),
  });
};

export const useAnalyticsReleaseYears = () => {
  return useQuery({
    queryKey: queryKeys.analytics.releaseYears(),
    queryFn: () => analyticsService.getReleaseYears(),
  });
};
