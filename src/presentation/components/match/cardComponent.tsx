import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { motion } from "framer-motion";
import { Card } from "../../types/card";

export const CardComponent = ({
  isOpen,
  initial,
  animate,
  suit,
  rank,
}: {
  isOpen: boolean;
  initial: {
    x: string;
    y: string;
  };
  animate: {
    x: string;
    y: string;
  };
  suit: Pick<Card, "suit">["suit"] | "reverse";
  rank: Pick<Card, "rank">["rank"] | "reverse";
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{
        type: "linear",
        stiffness: 150,
        damping: 20,
      }}
      onAnimationComplete={() => {
        if (isOpen) {
          setIsFlipped(true);
        }
      }}
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className="h-40 w-24">
          <img className="rounded-lg" src="/trump/back.png" alt="card-back" />
        </div>
        <div className="h-40 w-24">
          <img
            className="rounded-lg"
            src={`/trump/${suit}${rank}.png`}
            alt="trump-card"
          />
        </div>
      </ReactCardFlip>
    </motion.div>
  );
};
