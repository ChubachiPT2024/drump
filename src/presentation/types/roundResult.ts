import { Card } from "./card";

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
