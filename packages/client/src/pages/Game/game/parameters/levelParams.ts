import { GameLevelList, TLevelParams } from '../types/commonTypes'

const GameLevels: Record<GameLevelList, TLevelParams> = {
  [GameLevelList.Level1]: {
    name: 'Новичок',
    time: 60,
    ordersCount: 3,
    orders: null,
  },
  [GameLevelList.Level2]: {
    name: 'Бывалый',
    time: 60,
    ordersCount: 3,
    orders: null,
  },
}

export default GameLevels
