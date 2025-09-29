"use client";
import { useEffect, useState } from "react";
import { difficultyLevelSize } from "./constants";
import Tile from "./Tile";
import { GridType } from "./types";

const Grid = ({ difficulty }: GridType) => {
  const rows = difficulty ? difficultyLevelSize[difficulty].ROW : 0;
  const columns = difficulty ? difficultyLevelSize[difficulty].COL : 0;
  const tilesNum = rows * columns;

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const assignTwoRandomTiles = (
    url: string,
    indexes: number[],
    tempImageUrls: string[]
  ) => {
    // first match
    const index1 = Math.floor(Math.random() * indexes.length);
    tempImageUrls[indexes[index1]] = url;
    indexes.splice(index1, 1);

    const index2 = Math.floor(Math.random() * indexes.length);
    tempImageUrls[indexes[index2]] = url;
    indexes.splice(index2, 1);
  };

  useEffect(() => {
    const tempImageUrls: string[] = new Array(tilesNum);
    const urlsToBeRevoked: string[] = [];
    const indexes = Array.from(Array(tilesNum).keys());

    const getCatImage = async () => {
      const res = await fetch("https://cataas.com/cat");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      urlsToBeRevoked.push(url);
      return url;
    };

    const assignCatImage = async () => {
      await Promise.all(
        Array.from({ length: tilesNum / 2 }, async () => {
          const url = await getCatImage();
          assignTwoRandomTiles(url, indexes, tempImageUrls);
        })
      );
      setImageUrls([...tempImageUrls]);
    };

    assignCatImage();

    return () => {
      urlsToBeRevoked.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  console.log(imageUrls);

  return (
    <div className="flex justify-center items-center w-full sm:mt-10">
      <div
        className="grid gap-0 max-w-sm sm:max-w-md lg:max-w-3xl"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {imageUrls.map((_, i) => (
          <Tile key={i} imageUrl={_} />
        ))}
      </div>
    </div>
  );
};

export default Grid;
