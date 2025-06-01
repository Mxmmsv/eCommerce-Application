import { create } from 'zustand';

type SortStore = {
  sortOption: string;
  setSortOption: (option: string) => void;
};

export const useSortStore = create<SortStore>((set) => ({
  sortOption: 'none',
  setSortOption: (option) => {
    set({ sortOption: option });
  },
}));
