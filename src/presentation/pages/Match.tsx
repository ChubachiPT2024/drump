import { useState } from "react";
import { Button } from "../shadcnUI/components/ui/button";
import { Card } from "../components/Card";

export const Match = () => {
  const [dealerFirstCardComplete, setDealerFirstCardComplete] = useState(false);
  const [dealerSecondCardComplete, setDealerSecondCardComplete] =
    useState(false);
  const [playerFirstCardComplete, setPlayerFirstCardComplete] = useState(false);
  const [playerSecondCardComplete, setPlayerSecondCardComplete] =
    useState(false);

  // TODO: APIのレスポンスを受け取ってカード情報をセットする
  const [cards, setCards] = useState([
    { id: 1, isOpen: true, owner: "dealer", value: 1 },
    { id: 2, isOpen: false, owner: "dealer", value: 2 },
    { id: 3, isOpen: true, owner: "player", value: 3 },
    { id: 4, isOpen: true, owner: "player", value: 4 },
  ]);

  const handleStand = () => {
    const newCards = cards.map((card) => ({ ...card, isOpen: true }));
    setCards(newCards);
  };

  return (
    <>
      <div className="dealer flex">
        <Card
          key={cards[0].id}
          isOpen={cards[0].isOpen}
          owner={cards[0].owner}
          value={cards[0].value}
          onAnimationComplete={() => setDealerFirstCardComplete(true)}
        />
        {dealerFirstCardComplete && (
          <Card
            key={cards[1].id}
            isOpen={cards[1].isOpen}
            owner={cards[1].owner}
            value={cards[1].value}
            onAnimationComplete={() => setDealerSecondCardComplete(true)}
          />
        )}
      </div>
      <div className="player flex">
        <Card
          key={cards[2].id}
          isOpen={cards[2].isOpen}
          owner={cards[2].owner}
          value={cards[2].value}
          onAnimationComplete={() => setPlayerFirstCardComplete(true)}
        />
        {playerFirstCardComplete && (
          <Card
            key={cards[3].id}
            isOpen={cards[3].isOpen}
            owner={cards[3].owner}
            value={cards[3].value}
            onAnimationComplete={() => setPlayerSecondCardComplete(true)}
          />
        )}
      </div>
      {dealerSecondCardComplete && playerSecondCardComplete && (
        <div className="flex">
          <Button onClick={handleStand} className="ml-auto">
            STAND
          </Button>
        </div>
      )}
    </>
  );
};
