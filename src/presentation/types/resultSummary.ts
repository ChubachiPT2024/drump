import { Card } from "./Card";

export interface ResultSummary {
  id: string;
  dealer: {
    upCard: Card;
    // TODO: upCardの値を追加
  };
  players: {
    id: string;
    hand: {
      cards: Card[];
      total: number;
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
