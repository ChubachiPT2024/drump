import { Card } from "./Card";

export interface ResultSummaryPlayer {
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
}
