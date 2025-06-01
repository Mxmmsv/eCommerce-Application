import { create } from 'zustand';

type SortStore = {
  sortOption: string | undefined;
  setSortOption: (option: string | undefined) => void;
};

export const useSortStore = create<SortStore>((set) => ({
  sortOption: undefined,
  setSortOption: (option) => {
    set({ sortOption: option });
  },
}));
