import { X } from "lucide-react";
import { motion } from "framer-motion";

import { useRoundResultModal } from "@/presentation/hooks/use-round-result-modal";
import { PlayerResultCard } from "./player-result-card";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/presentation/shadcnUI/components/ui/dialog";
import { Button } from "@/presentation/shadcnUI/components/ui/button";
import { Separator } from "@/presentation/shadcnUI/components/ui/separator";
import { ScrollArea } from "@/presentation/shadcnUI/components/ui/scroll-area";

// TODO: ラウンド結果をapiから取得する
const roundResult = [
  {
    name: "Player1",
    outcome: "win",
    credit: 47000,
  },
  {
    name: "Player2",
    outcome: "loss",
    credit: 30000,
  },
  {
    name: "Player3",
    outcome: "push",
    credit: 1000,
  },
];

export const RoundResultModal = () => {
  const isOpen = useRoundResultModal((state) => state.isOpen);
  const onClose = useRoundResultModal((state) => state.onClose);

  // TODO: 次のラウンドに進む処理を実装する
  const handleNextRound = () => {
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[95vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] pt-4 WhiteDot pb-2">
          <DialogClose className="absolute top-4 right-4">
            <X className="size-6 my-auto" />
          </DialogClose>
          <ScrollArea className="max-h-[80vh] rounded-lg px-4 mt-5">
            <DialogHeader>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <DialogTitle className="relative text-4xl md:text-5xl xl:text-6xl font-black tracking-tight text-center">
                  <span className="relative inline-block">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400">
                      Round Result
                    </span>

                    <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 transform scale-x-0 animate-slide-in" />
                  </span>
                </DialogTitle>
              </motion.div>
            </DialogHeader>
            <Separator className="my-2" />
            <div className="space-y-2">
              {roundResult.map((player, index) => (
                <motion.div
                  key={player.name}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.3 }}
                >
                  <PlayerResultCard
                    player={player}
                    outcome={player.outcome}
                    credit={player.credit}
                  />
                </motion.div>
              ))}
            </div>
            <DialogFooter className="mt-2">
              <Button
                variant="primary"
                onClick={handleNextRound}
                className="h-12 px-5"
              >
                Next Round
              </Button>
            </DialogFooter>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};
