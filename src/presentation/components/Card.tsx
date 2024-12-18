import { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";
import { motion } from "framer-motion";

//TODO: type cardで渡す,ownerをLiteral Union Typesで指定
export const Card = ({
  isOpen,
  owner,
  value,
  onAnimationComplete,
}: {
  isOpen: boolean;
  owner: string;
  value: number;
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
          <img src="./trump/back.png" alt="card-back" />
        </div>
        {/* TODO: カードの画像のパスを指定する */}
        <div className="mt-5 mr-2 h-40 w-24">
          <h2 className="text-center">{value}</h2>
        </div>
      </ReactCardFlip>
    </motion.div>
  );
};
