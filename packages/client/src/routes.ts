import { GameWithEngine } from './pages/Game'
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
  START_ROUTE,
  TOPIC_ROUTE,
  TOPIC_ROUTE_CREATE,
} from './utils/consts'
import Profile from './pages/Profile'
import Leaderboard from './pages/Leaderboard'
import TopicCreate from './pages/TopicCreate'
import Topic from './pages/Topic/index'
import Forum from './pages/Forum/index'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { EndGame } from './components/EndGame'
import MainPage from './pages/MainPage'
import StartPage from './pages/StartPage'
import ErrorPage from './pages/ErrorPage/ErrorPage'

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: SignIn,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: SignUp,
  },
]

export const privateRoutes = [
  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
  {
    path: GAME_ROUTE,
    Component: GameWithEngine,
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
    path: TOPIC_ROUTE,
    Component: Topic,
  },
  {
    path: START_ROUTE,
    Component: StartPage,
  },
  {
    path: TOPIC_ROUTE_CREATE,
    Component: TopicCreate,
  },
  {
    path: FORUM_ROUTE,
    Component: Forum,
  },
  {
    path: NOT_FOUND_ROUTE,
    Component: ErrorPage,
  },
  {
    path: INTERNAL_SERVER_ERROR_ROUTE,
    Component: ErrorPage,
  },
]
