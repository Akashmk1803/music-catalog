import api from '@/utils/axios';
import { SearchResult } from '@/features/search/types/search';

export const searchService = {
  searchMusic: async (query: string, signal?: AbortSignal): Promise<SearchResult[]> => {
    const response = await api.get<SearchResult[]>('/api/search', {
      params: { query },
      signal, // Modern Axios supports AbortSignal for cancellation
    });
    return response.data;
  },
};
