import { useParams } from "react-router-dom";

import { MatchHeader } from "../components/match/match-header";
import { MatchTable } from "../components/match/match-table";
import { Shoe } from "../components/match/shoe";
import { OtherPlayerInfoWrapper } from "../components/match/other-player-info-wrapper";
import { HandSignals } from "../components/match/hand-signals";
import { PlayerInfo } from "../components/match/player-info";

import { RoundStartModal } from "../components/match/modal/round-start-modal";
import { BetModal } from "../components/match/modal/bet-modal";
import { RotationModal } from "../components/match/modal/rotation-modal";
import { BlackjackModal } from "../components/match/modal/blackjack-modal";
import { HitModal } from "../components/match/modal/hit-modal";
import { StandModal } from "../components/match/modal/stand-modal";
import { BustModal } from "../components/match/modal/bust-modal";
import { RoundResultModal } from "../components/match/modal/round-result-modal";
import { MatchResultModal } from "../components/match/modal/match-result-modal";
import { RuleModal } from "../components/match/modal/rule-modal";

import { useBlackjack } from "../hooks/use-blackjack";

export const MatchPage = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const { state, actions } = useBlackjack({
    matchId: matchId ?? "",
  });

  const {
    phase,
    isAnimating,
    playerTurnIndex,
    matchResultSummary,
    roundResult,
    matchResult,
    playerIdToNameMap,
    isLoading,
    isHintEnabled,
    hint,
  } = state;

  const getPlayerName = (playerId: string) => {
    return playerIdToNameMap.get(playerId) ?? "Unknown Player";
  };

  const currentPlayer = matchResultSummary && {
    ...matchResultSummary.players[playerTurnIndex],
    name: getPlayerName(matchResultSummary.players[playerTurnIndex].id),
  };

  if (isLoading || !matchId || !matchResultSummary) {
    // TOOD: loading画面の作成
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="relative min-h-screen bg-green-600 flex flex-col items-center z-0 overflow-hidden">
        <MatchHeader
          roundCount={matchResultSummary.roundCount}
          isHintEnabled={isHintEnabled}
          setIsHintEnabled={actions.handleHintEnable}
        />
        <RuleModal />
        <MatchTable
          phase={phase}
          matchResultSummary={matchResultSummary}
          currentPlayer={currentPlayer}
          roundResult={roundResult}
          isHintEnabled={isHintEnabled}
          hint={hint}
        />
        <Shoe />
        <OtherPlayerInfoWrapper
          phase={phase}
          players={matchResultSummary.players
            .filter((player) => player.id !== currentPlayer?.id)
            .map((player) => ({
              id: player.id,
              name: getPlayerName(player.id),
              hand: player.hand,
            }))}
          playerTurnIndex={playerTurnIndex}
        />
        {currentPlayer && (
          <HandSignals
            currentPlayerId={currentPlayer.id}
            isAnimating={isAnimating}
            availableHandSignals={
              matchResultSummary.players.find(
                (player) => player.id === currentPlayer.id
              )?.handSignalOptions ?? []
            }
            onStand={actions.handleStand}
            onHit={actions.handleHit}
          />
        )}
        {currentPlayer && (
          <PlayerInfo
            playerName={getPlayerName(currentPlayer.id)}
            credit={currentPlayer.credit}
          />
        )}

        <RoundStartModal roundCount={matchResultSummary.roundCount} />
        <BetModal
          handleBet={actions.handleBet}
          players={matchResultSummary.players.map((player) => ({
            id: player.id,
            name: getPlayerName(player.id),
            credit: player.credit,
          }))}
        />
        {currentPlayer && <RotationModal name={currentPlayer.name} />}
        <BlackjackModal />
        <HitModal />
        <StandModal />
        <BustModal />
        {roundResult && (
          <RoundResultModal
            matchId={matchId}
            roundResultPlayers={roundResult.players.map((player) => ({
              name: getPlayerName(player.id),
              result: player.result,
              credit: player.credit,
            }))}
            handleRoundStart={actions.handleRoundStart}
          />
        )}
        {matchResult && (
          <MatchResultModal
            matchResultPlayers={matchResult.players.map((player) => ({
              name: getPlayerName(player.id),
              rounds: player.creditHistories,
              finalCredit: player.finalCredit,
              balance: player.balance,
            }))}
          />
        )}
      </div>
    </>
  );
};
