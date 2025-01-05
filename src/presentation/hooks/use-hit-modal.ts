import { create } from 'zustand';

interface HitModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useHitModal = create<HitModalState>((set) => ({
    isOpen: true,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
