interface PlayerResult {
  balance: number;
  creditHistories: number[];
  finalCredit: number;
}

export interface MatchResult {
  player: PlayerResult;
}
