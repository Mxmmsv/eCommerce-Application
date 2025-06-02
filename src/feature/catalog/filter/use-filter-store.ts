import { create } from 'zustand';

import type { PosterType } from '../types';

type FilterStore = {
  availableTypes: PosterType[];
  selectedTypes: string[];
  setAvailableTypes: (types: PosterType[]) => void;
  toggleType: (typeId: string) => void;
  resetTypes: () => void;
  onlyDiscounted: boolean;
  toggleDiscounted: () => void;
  resetAllFilters: () => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  availableTypes: [],
  selectedTypes: [],
  setAvailableTypes: (types) => set({ availableTypes: types }),
  toggleType: (type) =>
    set((state) => ({
      selectedTypes: state.selectedTypes.includes(type)
        ? state.selectedTypes.filter((t) => t !== type)
        : [...state.selectedTypes, type],
    })),
  resetTypes: () => set({ selectedTypes: [] }),
  onlyDiscounted: false,
  toggleDiscounted: () => set((state) => ({ onlyDiscounted: !state.onlyDiscounted })),
  resetAllFilters: () =>
    set({
      selectedTypes: [],
      onlyDiscounted: false,
    }),
}));
