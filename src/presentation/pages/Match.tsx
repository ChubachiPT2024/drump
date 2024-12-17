import { useState, useEffect } from "react";
import { Button } from "../shadcnUI/components/ui/button";
import { Card } from "../components/Card";

export const MatchPage = () => {
  const [canHitByPlayer, setCanHitByPlayer] = useState(true);
  const [dealerCardsToShow, setDealerCardsToShow] = useState(1);
  const [playerCardsToShow, setPlayerCardsToShow] = useState(1);

  // TODO: APIのレスポンスを受け取ってカード情報をセットする
  // FIX: value -> rank,suit
  const [cards, setCards] = useState([
    { id: 1, isOpen: true, owner: "dealer", value: 1 },
    { id: 2, isOpen: false, owner: "dealer", value: 2 },
    { id: 3, isOpen: true, owner: "player", value: 3 },
    { id: 4, isOpen: true, owner: "player", value: 4 },
  ]);
  const isStanded = cards
    .filter((card) => card.owner === "dealer")
    .every((card) => card.isOpen);

  const handleStand = () => {
    const newCards = cards.map((card) => ({ ...card, isOpen: true }));
    setCards(newCards);
  };

  const handleHit = () => {
    setCards([
      ...cards,
      {
        id: cards.length + 1,
        isOpen: true,
        owner: "player",
        value: Math.floor(Math.random() * 10) + 1,
      },
    ]);
  };

  useEffect(() => {
    const sumValues = cards.reduce((acc, card) => acc + card.value, 0);
    if (sumValues > 21 || isStanded) {
      setCanHitByPlayer(false);
    }
  }, [cards]);

  return (
    <div className="relative min-h-screen">
      <div className="dealer flex">
        {cards
          .filter((card) => card.owner === "dealer")
          .map((card, index) => {
            if (index < dealerCardsToShow) {
              return (
                <Card
                  key={card.id}
                  isOpen={card.isOpen}
                  owner={card.owner}
                  value={card.value}
                  onAnimationComplete={() => {
                    setDealerCardsToShow((prev) => prev + 1);
                  }}
                />
              );
            } else {
              return null;
            }
          })}
      </div>
      <div className="player flex">
        {cards
          .filter((card) => card.owner === "player")
          .map((card, index) => {
            if (index < playerCardsToShow) {
              return (
                <Card
                  key={card.id}
                  isOpen={card.isOpen}
                  owner={card.owner}
                  value={card.value}
                  onAnimationComplete={() => {
                    setPlayerCardsToShow((prev) => prev + 1);
                  }}
                />
              );
            } else {
              return null;
            }
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
    </div>
  );
};
