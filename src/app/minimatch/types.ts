export type DifficultyType = "EASY" | "MEDIUM" | "HARD" | null;

export type GridType = {
    difficulty: DifficultyType;
}

export type TileType = {
    imageUrl: string;
    code: number;
    index: number;
}

export type GameStateType = {
    tilesNum: number;
    flipped : boolean[];
    found : boolean[];
    currentTileIndex: number;
    currentTileCode: number;
    setTilesNum: (num: number) => void
}