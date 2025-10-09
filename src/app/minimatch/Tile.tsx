import { useState } from "react";
import { TileType } from "./types";
import { motion } from "framer-motion";
import { useGameStore } from "./useGameStore";

const Tile = ({ imageUrl, code, index }: TileType) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const { currentTileCode, flipped, found, currentTileIndex } = useGameStore();
  const handleFlip = () => {
    if (!found[code] && index !== currentTileIndex) {
      if (!isAnimating) {
        setIsAnimating(true);
        // first tile selected
        if (currentTileCode < 0) {
          useGameStore.setState((state) => {
            const tempFlippedState = [...state.flipped];
            tempFlippedState[index] = true;

            return {
              ...state,
              currentTileCode: code,
              currentTileIndex: index,
              flipped: tempFlippedState,
            };
          });
          // second tile (the match) selected
        } else {
          // match found
          if (code === currentTileCode) {
            useGameStore.setState((state) => {
              const tempFoundState = [...state.found];
              tempFoundState.forEach((item) => {
                if (item.code === currentTileCode) {
                  item.found = true;
                }
              });

              const tempFlippedState = [...state.flipped];
              tempFlippedState[index] = true;

              return {
                ...state,
                found: [...tempFoundState],
                flipped: [...tempFlippedState],
                currentTileCode: -1,
                currentTileIndex: -1,
              };
            });
          } else {
            // match not found
            useGameStore.setState((state) => {
              const tempFlippedState = [...state.flipped];
              tempFlippedState[index] = true;

              return {
                ...state,
                flipped: tempFlippedState,
              };
            });
            setTimeout(() => {
              useGameStore.setState((state) => {
                const tempFlippedState = [...state.flipped];
                tempFlippedState[index] = false;
                tempFlippedState[state.currentTileIndex] = false;

                return {
                  ...state,
                  flipped: tempFlippedState,
                  currentTileCode: -1,
                  currentTileIndex: -1,
                };
              });
            }, 1000);
          }
        }
      }
    }
  };
  return (
    <div
      className={`border border-gray rounded-sm w-8 md:w-12 lg:w-16 h-8 md:h-12 lg:h-16 bg-white ${
        !flipped[index] && "cursor-pointer"
      } flip-card`}
      onClick={handleFlip}
    >
      <motion.div
        className="flip-card-inner w-full h-full"
        initial={false}
        animate={{ rotateY: flipped[index] ? 180 : 360 }}
        transition={{ duration: 0.3 }}
        onAnimationComplete={() => {
          setIsAnimating(false);
        }}
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
