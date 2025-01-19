import { MatchResult } from "./matchResult";
import { ResultSummary } from "./resultSummary";
import { RoundResult } from "./roundResult";
import { MatchHint } from "./matchHint";

export type MatchAction =
  | { type: "START_ROUND" }
  | { type: "SET_BETTING" }
  | { type: "UPDATE_MATCH_SUMMARY"; payload: ResultSummary }
  | { type: "UPDATE_HINT_ENABLED"; payload: boolean }
  | { type: "UPDATE_HINT"; payload: MatchHint | undefined }
  | { type: "START_DEALING" }
  | { type: "COMPLETE_DEALING" }
  | { type: "MOVE_TO_NEXT_PLAYER"; payload?: { isLastPlayer: boolean } }
  | { type: "START_DEALER_TURN" }
  | { type: "UPDATE_ROUND_RESULT"; payload: RoundResult | undefined }
  | { type: "COMPLETE_ROUND" }
  | { type: "COMPLETE_MATCH"; payload: MatchResult }
  | { type: "SET_PLAYER_NAMES"; payload: Map<string, string> }
  | { type: "START_ANIMATION" }
  | { type: "END_ANIMATION" }
  | { type: "SET_LOADING"; payload: boolean };
