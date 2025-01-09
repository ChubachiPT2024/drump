import { useEffect } from "react";
import { motion } from "framer-motion";

import { useStandModal } from "@/presentation/hooks/use-stand-modal";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/presentation/shadcnUI/components/ui/dialog";

export const StandModal = () => {
  const isOpen = useStandModal((state) => state.isOpen);
  const onClose = useStandModal((state) => state.onClose);

  // ダイアログを自動的に閉じる;
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 1400);

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
              Stand notification modal with decorative card images and
              animations
            </DialogDescription>
            <div className="relative w-full flex items-center justify-center">
              <div className="flex items-center justify-center mx-4">
                <img
                  src="/hand-option-modal-deco.png"
                  alt="Decoration"
                  className="size-10"
                />
              </div>
              <div className="w-full h-[2px] filter blur-sm bg-red-400 shadow-[0_0_8px_1px_rgba(255,0,0,0.5)]" />
              <div className="flex items-center justify-center mx-4">
                <img
                  src="/hand-option-modal-deco.png"
                  alt="Decoration"
                  className="size-10"
                />
              </div>
            </div>
            <DialogTitle>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={modalVariants}
                className="relative z-10 text-5xl md:text-6xl xl:text-7xl uppercase"
              >
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex -space-x-2">
                    <img
                      src="/trump/spadeA.png"
                      alt="Spade A"
                      className="w-[40px] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
                    />
                    <img
                      src="/trump/diamondA.png"
                      alt="Diamond A"
                      className="w-[40px] transform rotate-45 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
                    />
                  </div>
                  <div className="relative px-4 pb-1">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-300 via-red-500 to-red-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                      Stand!
                    </span>
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-400/50 via-red-300/50 to-red-400/50 blur-lg -z-10" />
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-400 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-400 to-transparent" />
                  </div>
                </div>
              </motion.div>
            </DialogTitle>
            <div className="relative w-full flex items-center justify-center">
              <div className="flex items-center justify-center mx-4">
                <img
                  src="/hand-option-modal-deco.png"
                  alt="Decoration"
                  className="size-10"
                />
              </div>
              <div className="w-full h-[2px] filter blur-sm bg-red-400 shadow-[0_0_8px_1px_rgba(255,0,0,0.5)]" />
              <div className="flex items-center justify-center mx-4">
                <img
                  src="/hand-option-modal-deco.png"
                  alt="Decoration"
                  className="size-10"
                />
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
