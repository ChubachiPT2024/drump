import { useCallback, useEffect, useReducer } from "react";

import { useRoundStartModal } from "./modal/use-round-start-modal";
import { useBetModal } from "./modal/use-bet-modal";
import { useRotationModal } from "./modal/use-rotation-modal";
import { useBlackJackModal } from "./modal/use-blackjack-modal";
import { useHitModal } from "./modal/use-hit-modal";
import { useStandModal } from "./modal/use-stand-modal";
import { useBustModal } from "./modal/use-bust-modal";
import { useRoundResultModal } from "./modal/use-round-result-modal";
import { useMatchResultModal } from "./modal/use-match-result-modal";

import { useErrorHandling } from "./use-error-handling";

import { getPlayersNameApi } from "./api/matchPlayersName";
import { postMatchStartApi } from "./api/matchStartRound";
import { postMatchBetApi } from "./api/matchBet";
import { getMatchResultSummaryApi } from "./api/matchResultSummary";
import { postHitApi } from "./api/matchHit";
import { postStandApi } from "./api/matchStand";
import { postRoundCompleteApi } from "./api/matchRoundComplete";
import { getRoundResultApi } from "./api/matchRoundResult";
import { getResultApi } from "./api/matchResult";

import { MatchPhase } from "../types/matchPhase";
import { ResultSummaryPlayer } from "../types/resultSummaryPlayer";

import { ANIMATION_TIMING_MS } from "../constants/animation";

import { matchReducer } from "../reducers/match-reducer";

interface BlackjackProps {
	matchId: string;
}

