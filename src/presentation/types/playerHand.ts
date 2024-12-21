import { Card } from "./card";

export interface PlayerHand {
  cards: Card[];
  isResolved: boolean;
  total: number;
}
