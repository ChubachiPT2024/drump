import { create } from 'zustand';

interface BetModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useBetModal = create<BetModalState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
