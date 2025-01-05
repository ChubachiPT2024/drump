import { create } from 'zustand';

interface RoundStartModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useRoundStartModal = create<RoundStartModalState>((set) => ({
    isOpen: true,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
