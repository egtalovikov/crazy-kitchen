import { GameLevelList, Ingredients, TLevelParams } from '../types/commonTypes'

const GameLevels: Record<GameLevelList, TLevelParams> = {
  [GameLevelList.Level1]: {
    name: 'Новичок',
    time: 60,
    ordersCount: 3,
    orders: [
      {
        [Ingredients.Cheese]: 2,
        [Ingredients.Cutlet]: 1,
        [Ingredients.Salad]: 1,
        [Ingredients.Tomato]: 0,
      },
      {
        [Ingredients.Cheese]: 2,
        [Ingredients.Cutlet]: 1,
        [Ingredients.Salad]: 1,
        [Ingredients.Tomato]: 0,
      },
      {
        [Ingredients.Cheese]: 2,
        [Ingredients.Cutlet]: 1,
        [Ingredients.Salad]: 1,
        [Ingredients.Tomato]: 0,
      },
    ],
  },
  [GameLevelList.Level2]: {
    name: 'Бывалый',
    time: 60,
    ordersCount: 3,
    orders: [
      {
        [Ingredients.Cheese]: 2,
        [Ingredients.Cutlet]: 1,
        [Ingredients.Salad]: 1,
        [Ingredients.Tomato]: 0,
      },
      {
        [Ingredients.Cheese]: 2,
        [Ingredients.Cutlet]: 1,
        [Ingredients.Salad]: 1,
        [Ingredients.Tomato]: 0,
      },
      {
        [Ingredients.Cheese]: 2,
        [Ingredients.Cutlet]: 1,
        [Ingredients.Salad]: 1,
        [Ingredients.Tomato]: 0,
      },
    ],
  },
}

export default GameLevels