export const useBlackjack = ({ matchId }: BlackjackProps) => {
  const [state, dispatch] = useReducer(matchReducer, {
    phase: MatchPhase.BETTING,
    isAnimating: false,
    playerTurnIndex: 0,
    playerIdToNameMap: new Map(),
    isLoading: true,
  });

	const { onOpen: onOpenStartModal } = useRoundStartModal();
	const { onOpen: onOpenBetModal } = useBetModal();
	const { onOpen: onOpenRotationModal } = useRotationModal();
	const { onOpen: onOpenBlackjackModal } = useBlackJackModal();
	const { onOpen: onOpenHitModal } = useHitModal();
	const { onOpen: onOpenStandModal } = useStandModal();
	const { onOpen: onOpenBustModal } = useBustModal();
	const { onOpen: onOpenRoundResultModal } = useRoundResultModal();
	const { onOpen: onOpenMatchResultModal } = useMatchResultModal();

	const { handleError } = useErrorHandling();

  const handleRoundStart = useCallback(async () => {
    try {
      dispatch({ type: 'START_ROUND' });
      await postMatchStartApi(matchId);
      
      const updatedSummary = await getMatchResultSummaryApi(matchId);
      dispatch({ type: 'UPDATE_MATCH_SUMMARY', payload: updatedSummary });
      
      onOpenStartModal();
      await new Promise(resolve => setTimeout(resolve, ANIMATION_TIMING_MS.MODAL_TRANSITION));
      
      dispatch({ type: 'SET_BETTING' });
      onOpenBetModal();
    } catch (error) {
      handleError(error as Error, "round start");
    }
  }, [matchId]);

  const handleInitialDeal = useCallback(async () => {
    try {      
      onOpenRotationModal();
      await new Promise(resolve => setTimeout(resolve, ANIMATION_TIMING_MS.MODAL_TRANSITION));

      dispatch({ type: 'START_DEALING' });
      
      const updatedSummary = await getMatchResultSummaryApi(matchId);
      dispatch({ type: 'UPDATE_MATCH_SUMMARY', payload: updatedSummary });

      dispatch({ type: 'UPDATE_ROUND_RESULT', payload: undefined });

      await new Promise(resolve => setTimeout(resolve, ANIMATION_TIMING_MS.INITIAL_DEAL));

      dispatch({ type: 'COMPLETE_DEALING' });

      if (updatedSummary.players[state.playerTurnIndex].hand?.isBlackJack) {
        onOpenBlackjackModal();
        await new Promise(resolve => setTimeout(resolve, ANIMATION_TIMING_MS.MODAL_TRANSITION));
        await moveToNextPlayer();
      }
    } catch (error) {
      handleError(error as Error, "initial deal");
      dispatch({ type: 'END_ANIMATION' });
    }
  }, [matchId, state.playerTurnIndex, handleError, onOpenRotationModal, onOpenBlackjackModal]);

  const moveToNextPlayer = useCallback(async () => {
    const nextPlayerIndex = state.playerTurnIndex + 1;
    const isLastPlayer = !!(state.matchResultSummary && 
      nextPlayerIndex >= state.matchResultSummary.players.length);

    dispatch({ 
      type: 'MOVE_TO_NEXT_PLAYER', 
      payload: { isLastPlayer } 
    });

    if (isLastPlayer) {
      await handleRoundComplete();
    } else {
      // TODO: handのアニメーションを追加 できたら

      onOpenRotationModal();
      await new Promise(resolve => setTimeout(resolve, ANIMATION_TIMING_MS.MODAL_TRANSITION));

      const nextPlayer = state.matchResultSummary?.players[nextPlayerIndex];
      if (nextPlayer?.hand?.isBlackJack) {
        onOpenBlackjackModal();
        await new Promise(resolve => setTimeout(resolve, ANIMATION_TIMING_MS.MODAL_TRANSITION));
      }
    }
  }, [state.playerTurnIndex, state.matchResultSummary]);

  // TODO: ベットが完了しているかの判定を検討
  // ドメインが漏れ出てるかもしれない　ベットが完了しているかはどうするべきか　
  // 0以上のベットを可能に仕様としてはなっているが、判定がこのままでは一人ベットしてしまうと、プレイヤーのターンに移行してしまう
  // const isAllPlayersBetComplete = (players: ResultSummaryPlayer[]): boolean => {
	// 	return players.every(player => player.betAmount !== undefined && player.betAmount >= 0);
	// };
	const isAllPlayersBetComplete = (players: ResultSummaryPlayer[]): boolean => {
		return players.every(player => player.betAmount !== undefined && player.betAmount > 0);
	};

  const handleBet = useCallback(async (playerId: string, betAmount: number) => {
    try {
      dispatch({ type: 'START_ANIMATION' });
      await postMatchBetApi(matchId, playerId, betAmount);

      const updatedSummary = await getMatchResultSummaryApi(matchId);
      dispatch({ type: 'UPDATE_MATCH_SUMMARY', payload: updatedSummary });
      
      if (isAllPlayersBetComplete(updatedSummary.players)) {
        await handleInitialDeal(); 
      } else {
        dispatch({ type: 'END_ANIMATION' });
      }
    } catch (error) {
      handleError(error as Error, "bet");
      dispatch({ type: 'END_ANIMATION' });
    }
  }, [matchId, handleError]);

	const handleHit = useCallback(async (playerId: string) => {
    try {
      dispatch({ type: 'START_ANIMATION' });
      await postHitApi(matchId, playerId);

      onOpenHitModal();
      await new Promise(resolve => setTimeout(resolve, ANIMATION_TIMING_MS.MODAL_TRANSITION));

      const updatedSummary = await getMatchResultSummaryApi(matchId);
      dispatch({ type: 'UPDATE_MATCH_SUMMARY', payload: updatedSummary });
      await new Promise(resolve => setTimeout(resolve, ANIMATION_TIMING_MS.DEAL * 2)); // DEAL分だけ余裕を持って待つ

      if (updatedSummary.players[state.playerTurnIndex].hand?.isBust) {
        onOpenBustModal();
        await new Promise(resolve => setTimeout(resolve, ANIMATION_TIMING_MS.MODAL_TRANSITION));
        await moveToNextPlayer();
      }

      dispatch({ type: 'END_ANIMATION' });
    } catch (error) {
      handleError(error as Error, "hit");
      dispatch({ type: 'END_ANIMATION' });
    }
  }, [matchId, state.playerTurnIndex, moveToNextPlayer, handleError, onOpenHitModal, onOpenBustModal]);

	const handleStand = useCallback(async (playerId: string) => {
    try {
      dispatch({ type: 'START_ANIMATION' });
      await postStandApi(matchId, playerId);

      onOpenStandModal();
      await new Promise(resolve => setTimeout(resolve, ANIMATION_TIMING_MS.MODAL_TRANSITION));

      const updatedSummary = await getMatchResultSummaryApi(matchId);
      dispatch({ type: 'UPDATE_MATCH_SUMMARY', payload: updatedSummary });

      await moveToNextPlayer();
      dispatch({ type: 'END_ANIMATION' });
    } catch (error) {
      handleError(error as Error, "stand");
      dispatch({ type: 'END_ANIMATION' });
    }
  }, [matchId, moveToNextPlayer, handleError, onOpenStandModal]);

	const handleRoundComplete = useCallback(async () => {
    try {
      dispatch({ type: 'START_DEALER_TURN' });
      await postRoundCompleteApi(matchId);

      const roundResultResponse = await getRoundResultApi(matchId);
      dispatch({ type: 'UPDATE_ROUND_RESULT', payload: roundResultResponse });

      // ディーラーのカードを表示するための待機時間　DEAL分だけ余裕を持って待つ
      await new Promise(resolve => setTimeout(resolve, ANIMATION_TIMING_MS.DEAL_DELAY * roundResultResponse.dealersHand.cards.length + ANIMATION_TIMING_MS.DEAL));

      const matchResultSummaryResponse = await getMatchResultSummaryApi(matchId);

      if (matchResultSummaryResponse.isCompleted) {
        const matchResultResponse = await getResultApi(matchId);
        dispatch({ type: 'COMPLETE_MATCH', payload: matchResultResponse });
        onOpenMatchResultModal();
      } else {
        dispatch({ type: 'COMPLETE_ROUND' });
        onOpenRoundResultModal();
      }
    } catch (error) {
      handleError(error as Error, "round complete");
      dispatch({ type: 'END_ANIMATION' });
    }
  }, [matchId, handleError, onOpenRoundResultModal, onOpenMatchResultModal]);

  useEffect(() => {
    const initializePlayerNames = async () => {
      try {
        const playersData = await getPlayersNameApi(matchId);
        dispatch({ 
          type: 'SET_PLAYER_NAMES', 
          payload: playersData.map(player => [player.id, player.name])
        });
      } catch (error) {
        handleError(error as Error, "getting player names");
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializePlayerNames();
  }, [matchId]);

	useEffect(() => {
    return () => {
		  handleRoundStart();
    }
  }, [handleRoundStart]);

  return {
    state,
    actions: {
      handleRoundStart,
      handleBet,
      handleInitialDeal,
      handleHit,
      handleStand,
      handleRoundComplete,
    }
  };
};