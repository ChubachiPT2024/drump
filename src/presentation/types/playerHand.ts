import { MatchGetPlayerHandApiResponseCard } from "./matchGetPlayerHandApiResponseCard";

export interface PlayerHand {
  cards: MatchGetPlayerHandApiResponseCard[];
  isResolved: boolean;
  total: number;
}
