export type DifficultyType = "SUPER_EASY" | "EASY" | "MEDIUM" | "HARD" | null;

export type GridType = {
    difficulty: DifficultyType;
}

export type TileType = {
    imageUrl: string;
    code: number;
    index: number;
}

export type MatchFoundStateDict = {
    code: number,
    found: boolean
}

export type GameStateType = {
    win: boolean;
    tilesNum: number;
    flipped : boolean[];
    found : MatchFoundStateDict[];
    currentTileIndex: number;
    currentTileCode: number;
    setInitState: (num: number, codesDics: MatchFoundStateDict[]) => void,
    setWin: () => void
}