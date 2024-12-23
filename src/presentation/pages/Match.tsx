import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Hand, CopyPlus, Layers2, Subscript } from "lucide-react";
import Avatar, { genConfig } from "react-nice-avatar";
import axios from "axios";

import { Card } from "../components/match/Card";
import { BetModal } from "../components/match/bet-modal";
import { HandSignalButton } from "../components/match/hand-signal-button";
import { Logo } from "../components/share/logo";

import { MatchGetPlayerHandApiResponseCard } from "../types/matchGetPlayerHandApiResponseCard";
import { PlayerHand } from "../types/playerHand";

export const MatchPage = () => {
  const location = useLocation();
  const { matchId } = useParams<{ matchId: string }>();

  // TODO: 現在のプレイヤーの名前を毎回代入する形に変更する
  const avatarConfig = genConfig("Player 2");

  // TODO: move to .env
  const apiUrl = "http://localhost:3000/api";

  const [isLoading, setIsLoading] = useState(true);
  const [dealerCards, setDealerCards] = useState<
    MatchGetPlayerHandApiResponseCard[] | undefined
  >(undefined);
  const [playerHand, setPlayerHand] = useState<PlayerHand | undefined>(
    undefined
  );

  const handleStand = () => {
    console.log("stand");
  };

  const handleHit = () => {
    console.log("hit");
  };

  const postAddRoundApi = async (
    matchId: string,
    roundId: string
  ): Promise<void> => {
    try {
      await axios.post(
        `${apiUrl}/matches/${matchId}/add-round`,
        { roundId },
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const postRoundStartApi = async (roundId: string): Promise<void> => {
    try {
      await axios.post(
        `${apiUrl}/rounds/${roundId}/start`,
        {},
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const getUpCardApi = async (
    roundId: string
  ): Promise<MatchGetPlayerHandApiResponseCard> => {
    try {
      const res = await axios.get(`${apiUrl}/rounds/${roundId}/up-card`);

      return res.data;
    } catch (err) {
      console.error(err);
      return Promise.reject();
    }
  };

  const getPlayersHandApi = async (roundId: string): Promise<PlayerHand> => {
    try {
      const res = await axios.get(`${apiUrl}/rounds/${roundId}/players-hand`);

      return res.data;
    } catch (err) {
      console.error(err);
      return Promise.reject();
    }
  };

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const fetchRoundId = async () => {
      const roundId = location.state.roundId;

      if (roundId && matchId) {
        await postAddRoundApi(matchId, roundId);
        await postRoundStartApi(roundId);
        const upCard = await getUpCardApi(roundId);
        const playerHand = await getPlayersHandApi(roundId);

        setDealerCards([upCard]);
        setPlayerHand(playerHand);
        setIsLoading(false);
      }
    };
    return () => {
      fetchRoundId();
    };
  }, []);

  // TODO: ドメイン層からプレイヤー情報を取得する
  // ハンドではなく、スートとランクにするかも、ほかプレイヤーの情報は変更の可能性あり
  const [players, setPlayers] = useState([
    { id: 1, name: "Player 1", hand: 10, isCurrent: false },
    { id: 5, name: "Player 5", hand: 14, isCurrent: false },
    { id: 2, name: "Player 2", hand: 18, isCurrent: true },
    { id: 3, name: "Player 3", hand: 12, isCurrent: false },
    { id: 4, name: "Player 4", hand: 8, isCurrent: false },
    { id: 6, name: "Player 6", hand: 16, isCurrent: false },
  ]);

  const currentPlayerIndex = players.findIndex((player) => player.isCurrent);

  return (
    <div className="relative min-h-screen bg-green-600 flex flex-col items-center">
      <div id="header" className="absolute top-4 left-4 text-center space-y-2">
        <div className="hidden md:block items-center bg-neutral-950/10 rounded-md">
          <Logo size="size-32" />
        </div>
        <div className="bg-white rounded-full px-2 border-yellow-500 border-2">
          <p className="text-base text-black font-semibold">Round 1</p>
        </div>
      </div>

      <div
        id="gameTable"
        className="p-3 flex flex-col justify-between h-[80vh]"
      >
        <div id="dealer" className="bg-neutral-50/5 rounded-md relative">
          <div className="absolute top-1/2 -right-9 px-3 py-1.5 border-2 font-bold text-white bg-black rounded-xl z-10">
            4
            <div className="absolute top-1/2 -left-2 w-0 h-0 border-y-8 border-y-transparent border-r-8 transform -translate-y-1/2" />
          </div>
          <div className="flex">
            {dealerCards &&
              dealerCards.map((card, index) => {
                return (
                  <Card
                    key={card.suit + card.rank}
                    isOpen={index === 0}
                    animate={{ x: "40vw", y: "0vh" }}
                    suit={card.suit}
                    rank={card.rank}
                  />
                );
              })}
            {playerHand && !playerHand.isResolved && (
              <Card
                key="reverse"
                isOpen={false}
                animate={{ x: "40vw", y: "0vh" }}
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
          <h2 className="bg-gradient-to-b from-slate-300/40 via-slate-100/10 to-slate-50/5 text-white text-xl font-bold rounded-t-md">
            Bet: 35
          </h2>
          <div className="absolute top-1/2 -right-9 px-2 py-1.5 border-2 font-bold text-white bg-black rounded-xl z-10">
            10/20
            <div className="absolute top-1/2 -left-2 w-0 h-0 border-y-8 border-y-transparent border-r-8 transform -translate-y-1/2" />
          </div>
          <div className="flex">
            {playerHand &&
              playerHand.cards.map((card) => {
                return (
                  <Card
                    key={card.suit + card.rank}
                    isOpen={true}
                    animate={{
                      x: "40vw",
                      y: "25vh",
                    }}
                    suit={card.suit}
                    rank={card.rank}
                  />
                );
              })}
          </div>
        </div>
      </div>

      <div id="otherPlayerInfo" className="absolute w-full">
        {players.map((player, index) => {
          if (!player.isCurrent) {
            const positionClass =
              currentPlayerIndex < index ? "left-4" : "right-4";

            const h = players.length * 40;
            const topOffset =
              currentPlayerIndex < index
                ? (index - currentPlayerIndex) *
                    (h / (players.length - currentPlayerIndex - 1)) +
                  150
                : (currentPlayerIndex - index) * (h / currentPlayerIndex) + 150;

            return (
              <div
                key={player.id}
                style={{ top: `${topOffset}px` }}
                className={`absolute ${positionClass} bg-white rounded-md p-2 shadow-md w-[90px]`}
              >
                <p className="font-bold">{player.name}</p>
                <p>Hand: {player.hand}</p>
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
          action={handleStand}
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
          action={handleHit}
        />
      </div>

      <div
        id="playerInfo"
        className="bg-white rounded-lg flex justify-around py-2 w-[30%]"
      >
        <Avatar className="size-8" {...avatarConfig} />
        <div className="flex justify-between items-center px-5 gap-x-4 ">
          {/* TODO: 現在のプレイヤーの情報を取得する */}
          <p className="text-center text-black font-semibold">Player 2</p>
          <p className="text-center text-black font-semibold">Credit: 100</p>
        </div>
      </div>

      <BetModal />
    </div>
  );
};
