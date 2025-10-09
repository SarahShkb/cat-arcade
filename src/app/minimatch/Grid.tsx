"use client";
import { useEffect, useState } from "react";
import { difficultyLevelSize } from "./constants";
import Tile from "./Tile";
import { GridType, MatchFoundStateDict } from "./types";
import { useGameStore } from "./useGameStore";

const Grid = ({ difficulty }: GridType) => {
  const rows = difficulty ? difficultyLevelSize[difficulty].ROW : 0;
  const columns = difficulty ? difficultyLevelSize[difficulty].COL : 0;
  const tilesNum = rows * columns;
  const allImagesNum = 18;
  const win = useGameStore((state) => state.win);

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [codes, setCodes] = useState<number[]>([]);

  const assignTwoRandomTiles = (
    url: string,
    code: number,
    indexes: number[],
    tempImageUrls: string[],
    catImageCodes: number[],
    codesDics: MatchFoundStateDict[]
  ) => {
    // first match
    const index1 = Math.floor(Math.random() * indexes.length);
    tempImageUrls[indexes[index1]] = url;
    catImageCodes[indexes[index1]] = code;
    indexes.splice(index1, 1);

    const index2 = Math.floor(Math.random() * indexes.length);
    tempImageUrls[indexes[index2]] = url;
    catImageCodes[indexes[index2]] = code;
    indexes.splice(index2, 1);

    codesDics.push({ code, found: false });
  };

  useEffect(() => {
    useGameStore.setState({ tilesNum });
    const tempImageUrls: string[] = new Array(tilesNum);
    const urlsToBeRevoked: string[] = [];
    const indexes = Array.from(Array(tilesNum).keys());
    const exsistingCatImageIndexes = Array.from(Array(allImagesNum).keys());
    const catImageCodes: number[] = [];
    const codesDics: MatchFoundStateDict[] = [];

    const getCatImage = async (exsistingCatImageIndexes: number[]) => {
      const baseImageUrl = `cat-images/cat-`;
      const imageNumber = Math.floor(
        Math.random() * exsistingCatImageIndexes.length
      );
      const url = `${baseImageUrl}${
        exsistingCatImageIndexes[imageNumber] + 1
      }.svg`;
      const tileCode = exsistingCatImageIndexes[imageNumber] + 1;
      exsistingCatImageIndexes.splice(imageNumber, 1);
      return { url, code: tileCode };
    };

    const assignCatImage = async () => {
      await Promise.all(
        Array.from({ length: tilesNum / 2 }, async () => {
          const { url, code } = await getCatImage(exsistingCatImageIndexes);

          assignTwoRandomTiles(
            url,
            code,
            indexes,
            tempImageUrls,
            catImageCodes,
            codesDics
          );
        })
      );
      setImageUrls([...tempImageUrls]);
      setCodes([...catImageCodes]);
      useGameStore.getState().setInitState(tilesNum, codesDics);
    };
    assignCatImage();

    const unsub = useGameStore.subscribe(
      (state) => state.found,
      (newFound: MatchFoundStateDict[]) => {
        if (newFound.length > 0 && newFound.every((item) => item.found)) {
          setTimeout(() => {
            useGameStore.getState().setWin();
          }, 600);
        }
      },
      {
        fireImmediately: true,
      }
    );

    return () => {
      urlsToBeRevoked.forEach((url) => URL.revokeObjectURL(url));
      unsub();
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-full sm:mt-10">
      <div className="inline-block relative">
        <div
          className="grid gap-1 rounded border border-2 p-1 border-white max-w-sm sm:max-w-md lg:max-w-3xl"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
          }}
        >
          {imageUrls.map((_, i) => (
            <Tile
              key={`${codes[i]}-${i}`}
              imageUrl={_}
              code={codes[i]}
              index={i}
            />
          ))}
        </div>
        {win && (
          <div className="absolute flex w-full h-full inset-0 rounded border border-white bg-gray-500/70 text-center items-center justify-center">
            <h1 className="font-extrabold text-3xl text-white">YOU WON!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Grid;
