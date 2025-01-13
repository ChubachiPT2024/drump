import { CopyPlus, Hand, Layers2, Subscript } from "lucide-react";

import { HandSignalButton } from "./hand-signal-button";

interface HandSignalsProps {
  currentPlayerId: string;
  isAnimating: boolean;
  availableHandSignals: string[];
  onStand: (playerId: string) => void;
  onHit: (playerId: string) => void;
  onDouble?: (playerId: string) => void; // TODO: DOUBLE機能を追加
  onSplit?: (playerId: string) => void; // TODO: SPLIT機能を追加
}

export const HandSignals = ({
  currentPlayerId,
  isAnimating,
  availableHandSignals,
  onStand,
  onHit,
}: HandSignalsProps) => {
  return (
    <>
      <div className="flex justify-center pb-4 gap-x-4">
        <HandSignalButton
          text="STAND"
          icon={Hand}
          variant="danger"
          action={() => onStand(currentPlayerId)}
          disabled={isAnimating || !availableHandSignals.includes("stand")}
        />
        {/* TODO: SPLIT機能を追加 */}
        <HandSignalButton
          text="SPLIT"
          icon={Layers2}
          variant="warning"
          action={() => {}}
          disabled={isAnimating || !availableHandSignals.includes("split")}
        />
        {/* TODO: DOUBLE機能を追加 */}
        <HandSignalButton
          text="DOUBLE"
          icon={Subscript}
          variant="primary"
          action={() => {}}
          disabled={isAnimating || !availableHandSignals.includes("double")}
        />
        <HandSignalButton
          text="HIT"
          icon={CopyPlus}
          variant="success"
          action={() => onHit(currentPlayerId)}
          disabled={isAnimating || !availableHandSignals.includes("hit")}
        />
      </div>
    </>
  );
};
