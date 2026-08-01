import { useQuery, useMutation } from '@tanstack/react-query';
import { searchService } from '@/services/searchService';
import { libraryService, SaveLibraryItemRequest } from '@/services/libraryService';
import { toast } from 'sonner';

export const useSearchMusic = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async ({ signal }) => {
      if (!query.trim()) return [];
      return searchService.searchMusic(query, signal);
    },
    // Only enable the query if there is an actual search term
    enabled: query.trim().length > 0,
    // Add some reasonable stale time so back-and-forth doesn't refetch instantly
    staleTime: 1000 * 60 * 5,
  });
};

export const useAddToLibrary = () => {
  return useMutation({
    mutationFn: (item: SaveLibraryItemRequest) => libraryService.addToLibrary(item),
    onSuccess: () => {
      toast.success('Added to Library');
    },
    onError: (error: unknown) => {
      const msg = (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to add to Library';
      toast.error(msg);
    },
  });
};
