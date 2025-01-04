import { create } from 'zustand';

interface RoundResultModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useRoundResultModal = create<RoundResultModalState>((set) => ({
    // TODO: isOpenをfalseにする
    isOpen: true,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
