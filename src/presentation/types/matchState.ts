import { MatchPhase } from "./matchPhase";
import { ResultSummary } from "./resultSummary";
import { MatchResult } from "./matchResult";
import { RoundResult } from "./roundResult";
import { MatchHint } from "./matchHint";

export interface MatchState {
  phase: MatchPhase;
  isAnimating: boolean;
  playerTurnIndex: number;
  matchResultSummary?: ResultSummary;
  roundResult?: RoundResult;
  matchResult?: MatchResult;
  playerIdToNameMap: Map<string, string>;
  isLoading: boolean;
  isHintEnabled: boolean;
  hint?: MatchHint;
}
