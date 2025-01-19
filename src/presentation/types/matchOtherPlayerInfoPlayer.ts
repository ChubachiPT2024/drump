import { Card } from "./Card";

export interface MatchOtherPlayerInfoPlayer {
  id: string;
  name: string;
  hand: {
		cards: Card[];
		softTotal: number | undefined;
		hardTotal: number;
		isResolved: boolean;
		isBlackJack: boolean;
		isBust: boolean;
	};
}
