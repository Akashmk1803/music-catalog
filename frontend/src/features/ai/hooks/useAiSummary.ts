import { useQuery } from '@tanstack/react-query';
import { aiService } from '@/services/aiService';
import { queryKeys } from '@/utils/queryKeys';

export const useAiSummary = () => {
  return useQuery({
    queryKey: queryKeys.ai.summary(),
    queryFn: () => aiService.getSummary(),
    // Data is somewhat static unless user adds new songs, but we want manual refresh capability
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1, // Only retry once to avoid long Gemini timeouts
  });
};
