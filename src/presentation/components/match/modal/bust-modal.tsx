import { useEffect } from "react";
import { motion } from "framer-motion";

import { useBustModal } from "@/presentation/hooks/modal/use-bust-modal";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/presentation/shadcnUI/components/ui/dialog";

import { ANIMATION_TIMING_MILLISECONDS } from "@/presentation/constants/animation";

export const BustModal = () => {
  const isOpen = useBustModal((state) => state.isOpen);
  const onClose = useBustModal((state) => state.onClose);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, ANIMATION_TIMING_MILLISECONDS.MODAL_CLOSE);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  const letters = "BUST".split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: {
      y: 20,
      opacity: 0,
      rotateX: -90,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };

  const bounceTransition = {
    y: {
      duration: 0.4,
      yoyo: Infinity,
      ease: "easeOut",
    },
    rotateZ: {
      duration: 0.4,
      yoyo: Infinity,
      ease: "easeOut",
    },
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        className="bg-black/90 backdrop-blur-sm h-[35vh] max-w-[100vw] w-full flex items-center justify-center sm:rounded-xl border-red-500/30 border-2 py-2 data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom data-[state=open]:duration-500 data-[state=closed]:duration-300"
      >
        <DialogHeader className="relative w-full h-full flex flex-col items-center justify-center">
          <DialogDescription className="sr-only">
            Bust notification modal with animated letters
          </DialogDescription>
          <DialogTitle>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-center gap-3 md:gap-4"
            >
              {letters.map((letter, index) => (
                <motion.div
                  key={index}
                  variants={letterVariants}
                  animate={{
                    y: [0, -8, 0],
                    rotateZ: [-2, 2, -2],
                  }}
                  transition={{
                    ...bounceTransition,
                    delay: index * 0.1 + 0.5,
                  }}
                  className="relative"
                >
                  <span className="text-6xl md:text-7xl xl:text-8xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-b from-red-300 via-red-500 to-red-700">
                    {letter}
                  </span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 via-red-400/20 to-red-500/20 blur-xl -z-10" />
                </motion.div>
              ))}
            </motion.div>
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default BustModal;
