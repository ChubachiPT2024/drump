import { create } from 'zustand';

interface BustModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useBustModal = create<BustModalState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
