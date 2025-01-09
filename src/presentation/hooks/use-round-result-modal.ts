import { create } from 'zustand';

interface RoundResultModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useRoundResultModal = create<RoundResultModalState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
