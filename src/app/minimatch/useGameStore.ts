import {create} from 'zustand'
import { GameStateType } from './types'

export const useGameStore = create<GameStateType>()(
      (set) => ({
        tilesNum: 0,
        flipped : [], 
        found : [], 
        currentTileCode: -1,
        currentTileIndex: -1,
        setTilesNum: (num: number) => set({
            tilesNum: num,
            flipped: Array(num).fill(false),
            found: Array(num/2).fill(false),
        })
      }),
)