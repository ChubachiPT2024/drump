import { useEffect } from "react";
import { motion } from "framer-motion";

import { useBlackJackModal } from "@/presentation/hooks/modal/use-blackjack-modal";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/presentation/shadcnUI/components/ui/dialog";

import { ANIMATION_TIMING_MS } from "@/presentation/constants/animation";

export const BlackjackModal = () => {
  const isOpen = useBlackJackModal((state) => state.isOpen);
  const onClose = useBlackJackModal((state) => state.onClose);

  // ダイアログを自動的に閉じる;
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, ANIMATION_TIMING_MS.MODAL_CLOSE);

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
          className="bg-slate-900/80 h-[45vh] max-w-[100vw] w-full flex items-center justify-center sm:rounded-none border-1 border-slate-900 py-2"
        >
          <DialogHeader className="relative w-full h-full flex flex-col items-center justify-between">
            <DialogDescription className="sr-only">
              Black jack notification modal with decorative crown images and
              animations
            </DialogDescription>
            <div className="relative w-full flex items-center justify-center">
              <div className="w-1/2 h-[2px] filter blur-sm bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-800 shadow-[0_0_8px_1px_rgba(208,169,0,1)]" />
              <div className="flex items-center justify-center mx-4">
                <img src="/crown.png" alt="Decoration" className="w-[200px]" />
              </div>
              <div className="w-1/2 h-[2px] filter blur-sm bg-gradient-to-r from-yellow-800 via-yellow-600 to-yellow-400 shadow-[0_0_8px_1px_rgba(208,169,0,1)]" />
            </div>

            <DialogTitle>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={modalVariants}
                className="relative z-10 text-5xl md:text-6xl xl:text-7xl uppercase text-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-yellow-300/20 via-yellow-500/20 to-yellow-300/20" />
                  <div className="relative px-4 pb-1">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] filter saturate-150">
                      Black jack!
                    </span>
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/50 via-yellow-300/50 to-yellow-400/50 blur-lg -z-10" />
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
                  </div>
                </div>
              </motion.div>
            </DialogTitle>

            <div className="relative w-full flex items-center justify-center">
              <div className="w-1/2 h-[2px] filter blur-sm bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-800 shadow-[0_0_8px_1px_rgba(208,169,0,1)]" />
              <div className="flex items-center justify-center mx-4 -space-x-1">
                <img
                  src="/crown.png"
                  alt="Decoration"
                  className="w-[200px] transform rotate-180"
                />
              </div>
              <div className="w-1/2 h-[2px] filter blur-sm bg-gradient-to-r from-yellow-800 via-yellow-600 to-yellow-400 shadow-[0_0_8px_1px_rgba(208,169,0,1)]" />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
