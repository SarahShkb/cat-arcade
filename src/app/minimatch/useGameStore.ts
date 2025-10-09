import {create} from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { GameStateType, MatchFoundStateDict } from './types'

export const useGameStore = create<GameStateType>()(
  subscribeWithSelector((set) => ({
    tilesNum: 0,
    flipped: [], 
    found: [], 
    currentTileCode: -1,
    currentTileIndex: -1,
    win: false,
    setInitState: (num: number, codesDics: MatchFoundStateDict[]) => {
      set({
      tilesNum: num,
      flipped: Array(num).fill(false),
      found: codesDics
    })},
    setWin: () => set({ win: true })
  }))
);