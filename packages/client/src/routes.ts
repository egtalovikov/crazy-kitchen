import Game from './pages/Game'
import {
  END_GAME_ROUTE,
  FORUM_ROUTE,
  GAME_ROUTE,
  INTERNAL_SERVER_ERROR_ROUTE,
  LEADERBOARD_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  NOT_FOUND_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  START_ROUTE,
  TOPIC_ROUTE,
} from './utils/consts'
import Profile from './pages/Profile'
import Leaderboard from './pages/LeaderBoard'
import Forum from './pages/Forum'
import Topic from './pages/Topic'
import NotFound from './pages/NotFound'
import InternalServerError from './pages/InternalServerError'
import StartPage from './pages/StartPage'
import MainPage from './pages/MainPage'
import { EndGame } from './pages/EndGame'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

export const authRoutes = [
  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
  {
    path: GAME_ROUTE,
    Component: Game,
  },
  {
    path: END_GAME_ROUTE,
    Component: EndGame,
  },
]

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: SignIn,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: SignUp,
  },
  {
    path: START_ROUTE,
    Component: StartPage,
  },
  {
    path: MAIN_ROUTE,
    Component: MainPage,
  },
  {
    path: LEADERBOARD_ROUTE,
    Component: Leaderboard,
  },
  {
    path: FORUM_ROUTE,
    Component: Forum,
  },
  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
  {
    path: TOPIC_ROUTE + '/:id',
    Component: Topic,
  },
  {
    path: NOT_FOUND_ROUTE,
    Component: NotFound,
  },
  {
    path: INTERNAL_SERVER_ERROR_ROUTE,
    Component: InternalServerError,
  },
]
