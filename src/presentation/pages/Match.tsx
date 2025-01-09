import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Hand, CopyPlus, Layers2, Subscript, CircleHelp } from "lucide-react";
import Avatar, { genConfig } from "react-nice-avatar";

import { RoundStartModal } from "../components/match/modal/round-start-modal";
import { BetModal } from "../components/match/modal/bet-modal";
import { RotationModal } from "../components/match/modal/rotation-modal";
import { BlackjackModal } from "../components/match/modal/blackjack-modal";
import { HitModal } from "../components/match/modal/hit-modal";
import { StandModal } from "../components/match/modal/stand-modal";
import { RoundResultModal } from "../components/match/modal/round-result-modal";
import { MatchResultModal } from "../components/match/modal/match-result-modal";
import { CardComponent } from "../components/match/cardComponent";
import { HandSignalButton } from "../components/match/hand-signal-button";
import { HelpButton } from "../components/match/help-button";
import { Logo } from "../components/share/logo";
import { HintToggle } from "../components/match/hint-toggle";

import { ResultSummary } from "../types/resultSummary";
import { RoundResult } from "../types/roundResult";
import { MatchResult } from "../types/matchResult";

import { postMatchStartApi } from "../hooks/api/matchStartRound";
import { getMatchResultSummaryApi } from "../hooks/api/matchResultSummary";
import { postMatchBetApi } from "../hooks/api/matchBet";
import { postHitApi } from "../hooks/api/matchHit";
import { postStandApi } from "../hooks/api/matchStand";
import { postRoundCompleteApi } from "../hooks/api/matchRoundComplete";
import { getRoundResultApi } from "../hooks/api/matchRoundResult";
import { getResultApi } from "../hooks/api/matchResult";

import { useRoundStartModal } from "../hooks/use-round-start-modal";
import { useBetModal } from "../hooks/use-bet-modal";
import { useRotationModal } from "../hooks/use-rotation-modal";
import { useBlackJackModal } from "../hooks/use-blackjack-modal";
import { useHitModal } from "../hooks/use-hit-modal";
import { useStandModal } from "../hooks/use-stand-modal";
import { useRoundResultModal } from "../hooks/use-round-result-modal";
import { useMatchResultModal } from "../hooks/use-match-result-modal";
import { set } from "zod";

