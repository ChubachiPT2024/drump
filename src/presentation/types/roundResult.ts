import { MatchGetPlayerHandApiResponseCard } from "../types/matchGetPlayerHandApiResponseCard";

export interface RoundResult {
  dealersHand: {
    cards: MatchGetPlayerHandApiResponseCard[];
    total: number;
    isResolved: boolean;
  };
  player: {
    result: "win" | "loss" | "draw";
    credit: number;
  };
}
