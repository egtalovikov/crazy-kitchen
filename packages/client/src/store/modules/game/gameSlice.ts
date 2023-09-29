import { createSlice } from '@reduxjs/toolkit'
import { GlobalGameState } from '@/game/types/commonTypes'
import { TGameState } from '@/store/types'

const initialState: TGameState = {
  gameState: GlobalGameState.WaitingForStart,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameState: (state, action) => {
      state.gameState = action.payload
    },
  },
})

export const { setGameState } = gameSlice.actions
export const gameReducer = gameSlice.reducer
