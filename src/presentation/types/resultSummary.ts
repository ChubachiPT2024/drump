import { Card } from "./card";

export interface ResultSummary {
  id: string;
  dealer: {
    upCard: Card;
  };
  player: {
    id: string;
    hand: {
      cards: Card[];
      isResolved: boolean;
      total: number;
    };
    handSignalOptions: string[];
    credit: number;
    betAmount: number;
  };
}
