import { create } from 'zustand';

type SheetStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSheet = create<SheetStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
