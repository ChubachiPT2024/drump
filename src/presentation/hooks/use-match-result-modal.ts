import { create } from 'zustand';

interface MatchResultModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useMatchResultModal = create<MatchResultModalState>((set) => ({
    // TODO: isOpenをfalseにする
    isOpen: true,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
