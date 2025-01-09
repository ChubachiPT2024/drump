import { Card } from "./Card";

export interface RoundResult {
  dealersHand: {
    cards: Card[];
    total: number;
    isResolved: boolean;
  };
  player: {
    result: "win" | "loss" | "push";
    credit: number;
  };
}
