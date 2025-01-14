import { DealerArea } from "./dealer-area";
import { PlayerArea } from "./player-area";

import { MatchPhase } from "@/presentation/types/matchPhase";
import { ResultSummary } from "@/presentation/types/resultSummary";
import { ResultSummaryPlayer } from "@/presentation/types/resultSummaryPlayer";
import { RoundResult } from "@/presentation/types/roundResult";
import { MatchHint } from "@/presentation/types/matchHint";

interface MatchTableProps {
  phase: MatchPhase;
  matchResultSummary: ResultSummary;
  currentPlayer?: ResultSummaryPlayer & { name: string };
  roundResult?: RoundResult;
  isHintEnabled: boolean;
  hint?: MatchHint;
}

export const MatchTable = ({
  phase,
  matchResultSummary,
  currentPlayer,
  roundResult,
  isHintEnabled,
  hint,
}: MatchTableProps) => {
  if (!currentPlayer) return null;

  return (
    <div className="pt-3 flex flex-col justify-between h-[75vh]">
      <DealerArea
        phase={phase}
        matchResultSummary={matchResultSummary}
        roundResult={roundResult}
      />

      <PlayerArea
        phase={phase}
        currentPlayer={currentPlayer}
        isHintEnabled={isHintEnabled}
        hint={hint}
      />
    </div>
  );
};
