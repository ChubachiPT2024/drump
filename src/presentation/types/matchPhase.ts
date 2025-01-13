export const MatchPhase = {
  ROUND_START: "ROUND_START",
  BETTING: "BETTING",
  DEALING: "DEALING",
  PLAYER_TURNS: "PLAYER_TURNS",
  DEALER_TURN: "DEALER_TURN", 
  ROUND_END: "ROUND_END",
  MATCH_END: "MATCH_END",
} as const;
  
export type MatchPhase = typeof MatchPhase[keyof typeof MatchPhase];
