import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Hand, CopyPlus, Layers2, Subscript, CircleHelp } from "lucide-react";
import Avatar, { genConfig } from "react-nice-avatar";
import axios from "axios";

import { CardComponent } from "../components/match/cardComponent";
import { BetModal } from "../components/match/bet-modal";
import { HandSignalButton } from "../components/match/hand-signal-button";
import { Logo } from "../components/share/logo";

import { ResultSummary } from "../types/resultSummary";
import { HelpButton } from "../components/match/help-button";
import { RoundResult } from "../types/roundResult";

export const MatchPage = () => {
  const { matchId } = useParams<{ matchId: string }>();

  // TODO: 現在のプレイヤーの名前を毎回代入する形に変更する
  const avatarConfig = genConfig("Player 2");
  // TODO: move to .env
  const apiUrl = "http://localhost:3000/api";

  const [isLoading, setIsLoading] = useState(true);
  const [matchResultSummary, setMatchResultSummary] = useState<
    ResultSummary | undefined
  >(undefined);
  const [roundResult, setRoundResult] = useState<RoundResult | undefined>(
    undefined
  );

  // TODO: ドメイン層からプレイヤー情報を取得する
  // ハンドではなく、スートとランクにするかも、ほかプレイヤーの情報は変更の可能性あり
  const [players, setPlayers] = useState([
    { id: 1, name: "Player 1", hand: 10, isCurrent: false },
    { id: 5, name: "Player 5", hand: 14, isCurrent: false },
    { id: 3, name: "Player 3", hand: 12, isCurrent: false },
    { id: 2, name: "Player 2", hand: 18, isCurrent: true },
    { id: 4, name: "Player 4", hand: 8, isCurrent: false },
    { id: 6, name: "Player 6", hand: 16, isCurrent: false },
    { id: 7, name: "Player 7", hand: 20, isCurrent: false },
  ]);

  const currentPlayerIndex = players.findIndex((player) => player.isCurrent);

  // プレイヤー間の高さ調整用固定値
  // TODO: 画面幅に応じて高さを調整する
  const otherPlayersSpacingHeight =
    players.length > 1
      ? 40 * players.length // 基本高さをプレイヤー数に応じてスケーリング
      : 150; // プレイヤーが1人の場合のデフォルト高さ

  const postStandApi = async (roundId: string): Promise<void> => {
    try {
      await axios.post(`${apiUrl}/matches/${roundId}/stand`, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const postHitApi = async (roundId: string): Promise<void> => {
    try {
      await axios.post(`${apiUrl}/matches/${roundId}/hit`, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const postMatchBetApi = async (
    matchId: string,
    amount: number
  ): Promise<void> => {
    try {
      await axios.post(
        `${apiUrl}/matches/${matchId}/bet`,
        { amount },
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const getMatchResultSummaryApi = async (
    matchId: string
  ): Promise<ResultSummary> => {
    try {
      const res = await axios.get(`${apiUrl}/matches/${matchId}/summary`);

      return res.data;
    } catch (err) {
      console.error(err);
      return Promise.reject();
    }
  };

  const postRoundCompleteApi = async (matchId: string): Promise<void> => {
    try {
      await axios.post(
        `${apiUrl}/matches/${matchId}/complete-round`,
        {},
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const getRoundResultApi = async (matchId: string): Promise<RoundResult> => {
    try {
      const res = await axios.get(`${apiUrl}/matches/${matchId}/round-result`);

      return res.data;
    } catch (err) {
      console.error(err);
      return Promise.reject();
    }
  };

  const handleHit = async (matchId: string) => {
    await postHitApi(matchId);
    const matchResultSummaryResponse = await getMatchResultSummaryApi(matchId);
    setMatchResultSummary(matchResultSummaryResponse);
  };

  const handleStand = async (matchId: string) => {
    await postStandApi(matchId);
    const matchResultSummaryResponse = await getMatchResultSummaryApi(matchId);
    setMatchResultSummary(matchResultSummaryResponse);
  };

  const handleBet = async (matchId: string, amount: number) => {
    await postMatchBetApi(matchId, amount);
    const matchResultSummaryResponse = await getMatchResultSummaryApi(matchId);
    setMatchResultSummary(matchResultSummaryResponse);
  };

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const fetchRoundId = async () => {
      if (matchId) {
        const matchResultSummaryResponse =
          await getMatchResultSummaryApi(matchId);
        setMatchResultSummary(matchResultSummaryResponse);
        setIsLoading(false);
      }
    };
    return () => {
      fetchRoundId();
    };
  }, []);

  useEffect(() => {
    if (
      matchResultSummary?.player.hand &&
      matchResultSummary.player.hand.isResolved
    ) {
      const fetchDealerHand = async (matchId: string) => {
        try {
          await postRoundCompleteApi(matchId);
          const roundResultResponse = await getRoundResultApi(matchId);
          setRoundResult(roundResultResponse);
        } catch (error) {
          console.error("Error fetching dealer's hand:", error);
        }
      };
      if (matchId) {
        fetchDealerHand(matchId);
        console.log("Round completed");
      }
    }
  }, [matchResultSummary]);

  if (!matchId || isLoading || !matchResultSummary) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative min-h-screen bg-green-600 flex flex-col items-center">
      <div id="header" className="absolute top-4 left-4 text-center space-y-2">
        <div className="flex">
          <div className="mr-2">
            <div className="hidden md:block items-center bg-neutral-950/10 rounded-md">
              <Logo size={32} />
            </div>

            <div className="bg-white rounded-full px-2 border-yellow-500 border-2 ">
              <p className="text-base text-black font-semibold">Round 1</p>
            </div>
          </div>
          <HelpButton icon={CircleHelp} size={8} />
        </div>
      </div>

      <div
        id="gameTable"
        className="pt-3 flex flex-col justify-between h-[75vh]"
      >
        <div id="dealer" className="bg-neutral-50/5 rounded-md relative">
          <div className="absolute top-1/2 -right-9 px-3 py-1.5 border-2 font-bold text-white bg-black rounded-xl z-10">
            4
            <div className="absolute top-1/2 -left-2 w-0 h-0 border-y-8 border-y-transparent border-r-8 transform -translate-y-1/2" />
          </div>
          <div className="flex space-x-2">
            {matchResultSummary?.dealer.upCard &&
              (
                roundResult?.dealersHand.cards ?? [
                  matchResultSummary.dealer.upCard,
                ]
              ).map((card, index) => {
                return (
                  <CardComponent
                    key={`dealer-${index}`}
                    isOpen={true}
                    initial={{ x: "50vw", y: "25vh" }}
                    animate={{ x: "0vw", y: "0vh" }}
                    suit={card.suit}
                    rank={card.rank}
                  />
                );
              })}

            {matchResultSummary?.player.hand &&
              !matchResultSummary.player.hand.isResolved && (
                <CardComponent
                  key="reverse"
                  isOpen={false}
                  initial={{ x: "50vw", y: "25vh" }}
                  animate={{ x: "0vw", y: "0vh" }}
                  suit={"reverse"}
                  rank={"reverse"}
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
          <div className="absolute top-1/2 -right-9 px-2 py-1.5 border-2 font-bold text-white bg-black rounded-xl z-10">
            10/20
            <div className="absolute top-1/2 -left-2 w-0 h-0 border-y-8 border-y-transparent border-r-8 transform -translate-y-1/2" />
          </div>
          <div className="flex space-x-2">
            {matchResultSummary?.player.hand &&
              matchResultSummary.player.hand.cards.map((card, index) => {
                return (
                  <CardComponent
                    key={`player-${index}`}
                    isOpen={true}
                    initial={{ x: "50vw", y: "-25vh" }}
                    animate={{ x: "0vw", y: "0vh" }}
                    suit={card.suit}
                    rank={card.rank}
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
      <div id="otherPlayerInfo" className="absolute w-full">
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
      </div>

      {/* TOOD: ボタンすべて、押下できるかの判定を追加する */}
      <div id="handSignal" className="flex justify-center pb-4 gap-x-4">
        <HandSignalButton
          text="STAND"
          icon={Hand}
          variant="danger"
          action={() => handleStand(matchId)} // TODO: matchIdがundefinedの場合の処理を追加
          disabled={
            matchResultSummary?.player.handSignalOptions &&
            !matchResultSummary.player.handSignalOptions.find(
              (signal) => signal === "stand"
            )
          }
        />
        {/* TODO: SPLIT機能を追加 */}
        <HandSignalButton
          text="SPLIT"
          icon={Layers2}
          variant="warning"
          action={() => {}}
        />
        {/* TODO: DOUBLE機能を追加 */}
        <HandSignalButton
          text="DOUBLE"
          icon={Subscript}
          variant="primary"
          action={() => {}}
        />
        <HandSignalButton
          text="HIT"
          icon={CopyPlus}
          variant="success"
          action={() => handleHit(matchId)}
          disabled={
            matchResultSummary?.player.handSignalOptions &&
            !matchResultSummary.player.handSignalOptions.find(
              (signal) => signal === "hit"
            )
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

      <BetModal
        matchId={matchId}
        onClickDeal={handleBet}
        credit={matchResultSummary.player.credit}
      />
    </div>
  );
};
