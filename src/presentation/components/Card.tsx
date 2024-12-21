import { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";
import { motion } from "framer-motion";

export const Card = ({
  isOpen,
  owner,
  suit,
  rank,
  onAnimationComplete,
}: {
  isOpen: boolean;
  owner: "dealer" | "player";
  suit: string;
  rank: number;
  onAnimationComplete: () => void;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(isOpen);
  }, [isOpen]);

  return (
    <motion.div
      initial={{ x: "100vw", y: "25vh" }}
      animate={{
        x: "40vw",
        y: owner == "dealer" ? "0%" : "25vh",
      }}
      transition={{
        type: "linear",
        stiffness: 150,
        damping: 20,
      }}
      onAnimationComplete={() => {
        if (isOpen) {
          setIsFlipped(true);
        }
        onAnimationComplete();
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
