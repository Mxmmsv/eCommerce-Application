import { create } from 'zustand';

type CategoryStore = {
  currentPath: { id: string; name: string }[];
  setCurrentPath: (path: { id: string; name: string }[]) => void;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  currentPath: [],
  setCurrentPath: (path) => set({ currentPath: path }),
}));
