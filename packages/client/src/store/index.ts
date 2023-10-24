import { configureStore } from '@reduxjs/toolkit'
import authReducer from './modules/auth/auth.reducer'
import { gameReducer } from './modules/game/gameSlice'
import themeReducer from './modules/theme/theme.reducer'

export const store = configureStore({
  reducer: {
    authReducer,
    game: gameReducer,
    theme: themeReducer,
  },
})
