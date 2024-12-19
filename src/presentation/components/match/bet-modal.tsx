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

// TODO: ベット機能を実現するためにプレイヤーの情報を含んだpropsを追加
export const BetModal = () => {
  const [betAmount, setBetAmount] = useState<number>(0);

  const isOpen = useBetModal((state) => state.isOpen);
  const onClose = useBetModal((state) => state.onClose);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="space-y-2 Polka border-2 border-yellow-500 shadow-sm shadow-yellow-500">
          <DialogHeader>
            <DialogTitle className="">Place Your Bet!</DialogTitle>
            <DialogDescription className="text-black">
              Select the amount you want to bet
            </DialogDescription>
          </DialogHeader>
          <div className="text-center flex flex-col space-y-2">
            {/* TODO: チップでの選択 */}
            <Label htmlFor="bet" className="text-lg">
              Bet Amount: {betAmount}
            </Label>
            {/* TODO: プレイヤーのクレジットをもとにして最大値を設定 */}
            <Input type="number" min="0" max="100" />
          </div>
          <div className="flex justify-around">
            {/* TODO: ベットの処理を追加 */}
            <div className="border-2 border-yellow-500 rounded-md">
              <Button className="rounded-sm" size="default" onClick={() => {}}>
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