export const MatchPage = () => {
  const { matchId } = useParams<{ matchId: string }>();

  const { onOpen: onOpenRoundStartModal } = useRoundStartModal();
  const { onOpen: onOpenBetModal } = useBetModal();
  const { onOpen: onOpenRotationModal } = useRotationModal();
  const { onOpen: onOpenBlackjackModal } = useBlackJackModal();
  const { onOpen: onOpenHitModal } = useHitModal();
  const { onOpen: onOpenStandModal } = useStandModal();
  const { onOpen: onOpenRoundResultModal } = useRoundResultModal();
  const { onOpen: onOpenMatchResultModal } = useMatchResultModal();

  // TODO: 現在のプレイヤーの名前を毎回代入する形に変更する
  const avatarConfig = genConfig("Player 2");

  const [isBeting, setIsBeting] = useState<boolean>(true);
  const [isDealing, setIsDealing] = useState<boolean>(false);

  const [matchResultSummary, setMatchResultSummary] = useState<
    ResultSummary | undefined
  >(undefined);
  const [roundResult, setRoundResult] = useState<RoundResult | undefined>(
    undefined
  );
  const [matchResult, setMatchResult] = useState<MatchResult | undefined>(
    undefined
  );
  const [isHintEnabled, setIsHintEnabled] = useState(false);

  const handleCardDealing = async () => {
    setIsDealing(true);
    // カード配布のアニメーション時間を待つ
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsDealing(false);
  };

  const handleHit = async (matchId: string) => {
    await postHitApi(matchId);
    onOpenHitModal();
    const matchResultSummaryResponse = await getMatchResultSummaryApi(matchId);
    setTimeout(async () => {
      setMatchResultSummary(matchResultSummaryResponse);
    }, 2000);
  };

  const handleStand = async (matchId: string) => {
    await postStandApi(matchId);
    onOpenStandModal();
    const matchResultSummaryResponse = await getMatchResultSummaryApi(matchId);
    setTimeout(async () => {
      setMatchResultSummary(matchResultSummaryResponse);
    }, 2000);
  };

  const handleBet = async (
    matchId: string,
    playerId: string,
    betAmount: number
  ) => {
    try {
      // TODO: 複数人プレイヤーの場合に対応
      await postMatchBetApi(matchId, betAmount);
      const updatedSummary = await getMatchResultSummaryApi(matchId);
      setMatchResultSummary(updatedSummary);

      setIsBeting(false);

      await handleCardDealing();
    } catch (error) {
      console.error("Error in betting:", error);
    }
  };

  const handleRoundStart = async (matchId: string) => {
    try {
      await postMatchStartApi(matchId);

      setIsBeting(true);
      setRoundResult(undefined);

      const matchResultSummaryResponse =
        await getMatchResultSummaryApi(matchId);
      setMatchResultSummary(matchResultSummaryResponse);

      onOpenRoundStartModal();

      setTimeout(() => {
        onOpenBetModal();
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: 複数人用に後で対応する
  const waitForDealerAnimation = (dealerCardCount: number) => {
    const animationDuration = 0.5;
    const totalTime = (dealerCardCount * animationDuration + 1) * 1000; // 1秒の余裕を持たせる

    return new Promise((resolve) => {
      setTimeout(resolve, totalTime);
    });
  };

  // TODO: 複数人用に後で対応する
  const calculateCardDelay = (cardIndex: number, type: "player" | "dealer") => {
    const animationDuration = 0.5;

    if (type === "player") {
      // プレイヤーの最初の2枚は順番通り、それ以降は即時表示
      return cardIndex < 2 ? animationDuration * cardIndex : animationDuration;
    } else {
      // ディーラーの最初の1枚はプレイヤーの2枚表示後、それ以降は順番通り
      return cardIndex === 0
        ? animationDuration * 2
        : animationDuration * (cardIndex + 1);
    }
  };

  useEffect(() => {
    if (!matchId) {
      return;
    }

    return () => {
      handleRoundStart(matchId);
    };
  }, [matchId]);

  useEffect(() => {
    // TODO: すべてのプレイヤーのハンドが解決されているかどうかによる判定に変更する
    if (!matchResultSummary?.player.hand?.isResolved || !matchId || isBeting) {
      return;
    }

    const fetchRoundComplete = async () => {
      try {
        await postRoundCompleteApi(matchId);

        const roundResultResponse = await getRoundResultApi(matchId);
        setRoundResult(roundResultResponse);

        const matchResultSummaryResponse =
          await getMatchResultSummaryApi(matchId);

        // ディーラーのカード枚数を取得
        const dealerCardCount = roundResultResponse.dealersHand.cards.length;
        // アニメーションの完了を待つ
        await waitForDealerAnimation(dealerCardCount);

        if (matchResultSummaryResponse.isCompleted) {
          const matchResultResponse = await getResultApi(matchId);
          setMatchResult(matchResultResponse);

          onOpenMatchResultModal();
        } else {
          onOpenRoundResultModal();
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoundComplete();
  }, [matchResultSummary, matchId]);

  if (!matchId || !matchResultSummary) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative min-h-screen bg-green-600 flex flex-col items-center">
      <div id="header" className="absolute top-4 left-4 text-center space-y-2">
        <div className="flex">
          <div className="mr-2">
            <div className="flex">
              <div className="hidden md:block items-center bg-neutral-950/10 rounded-md">
                <Logo size={32} />
              </div>
              <HelpButton icon={CircleHelp} size={8} />
              <HintToggle
                onClick={() => setIsHintEnabled(!isHintEnabled)}
                className="ml-2"
                text="Hint"
              />
            </div>

            <div className="bg-white rounded-full px-2 border-yellow-500 border-2 ">
              <p className="text-base text-black font-semibold">
                Round {matchResultSummary.roundCount} / 10
              </p>
              
            </div>
          </div>
        </div>
      </div>

      <div
        id="gameTable"
        className="pt-3 flex flex-col justify-between h-[75vh]"
      >
        <div id="dealer" className="bg-neutral-50/5 rounded-md relative">
          <div className="absolute top-1/2 -right-9 px-3 py-1.5 border-2 font-bold text-white bg-black rounded-xl z-10">
            {/* TODO: upcardのみのtotalを取得したい */}
            4
            <div className="absolute top-1/2 -left-2 w-0 h-0 border-y-8 border-y-transparent border-r-8 transform -translate-y-1/2" />
          </div>
          <div className="flex space-x-2">
            {!isBeting &&
              matchResultSummary?.dealer.upCard &&
              (
                roundResult?.dealersHand.cards ?? [
                  matchResultSummary.dealer.upCard,
                ]
              ).map((card, index) => {
                return (
                  <CardComponent
                    key={`dealer-${index}`}
                    isOpen={true}
                    initial={
                      index === 1 // HoleCardの場合は移動前の位置を指定
                        ? { x: "0vw", y: "0vh" }
                        : { x: "50vw", y: "25vh" }
                    }
                    animate={{ x: "0vw", y: "0vh" }}
                    suit={card.suit}
                    rank={card.rank}
                    delay={calculateCardDelay(index, "dealer")}
                  />
                );
              })}

            {!isBeting &&
              matchResultSummary?.player.hand &&
              !matchResultSummary.player.hand.isResolved && (
                <CardComponent
                  key="reverse"
                  isOpen={false}
                  initial={{ x: "50vw", y: "25vh" }}
                  animate={{ x: "0vw", y: "0vh" }}
                  suit={"reverse"}
                  rank={"reverse"}
                  // TODO: 一旦固定値で設定
                  delay={1.5}
                />
              )}
          </div>
        </div>

        <div
          id="player"
          className="bg-neutral-50/5 text-center rounded-md relative"
        >
          <h2 className="bg-gradient-to-b from-slate-300/40 via-slate-100/10 to-slate-50/5 text-white text-lg font-bold rounded-t-md">
            Bet: {matchResultSummary.player.betAmount}
          </h2>
          <div className="absolute top-1/4 -right-24 z-10">
            {!isBeting && (
              <div className="relative w-20 px-2 py-1.5 border-2 font-bold text-white bg-black rounded-xl">
                {/* TODO: ソフトとハードの表示 */}
                {matchResultSummary.player.hand.total}
                <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-r-8" />
              </div>
             )}
            {isHintEnabled && (
              <div className="absolute top-full mt-2 w-max px-2 py-1.5 border-2 font-bold text-white bg-black rounded-xl">
                ヒント：XXX
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            {!isBeting &&
              matchResultSummary?.player.hand &&
              matchResultSummary.player.hand.cards.map((card, index) => {
                return (
                  <CardComponent
                    key={`player-${index}`}
                    isOpen={true}
                    initial={{ x: "50vw", y: "-25vh" }}
                    animate={{ x: "0vw", y: "0vh" }}
                    suit={card.suit}
                    rank={card.rank}
                    delay={calculateCardDelay(index, "player")}
                  />
                );
              })}
          </div>
        </div>
      </div>

      <div id="shoe" className="hidden md:block absolute top-28 right-4">
        <div className="relative h-40 w-24">
          <div className="absolute inset-0 transform translate-x-0 translate-y-0">
            <img className="rounded-lg" src="/trump/back.png" alt="card-back" />
          </div>
          <div className="absolute inset-0 transform translate-x-1 translate-y-1 z-10">
            <img className="rounded-lg" src="/trump/back.png" alt="card-back" />
          </div>
          <div className="absolute inset-0 transform translate-x-2 translate-y-2 z-20">
            <img className="rounded-lg" src="/trump/back.png" alt="card-back" />
          </div>
          <div className="absolute inset-0 transform translate-x-3 translate-y-3 z-30">
            <img className="rounded-lg" src="/trump/back.png" alt="card-back" />
          </div>
        </div>
      </div>

      {/* TODO: 位置を調整する */}
      {/* <div id="otherPlayerInfo" className="absolute w-full">
        {players.map((player, index) => {
          if (!player.isCurrent) {
            const positionClass =
              currentPlayerIndex < index ? "left-4" : "right-4";

            const topOffset =
              currentPlayerIndex < index
                ? (index - currentPlayerIndex) *
                    (otherPlayersSpacingHeight /
                      (players.length - currentPlayerIndex - 1)) +
                  150
                : (currentPlayerIndex - index) *
                    (otherPlayersSpacingHeight / currentPlayerIndex) +
                  150;

            return (
              <div
                key={player.id}
                style={{ top: `${topOffset}px` }}
                className={`absolute ${positionClass} bg-white rounded-md p-1 space-x-1 shadow-md w-[70px]`}
              >
                <p className="font-bold text-xs">{player.name}</p>
                <p className="text-xs">Hand: {player.hand}</p>
              </div>
            );
          }
        })}
      </div> */}

      {/* TOOD: ボタンすべて、押下できるかの判定を追加する */}
      <div id="handSignal" className="flex justify-center pb-4 gap-x-4">
        <HandSignalButton
          text="STAND"
          icon={Hand}
          variant="danger"
          action={() => handleStand(matchId)}
          disabled={
            isDealing ||
            !matchResultSummary.player.handSignalOptions?.includes("stand")
          }
        />
        {/* TODO: SPLIT機能を追加 */}
        <HandSignalButton
          text="SPLIT"
          icon={Layers2}
          variant="warning"
          action={() => {}}
          disabled={isDealing}
        />
        {/* TODO: DOUBLE機能を追加 */}
        <HandSignalButton
          text="DOUBLE"
          icon={Subscript}
          variant="primary"
          action={() => {}}
          disabled={isDealing}
        />
        <HandSignalButton
          text="HIT"
          icon={CopyPlus}
          variant="success"
          action={() => handleHit(matchId)}
          disabled={
            isDealing ||
            !matchResultSummary.player.handSignalOptions?.includes("hit")
          }
        />
      </div>

      <div
        id="playerInfo"
        className="bg-white rounded-lg flex justify-around py-2 mb-1 w-[30%]"
      >
        <Avatar className="hidden md:block size-8" {...avatarConfig} />
        <div className="flex justify-between items-center gap-x-4 ">
          {/* TODO: 現在のプレイヤーの情報を取得する */}
          <p className="text-center text-black font-semibold">Player 2</p>
          <p className="text-center text-black font-semibold">Credit: 100</p>
        </div>
      </div>

      <RoundStartModal roundCount={matchResultSummary.roundCount} />
      <BetModal
        matchId={matchId}
        handleBet={handleBet}
        players={[
          {
            // TODO: プレイヤーをapiから取得して表示する
            id: matchResultSummary?.player.id,
            name: "Player 1",
            credit: matchResultSummary?.player.credit,
          },
        ]}
      />
      {/* TODO: プレイヤーの情報を取得して表示する */}
      {/* <RotationModal name={"Player2"} /> */}
      {/* <BlackjackModal /> */}
      <HitModal />
      <StandModal />
      {roundResult && (
        <RoundResultModal
          matchId={matchId}
          roundResultPlayers={[roundResult.player].map((player) => ({
            // TODO: プレイヤーのnameを取得して表示する
            name: "Player 1",
            result: player.result,
            credit: player.credit,
          }))}
          handleRoundStart={handleRoundStart}
        />
      )}
      {matchResult && (
        <MatchResultModal
          matchResultPlayers={[matchResult.player].map((player) => ({
            // TODO: プレイヤーのnameを取得して表示する
            name: "Player 1",
            rounds: player.creditHistories,
            finalCredit: player.finalCredit,
            balance: player.balance,
          }))}
        />
      )}
    </div>
  );
};
