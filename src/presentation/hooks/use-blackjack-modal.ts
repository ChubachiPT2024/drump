import { create } from 'zustand';

interface BlackJackModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useBlackJackModal = create<BlackJackModalState>((set) => ({
    isOpen: true,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
