import { createSlice } from '@reduxjs/toolkit'
import { GlobalGameState } from '@gameTypes/commonTypes'
import { TGameState } from '@store/types'

const initialState: TGameState = {
  globalGameState: GlobalGameState.WaitingForStart,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameState: (state, action) => {
      state.globalGameState = action.payload
    },
  },
})

export const { setGameState } = gameSlice.actions
export const gameReducer = gameSlice.reducer
