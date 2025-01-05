import { create } from 'zustand';

interface StandModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useStandModal = create<StandModalState>((set) => ({
    isOpen: true,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
