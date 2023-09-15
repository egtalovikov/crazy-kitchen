import { configureStore } from '@reduxjs/toolkit'
import authReducer from './modules/auth/auth.reducer'
import { gameReducer } from './modules/game/gameSlice'

export const store = configureStore({
  reducer: {
    authReducer,
    game: gameReducer,
  },
})
