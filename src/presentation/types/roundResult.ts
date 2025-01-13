import { Card } from "./Card";

export interface RoundResult {
  dealersHand: {
    cards: Card[];
    total: number;
    isResolved: boolean;
  };
  players: {
    id: string;
    result: "win" | "loss" | "push";
    credit: number;
  }[];
}
