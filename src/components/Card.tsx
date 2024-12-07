import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { motion } from "framer-motion";

const Card = ({ isOpen }: { isOpen: boolean }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  function flipCard() {
    setIsFlipped(!isFlipped);
  }

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 10,
      }}
      onAnimationComplete={
        isOpen ? () => setIsFlipped(true) : () => setIsFlipped(false)
      }
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div onClick={flipCard} className="h-40 w-1/5 border">
          <h2>裏だよ</h2>
        </div>
        <div onClick={flipCard} className="h-40 w-1/5 border">
          <h2>表だよ</h2>
        </div>
      </ReactCardFlip>
    </motion.div>
  );
};

export default Card;
