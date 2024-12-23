import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { motion } from "framer-motion";
import { MatchGetPlayerHandApiResponseCard } from "../types/matchGetPlayerHandApiResponseCard";

export const Card = ({
  isOpen,
  animate,
  suit,
  rank,
}: {
  isOpen: boolean;
  animate: {
    x: string;
    y: string;
  };
  suit: Pick<MatchGetPlayerHandApiResponseCard, "suit">["suit"] | "reverse";
  rank: Pick<MatchGetPlayerHandApiResponseCard, "rank">["rank"] | "reverse";
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ x: "100vw", y: "25vh" }}
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
      className="flex space-x-4"
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className="mt-5 mr-2 h-40 w-24">
          <img src="/trump/back.png" alt="card-back" />
        </div>
        <div className="mt-5 mr-2 h-40 w-24">
          <img src={`/trump/${suit}${rank}.png`} alt="" />
        </div>
      </ReactCardFlip>
    </motion.div>
  );
};
