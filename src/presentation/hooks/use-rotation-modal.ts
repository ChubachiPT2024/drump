import { create } from 'zustand';

interface RotationModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useRotationModal = create<RotationModalState>((set) => ({
    isOpen: true,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
