export type LibraryStatus = 'Completed' | 'Listening' | 'Planned';

export interface LibraryItem {
  id: number;
  appleCatalogId: number;
  title: string;
  artist: string;
  album: string;
  genre: string;
  releaseYear: number;
  rating: number;
  status: LibraryStatus;
  notes: string;
  createdAt: string;
  artworkUrl: string;
  previewUrl: string;
}

export interface LibraryItemUpdate {
  title: string;
  artist: string;
  album: string;
  genre: string;
  releaseYear: number;
  rating: number;
  status: LibraryStatus;
  notes: string;
}
