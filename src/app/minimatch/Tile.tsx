import { TileType } from "./types";
import Image from "next/image";

const Tile = ({ imageUrl }: TileType) => {
  return (
    <div className="border border-white w-8 md:w-12 lg:w-16 h-8 md:h-12 lg:h-16">
      {/* // eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} className="w-full h-full" alt={"cat"} />
    </div>
  );
};

export default Tile;
