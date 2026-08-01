import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { libraryService } from '@/services/libraryService';
import { LibraryItem, LibraryItemUpdate } from '../types/library';
import { queryKeys } from '@/utils/queryKeys';
import { toast } from 'sonner';

export const useMyLibrary = () => {
  return useQuery({
    queryKey: queryKeys.library.all,
    queryFn: () => libraryService.getMyLibrary(),
  });
};

export const useSearchLibrary = (keyword: string) => {
  return useQuery({
    queryKey: queryKeys.library.search(keyword),
    queryFn: () => libraryService.searchLibrary(keyword),
    enabled: keyword.trim().length > 0,
  });
};

export const useUpdateLibraryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: LibraryItemUpdate }) =>
      libraryService.updateLibraryItem(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.library.all });

      const previousLibrary = queryClient.getQueryData<LibraryItem[]>(queryKeys.library.all);

      if (previousLibrary) {
        queryClient.setQueryData<LibraryItem[]>(queryKeys.library.all, (old) => {
          if (!old) return old;
          return old.map((item) => (item.id === id ? { ...item, ...data } : item));
        });
      }

      return { previousLibrary };
    },
    onError: (err, newTodo, context) => {
      if (context?.previousLibrary) {
        queryClient.setQueryData(queryKeys.library.all, context.previousLibrary);
      }
      toast.error('Failed to update library item');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.library.all });
    },
    onSuccess: () => {
      toast.success('Library updated');
    },
  });
};

export const useDeleteLibraryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => libraryService.deleteLibraryItem(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.library.all });

      const previousLibrary = queryClient.getQueryData<LibraryItem[]>(queryKeys.library.all);

      if (previousLibrary) {
        queryClient.setQueryData<LibraryItem[]>(queryKeys.library.all, (old) => {
          if (!old) return old;
          return old.filter((item) => item.id !== id);
        });
      }

      return { previousLibrary };
    },
    onError: (err, newTodo, context) => {
      if (context?.previousLibrary) {
        queryClient.setQueryData(queryKeys.library.all, context.previousLibrary);
      }
      toast.error('Failed to delete library item');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.library.all });
    },
    onSuccess: () => {
      toast.success('Item removed from library');
    },
  });
};
