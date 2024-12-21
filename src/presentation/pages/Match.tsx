import { useState, useEffect } from "react";
import { Button } from "../shadcnUI/components/ui/button";
import { Card } from "../components/Card";
import { BetModal } from "../components/match/bet-modal";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Card as CardType } from "../types/card";
import { PlayerHand } from "../types/playerHand";

export const MatchPage = () => {
  const location = useLocation();
  // TODO: move to .env
  const apiUrl = "http://localhost:3000/api";

  const [isLoading, setIsLoading] = useState(true);
  const [dealerCards, setDealerCards] = useState<CardType[] | undefined>(
    undefined
  );
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

  const getUpCardApi = async (roundId: string): Promise<CardType> => {
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
      const matchId = location.pathname.split("/")[2];
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

    fetchRoundId();
  }, [isLoading]);

  return (
    <div className="relative min-h-screen">
      <div className="dealer flex">
        {dealerCards &&
          dealerCards.map((card, index) => {
            return (
              <Card
                key={card.suit + card.rank}
                isOpen={index === 0}
                owner="dealer"
                suit={card.suit}
                rank={card.rank}
              />
            );
          })}
        {playerHand && !playerHand.isResolved && (
          <Card
            key="reverse"
            isOpen={false}
            owner="dealer"
            suit={"reverse"}
            rank={"reverse"}
          />
        )}
      </div>
      <div className="player flex">
        {playerHand &&
          playerHand.cards.map((card) => {
            return (
              <Card
                key={card.suit + card.rank}
                isOpen={true}
                owner="player"
                suit={card.suit}
                rank={card.rank}
              />
            );
          })}
      </div>
      <div className="absolute bottom-0 left-0 w-full flex justify-center pb-4">
        <Button onClick={handleStand} className="mx-2">
          STAND
        </Button>
        <Button onClick={handleHit} className="mx-2">
          HIT
        </Button>
      </div>
      <BetModal />
    </div>
  );
};
