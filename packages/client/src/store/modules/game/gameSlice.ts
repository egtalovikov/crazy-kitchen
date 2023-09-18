import { createSlice } from '@reduxjs/toolkit'
import { GameLevelList, GlobalGameState } from '../../../game/types/commonTypes'
import { TGameState } from '../../types'
import GameLevels from '../../../game/parameters/levelParams'
// todo alias not working?

// game starts at first level
const firstLevel = GameLevels[GameLevelList.Level1]

const initialState: TGameState = {
  gameState: GlobalGameState.WaitingForStart,
  score: 0, // now will be equal to finished burger's number
  remainingTime: firstLevel.time,
  level: firstLevel,
  orderIndex: 0,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameState: (state, action) => {
      state.gameState = action.payload
    },
    setRemainingTime: (state, action) => {
      state.remainingTime = action.payload
    },
    setScore: (state, action) => {
      state.score = action.payload
    },
    setOrderIndex: (state, action) => {
      state.orderIndex = action.payload
    },
  },
})

export const { setGameState, setRemainingTime, setScore, setOrderIndex } =
  gameSlice.actions
export const gameReducer = gameSlice.reducer
