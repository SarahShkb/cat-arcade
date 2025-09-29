"use client";
import React, { useState } from "react";
import { difficulties } from "./constants";
import Grid from "./Grid";
import { DifficultyType } from "./types";

const MiniMatch = () => {
  const [difficulty, setDifficulty] = useState<DifficultyType>(null);
  return (
    <div className="flex flex-col gap-8 p-10">
      <h1 className="text-center text-xl">Mini-Match Game</h1>
      <h2 className="text-center text-lg">
        Match the tiles with the same cat image!
      </h2>
      {!difficulty ? (
        <>
          <h2 className="text-center">Choose the difficulty!</h2>
          <div className="flex flex-col gap-4">
            <button onClick={() => setDifficulty("EASY")}>Easy</button>
            <button onClick={() => setDifficulty("MEDIUM")}>Medium</button>
            <button onClick={() => setDifficulty("HARD")}>Hard</button>
          </div>
        </>
      ) : (
        <Grid difficulty={difficulty} />
      )}
    </div>
  );
};

export default MiniMatch;
