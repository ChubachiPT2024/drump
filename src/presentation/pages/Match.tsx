import { useState, useEffect } from "react";
import { Button } from "../shadcnUI/components/ui/button";
import { Card } from "../components/Card";
import { BetModal } from "../components/match/bet-modal";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { MatchGetPlayerHandApiResponseCard } from "../types/matchGetPlayerHandApiResponseCard";
import { PlayerHand } from "../types/playerHand";
import { RoundGetHandSignalOptionsApi } from "../types/roundGetHandSignalOptionsApi";

export const MatchPage = () => {
  const location = useLocation();
  const { matchId } = useParams<{ matchId: string }>();

  // TODO: move to .env
  const apiUrl = "http://localhost:3000/api";

  const [isLoading, setIsLoading] = useState(true);
  const [dealerCards, setDealerCards] = useState<
    MatchGetPlayerHandApiResponseCard[] | undefined
  >(undefined);
  const [playerHand, setPlayerHand] = useState<PlayerHand | undefined>(
    undefined
  );
  const [handSignals, setHandSignals] = useState<
    Pick<RoundGetHandSignalOptionsApi, "handSignals">["handSignals"] | undefined
  >(undefined);
  const roundId = location.state.roundId;

  const handleStand = async (roundId: string) => {
    await postStandApi(roundId);
    const updatedPlayerHand = await getPlayersHandApi(roundId);
    setPlayerHand(updatedPlayerHand);
  };

  const handleHit = async (roundId: string) => {
    await postHitApi(roundId);
    const updatedPlayerHand = await getPlayersHandApi(roundId);
    setPlayerHand(updatedPlayerHand);
  };

  const postRoundCompleteApi = async (roundId: string): Promise<void> => {
    try {
      await axios.post(
        `${apiUrl}/rounds/${roundId}/complete`,
        {},
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      console.error(err);
    }
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

  const getHandSignalOptionsApi = async (
    roundId: string
  ): Promise<RoundGetHandSignalOptionsApi> => {
    try {
      const res = await axios.get(
        `${apiUrl}/rounds/${roundId}/hand-signal-options`
      );

      return res.data;
    } catch (err) {
      console.error(err);
      return Promise.reject();
    }
  };

  const postStandApi = async (roundId: string): Promise<void> => {
    try {
      await axios.post(`${apiUrl}/rounds/${roundId}/stand`, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const postHitApi = async (roundId: string): Promise<void> => {
    try {
      await axios.post(`${apiUrl}/rounds/${roundId}/hit`, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const fetchRoundId = async () => {
      if (roundId && matchId) {
        await postAddRoundApi(matchId, roundId);
        await postRoundStartApi(roundId);
        const upCard = await getUpCardApi(roundId);
        const playerHand = await getPlayersHandApi(roundId);
        const handSignalOptions = await getHandSignalOptionsApi(roundId);

        setDealerCards([upCard]);
        setPlayerHand(playerHand);
        setHandSignals(handSignalOptions.handSignals);
        setIsLoading(false);
      }
    };
    return () => {
      fetchRoundId();
    };
  }, []);

  useEffect(() => {
    if (playerHand && playerHand.isResolved) {
      const fetchDealerHand = async () => {
        try {
          await postRoundCompleteApi(roundId);
          console.log("Round completed");
        } catch (error) {
          console.error("Error fetching dealer's hand:", error);
        }
      };

      fetchDealerHand();
    }
  }, [playerHand]);

  return (
    <div className="relative min-h-screen">
      <div className="dealer flex">
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
      <div className="player flex">
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
      <div className="absolute bottom-0 left-0 w-full flex justify-center pb-4">
        <Button
          onClick={() => handleStand(roundId)}
          className="mx-2"
          disabled={
            handSignals && !handSignals.find((signal) => signal === "stand")
          }
        >
          STAND
        </Button>
        <Button
          onClick={() => handleHit(roundId)}
          className="mx-2"
          disabled={
            handSignals && !handSignals.find((signal) => signal === "hit")
          }
        >
          HIT
        </Button>
      </div>
      <BetModal />
    </div>
  );
};
