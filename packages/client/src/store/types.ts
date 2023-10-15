import { GlobalGameState } from '../pages/Game/game/types/commonTypes'
import { store } from './index'
import { TLevelParams } from '../pages/Game/game/types/commonTypes'
import { TThemeData } from '../api/themes/theme.types'

export type AppDispatch = typeof store.dispatch

export interface AuthState {
  id: number | null
  first_name: string | null
  second_name: string | null
  display_name: string | null
  login: string | null
  email: string | null
  password: string | null
  phone: string | null
  avatar: string | null
  authorizedStatus: string
}

export interface ThemeState {
  nameTheme: string
  descriptionTheme: string | null
}

// todo one style
export type TGameState = {
  gameState: GlobalGameState
  score: number
  remainingTime: number
  level: TLevelParams
}

export interface CoreRootState {
  authReducer: AuthState
  game: TGameState
  theme: ThemeState
}
