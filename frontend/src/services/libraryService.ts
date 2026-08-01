import api from '@/utils/axios';
import { LibraryItem, LibraryItemUpdate } from '@/features/library/types/library';

export interface SaveLibraryItemRequest {
  appleCatalogId: number;
  title: string;
  artist?: string;
  album?: string;
  genre?: string;
  releaseYear?: number;
  artworkUrl?: string;
  previewUrl?: string;
  rating?: number;
  status?: string;
  notes?: string;
}

export const libraryService = {
  addToLibrary: async (item: SaveLibraryItemRequest) => {
    const response = await api.post('/api/library', item);
    return response.data;
  },

  getMyLibrary: async (): Promise<LibraryItem[]> => {
    const response = await api.get<LibraryItem[]>('/api/library');
    return response.data;
  },

  searchLibrary: async (keyword: string): Promise<LibraryItem[]> => {
    const response = await api.get<LibraryItem[]>('/api/library/search-all', {
      params: { keyword }
    });
    return response.data;
  },

  updateLibraryItem: async (id: number, data: LibraryItemUpdate): Promise<LibraryItem> => {
    const response = await api.put<LibraryItem>(`/api/library/${id}`, data);
    return response.data;
  },

  deleteLibraryItem: async (id: number): Promise<void> => {
    await api.delete(`/api/library/${id}`);
  }
};

