import { useEffect } from "react";
import { motion } from "framer-motion";

import { useRoundStartModal } from "@/presentation/hooks/modal/use-round-start-modal";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/presentation/shadcnUI/components/ui/dialog";
import { ANIMATION_TIMING_MILLISECONDS } from "@/presentation/constants/animation";

type RoundStartModalProps = {
  roundCount: number;
};

export const RoundStartModal = ({ roundCount }: RoundStartModalProps) => {
  const isOpen = useRoundStartModal((state) => state.isOpen);
  const onClose = useRoundStartModal((state) => state.onClose);

  // ダイアログを自動的に閉じる;
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
              Round start notification modal with decorative crown images and
              animations
            </DialogDescription>
            <div className="relative w-full flex items-center justify-center">
              <div className="w-1/2 h-[2px] filter blur-sm bg-white shadow-[0_0_8px_1px_rgba(255,255,255,0.5)]" />
              <div className="flex items-center justify-center mx-4">
                <img
                  src="/silverCrown.png"
                  alt="Decoration"
                  className="w-[200px]"
                />
              </div>
              <div className="w-1/2 h-[2px] filter blur-sm bg-white shadow-[0_0_8px_1px_rgba(255,255,255,0.5)]" />
            </div>

            <DialogTitle>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={modalVariants}
                className="relative z-10 text-5xl md:text-6xl xl:text-7xl uppercase text-center"
              >
                <div className="relative px-4 pb-1">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    Round {roundCount}
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-gray-400/50 via-gray-300/50 to-gray-400/50 blur-lg -z-10" />
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                </div>
              </motion.div>
            </DialogTitle>

            <div className="relative w-full flex items-center justify-center">
              <div className="w-1/2 h-[2px] filter blur-sm bg-white shadow-[0_0_8px_1px_rgba(255,255,255,0.5)]" />
              <div className="flex items-center justify-center mx-4">
                <img
                  src="/silverCrown.png"
                  alt="Decoration"
                  className="w-[200px] transform rotate-180"
                />
              </div>
              <div className="w-1/2 h-[2px] filter blur-sm bg-white shadow-[0_0_8px_1px_rgba(255,255,255,0.5)]" />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
