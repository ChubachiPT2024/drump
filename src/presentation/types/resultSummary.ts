import { Card } from "./Card";

export interface ResultSummary {
  id: string;
  dealer: {
    upCard: Card;
    upCardSoftTotal: number;
  };
  players: {
    id: string;
    hand: {
      cards: Card[];
      softTotal: number | undefined;
      hardTotal: number;
      isResolved: boolean;
      isBlackJack: boolean;
      isBust: boolean;
    };
    handSignalOptions: string[];
    credit: number;
    betAmount: number;
  }[];
  isCompleted: boolean;
  roundCount: number;
}
