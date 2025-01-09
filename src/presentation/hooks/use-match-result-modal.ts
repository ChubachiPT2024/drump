import { create } from 'zustand';

interface MatchResultModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useMatchResultModal = create<MatchResultModalState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
