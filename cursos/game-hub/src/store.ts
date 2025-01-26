import { create } from 'zustand';
import { GameQuery } from './types/query';
import { Genre } from './types/genre';
import { Platform } from './types/platform';

interface GameQueryStore {
  gameQuery: GameQuery;
  setSearchText: (searchText: string) => void;
  setGenreId: (id: Genre['id']) => void;
  setPlatformId: (id: Platform['id']) => void;
  setSortOrder: (sortOrder: string) => void;
}

const useGameQueryStore = create<GameQueryStore>((set) => ({
  gameQuery: {},
  setGenreId: (id) =>
    set((store) => ({ gameQuery: { ...store.gameQuery, genres: id } })),
  setPlatformId: (id) =>
    set((store) => ({
      gameQuery: { ...store.gameQuery, parent_platforms: id },
    })),
  setSearchText: (searchText) =>
    set(() => ({ gameQuery: { search: searchText } })),
  setSortOrder: (sortOrder) =>
    set((store) => ({
      gameQuery: { ...store.gameQuery, ordering: sortOrder },
    })),
}));

export default useGameQueryStore;
