import { useEffect } from "react";
import { motion } from "framer-motion";

import { useRotationModal } from "@/presentation/hooks/modal/use-rotation-modal";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/presentation/shadcnUI/components/ui/dialog";

import { ANIMATION_TIMING_MILLISECONDS } from "@/presentation/constants/animation";

interface RotationModalProps {
  name: string;
}

export const RotationModal = ({ name }: RotationModalProps) => {
  const isOpen = useRotationModal((state) => state.isOpen);
  const onClose = useRotationModal((state) => state.onClose);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, ANIMATION_TIMING_MILLISECONDS.MODAL_CLOSE);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  const modalVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: "0%",
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
          overlayClassName="bg-slate-50/5"
          className="bg-slate-900/80 h-[35vh] max-w-[100vw] w-full flex items-center justify-center sm:rounded-none border-1 border-slate-900 py-2 data-[state=open]:slide-in-from-left-full data-[state=closed]:slide-out-to-right-full data-[state=open]:duration-700 data-[state=closed]:duration-700"
        >
          <DialogHeader className="relative w-full h-full flex flex-col items-center justify-between">
            <DialogDescription className="sr-only">
              Rotation notification modal with decorative card images and
              animations
            </DialogDescription>
            <div className="relative w-full flex items-center justify-center">
              <div className="w-full h-[2px] filter blur-sm bg-white shadow-[0_0_8px_1px_rgba(255,255,255,0.5)]" />
            </div>
            <DialogTitle className="text-5xl md:text-6xl xl:text-7xl">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={modalVariants}
                className="relative z-10"
              >
                <div className="relative px-4 pb-1">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-white to-gray-100 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    {name}'s turn!
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-white/30 via-white/20 to-white/30 blur-lg -z-10" />
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                </div>
              </motion.div>
            </DialogTitle>
            <div className="relative w-full flex items-center justify-center">
              <div className="w-full h-[2px] filter blur-sm bg-white shadow-[0_0_8px_1px_rgba(255,255,255,0.5)]" />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
