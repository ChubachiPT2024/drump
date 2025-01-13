interface PlayerResult {
  id: string;
  balance: number;
  creditHistories: number[];
  finalCredit: number;
}

export interface MatchResult {
  players: PlayerResult[];
}
