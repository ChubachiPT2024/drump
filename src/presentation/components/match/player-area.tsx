import { CardComponent } from "./cardComponent";

import { MatchPhase } from "@/presentation/types/matchPhase";
import { ResultSummaryPlayer } from "@/presentation/types/resultSummaryPlayer";

import { ANIMATION_TIMING_SECONDS } from "@/presentation/constants/animation";
import { MatchHint } from "@/presentation/types/matchHint";

interface PlayerAreaProps {
  phase: MatchPhase;
  currentPlayer: ResultSummaryPlayer & { name: string };
  isHintEnabled: boolean;
  hint?: MatchHint;
}

export const PlayerArea = ({
  phase,
  currentPlayer,
  isHintEnabled,
  hint,
}: PlayerAreaProps) => {
  const showHands =
    phase !== MatchPhase.ROUND_START && phase !== MatchPhase.BETTING;

  const calculatePlayerHandDelaySeconds = (index: number) => {
    if (index < 2) {
      return index * ANIMATION_TIMING_SECONDS.DEAL_DELAY; // 最初の二枚は順番に
    } else {
      return ANIMATION_TIMING_SECONDS.DEAL_DELAY; // それ以降は固定 (hit時のみ)
    }
  };

  return (
    <div className="bg-neutral-50/5 text-center rounded-md relative">
      <h2 className="bg-gradient-to-b from-slate-300/40 via-slate-100/10 to-slate-50/5 text-white text-lg font-bold rounded-t-md">
        Bet: {currentPlayer.betAmount}
      </h2>

      <div className="absolute top-1/4 -right-24 z-10">
        {showHands && (
          <div className="relative w-20 px-2 py-1.5 border-2 font-bold text-white bg-black rounded-xl">
            {currentPlayer.hand?.hardTotal}
            {currentPlayer.hand?.softTotal &&
              ` / ${currentPlayer.hand?.softTotal}`}
            <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-r-8" />
          </div>
        )}
        {isHintEnabled && (
          <div className="absolute top-full mt-2 w-max px-2 py-1.5 border-2 font-bold text-white bg-black rounded-xl">
            hint：{hint?.basicStrategy}
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        {showHands &&
          currentPlayer.hand?.cards.map((card, index) => (
            <CardComponent
              key={`player-${index}`}
              isOpen={true}
              initial={{ x: "50vw", y: "-25vh" }}
              animate={{ x: "0vw", y: "0vh" }}
              suit={card.suit}
              rank={card.rank}
              delaySeconds={calculatePlayerHandDelaySeconds(index)}
              className={`absolute left-${index * 2} z-${index * 10}`}
            />
          ))}
      </div>
    </div>
  );
};
