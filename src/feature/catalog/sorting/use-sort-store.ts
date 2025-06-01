import { create } from 'zustand';

import type { SortOption } from '../types';

type SortStore = {
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
};

export const useSortStore = create<SortStore>((set) => ({
  sortOption: null,
  setSortOption: (option) => {
    console.log('Setting sort option:', option);
    if (option !== null && !['price asc', 'price desc', 'name asc'].includes(option)) {
      return;
    }
    set({ sortOption: option });
  },
}));
