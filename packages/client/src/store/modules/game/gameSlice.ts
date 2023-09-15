import { createSlice } from '@reduxjs/toolkit'
import { GlobalGameState } from '../../../pages/Game/game/types/commonTypes'
import { TGameState } from '../../types'
import { LEVEL_LENGTH } from '../../../pages/Game/game/parameters/levelParams'
// todo alias not working?

const initialState: TGameState = {
  gameState: GlobalGameState.WaitingForStart,
  score: 0,
  remainingTime: LEVEL_LENGTH,
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
  },
})

export const { setGameState, setRemainingTime } = gameSlice.actions
export const gameReducer = gameSlice.reducer
