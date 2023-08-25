import Game from './pages/Game'
import {
  FORUM_ROUTE,
  GAME_ROUTE,
  INTERNAL_SERVER_ERROR_ROUTE,
  LEADERBOARD_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  NOT_FOUND_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  TOPIC_ROUTE,
} from './utils/consts'
import Profile from './pages/Profile'
import Leaderboard from './pages/Leaderboard'
import Forum from './pages/Forum'
import Topic from './pages/Topic'
import MainPage from './pages/MainPage'
import NotFound from './pages/NotFound'
import InternalServerError from './pages/InternalServerError'
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
