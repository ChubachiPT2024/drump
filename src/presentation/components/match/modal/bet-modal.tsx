import { useState } from "react";

import { useBetModal } from "@/presentation/hooks/use-bet-modal";

import { Button } from "@/presentation/shadcnUI/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/presentation/shadcnUI/components/ui/dialog";
import { Label } from "@/presentation/shadcnUI/components/ui/label";
import { Input } from "@/presentation/shadcnUI/components/ui/input";
import { ScrollArea } from "@/presentation/shadcnUI/components/ui/scroll-area";

import { cn } from "@/presentation/shadcnUI/lib/utils";

// TODO: プレイヤーの型を定義する
interface Player {
  id: string;
  name: string;
  credit: number;
}

interface BetModalProps {
  matchId: string;
  handleBet: (matchId: string, playerId: string, betAmount: number) => void;
  players: Player[];
}

export const BetModal = ({ matchId, handleBet, players }: BetModalProps) => {
  const isOpen = useBetModal((state) => state.isOpen);
  const onClose = useBetModal((state) => state.onClose);

  const [betAmount, setBetAmount] = useState<number | undefined>(undefined);

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const currentPlayer = players[currentPlayerIndex];

  const handleBetChange = (value: number) => {
    setBetAmount(value);
  };

  const clearBet = () => {
    setBetAmount(undefined);
  };

  const isBetValid = () => {
    return betAmount && betAmount > 0 && betAmount <= currentPlayer.credit;
  };

  const handleDeal = () => {
    if (isBetValid()) {
      handleBet(matchId, currentPlayer.id, betAmount!);
      setBetAmount(undefined);
      if (currentPlayerIndex < players.length - 1) {
        setCurrentPlayerIndex(currentPlayerIndex + 1);
      } else {
        setCurrentPlayerIndex(0);
        onClose();
      }
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        className="GreenDot border-2 border-yellow-500 shadow-sm shadow-yellow-500 w-full max-w-2xl h-[80vh] p-0 gap-0 flex flex-col overflow-hidden"
      >
        <DialogHeader className="pt-2 -space-y-1 shrink-0">
          <DialogTitle className="text-3xl text-center text-white">
            Place Your Bet!
          </DialogTitle>
          <DialogDescription className="text-lg text-center text-white">
            {currentPlayer
              ? `${currentPlayer.name}'s turn to bet`
              : "All bets placed"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 px-6 py-3">
          <div className="bg-slate-50/10 p-4 rounded-lg shadow-sm shadow-white/20 h-[calc(80vh-6rem)]">
            <div className="flex gap-6 h-full">
              <div
                id="playerList"
                className="w-1/3 border-r border-white/20 pr-2"
              >
                <ScrollArea className="h-[calc(80vh-8rem)]">
                  <div className="space-y-2 pr-4">
                    {players.map((player, index) => (
                      <div
                        key={player.id}
                        className={cn(
                          "p-3 rounded-lg flex items-center justify-between",
                          index === currentPlayerIndex &&
                            "bg-yellow-500/20 border-2 border-yellow-500",
                          index < currentPlayerIndex && "bg-green-400/30"
                        )}
                      >
                        <span className="text-lg text-white font-medium">
                          {player.name}
                        </span>
                        {index < currentPlayerIndex && (
                          <span className="text-green-400 text-xl">✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div id="inputForm" className="flex-1">
                <div className="text-center space-y-2">
                  <div id="head" className="space-y-2">
                    <Label className="text-2xl text-white font-bold block">
                      {currentPlayer.name}
                    </Label>
                    <div className="flex flex-col gap-2 md:flex-row justify-center items-center">
                      <div className="w-32 text-start">
                        <Label className="text-lg text-white">
                          Credit: {currentPlayer.credit.toLocaleString()}
                        </Label>
                      </div>
                      <div className="w-32 text-start">
                        <Label className="text-lg text-white">
                          Bet: {betAmount?.toLocaleString() ?? 0}
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div id="input" className="max-w-xs mx-auto text-start">
                    <div className="h-7"></div>
                    <Input
                      type="number"
                      min={0}
                      max={currentPlayer.credit}
                      value={betAmount ?? ""}
                      onChange={(e) => handleBetChange(Number(e.target.value))}
                      className="text-lg mb-4"
                    />
                  </div>

                  <div
                    id="button"
                    className="flex flex-col md:flex-row justify-center items-center gap-2"
                  >
                    <Button
                      className="w-full md:w-[calc(90%/3)] h-12"
                      variant="success"
                      onClick={handleDeal}
                      disabled={!isBetValid()}
                    >
                      <span className="text-lg">DEAL</span>
                    </Button>
                    <Button
                      className="w-full md:w-[calc(90%/3)] h-12"
                      variant="danger"
                      onClick={clearBet}
                    >
                      <span className="text-lg">CLEAR</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
