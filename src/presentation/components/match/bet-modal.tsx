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
import { ResultSummary } from "../../types/resultSummary";

interface BetModalProps {
  matchId: string;
  onClickDeal: (matchId: string, betAmount: number) => void;
  credit: Pick<ResultSummary, "player">["player"]["credit"];
}

// TODO: ベット機能を実現するためにプレイヤーの情報を含んだpropsを追加
export const BetModal = ({ onClickDeal, matchId, credit }: BetModalProps) => {
  const [betAmount, setBetAmount] = useState<number | undefined>(undefined);

  const isOpen = useBetModal((state) => state.isOpen);
  const onClose = useBetModal((state) => state.onClose);

  return (
    <>
      <Dialog open={isOpen}>
        <DialogContent className="space-y-2 GreenDot border-2 border-yellow-500 shadow-sm shadow-yellow-500">
          <DialogHeader>
            <DialogTitle className="">Place Your Bet!</DialogTitle>
            <DialogDescription className="text-black">
              Select the amount you want to bet
            </DialogDescription>
          </DialogHeader>
          <div className="text-center flex flex-col space-y-2">
            {/* TODO: チップでの選択 */}
            <Label className="text-lg">Credit: {credit}</Label>
            <Label className="text-lg">Bet Amount: {betAmount}</Label>
            <Input
              type="number"
              min={0}
              max={credit}
              onChange={(e) => setBetAmount(Number(e.target.value))}
            />
            {betAmount && credit < betAmount && (
              <Label className="text-red-500">
                You don't have enough credit
              </Label>
            )}
          </div>
          <div className="flex justify-around">
            <div className="border-2 border-yellow-500 rounded-md">
              <Button
                className="rounded-sm"
                size="default"
                onClick={() => {
                  if (!betAmount) return;
                  onClickDeal(matchId, betAmount);
                  onClose();
                }}
                disabled={!betAmount || credit < betAmount}
              >
                <span className="text-base md:text-xl">DEAL</span>
              </Button>
            </div>
            <div className="border-2 border-yellow-500 rounded-md">
              <Button
                size="default"
                className="rounded-sm"
                variant="danger"
                onClick={() => setBetAmount(0)}
              >
                <span className="text-base md:text-xl">CLEAR</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
