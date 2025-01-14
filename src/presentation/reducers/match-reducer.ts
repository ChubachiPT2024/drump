import { MatchAction } from "../types/matchAction";
import { MatchPhase } from "../types/matchPhase";
import { MatchState } from "../types/matchState";

export const matchReducer = (
  state: MatchState,
  action: MatchAction
): MatchState => {
  switch (action.type) {
    case "START_ROUND":
      return {
        ...state,
        phase: MatchPhase.ROUND_START,
        isAnimating: true,
        playerTurnIndex: 0,
      };

    case "SET_BETTING":
      return {
        ...state,
        phase: MatchPhase.BETTING,
        isAnimating: false,
      };

    case "UPDATE_MATCH_SUMMARY":
      return {
        ...state,
        matchResultSummary: action.payload,
      };

    case "UPDATE_HINT":
      return {
        ...state,
        hint: action.payload,
      };

    case "START_DEALING":
      return {
        ...state,
        phase: MatchPhase.DEALING,
        isAnimating: true,
      };

    case "COMPLETE_DEALING":
      return {
        ...state,
        phase: MatchPhase.PLAYER_TURNS,
        isAnimating: false,
      };

    case "MOVE_TO_NEXT_PLAYER":
      if (action.payload?.isLastPlayer) {
        return {
          ...state,
          phase: MatchPhase.DEALER_TURN,
          isAnimating: true,
        };
      }
      return {
        ...state,
        playerTurnIndex: state.playerTurnIndex + 1,
        isAnimating: true,
      };

    case "START_DEALER_TURN":
      return {
        ...state,
        phase: MatchPhase.DEALER_TURN,
        isAnimating: true,
      };

    case "UPDATE_ROUND_RESULT":
      return {
        ...state,
        roundResult: action.payload,
      };

    case "COMPLETE_ROUND":
      return {
        ...state,
        phase: MatchPhase.ROUND_END,
        isAnimating: false,
      };

    case "COMPLETE_MATCH":
      return {
        ...state,
        phase: MatchPhase.MATCH_END,
        matchResult: action.payload,
        isAnimating: false,
      };

    case "SET_PLAYER_NAMES":
      return {
        ...state,
        playerIdToNameMap: new Map(action.payload),
      };

    case "START_ANIMATION":
      return {
        ...state,
        isAnimating: true,
      };

    case "END_ANIMATION":
      return {
        ...state,
        isAnimating: false,
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};
