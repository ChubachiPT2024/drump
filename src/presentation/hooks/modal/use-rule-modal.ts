import { create } from "zustand";

interface RuleModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useRuleModal = create<RuleModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
