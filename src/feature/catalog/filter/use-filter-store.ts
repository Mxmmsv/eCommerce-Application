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
  priceRange: [number, number];
  availablePriceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  setAvailablePriceRange: (range: [number, number]) => void;
  isPriceRangeChanged: boolean;
  markPriceRangeChanged: (changed: boolean) => void;
  isPriceFilterActive: boolean;
  applyPriceFilter: (isActive: boolean) => void;
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

  priceRange: [0, 50],
  availablePriceRange: [0, 50],
  setAvailablePriceRange: (range) => set({ availablePriceRange: range }),
  isPriceRangeChanged: false,
  markPriceRangeChanged: (changed) => set({ isPriceRangeChanged: changed }),
  isPriceFilterActive: false,
  applyPriceFilter: (isActive) => set({ isPriceFilterActive: isActive }),

  setPriceRange: (range) => set({ priceRange: range }),

  resetAllFilters: () =>
    set({
      selectedTypes: [],
      onlyDiscounted: false,
      priceRange: [0, 50],
      isPriceFilterActive: false,
    }),
}));
