import { useState } from "react";
import { TileType } from "./types";
import { motion } from "framer-motion";

const Tile = ({ imageUrl }: TileType) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const handleFlip = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };
  return (
    <div
      className="border border-gray rounded-sm w-8 md:w-12 lg:w-16 h-8 md:h-12 lg:h-16 bg-white cursor-pointer flip-card"
      onClick={handleFlip}
    >
      <motion.div
        className="flip-card-inner w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 360 }}
        transition={{ duration: 0.3 }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        <div
          style={{ backgroundImage: "url(question-mark.svg)" }}
          className="flip-card-front w-full h-full bg-cover"
        />
        <div
          style={{ backgroundImage: `url(${imageUrl})` }}
          className="flip-card-back w-full h-full bg-cover"
        />
      </motion.div>
    </div>
  );
};

export default Tile;
