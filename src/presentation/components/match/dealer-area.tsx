import { CardComponent } from "./cardComponent";

import { MatchPhase } from "@/presentation/types/matchPhase";
import { ResultSummary } from "@/presentation/types/resultSummary";
import { RoundResult } from "@/presentation/types/roundResult";

import { ANIMATION_TIMING_SECONDS } from "@/presentation/constants/animation";

interface DealerAreaProps {
  phase: MatchPhase;
  matchResultSummary: ResultSummary;
  roundResult?: RoundResult;
}

export const DealerArea = ({
  phase,
  matchResultSummary,
  roundResult,
}: DealerAreaProps) => {
  const showHands =
    phase !== MatchPhase.ROUND_START && phase !== MatchPhase.BETTING;

  const calculateDealerHandDelaySeconds = (index: number) => {
    if (index === 0) {
      return ANIMATION_TIMING_SECONDS.DEAL_DELAY * 2; // プレイヤーのカードが全て表示された後に表示 (プレイヤーのカードが2枚)
    } else {
      return ANIMATION_TIMING_SECONDS.DEAL_DELAY * index; // ディラーの追加カードは順番に表示
    }
  };

  console.log(matchResultSummary.dealer);

  return (
    <div className="bg-neutral-50/5 rounded-md relative">
      <div className="absolute top-1/4 -right-24 z-10">
        {phase === MatchPhase.PLAYER_TURNS && (
          <div className="relative w-20 px-2 py-1.5 border-2 font-bold text-white bg-black rounded-xl text-center">
            {matchResultSummary?.dealer.upCardSoftTotal}
            <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-r-8" />
          </div>
        )}
        {phase === MatchPhase.DEALER_TURN && (
          <div className="relative w-20 px-2 py-1.5 border-2 font-bold text-white bg-black rounded-xl text-center">
            {roundResult?.dealersHand.total}
            <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-r-8" />
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        {showHands &&
          matchResultSummary?.dealer.upCard &&
          (
            roundResult?.dealersHand.cards ?? [matchResultSummary.dealer.upCard]
          ).map((card, index) => (
            <div
              key={`dealer-${index}`}
              className="relative transition-transform duration-300 ease-out"
            >
              <CardComponent
                isOpen={true}
                initial={
                  index === 1
                    ? { x: "0vw", y: "0vh" }
                    : { x: "50vw", y: "25vh" }
                }
                animate={{ x: "0vw", y: "0vh" }}
                suit={card.suit}
                rank={card.rank}
                delaySeconds={calculateDealerHandDelaySeconds(index)}
              />
            </div>
          ))}

        {showHands && !roundResult && (
          <div className="relative transition-transform duration-300 ease-out">
            <CardComponent
              key="reverse"
              isOpen={false}
              initial={{ x: "50vw", y: "25vh" }}
              animate={{ x: "0vw", y: "0vh" }}
              suit="reverse"
              rank="reverse"
              delaySeconds={calculateDealerHandDelaySeconds(3)} // initail_dealの最後に表示 (プレイヤーのカードが2枚とdealerのカードが1枚の後)
            />
          </div>
        )}
      </div>
    </div>
  );
};
