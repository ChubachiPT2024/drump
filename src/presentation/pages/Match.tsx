import { useState, useEffect } from "react";
import { Button } from "../shadcnUI/components/ui/button";
import { Card } from "../components/Card";
import { BetModal } from "../components/match/bet-modal";
import axios from "axios";
import { useLocation } from "react-router-dom";

interface CardType {
  id: number;
  isOpen: boolean;
  suit: "spade" | "heart" | "diamond" | "club";
  rank: number;
}
interface PlayerHand {
  cards: CardType[];
  isResolved: boolean;
  total: number;
}

export const MatchPage = () => {
  const location = useLocation();
  // TODO: move to .env
  const apiUrl = "http://localhost:3000/api";

  const [canHitByPlayer, setCanHitByPlayer] = useState(true);
  const [dealerCardsToShow, setDealerCardsToShow] = useState(1);
  const [playerCardsToShow, setPlayerCardsToShow] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [upCards, setUpCards] = useState<CardType[] | []>([]);
  const [playerHandCards, setPlayerHandCards] = useState<PlayerHand | null>(
    null
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
        const playerCards = await getPlayersHandApi(roundId);
        setUpCards([upCard]);
        setPlayerHandCards(playerCards);

        setIsLoading(false);
      }
    };

    fetchRoundId();
  }, [isLoading]);

  return (
    <div className="relative min-h-screen">
      <div className="dealer flex">
        {upCards.map((card, index) => {
          if (index < dealerCardsToShow) {
            return (
              <Card
                key={card.suit + card.rank}
                isOpen={card.isOpen}
                owner="dealer"
                suit={card.suit}
                rank={card.rank}
                onAnimationComplete={() => {
                  setDealerCardsToShow((prev) => prev + 1);
                }}
              />
            );
          }

          return null;
        })}
      </div>
      <div className="player flex">
        {playerHandCards &&
          playerHandCards.cards.map((card, index) => {
            if (index < playerCardsToShow) {
              return (
                <Card
                  key={card.suit + card.rank}
                  isOpen={card.isOpen}
                  owner="player"
                  suit={card.suit}
                  rank={card.rank}
                  onAnimationComplete={() => {
                    setPlayerCardsToShow((prev) => prev + 1);
                  }}
                />
              );
            }

            return null;
          })}
      </div>
      <div className="absolute bottom-0 left-0 w-full flex justify-center pb-4">
        <Button onClick={handleStand} className="mx-2">
          STAND
        </Button>
        <Button onClick={handleHit} className="mx-2" disabled={!canHitByPlayer}>
          HIT
        </Button>
      </div>
      <BetModal />
    </div>
  );
};
