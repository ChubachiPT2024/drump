import { MatchGetPlayerHandApiResponseCard } from "./matchGetPlayerHandApiResponseCard";

export interface ResultSummary {
  id: string;
  dealer: {
    upCard: MatchGetPlayerHandApiResponseCard;
  };
  player: {
    id: string;
    hand: {
      cards: MatchGetPlayerHandApiResponseCard[];
      isResolved: boolean;
      total: number;
    };
    handSignalOptions: string[];
    credit: number;
    betAmount: number;
  };
}
